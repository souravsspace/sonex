# Task 01 — Core UI & Routing: Implementation Plan

Detailed step-by-step guide for implementing Task 01. Each step is labeled, ordered, and dependency-aware. No code — only clear action descriptions.

<strong>
Make sure all file names should be in kebab-case.
</strong>

---

## Current State Audit

The workspace already has:
- `vite.config.ts` — configured for Tauri dev, `@tailwindcss/vite`, `@/` alias pointing to `src/`
- `src/index.css` — Tailwind v4 using `@import "tailwindcss"`, full dark/light CSS variables, sidebar tokens
- `src/components/ui/button.tsx` — already ported, using `@base-ui/react` + `cva`
- `src/lib/utils.ts` — standard `cn()` helper with `clsx` + `tailwind-merge`
- `src/App.tsx` — bare placeholder rendering only `<Button>`
- `src/main.tsx` — standard ReactDOM.createRoot mount, no router
- `components.json` — shadcn `base-nova` style, `hugeicons` icon library, `@/` aliases
- `package.json` — has `@hugeicons/react`, `@hugeicons/core-free-icons`, `@base-ui/react`, `class-variance-authority`, Tailwind v4, Tauri v2, React 19

What is missing that Task 01 requires:
- No routing library installed or wired up
- No routes directory or route files
- No `PlanSidebar`, `Icons`, or other layout components
- No `historyBootstrap.ts`
- No hooks (`useMediaQuery`, `useTheme`)
- No `types.ts` or `branding.ts`
- No vscode-icons utility
- Many shadcn UI components missing (sidebar, dialog, tooltip, etc.)

---

## Step A — Install TanStack Router and related packages

Add these packages to `package.json` dependencies:

- `@tanstack/react-router` — the client-side router (file-based routing)
- `@tanstack/router-devtools` — optional devtools overlay for local development only
- `@tanstack/router-plugin` — the Vite plugin that auto-generates `routeTree.gen.ts` by scanning the `src/routes/` directory during dev and build

No other state management or query libraries are needed at this task's scope (those come in Tasks 02, 03).

---

## Step B — Update `vite.config.ts` for TanStack Router code generation

Import `TanStackRouterVite` from `@tanstack/router-plugin/vite` and add it **before** the React plugin in the `plugins` array. Configure it with `routesDirectory: "./src/routes"` and `generatedRouteTree: "./src/routeTree.gen.ts"` so TanStack knows where to look and where to write the generated file.

---

## Step C — Add missing shadcn UI components via CLI

Using `bunx shadcn add <component>` (the project already has `components.json` configured), install:

1. `alert-dialog` — modal destructive confirmations
2. `alert` — inline status alerts
3. `badge` — small status labels
4. `card` — container surfaces
5. `checkbox` — boolean inputs
6. `collapsible` — show/hide sections
7. `command` — command palette (used by combobox and search)
8. `dialog` — general modal overlay
9. `input` — text input field
10. `label` — form labels
11. `popover` — floating anchored panel
12. `radio-group` — single-select options
13. `scroll-area` — custom scrollbar container
14. `select` — dropdown select
15. `separator` — horizontal/vertical divider
16. `sheet` — side drawer panel
17. `sidebar` — app navigation sidebar (complex compound component)
18. `skeleton` — loading placeholder
19. `switch` — toggle boolean
20. `textarea` — multi-line text input
21. `toggle` — single pressable toggle button
22. `toggle-group` — group of toggle buttons
23. `tooltip` — hover hint

Run all in a single command to avoid multiple installs hitting the shadcn registry repeatedly.

---

## Step D — Create custom UI components not in shadcn registry

These are custom components referenced in t3code that are not standard shadcn primitives. Create them in `src/components/ui/`:

### `spinner.tsx`
A simple animated loading spinner SVG component. Accepts a `size` and `className` prop. Uses Tailwind `animate-spin` and the CSS variable `--foreground` for color.

### `kbd.tsx`
A `<kbd>` HTML element wrapper styled to look like a keyboard key. Used throughout the UI for shortcut hints. Accepts `children` and `className`.

### `empty.tsx`
An empty-state message component. Renders a centered container with a muted icon slot, a title, and an optional description. Used when thread list or file list is empty.

### `field.tsx`
A form field wrapper combining a `<label>`, the input child, and an optional error/hint message below. Manages `aria-describedby` linking automatically.

### `fieldset.tsx`
Groups multiple `field` components under a `<fieldset>` with a `<legend>`. Used in settings panels.

