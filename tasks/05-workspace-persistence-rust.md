# Task 05: Workspace & Persistence (Rust + PostgreSQL)

## Reference Sources (`ref.md`)
- `apps/server/src/persistence/*` (NodeSqliteClient.ts, Migrations/)
- `apps/server/src/workspaceEntries.ts`, `attachmentStore.ts`, `imageMime.ts`
- `packages/contracts/src/project.ts`

---

## A-Z Implementation Plan

### A. Database Architecture & Setup

**A1. Choose PostgreSQL Stack**
- Use `sqlx` crate (compile-time checked queries, async/await support)
- Alternative: `diesel` (more ORM-like, type-safe)
- Recommended: `sqlx` for better async integration with Tauri
- Add `sqlx-cli` for migration management

**A2. Database Connection Management**
- Create connection pool using `sqlx::PgPool`
- Store pool in Tauri state (thread-safe, accessible from all commands)
- Configure connection limits (min/max connections)
- Set connection timeout and idle timeout
- Handle connection retry logic with exponential backoff

**A3. Environment Configuration**
- Create `.env` file for database URL (never commit)
- Support `DATABASE_URL` environment variable
- Structure: `postgresql://user:password@host:port/database`
- Separate configs for dev/staging/production
- Add `.env.example` template for developers

**A4. Database Initialization**
- Create database automatically on first run (if not exists)
- Run pending migrations on app startup
- Verify database schema version matches app version
- Handle migration rollback scenarios
- Log all database operations for debugging

---

### B. Migration System

**B1. Migration File Structure**
```
src-tauri/
├── migrations/
│   ├── 001_orchestration_events.sql
│   ├── 002_orchestration_command_receipts.sql
│   ├── 003_checkpoint_diff_blobs.sql
│   ├── 004_provider_session_runtime.sql
│   ├── 005_projections.sql
│   ├── 006_thread_session_runtime_mode.sql
│   ├── 007_thread_message_attachments.sql
│   ├── 008_thread_activity_sequence.sql
│   ├── 009_provider_session_runtime_mode.sql
│   ├── 010_threads_runtime_mode.sql
│   ├── 011_orchestration_thread_created_runtime_mode.sql
│   ├── 012_threads_interaction_mode.sql
│   └── 013_thread_proposed_plans.sql
```

**B2. Reference Migration Files**
Analyze these TypeScript migrations from ref.md:
- `001_OrchestrationEvents.ts` → Core event sourcing table
- `002_OrchestrationCommandReceipts.ts` → Command tracking
- `003_CheckpointDiffBlobs.ts` → Version control data
- `004_ProviderSessionRuntime.ts` → AI provider state
- `005_Projections.ts` → Main projection tables (threads, messages, etc.)
- `006-013_*.ts` → Schema evolution and feature additions

**B3. Migration Translation Strategy**
For each TypeScript migration:
1. Extract table name and columns
2. Map TypeScript types to PostgreSQL types:
   - `TEXT` → `TEXT` or `VARCHAR(n)`
   - `INTEGER` → `INTEGER` or `BIGINT`
   - `BLOB` → `BYTEA`
   - JSON columns → `JSONB` (better indexing than `JSON`)
   - Timestamps → `TIMESTAMPTZ` (timezone-aware)
3. Convert SQLite-specific syntax to PostgreSQL:
   - `AUTOINCREMENT` → `SERIAL` or `BIGSERIAL`
   - `WITHOUT ROWID` → Remove (not needed in PostgreSQL)
   - `ON CONFLICT` → Adjust for PostgreSQL syntax
4. Add proper indexes for query performance
5. Add foreign key constraints with proper `ON DELETE` behavior
6. Add check constraints for data validation

**B4. Core Tables to Migrate**

**Table: orchestration_events**
- Primary event sourcing table
- Columns: id, aggregate_id, event_type, event_data (JSONB), sequence, timestamp
- Indexes: aggregate_id, event_type, timestamp
- Partition by date range if expecting high volume

