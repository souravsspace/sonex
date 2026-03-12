# Task 04: The IPC Bridge `(Replacing WebSocket)`

## Reference Sources (`ref.md`)
- `apps/web/src/wsNativeApi.ts` -> becomes Tauri Invoke
- `apps/web/src/wsTransport.ts` -> replace with Tauri Event Listeners
- `apps/web/src/nativeApi.ts` -> standard abstraction
- `packages/contracts/src/ipc.ts` -> definition map
- `apps/server/src/wsServer.ts` -> backend counterpart (now in Rust)

## Overview
Replace the WebSocket-based IPC system with Tauri's native IPC mechanism using `invoke()` for frontend→backend calls and `emit()`/`listen()` for backend→frontend events.

---

## Implementation Plan

### Phase 1: Contract Definition & TypeScript Setup

#### 1.1 Create IPC Contract Definitions
**File:** `src/lib/ipc-contracts.ts`

Define TypeScript interfaces for all IPC methods based on `ref.md` analysis:

```typescript
// Request/Response types for each IPC command
export interface IPCContracts {
  // Project Management
  'project:list': { request: void; response: Project[] }
  'project:get': { request: { projectId: string }; response: Project }
  'project:create': { request: { path: string; name: string }; response: Project }
  
  // Thread Management
  'thread:list': { request: { projectId: string }; response: Thread[] }
  'thread:get': { request: { threadId: string }; response: Thread }
  'thread:create': { request: CreateThreadParams; response: Thread }
  'thread:delete': { request: { threadId: string }; response: void }
  
  // Message Operations
  'message:send': { request: SendMessageParams; response: void }
  'message:list': { request: { threadId: string }; response: Message[] }
  
  // Workspace Operations
  'workspace:getEntries': { request: { path: string }; response: WorkspaceEntry[] }
  'workspace:readFile': { request: { path: string }; response: string }
  'workspace:writeFile': { request: { path: string; content: string }; response: void }
  
  // Git Operations
  'git:status': { request: { projectId: string }; response: GitStatus }
  'git:branch': { request: { projectId: string }; response: GitBranch[] }
  'git:commit': { request: CommitParams; response: void }
  
  // Terminal Operations
  'terminal:create': { request: { projectId: string }; response: Terminal }
  'terminal:input': { request: { terminalId: string; input: string }; response: void }
  'terminal:resize': { request: { terminalId: string; cols: number; rows: number }; response: void }
  'terminal:close': { request: { terminalId: string }; response: void }
  
  // Settings & Config
  'settings:get': { request: void; response: AppSettings }
  'settings:update': { request: Partial<AppSettings>; response: void }
  'keybindings:get': { request: void; response: Keybinding[] }
}

// Event types for backend→frontend push
export interface IPCEvents {
  'orchestration:domainEvent': OrchestrationEvent
  'provider:runtimeEvent': ProviderRuntimeEvent
  'terminal:output': { terminalId: string; data: string }
  'git:statusChanged': { projectId: string; status: GitStatus }
}
```

**Tasks:**
- [ ] Analyze `ref.md` for complete list of IPC methods
- [ ] Create comprehensive TypeScript contract definitions
- [ ] Add JSDoc documentation for each contract
- [ ] Export types for use in frontend and backend

---

#### 1.2 Create Native API Abstraction Layer
**File:** `src/lib/native-api.ts`

Create a type-safe wrapper around Tauri's `invoke()`:

```typescript
import { invoke } from '@tauri-apps/api/core'
import type { IPCContracts } from './ipc-contracts'

class NativeAPI {
  async call<K extends keyof IPCContracts>(
    command: K,
    request: IPCContracts[K]['request']
  ): Promise<IPCContracts[K]['response']> {
    try {
      return await invoke(command, { request })
    } catch (error) {
      console.error(`IPC call failed: ${command}`, error)
      throw error
    }
  }
}

export const nativeApi = new NativeAPI()

// Convenience methods for common operations
export const projectApi = {
  list: () => nativeApi.call('project:list', undefined),
  get: (projectId: string) => nativeApi.call('project:get', { projectId }),
  create: (path: string, name: string) => nativeApi.call('project:create', { path, name })
}

export const threadApi = {
  list: (projectId: string) => nativeApi.call('thread:list', { projectId }),
  get: (threadId: string) => nativeApi.call('thread:get', { threadId }),
  create: (params: CreateThreadParams) => nativeApi.call('thread:create', params),
  delete: (threadId: string) => nativeApi.call('thread:delete', { threadId })
}

// ... similar exports for other API groups
```

