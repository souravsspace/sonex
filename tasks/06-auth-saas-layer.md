# Task 07: Auth & SaaS Layer - Google OAuth Implementation

## Context
Unlike `t3code` which runs purely local and relies on `codex login` for its auth loop, Sonex must function as a standalone SaaS product with cloud-based authentication and user management. This implementation uses Google OAuth 2.0 as the sole authentication provider, with all auth logic residing in the Rust backend (Tauri) and a React-based frontend authentication UI.

---

## Architecture Overview

### Authentication Flow
1. User initiates login from frontend
2. Frontend opens Google OAuth consent screen (via Rust backend)
3. User authorizes with Google
4. Google redirects to callback URL with authorization code
5. Rust backend exchanges code for tokens
6. Backend creates/updates user in PostgreSQL database
7. Backend generates session token and stores in database
8. Frontend receives session token and stores securely
9. All subsequent requests include session token for authentication

### Technology Stack
- **OAuth Provider**: Google OAuth 2.0
- **Backend**: Rust (Tauri) with `oauth2` crate
- **Database**: PostgreSQL (cloud-hosted for SaaS)
- **Frontend**: React with TanStack Router
- **Session Storage**: PostgreSQL + HttpOnly cookies (for web) / Secure storage (for desktop)
- **Token Management**: JWT for session tokens, refresh tokens in database

---

## Phase 1: Database Schema & Migration Plan

### 1.1 PostgreSQL Schema Design

#### Users Table
Stores authenticated user information from Google OAuth.

**Fields:**
- `id` (UUID, Primary Key) - Unique user identifier
- `google_id` (VARCHAR, Unique, Not Null) - Google user ID
- `email` (VARCHAR, Unique, Not Null) - User email from Google
- `name` (VARCHAR, Nullable) - Display name from Google
- `avatar_url` (VARCHAR, Nullable) - Profile picture URL
- `locale` (VARCHAR, Nullable) - User locale preference
- `email_verified` (BOOLEAN, Default false) - Email verification status from Google
- `created_at` (TIMESTAMPTZ, Not Null) - Account creation timestamp
- `updated_at` (TIMESTAMPTZ, Not Null) - Last update timestamp
- `last_login_at` (TIMESTAMPTZ, Nullable) - Last successful login
- `is_active` (BOOLEAN, Default true) - Account active status
- `deleted_at` (TIMESTAMPTZ, Nullable) - Soft delete timestamp

**Indexes:**
- Primary index on `id`
- Unique index on `google_id`
- Unique index on `email`
- Index on `is_active` and `deleted_at` for active user queries

---

#### Sessions Table
Stores active user sessions with refresh capabilities.

**Fields:**
- `id` (UUID, Primary Key) - Session identifier
- `user_id` (UUID, Foreign Key → users.id, Not Null) - Associated user
- `session_token` (VARCHAR, Unique, Not Null) - Hashed session token (SHA-256)
- `refresh_token` (VARCHAR, Unique, Not Null) - Hashed refresh token for renewal
- `device_id` (VARCHAR, Nullable) - Device identifier for multi-device support
- `device_name` (VARCHAR, Nullable) - Human-readable device name
- `device_type` (ENUM: 'desktop', 'web', 'mobile', Nullable) - Device type
- `ip_address` (INET, Nullable) - IP address at session creation
- `user_agent` (TEXT, Nullable) - Browser/app user agent
- `expires_at` (TIMESTAMPTZ, Not Null) - Session expiration time
- `created_at` (TIMESTAMPTZ, Not Null) - Session creation timestamp
- `last_used_at` (TIMESTAMPTZ, Not Null) - Last activity timestamp
- `revoked_at` (TIMESTAMPTZ, Nullable) - Manual revocation timestamp

**Indexes:**
- Primary index on `id`
- Unique index on `session_token`
- Unique index on `refresh_token`
- Index on `user_id` for user session lookups
- Index on `expires_at` for cleanup queries
- Composite index on `user_id`, `device_id` for device management

---

#### OAuth Tokens Table
Stores Google OAuth access/refresh tokens for API access.

**Fields:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.id, Not Null, Unique) - One token set per user
- `access_token` (TEXT, Not Null) - Encrypted Google access token
- `refresh_token` (TEXT, Not Null) - Encrypted Google refresh token
- `token_type` (VARCHAR, Not Null) - Token type (usually "Bearer")
- `expires_at` (TIMESTAMPTZ, Not Null) - Access token expiration
- `scope` (TEXT, Not Null) - Granted OAuth scopes
- `created_at` (TIMESTAMPTZ, Not Null)
- `updated_at` (TIMESTAMPTZ, Not Null)

**Indexes:**
- Primary index on `id`
- Unique index on `user_id`
- Index on `expires_at` for token refresh checks

**Security:**
- Tokens stored with AES-256-GCM encryption
- Encryption key stored in environment variables, never in database
- Key rotation strategy for encryption keys

---

#### API Keys Table (Optional - for "Bring Your Own Key" feature)
Allows users to provide their own LLM API keys.

**Fields:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.id, Not Null)
- `provider` (ENUM: 'openai', 'anthropic', 'google', Not Null) - LLM provider
- `key_name` (VARCHAR, Not Null) - User-defined key name
- `api_key` (TEXT, Not Null) - Encrypted API key
- `is_default` (BOOLEAN, Default false) - Default key for provider
- `created_at` (TIMESTAMPTZ, Not Null)
- `last_used_at` (TIMESTAMPTZ, Nullable)
- `is_active` (BOOLEAN, Default true)

**Indexes:**
- Primary index on `id`
- Index on `user_id`
- Composite unique index on `user_id`, `provider`, `key_name`

---