### `group.tsx`
A layout grouping component — renders a horizontal or vertical group (row/column) with a defined gap and optional dividers. Used as a layout primitive.

### `input-group.tsx`
Composes an `input` with prefix/suffix addons (icons or text). Implements `data-[slot=...]` to conditionally show rounded corners.

### `autocomplete.tsx`
Built on top of `command` and `popover`. Shows suggestion results as the user types in an `input`. Accepts `suggestions`, `onSelect`, and controlled value props.

### `combobox.tsx`
Built on top of `command`, `popover`, and `button`. A searchable select. Renders the currently selected value in a trigger button and drops a command palette panel.

### `menu.tsx`
A context/dropdown menu wrapper around Radix `DropdownMenu` primitives. Provides `Menu.Root`, `Menu.Trigger`, `Menu.Item`, `Menu.Separator`, `Menu.Sub`, etc. as named sub-exports.

### `form.tsx`
A thin wrapper around the native `<form>` element that resets on submit if `resetOnSubmit` is true and forwards a typed `onSubmit` handler. No third-party form library needed at this stage.

### `toast.logic.ts`
Pure logic file (no JSX). Exports a `useToastQueue` hook that uses React state to manage a list of in-flight toasts with IDs, types (success/error/info), messages, and a dismiss function.

### `toast.tsx`
The visual rendering of toast notifications. Renders a fixed bottom-right container. Reads from `useToastQueue`. Uses `separator` and CSS transition for enter/exit animations.

---

## Step E — Create the routes directory and route files

TanStack Router uses a file-based convention. Create `src/routes/` with these files:

### `src/routes/__root.tsx`
The root route wraps the entire app. It should:
- Render into a `<div>` with `id="app-root"` that applies the dark/light theme class to its children
- Import and render `<Outlet />` from `@tanstack/react-router`
- Include the `<Toaster />` (from `toast.tsx`) at this level so toasts are globally available
- Optionally include a top-level error boundary via TanStack's `errorComponent`

### `src/routes/_chat.tsx`
The chat layout parent route. It should:
- Render the two-pane app shell: a left `PlanSidebar` and a right `<Outlet />` content area
- Use `sidebar` and `sheet` components for responsive collapse on narrow screens
- Retrieve the active thread ID from the router context to pass down as context

### `src/routes/_chat.index.tsx`
The index route for `/` (no thread selected). Should:
- Render an empty state using the `<Empty />` component
- Show "No thread selected — create one to get started" or similar
- Include a "New Thread" button (placeholder action for now — wired to Tauri IPC in Task 04)

### `src/routes/_chat.$threadId.tsx`
The dynamic thread view route. Should:
- Receive `threadId` from `useParams()`
- Render a `ChatView` placeholder div (actual chat rendering lands in Task 02)
- Show the thread ID in a header as a stub

### `src/routes/_chat.settings.tsx`
The settings overlay route. Should:
- Render inside a `<Sheet>` or `<Dialog>` so it overlaps the chat layout rather than replacing it
- Include placeholder sections: "Preferences", "Keybindings", "AI Model" (content populated in Task 11)
- Include a close button that navigates back with `router.history.back()`

---

## Step F — Create `src/router.ts`

Using `createRouter` from `@tanstack/react-router`, construct the router instance with the auto-generated `routeTree` from `src/routeTree.gen.ts`. Export it as the default. Also export the `RouterProvider` re-export convenience so `main.tsx` only needs to import from here.

Add the router instance type to `Register` interface (TanStack Router type registration pattern) so route hooks are fully typed across the app.

---

## Step G — Handle `src/routeTree.gen.ts`

This file is auto-generated by the TanStack Router Vite plugin when the dev server starts or a build runs. On a clean checkout (before running `bun dev`), the file won't exist and TypeScript will error. 

Create a minimal hand-written stub of `routeTree.gen.ts` with the correct shape so TypeScript is happy without having to run the dev server first. It should export an empty `routeTree` compatible with `createRouter`. The Vite plugin will overwrite this with the real generated content the first time the dev server starts.

---

## Step H — Update `src/main.tsx`

Replace the bare `<App />` render with:
1. Import the `router` from `src/router.ts`
2. Wrap the `ReactDOM.createRoot` render in `<RouterProvider router={router} />`
3. Remove the `<App />` import entirely — `__root.tsx` is now the app shell

---

## Step I — Update `src/App.tsx`

