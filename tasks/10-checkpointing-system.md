# Task 10: Checkpointing & Versioning History

## Overview
Port the capability that `t3code` uses to snapshot the workspace and roll back file changes when discarding a conversation turn or navigating history.

## Reference Sources (`ref.md`)
- `apps/server/src/checkpointing/CheckpointStore.ts`
- `apps/server/src/checkpointing/Diffs.ts`
- `apps/server/src/checkpointing/Utils.ts`

## Details
1. **Diff Computation & Storage:** Like `Diffs.ts`, you need a mechanism to compute structural byte-level diffs or file-level snapshots. Implement this using standard Rust crate tools (e.g., `similar` or `text_diff` crates).
2. **Checkpoint Store:** Rebuild `CheckpointStore.ts` in Rust. As events stream through the system, store file snapshots alongside the corresponding conversation "turn ID".
3. **Restoration Logic:** Add Tauri commands to allow the frontend to invoke a rollback. Write Rust file I/O operations to instantly truncate modified text back to the designated checkpoint blobs.
4. **Integration with SQLite:** Store these compressed diff blobs into local SQLite projections efficiently.

> **MCP Usage Reminder:** Finding the optimal Rust library to compute code diffs efficiently can be tedious. Use the **Context7 MCP tool** (`mcp_upstash_conte_resolve-library-id`, `mcp_upstash_conte_query-docs`) to look up crates like `similar` or `im-rc` for text diffs and persistent data structures. Use **Browser tools** if needed to verify advanced text alignment examples.