**Tasks:**
- [ ] Implement type-safe `invoke()` wrapper
- [ ] Add error handling and retry logic
- [ ] Create convenience API groups (project, thread, message, etc.)
- [ ] Add request/response logging in dev mode

---

#### 1.3 Create Event Listener System
**File:** `src/lib/native-events.ts`

Create type-safe event listeners for backend→frontend events:

```typescript
import { listen, type UnlistenFn } from '@tauri-apps/api/event'
import type { IPCEvents } from './ipc-contracts'

class NativeEvents {
  private listeners = new Map<string, UnlistenFn>()

  async listen<K extends keyof IPCEvents>(
    eventName: K,
    handler: (payload: IPCEvents[K]) => void
  ): Promise<UnlistenFn> {
    const unlisten = await listen(eventName, (event) => {
      handler(event.payload as IPCEvents[K])
    })
    
    const key = `${eventName}-${Date.now()}`
    this.listeners.set(key, unlisten)
    
    return () => {
      unlisten()
      this.listeners.delete(key)
    }
  }

  async cleanup() {
    for (const unlisten of this.listeners.values()) {
      unlisten()
    }
    this.listeners.clear()
  }
}

export const nativeEvents = new NativeEvents()

// React hooks for event listening
export function useIPCEvent<K extends keyof IPCEvents>(
  eventName: K,
  handler: (payload: IPCEvents[K]) => void
) {
  useEffect(() => {
    let unlisten: UnlistenFn | null = null
    
    nativeEvents.listen(eventName, handler).then((fn) => {
      unlisten = fn
    })
    
    return () => {
      unlisten?.()
    }
  }, [eventName, handler])
}
```

**Tasks:**
- [ ] Implement type-safe event listener system
- [ ] Create React hooks for event subscriptions
- [ ] Add automatic cleanup on unmount
- [ ] Handle reconnection scenarios

---

### Phase 2: Rust Backend Implementation

#### 2.1 Setup Rust IPC Command Structure
**File:** `src-tauri/src/ipc/mod.rs`

```rust
pub mod commands;
pub mod events;
pub mod types;

pub use commands::*;
pub use events::*;
pub use types::*;
```

**File:** `src-tauri/src/ipc/types.rs`

```rust
use serde::{Deserialize, Serialize};

// Mirror TypeScript types in Rust

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub path: String,
    pub created_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Thread {
    pub id: String,
    pub project_id: String,
    pub title: String,
    pub created_at: i64,
}

// ... more type definitions
```

**Tasks:**
- [ ] Create Rust type definitions matching TypeScript contracts
- [ ] Add serde serialization/deserialization
- [ ] Implement validation for incoming requests
- [ ] Add comprehensive error types

---

#### 2.2 Implement Tauri Commands
**File:** `src-tauri/src/ipc/commands.rs`

```rust
use tauri::State;
use crate::state::AppState;
use super::types::*;

// Project commands
#[tauri::command]
pub async fn project_list(state: State<'_, AppState>) -> Result<Vec<Project>, String> {
    state.db.list_projects().await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn project_get(
    project_id: String,
    state: State<'_, AppState>
) -> Result<Project, String> {
    state.db.get_project(&project_id).await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn project_create(
    path: String,
    name: String,
    state: State<'_, AppState>
) -> Result<Project, String> {
    state.db.create_project(path, name).await
        .map_err(|e| e.to_string())
}

// Thread commands
#[tauri::command]
pub async fn thread_list(
    project_id: String,
    state: State<'_, AppState>
) -> Result<Vec<Thread>, String> {
    state.db.list_threads(&project_id).await
        .map_err(|e| e.to_string())
}

// ... implement all other commands
```