`App.tsx` is no longer needed as the root component once `main.tsx` uses `RouterProvider`. However, keep it as a thin barrel or delete it only if every import is accounted for. Since there are no consumers beyond `main.tsx`, mark it as a no-op shim or remove it and clean up the import in `main.tsx`.

---

## Step J — Create `src/components/Icons.tsx`

This component provides the app's icon vocabulary. It should:
- Re-export commonly used `@hugeicons/react` icons under semantic local names (e.g. `ThreadIcon`, `SettingsIcon`, `PlusIcon`, `CloseIcon`, `BranchIcon`, `CheckIcon`, etc.)
- Include a `FileIcon` lookup component that accepts a `language` or `filename` prop and returns the appropriate vscode-style file-type icon color/name combination
- Keep all icons as named exports, not a default export, to support tree-shaking

---

## Step K — Create `src/components/PlanSidebar.tsx`

The left sidebar showing the list of recent thread sessions grouped by project. At this stage it is a stub that:
- Renders the sidebar primitive from `@/components/ui/sidebar`
- Shows an app logo / branding header at the top
- Renders a scrollable list area with placeholder items (real data from store comes in Task 03)
- Has a footer area with settings icon and user info (placeholder, real auth in Task 07)
- Highlights the currently active thread using the `threadId` from the router params
- Includes a "New Thread" action button

---

## Step L — Create `src/historyBootstrap.ts`

