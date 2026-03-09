# Task 11: Session Settings & Keybindings

## Overview
Port the frontend global application settings, user preference toggles, and shortcut definitions from the base project.

## Reference Sources (`ref.md`)
- `apps/web/src/keybindings.ts`
- `apps/web/src/appSettings.ts`
- `apps/server/src/keybindings.ts`
- `packages/contracts/src/keybindings.ts`

## Details
1. **Shortcut Map Implementation:** Recreate `keybindings.ts` to attach global window event listeners for shortcuts (e.g. Cmd+K for new chat, Cmd+S for save/sync in a SaaS model).
2. **User Preferences:** Adapt `appSettings.ts` logic into standard React context or Zustand stores so users can change theme, fonts, model choices, etc.
3. **Rust Binding for Global Keys:** If some shortcuts need to happen out-of-focus (while the app is minimized), install a global hotkey system in Tauri (`globalShortcutManager` plugin).

> **MCP Usage Reminder:** Finding exact keyboard shortcut event codes or configuring `globalShortcut` in Tauri v2 requires current docs. Use **Context7 MCP** (`mcp_upstash_conte_query-docs`) to accurately pull `@tauri-apps/api/globalShortcut` examples for Tauri.