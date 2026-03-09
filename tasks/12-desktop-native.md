# Task 12: Desktop Native Features (Tauri Equivalents)

## Overview
Adapt the native system integrations that `t3code` handled via Electron or Node into Tauri plugins and OS-specific Rust implementations.

## Reference Sources (`ref.md`)
- `apps/desktop/src/main.ts` & `preload.ts`
- `apps/desktop/src/updateMachine.ts`
- `apps/desktop/src/confirmDialog.ts`
- `apps/server/src/os-jank.ts`

## Details
1. **Application Shell (Tauri setup):** Adapt `apps/desktop/src/main.ts` configurations (window size, resazibility, frameless UI if applicable) to `tauri.conf.json` and Rust `Builder::default()`.
2. **Native Dialogs:** Instead of `confirmDialog.ts`, use `@tauri-apps/plugin-dialog` to launch OS specific "Are you sure?" modal boxes for destructive actions.
3. **Auto-Updater:** Replace `updateMachine.ts` functionality by wiring up `@tauri-apps/plugin-updater` so your SaaS app can update users seamlessly.
4. **OS Jank Mitigation:** Review `os-jank.ts` to see what platform-specific fixes were necessary (like managing child process zombies) and replicate process cleanup securely in Rust.

> **MCP Usage Reminder:** Setting up the `tauri-plugin-updater` securely across macOS, Windows, and Linux involves complex configuration. Utilize **Context7 MCP** to read exact Tauri integration docs, or use the **Browser MCP tools** to search the Tauri v2 documentation websites if additional examples are required.