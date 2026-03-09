# Task 04: The IPC Bridge `(Replacing WebSocket)`

## Reference Sources (`ref.md`)
- `apps/web/src/wsNativeApi.ts` -> becomes Tauri Invoke
- `apps/web/src/wsTransport.ts` -> replace with Tauri Event Listeners
- `apps/web/src/nativeApi.ts` -> standard abstraction
- `packages/contracts/src/ipc.ts` -> definition map
- `apps/server/src/wsServer.ts` -> backend counterpart (now in Rust)

## Details
1. **Contract Mapping:** Check `packages/contracts/src/ipc.ts` to see exact list of required methods.
2. **Replace WebSocket:** Instead of `wsTransport.ts` and `wsServer.ts` managing JSON messages, rewrite `nativeApi.ts` to use `@tauri-apps/api/core::invoke("command_name", { args })`.
3. **Event Streams:** For server-pushed events (like AI generating tokens), use `tauri::Window::emit` on the Rust side, and `listen()` from `@tauri-apps/api/event` on the React side.