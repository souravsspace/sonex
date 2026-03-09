# Task 05: Workspace & Persistence (Rust + SQLite)

## Reference Sources (`ref.md`)
- `apps/server/src/persistence/*` (NodeSqliteClient.ts, Migrations/)
- `apps/server/src/workspaceEntries.ts`, `attachmentStore.ts`, `imageMime.ts`
- `packages/contracts/src/project.ts`

## Details
1. **Rust SQLite Layer:** Migrate `.ts` migrations found in `apps/server/src/persistence/Migrations/` to Rust using `rusqlite` or `sqlx` (or `tauri-plugin-sql`). We need tables for `OrchestrationEvents`, `Checkpoints`, `Threads`, and `ProviderSessionRuntime`.
2. **File System Management:** Replace `workspaceEntries.ts`. Implement Rust Tauri commands that use `std::fs` to read files safely. Ensure you map paths relative to the current workspace root to prevent malicious directory traversal.
3. **Attachments:** Rewrite `attachmentStore.ts` to handle local image reading/parsing in Rust, sending base64/blobs back to the frontend.