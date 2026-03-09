# Task 06: Anthropic Integration & Orchestration

## Reference Sources (`ref.md`)
- `apps/server/src/provider/CodexAdapter.ts`
- `apps/server/src/codexAppServerManager.ts`
- `apps/server/src/orchestration/OrchestrationEngine.ts`
- `packages/contracts/src/provider.ts`

## Details
1. **Abstract the Provider:** The original uses `CodexAdapter.ts` to communicate via stdio with the CLI. We will create a Rust-native abstract capability for `Anthropic`.
2. **Context Resolution:** Rebuild the logic matching `ProviderRuntimeIngestion.ts` which decides which files to send to the prompt based on user mentions and open tabs.
3. **API Streaming:** Configure Rust client using `reqwest` to post to `api.anthropic.com`. Parse SSE streams manually or via an anthropic SDK, and broadcast the text deltas, block creations, and tool call invocations to the UI via Tauri Events.
4. **Tool/Command Sandbox:** Implement prompt formatting where Claude will define files it wants to write to, mapping these to local filesystem commands rather than custom Codex instructions.