#### Subscriptions Table
Tracks user subscription status and quotas.

**Fields:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.id, Not Null, Unique)
- `plan` (ENUM: 'free', 'pro', 'enterprise', Not Null, Default 'free')
- `status` (ENUM: 'active', 'cancelled', 'suspended', 'expired', Not Null)
- `quota_monthly_requests` (INTEGER, Not Null) - Monthly request limit
- `quota_used_requests` (INTEGER, Default 0) - Used requests this period
- `quota_reset_at` (TIMESTAMPTZ, Not Null) - When quota resets
- `stripe_customer_id` (VARCHAR, Unique, Nullable) - Stripe customer ID
- `stripe_subscription_id` (VARCHAR, Unique, Nullable) - Stripe subscription ID
- `trial_ends_at` (TIMESTAMPTZ, Nullable) - Trial period end
- `current_period_start` (TIMESTAMPTZ, Not Null)
- `current_period_end` (TIMESTAMPTZ, Not Null)
- `created_at` (TIMESTAMPTZ, Not Null)
- `updated_at` (TIMESTAMPTZ, Not Null)

**Indexes:**
- Primary index on `id`
- Unique index on `user_id`
- Index on `stripe_customer_id`
- Index on `status`

---

#### Audit Logs Table
Tracks authentication and security events for compliance.

**Fields:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.id, Nullable) - Null for failed login attempts
- `event_type` (ENUM: 'login', 'logout', 'token_refresh', 'session_revoke', 'password_change', 'email_change', 'account_delete', 'failed_login', Not Null)
- `event_status` (ENUM: 'success', 'failure', Not Null)
- `ip_address` (INET, Nullable)
- `user_agent` (TEXT, Nullable)
- `metadata` (JSONB, Nullable) - Additional event details
- `created_at` (TIMESTAMPTZ, Not Null)

**Indexes:**
- Primary index on `id`
- Index on `user_id`
- Index on `event_type`
- Index on `created_at` for time-based queries
- GIN index on `metadata` for JSONB queries

---

#### Usage Metrics Table
Tracks API usage for billing and analytics.

**Fields:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.id, Not Null)
- `request_type` (ENUM: 'chat', 'completion', 'terminal', 'git', Not Null)
- `model_used` (VARCHAR, Nullable) - LLM model used
- `tokens_input` (INTEGER, Default 0)
- `tokens_output` (INTEGER, Default 0)
- `cost_usd` (DECIMAL(10,4), Nullable) - Calculated cost
- `duration_ms` (INTEGER, Nullable) - Request duration
- `status` (ENUM: 'success', 'error', 'quota_exceeded', Not Null)
- `metadata` (JSONB, Nullable)
- `created_at` (TIMESTAMPTZ, Not Null)

**Indexes:**
- Primary index on `id`
- Index on `user_id`
- Composite index on `user_id`, `created_at` for usage queries
- Index on `created_at` for time-series queries

---

### 1.2 Migration Strategy

#### Migration Files Structure
```
src-tauri/migrations/
├── 001_create_users.sql
├── 002_create_sessions.sql
├── 003_create_oauth_tokens.sql
├── 004_create_api_keys.sql
├── 005_create_subscriptions.sql
├── 006_create_audit_logs.sql
├── 007_create_usage_metrics.sql
└── 008_create_indexes.sql
```

#### Migration Execution Plan
1. Use `sqlx` crate for Rust-based migrations
2. Migrations run automatically on app startup (development)
3. Migrations run via CLI command (production)
4. All migrations are idempotent (safe to re-run)
5. Rollback migrations created for each forward migration
6. Migration version tracked in `_migrations` table

#### Migration Tooling
- Use `sqlx-cli` for migration management
- Store migration history in database
- Implement dry-run mode for testing
- Add migration verification before execution
- Support for data migrations (separate from schema)

---

## Phase 2: Rust Backend Authentication Implementation

### 2.1 Dependencies & Configuration

#### Cargo.toml Dependencies
**Required crates:**
- `oauth2` - OAuth 2.0 client implementation
- `reqwest` - HTTP client for API calls
- `sqlx` - PostgreSQL database driver with compile-time checked queries
- `tokio` - Async runtime
- `serde` / `serde_json` - Serialization
- `jsonwebtoken` - JWT token generation/validation
- `argon2` - Password hashing (for token hashing)
- `sha2` - SHA-256 hashing for session tokens
- `aes-gcm` - AES-256-GCM encryption for sensitive data
- `rand` - Cryptographically secure random generation
- `chrono` - Date/time handling
- `uuid` - UUID generation
- `anyhow` / `thiserror` - Error handling
- `tracing` - Structured logging
- `tauri` - Tauri framework

