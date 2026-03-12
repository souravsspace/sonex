# SaaS AI Coding Assistant Roadmap (Tauri + Vite + Rust + Anthropic)

_Based strictly on the t3code architecture found in `ref.md`._

<strong>
 All files names should be in kebab-case and also the ui should be like ios 26. glass morphism effect
</strong>

This roadmap maps the existing Node/Electron `t3code` architecture directly to a Rust/Tauri/Anthropic SaaS model.

> **MCP Usage Note:** For all tasks, you can utilize the `Context7` MCP (`mcp_upstash_conte_query-docs`, `mcp_upstash_conte_resolve-library-id`) to query up-to-date documentation on Vite, Tauri, Rust crates (like `git2`, `rusqlite`, `reqwest`), and React libraries. You can also use Browser MCP tools (`open_browser_page`, `fetch_webpage`) to fetch any external examples or missing context not covered by Context7.

## Phase 1: Frontend Migration (Vite + React)

- **Task 01: Core UI & Routing**
  Mapped from `apps/web/src/router.ts`, `routeTree.gen.ts`, and core layout components (`__root.tsx`). Setup shadcn UI from `apps/web/src/components/ui/`.
- **Task 02: Chat Mechanics & Composer**
  Porting `ComposerPromptEditor.tsx`, `ChatMarkdown.tsx`, `composer-logic.ts`, and `composerDraftStore.ts`. Adapt generic models from `packages/contracts/src/model.ts`.
- **Task 03: Diff Rendering & Client State**
  Porting `DiffPanel.tsx`, `diffRendering.ts`, and `store.ts` (Zustand/Redux).
- **Task 11: Session Settings & Keybindings**
  Mapped from `apps/web/src/keybindings.ts`, `appSettings.ts`.

## Phase 2: Tauri IPC & Backend Parity (Rust substitution)

- **Task 04: The IPC Bridge**
  Replacing `apps/web/src/wsNativeApi.ts` and WebSocket transport with Tauri `@tauri-apps/api`. Creating `nativeApi.ts` matching the interfaces in `packages/contracts/src/ipc.ts`.
- **Task 05: Workspace & Persistence (Rust + SQLite)**
  Replacing `apps/server/src/persistence/*` (like `NodeSqliteClient.ts` & Projections) and `apps/server/src/workspaceEntries.ts` with a Rust SQLite backend (`rusqlite`) and native file-system handlers.
- **Task 09: Orchestration Engine & Event Sourcing**
  Replacing `apps/server/src/orchestration/*`. Implementing CQRS / Event Sourcing logic (deciders, projectors) in Rust.
- **Task 10: Checkpointing & Versioning History**
  Replacing `apps/server/src/checkpointing/*` to handle thread rollback states.

## Phase 3: AI Engine & SaaS Layer

- **Task 06: Anthropic Integration (Replacing Codex)**
  Replacing `apps/server/src/provider/CodexAdapter.ts` and `codexAppServerManager.ts`. Implementing direct Anthropic API calls via Rust + SSE streaming back to the frontend.
- **Task 07: Auth & SaaS Logic**
  New layer absent in `t3code`. Implementing user accounts, SaaS tiers, pricing checks, and cloud sync.

## Phase 4: Advanced Tooling & Native Shell

- **Task 08: Git workflows & PTY Terminal**
  Replacing `apps/server/src/terminal/NodePTY.ts` with Rust's `portable-pty`. Porting over frontend `BranchToolbar.tsx`, `ThreadTerminalDrawer.tsx`, and `GitActionsControl.tsx`.
- **Task 12: Desktop Native Features**
  Replacing `apps/desktop/*` (Electron logic) with native Tauri plugins for Auto-updater, native OS dialogs, and OS jank fixes.