**Table: orchestration_command_receipts**
- Track command execution status
- Columns: command_id, aggregate_id, status, result (JSONB), created_at
- Index: aggregate_id, status

**Table: checkpoint_diff_blobs**
- Store file diffs and snapshots
- Columns: id, checkpoint_id, file_path, diff_content (BYTEA), content_hash
- Indexes: checkpoint_id, file_path
- Consider compression for large diffs

**Table: provider_session_runtime**
- AI provider session state
- Columns: session_id, provider_type, runtime_mode, state_data (JSONB), created_at, updated_at
- Indexes: session_id, provider_type

**Table: projection_threads**
- Thread metadata projection
- Columns: thread_id, project_id, title, status, runtime_mode, interaction_mode, created_at, updated_at
- Indexes: project_id, status, created_at

**Table: projection_thread_messages**
- Chat messages
- Columns: message_id, thread_id, role, content, sequence, created_at
- Indexes: thread_id, sequence

**Table: projection_thread_activities**
- Thread activity log
- Columns: activity_id, thread_id, activity_type, activity_data (JSONB), sequence, timestamp
- Indexes: thread_id, sequence

**Table: projection_thread_sessions**
- Session tracking
- Columns: session_id, thread_id, runtime_mode, started_at, ended_at
- Indexes: thread_id, started_at

**Table: projection_checkpoints**
- Checkpoint metadata
- Columns: checkpoint_id, thread_id, description, created_at
- Indexes: thread_id, created_at

**Table: projection_pending_approvals**
- User approval queue
- Columns: approval_id, thread_id, action_type, action_data (JSONB), status, created_at
- Indexes: thread_id, status

**Table: projection_projects**
- Project metadata
- Columns: project_id, name, path, git_repo, created_at, updated_at
- Unique: path

**Table: projection_turns**
- Conversation turns
- Columns: turn_id, thread_id, user_message_id, assistant_message_id, sequence, created_at
- Indexes: thread_id, sequence

**Table: projection_thread_message_attachments**
- Attachment metadata
- Columns: attachment_id, message_id, file_name, file_path, mime_type, file_size, created_at
- Indexes: message_id

**Table: projection_thread_proposed_plans**
- AI proposed action plans
- Columns: plan_id, thread_id, plan_data (JSONB), status, created_at
- Indexes: thread_id, status

---

### C. Database Module Structure

**C1. Rust Module Organization**
```
src-tauri/src/
├── db/
│   ├── mod.rs              (re-exports, connection pool setup)
│   ├── connection.rs       (pool initialization, health checks)
│   ├── migrations.rs       (migration runner)
│   ├── models/
│   │   ├── mod.rs
│   │   ├── orchestration.rs
│   │   ├── checkpoint.rs
│   │   ├── thread.rs
│   │   ├── message.rs
│   │   ├── project.rs
│   │   └── provider.rs
│   ├── repositories/       (data access layer)
│   │   ├── mod.rs
│   │   ├── orchestration_event_repository.rs
│   │   ├── checkpoint_repository.rs
│   │   ├── thread_repository.rs
│   │   ├── message_repository.rs
│   │   └── project_repository.rs
│   └── error.rs            (database-specific errors)
```

**C2. Model Definitions**
- Define Rust structs matching database tables
- Use `sqlx::FromRow` derive macro for automatic mapping
- Add `serde::Serialize` and `serde::Deserialize` for JSON serialization
- Use proper Rust types: `chrono::DateTime`, `uuid::Uuid`, `serde_json::Value`
- Add validation logic in model methods

**C3. Repository Pattern**
- Abstract database operations behind repository traits
- Each entity (Thread, Message, Project) gets its own repository
- Repository methods: `find_by_id`, `find_all`, `create`, `update`, `delete`
- Use transactions for multi-table operations
- Return `Result<T, DbError>` for error handling

---

### D. File System Management