#### Environment Configuration
**Required environment variables:**
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_REDIRECT_URI` - OAuth callback URL
- `DATABASE_URL` - PostgreSQL connection string
- `ENCRYPTION_KEY` - AES-256 key for token encryption (32 bytes, base64)
- `JWT_SECRET` - Secret for JWT signing (64+ bytes, base64)
- `SESSION_DURATION_HOURS` - Session lifetime (default: 168 = 7 days)
- `REFRESH_TOKEN_DURATION_DAYS` - Refresh token lifetime (default: 90 days)
- `RUST_LOG` - Log level configuration

#### Configuration File Structure
Create `src-tauri/src/config.rs` to load and validate all configuration at startup.

**Configuration validation:**
- Verify all required env vars are set
- Validate encryption key length (must be 32 bytes)
- Validate JWT secret strength (minimum 64 bytes)
- Test database connectivity on startup
- Validate Google OAuth credentials format

---

### 2.2 Database Connection Pool

#### Setup Connection Pool
**File:** `src-tauri/src/db/mod.rs`

**Implementation requirements:**
- Use `sqlx::PgPool` for connection pooling
- Configure pool size based on expected load (start with 5-10 connections)
- Set connection timeout (e.g., 30 seconds)
- Enable connection testing on checkout
- Configure statement cache size
- Handle connection failures gracefully
- Implement automatic reconnection logic
- Add health check endpoint for database status

**Connection pool configuration:**
- Min connections: 2
- Max connections: 10 (adjustable based on load)
- Connection timeout: 30 seconds
- Idle timeout: 10 minutes
- Max lifetime: 30 minutes

---

### 2.3 OAuth 2.0 Flow Implementation

#### 2.3.1 Authorization URL Generation
**File:** `src-tauri/src/auth/oauth.rs`

**Function:** `generate_auth_url()`

**Requirements:**
- Generate OAuth state parameter (random 32-byte string, base64-encoded)
- Store state in memory cache with 10-minute expiration
- Include required scopes: `openid`, `email`, `profile`
- Use PKCE (Proof Key for Code Exchange) for added security
- Generate code_verifier (random 32-byte string)
- Calculate code_challenge (SHA-256 of verifier, base64url-encoded)
- Store code_verifier associated with state
- Return authorization URL to frontend

**OAuth Scopes:**
- `openid` - Required for OpenID Connect
- `email` - Access to user email
- `profile` - Access to user profile (name, picture)

---

#### 2.3.2 OAuth Callback Handler
**File:** `src-tauri/src/auth/oauth.rs`

**Function:** `handle_oauth_callback(code, state, code_verifier)`

**Requirements:**
1. **Validate state parameter:**
   - Check state exists in memory cache
   - Verify state hasn't expired (10-minute window)
   - Remove state from cache after validation
   - Reject if state invalid (prevent CSRF attacks)

2. **Validate code_verifier:**
   - Retrieve stored code_verifier for this state
   - Ensure verifier matches

3. **Exchange authorization code for tokens:**
   - Make POST request to Google token endpoint
   - Include: code, client_id, client_secret, redirect_uri, grant_type, code_verifier
   - Handle network failures gracefully
   - Parse response: access_token, refresh_token, expires_in, token_type

4. **Fetch user info from Google:**
   - Make GET request to Google UserInfo endpoint
   - Include access_token in Authorization header
   - Parse user data: sub (Google ID), email, name, picture, email_verified

5. **Create or update user in database:**
   - Check if user exists by google_id
   - If exists: update profile info, last_login_at
   - If new: create user record with info from Google
   - Update email_verified status

6. **Store OAuth tokens (encrypted):**
   - Encrypt access_token and refresh_token with AES-256-GCM
   - Store in oauth_tokens table
   - Calculate expires_at from expires_in
   - Associate with user_id

7. **Create session:**
   - Generate secure random session_token (32 bytes)
   - Generate secure random refresh_token (32 bytes)
   - Hash both tokens with SHA-256 before storing
   - Store in sessions table with metadata
   - Set expires_at based on SESSION_DURATION_HOURS
   - Return unhashed session_token to frontend

8. **Log audit event:**
   - Record successful login in audit_logs table
   - Include IP address and user agent

---

#### 2.3.3 Token Refresh Handler
**File:** `src-tauri/src/auth/oauth.rs`

**Function:** `refresh_google_token(user_id)`

**Requirements:**
1. Fetch encrypted refresh_token from oauth_tokens table
2. Decrypt refresh_token
3. Make POST request to Google token endpoint with grant_type=refresh_token
4. Parse new access_token and expires_in
5. Encrypt and update access_token in database
6. Update expires_at
7. If refresh_token fails (revoked), invalidate all user sessions
8. Log refresh event in audit logs

**Automatic refresh logic:**
- Check token expiration before each Google API call
- Auto-refresh if token expires within 5 minutes
- Implement retry logic for transient failures
- Handle refresh token expiration gracefully

---

### 2.4 Session Management

#### 2.4.1 Session Creation
**File:** `src-tauri/src/auth/session.rs`

**Function:** `create_session(user_id, device_info, ip_address, user_agent)`

**Requirements:**
- Generate cryptographically secure session_token (32 bytes random)
- Generate cryptographically secure refresh_token (32 bytes random)
- Hash both tokens with SHA-256 for database storage
- Store session in database with device metadata
- Set expires_at = now + SESSION_DURATION_HOURS
- Return unhashed session_token to caller (never return again)
- Limit active sessions per user (e.g., max 10 devices)

---

#### 2.4.2 Session Validation
**File:** `src-tauri/src/auth/session.rs`

**Function:** `validate_session(session_token)`

**Requirements:**
1. Hash incoming session_token with SHA-256
2. Query sessions table by hashed token
3. Check if session exists
4. Check if session is not revoked (revoked_at IS NULL)
5. Check if session hasn't expired (expires_at > NOW())
6. Fetch associated user from users table
7. Check if user is active and not deleted
8. Update last_used_at to current timestamp
9. Return user info and session metadata
10. Return error if any validation fails

**Validation errors:**
- `SessionNotFound` - Invalid token
- `SessionExpired` - Token expired, client should refresh
- `SessionRevoked` - Manually revoked, client must re-authenticate
- `UserInactive` - User account deactivated

---

#### 2.4.3 Session Refresh
**File:** `src-tauri/src/auth/session.rs`

**Function:** `refresh_session(refresh_token)`

**Requirements:**
1. Hash incoming refresh_token with SHA-256
2. Query sessions table by hashed refresh token
3. Validate refresh token (not expired, not revoked)
4. Generate new session_token
5. Update session record with new hashed session_token
6. Extend expires_at by SESSION_DURATION_HOURS
7. Update last_used_at
8. Return new unhashed session_token
9. Keep same refresh_token (only rotate on explicit logout)

**Refresh token rotation (optional, enhanced security):**
- Generate new refresh_token on each refresh
- Update database with new hashed refresh_token
- Return both new session_token and refresh_token
- Invalidate old refresh_token

---

#### 2.4.4 Session Revocation
**File:** `src-tauri/src/auth/session.rs`

**Functions:**
- `revoke_session(session_id, user_id)` - Revoke single session
- `revoke_all_sessions(user_id)` - Revoke all user sessions
- `revoke_device_sessions(user_id, device_id)` - Revoke all sessions for a device

**Requirements:**
- Set revoked_at to current timestamp
- Verify user_id matches session owner
- Log revocation in audit_logs
- Clear any cached session data
- Return success/failure status

---

#### 2.4.5 Session Cleanup
**File:** `src-tauri/src/auth/session.rs`

**Function:** `cleanup_expired_sessions()`

**Requirements:**
- Run as background task every hour
- Delete sessions where expires_at < NOW()
- Delete sessions where revoked_at < (NOW() - 30 days)
- Log cleanup statistics
- Handle large batches efficiently (batch delete)

---

### 2.5 Middleware & Authorization

#### 2.5.1 Authentication Middleware
**File:** `src-tauri/src/auth/middleware.rs`

**Purpose:** Intercept all Tauri IPC commands requiring authentication.

**Implementation:**
- Create custom Tauri command wrapper
- Extract session_token from command context
- Call `validate_session(session_token)`
- Inject user info into command handler
- Return 401 Unauthorized if validation fails
- Allow specific commands without auth (login, public info)

**Usage pattern:**
```rust
// Protect command with auth middleware
#[tauri::command]
#[authenticated] // Custom macro
async fn protected_command(
    user: AuthUser, // Injected by middleware
    // ... other params
) -> Result<Response, Error> {
    // user.id, user.email available here
}
```

---

#### 2.5.2 Authorization & Permissions
**File:** `src-tauri/src/auth/permissions.rs`

**Purpose:** Check user permissions for specific actions.

**Permission levels (for future expansion):**
- `user` - Standard user permissions
- `admin` - Administrative permissions
- `owner` - Organization owner permissions

**Functions:**
- `check_permission(user_id, resource, action)` - Check if user can perform action
- `check_quota(user_id)` - Check if user has available quota
- `check_subscription(user_id)` - Verify active subscription

**Resource types:**
- `project` - Project management
- `thread` - Conversation threads
- `settings` - User settings
- `subscription` - Subscription management

---

### 2.6 Encryption & Security Utilities

#### 2.6.1 Token Encryption
**File:** `src-tauri/src/auth/encryption.rs`

**Functions:**
- `encrypt_token(plaintext)` - Encrypt using AES-256-GCM
- `decrypt_token(ciphertext)` - Decrypt token
- `hash_session_token(token)` - SHA-256 hash for storage
- `generate_secure_token()` - Generate random token

**Encryption requirements:**
- Use AES-256-GCM authenticated encryption
- Generate random IV (nonce) for each encryption
- Store IV with ciphertext (prepend to encrypted data)
- Use authenticated encryption to prevent tampering
- Derive encryption key from environment variable
- Never log or expose encryption keys
- Implement key rotation strategy

---

#### 2.6.2 Rate Limiting
**File:** `src-tauri/src/auth/rate_limit.rs`

**Purpose:** Prevent brute force attacks and abuse.

**Implementation:**
- Track failed login attempts by IP and email
- Implement exponential backoff after failures
- Rate limits:
  - 5 failed logins per email per hour
  - 20 failed logins per IP per hour
  - 100 API requests per user per minute
- Store rate limit data in Redis (or PostgreSQL if no Redis)
- Return 429 Too Many Requests when exceeded
- Log rate limit violations

---

### 2.7 Tauri IPC Commands

#### Authentication Commands
**File:** `src-tauri/src/auth/commands.rs`

**Command:** `auth_login()`
- Initiates OAuth flow
- Generates authorization URL
- Opens URL in system browser
- Returns state parameter for callback validation

**Command:** `auth_callback(code, state)`
- Handles OAuth callback
- Validates code and state
- Creates session
- Returns session_token and user info

**Command:** `auth_logout(session_token)`
- Revokes current session
- Clears frontend storage
- Returns success status

**Command:** `auth_refresh(refresh_token)`
- Refreshes expired session
- Returns new session_token

**Command:** `auth_get_current_user(session_token)`
- Returns current authenticated user info
- Includes subscription and quota info

**Command:** `auth_list_sessions(session_token)`
- Lists all active sessions for current user
- Includes device info and last used timestamp

**Command:** `auth_revoke_session(session_token, session_id)`
- Revokes specific session
- Used for "log out other devices" feature

---

## Phase 3: Frontend Authentication UI

### 3.1 Authentication Store (Zustand)

#### File: `src/stores/auth-store.ts`

**State structure:**
- `user` - Current authenticated user (null if not logged in)
- `sessionToken` - Active session token
- `refreshToken` - Token for session refresh
- `isAuthenticated` - Boolean auth status
- `isLoading` - Loading state during auth operations
- `error` - Authentication error message

**Actions:**
- `login()` - Initiates OAuth login flow
- `logout()` - Logs out and clears session
- `refreshSession()` - Refreshes expired session
- `loadUserFromStorage()` - Loads session on app startup
- `clearAuth()` - Clears all auth state

**Persistence:**
- Use Zustand persist middleware
- Store in localStorage (web) or secure storage (desktop)
- Only persist sessionToken and refreshToken, not full user object
- Clear on logout or session expiration

---

### 3.2 Authentication Components

#### 3.2.1 Login Screen
**File:** `src/components/auth/login-screen.tsx`

**Features:**
- Display app branding and tagline
- "Sign in with Google" button (glassmorphism styled)
- Loading state during OAuth flow
- Error display for auth failures
- Privacy policy and terms of service links

**UI Requirements:**
- Full-screen centered layout
- iOS 26 glassmorphism background
- Animated gradient background (subtle)
- Smooth loading spinner
- Error toast notifications
- Responsive design (mobile + desktop)

**User flow:**
1. User clicks "Sign in with Google"
2. Show loading spinner
3. Call `auth_login()` Tauri command
4. Open returned OAuth URL in browser
5. Wait for callback (via deep link or localhost redirect)
6. Call `auth_callback()` with code and state
7. Store session tokens in auth store
8. Redirect to main app

---

#### 3.2.2 OAuth Callback Handler
**File:** `src/routes/auth-callback.tsx`

**Purpose:** Handle OAuth redirect from Google.

**Implementation:**
- Extract `code` and `state` from URL query params
- Display loading message ("Completing sign in...")
- Call `auth_callback(code, state)` Tauri command
- Handle success: store tokens, redirect to app
- Handle errors: show error message, return to login
- Handle timeout: retry logic or return to login

**Error handling:**
- Invalid state - "Authentication failed, please try again"
- Expired code - "Session expired, please sign in again"
- Network error - "Connection error, please check your internet"
- Server error - "Authentication error, please try again later"

---

#### 3.2.3 Protected Route Wrapper
**File:** `src/components/auth/protected-route.tsx`

**Purpose:** Wrap routes requiring authentication.

**Implementation:**
- Check if user is authenticated
- If not authenticated: redirect to login screen
- If authenticated but session expired: attempt refresh
- If refresh fails: redirect to login
- Show loading state during checks
- Pass authenticated user to child components

**Usage:**
```tsx
<Route path="/chat" element={
  <ProtectedRoute>
    <ChatView />
  </ProtectedRoute>
} />
```

---

#### 3.2.4 User Profile Menu
**File:** `src/components/auth/user-profile-menu.tsx`

**Features:**
- Display user avatar (from Google profile)
- Display user name and email
- Subscription plan badge (Free/Pro/Enterprise)
- Quota usage display (progress bar)
- Navigation to settings
- Active sessions management link
- Logout button

**UI Requirements:**
- Dropdown menu from avatar in header
- Glassmorphism card design
- Smooth animations (fade + slide)
- Avatar with loading state
- Fallback avatar for missing images

---

#### 3.2.5 Session Management UI
**File:** `src/components/auth/session-manager.tsx`

**Features:**
- List all active sessions
- Display device name, type, last used time
- Current session indicator
- Revoke button for each session
- "Revoke all other sessions" button
- Loading states during revocation
- Success/error feedback

**Session list display:**
- Device icon based on device_type
- Device name (e.g., "Chrome on MacBook Pro")
- Location (from IP address, optional)
- Last active timestamp (relative time)
- Current device badge
- Revoke button (disabled for current session)

---

### 3.3 Authentication Hooks

#### 3.3.1 useAuth Hook
**File:** `src/hooks/use-auth.ts`

**Returns:**
- `user` - Current user object
- `isAuthenticated` - Boolean
- `isLoading` - Boolean
- `login()` - Login function
- `logout()` - Logout function
- `refreshSession()` - Refresh function

**Usage:**
```tsx
const { user, isAuthenticated, login, logout } = useAuth();
```

---

#### 3.3.2 useRequireAuth Hook
**File:** `src/hooks/use-require-auth.ts`

**Purpose:** Ensure component has authenticated user.

**Implementation:**
- Call `useAuth()` internally
- If not authenticated, redirect to login
- Show loading state during redirect
- Return user object once authenticated

**Usage:**
```tsx
const user = useRequireAuth(); // Guarantees user is authenticated
```

---

#### 3.3.3 useSession Hook
**File:** `src/hooks/use-session.ts`

**Purpose:** Manage session lifecycle.

**Features:**
- Auto-refresh session before expiration
- Handle session expiration events
- Monitor session health
- Clear session on logout

**Implementation:**
- Check session expiration every 5 minutes
- Refresh if expires within 30 minutes
- Show warning toast 5 minutes before expiration
- Auto-logout on expiration if refresh fails

---

### 3.4 Token Storage & Security

#### Web Platform (Vite)
- Store session_token in httpOnly cookie (if possible via Tauri)
- Store refresh_token in localStorage (encrypted client-side)
- Clear all storage on logout
- Implement XSS protection
- Use Content Security Policy headers

#### Desktop Platform (Tauri)
- Store tokens in Tauri secure storage (encrypted)
- Never expose tokens to DevTools
- Clear tokens on app close (optional)
- Use Tauri's secure keychain integration

---

### 3.5 Error Handling & User Feedback

#### Error Types
- `AuthenticationError` - Invalid credentials, expired session
- `NetworkError` - Connection failures
- `ServerError` - Backend errors
- `QuotaExceededError` - Rate limit or usage quota exceeded

#### Error Display
- Toast notifications for transient errors
- Modal dialogs for critical errors requiring action
- Inline error messages for form validation
- Retry buttons where appropriate
- Clear error messages (user-friendly, not technical)

#### Loading States
- Skeleton loaders for content
- Spinner for async operations
- Progress bars for long operations
- Optimistic UI updates where safe

---

## Phase 4: SaaS Features Integration

### 4.1 Quota Management

#### Quota Check Middleware
**File:** `src-tauri/src/saas/quota.rs`

**Function:** `check_quota(user_id, request_type)`

**Requirements:**
- Fetch user subscription from database
- Check quota_used_requests against quota_monthly_requests
- Increment quota_used_requests on successful request
- Return error if quota exceeded
- Reset quota_used_requests when quota_reset_at is reached
- Log quota usage in usage_metrics table

**Quota enforcement:**
- Check before executing expensive operations (LLM requests)
- Allow free operations (reading history, settings)
- Provide clear error message when quota exceeded
- Suggest upgrade path in error response

---

#### Quota Display in UI
**File:** `src/components/saas/quota-widget.tsx`

**Display:**
- Current usage vs. limit (e.g., "1,234 / 10,000 requests")
- Progress bar with color coding (green → yellow → red)
- Time until quota reset
- Upgrade button if approaching limit

---

### 4.2 Subscription Management

#### Subscription Commands
**File:** `src-tauri/src/saas/subscription.rs`

**Commands:**
- `get_subscription(user_id)` - Fetch current subscription details
- `upgrade_subscription(user_id, plan)` - Initiate upgrade (Stripe integration)
- `cancel_subscription(user_id)` - Cancel at end of period
- `update_payment_method(user_id)` - Update Stripe payment info

#### Subscription UI
**File:** `src/components/saas/subscription-manager.tsx`

**Features:**
- Display current plan and status
- Show pricing tiers (Free, Pro, Enterprise)
- Upgrade/downgrade buttons
- Billing history
- Invoice downloads
- Payment method management

---

### 4.3 BYOK (Bring Your Own Key) Feature

#### API Key Management
**File:** `src-tauri/src/saas/api-keys.rs`

**Commands:**
- `add_api_key(user_id, provider, key_name, api_key)` - Store encrypted key
- `list_api_keys(user_id)` - List all keys (without revealing key value)
- `delete_api_key(user_id, key_id)` - Remove API key
- `set_default_key(user_id, key_id)` - Set as default for provider

**Security:**
- Encrypt API keys with AES-256-GCM
- Never return full API key (show last 4 chars only)
- Validate API key before storing (make test request)
- Log API key usage in audit logs

#### BYOK UI
**File:** `src/components/saas/api-key-manager.tsx`

**Features:**
- Add new API key form
- List saved keys with provider icons
- Default key indicator
- Test button to validate keys
- Delete confirmation dialog
- Masked key display (show only last 4 characters)

---

### 4.4 Cloud Sync & Multi-Device Support

#### Sync Strategy
**File:** `src-tauri/src/saas/sync.rs`

**Requirements:**
- Local database (SQLite) for offline access
- Cloud database (PostgreSQL) as source of truth
- Sync on app startup
- Sync on reconnection after offline
- Conflict resolution strategy (server wins)
- Incremental sync (only changed data)

**Sync process:**
1. Fetch last sync timestamp from local DB
2. Request changes since last sync from server
3. Apply changes to local DB
4. Push local changes to server
5. Update last sync timestamp

**Synced data:**
- User settings
- Project metadata
- Thread history
- Chat messages
- Git state
- Terminal history (optional)

#### Sync UI
**File:** `src/components/saas/sync-indicator.tsx`

**Display:**
- Sync status (synced, syncing, offline)
- Last sync timestamp
- Sync error indicator
- Manual sync button

---

## Phase 5: Telemetry & Analytics (GDPR Compliant)

### 5.1 Analytics Implementation

#### Analytics Service
**File:** `src-tauri/src/telemetry/analytics.rs`

**Events to track:**
- User login/logout
- Feature usage (chat, terminal, git, etc.)
- Error occurrences
- Performance metrics (request duration)
- Subscription events (upgrade, cancel)

**GDPR Compliance:**
- Opt-in analytics preference
- User consent required before tracking
- Anonymize IP addresses (last octet removed)
- No tracking of sensitive data (API keys, code, messages)
- Allow user to request data deletion
- Clear privacy policy

**Data retention:**
- Store analytics in separate database/service
- Aggregate data after 90 days
- Delete raw events after 180 days
- Allow user to export their data

---

### 5.2 Error Tracking

#### Error Reporting
**File:** `src-tauri/src/telemetry/error-tracking.rs`

**Requirements:**
- Capture unhandled errors
- Log error context (user_id, session_id, timestamp)
- Send to error tracking service (Sentry, Rollbar, or custom)
- Never log sensitive data (tokens, keys, passwords)
- Allow user to opt out of error reporting

---

### 5.3 Performance Monitoring

#### Performance Metrics
**File:** `src-tauri/src/telemetry/performance.rs`

**Metrics to track:**
- API request duration
- Database query performance
- OAuth flow completion time
- Session validation time
- Frontend render performance

**Implementation:**
- Use tracing for instrumentation
- Export metrics to monitoring service (Prometheus, DataDog)
- Alert on performance degradation
- Dashboard for real-time monitoring

---

## Phase 6: Testing & Validation

### 6.1 Unit Tests

#### Backend Tests
**Files:** `src-tauri/src/auth/*.rs` (test modules)

**Test coverage:**
- OAuth flow (mock Google API)
- Session creation and validation
- Token encryption/decryption
- Token refresh logic
- Session revocation
- Quota enforcement
- Database operations (use test database)

**Testing tools:**
- Use `tokio::test` for async tests
- Use `sqlx::test` for database tests
- Mock HTTP requests with `mockito`
- Test fixtures for consistent test data

---

#### Frontend Tests
**Files:** `src/**/*.test.tsx`

**Test coverage:**
- Authentication store actions
- Protected route behavior
- Login/logout flows (mock Tauri commands)
- Error handling
- Token refresh logic
- UI components rendering

**Testing tools:**
- Vitest for test runner
- React Testing Library for component tests
- Mock Tauri commands with test utilities

---

### 6.2 Integration Tests

#### End-to-End Auth Flow
**File:** `tests/integration/auth-flow.test.rs`

**Test scenarios:**
1. Complete OAuth login flow
2. Session validation
3. Token refresh
4. Logout and session cleanup
5. Multi-device session management
6. Quota enforcement
7. Subscription checks

**Testing environment:**
- Use Docker for test database
- Mock Google OAuth responses
- Clean database between tests
- Test with different user states (free, pro, expired)

---

### 6.3 Security Testing

#### Security Checklist
- [ ] Test for SQL injection vulnerabilities
- [ ] Test for XSS vulnerabilities
- [ ] Test CSRF protection (state parameter)
- [ ] Test session hijacking prevention
- [ ] Test token encryption strength
- [ ] Test rate limiting effectiveness
- [ ] Test password/token hashing (use Argon2)
- [ ] Verify HTTPS enforcement
- [ ] Test secure cookie attributes
- [ ] Audit dependencies for vulnerabilities

**Tools:**
- OWASP ZAP for penetration testing
- `cargo audit` for dependency scanning
- Manual code review for security issues

---

## Phase 7: Deployment & DevOps

### 7.1 Database Migration Workflow

#### Development
- Run migrations automatically on app startup
- Use `sqlx migrate run` command
- Test rollback migrations

#### Production
- Run migrations manually before deployment
- Use migration CLI with dry-run mode
- Backup database before migrations
- Monitor migration execution
- Have rollback plan ready

---

### 7.2 Environment Configuration

#### Environment Files
- `.env.development` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment

#### Required Secrets
- Google OAuth credentials (per environment)
- Database connection strings
- Encryption keys (generate per environment)
- JWT secrets (unique per environment)
- Third-party API keys (Stripe, analytics)

#### Secret Management
- Use environment variables for secrets
- Never commit secrets to git
- Use secret management service (AWS Secrets Manager, Vault)
- Rotate secrets regularly
- Audit secret access

---

### 7.3 Monitoring & Logging

#### Logging Strategy
- Use structured logging (JSON format)
- Log levels: ERROR, WARN, INFO, DEBUG
- Never log sensitive data (tokens, keys, passwords)
- Centralized logging service (CloudWatch, DataDog)
- Log rotation and retention policies

#### Monitoring
- Database connection pool health
- API response times
- Error rates
- Session creation/validation rates
- Quota usage trends
- Active user metrics

#### Alerts
- High error rate
- Database connection failures
- OAuth failures
- Quota exceeded for multiple users
- Unusual login patterns (potential attack)

---

## Phase 8: Documentation

### 8.1 Developer Documentation

**Topics:**
- Authentication architecture overview
- OAuth flow diagram
- Database schema reference
- API endpoint documentation
- Error code reference
- Testing guidelines
- Deployment procedures
- Security best practices

---

### 8.2 User Documentation

**Topics:**
- How to sign in with Google
- Managing active sessions
- Understanding quota limits
- Upgrading subscription
- BYOK setup guide
- Privacy and data handling
- Account deletion process

---

## Success Criteria

### Functional Requirements
- [ ] User can sign in with Google OAuth
- [ ] Session persists across app restarts
- [ ] Session refresh works before expiration
- [ ] Multi-device sessions supported
- [ ] User can revoke sessions from UI
- [ ] Quota enforcement works correctly
- [ ] Subscription status properly displayed
- [ ] BYOK feature functional
- [ ] All auth operations logged
- [ ] GDPR compliance verified

### Security Requirements
- [ ] All tokens encrypted at rest
- [ ] Sessions use secure random tokens
- [ ] CSRF protection implemented (OAuth state)
- [ ] Rate limiting prevents brute force
- [ ] SQL injection prevented (prepared statements)
- [ ] XSS protection in frontend
- [ ] Secure token storage (httpOnly cookies)
- [ ] Regular security audits pass

### Performance Requirements
- [ ] Session validation < 50ms
- [ ] OAuth flow completes < 5 seconds
- [ ] Database queries optimized (indexed)
- [ ] No N+1 queries
- [ ] Frontend loads < 2 seconds

### User Experience Requirements
- [ ] Clear error messages
- [ ] Loading states for all async operations
- [ ] Smooth animations (no jank)
- [ ] Responsive design (mobile + desktop)
- [ ] Glassmorphism UI applied consistently
- [ ] Accessibility standards met (WCAG 2.1 AA)

---

## Dependencies & Tools

### Rust Crates
- `oauth2` ^4.4
- `reqwest` ^0.11
- `sqlx` ^0.7 (with PostgreSQL and runtime tokio)
- `tokio` ^1.35
- `serde` ^1.0
- `serde_json` ^1.0
- `jsonwebtoken` ^9.2
- `argon2` ^0.5
- `sha2` ^0.10
- `aes-gcm` ^0.10
- `rand` ^0.8
- `chrono` ^0.4
- `uuid` ^1.6 (with v4 and serde features)
- `anyhow` ^1.0
- `thiserror` ^1.0
- `tracing` ^0.1
- `tracing-subscriber` ^0.3
- `tauri` (already installed)

### Frontend Dependencies
- React 19
- TanStack Router (already installed)
- Zustand (already installed)
- `@tanstack/react-query` (for data fetching)
- `date-fns` (for date formatting)
- `zod` (for validation)

### Infrastructure
- PostgreSQL 15+ (cloud-hosted: Neon, Supabase, AWS RDS)
- Redis (optional, for rate limiting and caching)
- Google Cloud Console (OAuth credentials)
- Stripe (for subscriptions)

---

## Estimated Effort

### Phase 1: Database & Migrations
- Schema design: 1 day
- Migration files: 1 day
- Migration tooling setup: 1 day
- **Subtotal: 3 days**

### Phase 2: Rust Backend
- OAuth implementation: 3 days
- Session management: 2 days
- Encryption & security: 2 days
- Middleware & permissions: 2 days
- Tauri commands: 1 day
- **Subtotal: 10 days**

### Phase 3: Frontend UI
- Auth store: 1 day
- Login screen: 1 day
- OAuth callback handler: 1 day
- Protected routes: 1 day
- User profile menu: 1 day
- Session manager UI: 2 days
- Hooks and utilities: 1 day
- **Subtotal: 8 days**

### Phase 4: SaaS Features
- Quota management: 2 days
- Subscription management: 3 days
- BYOK feature: 2 days
- Cloud sync: 3 days
- **Subtotal: 10 days**

### Phase 5: Telemetry
- Analytics service: 2 days
- Error tracking: 1 day
- Performance monitoring: 1 day
- **Subtotal: 4 days**

### Phase 6: Testing
- Unit tests: 3 days
- Integration tests: 3 days
- Security testing: 2 days
- **Subtotal: 8 days**

### Phase 7: Deployment & DevOps
- Environment setup: 2 days
- Monitoring & logging: 2 days
- Deployment procedures: 1 day
- **Subtotal: 5 days**

### Phase 8: Documentation
- Developer docs: 2 days
- User docs: 1 day
- **Subtotal: 3 days**

**Total Estimated Effort: 51 days (~10 weeks)**

---

## File Structure Overview

```
src-tauri/
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_sessions.sql
│   ├── 003_create_oauth_tokens.sql
│   ├── 004_create_api_keys.sql
│   ├── 005_create_subscriptions.sql
│   ├── 006_create_audit_logs.sql
│   ├── 007_create_usage_metrics.sql
│   └── 008_create_indexes.sql
├── src/
│   ├── config.rs                     # Environment configuration
│   ├── db/
│   │   ├── mod.rs                    # Database connection pool
│   │   └── models.rs                 # Database model structs
│   ├── auth/
│   │   ├── mod.rs
│   │   ├── oauth.rs                  # OAuth flow implementation
│   │   ├── session.rs                # Session management
│   │   ├── encryption.rs             # Token encryption
│   │   ├── middleware.rs             # Auth middleware
│   │   ├── permissions.rs            # Authorization logic
│   │   ├── rate_limit.rs             # Rate limiting
│   │   └── commands.rs               # Tauri commands
│   ├── saas/
│   │   ├── mod.rs
│   │   ├── quota.rs                  # Quota management
│   │   ├── subscription.rs           # Subscription logic
│   │   ├── api_keys.rs               # BYOK feature
│   │   └── sync.rs                   # Cloud sync
│   ├── telemetry/
│   │   ├── mod.rs
│   │   ├── analytics.rs              # Analytics service
│   │   ├── error_tracking.rs         # Error reporting
│   │   └── performance.rs            # Performance monitoring
│   └── main.rs                       # Tauri app entry point