**Tasks:**
- [ ] Implement all project management commands
- [ ] Implement thread management commands
- [ ] Implement message operations
- [ ] Implement workspace file operations
- [ ] Implement git operations
- [ ] Implement terminal operations
- [ ] Implement settings operations
- [ ] Add proper error handling for each command

---

#### 2.3 Implement Event Emitter System
**File:** `src-tauri/src/ipc/events.rs`

```rust
use tauri::{Manager, Window};
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct OrchestrationEvent {
    pub event_type: String,
    pub thread_id: String,
    pub payload: serde_json::Value,
}

pub fn emit_orchestration_event(window: &Window, event: OrchestrationEvent) {
    if let Err(e) = window.emit("orchestration:domainEvent", event) {
        eprintln!("Failed to emit orchestration event: {}", e);
    }
}

pub fn emit_terminal_output(window: &Window, terminal_id: String, data: String) {
    if let Err(e) = window.emit("terminal:output", serde_json::json!({
        "terminalId": terminal_id,
        "data": data
    })) {
        eprintln!("Failed to emit terminal output: {}", e);
    }
}

// ... more event emitters
```

**Tasks:**
- [ ] Create event emitter functions for all event types
- [ ] Add error handling for failed emissions
- [ ] Implement event batching for high-frequency events
- [ ] Add event filtering based on subscriptions

---

#### 2.4 Register Commands in Tauri
**File:** `src-tauri/src/main.rs`

```rust
use tauri::Manager;

mod ipc;
mod state;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Initialize app state
            let state = state::AppState::new()?;
            app.manage(state);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // Project commands
            ipc::project_list,
            ipc::project_get,
            ipc::project_create,
            
            // Thread commands
            ipc::thread_list,
            ipc::thread_get,
            ipc::thread_create,
            ipc::thread_delete,
            
            // Message commands
            ipc::message_send,
            ipc::message_list,
            
            // Workspace commands
            ipc::workspace_get_entries,
            ipc::workspace_read_file,
            ipc::workspace_write_file,
            
            // Git commands
            ipc::git_status,
            ipc::git_branch,
            ipc::git_commit,
            
            // Terminal commands
            ipc::terminal_create,
            ipc::terminal_input,
            ipc::terminal_resize,
            ipc::terminal_close,
            
            // Settings commands
            ipc::settings_get,
            ipc::settings_update,
            ipc::keybindings_get,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

**Tasks:**
- [ ] Register all Tauri commands
- [ ] Initialize app state management
- [ ] Configure command permissions
- [ ] Add command middleware for logging

---

### Phase 3: Frontend Integration

#### 3.1 Update React Components to Use Native API
**Files to update:**
- `src/components/chat-view.tsx`
- `src/components/composer-prompt-editor.tsx`
- `src/routes/_chat.$threadId.tsx`
- All components using old WebSocket API

**Migration pattern:**
```typescript
// BEFORE (WebSocket)
import { wsNativeApi } from './wsNativeApi'
const projects = await wsNativeApi.listProjects()

// AFTER (Tauri IPC)
import { projectApi } from '@/lib/native-api'
const projects = await projectApi.list()
```

**Tasks:**
- [ ] Identify all WebSocket API usage across components
- [ ] Replace with native API calls
- [ ] Update error handling patterns
- [ ] Test each component after migration

---

#### 3.2 Update Zustand Stores for Native Events
**Files to update:**
- `src/stores/composer-draft-store.ts`
- Any stores listening to WebSocket events

```typescript
// BEFORE
useEffect(() => {
  const unsub = wsTransport.subscribe('orchestration.domainEvent', handler)
  return unsub
}, [])

