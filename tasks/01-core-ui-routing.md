# Task 01: Core UI & Routing `(apps/web/src)`

## Reference Sources (`ref.md`)
- `apps/web/src/router.ts` & `apps/web/src/routes/*`
- `apps/web/src/components/ui/*`
- `apps/web/src/lib/utils.ts` & `apps/web/src/hooks/*`
- `apps/web/vite.config.ts`, `index.css`, `main.tsx`

## Details
1. **Initialize Vite/Tailwind:** Setup basic `vite.config.ts` and `index.css`. Migrate `vscode-icons` logic (`vscode-icons-language-associations.json`).
2. **Port UI Library:** Bring over the complete Shadcn UI catalog found in `apps/web/src/components/ui/` (buttons, dialogs, toasts, sidebars). Use Radix primitives.
3. **Routing Setup:** Recreate TanStack / React Router setup from `_chat.tsx`, `_chat.$threadId.tsx`, and `__root.tsx`.
4. **Layout Components:** Set up `PlanSidebar.tsx`, `Icons.tsx`, and the baseline history bootstrap (`historyBootstrap.ts`).