A pure function module (no React). Responsible for determining the initial route on app startup. It should:
- Accept the last-visited `threadId` (from localStorage or from Tauri's persisted state — use localStorage as a stub until Task 05 is done)
- Return a `{ redirect: string }` if there is a previously active thread, pointing to `/_chat/$threadId`
- Return `{ redirect: "/" }` if no history exists
- Export a `bootstrapHistory()` function and a `persistLastThread(threadId: string)` function

This module is called from `__root.tsx` inside a `beforeLoad` hook.

---

## Step M — Create `src/hooks/useMediaQuery.ts`

A React hook that accepts a CSS media query string and returns a boolean. Uses the native `window.matchMedia` API. Adds and removes the listener using React's `useEffect` and `useSyncExternalStore`. Used by `PlanSidebar` to collapse on small screens.

---

## Step N — Create `src/hooks/useTheme.ts`

A React hook that manages light/dark/system theme preference. Should:
- Read preference from `localStorage` key `"sonex-theme"`
- Apply the `dark` CSS class to `<html>` based on preference + `prefers-color-scheme` system query
- Export `{ theme, setTheme }` where `theme` is `"light" | "dark" | "system"`
- This hook is consumed by the settings page and any theme toggle control

---

## Step O — Create `src/branding.ts`

A constants file exposing the app's identity strings and metadata:
- `APP_NAME = "Sonex"`
- `APP_VERSION` (read from `package.json` via `import.meta.env` or hardcoded)
- `SUPPORT_URL`, `DOCS_URL` placeholder strings
- `DEFAULT_THEME = "dark"` (the app defaults to dark mode)

---

## Step P — Create `src/types.ts`

Shared frontend TypeScript types for Task 01 scope:
- `Thread` — `{ id: string; title: string; createdAt: number; projectPath: string }`
- `Project` — `{ id: string; name: string; path: string; threads: Thread[] }`
- `Theme` — `"light" | "dark" | "system"`
- `ToastType` — `"success" | "error" | "info" | "warning"`
- `ToastItem` — `{ id: string; type: ToastType; message: string; duration?: number }`

These will grow as Tasks 02 and 03 are implemented.

---

## Step Q — Create `src/vscode-icons.ts` and `src/vscode-icons-language-associations.json`

`vscode-icons-language-associations.json` is a JSON map from language id / file extension to a vscode icon name and a hex color (e.g. `"ts": { "icon": "typescript", "color": "#3178c6" }`). Port the structure that t3code's `sync-vscode-icons.mjs` script generates. Include at least the top 30–40 most common file types (TypeScript, JavaScript, Rust, Python, JSON, CSS, HTML, Markdown, etc.).

`vscode-icons.ts` exports:
- `getIconForFile(filename: string): { name: string; color: string }` — looks up by extension
- `getIconForLanguage(languageId: string): { name: string; color: string }` — looks up by language id
- A `FALLBACK_ICON` constant for unknown types

---

## Step R — Wire up dark mode default and verify CSS tokens

The `index.css` already has full CSS variable tokens for light and dark. Ensure:
- The `<html>` element receives `class="dark"` by default (Sonex is a developer tool — dark mode first)
- The `useTheme` hook properly adds/removes the class on `document.documentElement`
- No hardcoded colors exist in any new component — all use `--foreground`, `--background`, `--muted`, etc. via Tailwind CSS variable tokens

---

## Step S — Update `tsconfig.json` for strict route type safety

TanStack Router's type registration requires the router instance to be declared on the `Register` type. Verify `tsconfig.json` has:
- `"moduleResolution": "bundler"` — already present, required for TanStack Router's exports map
- `"paths"` — `@/*` already maps to `./src/*`, needed for all component imports
- No changes needed unless the auto-generated `routeTree.gen.ts` adds `verbatimModuleSyntax: true` requirement (check after generation)

---

## Step T — Lint and type-check pass

Run `bun x ultracite fix` to auto-format all new files. Then run `bun run build` (or `tsc --noEmit`) to verify TypeScript is clean — no implicit `any`, no unused variables, no missing imports. Fix all reported issues before considering this task done.

---

## Step U — Manual smoke test in Tauri dev

Run `bun run tauri dev` and verify:
1. The app boots to the `/` route (empty state, no thread selected)
2. Navigating to `/_chat/some-id` shows the thread stub without crashing
3. The sidebar renders with correct dark theme
4. No console errors on load
5. The route devtools overlay works (only in dev mode)

---

## Dependency Summary

| Package | Version / Source | Purpose |
|---|---|---|
| `@tanstack/react-router` | latest stable | Client-side routing |
| `@tanstack/router-plugin` | latest stable | Vite plugin for route tree codegen |
| `@tanstack/router-devtools` | latest stable | Dev-only route inspector overlay |

All other dependencies (`@base-ui/react`, `@hugeicons/react`, `tailwindcss`, `clsx`, `tailwind-merge`, `class-variance-authority`) are already installed.

---

## File Creation Summary (ordered)

```
src/
  routes/
    __root.tsx              [Step E]
    _chat.tsx               [Step E]
    _chat.index.tsx         [Step E]
    _chat.$threadId.tsx     [Step E]
    _chat.settings.tsx      [Step E]
  components/
    Icons.tsx               [Step J]
    PlanSidebar.tsx         [Step K]
    ui/
      spinner.tsx           [Step D]
      kbd.tsx               [Step D]
      empty.tsx             [Step D]
      field.tsx             [Step D]
      fieldset.tsx          [Step D]
      group.tsx             [Step D]
      input-group.tsx       [Step D]
      autocomplete.tsx      [Step D]
      combobox.tsx          [Step D]
      menu.tsx              [Step D]
      form.tsx              [Step D]
      toast.logic.ts        [Step D]
      toast.tsx             [Step D]
      (+ all shadcn installs from Step C)
  hooks/
    useMediaQuery.ts        [Step M]
    useTheme.ts             [Step N]
  router.ts                 [Step F]
  routeTree.gen.ts          [Step G - stub only]
  historyBootstrap.ts       [Step L]
  branding.ts               [Step O]
  types.ts                  [Step P]
  vscode-icons.ts           [Step Q]
  vscode-icons-language-associations.json  [Step Q]
Modified:
  vite.config.ts            [Step B]
  src/main.tsx              [Step H]
  src/App.tsx               [Step I - remove or stub]
```

---

## Notes and Decisions

- **No React Router** — Use TanStack Router v1 (file-based) to match t3code's `router.ts` / `routeTree.gen.ts` conventions exactly
- **No form library (react-hook-form / zod)** — Deferred to Task 11 (settings forms). `form.tsx` at this stage is a raw wrapper
- **No data fetching** — `@tanstack/react-query` is deferred to Tasks 02/03 where threads and messages are fetched
- **No Zustand store** — The app-wide store creation is done in Task 03; `PlanSidebar` uses mock/empty data for now
- **No Tauri IPC calls** — "New Thread" button and history bootstrap use stubs; real IPC wired in Task 04
- **No authentication** — Sidebar user section is a placeholder; real auth in Task 07
- **Toast system over Sonner** — The `toast.tsx` + `toast.logic.ts` custom implementation is lighter and avoids extra deps; swap to Sonner later if needed
- **shadcn `base-nova` style** — Already configured in `components.json`; all shadcn `add` commands will respect this. The installed components use `@base-ui/react` primitives, not Radix, because of the `base-nova` style  
- **Dark mode by default** — `useTheme` defaults to `"dark"` matching `DEFAULT_THEME` in `branding.ts` and applies the class on first mount