// AFTER
import { useIPCEvent } from '@/lib/native-events'
useIPCEvent('orchestration:domainEvent', handler)
```

**Tasks:**
- [ ] Update all Zustand stores to use native events
- [ ] Replace WebSocket subscriptions with IPC listeners
- [ ] Test state synchronization
- [ ] Verify cleanup on unmount

---

#### 3.3 Update React Query Integration
**Files:** `src/lib/*-react-query.ts`

```typescript
// Example: src/lib/project-react-query.ts
import { useQuery, useMutation } from '@tanstack/react-query'
import { projectApi } from '@/lib/native-api'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectApi.list()
  })
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => projectApi.get(projectId),
    enabled: !!projectId
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ path, name }: { path: string; name: string }) =>
      projectApi.create(path, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}
```

**Tasks:**
- [ ] Update all React Query hooks to use native API
- [ ] Configure proper cache invalidation
- [ ] Add optimistic updates where appropriate
- [ ] Test real-time data synchronization

---

### Phase 4: Testing & Validation

#### 4.1 Unit Tests
**Tasks:**
- [ ] Test native API wrapper with mocked Tauri invoke
- [ ] Test event listener registration/cleanup
- [ ] Test Rust command handlers with mock state
- [ ] Test type safety across TypeScript/Rust boundary

#### 4.2 Integration Tests
**Tasks:**
- [ ] Test complete request/response cycles
- [ ] Test event emission and reception
- [ ] Test error handling and edge cases
- [ ] Test concurrent request handling

#### 4.3 Migration Validation
**Tasks:**
- [ ] Verify all WebSocket code is removed
- [ ] Confirm no runtime WebSocket connections
- [ ] Test all major user flows (create project, chat, terminal, etc.)
- [ ] Performance testing vs old WebSocket system

---

### Phase 5: Cleanup & Documentation

#### 5.1 Remove Old WebSocket Code
**Files to delete:**
- `src/lib/ws-native-api.ts` (if exists)
- `src/lib/ws-transport.ts` (if exists)
- Any WebSocket-related utilities

**Tasks:**
- [ ] Remove all WebSocket dependencies from package.json
- [ ] Delete obsolete files
- [ ] Remove WebSocket configuration
- [ ] Update imports across codebase

#### 5.2 Documentation
**Tasks:**
- [ ] Document IPC contract definitions
- [ ] Add usage examples for native API
- [ ] Document event handling patterns
- [ ] Update AGENTS.md with IPC guidelines

---

## File Structure Summary

```
src/
├── lib/
│   ├── ipc-contracts.ts          # TypeScript contract definitions
│   ├── native-api.ts              # Tauri invoke wrapper
│   └── native-events.ts           # Event listener system
└── components/
    └── [updated to use native API]

src-tauri/src/
├── ipc/
│   ├── mod.rs                     # IPC module exports
│   ├── types.rs                   # Rust type definitions
│   ├── commands.rs                # Tauri command handlers
│   └── events.rs                  # Event emitters
├── state.rs                       # App state management
└── main.rs                        # Tauri setup & command registration
```

---

## Success Criteria

- ✅ All WebSocket code replaced with Tauri IPC
- ✅ Type-safe IPC calls in both TypeScript and Rust
- ✅ Real-time events working (terminal output, AI streaming)
- ✅ All existing features functional
- ✅ No WebSocket dependencies in package.json
- ✅ Unit tests passing
- ✅ Integration tests passing
- ✅ Performance equal or better than WebSocket system
- ✅ Code follows kebab-case naming convention
- ✅ Documentation complete

---

## Dependencies

**TypeScript:**
- `@tauri-apps/api` (already installed)
- `@tanstack/react-query` (already installed)

**Rust:**
- `tauri` (already configured)
- `serde` (already installed)
- `serde_json` (already installed)
- `tokio` (for async runtime)

---

## Estimated Effort

- **Phase 1:** 2-3 days (Contract definitions & TS setup)
- **Phase 2:** 4-5 days (Rust backend implementation)
- **Phase 3:** 3-4 days (Frontend integration)
- **Phase 4:** 2-3 days (Testing)
- **Phase 5:** 1 day (Cleanup & docs)

**Total:** ~12-16 days

---

## Notes

- Maintain backward compatibility during migration
- Test each phase before moving to next
- Keep commits small and focused
- Follow AGENTS.md commit guidelines (commit after every change)
- Use kebab-case for all new files
- Apply glassmorphism UI patterns where appropriate