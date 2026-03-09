# Task 09: Orchestration Engine & Event Sourcing (Rust)

## Overview
Replicating the backend application logic responsible for deciding how to act on user requests and external events (CQRS / Event Sourcing pattern).

## Reference Sources (`ref.md`)
- `apps/server/src/orchestration/OrchestrationEngine.ts`
- `apps/server/src/orchestration/decider.ts`
- `apps/server/src/orchestration/projector.ts`
- `apps/server/src/orchestration/commandInvariants.ts`

## Details
1. **Command & Event Schemas:** Port the TypeScript definitions of `Command` and `Event` payloads to Rust `struct` definitions with `serde::Deserialize` and `serde::Serialize`.
2. **The Decider (Command Handling):** Implement `decider.ts` patterns in Rust to define the application's business rules. Validate that requested transitions are legal given the current aggregate state limit checks.
3. **The Projector (Read Models):** Map `projector.ts` logic into Rust functions that listen to newly saved events and update "read-optimized" tables in your SQLite database.
4. **Integration:** Combine these in an Orchestration reactor module inside `src-tauri` that bridges UI incoming commands (via Tauri IPC) to the decider.

> **MCP Usage Reminder:** For robust implementation of CQRS/Event sourcing traits, or to research how to structure state machines efficiently in Rust, feel free to use **Context7** (`mcp_upstash_conte_query-docs`) to query Rust documentation and **Browser tools** (`fetch_webpage`/`open_browser_page`) to pull up examples for Rust CQRS frameworks.