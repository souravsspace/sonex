# Task 08: Git & Terminal Integration

## Reference Sources (`ref.md`)
- **Backend:** `apps/server/src/git/GitManager.ts`, `apps/server/src/terminal/NodePTY.ts`, `Manager.ts`
- **Frontend:** `apps/web/src/components/BranchToolbar.tsx`, `GitActionsControl.tsx`, `ThreadTerminalDrawer.tsx`, `terminalActivity.ts`
- **Contracts:** `packages/contracts/src/git.ts`, `packages/contracts/src/terminal.ts`

## Details
1. **Git Backend (Rust):** Port `GitManager.ts` using the `git2` Rust crate. Implement branches, stash parsing, diffs, and worktree isolation.
2. **PTY Terminal (Rust):** Replace `NodePTY.ts` using Rust libraries like `portable-pty`. Route the terminal stdio input/output streams through a Tauri event channel.
3. **Frontend Integration:** Integrate `xterm.js` into `ThreadTerminalDrawer.tsx` to handle visual rendering of the Rust PTY streams. Connect the `BranchToolbar` to the new rust Git commands.
4. **LLM Execution Hooks:** Provide LLM functional hooks to query git diffs, run builds via the terminal, and parse the output.