**D1. Workspace Root Security**
- Store workspace root path in application state
- Validate all file paths before operations
- Canonicalize paths to resolve symlinks and `..` segments
- Check that resolved path starts with workspace root (prevent directory traversal)
- Reject absolute paths that escape workspace
- Add comprehensive path validation tests

**D2. File Reading Operations**

**Function: `read_workspace_entries`**
- Input: workspace_root, optional filters (file extensions, directories)
- Use `walkdir` crate for recursive directory traversal
- Respect `.gitignore` patterns (use `ignore` crate)
- Collect: file_path, file_size, modified_time, is_directory
- Return paginated results (limit entries per call to avoid memory issues)
- Add file count limits to prevent DoS

**Function: `read_file_content`**
- Input: workspace_root, relative_file_path
- Validate path is within workspace
- Check file exists and is readable
- Read file content as UTF-8 string (handle binary files separately)
- Add size limit check (e.g., max 10MB for text files)
- Return error for non-UTF8 files

**Function: `get_file_metadata`**
- Input: workspace_root, relative_file_path
- Return: size, modified_time, created_time, is_readonly, mime_type
- Use `tree_magic` or `infer` crate for MIME type detection

**Function: `search_files`**
- Input: workspace_root, search_query, file_patterns
- Use `ripgrep` library (`grep-searcher`, `grep-matcher`)
- Return: file_path, line_number, match_context
- Limit results to prevent performance issues

**D3. File Writing Operations**

**Function: `write_file_content`**
- Input: workspace_root, relative_file_path, content
- Validate path is within workspace
- Create parent directories if needed
- Write atomically (write to temp file, then rename)
- Set appropriate file permissions
- Log all write operations

**Function: `delete_file`**
- Input: workspace_root, relative_file_path
- Validate path is within workspace
- Check file exists
- Move to trash instead of permanent delete (use `trash` crate)
- Log deletion

**Function: `create_directory`**
- Input: workspace_root, relative_dir_path
- Validate path is within workspace
- Create directory and parents recursively
- Set appropriate permissions

**D4. File Watching**
- Use `notify` crate for file system events
- Watch workspace directory for changes
- Debounce events (multiple rapid changes = one notification)
- Emit Tauri events to frontend: `file-changed`, `file-created`, `file-deleted`
- Allow frontend to subscribe to specific paths

---

### E. Attachment Management (MinIO S3-Compatible Storage)

**E1. Attachment Storage Strategy**
- Use MinIO for S3-compatible object storage
- Generate unique IDs for each attachment (UUID v4)
- Store metadata in `projection_thread_message_attachments` table
- Store actual files in MinIO buckets:
  - Bucket: `sonex-attachments`
  - Path structure: `{thread_id}/{attachment_id}.{ext}`
- Configure MinIO endpoint, access key, and secret key via environment variables

**E2. MinIO Integration**

**Function: `init_minio_client`**
- Create MinIO client with endpoint, access key, secret key
- Test connection on startup
- Create buckets if they don't exist (sonex-attachments, sonex-thumbnails)
- Set bucket policies (private by default)

**Function: `upload_to_minio`**
- Input: bucket, object_key, file_data, content_type
- Upload file to MinIO bucket
- Set metadata (original filename, upload timestamp)
- Return object URL/key
- Use multipart upload for large files (>5MB)

**Function: `download_from_minio`**
- Input: bucket, object_key
- Download file from MinIO
- Return file data as bytes
- Cache frequently accessed files

**E3. Image Processing**

**Function: `process_image_attachment`**
- Input: workspace_root, image_file_path, thread_id, message_id
- Read image file as bytes
- Detect MIME type: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
- Validate MIME type (whitelist allowed types)
- Generate thumbnail (use `image` crate)
- Upload original to MinIO bucket `sonex-attachments`
- Upload thumbnail to MinIO bucket `sonex-thumbnails`
- Calculate file hash (SHA-256) for deduplication
- Insert metadata into database (with MinIO object keys)
- Return attachment_id and MinIO object URLs