src/
├── stores/
│   └── auth-store.ts                 # Authentication Zustand store
├── components/
│   └── auth/
│       ├── login-screen.tsx          # Login UI
│       ├── protected-route.tsx       # Route protection
│       ├── user-profile-menu.tsx     # User menu
│       └── session-manager.tsx       # Session management UI
├── hooks/
│   ├── use-auth.ts                   # Auth hook
│   ├── use-require-auth.ts           # Required auth hook
│   └── use-session.ts                # Session hook
├── routes/
│   └── auth-callback.tsx             # OAuth callback route
└── lib/
    └── auth-utils.ts                 # Auth utilities
```

---

## Notes & Best Practices

### Security
- Never log sensitive data (tokens, keys, passwords)
- Use parameterized queries (prevent SQL injection)
- Implement rate limiting on all auth endpoints
- Use HTTPS in production (enforce)
- Store secrets in environment variables, not code
- Rotate encryption keys regularly
- Implement session timeout warnings
- Use secure random number generation for tokens

### Performance
- Index database columns used in WHERE clauses
- Use connection pooling for database
- Cache user info in memory (with TTL)
- Implement pagination for session lists
- Use lazy loading for heavy components
- Optimize bundle size (code splitting)

### User Experience
- Provide clear error messages (user-friendly)
- Show loading states for all async operations
- Implement optimistic UI updates where safe
- Use toast notifications for feedback
- Support keyboard navigation
- Ensure mobile responsiveness
- Follow iOS 26 glassmorphism design system

### Compliance
- Obtain user consent for analytics
- Provide privacy policy and terms of service
- Allow users to export their data
- Allow users to delete their account
- Anonymize IP addresses in logs
- Implement data retention policies
- GDPR compliance for EU users
- CCPA compliance for California users

---

## Commit Strategy

Following AGENTS.md guidelines:

1. Commit after each file creation/modification
2. Use descriptive commit messages
3. Commit pattern:
   - `git add <file>`
   - `git commit -m "auth: add OAuth flow implementation"`
4. Never batch multiple changes in one commit
5. Commit migrations individually
6. Commit tests with implementation
7. Use conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for refactoring
   - `test:` for tests
   - `docs:` for documentation
   - `chore:` for maintenance

---

## Next Steps

After completing this implementation plan:

1. Review plan with team/stakeholders
2. Set up Google OAuth credentials in Google Cloud Console
3. Provision PostgreSQL database (cloud provider)
4. Set up development environment variables
5. Begin Phase 1 (Database schema)
6. Follow phases sequentially
7. Test thoroughly at each phase
8. Document as you build
9. Commit frequently
10. Deploy to staging for testing before production

---

**End of Implementation Plan**
