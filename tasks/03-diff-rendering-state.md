# Task 03: Diff Rendering & Client State `(apps/web/src)`

## Reference Sources (`ref.md`)
- `apps/web/src/components/DiffPanel.tsx`, `DiffWorkerPoolProvider.tsx`
- `apps/web/src/lib/diffRendering.ts`
- `apps/web/src/diffRouteSearch.ts`
- `apps/web/src/store.ts`, `session-logic.ts`
- `apps/web/src/turnDiffTree.ts`

## Details
1. **State Management:** Migrate the global state handling from `store.ts` and session runtime coordination found in `session-logic.ts`.
2. **Diff Core Logic:** Bring over `diffRendering.ts` and `turnDiffTree.ts`. These components take standard Git-like diffs from the backend and convert them into visually parseable abstract syntax trees.
3. **Diff View:** Port `DiffPanel.tsx`. Ensure you retain the Worker pool optimization from `DiffWorkerPoolProvider.tsx` for parsing large diffs efficiently in the browser without blocking the UI thread.