**E4. Base64 Encoding**

**Function: `get_attachment_as_base64`**
- Input: attachment_id
- Query database for attachment metadata (get MinIO object key)
- Download file from MinIO
- Encode as base64
- Return: `data:{mime_type};base64,{encoded_data}`
- Cache encoded data in memory (LRU cache)

**E5. Attachment Types**
Support these attachment types:
- Images: JPEG, PNG, GIF, WebP, SVG
- Documents: PDF (render first page as thumbnail)
- Code snippets: Store as text with syntax highlighting metadata
- File references: Store path reference only, not content

---

### F. Tauri Command Layer

**F1. Database Commands**

```rust
// Initialize database
#[tauri::command]
async fn db_init(state: State<'_, AppState>) -> Result<(), String>

// Health check
#[tauri::command]
async fn db_health_check(state: State<'_, AppState>) -> Result<bool, String>

// Run migrations
#[tauri::command]
async fn db_migrate(state: State<'_, AppState>) -> Result<u32, String>
```

**F2. Workspace Commands**

```rust
// Set workspace root
#[tauri::command]
async fn set_workspace_root(path: String, state: State<'_, AppState>) -> Result<(), String>

// List workspace entries
#[tauri::command]
async fn list_workspace_entries(
    workspace_root: String,
    filters: Option<FileFilters>,
    pagination: PaginationParams,
    state: State<'_, AppState>
) -> Result<Vec<FileEntry>, String>

// Read file content
#[tauri::command]
async fn read_workspace_file(
    workspace_root: String,
    file_path: String,
    state: State<'_, AppState>
) -> Result<String, String>

// Write file content
#[tauri::command]
async fn write_workspace_file(
    workspace_root: String,
    file_path: String,
    content: String,
    state: State<'_, AppState>
) -> Result<(), String>

// Get file metadata
#[tauri::command]
async fn get_file_metadata(
    workspace_root: String,
    file_path: String,
    state: State<'_, AppState>
) -> Result<FileMetadata, String>

// Search files
#[tauri::command]
async fn search_workspace_files(
    workspace_root: String,
    query: String,
    filters: Option<SearchFilters>,
    state: State<'_, AppState>
) -> Result<Vec<SearchResult>, String>

// Watch workspace
#[tauri::command]
async fn watch_workspace(
    workspace_root: String,
    state: State<'_, AppState>
) -> Result<(), String>

// Unwatch workspace
#[tauri::command]
async fn unwatch_workspace(state: State<'_, AppState>) -> Result<(), String>
```

**F3. Attachment Commands**

```rust
// Upload attachment
#[tauri::command]
async fn upload_attachment(
    workspace_root: String,
    file_path: String,
    thread_id: String,
    message_id: String,
    state: State<'_, AppState>
) -> Result<AttachmentMetadata, String>

// Get attachment as base64
#[tauri::command]
async fn get_attachment_base64(
    attachment_id: String,
    state: State<'_, AppState>
) -> Result<String, String>

// List thread attachments
#[tauri::command]
async fn list_thread_attachments(
    thread_id: String,
    state: State<'_, AppState>
) -> Result<Vec<AttachmentMetadata>, String>

// Delete attachment
#[tauri::command]
async fn delete_attachment(
    attachment_id: String,
    state: State<'_, AppState>
) -> Result<(), String>

// Cleanup orphaned attachments
#[tauri::command]
async fn cleanup_attachments(state: State<'_, AppState>) -> Result<u32, String>
```

**F4. Thread & Message Commands**

```rust
// Create thread
#[tauri::command]
async fn create_thread(
    project_id: String,
    title: String,
    state: State<'_, AppState>
) -> Result<ThreadMetadata, String>

// Get thread
#[tauri::command]
async fn get_thread(
    thread_id: String,
    state: State<'_, AppState>
) -> Result<ThreadMetadata, String>

// List threads
#[tauri::command]
async fn list_threads(
    project_id: Option<String>,
    pagination: PaginationParams,
    state: State<'_, AppState>
) -> Result<Vec<ThreadMetadata>, String>

// Create message
#[tauri::command]
async fn create_message(
    thread_id: String,
    role: String,
    content: String,
    state: State<'_, AppState>
) -> Result<MessageMetadata, String>

// List messages
#[tauri::command]
async fn list_messages(
    thread_id: String,
    pagination: PaginationParams,
    state: State<'_, AppState>
) -> Result<Vec<MessageMetadata>, String>

// Delete thread
#[tauri::command]
async fn delete_thread(
    thread_id: String,
    state: State<'_, AppState>
) -> Result<(), String>
```

**F5. Checkpoint Commands**

```rust
// Create checkpoint
#[tauri::command]
async fn create_checkpoint(
    thread_id: String,
    description: String,
    state: State<'_, AppState>
) -> Result<CheckpointMetadata, String>

// List checkpoints
#[tauri::command]
async fn list_checkpoints(
    thread_id: String,
    state: State<'_, AppState>
) -> Result<Vec<CheckpointMetadata>, String>

// Restore checkpoint
#[tauri::command]
async fn restore_checkpoint(
    checkpoint_id: String,
    state: State<'_, AppState>
) -> Result<(), String>

// Get checkpoint diff
#[tauri::command]
async fn get_checkpoint_diff(
    checkpoint_id: String,
    state: State<'_, AppState>
) -> Result<Vec<FileDiff>, String>
```

---

### G. Error Handling

**G1. Error Types**
```rust
pub enum DbError {
    ConnectionError(String),
    MigrationError(String),
    QueryError(String),
    NotFound(String),
    ValidationError(String),
    TransactionError(String),
}

pub enum FileSystemError {
    PathTraversalAttempt(String),
    FileNotFound(String),
    PermissionDenied(String),
    InvalidPath(String),
    IoError(String),
    FileTooLarge(String),
}

pub enum AttachmentError {
    UnsupportedMimeType(String),
    FileTooBig(String),
    ProcessingError(String),
    NotFound(String),
}
```

**G2. Error Conversion**
- Implement `From<sqlx::Error>` for `DbError`
- Implement `From<std::io::Error>` for `FileSystemError`
- Convert all internal errors to user-friendly messages
- Log detailed errors server-side
- Return sanitized errors to frontend

**G3. Error Logging**
- Use `tracing` crate for structured logging
- Log levels: ERROR, WARN, INFO, DEBUG, TRACE
- Include context: user_id, thread_id, operation
- Write logs to: `~/.sonex/logs/app.log`
- Rotate logs daily, keep 7 days

---

### H. Security Measures

**H1. Path Validation**
```rust
fn validate_path(workspace_root: &Path, user_path: &str) -> Result<PathBuf, FileSystemError> {
    // Reject absolute paths
    if Path::new(user_path).is_absolute() {
        return Err(FileSystemError::InvalidPath("Absolute paths not allowed".into()));
    }
    
    // Build full path
    let full_path = workspace_root.join(user_path);
    
    // Canonicalize to resolve .. and symlinks
    let canonical = full_path.canonicalize()
        .map_err(|e| FileSystemError::IoError(e.to_string()))?;
    
    // Ensure it starts with workspace root
    if !canonical.starts_with(workspace_root) {
        return Err(FileSystemError::PathTraversalAttempt(
            "Path escapes workspace".into()
        ));
    }
    
    Ok(canonical)
}
```

**H2. SQL Injection Prevention**
- Always use parameterized queries (sqlx provides this automatically)
- Never concatenate user input into SQL strings
- Use `bind()` for all dynamic values
- Validate input before queries

**H3. File Size Limits**
- Text files: 10 MB max
- Images: 20 MB max
- Binary attachments: 50 MB max
- Total attachments per thread: 500 MB max
- Enforce limits before processing

**H4. Rate Limiting**
- Implement rate limiting for expensive operations
- File reads: 100 per minute per thread
- Database writes: 50 per minute per thread
- Attachment uploads: 10 per minute per thread
- Use `governor` crate for rate limiting

**H5. Input Validation**
- Validate all user inputs
- Thread IDs: UUID v4 format
- File paths: No null bytes, control characters
- Content: Check encoding, size limits
- MIME types: Whitelist only

---

### I. Performance Optimization

**I1. Database Indexing**
- Index all foreign keys
- Composite indexes for common queries:
  - `(thread_id, sequence)` for messages
  - `(project_id, created_at DESC)` for threads
  - `(thread_id, status)` for pending approvals
- Use EXPLAIN ANALYZE to verify query plans

**I2. Connection Pooling**
- Pool size: 10-20 connections (adjust based on load)
- Idle timeout: 10 minutes
- Max lifetime: 30 minutes
- Connection test on checkout

**I3. Caching Strategy**
- Use in-memory cache for hot data (use `moka` crate)
- Cache file metadata (invalidate on file change events)
- Cache attachment base64 (LRU, max 100MB)
- Cache database query results (invalidate on writes)

**I4. Pagination**
- Always paginate list operations
- Default page size: 50 items
- Max page size: 200 items
- Use cursor-based pagination for large datasets

**I5. Async Operations**
- All database operations are async
- Use `tokio::spawn` for CPU-intensive tasks (image processing)
- Stream large result sets instead of loading all into memory
- Use channels for producer-consumer patterns

---

### J. Testing Strategy

**J1. Unit Tests**
- Test each repository method
- Test path validation logic
- Test MIME type detection
- Test error conversions
- Mock database with `sqlx::testing`

**J2. Integration Tests**
- Test full command flow (frontend → Tauri → DB)
- Test migration system
- Test file operations with temp directories
- Test attachment upload/download
- Use test database (PostgreSQL container)

**J3. Security Tests**
- Test path traversal attempts
- Test SQL injection attempts
- Test file size limit enforcement
- Test invalid input handling
- Fuzz test path validation

**J4. Performance Tests**
- Benchmark database queries
- Test with large file trees (10k+ files)
- Test concurrent operations
- Test under memory pressure
- Profile with `criterion` crate

---

### K. Development Workflow

**K1. Setup Local PostgreSQL**
```bash
# Install PostgreSQL
brew install postgresql@16  # macOS
# or use Docker:
docker run -d \
  --name sonex-postgres \
  -e POSTGRES_PASSWORD=dev_password \
  -e POSTGRES_DB=sonex_dev \
  -p 5432:5432 \
  postgres:16-alpine

# Set environment variable
export DATABASE_URL="postgresql://postgres:dev_password@localhost:5432/sonex_dev"
```

**K2. Migration Commands**
```bash
# Create new migration
sqlx migrate add <migration_name>

# Run migrations
sqlx migrate run

# Revert last migration
sqlx migrate revert

# Check migration status
sqlx migrate info
```

**K3. Development Database**
- Use separate database for development
- Seed with test data for frontend development
- Reset database script for clean slate
- Backup/restore scripts for different scenarios

---

### L. Dependencies (Cargo.toml)

```toml
[dependencies]
# Database
sqlx = { version = "0.8", features = ["runtime-tokio-native-tls", "postgres", "chrono", "uuid", "json"] }

# Async runtime
tokio = { version = "1", features = ["full"] }

# Serialization
serde = { version = "1", features = ["derive"] }
serde_json = "1"

# Date/time
chrono = { version = "0.4", features = ["serde"] }

# UUID
uuid = { version = "1", features = ["v4", "serde"] }

# File system
walkdir = "2"
ignore = "0.4"  # For .gitignore parsing
notify = "7"     # File watching
trash = "5"      # Safe file deletion

# Image processing
image = "0.25"
infer = "0.16"   # MIME type detection

# Error handling
thiserror = "2"
anyhow = "1"

# Logging
tracing = "0.1"
tracing-subscriber = "0.3"

# Caching
moka = "0.12"

# Rate limiting
governor = "0.6"

# Security
sha2 = "0.10"    # Hashing

# Tauri
tauri = { version = "2", features = ["..."] }

[dev-dependencies]
sqlx = { version = "0.8", features = ["runtime-tokio-native-tls", "postgres", "chrono", "uuid", "json", "migrate"] }
criterion = "0.5"
tempfile = "3"
```

---

### M. Implementation Order

**Phase 1: Database Foundation (Week 1)**
1. Set up PostgreSQL connection and pooling
2. Create migration system
3. Port all 13 migrations from TypeScript to SQL
4. Test migrations (up/down)
5. Create model structs for all tables

**Phase 2: Repository Layer (Week 1-2)**
1. Implement base repository trait
2. Create repositories for each entity
3. Write unit tests for repositories
4. Add transaction support
5. Implement error handling

**Phase 3: File System (Week 2)**
1. Implement path validation
2. Create workspace entry listing
3. Add file read/write operations
4. Implement file watching
5. Add security tests

**Phase 4: Attachments (Week 2-3)**
1. Set up attachment storage structure
2. Implement image processing
3. Add base64 encoding/decoding
4. Create attachment cleanup
5. Test with various file types

**Phase 5: Tauri Commands (Week 3)**
1. Create all database commands
2. Create all file system commands
3. Create all attachment commands
4. Wire up to Tauri app
5. Test from frontend

**Phase 6: Optimization & Polish (Week 4)**
1. Add caching layer
2. Optimize database queries
3. Add comprehensive logging
4. Performance testing
5. Security audit

---

### N. Frontend Integration Points

**N1. Database State in Frontend**
- Create Zustand store for threads, messages, projects
- Subscribe to database changes via Tauri events
- Optimistic updates (update UI immediately, rollback on error)
- Sync state on app startup

**N2. File System State**
- Store current workspace root in Zustand
- Keep file tree in memory (lazy load subdirectories)
- Listen to file change events
- Update UI when files change

**N3. Attachment Display**
- Load attachments on demand (not all at once)
- Display thumbnails in message list
- Full-size on click
- Progress indicator for uploads

---

### O. Monitoring & Debugging

**O1. Logging Setup**
```rust
// Initialize tracing
tracing_subscriber::fmt()
    .with_max_level(tracing::Level::DEBUG)
    .with_file(true)
    .with_line_number(true)
    .with_target(false)
    .with_writer(/* file writer */)
    .init();

// Log usage
tracing::info!("Database initialized successfully");
tracing::error!(error = ?e, "Failed to read file");
tracing::debug!(thread_id = %thread_id, "Creating new message");
```

**O2. Metrics Collection**
- Track query execution time
- Track file operation counts
- Track attachment upload/download sizes
- Expose metrics via Tauri command (for admin panel)

**O3. Debug Commands**
```rust
#[tauri::command]
async fn debug_db_stats(state: State<'_, AppState>) -> Result<DbStats, String>

#[tauri::command]
async fn debug_cache_stats(state: State<'_, AppState>) -> Result<CacheStats, String>

#[tauri::command]
async fn debug_clear_cache(state: State<'_, AppState>) -> Result<(), String>
```

---

### P. Documentation

**P1. Code Documentation**
- Add rustdoc comments to all public functions
- Include usage examples in doc comments
- Document error conditions
- Document security considerations

**P2. API Documentation**
- Document all Tauri commands (inputs, outputs, errors)
- Create OpenAPI-style spec for commands
- Generate frontend TypeScript types from Rust types

**P3. Developer Guide**
- How to set up local database
- How to run migrations
- How to add new tables
- How to test database code
- Troubleshooting common issues

---

### Q. Migration from SQLite (If Needed)

If project previously used SQLite and needs to migrate to PostgreSQL:

**Q1. Data Export**
- Export all SQLite tables to JSON
- Validate data integrity
- Transform data if schema changed

**Q2. Data Import**
- Create PostgreSQL tables
- Import JSON data using COPY or INSERT
- Verify row counts match
- Test queries on migrated data

**Q3. Gradual Migration**
- Support both databases temporarily
- Read from old, write to both
- Verify consistency
- Switch reads to new database
- Deprecate old database

---

### R. Backup & Recovery

**R1. Backup Strategy**
- Daily full backup of PostgreSQL database
- Use `pg_dump` or continuous archiving (WAL)
- Store backups in: `~/.sonex/backups/`
- Keep 7 daily backups, 4 weekly backups

**R2. Recovery Procedures**
- Test restore process regularly
- Document restore steps
- Provide Tauri command for user-initiated backup
- Provide restore command (careful - destructive)

---

### S. Deployment Considerations

**S1. Production Database**
- Use managed PostgreSQL (e.g., AWS RDS, Supabase, Railway)
- Enable SSL/TLS for connections
- Use connection pooling (PgBouncer)
- Set up monitoring and alerts

**S2. Environment Separation**
- Development: Local PostgreSQL
- Staging: Cloud PostgreSQL (small instance)
- Production: Cloud PostgreSQL (scaled instance)
- Separate databases, not schemas

**S3. Secrets Management**
- Never hardcode DATABASE_URL
- Use environment variables
- For desktop app: Store in secure OS keychain
- Encrypt at rest

---

### T. Known Challenges & Solutions

**T1. Challenge: Large File Trees**
- Problem: Listing 100k+ files is slow
- Solution: Lazy loading, pagination, caching, indexes on file paths

**T2. Challenge: Concurrent Writes**
- Problem: Multiple messages/events at once
- Solution: Use PostgreSQL transactions, optimistic locking

**T3. Challenge: Binary Attachments**
- Problem: Large binary data in database
- Solution: Store in file system, only metadata in DB

**T4. Challenge: Database Migrations in Production**
- Problem: Downtime during migration
- Solution: Backward-compatible migrations, blue-green deployment

**T5. Challenge: Cross-Platform File Paths**
- Problem: Windows vs Unix path separators
- Solution: Always use `PathBuf`, normalize on input

---

## Summary Checklist

- [ ] A. Set up PostgreSQL connection with sqlx
- [ ] B. Port all 13 migrations from TypeScript to SQL
- [ ] C. Create Rust models and repositories
- [ ] D. Implement secure file system operations
- [ ] E. Implement attachment processing and storage
- [ ] F. Create all Tauri commands for DB, filesystem, attachments
- [ ] G. Implement comprehensive error handling
- [ ] H. Add security measures (path validation, rate limiting)
- [ ] I. Optimize with caching, indexing, connection pooling
- [ ] J. Write unit, integration, and security tests
- [ ] K. Set up local development workflow
- [ ] L. Add all required dependencies
- [ ] M. Follow implementation order (4-week plan)
- [ ] N. Integrate with frontend (Zustand stores, events)
- [ ] O. Add logging and monitoring
- [ ] P. Write documentation
- [ ] Q. (Optional) Migrate from SQLite if needed
- [ ] R. Set up backup and recovery
- [ ] S. Plan for production deployment
- [ ] T. Address known challenges

---

## Next Steps

After completing this task:
1. Task 06: Anthropic Integration (AI provider)
2. Task 09: Orchestration Engine (event sourcing in Rust)
3. Task 04: IPC Bridge (connect frontend to Rust backend)

---

## Notes

- **PostgreSQL vs SQLite**: PostgreSQL chosen for better concurrency, JSON support (JSONB), and scalability
- **sqlx vs diesel**: sqlx chosen for async support and compile-time query verification
- **Security First**: All file operations must validate paths to prevent directory traversal
- **Performance**: Use indexes, caching, and pagination from day one
- **Testing**: Write tests as you code, not after
- **Documentation**: Keep this plan updated as implementation progresses
