Directory structure:
└── pingdotgg-t3code/
├── README.md
├── AGENTS.md
├── CONTRIBUTING.md
├── KEYBINDINGS.md
├── LICENSE
├── package.json
├── REMOTE.md
├── TODO.md
├── tsconfig.base.json
├── turbo.json
├── vitest.config.ts
├── .oxfmtrc.json
├── .oxlintrc.json
├── apps/
│ ├── desktop/
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ ├── tsdown.config.ts
│ │ ├── turbo.jsonc
│ │ ├── scripts/
│ │ │ ├── dev-electron.mjs
│ │ │ ├── electron-launcher.mjs
│ │ │ ├── smoke-test.mjs
│ │ │ └── start-electron.mjs
│ │ └── src/
│ │ ├── confirmDialog.test.ts
│ │ ├── confirmDialog.ts
│ │ ├── fixPath.ts
│ │ ├── main.ts
│ │ ├── preload.ts
│ │ ├── rotatingFileSink.test.ts
│ │ ├── updateMachine.test.ts
│ │ ├── updateMachine.ts
│ │ ├── updateState.test.ts
│ │ └── updateState.ts
│ ├── marketing/
│ │ ├── astro.config.mjs
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ └── src/
│ │ └── pages/
│ │ └── index.astro
│ ├── server/
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ ├── tsdown.config.ts
│ │ ├── turbo.jsonc
│ │ ├── integration/
│ │ │ ├── orchestrationEngine.integration.test.ts
│ │ │ ├── OrchestrationEngineHarness.integration.ts
│ │ │ ├── providerService.integration.test.ts
│ │ │ ├── TestProviderAdapter.integration.ts
│ │ │ └── fixtures/
│ │ │ └── providerRuntime.ts
│ │ ├── scripts/
│ │ │ └── cli.ts
│ │ └── src/
│ │ ├── attachmentPaths.ts
│ │ ├── attachmentStore.test.ts
│ │ ├── attachmentStore.ts
│ │ ├── codexAppServerManager.test.ts
│ │ ├── config.ts
│ │ ├── imageMime.test.ts
│ │ ├── imageMime.ts
│ │ ├── index.ts
│ │ ├── keybindings.test.ts
│ │ ├── keybindings.ts
│ │ ├── logger.ts
│ │ ├── main.test.ts
│ │ ├── main.ts
│ │ ├── open.test.ts
│ │ ├── open.ts
│ │ ├── os-jank.ts
│ │ ├── processRunner.test.ts
│ │ ├── processRunner.ts
│ │ ├── projectFaviconRoute.test.ts
│ │ ├── projectFaviconRoute.ts
│ │ ├── serverLayers.ts
│ │ ├── serverLogger.ts
│ │ ├── workspaceEntries.chunking.test.ts
│ │ ├── workspaceEntries.test.ts
│ │ ├── workspaceEntries.ts
│ │ ├── wsServer.ts
│ │ ├── checkpointing/
│ │ │ ├── Diffs.test.ts
│ │ │ ├── Diffs.ts
│ │ │ ├── Errors.ts
│ │ │ ├── Utils.ts
│ │ │ ├── Layers/
│ │ │ │ ├── CheckpointDiffQuery.test.ts
│ │ │ │ ├── CheckpointDiffQuery.ts
│ │ │ │ └── CheckpointStore.ts
│ │ │ └── Services/
│ │ │ ├── CheckpointDiffQuery.ts
│ │ │ └── CheckpointStore.ts
│ │ ├── git/
│ │ │ ├── Errors.ts
│ │ │ ├── isRepo.ts
│ │ │ ├── Layers/
│ │ │ │ ├── CodexTextGeneration.test.ts
│ │ │ │ ├── CodexTextGeneration.ts
│ │ │ │ ├── GitCore.ts
│ │ │ │ ├── GitHubCli.ts
│ │ │ │ ├── GitManager.test.ts
│ │ │ │ ├── GitManager.ts
│ │ │ │ ├── GitService.test.ts
│ │ │ │ └── GitService.ts
│ │ │ └── Services/
│ │ │ ├── GitCore.ts
│ │ │ ├── GitHubCli.ts
│ │ │ ├── GitManager.ts
│ │ │ ├── GitService.ts
│ │ │ └── TextGeneration.ts
│ │ ├── orchestration/
│ │ │ ├── commandInvariants.test.ts
│ │ │ ├── commandInvariants.ts
│ │ │ ├── decider.projectScripts.test.ts
│ │ │ ├── decider.ts
│ │ │ ├── Errors.ts
│ │ │ ├── projector.test.ts
│ │ │ ├── projector.ts
│ │ │ ├── Schemas.ts
│ │ │ ├── Layers/
│ │ │ │ ├── CheckpointReactor.test.ts
│ │ │ │ ├── CheckpointReactor.ts
│ │ │ │ ├── OrchestrationEngine.test.ts
│ │ │ │ ├── OrchestrationEngine.ts
│ │ │ │ ├── OrchestrationReactor.test.ts
│ │ │ │ ├── OrchestrationReactor.ts
│ │ │ │ ├── ProjectionPipeline.ts
│ │ │ │ ├── ProjectionSnapshotQuery.test.ts
│ │ │ │ ├── ProjectionSnapshotQuery.ts
│ │ │ │ ├── ProviderCommandReactor.test.ts
│ │ │ │ ├── ProviderCommandReactor.ts
│ │ │ │ ├── ProviderRuntimeIngestion.test.ts
│ │ │ │ └── ProviderRuntimeIngestion.ts
│ │ │ └── Services/
│ │ │ ├── CheckpointReactor.ts
│ │ │ ├── OrchestrationEngine.ts
│ │ │ ├── OrchestrationReactor.ts
│ │ │ ├── ProjectionPipeline.ts
│ │ │ ├── ProjectionSnapshotQuery.ts
│ │ │ ├── ProviderCommandReactor.ts
│ │ │ └── ProviderRuntimeIngestion.ts
│ │ ├── persistence/
│ │ │ ├── Errors.ts
│ │ │ ├── Migrations.ts
│ │ │ ├── NodeSqliteClient.test.ts
│ │ │ ├── NodeSqliteClient.ts
│ │ │ ├── Layers/
│ │ │ │ ├── OrchestrationCommandReceipts.ts
│ │ │ │ ├── OrchestrationEventStore.test.ts
│ │ │ │ ├── OrchestrationEventStore.ts
│ │ │ │ ├── ProjectionCheckpoints.ts
│ │ │ │ ├── ProjectionPendingApprovals.ts
│ │ │ │ ├── ProjectionProjects.ts
│ │ │ │ ├── ProjectionState.ts
│ │ │ │ ├── ProjectionThreadActivities.ts
│ │ │ │ ├── ProjectionThreadMessages.test.ts
│ │ │ │ ├── ProjectionThreadMessages.ts
│ │ │ │ ├── ProjectionThreadProposedPlans.ts
│ │ │ │ ├── ProjectionThreads.ts
│ │ │ │ ├── ProjectionThreadSessions.ts
│ │ │ │ ├── ProjectionTurns.ts
│ │ │ │ ├── ProviderSessionRuntime.ts
│ │ │ │ └── Sqlite.ts
│ │ │ ├── Migrations/
│ │ │ │ ├── 001_OrchestrationEvents.ts
│ │ │ │ ├── 002_OrchestrationCommandReceipts.ts
│ │ │ │ ├── 003_CheckpointDiffBlobs.ts
│ │ │ │ ├── 004_ProviderSessionRuntime.ts
│ │ │ │ ├── 005_Projections.ts
│ │ │ │ ├── 006_ProjectionThreadSessionRuntimeModeColumns.ts
│ │ │ │ ├── 007_ProjectionThreadMessageAttachments.ts
│ │ │ │ ├── 008_ProjectionThreadActivitySequence.ts
│ │ │ │ ├── 009_ProviderSessionRuntimeMode.ts
│ │ │ │ ├── 010_ProjectionThreadsRuntimeMode.ts
│ │ │ │ ├── 011_OrchestrationThreadCreatedRuntimeMode.ts
│ │ │ │ ├── 012_ProjectionThreadsInteractionMode.ts
│ │ │ │ └── 013_ProjectionThreadProposedPlans.ts
│ │ │ └── Services/
│ │ │ ├── OrchestrationCommandReceipts.ts
│ │ │ ├── OrchestrationEventStore.ts
│ │ │ ├── ProjectionCheckpoints.ts
│ │ │ ├── ProjectionPendingApprovals.ts
│ │ │ ├── ProjectionProjects.ts
│ │ │ ├── ProjectionState.ts
│ │ │ ├── ProjectionThreadActivities.ts
│ │ │ ├── ProjectionThreadMessages.ts
│ │ │ ├── ProjectionThreadProposedPlans.ts
│ │ │ ├── ProjectionThreads.ts
│ │ │ ├── ProjectionThreadSessions.ts
│ │ │ ├── ProjectionTurns.ts
│ │ │ └── ProviderSessionRuntime.ts
│ │ ├── provider/
│ │ │ ├── codexCliVersion.ts
│ │ │ ├── Errors.ts
│ │ │ ├── Layers/
│ │ │ │ ├── CodexAdapter.test.ts
│ │ │ │ ├── CodexAdapter.ts
│ │ │ │ ├── EventNdjsonLogger.test.ts
│ │ │ │ ├── EventNdjsonLogger.ts
│ │ │ │ ├── ProviderAdapterRegistry.test.ts
│ │ │ │ ├── ProviderAdapterRegistry.ts
│ │ │ │ ├── ProviderHealth.test.ts
│ │ │ │ ├── ProviderHealth.ts
│ │ │ │ ├── ProviderService.test.ts
│ │ │ │ ├── ProviderService.ts
│ │ │ │ ├── ProviderSessionDirectory.test.ts
│ │ │ │ └── ProviderSessionDirectory.ts
│ │ │ └── Services/
│ │ │ ├── CodexAdapter.ts
│ │ │ ├── ProviderAdapter.ts
│ │ │ ├── ProviderAdapterRegistry.ts
│ │ │ ├── ProviderHealth.ts
│ │ │ ├── ProviderService.ts
│ │ │ └── ProviderSessionDirectory.ts
│ │ ├── telemetry/
│ │ │ ├── Identify.ts
│ │ │ ├── Layers/
│ │ │ │ ├── AnalyticsService.test.ts
│ │ │ │ └── AnalyticsService.ts
│ │ │ └── Services/
│ │ │ └── AnalyticsService.ts
│ │ └── terminal/
│ │ ├── Layers/
│ │ │ ├── BunPTY.ts
│ │ │ ├── Manager.test.ts
│ │ │ ├── Manager.ts
│ │ │ ├── NodePTY.test.ts
│ │ │ └── NodePTY.ts
│ │ └── Services/
│ │ ├── Manager.ts
│ │ └── PTY.ts
│ └── web/
│ ├── components.json
│ ├── index.html
│ ├── package.json
│ ├── tsconfig.json
│ ├── turbo.jsonc
│ ├── vite.config.ts
│ ├── vitest.browser.config.ts
│ ├── public/
│ │ └── mockServiceWorker.js
│ └── src/
│ ├── appSettings.test.ts
│ ├── appSettings.ts
│ ├── branding.ts
│ ├── chat-scroll.test.ts
│ ├── chat-scroll.ts
│ ├── composer-editor-mentions.test.ts
│ ├── composer-editor-mentions.ts
│ ├── composer-logic.test.ts
│ ├── composer-logic.ts
│ ├── composerDraftStore.test.ts
│ ├── composerDraftStore.ts
│ ├── contextMenuFallback.ts
│ ├── diffRouteSearch.test.ts
│ ├── diffRouteSearch.ts
│ ├── env.ts
│ ├── historyBootstrap.test.ts
│ ├── historyBootstrap.ts
│ ├── index.css
│ ├── keybindings.test.ts
│ ├── keybindings.ts
│ ├── main.tsx
│ ├── markdown-links.test.ts
│ ├── markdown-links.ts
│ ├── nativeApi.ts
│ ├── pendingUserInput.test.ts
│ ├── pendingUserInput.ts
│ ├── projectScripts.test.ts
│ ├── projectScripts.ts
│ ├── proposedPlan.test.ts
│ ├── proposedPlan.ts
│ ├── router.ts
│ ├── routeTree.gen.ts
│ ├── session-logic.test.ts
│ ├── session-logic.ts
│ ├── store.test.ts
│ ├── store.ts
│ ├── terminal-links.test.ts
│ ├── terminal-links.ts
│ ├── terminalActivity.test.ts
│ ├── terminalActivity.ts
│ ├── terminalStateStore.test.ts
│ ├── terminalStateStore.ts
│ ├── truncateTitle.test.ts
│ ├── truncateTitle.ts
│ ├── types.ts
│ ├── vite-env.d.ts
│ ├── vscode-icons-language-associations.json
│ ├── vscode-icons.test.ts
│ ├── vscode-icons.ts
│ ├── worktreeCleanup.test.ts
│ ├── worktreeCleanup.ts
│ ├── wsNativeApi.test.ts
│ ├── wsNativeApi.ts
│ ├── wsTransport.test.ts
│ ├── wsTransport.ts
│ ├── components/
│ │ ├── BranchToolbar.logic.test.ts
│ │ ├── BranchToolbar.logic.ts
│ │ ├── BranchToolbar.tsx
│ │ ├── BranchToolbarBranchSelector.tsx
│ │ ├── ChatMarkdown.tsx
│ │ ├── ChatView.browser.tsx
│ │ ├── ComposerPromptEditor.tsx
│ │ ├── desktopUpdate.logic.test.ts
│ │ ├── desktopUpdate.logic.ts
│ │ ├── DiffPanel.tsx
│ │ ├── DiffWorkerPoolProvider.tsx
│ │ ├── GitActionsControl.logic.test.ts
│ │ ├── GitActionsControl.logic.ts
│ │ ├── GitActionsControl.tsx
│ │ ├── Icons.tsx
│ │ ├── PlanSidebar.tsx
│ │ ├── ProjectScriptsControl.tsx
│ │ ├── ThreadTerminalDrawer.tsx
│ │ ├── timelineHeight.test.ts
│ │ ├── timelineHeight.ts
│ │ └── ui/
│ │ ├── alert-dialog.tsx
│ │ ├── alert.tsx
│ │ ├── autocomplete.tsx
│ │ ├── badge.tsx
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── checkbox.tsx
│ │ ├── collapsible.tsx
│ │ ├── combobox.tsx
│ │ ├── command.tsx
│ │ ├── dialog.tsx
│ │ ├── empty.tsx
│ │ ├── field.tsx
│ │ ├── fieldset.tsx
│ │ ├── form.tsx
│ │ ├── group.tsx
│ │ ├── input-group.tsx
│ │ ├── input.tsx
│ │ ├── kbd.tsx
│ │ ├── label.tsx
│ │ ├── menu.tsx
│ │ ├── popover.tsx
│ │ ├── radio-group.tsx
│ │ ├── scroll-area.tsx
│ │ ├── select.tsx
│ │ ├── separator.tsx
│ │ ├── sheet.tsx
│ │ ├── sidebar.tsx
│ │ ├── skeleton.tsx
│ │ ├── spinner.tsx
│ │ ├── switch.tsx
│ │ ├── textarea.tsx
│ │ ├── toast.logic.test.ts
│ │ ├── toast.logic.ts
│ │ ├── toast.tsx
│ │ ├── toggle-group.tsx
│ │ ├── toggle.tsx
│ │ └── tooltip.tsx
│ ├── hooks/
│ │ ├── useMediaQuery.ts
│ │ ├── useTheme.ts
│ │ └── useTurnDiffSummaries.ts
│ ├── lib/
│ │ ├── diffRendering.test.ts
│ │ ├── diffRendering.ts
│ │ ├── gitReactQuery.test.ts
│ │ ├── gitReactQuery.ts
│ │ ├── lruCache.test.ts
│ │ ├── lruCache.ts
│ │ ├── projectReactQuery.ts
│ │ ├── projectScriptKeybindings.test.ts
│ │ ├── projectScriptKeybindings.ts
│ │ ├── providerReactQuery.test.ts
│ │ ├── providerReactQuery.ts
│ │ ├── serverReactQuery.ts
│ │ ├── terminalStateCleanup.test.ts
│ │ ├── terminalStateCleanup.ts
│ │ ├── turnDiffTree.test.ts
│ │ ├── turnDiffTree.ts
│ │ ├── utils.test.ts
│ │ └── utils.ts
│ └── routes/
│ ├── \_\_root.tsx
│ ├── \_chat.$threadId.tsx
│ ├── \_chat.index.tsx
│ ├── \_chat.settings.tsx
│ └── \_chat.tsx
├── CLAUDE.md -> AGENTS.md
├── docs/
│ └── release.md
├── packages/
│ ├── contracts/
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ └── src/
│ │ ├── baseSchemas.ts
│ │ ├── editor.ts
│ │ ├── git.ts
│ │ ├── index.ts
│ │ ├── ipc.ts
│ │ ├── keybindings.test.ts
│ │ ├── keybindings.ts
│ │ ├── model.ts
│ │ ├── orchestration.test.ts
│ │ ├── orchestration.ts
│ │ ├── project.ts
│ │ ├── provider.test.ts
│ │ ├── provider.ts
│ │ ├── providerRuntime.test.ts
│ │ ├── providerRuntime.ts
│ │ ├── server.ts
│ │ ├── terminal.test.ts
│ │ ├── terminal.ts
│ │ ├── ws.test.ts
│ │ └── ws.ts
│ └── shared/
│ ├── package.json
│ ├── tsconfig.json
│ └── src/
│ ├── git.ts
│ ├── logging.ts
│ ├── model.test.ts
│ ├── model.ts
│ ├── Net.test.ts
│ ├── Net.ts
│ ├── shell.test.ts
│ └── shell.ts
├── scripts/
│ ├── build-desktop-artifact.ts
│ ├── dev-runner.test.ts
│ ├── dev-runner.ts
│ ├── merge-mac-update-manifests.test.ts
│ ├── merge-mac-update-manifests.ts
│ ├── package.json
│ ├── release-smoke.ts
│ ├── sync-vscode-icons.mjs
│ ├── tsconfig.json
│ ├── update-release-package-versions.ts
│ └── lib/
│ ├── brand-assets.ts
│ └── resolve-catalog.ts
├── .docs/
│ ├── architecture.md
│ ├── ci.md
│ ├── codex-prerequisites.md
│ ├── encyclopedia.md
│ ├── provider-architecture.md
│ ├── quick-start.md
│ ├── runtime-modes.md
│ ├── scripts.md
│ └── workspace-layout.md
├── .github/
│ ├── pull_request_template.md
│ ├── VOUCHED.td
│ └── workflows/
│ ├── ci.yml
│ ├── pr-vouch.yml
│ └── release.yml
└── .plans/
├── README.md
├── 01-shared-model-normalization.md
├── 02-typed-ipc-boundaries.md
├── 03-split-codex-app-server-manager.md
├── 04-split-chatview-component.md
├── 05-zod-persisted-state-validation.md
├── 06-provider-logstream-lifecycle.md
├── 07-ci-quality-gates.md
├── 08-precommit-format-and-lint.md
├── 09-event-state-test-expansion.md
├── 10-unify-process-session-abstraction.md
├── 11-effect.md
├── 12-effect-new.md
├── 13-provider-service-integration-tests.md
├── 14-server-authoritative-event-sourcing-cleanup.md
├── 15-effect-server.md
├── 16-pr89-review-remediation-phases.md
├── 16c-pr89-remediation-checklist.md
├── branch-environment-picker-in-chatview-input.md
├── git-flows-integration-tests.md
├── git-flows-test-plan.md
├── git-integration-branch-picker-worktrees.md
├── spec-1-1-cutover-plan.md
└── spec-contract-matrix.md

Files Content:

# (Files content cropped to 300k characters, download full ingest to see more)

# FILE: README.md

# T3 Code

T3 Code is a minimal web GUI for coding agents. Currently Codex-first, with Claude Code support coming soon.

## How to use

> [!WARNING]
> You need to have [Codex CLI](https://github.com/openai/codex) installed and authorized for T3 Code to work.

```bash
npx t3
```

You can also just install the desktop app. It's cooler.

Install the [desktop app from the Releases page](https://github.com/pingdotgg/t3code/releases)

## Some notes

We are very very early in this project. Expect bugs.

We are not accepting contributions yet.

## If you REALLY want to contribute still.... read this first

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening an issue or PR.

Need support? Join the [Discord](https://discord.gg/jn4EGJjrvv).

================================================
FILE: AGENTS.md
================================================

# AGENTS.md

## Task Completion Requirements

- Both `bun lint` and `bun typecheck` must pass before considering tasks completed.
- NEVER run `bun test`. Always use `bun run test` (runs Vitest).

## Project Snapshot

T3 Code is a minimal web GUI for using code agents like Codex and Claude Code (coming soon).

This repository is a VERY EARLY WIP. Proposing sweeping changes that improve long-term maintainability is encouraged.

## Core Priorities

1. Performance first.
2. Reliability first.
3. Keep behavior predictable under load and during failures (session restarts, reconnects, partial streams).

If a tradeoff is required, choose correctness and robustness over short-term convenience.

## Maintainability

Long term maintainability is a core priority. If you add new functionality, first check if there are shared logic that can be extracted to a separate module. Duplicate logic across mulitple files is a code smell and should be avoided. Don't be afraid to change existing code. Don't take shortcuts by just adding local logic to solve a problem.

## Package Roles

- `apps/server`: Node.js WebSocket server. Wraps Codex app-server (JSON-RPC over stdio), serves the React web app, and manages provider sessions.
- `apps/web`: React/Vite UI. Owns session UX, conversation/event rendering, and client-side state. Connects to the server via WebSocket.
- `packages/contracts`: Shared effect/Schema schemas and TypeScript contracts for provider events, WebSocket protocol, and model/session types. Keep this package schema-only — no runtime logic.
- `packages/shared`: Shared runtime utilities consumed by both server and web. Uses explicit subpath exports (e.g. `@t3tools/shared/git`) — no barrel index.

## Codex App Server (Important)

T3 Code is currently Codex-first. The server starts `codex app-server` (JSON-RPC over stdio) per provider session, then streams structured events to the browser through WebSocket push messages.

How we use it in this codebase:

- Session startup/resume and turn lifecycle are brokered in `apps/server/src/codexAppServerManager.ts`.
- Provider dispatch and thread event logging are coordinated in `apps/server/src/providerManager.ts`.
- WebSocket server routes NativeApi methods in `apps/server/src/wsServer.ts`.
- Web app consumes orchestration domain events via WebSocket push on channel `orchestration.domainEvent` (provider runtime activity is projected into orchestration events server-side).

Docs:

- Codex App Server docs: https://developers.openai.com/codex/sdk/#app-server

## Reference Repos

- Open-source Codex repo: https://github.com/openai/codex
- Codex-Monitor (Tauri, feature-complete, strong reference implementation): https://github.com/Dimillian/CodexMonitor

Use these as implementation references when designing protocol handling, UX flows, and operational safeguards.

================================================
FILE: CONTRIBUTING.md
================================================

# Contributing

## Read This First

We are not actively accepting contributions right now.

You can still open an issue or PR, but please do so knowing there is a high chance we close it, defer it forever, or never look at it.

If that sounds annoying, that is because it is. This project is still early and we are trying to keep scope, quality, and direction under control.

PRs are automatically labeled with a `vouch:*` trust status.

If you are an external contributor, expect `vouch:unvouched` until we explicitly add you to [.github/VOUCHED.td](.github/VOUCHED.td).

## What We Are Most Likely To Accept

Small, focused bug fixes.

Small reliability fixes.

Small performance improvements.

Tightly scoped maintenance work that clearly improves the project without changing its direction.

## What We Are Least Likely To Accept

Large PRs.

Drive-by feature work.

Opinionated rewrites.

Anything that expands product scope without us asking for it first.

If you open a 1,000+ line PR full of new features, we will probably close it quickly and remember that you ignored the clearly written instructions.

## If You Still Want To Open A PR

Keep it small.

Explain exactly what changed.

Explain exactly why the change should exist.

Do not mix unrelated fixes together.

If the PR makes anything resembling a UI change, include clear before/after images.

If the change depends on motion, timing, transitions, or interaction details, include a short video.

If we have to guess what changed, we are much less likely to review it.

## Issues First

If you are thinking about a non-trivial change, open an issue first.

That still does not mean we will want the PR, but it gives you a chance to avoid wasting your time.

## Be Realistic

Opening a PR does not create an obligation on our side.

We may close it. We may ignore it. We may ask you to shrink it. We may reimplement the idea ourselves later.

If you are fine with that, proceed.

================================================
FILE: KEYBINDINGS.md
================================================

# Keybindings

T3 Code reads keybindings from:

- `~/.t3/keybindings.json`

The file must be a JSON array of rules:

```json
[
  { "key": "mod+g", "command": "terminal.toggle" },
  { "key": "mod+shift+g", "command": "terminal.new", "when": "terminalFocus" }
]
```

See the full schema for more details: [`packages/contracts/src/keybindings.ts`](packages/contracts/src/keybindings.ts)

## Defaults

```json
[
  { "key": "mod+j", "command": "terminal.toggle" },
  { "key": "mod+d", "command": "terminal.split", "when": "terminalFocus" },
  { "key": "mod+n", "command": "terminal.new", "when": "terminalFocus" },
  { "key": "mod+w", "command": "terminal.close", "when": "terminalFocus" },
  { "key": "mod+n", "command": "chat.new", "when": "!terminalFocus" },
  { "key": "mod+shift+o", "command": "chat.new", "when": "!terminalFocus" },
  {
    "key": "mod+shift+n",
    "command": "chat.newLocal",
    "when": "!terminalFocus"
  },
  { "key": "mod+o", "command": "editor.openFavorite" }
]
```

For most up to date defaults, see [`DEFAULT_KEYBINDINGS` in `apps/server/src/keybindings.ts`](apps/server/src/keybindings.ts)

## Configuration

### Rule Shape

Each entry supports:

- `key` (required): shortcut string, like `mod+j`, `ctrl+k`, `cmd+shift+d`
- `command` (required): action ID
- `when` (optional): boolean expression controlling when the shortcut is active

Invalid rules are ignored. Invalid config files are ignored. Warnings are logged by the server.

### Available Commands

- `terminal.toggle`: open/close terminal drawer
- `terminal.split`: split terminal (in focused terminal context by default)
- `terminal.new`: create new terminal (in focused terminal context by default)
- `terminal.close`: close/kill the focused terminal (in focused terminal context by default)
- `chat.new`: create a new chat thread preserving the active thread's branch/worktree state
- `chat.newLocal`: create a new local chat thread for the active project (no worktree context)
- `editor.openFavorite`: open current project/worktree in the last-used editor
- `script.{id}.run`: run a project script by id (for example `script.test.run`)

### Key Syntax

Supported modifiers:

- `mod` (`cmd` on macOS, `ctrl` on non-macOS)
- `cmd` / `meta`
- `ctrl` / `control`
- `shift`
- `alt` / `option`

Examples:

- `mod+j`
- `mod+shift+d`
- `ctrl+l`
- `cmd+k`

### `when` Conditions

Currently available context keys:

- `terminalFocus`
- `terminalOpen`

Supported operators:

- `!` (not)
- `&&` (and)
- `||` (or)
- parentheses: `(` `)`

Examples:

- `"when": "terminalFocus"`
- `"when": "terminalOpen && !terminalFocus"`
- `"when": "terminalFocus || terminalOpen"`

Unknown condition keys evaluate to `false`.

### Precedence

- Rules are evaluated in array order.
- For a key event, the last rule where both `key` matches and `when` evaluates to `true` wins.
- That means precedence is across commands, not only within the same command.

================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2026 T3 Tools Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

================================================
FILE: package.json
================================================
{
"name": "@t3tools/monorepo",
"private": true,
"workspaces": {
"packages": [
"apps/*",
"packages/*",
"scripts"
],
"catalog": {
"effect": "https://pkg.pr.new/Effect-TS/effect-smol/effect@8881a9b",
"@effect/platform-node": "https://pkg.pr.new/Effect-TS/effect-smol/@effect/platform-node@8881a9b",
"@effect/sql-sqlite-bun": "https://pkg.pr.new/Effect-TS/effect-smol/@effect/sql-sqlite-bun@8881a9b",
"@effect/vitest": "https://pkg.pr.new/Effect-TS/effect-smol/@effect/vitest@8881a9b",
"@effect/language-service": "0.75.1",
"@types/bun": "^1.3.9",
"@types/node": "^24.10.13",
"tsdown": "^0.20.3",
"typescript": "^5.7.3",
"vitest": "^4.0.0"
}
},
"type": "module",
"scripts": {
"dev": "node scripts/dev-runner.ts dev",
"dev:server": "node scripts/dev-runner.ts dev:server",
"dev:web": "node scripts/dev-runner.ts dev:web",
"dev:marketing": "turbo run dev --filter=@t3tools/marketing",
"dev:desktop": "node scripts/dev-runner.ts dev:desktop",
"start": "turbo run start --filter=t3",
"start:desktop": "turbo run start --filter=@t3tools/desktop",
"start:marketing": "turbo run preview --filter=@t3tools/marketing",
"build": "turbo run build",
"build:marketing": "turbo run build --filter=@t3tools/marketing",
"build:desktop": "turbo run build --filter=@t3tools/desktop --filter=t3",
"typecheck": "turbo run typecheck",
"lint": "oxlint --report-unused-disable-directives",
"test": "turbo run test",
"test:desktop-smoke": "turbo run smoke-test --filter=@t3tools/desktop",
"fmt": "oxfmt",
"build:contracts": "turbo run build --filter=@t3tools/contracts",
"dist:desktop:artifact": "node scripts/build-desktop-artifact.ts",
"dist:desktop:dmg": "node scripts/build-desktop-artifact.ts --platform mac --target dmg",
"dist:desktop:dmg:arm64": "node scripts/build-desktop-artifact.ts --platform mac --target dmg --arch arm64",
"dist:desktop:dmg:x64": "node scripts/build-desktop-artifact.ts --platform mac --target dmg --arch x64",
"dist:desktop:linux": "node scripts/build-desktop-artifact.ts --platform linux --target AppImage --arch x64",
"dist:desktop:win": "node scripts/build-desktop-artifact.ts --platform win --target nsis --arch x64",
"release:smoke": "node scripts/release-smoke.ts",
"clean": "rm -rf node_modules apps/_/node_modules packages/_/node_modules apps/_/dist apps/_/dist-electron packages/_/dist .turbo apps/_/.turbo packages/\*/.turbo",
"sync:vscode-icons": "node scripts/sync-vscode-icons.mjs"
},
"devDependencies": {
"@types/node": "catalog:",
"oxfmt": "^0.35.0",
"oxlint": "^1.50.0",
"turbo": "^2.3.3",
"vitest": "catalog:"
},
"engines": {
"bun": "^1.3.9",
"node": "^24.13.1"
},
"packageManager": "bun@1.3.9",
"msw": {
"workerDirectory": [
"apps/web/public"
]
}
}

================================================
FILE: REMOTE.md
================================================

# Remote Access Setup

Use this when you want to open T3 Code from another device (phone, tablet, another laptop).

## CLI ↔ Env option map

The T3 Code CLI accepts the following configuration options, available either as CLI flags or environment variables:

| CLI flag                | Env var               | Notes                              |
| ----------------------- | --------------------- | ---------------------------------- |
| `--mode <web\|desktop>` | `T3CODE_MODE`         | Runtime mode.                      |
| `--port <number>`       | `T3CODE_PORT`         | HTTP/WebSocket port.               |
| `--host <address>`      | `T3CODE_HOST`         | Bind interface/address.            |
| `--state-dir <path>`    | `T3CODE_STATE_DIR`    | State directory.                   |
| `--dev-url <url>`       | `VITE_DEV_SERVER_URL` | Dev web URL redirect/proxy target. |
| `--no-browser`          | `T3CODE_NO_BROWSER`   | Disable auto-open browser.         |
| `--auth-token <token>`  | `T3CODE_AUTH_TOKEN`   | WebSocket auth token.              |

> TIP: Use the `--help` flag to see all available options and their descriptions.

## Security First

- Always set `--auth-token` before exposing the server outside localhost.
- Treat the token like a password.
- Prefer binding to trusted interfaces (LAN IP or Tailnet IP) instead of opening all interfaces unless needed.

## 1) Build + run server for remote access

Remote access should use the built web app (not local Vite redirect mode).

```bash
bun run build
TOKEN="$(openssl rand -hex 24)"
bun run --cwd apps/server start -- --host 0.0.0.0 --port 3773 --auth-token "$TOKEN" --no-browser
```

Then open on your phone:

`http://<your-machine-ip>:3773`

Example:

`http://192.168.1.42:3773`

Notes:

- `--host 0.0.0.0` listens on all IPv4 interfaces.
- `--no-browser` prevents local auto-open, which is usually better for headless/remote sessions.
- Ensure your OS firewall allows inbound TCP on the selected port.

## 2) Tailnet / Tailscale access

If you use Tailscale, you can bind directly to your Tailnet address.

```bash
TAILNET_IP="$(tailscale ip -4)"
TOKEN="$(openssl rand -hex 24)"
bun run --cwd apps/server start -- --host "$(tailscale ip -4)" --port 3773 --auth-token "$TOKEN" --no-browser
```

Open from any device in your tailnet:

`http://<tailnet-ip>:3773`

You can also bind `--host 0.0.0.0` and connect through the Tailnet IP, but binding directly to the Tailnet IP limits exposure.

================================================
FILE: TODO.md
================================================

# TODO

## Small things

- [ ] Submitting new messages should scroll to bottom
- [ ] Only show last 10 threads for a given project
- [ ] Thread archiving
- [ ] New projects should go on top
- [ ] Projects should be sorted by latest thread update

## Bigger things

- [ ] Queueing messages

================================================
FILE: tsconfig.base.json
================================================
{
"compilerOptions": {
"target": "ES2023",
"module": "ESNext",
"moduleResolution": "Bundler",
"strict": true,
"noUncheckedIndexedAccess": true,
"exactOptionalPropertyTypes": true,
"noImplicitOverride": true,
"useDefineForClassFields": true,
"forceConsistentCasingInFileNames": true,
"skipLibCheck": true,
"allowSyntheticDefaultImports": true,
"esModuleInterop": true,
"resolveJsonModule": true
}
}

================================================
FILE: turbo.json
================================================
{
"$schema": "https://turbo.build/schema.json",
"globalEnv": [
"PORT",
"VITE_WS_URL",
"VITE_DEV_SERVER_URL",
"ELECTRON_RENDERER_PORT",
"T3CODE_LOG_WS_EVENTS",
"T3CODE_MODE",
"T3CODE_PORT",
"T3CODE_NO_BROWSER",
"T3CODE_STATE_DIR",
"T3CODE_AUTH_TOKEN",
"T3CODE_DESKTOP_WS_URL"
],
"tasks": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist/**", "dist-electron/**"]
},
"dev": {
"dependsOn": ["@t3tools/contracts#build"],
"cache": false,
"persistent": true
},
"typecheck": {
"dependsOn": ["^typecheck"],
"outputs": [],
"cache": false
},
"test": {
"dependsOn": ["^build"],
"cache": false,
"outputs": []
}
}
}

================================================
FILE: vitest.config.ts
================================================
import \* as path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
resolve: {
alias: [
{
find: /^@t3tools\/contracts$/,
replacement: path.resolve(import.meta.dirname, "./packages/contracts/src/index.ts"),
},
],
},
});

================================================
FILE: .oxfmtrc.json
================================================
{
"$schema": "./node_modules/oxfmt/configuration_schema.json",
"ignorePatterns": [
".plans",
"dist",
"dist-electron",
"node_modules",
"bun.lock",
"*.tsbuildinfo",
"**/routeTree.gen.ts"
],
"experimentalSortPackageJson": {}
}

================================================
FILE: .oxlintrc.json
================================================
{
"$schema": "./node_modules/oxlint/configuration_schema.json",
"ignorePatterns": [
"dist",
"dist-electron",
"node_modules",
"bun.lock",
"*.tsbuildinfo",
"**/routeTree.gen.ts"
],
"plugins": ["eslint", "oxc", "react", "unicorn", "typescript"],
"categories": {
"correctness": "warn",
"suspicious": "warn",
"perf": "warn"
},
"rules": {
"react-in-jsx-scope": "off",
"eslint/no-shadow": "off",
"eslint/no-await-in-loop": "off"
}
}

================================================
FILE: apps/desktop/package.json
================================================
{
"name": "@t3tools/desktop",
"version": "0.0.8",
"private": true,
"main": "dist-electron/main.js",
"scripts": {
"dev": "bun run --parallel dev:bundle dev:electron",
"dev:bundle": "tsdown --watch",
"dev:electron": "bun run scripts/dev-electron.mjs",
"build": "tsdown",
"start": "bun run scripts/start-electron.mjs",
"typecheck": "tsc --noEmit",
"test": "vitest run --passWithNoTests",
"smoke-test": "node scripts/smoke-test.mjs"
},
"dependencies": {
"effect": "catalog:",
"electron": "40.6.0",
"electron-updater": "^6.6.2"
},
"devDependencies": {
"@t3tools/contracts": "workspace:_",
"@t3tools/shared": "workspace:_",
"@types/node": "catalog:",
"tsdown": "catalog:",
"typescript": "catalog:",
"vitest": "catalog:",
"wait-on": "^8.0.2"
},
"productName": "T3 Code (Alpha)"
}

================================================
FILE: apps/desktop/tsconfig.json
================================================
{
"extends": "../../tsconfig.base.json",
"compilerOptions": {
"composite": true,
"types": ["node", "electron"],
"lib": ["ES2023", "DOM", "esnext.disposable"]
},
"include": ["src", "tsdown.config.ts"]
}

================================================
FILE: apps/desktop/tsdown.config.ts
================================================
import { defineConfig } from "tsdown";

const shared = {
format: "cjs" as const,
outDir: "dist-electron",
sourcemap: true,
outExtensions: () => ({ js: ".js" }),
};

export default defineConfig([
{
...shared,
entry: ["src/main.ts"],
clean: true,
noExternal: (id) => id.startsWith("@t3tools/"),
},
{
...shared,
entry: ["src/preload.ts"],
},
]);

================================================
FILE: apps/desktop/turbo.jsonc
================================================
{
"$schema": "https://turbo.build/schema.json",
"extends": ["//"],
"tasks": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist-electron/**"],
},
"dev": {
"dependsOn": ["t3#build"],
"persistent": true,
},
"start": {
"dependsOn": ["build", "@t3tools/web#build", "t3#build"],
"cache": false,
"persistent": true,
},
"smoke-test": {
"dependsOn": ["build", "@t3tools/web#build", "t3#build"],
"cache": false,
"outputs": [],
},
},
}

================================================
FILE: apps/desktop/scripts/dev-electron.mjs
================================================
import { spawn, spawnSync } from "node:child_process";
import { watch } from "node:fs";
import { join } from "node:path";
import waitOn from "wait-on";

import { desktopDir, resolveElectronPath } from "./electron-launcher.mjs";

const port = Number(process.env.ELECTRON_RENDERER_PORT ?? 5733);
const devServerUrl = `http://localhost:${port}`;
const requiredFiles = ["dist-electron/main.js", "dist-electron/preload.js", "../server/dist/index.mjs"];
const watchedDirectories = [
{ directory: "dist-electron", files: new Set(["main.js", "preload.js"]) },
{ directory: "../server/dist", files: new Set(["index.mjs"]) },
];
const forcedShutdownTimeoutMs = 1_500;
const restartDebounceMs = 120;
const childTreeGracePeriodMs = 1_200;

await waitOn({
resources: [`tcp:${port}`, ...requiredFiles.map((filePath) => `file:${filePath}`)],
});

const childEnv = { ...process.env };
delete childEnv.ELECTRON_RUN_AS_NODE;

let shuttingDown = false;
let restartTimer = null;
let currentApp = null;
let restartQueue = Promise.resolve();
const expectedExits = new WeakSet();
const watchers = [];

function killChildTreeByPid(pid, signal) {
if (process.platform === "win32" || typeof pid !== "number") {
return;
}

spawnSync("pkill", [`-${signal}`, "-P", String(pid)], { stdio: "ignore" });
}

function cleanupStaleDevApps() {
if (process.platform === "win32") {
return;
}

spawnSync("pkill", ["-f", "--", `--t3code-dev-root=${desktopDir}`], { stdio: "ignore" });
}

function startApp() {
if (shuttingDown || currentApp !== null) {
return;
}

const app = spawn(
resolveElectronPath(),
[`--t3code-dev-root=${desktopDir}`, "dist-electron/main.js"],
{
cwd: desktopDir,
env: {
...childEnv,
VITE_DEV_SERVER_URL: devServerUrl,
},
stdio: "inherit",
},
);

currentApp = app;

app.once("error", () => {
if (currentApp === app) {
currentApp = null;
}

    if (!shuttingDown) {
      scheduleRestart();
    }

});

app.once("exit", () => {
if (currentApp === app) {
currentApp = null;
}

    if (!shuttingDown && !expectedExits.has(app)) {
      scheduleRestart();
    }

});
}

async function stopApp() {
const app = currentApp;
if (!app) {
return;
}

currentApp = null;
expectedExits.add(app);

await new Promise((resolve) => {
let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      resolve();
    };

    app.once("exit", finish);
    app.kill("SIGTERM");
    killChildTreeByPid(app.pid, "TERM");

    setTimeout(() => {
      if (settled) {
        return;
      }

      app.kill("SIGKILL");
      killChildTreeByPid(app.pid, "KILL");
      finish();
    }, forcedShutdownTimeoutMs).unref();

});
}

function scheduleRestart() {
if (shuttingDown) {
return;
}

if (restartTimer) {
clearTimeout(restartTimer);
}

restartTimer = setTimeout(() => {
restartTimer = null;
restartQueue = restartQueue
.catch(() => undefined)
.then(async () => {
await stopApp();
if (!shuttingDown) {
startApp();
}
});
}, restartDebounceMs);
}

function startWatchers() {
for (const { directory, files } of watchedDirectories) {
const watcher = watch(join(desktopDir, directory), { persistent: true }, (\_eventType, filename) => {
if (typeof filename !== "string" || !files.has(filename)) {
return;
}

      scheduleRestart();
    });

    watchers.push(watcher);

}
}

function killChildTree(signal) {
if (process.platform === "win32") {
return;
}

// Kill direct children as a final fallback in case normal shutdown leaves stragglers.
spawnSync("pkill", [`-${signal}`, "-P", String(process.pid)], { stdio: "ignore" });
}

async function shutdown(exitCode) {
if (shuttingDown) return;
shuttingDown = true;

if (restartTimer) {
clearTimeout(restartTimer);
restartTimer = null;
}

for (const watcher of watchers) {
watcher.close();
}

await stopApp();
killChildTree("TERM");
await new Promise((resolve) => {
setTimeout(resolve, childTreeGracePeriodMs);
});
killChildTree("KILL");

process.exit(exitCode);
}

startWatchers();
cleanupStaleDevApps();
startApp();

process.once("SIGINT", () => {
void shutdown(130);
});
process.once("SIGTERM", () => {
void shutdown(143);
});
process.once("SIGHUP", () => {
void shutdown(129);
});

================================================
FILE: apps/desktop/scripts/electron-launcher.mjs
================================================
// This file mostly exists because we want dev mode to say "T3 Code (Dev)" instead of "electron"

import { spawnSync } from "node:child_process";
import {
copyFileSync,
cpSync,
existsSync,
mkdirSync,
readFileSync,
readdirSync,
rmSync,
statSync,
writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const isDevelopment = Boolean(process.env.VITE_DEV_SERVER_URL);
const APP_DISPLAY_NAME = isDevelopment ? "T3 Code (Dev)" : "T3 Code (Alpha)";
const APP_BUNDLE_ID = "com.t3tools.t3code";
const LAUNCHER_VERSION = 1;

const **dirname = dirname(fileURLToPath(import.meta.url));
export const desktopDir = resolve(**dirname, "..");

function setPlistString(plistPath, key, value) {
const replaceResult = spawnSync("plutil", ["-replace", key, "-string", value, plistPath], {
encoding: "utf8",
});
if (replaceResult.status === 0) {
return;
}

const insertResult = spawnSync("plutil", ["-insert", key, "-string", value, plistPath], {
encoding: "utf8",
});
if (insertResult.status === 0) {
return;
}

const details = [replaceResult.stderr, insertResult.stderr].filter(Boolean).join("\n");
throw new Error(`Failed to update plist key "${key}" at ${plistPath}: ${details}`.trim());
}

function patchMainBundleInfoPlist(appBundlePath, iconPath) {
const infoPlistPath = join(appBundlePath, "Contents", "Info.plist");
setPlistString(infoPlistPath, "CFBundleDisplayName", APP_DISPLAY_NAME);
setPlistString(infoPlistPath, "CFBundleName", APP_DISPLAY_NAME);
setPlistString(infoPlistPath, "CFBundleIdentifier", APP_BUNDLE_ID);
setPlistString(infoPlistPath, "CFBundleIconFile", "icon.icns");

const resourcesDir = join(appBundlePath, "Contents", "Resources");
copyFileSync(iconPath, join(resourcesDir, "icon.icns"));
copyFileSync(iconPath, join(resourcesDir, "electron.icns"));
}

function patchHelperBundleInfoPlists(appBundlePath) {
const frameworksDir = join(appBundlePath, "Contents", "Frameworks");
if (!existsSync(frameworksDir)) {
return;
}

for (const entry of readdirSync(frameworksDir, { withFileTypes: true })) {
if (!entry.isDirectory() || !entry.name.endsWith(".app")) {
continue;
}
if (!entry.name.startsWith("Electron Helper")) {
continue;
}

    const helperPlistPath = join(frameworksDir, entry.name, "Contents", "Info.plist");
    if (!existsSync(helperPlistPath)) {
      continue;
    }

    const suffix = entry.name.replace("Electron Helper", "").replace(".app", "").trim();
    const helperName = suffix
      ? `${APP_DISPLAY_NAME} Helper ${suffix}`
      : `${APP_DISPLAY_NAME} Helper`;
    const helperIdSuffix = suffix.replace(/[()]/g, "").trim().toLowerCase().replace(/\s+/g, "-");
    const helperBundleId = helperIdSuffix
      ? `${APP_BUNDLE_ID}.helper.${helperIdSuffix}`
      : `${APP_BUNDLE_ID}.helper`;

    setPlistString(helperPlistPath, "CFBundleDisplayName", helperName);
    setPlistString(helperPlistPath, "CFBundleName", helperName);
    setPlistString(helperPlistPath, "CFBundleIdentifier", helperBundleId);

}
}

function readJson(path) {
try {
return JSON.parse(readFileSync(path, "utf8"));
} catch {
return null;
}
}

function buildMacLauncher(electronBinaryPath) {
const sourceAppBundlePath = resolve(electronBinaryPath, "../../..");
const runtimeDir = join(desktopDir, ".electron-runtime");
const targetAppBundlePath = join(runtimeDir, `${APP_DISPLAY_NAME}.app`);
const targetBinaryPath = join(targetAppBundlePath, "Contents", "MacOS", "Electron");
const iconPath = join(desktopDir, "resources", "icon.icns");
const metadataPath = join(runtimeDir, "metadata.json");

mkdirSync(runtimeDir, { recursive: true });

const expectedMetadata = {
launcherVersion: LAUNCHER_VERSION,
sourceAppBundlePath,
sourceAppMtimeMs: statSync(sourceAppBundlePath).mtimeMs,
iconMtimeMs: statSync(iconPath).mtimeMs,
};

const currentMetadata = readJson(metadataPath);
if (
existsSync(targetBinaryPath) &&
currentMetadata &&
JSON.stringify(currentMetadata) === JSON.stringify(expectedMetadata)
) {
return targetBinaryPath;
}

rmSync(targetAppBundlePath, { recursive: true, force: true });
cpSync(sourceAppBundlePath, targetAppBundlePath, { recursive: true });
patchMainBundleInfoPlist(targetAppBundlePath, iconPath);
patchHelperBundleInfoPlists(targetAppBundlePath);
writeFileSync(metadataPath, `${JSON.stringify(expectedMetadata, null, 2)}\n`);

return targetBinaryPath;
}

export function resolveElectronPath() {
const require = createRequire(import.meta.url);
const electronBinaryPath = require("electron");

if (process.platform !== "darwin") {
return electronBinaryPath;
}

return buildMacLauncher(electronBinaryPath);
}

================================================
FILE: apps/desktop/scripts/smoke-test.mjs
================================================
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const **dirname = dirname(fileURLToPath(import.meta.url));
const desktopDir = resolve(**dirname, "..");
const electronBin = resolve(desktopDir, "node_modules/.bin/electron");
const mainJs = resolve(desktopDir, "dist-electron/main.js");

console.log("\nLaunching Electron smoke test...");

const child = spawn(electronBin, [mainJs], {
stdio: ["pipe", "pipe", "pipe"],
env: {
...process.env,
VITE_DEV_SERVER_URL: "",
ELECTRON_ENABLE_LOGGING: "1",
},
});

let output = "";
child.stdout.on("data", (chunk) => {
output += chunk.toString();
});
child.stderr.on("data", (chunk) => {
output += chunk.toString();
});

const timeout = setTimeout(() => {
child.kill();
}, 8_000);

child.on("exit", () => {
clearTimeout(timeout);

const fatalPatterns = [
"Cannot find module",
"MODULE_NOT_FOUND",
"Refused to execute",
"Uncaught Error",
"Uncaught TypeError",
"Uncaught ReferenceError",
];
const failures = fatalPatterns.filter((pattern) => output.includes(pattern));

if (failures.length > 0) {
console.error("\nDesktop smoke test failed:");
for (const failure of failures) {
console.error(` - ${failure}`);
}
console.error("\nFull output:\n" + output);
process.exit(1);
}

console.log("Desktop smoke test passed.");
process.exit(0);
});

================================================
FILE: apps/desktop/scripts/start-electron.mjs
================================================
import { spawn } from "node:child_process";

import { desktopDir, resolveElectronPath } from "./electron-launcher.mjs";

const childEnv = { ...process.env };
delete childEnv.ELECTRON_RUN_AS_NODE;

const child = spawn(resolveElectronPath(), ["dist-electron/main.js"], {
stdio: "inherit",
cwd: desktopDir,
env: childEnv,
});

child.on("exit", (code, signal) => {
if (signal) {
process.kill(process.pid, signal);
return;
}
process.exit(code ?? 0);
});

================================================
FILE: apps/desktop/src/confirmDialog.test.ts
================================================
import type { BrowserWindow } from "electron";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { showMessageBoxMock } = vi.hoisted(() => ({
showMessageBoxMock: vi.fn(),
}));

vi.mock("electron", () => ({
dialog: {
showMessageBox: showMessageBoxMock,
},
}));

import { showDesktopConfirmDialog } from "./confirmDialog";

describe("showDesktopConfirmDialog", () => {
beforeEach(() => {
showMessageBoxMock.mockReset();
});

it("returns false and does not open a dialog for empty messages", async () => {
const result = await showDesktopConfirmDialog(" ", null);

    expect(result).toBe(false);
    expect(showMessageBoxMock).not.toHaveBeenCalled();

});

it("opens a dialog for the focused window and returns true on confirm", async () => {
const ownerWindow = { id: 1 } as BrowserWindow;
showMessageBoxMock.mockResolvedValue({ response: 1 });

    const result = await showDesktopConfirmDialog("Delete worktree?", ownerWindow);

    expect(result).toBe(true);
    expect(showMessageBoxMock).toHaveBeenCalledWith(
      ownerWindow,
      expect.objectContaining({
        buttons: ["No", "Yes"],
        message: "Delete worktree?",
      }),
    );

});

it("opens an app-level dialog when there is no focused window", async () => {
showMessageBoxMock.mockResolvedValue({ response: 0 });

    const result = await showDesktopConfirmDialog("Delete worktree?", null);

    expect(result).toBe(false);
    expect(showMessageBoxMock).toHaveBeenCalledWith(
      expect.objectContaining({
        buttons: ["No", "Yes"],
        message: "Delete worktree?",
      }),
    );

});
});

================================================
FILE: apps/desktop/src/confirmDialog.ts
================================================
import { type BrowserWindow, dialog } from "electron";

const CONFIRM_BUTTON_INDEX = 1;

export async function showDesktopConfirmDialog(
message: string,
ownerWindow: BrowserWindow | null,
): Promise<boolean> {
const normalizedMessage = message.trim();
if (normalizedMessage.length === 0) {
return false;
}

const options = {
type: "question" as const,
buttons: ["No", "Yes"],
defaultId: CONFIRM_BUTTON_INDEX,
cancelId: 0,
noLink: true,
message: normalizedMessage,
};
const result = ownerWindow
? await dialog.showMessageBox(ownerWindow, options)
: await dialog.showMessageBox(options);
return result.response === CONFIRM_BUTTON_INDEX;
}

================================================
FILE: apps/desktop/src/fixPath.ts
================================================
import { readPathFromLoginShell } from "@t3tools/shared/shell";

export function fixPath(): void {
if (process.platform !== "darwin") return;

try {
const shell = process.env.SHELL ?? "/bin/zsh";
const result = readPathFromLoginShell(shell);
if (result) {
process.env.PATH = result;
}
} catch {
// Keep inherited PATH if shell lookup fails.
}
}

================================================
FILE: apps/desktop/src/main.ts
================================================
import _ as ChildProcess from "node:child_process";
import _ as Crypto from "node:crypto";
import _ as FS from "node:fs";
import _ as OS from "node:os";
import \* as Path from "node:path";

import { app, BrowserWindow, dialog, ipcMain, Menu, nativeImage, protocol, shell } from "electron";
import type { MenuItemConstructorOptions } from "electron";
import \* as Effect from "effect/Effect";
import type { DesktopUpdateActionResult, DesktopUpdateState } from "@t3tools/contracts";
import { autoUpdater } from "electron-updater";

import type { ContextMenuItem } from "@t3tools/contracts";
import { NetService } from "@t3tools/shared/Net";
import { RotatingFileSink } from "@t3tools/shared/logging";
import { showDesktopConfirmDialog } from "./confirmDialog";
import { fixPath } from "./fixPath";
import {
getAutoUpdateDisabledReason,
shouldBroadcastDownloadProgress,
} from "./updateState";
import {
createInitialDesktopUpdateState,
reduceDesktopUpdateStateOnCheckFailure,
reduceDesktopUpdateStateOnCheckStart,
reduceDesktopUpdateStateOnDownloadComplete,
reduceDesktopUpdateStateOnDownloadFailure,
reduceDesktopUpdateStateOnDownloadProgress,
reduceDesktopUpdateStateOnDownloadStart,
reduceDesktopUpdateStateOnInstallFailure,
reduceDesktopUpdateStateOnNoUpdate,
reduceDesktopUpdateStateOnUpdateAvailable,
} from "./updateMachine";

fixPath();

const PICK_FOLDER_CHANNEL = "desktop:pick-folder";
const CONFIRM_CHANNEL = "desktop:confirm";
const CONTEXT_MENU_CHANNEL = "desktop:context-menu";
const OPEN_EXTERNAL_CHANNEL = "desktop:open-external";
const MENU_ACTION_CHANNEL = "desktop:menu-action";
const UPDATE_STATE_CHANNEL = "desktop:update-state";
const UPDATE_GET_STATE_CHANNEL = "desktop:update-get-state";
const UPDATE_DOWNLOAD_CHANNEL = "desktop:update-download";
const UPDATE_INSTALL_CHANNEL = "desktop:update-install";
const STATE_DIR =
process.env.T3CODE_STATE_DIR?.trim() || Path.join(OS.homedir(), ".t3", "userdata");
const DESKTOP_SCHEME = "t3";
const ROOT_DIR = Path.resolve(\_\_dirname, "../../..");
const isDevelopment = Boolean(process.env.VITE_DEV_SERVER_URL);
const APP_DISPLAY_NAME = isDevelopment ? "T3 Code (Dev)" : "T3 Code (Alpha)";
const APP_USER_MODEL_ID = "com.t3tools.t3code";
const USER_DATA_DIR_NAME = isDevelopment ? "t3code-dev" : "t3code";
const LEGACY_USER_DATA_DIR_NAME = isDevelopment ? "T3 Code (Dev)" : "T3 Code (Alpha)";
const COMMIT_HASH_PATTERN = /^[0-9a-f]{7,40}$/i;
const COMMIT_HASH_DISPLAY_LENGTH = 12;
const LOG_DIR = Path.join(STATE_DIR, "logs");
const LOG_FILE_MAX_BYTES = 10 _ 1024 _ 1024;
const LOG_FILE_MAX_FILES = 10;
const APP_RUN_ID = Crypto.randomBytes(6).toString("hex");
const AUTO_UPDATE_STARTUP_DELAY_MS = 15_000;
const AUTO_UPDATE_POLL_INTERVAL_MS = 4 _ 60 _ 60 \* 1000;
const DESKTOP_UPDATE_CHANNEL = "latest";
const DESKTOP_UPDATE_ALLOW_PRERELEASE = false;

type DesktopUpdateErrorContext = DesktopUpdateState["errorContext"];

let mainWindow: BrowserWindow | null = null;
let backendProcess: ChildProcess.ChildProcess | null = null;
let backendPort = 0;
let backendAuthToken = "";
let backendWsUrl = "";
let restartAttempt = 0;
let restartTimer: ReturnType<typeof setTimeout> | null = null;
let isQuitting = false;
let desktopProtocolRegistered = false;
let aboutCommitHashCache: string | null | undefined;
let desktopLogSink: RotatingFileSink | null = null;
let backendLogSink: RotatingFileSink | null = null;
let restoreStdIoCapture: (() => void) | null = null;

let destructiveMenuIconCache: Electron.NativeImage | null | undefined;
const initialUpdateState = (): DesktopUpdateState => createInitialDesktopUpdateState(app.getVersion());

function logTimestamp(): string {
return new Date().toISOString();
}

function logScope(scope: string): string {
return `${scope} run=${APP_RUN_ID}`;
}

function sanitizeLogValue(value: string): string {
return value.replace(/\s+/g, " ").trim();
}

function writeDesktopLogHeader(message: string): void {
if (!desktopLogSink) return;
desktopLogSink.write(`[${logTimestamp()}] [${logScope("desktop")}] ${message}\n`);
}

function writeBackendSessionBoundary(phase: "START" | "END", details: string): void {
if (!backendLogSink) return;
const normalizedDetails = sanitizeLogValue(details);
backendLogSink.write(
`[${logTimestamp()}] ---- APP SESSION ${phase} run=${APP_RUN_ID} ${normalizedDetails} ----\n`,
);
}

function formatErrorMessage(error: unknown): string {
if (error instanceof Error) {
return error.message;
}
return String(error);
}

function getSafeExternalUrl(rawUrl: unknown): string | null {
if (typeof rawUrl !== "string" || rawUrl.length === 0) {
return null;
}

let parsedUrl: URL;
try {
parsedUrl = new URL(rawUrl);
} catch {
return null;
}

if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
return null;
}

return parsedUrl.toString();
}

function writeDesktopStreamChunk(
streamName: "stdout" | "stderr",
chunk: unknown,
encoding: BufferEncoding | undefined,
): void {
if (!desktopLogSink) return;
const buffer = Buffer.isBuffer(chunk)
? chunk
: Buffer.from(String(chunk), typeof chunk === "string" ? encoding : undefined);
desktopLogSink.write(`[${logTimestamp()}] [${logScope(streamName)}] `);
desktopLogSink.write(buffer);
if (buffer.length === 0 || buffer[buffer.length - 1] !== 0x0a) {
desktopLogSink.write("\n");
}
}

function installStdIoCapture(): void {
if (!app.isPackaged || desktopLogSink === null || restoreStdIoCapture !== null) {
return;
}

const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);

const patchWrite =
(streamName: "stdout" | "stderr", originalWrite: typeof process.stdout.write) =>
(
chunk: string | Uint8Array,
encodingOrCallback?: BufferEncoding | ((error?: Error | null) => void),
callback?: (error?: Error | null) => void,
): boolean => {
const encoding = typeof encodingOrCallback === "string" ? encodingOrCallback : undefined;
writeDesktopStreamChunk(streamName, chunk, encoding);
if (typeof encodingOrCallback === "function") {
return originalWrite(chunk, encodingOrCallback);
}
if (callback !== undefined) {
return originalWrite(chunk, encoding, callback);
}
if (encoding !== undefined) {
return originalWrite(chunk, encoding);
}
return originalWrite(chunk);
};

process.stdout.write = patchWrite("stdout", originalStdoutWrite);
process.stderr.write = patchWrite("stderr", originalStderrWrite);

restoreStdIoCapture = () => {
process.stdout.write = originalStdoutWrite;
process.stderr.write = originalStderrWrite;
restoreStdIoCapture = null;
};
}

function initializePackagedLogging(): void {
if (!app.isPackaged) return;
try {
desktopLogSink = new RotatingFileSink({
filePath: Path.join(LOG_DIR, "desktop-main.log"),
maxBytes: LOG_FILE_MAX_BYTES,
maxFiles: LOG_FILE_MAX_FILES,
});
backendLogSink = new RotatingFileSink({
filePath: Path.join(LOG_DIR, "server-child.log"),
maxBytes: LOG_FILE_MAX_BYTES,
maxFiles: LOG_FILE_MAX_FILES,
});
installStdIoCapture();
writeDesktopLogHeader(`runtime log capture enabled logDir=${LOG_DIR}`);
} catch (error) {
// Logging setup should never block app startup.
console.error("[desktop] failed to initialize packaged logging", error);
}
}

function captureBackendOutput(child: ChildProcess.ChildProcess): void {
if (!app.isPackaged || backendLogSink === null) return;
const writeChunk = (chunk: unknown): void => {
if (!backendLogSink) return;
const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), "utf8");
backendLogSink.write(buffer);
};
child.stdout?.on("data", writeChunk);
child.stderr?.on("data", writeChunk);
}

initializePackagedLogging();

function getDestructiveMenuIcon(): Electron.NativeImage | undefined {
if (process.platform !== "darwin") return undefined;
if (destructiveMenuIconCache !== undefined) {
return destructiveMenuIconCache ?? undefined;
}
try {
const icon = nativeImage.createFromNamedImage("trash").resize({
width: 14,
height: 14,
});
if (icon.isEmpty()) {
destructiveMenuIconCache = null;
return undefined;
}
icon.setTemplateImage(true);
destructiveMenuIconCache = icon;
return icon;
} catch {
destructiveMenuIconCache = null;
return undefined;
}
}
let updatePollTimer: ReturnType<typeof setInterval> | null = null;
let updateStartupTimer: ReturnType<typeof setTimeout> | null = null;
let updateCheckInFlight = false;
let updateDownloadInFlight = false;
let updaterConfigured = false;
let updateState: DesktopUpdateState = initialUpdateState();

function resolveUpdaterErrorContext(): DesktopUpdateErrorContext {
if (updateDownloadInFlight) return "download";
if (updateCheckInFlight) return "check";
return updateState.errorContext;
}

protocol.registerSchemesAsPrivileged([
{
scheme: DESKTOP_SCHEME,
privileges: {
standard: true,
secure: true,
supportFetchAPI: true,
corsEnabled: true,
},
},
]);

function resolveAppRoot(): string {
if (!app.isPackaged) {
return ROOT_DIR;
}
return app.getAppPath();
}

/\*_ Read the baked-in app-update.yml config (if applicable). _/
function readAppUpdateYml(): Record<string, string> | null {
try {
// electron-updater reads from process.resourcesPath in packaged builds,
// or dev-app-update.yml via app.getAppPath() in dev.
const ymlPath = app.isPackaged
? Path.join(process.resourcesPath, "app-update.yml")
: Path.join(app.getAppPath(), "dev-app-update.yml");
const raw = FS.readFileSync(ymlPath, "utf-8");
// The YAML is simple key-value pairs — avoid pulling in a YAML parser by
// doing a line-based parse (fields: provider, owner, repo, releaseType, …).
const entries: Record<string, string> = {};
for (const line of raw.split("\n")) {
const match = line.match(/^(\w+):\s\*(.+)$/);
if (match?.[1] && match[2]) entries[match[1]] = match[2].trim();
}
return entries.provider ? entries : null;
} catch {
return null;
}
}

function normalizeCommitHash(value: unknown): string | null {
if (typeof value !== "string") {
return null;
}
const trimmed = value.trim();
if (!COMMIT_HASH_PATTERN.test(trimmed)) {
return null;
}
return trimmed.slice(0, COMMIT_HASH_DISPLAY_LENGTH).toLowerCase();
}

function resolveEmbeddedCommitHash(): string | null {
const packageJsonPath = Path.join(resolveAppRoot(), "package.json");
if (!FS.existsSync(packageJsonPath)) {
return null;
}

try {
const raw = FS.readFileSync(packageJsonPath, "utf8");
const parsed = JSON.parse(raw) as { t3codeCommitHash?: unknown };
return normalizeCommitHash(parsed.t3codeCommitHash);
} catch {
return null;
}
}

function resolveAboutCommitHash(): string | null {
if (aboutCommitHashCache !== undefined) {
return aboutCommitHashCache;
}

const envCommitHash = normalizeCommitHash(process.env.T3CODE_COMMIT_HASH);
if (envCommitHash) {
aboutCommitHashCache = envCommitHash;
return aboutCommitHashCache;
}

// Only packaged builds are required to expose commit metadata.
if (!app.isPackaged) {
aboutCommitHashCache = null;
return aboutCommitHashCache;
}

aboutCommitHashCache = resolveEmbeddedCommitHash();

return aboutCommitHashCache;
}

function resolveBackendEntry(): string {
return Path.join(resolveAppRoot(), "apps/server/dist/index.mjs");
}

function resolveBackendCwd(): string {
if (!app.isPackaged) {
return resolveAppRoot();
}
return OS.homedir();
}

function resolveDesktopStaticDir(): string | null {
const appRoot = resolveAppRoot();
const candidates = [
Path.join(appRoot, "apps/server/dist/client"),
Path.join(appRoot, "apps/web/dist"),
];

for (const candidate of candidates) {
if (FS.existsSync(Path.join(candidate, "index.html"))) {
return candidate;
}
}

return null;
}

function resolveDesktopStaticPath(staticRoot: string, requestUrl: string): string {
const url = new URL(requestUrl);
const rawPath = decodeURIComponent(url.pathname);
const normalizedPath = Path.posix.normalize(rawPath).replace(/^\/+/, "");
if (normalizedPath.includes("..")) {
return Path.join(staticRoot, "index.html");
}

const requestedPath = normalizedPath.length > 0 ? normalizedPath : "index.html";
const resolvedPath = Path.join(staticRoot, requestedPath);

if (Path.extname(resolvedPath)) {
return resolvedPath;
}

const nestedIndex = Path.join(resolvedPath, "index.html");
if (FS.existsSync(nestedIndex)) {
return nestedIndex;
}

return Path.join(staticRoot, "index.html");
}

function isStaticAssetRequest(requestUrl: string): boolean {
try {
const url = new URL(requestUrl);
return Path.extname(url.pathname).length > 0;
} catch {
return false;
}
}

function handleFatalStartupError(stage: string, error: unknown): void {
const message = formatErrorMessage(error);
const detail =
error instanceof Error && typeof error.stack === "string" ? `\n${error.stack}` : "";
writeDesktopLogHeader(`fatal startup error stage=${stage} message=${message}`);
console.error(`[desktop] fatal startup error (${stage})`, error);
if (!isQuitting) {
isQuitting = true;
dialog.showErrorBox("T3 Code failed to start", `Stage: ${stage}\n${message}${detail}`);
}
stopBackend();
restoreStdIoCapture?.();
app.quit();
}

function registerDesktopProtocol(): void {
if (isDevelopment || desktopProtocolRegistered) return;

const staticRoot = resolveDesktopStaticDir();
if (!staticRoot) {
throw new Error(
"Desktop static bundle missing. Build apps/server (with bundled client) first.",
);
}

const staticRootResolved = Path.resolve(staticRoot);
const staticRootPrefix = `${staticRootResolved}${Path.sep}`;
const fallbackIndex = Path.join(staticRootResolved, "index.html");

protocol.registerFileProtocol(DESKTOP_SCHEME, (request, callback) => {
try {
const candidate = resolveDesktopStaticPath(staticRootResolved, request.url);
const resolvedCandidate = Path.resolve(candidate);
const isInRoot =
resolvedCandidate === fallbackIndex || resolvedCandidate.startsWith(staticRootPrefix);
const isAssetRequest = isStaticAssetRequest(request.url);

      if (!isInRoot || !FS.existsSync(resolvedCandidate)) {
        if (isAssetRequest) {
          callback({ error: -6 });
          return;
        }
        callback({ path: fallbackIndex });
        return;
      }

      callback({ path: resolvedCandidate });
    } catch {
      callback({ path: fallbackIndex });
    }

});

desktopProtocolRegistered = true;
}

function dispatchMenuAction(action: string): void {
const existingWindow =
BrowserWindow.getFocusedWindow() ?? mainWindow ?? BrowserWindow.getAllWindows()[0];
const targetWindow = existingWindow ?? createWindow();
if (!existingWindow) {
mainWindow = targetWindow;
}

const send = () => {
if (targetWindow.isDestroyed()) return;
targetWindow.webContents.send(MENU_ACTION_CHANNEL, action);
if (!targetWindow.isVisible()) {
targetWindow.show();
}
targetWindow.focus();
};

if (targetWindow.webContents.isLoadingMainFrame()) {
targetWindow.webContents.once("did-finish-load", send);
return;
}

send();
}

function handleCheckForUpdatesMenuClick(): void {
const disabledReason = getAutoUpdateDisabledReason({
isDevelopment,
isPackaged: app.isPackaged,
platform: process.platform,
appImage: process.env.APPIMAGE,
disabledByEnv: process.env.T3CODE_DISABLE_AUTO_UPDATE === "1",
});
if (disabledReason) {
console.info("[desktop-updater] Manual update check requested, but updates are disabled.");
void dialog.showMessageBox({
type: "info",
title: "Updates unavailable",
message: "Automatic updates are not available right now.",
detail: disabledReason,
buttons: ["OK"],
});
return;
}

if (!BrowserWindow.getAllWindows().length) {
mainWindow = createWindow();
}
void checkForUpdates("menu");
}

function configureApplicationMenu(): void {
const template: MenuItemConstructorOptions[] = [];

if (process.platform === "darwin") {
template.push({
label: app.name,
submenu: [
{ role: "about" },
{
label: "Check for Updates...",
click: () => handleCheckForUpdatesMenuClick(),
},
{ type: "separator" },
{
label: "Settings...",
accelerator: "CmdOrCtrl+,",
click: () => dispatchMenuAction("open-settings"),
},
{ type: "separator" },
{ role: "services" },
{ type: "separator" },
{ role: "hide" },
{ role: "hideOthers" },
{ role: "unhide" },
{ type: "separator" },
{ role: "quit" },
],
});
}

template.push(
{
label: "File",
submenu: [
...(process.platform === "darwin"
? []
: [
{
label: "Settings...",
accelerator: "CmdOrCtrl+,",
click: () => dispatchMenuAction("open-settings"),
},
{ type: "separator" as const },
]),
{ role: process.platform === "darwin" ? "close" : "quit" },
],
},
{ role: "editMenu" },
{ role: "viewMenu" },
{ role: "windowMenu" },
{
role: "help",
submenu: [
{
label: "Check for Updates...",
click: () => handleCheckForUpdatesMenuClick(),
},
],
},
);

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function resolveResourcePath(fileName: string): string | null {
const candidates = [
Path.join(__dirname, "../resources", fileName),
Path.join(process.resourcesPath, "resources", fileName),
Path.join(process.resourcesPath, fileName),
];

for (const candidate of candidates) {
if (FS.existsSync(candidate)) {
return candidate;
}
}

return null;
}

function resolveIconPath(ext: "ico" | "icns" | "png"): string | null {
return resolveResourcePath(`icon.${ext}`);
}

/\*\*

- Resolve the Electron userData directory path.
-
- Electron derives the default userData path from `productName` in
- package.json, which currently produces directories with spaces and
- parentheses (e.g. `~/.config/T3 Code (Alpha)` on Linux). This is
- unfriendly for shell usage and violates Linux naming conventions.
-
- We override it to a clean lowercase name (`t3code`). If the legacy
- directory already exists we keep using it so existing users don't
- lose their Chromium profile data (localStorage, cookies, sessions).
  \*/
  function resolveUserDataPath(): string {
  const appDataBase =
  process.platform === "win32"
  ? process.env.APPDATA || Path.join(OS.homedir(), "AppData", "Roaming")
  : process.platform === "darwin"
  ? Path.join(OS.homedir(), "Library", "Application Support")
  : process.env.XDG_CONFIG_HOME || Path.join(OS.homedir(), ".config");

const legacyPath = Path.join(appDataBase, LEGACY_USER_DATA_DIR_NAME);
if (FS.existsSync(legacyPath)) {
return legacyPath;
}

return Path.join(appDataBase, USER_DATA_DIR_NAME);
}

function configureAppIdentity(): void {
app.setName(APP_DISPLAY_NAME);
const commitHash = resolveAboutCommitHash();
app.setAboutPanelOptions({
applicationName: APP_DISPLAY_NAME,
applicationVersion: app.getVersion(),
version: commitHash ?? "unknown",
});

if (process.platform === "win32") {
app.setAppUserModelId(APP_USER_MODEL_ID);
}

if (process.platform === "darwin" && app.dock) {
const iconPath = resolveIconPath("png");
if (iconPath) {
app.dock.setIcon(iconPath);
}
}
}

function clearUpdatePollTimer(): void {
if (updateStartupTimer) {
clearTimeout(updateStartupTimer);
updateStartupTimer = null;
}
if (updatePollTimer) {
clearInterval(updatePollTimer);
updatePollTimer = null;
}
}

function emitUpdateState(): void {
for (const window of BrowserWindow.getAllWindows()) {
if (window.isDestroyed()) continue;
window.webContents.send(UPDATE_STATE_CHANNEL, updateState);
}
}

function setUpdateState(patch: Partial<DesktopUpdateState>): void {
updateState = { ...updateState, ...patch };
emitUpdateState();
}

function shouldEnableAutoUpdates(): boolean {
return (
getAutoUpdateDisabledReason({
isDevelopment,
isPackaged: app.isPackaged,
platform: process.platform,
appImage: process.env.APPIMAGE,
disabledByEnv: process.env.T3CODE_DISABLE_AUTO_UPDATE === "1",
}) === null
);
}

async function checkForUpdates(reason: string): Promise<void> {
if (isQuitting || !updaterConfigured || updateCheckInFlight) return;
if (updateState.status === "downloading" || updateState.status === "downloaded") {
console.info(
`[desktop-updater] Skipping update check (${reason}) while status=${updateState.status}.`,
);
return;
}
updateCheckInFlight = true;
setUpdateState(reduceDesktopUpdateStateOnCheckStart(updateState, new Date().toISOString()));
console.info(`[desktop-updater] Checking for updates (${reason})...`);

try {
await autoUpdater.checkForUpdates();
} catch (error: unknown) {
const message = error instanceof Error ? error.message : String(error);
setUpdateState(reduceDesktopUpdateStateOnCheckFailure(updateState, message, new Date().toISOString()));
console.error(`[desktop-updater] Failed to check for updates: ${message}`);
} finally {
updateCheckInFlight = false;
}
}

async function downloadAvailableUpdate(): Promise<{ accepted: boolean; completed: boolean }> {
if (!updaterConfigured || updateDownloadInFlight || updateState.status !== "available") {
return { accepted: false, completed: false };
}
updateDownloadInFlight = true;
setUpdateState(reduceDesktopUpdateStateOnDownloadStart(updateState));
console.info("[desktop-updater] Downloading update...");

try {
await autoUpdater.downloadUpdate();
return { accepted: true, completed: true };
} catch (error: unknown) {
const message = error instanceof Error ? error.message : String(error);
setUpdateState(reduceDesktopUpdateStateOnDownloadFailure(updateState, message));
console.error(`[desktop-updater] Failed to download update: ${message}`);
return { accepted: true, completed: false };
} finally {
updateDownloadInFlight = false;
}
}

async function installDownloadedUpdate(): Promise<{ accepted: boolean; completed: boolean }> {
if (isQuitting || !updaterConfigured || updateState.status !== "downloaded") {
return { accepted: false, completed: false };
}

isQuitting = true;
clearUpdatePollTimer();
try {
await stopBackendAndWaitForExit();
autoUpdater.quitAndInstall();
return { accepted: true, completed: true };
} catch (error: unknown) {
const message = formatErrorMessage(error);
isQuitting = false;
setUpdateState(reduceDesktopUpdateStateOnInstallFailure(updateState, message));
console.error(`[desktop-updater] Failed to install update: ${message}`);
return { accepted: true, completed: false };
}
}

function configureAutoUpdater(): void {
const enabled = shouldEnableAutoUpdates();
setUpdateState({
...createInitialDesktopUpdateState(app.getVersion()),
enabled,
status: enabled ? "idle" : "disabled",
});
if (!enabled) {
return;
}
updaterConfigured = true;

const githubToken =
process.env.T3CODE_DESKTOP_UPDATE_GITHUB_TOKEN?.trim() ||
process.env.GH_TOKEN?.trim() ||
"";
if (githubToken) {
// When a token is provided, re-configure the feed with `private: true` so
// electron-updater uses the GitHub API (api.github.com) instead of the
// public Atom feed (github.com/…/releases.atom) which rejects Bearer auth.
const appUpdateYml = readAppUpdateYml();
if (appUpdateYml?.provider === "github") {
autoUpdater.setFeedURL({
...appUpdateYml,
provider: "github" as const,
private: true,
token: githubToken,
});
}
}

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;
// Keep alpha branding, but force all installs onto the stable update track.
autoUpdater.channel = DESKTOP_UPDATE_CHANNEL;
autoUpdater.allowPrerelease = DESKTOP_UPDATE_ALLOW_PRERELEASE;
autoUpdater.allowDowngrade = false;
let lastLoggedDownloadMilestone = -1;

autoUpdater.on("checking-for-update", () => {
console.info("[desktop-updater] Looking for updates...");
});
autoUpdater.on("update-available", (info) => {
setUpdateState(reduceDesktopUpdateStateOnUpdateAvailable(updateState, info.version, new Date().toISOString()));
lastLoggedDownloadMilestone = -1;
console.info(`[desktop-updater] Update available: ${info.version}`);
});
autoUpdater.on("update-not-available", () => {
setUpdateState(reduceDesktopUpdateStateOnNoUpdate(updateState, new Date().toISOString()));
lastLoggedDownloadMilestone = -1;
console.info("[desktop-updater] No updates available.");
});
autoUpdater.on("error", (error) => {
const message = formatErrorMessage(error);
if (!updateCheckInFlight && !updateDownloadInFlight) {
setUpdateState({
status: "error",
message,
checkedAt: new Date().toISOString(),
downloadPercent: null,
errorContext: resolveUpdaterErrorContext(),
canRetry: updateState.availableVersion !== null || updateState.downloadedVersion !== null,
});
}
console.error(`[desktop-updater] Updater error: ${message}`);
});
autoUpdater.on("download-progress", (progress) => {
const percent = Math.floor(progress.percent);
if (
shouldBroadcastDownloadProgress(updateState, progress.percent) ||
updateState.message !== null
) {
setUpdateState(reduceDesktopUpdateStateOnDownloadProgress(updateState, progress.percent));
}
const milestone = percent - (percent % 10);
if (milestone > lastLoggedDownloadMilestone) {
lastLoggedDownloadMilestone = milestone;
console.info(`[desktop-updater] Download progress: ${percent}%`);
}
});
autoUpdater.on("update-downloaded", (info) => {
setUpdateState(reduceDesktopUpdateStateOnDownloadComplete(updateState, info.version));
console.info(`[desktop-updater] Update downloaded: ${info.version}`);
});

clearUpdatePollTimer();

updateStartupTimer = setTimeout(() => {
updateStartupTimer = null;
void checkForUpdates("startup");
}, AUTO_UPDATE_STARTUP_DELAY_MS);
updateStartupTimer.unref();

updatePollTimer = setInterval(() => {
void checkForUpdates("poll");
}, AUTO_UPDATE_POLL_INTERVAL_MS);
updatePollTimer.unref();
}
function backendEnv(): NodeJS.ProcessEnv {
return {
...process.env,
T3CODE_MODE: "desktop",
T3CODE_NO_BROWSER: "1",
T3CODE_PORT: String(backendPort),
T3CODE_STATE_DIR: STATE_DIR,
T3CODE_AUTH_TOKEN: backendAuthToken,
};
}

function scheduleBackendRestart(reason: string): void {
if (isQuitting || restartTimer) return;

const delayMs = Math.min(500 \* 2 \*\* restartAttempt, 10_000);
restartAttempt += 1;
console.error(`[desktop] backend exited unexpectedly (${reason}); restarting in ${delayMs}ms`);

restartTimer = setTimeout(() => {
restartTimer = null;
startBackend();
}, delayMs);
}

function startBackend(): void {
if (isQuitting || backendProcess) return;

const backendEntry = resolveBackendEntry();
if (!FS.existsSync(backendEntry)) {
scheduleBackendRestart(`missing server entry at ${backendEntry}`);
return;
}

const captureBackendLogs = app.isPackaged && backendLogSink !== null;
const child = ChildProcess.spawn(process.execPath, [backendEntry], {
cwd: resolveBackendCwd(),
// In Electron main, process.execPath points to the Electron binary.
// Run the child in Node mode so this backend process does not become a GUI app instance.
env: {
...backendEnv(),
ELECTRON_RUN_AS_NODE: "1",
},
stdio: captureBackendLogs ? ["ignore", "pipe", "pipe"] : "inherit",
});
backendProcess = child;
let backendSessionClosed = false;
const closeBackendSession = (details: string) => {
if (backendSessionClosed) return;
backendSessionClosed = true;
writeBackendSessionBoundary("END", details);
};
writeBackendSessionBoundary(
"START",
`pid=${child.pid ?? "unknown"} port=${backendPort} cwd=${resolveBackendCwd()}`,
);
captureBackendOutput(child);

child.once("spawn", () => {
restartAttempt = 0;
});

child.on("error", (error) => {
if (backendProcess === child) {
backendProcess = null;
}
closeBackendSession(`pid=${child.pid ?? "unknown"} error=${error.message}`);
scheduleBackendRestart(error.message);
});

child.on("exit", (code, signal) => {
if (backendProcess === child) {
backendProcess = null;
}
closeBackendSession(
`pid=${child.pid ?? "unknown"} code=${code ?? "null"} signal=${signal ?? "null"}`,
);
if (isQuitting) return;
const reason = `code=${code ?? "null"} signal=${signal ?? "null"}`;
scheduleBackendRestart(reason);
});
}

function stopBackend(): void {
if (restartTimer) {
clearTimeout(restartTimer);
restartTimer = null;
}

const child = backendProcess;
backendProcess = null;
if (!child) return;

if (child.exitCode === null && child.signalCode === null) {
child.kill("SIGTERM");
setTimeout(() => {
if (child.exitCode === null && child.signalCode === null) {
child.kill("SIGKILL");
}
}, 2_000).unref();
}
}

async function stopBackendAndWaitForExit(timeoutMs = 5_000): Promise<void> {
if (restartTimer) {
clearTimeout(restartTimer);
restartTimer = null;
}

const child = backendProcess;
backendProcess = null;
if (!child) return;
const backendChild = child;
if (backendChild.exitCode !== null || backendChild.signalCode !== null) return;

await new Promise<void>((resolve) => {
let settled = false;
let forceKillTimer: ReturnType<typeof setTimeout> | null = null;
let exitTimeoutTimer: ReturnType<typeof setTimeout> | null = null;

    function settle(): void {
      if (settled) return;
      settled = true;
      backendChild.off("exit", onExit);
      if (forceKillTimer) {
        clearTimeout(forceKillTimer);
      }
      if (exitTimeoutTimer) {
        clearTimeout(exitTimeoutTimer);
      }
      resolve();
    }

    function onExit(): void {
      settle();
    }

    backendChild.once("exit", onExit);
    backendChild.kill("SIGTERM");

    forceKillTimer = setTimeout(() => {
      if (backendChild.exitCode === null && backendChild.signalCode === null) {
        backendChild.kill("SIGKILL");
      }
    }, 2_000);
    forceKillTimer.unref();

    exitTimeoutTimer = setTimeout(() => {
      settle();
    }, timeoutMs);
    exitTimeoutTimer.unref();

});
}

function registerIpcHandlers(): void {
ipcMain.removeHandler(PICK_FOLDER_CHANNEL);
ipcMain.handle(PICK_FOLDER_CHANNEL, async () => {
const owner = BrowserWindow.getFocusedWindow() ?? mainWindow;
const result = owner
? await dialog.showOpenDialog(owner, {
properties: ["openDirectory", "createDirectory"],
})
: await dialog.showOpenDialog({
properties: ["openDirectory", "createDirectory"],
});
if (result.canceled) return null;
return result.filePaths[0] ?? null;
});

ipcMain.removeHandler(CONFIRM_CHANNEL);
ipcMain.handle(CONFIRM_CHANNEL, async (\_event, message: unknown) => {
if (typeof message !== "string") {
return false;
}

    const owner = BrowserWindow.getFocusedWindow() ?? mainWindow;
    return showDesktopConfirmDialog(message, owner);

});

ipcMain.removeHandler(CONTEXT_MENU_CHANNEL);
ipcMain.handle(
CONTEXT_MENU_CHANNEL,
async (\_event, items: ContextMenuItem[], position?: { x: number; y: number }) => {
const normalizedItems = items
.filter((item) => typeof item.id === "string" && typeof item.label === "string")
.map((item) => ({
id: item.id,
label: item.label,
destructive: item.destructive === true,
}));
if (normalizedItems.length === 0) {
return null;
}

      const popupPosition =
        position &&
        Number.isFinite(position.x) &&
        Number.isFinite(position.y) &&
        position.x >= 0 &&
        position.y >= 0
          ? {
              x: Math.floor(position.x),
              y: Math.floor(position.y),
            }
          : null;

      const window = BrowserWindow.getFocusedWindow() ?? mainWindow;
      if (!window) return null;

      return new Promise<string | null>((resolve) => {
        const template: MenuItemConstructorOptions[] = [];
        let hasInsertedDestructiveSeparator = false;
        for (const item of normalizedItems) {
          if (item.destructive && !hasInsertedDestructiveSeparator && template.length > 0) {
            template.push({ type: "separator" });
            hasInsertedDestructiveSeparator = true;
          }
          const itemOption: MenuItemConstructorOptions = {
            label: item.label,
            click: () => resolve(item.id),
          };
          if (item.destructive) {
            const destructiveIcon = getDestructiveMenuIcon();
            if (destructiveIcon) {
              itemOption.icon = destructiveIcon;
            }
          }
          template.push(itemOption);
        }

        const menu = Menu.buildFromTemplate(template);
        menu.popup({
          window,
          ...popupPosition,
          callback: () => resolve(null),
        });
      });
    },

);

ipcMain.removeHandler(OPEN_EXTERNAL_CHANNEL);
ipcMain.handle(OPEN_EXTERNAL_CHANNEL, async (\_event, rawUrl: unknown) => {
const externalUrl = getSafeExternalUrl(rawUrl);
if (!externalUrl) {
return false;
}

    try {
      await shell.openExternal(externalUrl);
      return true;
    } catch {
      return false;
    }

});

ipcMain.removeHandler(UPDATE_GET_STATE_CHANNEL);
ipcMain.handle(UPDATE_GET_STATE_CHANNEL, async () => updateState);

ipcMain.removeHandler(UPDATE_DOWNLOAD_CHANNEL);
ipcMain.handle(UPDATE_DOWNLOAD_CHANNEL, async () => {
const result = await downloadAvailableUpdate();
return {
accepted: result.accepted,
completed: result.completed,
state: updateState,
} satisfies DesktopUpdateActionResult;
});

ipcMain.removeHandler(UPDATE_INSTALL_CHANNEL);
ipcMain.handle(UPDATE_INSTALL_CHANNEL, async () => {
if (isQuitting) {
return {
accepted: false,
completed: false,
state: updateState,
} satisfies DesktopUpdateActionResult;
}
const result = await installDownloadedUpdate();
return {
accepted: result.accepted,
completed: result.completed,
state: updateState,
} satisfies DesktopUpdateActionResult;
});
}

function getIconOption(): { icon: string } | Record<string, never> {
if (process.platform === "darwin") return {}; // macOS uses .icns from app bundle
const ext = process.platform === "win32" ? "ico" : "png";
const iconPath = resolveIconPath(ext);
return iconPath ? { icon: iconPath } : {};
}

function createWindow(): BrowserWindow {
const window = new BrowserWindow({
width: 1100,
height: 780,
minWidth: 840,
minHeight: 620,
show: false,
autoHideMenuBar: true,
...getIconOption(),
title: APP_DISPLAY_NAME,
titleBarStyle: "hiddenInset",
trafficLightPosition: { x: 16, y: 18 },
webPreferences: {
preload: Path.join(\_\_dirname, "preload.js"),
contextIsolation: true,
nodeIntegration: false,
sandbox: true,
},
});

window.webContents.on("context-menu", (event, params) => {
event.preventDefault();

    const menuTemplate: MenuItemConstructorOptions[] = [];

    if (params.misspelledWord) {
      for (const suggestion of params.dictionarySuggestions.slice(0, 5)) {
        menuTemplate.push({
          label: suggestion,
          click: () => window.webContents.replaceMisspelling(suggestion),
        });
      }
      if (params.dictionarySuggestions.length === 0) {
        menuTemplate.push({ label: "No suggestions", enabled: false });
      }
      menuTemplate.push({ type: "separator" });
    }

    menuTemplate.push(
      { role: "cut", enabled: params.editFlags.canCut },
      { role: "copy", enabled: params.editFlags.canCopy },
      { role: "paste", enabled: params.editFlags.canPaste },
      { role: "selectAll", enabled: params.editFlags.canSelectAll },
    );

    Menu.buildFromTemplate(menuTemplate).popup({ window });

});

window.webContents.setWindowOpenHandler(({ url }) => {
const externalUrl = getSafeExternalUrl(url);
if (externalUrl) {
void shell.openExternal(externalUrl);
}
return { action: "deny" };
});

window.on("page-title-updated", (event) => {
event.preventDefault();
window.setTitle(APP_DISPLAY_NAME);
});
window.webContents.on("did-finish-load", () => {
window.setTitle(APP_DISPLAY_NAME);
emitUpdateState();
});
window.once("ready-to-show", () => {
window.show();
});

if (isDevelopment) {
void window.loadURL(process.env.VITE_DEV_SERVER_URL as string);
window.webContents.openDevTools({ mode: "detach" });
} else {
void window.loadURL(`${DESKTOP_SCHEME}://app/index.html`);
}

window.on("closed", () => {
if (mainWindow === window) {
mainWindow = null;
}
});

return window;
}

// Override Electron's userData path before the `ready` event so that
// Chromium session data uses a filesystem-friendly directory name.
// Must be called synchronously at the top level — before `app.whenReady()`.
app.setPath("userData", resolveUserDataPath());

configureAppIdentity();

async function bootstrap(): Promise<void> {
writeDesktopLogHeader("bootstrap start");
backendPort = await Effect.service(NetService).pipe(
Effect.flatMap((net) => net.reserveLoopbackPort()),
Effect.provide(NetService.layer),
Effect.runPromise,
);
writeDesktopLogHeader(`reserved backend port via NetService port=${backendPort}`);
backendAuthToken = Crypto.randomBytes(24).toString("hex");
backendWsUrl = `ws://127.0.0.1:${backendPort}/?token=${encodeURIComponent(backendAuthToken)}`;
process.env.T3CODE_DESKTOP_WS_URL = backendWsUrl;
writeDesktopLogHeader(`bootstrap resolved websocket url=${backendWsUrl}`);

registerIpcHandlers();
writeDesktopLogHeader("bootstrap ipc handlers registered");
startBackend();
writeDesktopLogHeader("bootstrap backend start requested");
mainWindow = createWindow();
writeDesktopLogHeader("bootstrap main window created");
}

app.on("before-quit", () => {
isQuitting = true;
writeDesktopLogHeader("before-quit received");
clearUpdatePollTimer();
stopBackend();
restoreStdIoCapture?.();
});

app
.whenReady()
.then(() => {
writeDesktopLogHeader("app ready");
configureAppIdentity();
configureApplicationMenu();
registerDesktopProtocol();
configureAutoUpdater();
void bootstrap().catch((error) => {
handleFatalStartupError("bootstrap", error);
});

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createWindow();
      }
    });

})
.catch((error) => {
handleFatalStartupError("whenReady", error);
});

app.on("window-all-closed", () => {
if (process.platform !== "darwin") {
app.quit();
}
});

if (process.platform !== "win32") {
process.on("SIGINT", () => {
if (isQuitting) return;
isQuitting = true;
writeDesktopLogHeader("SIGINT received");
clearUpdatePollTimer();
stopBackend();
restoreStdIoCapture?.();
app.quit();
});

process.on("SIGTERM", () => {
if (isQuitting) return;
isQuitting = true;
writeDesktopLogHeader("SIGTERM received");
clearUpdatePollTimer();
stopBackend();
restoreStdIoCapture?.();
app.quit();
});
}

================================================
FILE: apps/desktop/src/preload.ts
================================================
import { contextBridge, ipcRenderer } from "electron";
import type { DesktopBridge } from "@t3tools/contracts";

const PICK_FOLDER_CHANNEL = "desktop:pick-folder";
const CONFIRM_CHANNEL = "desktop:confirm";
const CONTEXT_MENU_CHANNEL = "desktop:context-menu";
const OPEN_EXTERNAL_CHANNEL = "desktop:open-external";
const MENU_ACTION_CHANNEL = "desktop:menu-action";
const UPDATE_STATE_CHANNEL = "desktop:update-state";
const UPDATE_GET_STATE_CHANNEL = "desktop:update-get-state";
const UPDATE_DOWNLOAD_CHANNEL = "desktop:update-download";
const UPDATE_INSTALL_CHANNEL = "desktop:update-install";
const wsUrl = process.env.T3CODE_DESKTOP_WS_URL ?? null;

contextBridge.exposeInMainWorld("desktopBridge", {
getWsUrl: () => wsUrl,
pickFolder: () => ipcRenderer.invoke(PICK_FOLDER_CHANNEL),
confirm: (message) => ipcRenderer.invoke(CONFIRM_CHANNEL, message),
showContextMenu: (items, position) => ipcRenderer.invoke(CONTEXT_MENU_CHANNEL, items, position),
openExternal: (url: string) => ipcRenderer.invoke(OPEN_EXTERNAL_CHANNEL, url),
onMenuAction: (listener) => {
const wrappedListener = (\_event: Electron.IpcRendererEvent, action: unknown) => {
if (typeof action !== "string") return;
listener(action);
};

    ipcRenderer.on(MENU_ACTION_CHANNEL, wrappedListener);
    return () => {
      ipcRenderer.removeListener(MENU_ACTION_CHANNEL, wrappedListener);
    };

},
getUpdateState: () => ipcRenderer.invoke(UPDATE_GET_STATE_CHANNEL),
downloadUpdate: () => ipcRenderer.invoke(UPDATE_DOWNLOAD_CHANNEL),
installUpdate: () => ipcRenderer.invoke(UPDATE_INSTALL_CHANNEL),
onUpdateState: (listener) => {
const wrappedListener = (\_event: Electron.IpcRendererEvent, state: unknown) => {
if (typeof state !== "object" || state === null) return;
listener(state as Parameters<typeof listener>[0]);
};

    ipcRenderer.on(UPDATE_STATE_CHANNEL, wrappedListener);
    return () => {
      ipcRenderer.removeListener(UPDATE_STATE_CHANNEL, wrappedListener);
    };

},
} satisfies DesktopBridge);

================================================
FILE: apps/desktop/src/rotatingFileSink.test.ts
================================================
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { RotatingFileSink } from "@t3tools/shared/logging";
import { afterEach, describe, expect, it } from "vitest";

const tempRoots: string[] = [];

function makeTempDir(): string {
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "t3-rotating-log-"));
tempRoots.push(dir);
return dir;
}

afterEach(() => {
for (const dir of tempRoots.splice(0)) {
fs.rmSync(dir, { recursive: true, force: true });
}
});

describe("RotatingFileSink", () => {
it("rotates when writes exceed max bytes", () => {
const dir = makeTempDir();
const logPath = path.join(dir, "desktop-main.log");
const sink = new RotatingFileSink({
filePath: logPath,
maxBytes: 10,
maxFiles: 3,
});

    sink.write("12345");
    sink.write("67890");
    sink.write("abc");

    expect(fs.readFileSync(path.join(dir, "desktop-main.log"), "utf8")).toBe("abc");
    expect(fs.readFileSync(path.join(dir, "desktop-main.log.1"), "utf8")).toBe("1234567890");

});

it("retains only maxFiles backups", () => {
const dir = makeTempDir();
const logPath = path.join(dir, "server-child.log");
const sink = new RotatingFileSink({
filePath: logPath,
maxBytes: 4,
maxFiles: 2,
});

    sink.write("aaaa");
    sink.write("bbbb");
    sink.write("cccc");
    sink.write("dddd");

    expect(fs.existsSync(path.join(dir, "server-child.log.1"))).toBe(true);
    expect(fs.existsSync(path.join(dir, "server-child.log.2"))).toBe(true);
    expect(fs.existsSync(path.join(dir, "server-child.log.3"))).toBe(false);

});

it("prunes stale backups above maxFiles on startup", () => {
const dir = makeTempDir();
const logPath = path.join(dir, "desktop-main.log");
fs.writeFileSync(path.join(dir, "desktop-main.log.1"), "first");
fs.writeFileSync(path.join(dir, "desktop-main.log.4"), "stale");

    const sink = new RotatingFileSink({
      filePath: logPath,
      maxBytes: 16,
      maxFiles: 2,
    });
    sink.write("hello");

    expect(fs.existsSync(path.join(dir, "desktop-main.log.4"))).toBe(false);

});
});

================================================
FILE: apps/desktop/src/updateMachine.test.ts
================================================
import { describe, expect, it } from "vitest";

import {
createInitialDesktopUpdateState,
reduceDesktopUpdateStateOnCheckFailure,
reduceDesktopUpdateStateOnCheckStart,
reduceDesktopUpdateStateOnDownloadComplete,
reduceDesktopUpdateStateOnDownloadFailure,
reduceDesktopUpdateStateOnDownloadProgress,
reduceDesktopUpdateStateOnDownloadStart,
reduceDesktopUpdateStateOnInstallFailure,
reduceDesktopUpdateStateOnNoUpdate,
reduceDesktopUpdateStateOnUpdateAvailable,
} from "./updateMachine";

describe("updateMachine", () => {
it("clears transient errors when a check starts", () => {
const state = reduceDesktopUpdateStateOnCheckStart(
{
...createInitialDesktopUpdateState("1.0.0"),
enabled: true,
status: "error",
message: "network",
errorContext: "check",
canRetry: true,
},
"2026-03-04T00:00:00.000Z",
);

    expect(state.status).toBe("checking");
    expect(state.message).toBeNull();
    expect(state.errorContext).toBeNull();
    expect(state.canRetry).toBe(false);

});

it("records a check failure without exposing an action", () => {
const state = reduceDesktopUpdateStateOnCheckFailure(
{
...createInitialDesktopUpdateState("1.0.0"),
enabled: true,
status: "checking",
},
"network unavailable",
"2026-03-04T00:00:00.000Z",
);

    expect(state.status).toBe("error");
    expect(state.errorContext).toBe("check");
    expect(state.canRetry).toBe(true);

});

it("preserves available version on download failure for retry", () => {
const state = reduceDesktopUpdateStateOnDownloadFailure(
{
...createInitialDesktopUpdateState("1.0.0"),
enabled: true,
status: "downloading",
availableVersion: "1.1.0",
downloadPercent: 43,
},
"checksum mismatch",
);

    expect(state.status).toBe("available");
    expect(state.availableVersion).toBe("1.1.0");
    expect(state.errorContext).toBe("download");
    expect(state.canRetry).toBe(true);

});

it("transitions to downloaded and then preserves install retry state", () => {
const downloaded = reduceDesktopUpdateStateOnDownloadComplete(
{
...createInitialDesktopUpdateState("1.0.0"),
enabled: true,
status: "downloading",
availableVersion: "1.1.0",
},
"1.1.0",
);
const failedInstall = reduceDesktopUpdateStateOnInstallFailure(downloaded, "backend shutdown timed out");

    expect(downloaded.status).toBe("downloaded");
    expect(downloaded.downloadedVersion).toBe("1.1.0");
    expect(failedInstall.status).toBe("downloaded");
    expect(failedInstall.errorContext).toBe("install");
    expect(failedInstall.canRetry).toBe(true);

});

it("clears stale download state when no update is available", () => {
const state = reduceDesktopUpdateStateOnNoUpdate(
{
...createInitialDesktopUpdateState("1.0.0"),
enabled: true,
status: "error",
availableVersion: "1.1.0",
downloadedVersion: "1.1.0",
message: "old failure",
errorContext: "download",
canRetry: true,
},
"2026-03-04T00:00:00.000Z",
);

    expect(state.status).toBe("up-to-date");
    expect(state.availableVersion).toBeNull();
    expect(state.downloadedVersion).toBeNull();
    expect(state.message).toBeNull();
    expect(state.errorContext).toBeNull();

});

it("tracks available, download start, and progress cleanly", () => {
const available = reduceDesktopUpdateStateOnUpdateAvailable(
{
...createInitialDesktopUpdateState("1.0.0"),
enabled: true,
status: "checking",
},
"1.1.0",
"2026-03-04T00:00:00.000Z",
);
const downloading = reduceDesktopUpdateStateOnDownloadStart(available);
const progress = reduceDesktopUpdateStateOnDownloadProgress(downloading, 55.5);

    expect(available.status).toBe("available");
    expect(downloading.status).toBe("downloading");
    expect(downloading.downloadPercent).toBe(0);
    expect(progress.downloadPercent).toBe(55.5);
    expect(progress.errorContext).toBeNull();

});
});

================================================
FILE: apps/desktop/src/updateMachine.ts
================================================
import type { DesktopUpdateState } from "@t3tools/contracts";

import { getCanRetryAfterDownloadFailure, nextStatusAfterDownloadFailure } from "./updateState";

export function createInitialDesktopUpdateState(currentVersion: string): DesktopUpdateState {
return {
enabled: false,
status: "disabled",
currentVersion,
availableVersion: null,
downloadedVersion: null,
downloadPercent: null,
checkedAt: null,
message: null,
errorContext: null,
canRetry: false,
};
}

export function reduceDesktopUpdateStateOnCheckStart(
state: DesktopUpdateState,
checkedAt: string,
): DesktopUpdateState {
return {
...state,
status: "checking",
checkedAt,
message: null,
downloadPercent: null,
errorContext: null,
canRetry: false,
};
}

export function reduceDesktopUpdateStateOnCheckFailure(
state: DesktopUpdateState,
message: string,
checkedAt: string,
): DesktopUpdateState {
return {
...state,
status: "error",
message,
checkedAt,
downloadPercent: null,
errorContext: "check",
canRetry: true,
};
}

export function reduceDesktopUpdateStateOnUpdateAvailable(
state: DesktopUpdateState,
version: string,
checkedAt: string,
): DesktopUpdateState {
return {
...state,
status: "available",
availableVersion: version,
downloadedVersion: null,
downloadPercent: null,
checkedAt,
message: null,
errorContext: null,
canRetry: false,
};
}

export function reduceDesktopUpdateStateOnNoUpdate(
state: DesktopUpdateState,
checkedAt: string,
): DesktopUpdateState {
return {
...state,
status: "up-to-date",
availableVersion: null,
downloadedVersion: null,
downloadPercent: null,
checkedAt,
message: null,
errorContext: null,
canRetry: false,
};
}

export function reduceDesktopUpdateStateOnDownloadStart(
state: DesktopUpdateState,
): DesktopUpdateState {
return {
...state,
status: "downloading",
downloadPercent: 0,
message: null,
errorContext: null,
canRetry: false,
};
}

export function reduceDesktopUpdateStateOnDownloadFailure(
state: DesktopUpdateState,
message: string,
): DesktopUpdateState {
return {
...state,
status: nextStatusAfterDownloadFailure(state),
message,
downloadPercent: null,
errorContext: "download",
canRetry: getCanRetryAfterDownloadFailure(state),
};
}

export function reduceDesktopUpdateStateOnDownloadProgress(
state: DesktopUpdateState,
percent: number,
): DesktopUpdateState {
return {
...state,
status: "downloading",
downloadPercent: percent,
message: null,
errorContext: null,
canRetry: false,
};
}

export function reduceDesktopUpdateStateOnDownloadComplete(
state: DesktopUpdateState,
version: string,
): DesktopUpdateState {
return {
...state,
status: "downloaded",
availableVersion: version,
downloadedVersion: version,
downloadPercent: 100,
message: null,
errorContext: null,
canRetry: true,
};
}

export function reduceDesktopUpdateStateOnInstallFailure(
state: DesktopUpdateState,
message: string,
): DesktopUpdateState {
return {
...state,
status: "downloaded",
message,
errorContext: "install",
canRetry: true,
};
}

================================================
FILE: apps/desktop/src/updateState.test.ts
================================================
import { describe, expect, it } from "vitest";
import type { DesktopUpdateState } from "@t3tools/contracts";

import {
getCanRetryAfterDownloadFailure,
getAutoUpdateDisabledReason,
nextStatusAfterDownloadFailure,
shouldBroadcastDownloadProgress,
} from "./updateState";

const baseState: DesktopUpdateState = {
enabled: true,
status: "idle",
currentVersion: "1.0.0",
availableVersion: null,
downloadedVersion: null,
downloadPercent: null,
checkedAt: null,
message: null,
errorContext: null,
canRetry: false,
};

describe("shouldBroadcastDownloadProgress", () => {
it("broadcasts the first downloading progress update", () => {
expect(
shouldBroadcastDownloadProgress(
{ ...baseState, status: "downloading", downloadPercent: null },
1,
),
).toBe(true);
});

it("skips progress updates within the same 10% bucket", () => {
expect(
shouldBroadcastDownloadProgress(
{ ...baseState, status: "downloading", downloadPercent: 11.2 },
18.7,
),
).toBe(false);
});

it("broadcasts progress updates when a new 10% bucket is reached", () => {
expect(
shouldBroadcastDownloadProgress(
{ ...baseState, status: "downloading", downloadPercent: 19.9 },
20.1,
),
).toBe(true);
});

it("broadcasts progress updates when a retry resets the download percentage", () => {
expect(
shouldBroadcastDownloadProgress(
{ ...baseState, status: "downloading", downloadPercent: 50.4 },
0.2,
),
).toBe(true);
});
});

describe("getAutoUpdateDisabledReason", () => {
it("reports development builds as disabled", () => {
expect(
getAutoUpdateDisabledReason({
isDevelopment: true,
isPackaged: false,
platform: "darwin",
appImage: undefined,
disabledByEnv: false,
}),
).toContain("packaged production builds");
});

it("reports env-disabled auto updates", () => {
expect(
getAutoUpdateDisabledReason({
isDevelopment: false,
isPackaged: true,
platform: "darwin",
appImage: undefined,
disabledByEnv: true,
}),
).toContain("T3CODE_DISABLE_AUTO_UPDATE");
});

it("reports linux non-AppImage builds as disabled", () => {
expect(
getAutoUpdateDisabledReason({
isDevelopment: false,
isPackaged: true,
platform: "linux",
appImage: undefined,
disabledByEnv: false,
}),
).toContain("AppImage");
});
});

describe("nextStatusAfterDownloadFailure", () => {
it("returns available when an update version is still known", () => {
expect(
nextStatusAfterDownloadFailure({
...baseState,
status: "downloading",
availableVersion: "1.1.0",
}),
).toBe("available");
});

it("returns error when no update version can be retried", () => {
expect(
nextStatusAfterDownloadFailure({
...baseState,
status: "downloading",
availableVersion: null,
}),
).toBe("error");
});
});

describe("getCanRetryAfterDownloadFailure", () => {
it("returns true when an available version is still present", () => {
expect(
getCanRetryAfterDownloadFailure({
...baseState,
status: "downloading",
availableVersion: "1.1.0",
}),
).toBe(true);
});

it("returns false when no version is available to retry", () => {
expect(
getCanRetryAfterDownloadFailure({
...baseState,
status: "downloading",
availableVersion: null,
}),
).toBe(false);
});
});

================================================
FILE: apps/desktop/src/updateState.ts
================================================
import type { DesktopUpdateState } from "@t3tools/contracts";

export function shouldBroadcastDownloadProgress(
currentState: DesktopUpdateState,
nextPercent: number,
): boolean {
if (currentState.status !== "downloading") {
return true;
}

const currentPercent = currentState.downloadPercent;
if (currentPercent === null) {
return true;
}

const previousStep = Math.floor(currentPercent / 10);
const nextStep = Math.floor(nextPercent / 10);
return nextStep !== previousStep || nextPercent === 100;
}

export function nextStatusAfterDownloadFailure(
currentState: DesktopUpdateState,
): DesktopUpdateState["status"] {
return currentState.availableVersion ? "available" : "error";
}

export function getCanRetryAfterDownloadFailure(currentState: DesktopUpdateState): boolean {
return currentState.availableVersion !== null;
}

export function getAutoUpdateDisabledReason(args: {
isDevelopment: boolean;
isPackaged: boolean;
platform: NodeJS.Platform;
appImage?: string | undefined;
disabledByEnv: boolean;
}): string | null {
if (args.isDevelopment || !args.isPackaged) {
return "Automatic updates are only available in packaged production builds.";
}
if (args.disabledByEnv) {
return "Automatic updates are disabled by the T3CODE_DISABLE_AUTO_UPDATE setting.";
}
if (args.platform === "linux" && !args.appImage) {
return "Automatic updates on Linux require running the AppImage build.";
}
return null;
}

================================================
FILE: apps/marketing/astro.config.mjs
================================================
import { defineConfig } from "astro/config";

export default defineConfig({
server: {
port: Number(process.env.PORT ?? 4173),
},
});

================================================
FILE: apps/marketing/package.json
================================================
{
"name": "@t3tools/marketing",
"version": "0.0.0",
"private": true,
"type": "module",
"scripts": {
"dev": "astro dev",
"build": "astro build",
"preview": "astro preview",
"typecheck": "astro check"
},
"dependencies": {
"astro": "^5.7.13"
},
"devDependencies": {
"@astrojs/check": "^0.9.4",
"typescript": "catalog:"
}
}

================================================
FILE: apps/marketing/tsconfig.json
================================================
{
"extends": "astro/tsconfigs/strict"
}

================================================
FILE: apps/marketing/src/pages/index.astro
================================================

---

---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="T3 Code — The best way to code with AI." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <title>T3 Code</title>
  </head>
  <body>
    <div class="page">
      <nav class="nav">
        <a href="/" class="nav-brand">
          <img src="/icon.png" alt="T3" class="nav-icon" />
        </a>
        <a
          href="https://github.com/pingdotgg/t3code"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-github"
        >
          GitHub
          <span class="nav-github-arrow" aria-hidden="true">&#8599;</span>
        </a>
      </nav>

      <main class="main">
        <h1 class="tagline">T3 Code is the best way to code with AI.</h1>

        <a
          id="download-btn"
          href="https://github.com/pingdotgg/t3code/releases"
          class="hero-button"
        >
          <svg class="hero-button-icon hero-button-icon--apple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" aria-hidden="true"><path fill="currentColor" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
          <svg class="hero-button-icon hero-button-icon--windows" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" aria-hidden="true"><path fill="currentColor" d="m0 12.402 35.687-4.86.016 34.423-35.67.203zm35.67 33.529.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349-.011 41.34-47.318-6.678-.066-34.739z"/></svg>
          <svg class="hero-button-icon hero-button-icon--linux" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 295" aria-hidden="true"><defs><linearGradient id="lt0" x1="48.548%" x2="51.047%" y1="115.276%" y2="41.364%"><stop offset="0%" stop-color="#FFEED7"/><stop offset="100%" stop-color="#BDBFC2"/></linearGradient><linearGradient id="lt6" x1="49.984%" x2="49.984%" y1="89.845%" y2="40.632%"><stop offset="0%" stop-color="#FFEED7"/><stop offset="100%" stop-color="#BDBFC2"/></linearGradient><linearGradient id="lt8" x1="49.841%" x2="50.241%" y1="13.229%" y2="94.673%"><stop offset="0%" stop-color="#FFF" stop-opacity=".8"/><stop offset="100%" stop-color="#FFF" stop-opacity="0"/></linearGradient><linearGradient id="ltc" x1="53.467%" x2="38.949%" y1="48.921%" y2="98.1%"><stop offset="0%" stop-color="#FFA63F"/><stop offset="100%" stop-color="#FF0"/></linearGradient><linearGradient id="lte" x1="30.581%" x2="65.887%" y1="34.024%" y2="89.175%"><stop offset="0%" stop-color="#FFA63F"/><stop offset="100%" stop-color="#FF0"/></linearGradient><linearGradient id="lti" x1="49.733%" x2="50.558%" y1="17.609%" y2="99.385%"><stop offset="0%" stop-color="#FFA63F"/><stop offset="100%" stop-color="#FF0"/></linearGradient></defs><g fill="none"><path fill="#000" d="M63.213 215.474c-11.387-16.346-13.591-69.606 12.947-102.39C89.292 97.383 92.69 86.455 93.7 71.67c.734-16.805-11.846-66.851 35.537-70.616 48.027-3.857 45.364 43.526 45.088 68.596-.183 21.12 15.52 33.15 26.355 49.68 19.927 30.303 18.274 82.461-3.765 110.745-27.916 35.354-51.791 20.018-67.678 21.304-29.752 1.745-30.762 17.54-66.024-35.905"/><path fill="url(#lt6)" d="M81.027 145.684c6.52-14.785 20.386-40.772 20.662-60.883 0-15.978 47.843-19.835 51.7-3.856 3.856 15.978 13.59 39.853 19.834 51.424 6.245 11.478 24.335 48.118 5.051 80.074-17.356 28.284-69.973 50.69-98.073-3.856-9.55-18.917-7.806-42.333.826-62.903"/><path fill="url(#lt8)" d="M166.428 151.285c0 16.162-15.519 37.1-42.15 36.916-27.456.183-39.118-20.754-39.118-36.916 0-16.161 18.182-29.293 40.588-29.293 22.498.092 40.68 13.132 40.68 29.293"/><path fill="#000" stroke="#000" stroke-width=".977" d="M176.805 117.86c13.59 11.02 38.292 49.587 2.204 74.748-11.846 7.806 10.468 32.508 23.049 19.927 43.618-43.894-1.102-94.308-16.53-111.664-13.774-15.151-25.987 3.49-8.723 16.989z"/><path fill="#000" stroke="#000" stroke-width="1.25" d="M79.925 122.727c-8.907 14.509-30.211 48.669-1.652 66.484 38.384 23.6 27.548 47.108-7.53 25.895-49.404-29.568-5.97-89.257 13.774-112.03 22.59-25.529 4.316 4.683-4.592 19.65z"/><path fill="url(#ltc)" stroke="#E68C3F" stroke-width="6.25" d="M51.835 258.542c-20.57-10.928-50.414 2.112-39.578-27.457 2.204-6.704-3.214-16.805.275-23.325 4.133-7.989 13.04-6.244 18.366-11.57 5.234-5.51 8.54-15.06 18.366-13.59 9.734 1.468 16.254 13.406 23.049 28.099 5.05 10.468 22.865 25.253 21.672 37.007-1.47 17.998-21.948 21.396-42.15 10.836z" transform="translate(10)"/><path fill="url(#lte)" stroke="#E68C3F" stroke-width="6.251" d="M194.445 253.49c15.06-18.273 48.578-14.508 25.988-39.577-4.775-5.418-3.306-16.989-9.183-21.947-6.887-6.061-14.509-1.102-21.488-4.224-6.979-3.398-14.325-9.918-22.865-5.327-8.54 4.684-9.459 16.805-10.285 32.783-.735 11.479-11.203 30.671-5.602 41.231 8.081 16.346 29.11 14.142 43.435-2.938z" transform="translate(10)"/><path fill="url(#lti)" stroke="#E68C3F" stroke-width="3.75" d="M97.107 66.344c3.673-3.398 12.58-13.774 29.477-2.939 3.122 2.02 5.693 2.204 11.662 4.775 12.03 4.96 6.336 16.897-6.52 20.937-5.51 1.745-10.468 8.449-20.386 7.806-8.54-.46-10.744-6.06-15.978-9.091-9.275-5.234-10.652-12.305-5.602-16.07 5.051-3.765 6.98-5.143 7.347-5.418z" transform="translate(10)"/><path fill="#000" d="M133.186 57.712c-.092 5.234 2.48 9.458 5.877 9.458 3.306 0 6.153-4.224 6.245-9.366.091-5.234-2.48-9.459-5.878-9.459-3.397 0-6.152 4.225-6.244 9.367m-21.212.092c.459 4.316-1.194 7.989-3.582 8.356-2.387.276-4.683-2.938-5.142-7.254-.46-4.316 1.194-7.99 3.581-8.357 2.388-.275 4.684 2.939 5.143 7.255"/></g></svg>
          <span id="download-label">Download now</span>
        </a>

        <div class="screenshot-wrap">
          <img src="/screenshot.jpeg" alt="T3 Code" class="screenshot" />
        </div>

      </main>

      <footer class="footer">
        <span class="footer-copy">&copy; {new Date().getFullYear()} T3 Tools Inc</span>
        <div class="footer-links">
          <a href="https://github.com/pingdotgg/t3code" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://discord.gg/jn4EGJjrvv" target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </footer>
    </div>

  </body>
</html>

<script>
  const REPO = "pingdotgg/t3code";
  const RELEASES_URL = `https://github.com/${REPO}/releases`;
  const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

  type Platform = { os: "mac" | "win" | "linux"; label: string; arch?: string };

  function detectPlatform(): Platform | null {
    const ua = navigator.userAgent;
    if (/Win/i.test(ua)) return { os: "win", label: "Download for Windows" };
    if (/Mac/i.test(ua)) {
      return {
        os: "mac",
        label: `Download for macOS`,
        arch: "arm64",
      };
    }
    if (/Linux/i.test(ua)) return { os: "linux", label: "Download for Linux" };
    return null;
  }

  function pickAsset(
    assets: Array<{ name: string; browser_download_url: string }>,
    platform: Platform,
  ): string | null {
    if (platform.os === "win") {
      return (
        assets.find((a) => a.name.endsWith("-x64.exe"))
          ?.browser_download_url ?? null
      );
    }
    if (platform.os === "mac") {
      const preferred = assets.find((a) =>
        a.name.endsWith(`-${platform.arch}.dmg`),
      );
      const fallback = assets.find((a) => a.name.endsWith(".dmg"));
      return (preferred ?? fallback)?.browser_download_url ?? null;
    }
    if (platform.os === "linux") {
      return (
        assets.find((a) => a.name.endsWith(".AppImage"))
          ?.browser_download_url ?? null
      );
    }
    return null;
  }

  async function init() {
    const btn = document.getElementById("download-btn") as HTMLAnchorElement | null;
    const label = document.getElementById("download-label");
    if (!btn || !label) return;

    const platform = detectPlatform();
    if (!platform) return;

    document.documentElement.dataset.platform = platform.os;
    label.textContent = platform.label;

    try {
      const cached = sessionStorage.getItem("t3code-latest-release");
      const data = cached
        ? JSON.parse(cached)
        : await fetch(API_URL).then((r) => r.json());

      if (!cached && data?.assets) {
        sessionStorage.setItem("t3code-latest-release", JSON.stringify(data));
      }

      const url = pickAsset(data.assets ?? [], platform);
      if (url) {
        btn.href = url;
        btn.removeAttribute("target");
        btn.removeAttribute("rel");
      }
    } catch {
      btn.href = RELEASES_URL;
    }
  }

  init();
</script>

<style>
  :root {
    --bg: #09090b;
    --fg: #fafafa;
    --fg-muted: #a1a1aa;
    --fg-dim: #71717a;
    --border: rgba(255, 255, 255, 0.08);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    color-scheme: dark;
  }

  body {
    background: var(--bg);
    color: var(--fg);
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    z-index: 9999;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  /* ── Page ── */

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  /* ── Navbar ── */

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2.5rem;
    opacity: 0.5;
    transition: opacity 0.4s ease;
  }

  .nav:hover {
    opacity: 1;
  }

  .nav-brand {
    display: flex;
    align-items: center;
  }

  .nav-icon {
    width: 28px;
    height: 28px;
    border-radius: 6px;
  }

  .nav-github {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--fg-muted);
    font-size: 0.875rem;
    transition: color 0.3s ease;
  }

  .nav-github:hover {
    color: var(--fg);
  }

  .nav-github-arrow {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .nav-github:hover .nav-github-arrow {
    transform: translateX(2px) translateY(-1px);
  }

  /* ── Main content ── */

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
  }

  /* ── Tagline ── */

  .tagline {
    font-weight: 500;
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.035em;
    line-height: 1.15;
    text-align: center;
    margin: 0 0 6vh;
    opacity: 0;
    animation: fade-in 1s ease-out forwards;
  }

  /* ── Hero button ── */

  .hero-button {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    background: #fafafa;
    color: #09090b;
    padding: 0.75rem 2rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 5vh;
    opacity: 0;
    animation: fade-in 1s ease-out 0.15s forwards;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .hero-button:hover {
    transform: scale(1.03);
    box-shadow: 0 0 24px rgba(255, 255, 255, 0.08);
  }

  .hero-button:active {
    transform: scale(0.98);
  }

  .hero-button-icon {
    display: none;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  :global([data-platform="mac"]) .hero-button-icon--apple {
    display: block;
  }

  :global([data-platform="win"]) .hero-button-icon--windows {
    display: block;
  }

  :global([data-platform="linux"]) .hero-button-icon--linux {
    display: block;
  }

  /* ── Screenshot ── */

  .screenshot-wrap {
    margin: 0 auto;
    width: min(95vw, 1400px);
    opacity: 0;
    transform: scale(0.98);
    animation: screenshot-in 1s ease-out 0.15s forwards;
  }

  .screenshot {
    width: 100%;
    display: block;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  }

  .screenshot-wrap::after {
    content: "";
    display: block;
    width: 100%;
    height: 120px;
    background: inherit;
    margin-top: -1px;
    opacity: 0.04;
    transform: scaleY(-1);
    mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
    -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
    pointer-events: none;
  }

  /* ── Footer ── */

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2.5rem;
    font-size: 0.8rem;
    color: var(--fg-dim);
  }

  .footer-links {
    display: flex;
    gap: 1.25rem;
  }

  .footer-links a {
    color: var(--fg-dim);
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: var(--fg);
  }

  /* ── Animations ── */

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes screenshot-in {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* ── Mobile ── */

  @media (max-width: 640px) {
    .nav {
      padding: 1.25rem 1.25rem;
    }

    .main {
      padding-top: 7vh;
    }

    .tagline {
      margin-bottom: 4vh;
    }

    .screenshot-wrap {
      width: 95vw;
    }

    .footer {
      padding: 1.25rem;
    }
  }
</style>

================================================
FILE: apps/server/package.json
================================================
{
"name": "t3",
"version": "0.0.8",
"repository": {
"type": "git",
"url": "https://github.com/pingdotgg/t3code",
"directory": "apps/server"
},
"bin": {
"t3": "./dist/index.mjs"
},
"files": [
"dist"
],
"type": "module",
"scripts": {
"dev": "bun run src/index.ts",
"build": "node scripts/cli.ts build",
"start": "node dist/index.mjs",
"prepare": "effect-language-service patch",
"typecheck": "tsc --noEmit",
"test": "vitest run"
},
"dependencies": {
"@effect/platform-node": "catalog:",
"@effect/sql-sqlite-bun": "catalog:",
"@pierre/diffs": "^1.1.0-beta.16",
"effect": "catalog:",
"node-pty": "^1.1.0",
"open": "^10.1.0",
"ws": "^8.18.0"
},
"devDependencies": {
"@effect/language-service": "catalog:",
"@effect/vitest": "catalog:",
"@t3tools/contracts": "workspace:_",
"@t3tools/shared": "workspace:_",
"@t3tools/web": "workspace:\*",
"@types/bun": "catalog:",
"@types/node": "catalog:",
"@types/ws": "^8.5.13",
"tsdown": "catalog:",
"typescript": "catalog:",
"vitest": "catalog:"
},
"engines": {
"node": "^22.13 || ^23.4 || >=24.10"
}
}

================================================
FILE: apps/server/tsconfig.json
================================================
{
"extends": "../../tsconfig.base.json",
"compilerOptions": {
"composite": true,
"types": ["node", "bun"],
"lib": ["ES2023", "esnext.disposable"],
"noEmit": true,
"allowImportingTsExtensions": true,
"plugins": [
{
"name": "@effect/language-service",
"namespaceImportPackages": ["@effect/platform-node"],
"diagnosticSeverity": {
"importFromBarrel": "error",
"anyUnknownInErrorContext": "warning",
"instanceOfSchema": "warning",
"deterministicKeys": "warning",
"preferSchemaOverJson": "off",
"globalErrorInEffectFailure": "off"
}
}
]
},
"include": ["src", "tsdown.config.ts", "scripts", "integration", "../../scripts/lib"]
}

================================================
FILE: apps/server/tsdown.config.ts
================================================
import { defineConfig } from "tsdown";

export default defineConfig({
entry: ["src/index.ts"],
format: ["esm", "cjs"],
checks: {
legacyCjs: false,
},
outDir: "dist",
sourcemap: true,
clean: true,
noExternal: (id) => id.startsWith("@t3tools/"),
inlineOnly: false,
banner: {
js: "#!/usr/bin/env node\n",
},
});

================================================
FILE: apps/server/turbo.jsonc
================================================
{
"$schema": "https://turbo.build/schema.json",
"extends": ["//"],
"tasks": {
"start": {
"dependsOn": ["build"],
"cache": false,
"persistent": true,
},
},
}

================================================
FILE: apps/server/integration/orchestrationEngine.integration.test.ts
================================================
import fs from "node:fs";
import path from "node:path";

import {
ApprovalRequestId,
CommandId,
DEFAULT_PROVIDER_INTERACTION_MODE,
EventId,
MessageId,
ProjectId,
ThreadId,
} from "@t3tools/contracts";
import { assert, it } from "@effect/vitest";
import { Effect, Option, Schema } from "effect";

import type { TestTurnResponse } from "./TestProviderAdapter.integration.ts";
import {
gitRefExists,
gitShowFileAtRef,
makeOrchestrationIntegrationHarness,
type OrchestrationIntegrationHarness,
} from "./OrchestrationEngineHarness.integration.ts";
import { checkpointRefForThreadTurn } from "../src/checkpointing/Utils.ts";

const asMessageId = (value: string): MessageId => MessageId.makeUnsafe(value);
const asProjectId = (value: string): ProjectId => ProjectId.makeUnsafe(value);
const asEventId = (value: string): EventId => EventId.makeUnsafe(value);
const asApprovalRequestId = (value: string): ApprovalRequestId =>
ApprovalRequestId.makeUnsafe(value);

const PROJECT_ID = asProjectId("project-1");
const THREAD_ID = ThreadId.makeUnsafe("thread-1");
const FIXTURE_TURN_ID = "fixture-turn";
const APPROVAL_REQUEST_ID = asApprovalRequestId("req-approval-1");
type IntegrationProvider = "codex";

function nowIso() {
return new Date().toISOString();
}

class IntegrationWaitTimeoutError extends Schema.TaggedErrorClass<IntegrationWaitTimeoutError>()(
"IntegrationWaitTimeoutError",
{
description: Schema.String,
},
) {}

const sleep = (ms: number) => Effect.sleep(ms);

function waitForSync<A>(
read: () => A,
predicate: (value: A) => boolean,
description: string,
timeoutMs = 3000,
): Effect.Effect<A, never> {
return Effect.gen(function\* () {
const deadline = Date.now() + timeoutMs;

    while (true) {
      const value = read();
      if (predicate(value)) {
        return value;
      }
      if (Date.now() >= deadline) {
        return yield* Effect.die(new IntegrationWaitTimeoutError({ description }));
      }
      yield* sleep(10);
    }

});
}

function runtimeBase(eventId: string, createdAt: string, provider: IntegrationProvider = "codex") {
return {
eventId: asEventId(eventId),
provider,
createdAt,
};
}

function withHarness<A, E>(
use: (harness: OrchestrationIntegrationHarness) => Effect.Effect<A, E>,
provider: IntegrationProvider = "codex",
) {
return Effect.acquireUseRelease(
makeOrchestrationIntegrationHarness({ provider }),
use,
(harness) => harness.dispose,
);
}

function withRealCodexHarness<A, E>(
use: (harness: OrchestrationIntegrationHarness) => Effect.Effect<A, E>,
) {
return Effect.acquireUseRelease(
makeOrchestrationIntegrationHarness({ provider: "codex", realCodex: true }),
use,
(harness) => harness.dispose,
);
}

const seedProjectAndThread = (harness: OrchestrationIntegrationHarness) =>
Effect.gen(function\* () {
const createdAt = nowIso();

    yield* harness.engine.dispatch({
      type: "project.create",
      commandId: CommandId.makeUnsafe("cmd-project-create"),
      projectId: PROJECT_ID,
      title: "Integration Project",
      workspaceRoot: harness.workspaceDir,
      defaultModel: "gpt-5-codex",
      createdAt,
    });

    yield* harness.engine.dispatch({
      type: "thread.create",
      commandId: CommandId.makeUnsafe("cmd-thread-create"),
      threadId: THREAD_ID,
      projectId: PROJECT_ID,
      title: "Integration Thread",
      model: "gpt-5-codex",
      interactionMode: DEFAULT_PROVIDER_INTERACTION_MODE,
      runtimeMode: "approval-required",
      branch: null,
      worktreePath: harness.workspaceDir,
      createdAt,
    });

});

const startTurn = (input: {
readonly harness: OrchestrationIntegrationHarness;
readonly commandId: string;
readonly messageId: string;
readonly text: string;
readonly provider?: IntegrationProvider;
}) =>
input.harness.engine.dispatch({
type: "thread.turn.start",
commandId: CommandId.makeUnsafe(input.commandId),
threadId: THREAD_ID,
message: {
messageId: asMessageId(input.messageId),
role: "user",
text: input.text,
attachments: [],
},
...(input.provider !== undefined ? { provider: input.provider } : {}),
interactionMode: DEFAULT_PROVIDER_INTERACTION_MODE,
runtimeMode: "approval-required",
createdAt: nowIso(),
});

it.live("runs a single turn end-to-end and persists checkpoint state in sqlite + git", () =>
withHarness((harness) =>
Effect.gen(function* () {
yield* seedProjectAndThread(harness);

      const turnResponse: TestTurnResponse = {
        events: [
          {
            type: "turn.started",
            ...runtimeBase("evt-single-1", "2026-02-24T10:00:00.000Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
          },
          {
            type: "message.delta",
            ...runtimeBase("evt-single-2", "2026-02-24T10:00:00.100Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            delta: "Single turn response.\n",
          },
          {
            type: "turn.completed",
            ...runtimeBase("evt-single-3", "2026-02-24T10:00:00.200Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            status: "completed",
          },
        ],
      };

      yield* harness.adapterHarness!.queueTurnResponseForNextSession(turnResponse);
      yield* startTurn({
        harness,
        commandId: "cmd-turn-start-single",
        messageId: "msg-user-single",
        text: "Say hello",
      });

      const thread = yield* harness.waitForThread(
        THREAD_ID,
        (entry) =>
          entry.session?.status === "ready" &&
          entry.messages.some(
            (message) => message.role === "assistant" && message.streaming === false,
          ) &&
          entry.checkpoints.length === 1,
      );
      assert.equal(thread.checkpoints[0]?.status, "ready");
      assert.equal(thread.checkpoints[0]?.checkpointTurnCount, 1);

      const checkpointRows = yield* harness.checkpointRepository.listByThreadId({
        threadId: THREAD_ID,
      });
      assert.equal(checkpointRows.length, 1);
      assert.equal(checkpointRows[0]?.checkpointTurnCount, 1);
      assert.equal(checkpointRows[0]?.status, "ready");
      assert.deepEqual(checkpointRows[0]?.files, []);

      yield* harness.waitForDomainEvent((event) => event.type === "thread.turn-diff-completed");

      const ref0 = checkpointRefForThreadTurn(THREAD_ID, 0);
      const ref1 = checkpointRefForThreadTurn(THREAD_ID, 1);
      assert.equal(gitRefExists(harness.workspaceDir, ref0), true);
      assert.equal(gitRefExists(harness.workspaceDir, ref1), true);
      assert.equal(gitShowFileAtRef(harness.workspaceDir, ref0, "README.md"), "v1\n");
      assert.equal(gitShowFileAtRef(harness.workspaceDir, ref1, "README.md"), "v1\n");
    }),

),
);

it.live.skipIf(!process.env.CODEX_BINARY_PATH)(
"keeps the same Codex provider thread across runtime mode switches",
() =>
withRealCodexHarness((harness) =>
Effect.gen(function\* () {
const createdAt = nowIso();

        yield* harness.engine.dispatch({
          type: "project.create",
          commandId: CommandId.makeUnsafe("cmd-project-create-real-codex"),
          projectId: PROJECT_ID,
          title: "Integration Project",
          workspaceRoot: harness.workspaceDir,
          defaultModel: "gpt-5.3-codex",
          createdAt,
        });

        yield* harness.engine.dispatch({
          type: "thread.create",
          commandId: CommandId.makeUnsafe("cmd-thread-create-real-codex"),
          threadId: THREAD_ID,
          projectId: PROJECT_ID,
          title: "Integration Thread",
          model: "gpt-5.3-codex",
          interactionMode: DEFAULT_PROVIDER_INTERACTION_MODE,
          runtimeMode: "full-access",
          branch: null,
          worktreePath: harness.workspaceDir,
          createdAt,
        });

        yield* harness.engine.dispatch({
          type: "thread.turn.start",
          commandId: CommandId.makeUnsafe("cmd-turn-start-real-codex-1"),
          threadId: THREAD_ID,
          message: {
            messageId: asMessageId("msg-real-codex-1"),
            role: "user",
            text: "Reply with exactly ALPHA.",
            attachments: [],
          },
          interactionMode: DEFAULT_PROVIDER_INTERACTION_MODE,
          runtimeMode: "full-access",
          createdAt: nowIso(),
        });

        const firstThread = yield* harness.waitForThread(
          THREAD_ID,
          (entry) =>
            entry.session?.status === "ready" &&
            entry.session.providerName === "codex" &&
            entry.messages.some(
              (message) => message.role === "assistant" && message.streaming === false,
            ),
          180_000,
        );
        assert.equal(firstThread.session?.threadId, "thread-1");

        yield* harness.engine.dispatch({
          type: "thread.turn.start",
          commandId: CommandId.makeUnsafe("cmd-turn-start-real-codex-2"),
          threadId: THREAD_ID,
          message: {
            messageId: asMessageId("msg-real-codex-2"),
            role: "user",
            text: "Reply with exactly BETA.",
            attachments: [],
          },
          interactionMode: DEFAULT_PROVIDER_INTERACTION_MODE,
          runtimeMode: "approval-required",
          createdAt: nowIso(),
        });

        const secondThread = yield* harness.waitForThread(
          THREAD_ID,
          (entry) =>
            entry.session?.status === "ready" &&
            entry.session.providerName === "codex" &&
            entry.session.runtimeMode === "approval-required" &&
            entry.messages.some(
              (message) => message.role === "assistant" && message.text.includes("BETA"),
            ),
          180_000,
        );
        assert.equal(secondThread.session?.threadId, "thread-1");
      }),
    ),

);

it.live("runs multi-turn file edits and persists checkpoint diffs", () =>
withHarness((harness) =>
Effect.gen(function* () {
yield* seedProjectAndThread(harness);

      yield* harness.adapterHarness!.queueTurnResponseForNextSession({
        events: [
          {
            type: "turn.started",
            ...runtimeBase("evt-multi-1", "2026-02-24T10:01:00.000Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
          },
          {
            type: "tool.started",
            ...runtimeBase("evt-multi-2", "2026-02-24T10:01:00.100Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            toolKind: "command",
            title: "Edit file",
            detail: "README.md",
          },
          {
            type: "tool.completed",
            ...runtimeBase("evt-multi-3", "2026-02-24T10:01:00.200Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            toolKind: "command",
            title: "Edit file",
            detail: "README.md",
          },
          {
            type: "message.delta",
            ...runtimeBase("evt-multi-4", "2026-02-24T10:01:00.300Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            delta: "Updated README to v2.\n",
          },
          {
            type: "turn.completed",
            ...runtimeBase("evt-multi-5", "2026-02-24T10:01:00.400Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            status: "completed",
          },
        ],
        mutateWorkspace: ({ cwd }) =>
          Effect.sync(() => {
            fs.writeFileSync(path.join(cwd, "README.md"), "v2\n", "utf8");
          }),
      });

      yield* startTurn({
        harness,
        commandId: "cmd-turn-start-multi-1",
        messageId: "msg-user-multi-1",
        text: "Make first edit",
      });

      yield* harness.waitForThread(
        THREAD_ID,
        (entry) => entry.checkpoints.length === 1 && entry.session?.threadId === "thread-1",
      );

      yield* harness.adapterHarness!.queueTurnResponse(THREAD_ID, {
        events: [
          {
            type: "turn.started",
            ...runtimeBase("evt-multi-6", "2026-02-24T10:02:00.000Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
          },
          {
            type: "message.delta",
            ...runtimeBase("evt-multi-7", "2026-02-24T10:02:00.100Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            delta: "Updated README to v3.\n",
          },
          {
            type: "turn.completed",
            ...runtimeBase("evt-multi-8", "2026-02-24T10:02:00.200Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            status: "completed",
          },
        ],
        mutateWorkspace: ({ cwd }) =>
          Effect.sync(() => {
            fs.writeFileSync(path.join(cwd, "README.md"), "v3\n", "utf8");
          }),
      });

      yield* startTurn({
        harness,
        commandId: "cmd-turn-start-multi-2",
        messageId: "msg-user-multi-2",
        text: "Make second edit",
      });

      const secondTurnThread = yield* harness.waitForThread(
        THREAD_ID,
        (entry) =>
          entry.latestTurn?.turnId === "turn-2" &&
          entry.checkpoints.length === 2 &&
          entry.checkpoints.some((checkpoint) => checkpoint.checkpointTurnCount === 2),
      );
      const secondCheckpoint = secondTurnThread.checkpoints.find(
        (checkpoint) => checkpoint.checkpointTurnCount === 2,
      );
      assert.equal(
        secondCheckpoint?.files.some((file) => file.path === "README.md"),
        true,
      );

      const checkpointRows = yield* harness.checkpointRepository.listByThreadId({
        threadId: THREAD_ID,
      });
      assert.deepEqual(
        checkpointRows.map((row) => row.checkpointTurnCount),
        [1, 2],
      );

      const incrementalDiff = yield* harness.checkpointStore.diffCheckpoints({
        cwd: harness.workspaceDir,
        fromCheckpointRef: checkpointRefForThreadTurn(THREAD_ID, 1),
        toCheckpointRef: checkpointRefForThreadTurn(THREAD_ID, 2),
        fallbackFromToHead: false,
      });
      assert.equal(incrementalDiff.includes("README.md"), true);

      const fullDiff = yield* harness.checkpointStore.diffCheckpoints({
        cwd: harness.workspaceDir,
        fromCheckpointRef: checkpointRefForThreadTurn(THREAD_ID, 0),
        toCheckpointRef: checkpointRefForThreadTurn(THREAD_ID, 2),
        fallbackFromToHead: false,
      });
      assert.equal(fullDiff.includes("README.md"), true);

      assert.equal(
        gitShowFileAtRef(
          harness.workspaceDir,
          checkpointRefForThreadTurn(THREAD_ID, 1),
          "README.md",
        ),
        "v2\n",
      );
      assert.equal(
        gitShowFileAtRef(
          harness.workspaceDir,
          checkpointRefForThreadTurn(THREAD_ID, 2),
          "README.md",
        ),
        "v3\n",
      );
    }),

),
);

it.live("tracks approval requests and resolves pending approvals on user response", () =>
withHarness((harness) =>
Effect.gen(function* () {
yield* seedProjectAndThread(harness);

      yield* harness.adapterHarness!.queueTurnResponseForNextSession({
        events: [
          {
            type: "turn.started",
            ...runtimeBase("evt-approval-1", "2026-02-24T10:03:00.000Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
          },
          {
            type: "approval.requested",
            ...runtimeBase("evt-approval-2", "2026-02-24T10:03:00.100Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            requestId: APPROVAL_REQUEST_ID,
            requestKind: "command",
            detail: "Approve command execution",
          },
          {
            type: "turn.completed",
            ...runtimeBase("evt-approval-3", "2026-02-24T10:03:00.200Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            status: "completed",
          },
        ],
      });

      yield* startTurn({
        harness,
        commandId: "cmd-turn-start-approval",
        messageId: "msg-user-approval",
        text: "Run command needing approval",
      });

      const thread = yield* harness.waitForThread(THREAD_ID, (entry) =>
        entry.activities.some((activity) => activity.kind === "approval.requested"),
      );
      assert.equal(
        thread.activities.some((activity) => activity.kind === "approval.requested"),
        true,
      );

      const pendingRow = yield* harness.waitForPendingApproval(
        "req-approval-1",
        (row) => row.status === "pending" && row.decision === null,
      );
      assert.equal(pendingRow.status, "pending");

      yield* harness.engine.dispatch({
        type: "thread.approval.respond",
        commandId: CommandId.makeUnsafe("cmd-approval-respond"),
        threadId: THREAD_ID,
        requestId: APPROVAL_REQUEST_ID,
        decision: "accept",
        createdAt: nowIso(),
      });

      const resolvedRow = yield* harness.waitForPendingApproval(
        "req-approval-1",
        (row) => row.status === "resolved" && row.decision === "accept",
      );
      assert.equal(resolvedRow.status, "resolved");
      assert.equal(resolvedRow.decision, "accept");

      const approvalResponses = yield* waitForSync(
        () => harness.adapterHarness!.getApprovalResponses(THREAD_ID),
        (responses) => responses.length === 1,
        "provider approval response",
      );
      assert.equal(approvalResponses.length, 1);
      assert.equal(approvalResponses[0]?.requestId, "req-approval-1");
      assert.equal(approvalResponses[0]?.decision, "accept");
    }),

),
);

it.live("records failed turn runtime state and checkpoint status as error", () =>
withHarness((harness) =>
Effect.gen(function* () {
yield* seedProjectAndThread(harness);

      yield* harness.adapterHarness!.queueTurnResponseForNextSession({
        events: [
          {
            type: "turn.started",
            ...runtimeBase("evt-failure-1", "2026-02-24T10:04:00.000Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
          },
          {
            type: "content.delta",
            ...runtimeBase("evt-failure-2", "2026-02-24T10:04:00.100Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            payload: {
              streamKind: "assistant_text",
              delta: "Partial output before failure.\n",
            },
          },
          {
            type: "runtime.error",
            ...runtimeBase("evt-failure-3", "2026-02-24T10:04:00.200Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            payload: {
              message: "Sandbox command failed.",
            },
          },
          {
            type: "turn.completed",
            ...runtimeBase("evt-failure-4", "2026-02-24T10:04:00.300Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            payload: {
              state: "failed",
              errorMessage: "Sandbox command failed.",
            },
          },
        ],
      });

      yield* startTurn({
        harness,
        commandId: "cmd-turn-start-failure",
        messageId: "msg-user-failure",
        text: "Run risky command",
      });

      const thread = yield* harness.waitForThread(
        THREAD_ID,
        (entry) =>
          entry.session?.status === "error" &&
          entry.session?.lastError === "Sandbox command failed." &&
          entry.activities.some((activity) => activity.kind === "runtime.error") &&
          entry.checkpoints.length === 1,
      );
      assert.equal(thread.session?.status, "error");
      assert.equal(thread.checkpoints[0]?.status, "error");

      const checkpointRow = yield* harness.checkpointRepository.getByThreadAndTurnCount({
        threadId: THREAD_ID,
        checkpointTurnCount: 1,
      });
      assert.equal(Option.isSome(checkpointRow), true);
      if (Option.isSome(checkpointRow)) {
        assert.equal(checkpointRow.value.status, "error");
      }
      assert.equal(
        gitRefExists(harness.workspaceDir, checkpointRefForThreadTurn(THREAD_ID, 1)),
        true,
      );
    }),

),
);

it.live("reverts to an earlier checkpoint and trims checkpoint projections + git refs", () =>
withHarness((harness) =>
Effect.gen(function* () {
yield* seedProjectAndThread(harness);

      yield* harness.adapterHarness!.queueTurnResponseForNextSession({
        events: [
          {
            type: "turn.started",
            ...runtimeBase("evt-revert-1", "2026-02-24T10:05:00.000Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
          },
          {
            type: "tool.started",
            ...runtimeBase("evt-revert-1-tool-started", "2026-02-24T10:05:00.025Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            toolKind: "command",
            title: "Edit file",
            detail: "README.md",
          },
          {
            type: "tool.completed",
            ...runtimeBase("evt-revert-1-tool-completed", "2026-02-24T10:05:00.035Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            toolKind: "command",
            title: "Edit file",
            detail: "README.md",
          },
          {
            type: "message.delta",
            ...runtimeBase("evt-revert-1a", "2026-02-24T10:05:00.050Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            delta: "Updated README to v2.\n",
          },
          {
            type: "turn.completed",
            ...runtimeBase("evt-revert-2", "2026-02-24T10:05:00.100Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            status: "completed",
          },
        ],
        mutateWorkspace: ({ cwd }) =>
          Effect.sync(() => {
            fs.writeFileSync(path.join(cwd, "README.md"), "v2\n", "utf8");
          }),
      });
      yield* startTurn({
        harness,
        commandId: "cmd-turn-start-revert-1",
        messageId: "msg-user-revert-1",
        text: "First edit",
      });

      yield* harness.waitForThread(
        THREAD_ID,
        (entry) => entry.session?.threadId === "thread-1" && entry.checkpoints.length === 1,
      );

      yield* harness.adapterHarness!.queueTurnResponse(THREAD_ID, {
        events: [
          {
            type: "turn.started",
            ...runtimeBase("evt-revert-3", "2026-02-24T10:05:01.000Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
          },
          {
            type: "tool.started",
            ...runtimeBase("evt-revert-3-tool-started", "2026-02-24T10:05:01.025Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            toolKind: "command",
            title: "Edit file",
            detail: "README.md",
          },
          {
            type: "tool.completed",
            ...runtimeBase("evt-revert-3-tool-completed", "2026-02-24T10:05:01.035Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            toolKind: "command",
            title: "Edit file",
            detail: "README.md",
          },
          {
            type: "message.delta",
            ...runtimeBase("evt-revert-3a", "2026-02-24T10:05:01.050Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            delta: "Updated README to v3.\n",
          },
          {
            type: "turn.completed",
            ...runtimeBase("evt-revert-4", "2026-02-24T10:05:01.100Z"),
            threadId: THREAD_ID,
            turnId: FIXTURE_TURN_ID,
            status: "completed",
          },
        ],
        mutateWorkspace: ({ cwd }) =>
          Effect.sync(() => {
            fs.writeFileSync(path.join(cwd, "README.md"), "v3\n", "utf8");
          }),
      });
      yield* startTurn({
        harness,
        commandId: "cmd-turn-start-revert-2",
        messageId: "msg-user-revert-2",
        text: "Second edit",
      });

      yield* harness.waitForThread(
        THREAD_ID,
        (entry) =>
          entry.latestTurn?.turnId === "turn-2" &&
          entry.checkpoints.length === 2 &&
          entry.activities.some((activity) => activity.turnId === "turn-2"),
        8000,
      );

      yield* harness.engine.dispatch({
        type: "thread.checkpoint.revert",
        commandId: CommandId.makeUnsafe("cmd-checkpoint-revert"),
        threadId: THREAD_ID,
        turnCount: 1,
        createdAt: nowIso(),
      });

      yield* harness.waitForDomainEvent((event) => event.type === "thread.reverted");
      const revertedThread = yield* harness.waitForThread(
        THREAD_ID,
        (entry) =>
          entry.checkpoints.length === 1 && entry.checkpoints[0]?.checkpointTurnCount === 1,
      );
      assert.equal(revertedThread.checkpoints[0]?.checkpointTurnCount, 1);
      assert.deepEqual(
        revertedThread.messages.map((message) => ({ role: message.role, text: message.text })),
        [
          { role: "user", text: "First edit" },
          { role: "assistant", text: "Updated README to v2.\n" },
        ],
      );
      assert.equal(
        revertedThread.activities.some((activity) => activity.turnId === "turn-2"),
        false,
      );
      assert.equal(
        revertedThread.activities.some(
          (activity) => activity.turnId === "turn-1" && activity.kind === "tool.started",
        ),
        true,
      );
      assert.equal(
        revertedThread.activities.some(
          (activity) => activity.turnId === "turn-1" && activity.kind === "tool.completed",
        ),
        true,
      );
      assert.equal(fs.readFileSync(path.join(harness.workspaceDir, "README.md"), "utf8"), "v2\n");
      assert.equal(
        gitRefExists(harness.workspaceDir, checkpointRefForThreadTurn(THREAD_ID, 2)),
        false,
      );
      assert.deepEqual(harness.adapterHarness!.getRollbackCalls(THREAD_ID), [1]);

      const checkpointRows = yield* harness.checkpointRepository.listByThreadId({
        threadId: THREAD_ID,
      });
      assert.equal(checkpointRows.length, 1);
    }),

),
);

it.live(
"appends checkpoint.revert.failed activity when revert is requested without an active session",
() =>
withHarness((harness) =>
Effect.gen(function* () {
yield* seedProjectAndThread(harness);

        yield* harness.engine.dispatch({
          type: "thread.checkpoint.revert",
          commandId: CommandId.makeUnsafe("cmd-checkpoint-revert-no-session"),
          threadId: THREAD_ID,
          turnCount: 0,
          createdAt: nowIso(),
        });

        const thread = yield* harness.waitForThread(THREAD_ID, (entry) =>
          entry.activities.some(
            (activity) =>
              activity.kind === "checkpoint.revert.failed" &&
              typeof activity.payload === "object" &&
              activity.payload !== null,
          ),
        );
        const failureActivity = thread.activities.find(
          (activity) => activity.kind === "checkpoint.revert.failed",
        );
        assert.equal(failureActivity !== undefined, true);
        assert.equal(
          String(
            (failureActivity?.payload as { readonly detail?: string } | undefined)?.detail,
          ).includes("No active provider session"),
          true,
        );
      }),
    ),

);

================================================
FILE: apps/server/integration/OrchestrationEngineHarness.integration.ts
================================================
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

import \* as NodeServices from "@effect/platform-node/NodeServices";
import {
ApprovalRequestId,
type OrchestrationEvent,
type OrchestrationThread,
} from "@t3tools/contracts";
import {
Effect,
Exit,
Layer,
ManagedRuntime,
Option,
Schedule,
Schema,
Scope,
Stream,
} from "effect";

import { CheckpointStoreLive } from "../src/checkpointing/Layers/CheckpointStore.ts";
import { CheckpointStore } from "../src/checkpointing/Services/CheckpointStore.ts";
import { GitCore, type GitCoreShape } from "../src/git/Services/GitCore.ts";
import { TextGeneration, type TextGenerationShape } from "../src/git/Services/TextGeneration.ts";
import { OrchestrationCommandReceiptRepositoryLive } from "../src/persistence/Layers/OrchestrationCommandReceipts.ts";
import { OrchestrationEventStoreLive } from "../src/persistence/Layers/OrchestrationEventStore.ts";
import { ProjectionCheckpointRepositoryLive } from "../src/persistence/Layers/ProjectionCheckpoints.ts";
import { ProjectionPendingApprovalRepositoryLive } from "../src/persistence/Layers/ProjectionPendingApprovals.ts";
import { ProviderSessionRuntimeRepositoryLive } from "../src/persistence/Layers/ProviderSessionRuntime.ts";
import { makeSqlitePersistenceLive } from "../src/persistence/Layers/Sqlite.ts";
import { ProjectionCheckpointRepository } from "../src/persistence/Services/ProjectionCheckpoints.ts";
import { ProjectionPendingApprovalRepository } from "../src/persistence/Services/ProjectionPendingApprovals.ts";
import { ProviderUnsupportedError } from "../src/provider/Errors.ts";
import { ProviderAdapterRegistry } from "../src/provider/Services/ProviderAdapterRegistry.ts";
import { ProviderSessionDirectoryLive } from "../src/provider/Layers/ProviderSessionDirectory.ts";
import { makeProviderServiceLive } from "../src/provider/Layers/ProviderService.ts";
import { makeCodexAdapterLive } from "../src/provider/Layers/CodexAdapter.ts";
import { CodexAdapter } from "../src/provider/Services/CodexAdapter.ts";
import { ProviderService } from "../src/provider/Services/ProviderService.ts";
import { AnalyticsService } from "../src/telemetry/Services/AnalyticsService.ts";
import { CheckpointReactorLive } from "../src/orchestration/Layers/CheckpointReactor.ts";
import { OrchestrationEngineLive } from "../src/orchestration/Layers/OrchestrationEngine.ts";
import { OrchestrationProjectionPipelineLive } from "../src/orchestration/Layers/ProjectionPipeline.ts";
import { OrchestrationProjectionSnapshotQueryLive } from "../src/orchestration/Layers/ProjectionSnapshotQuery.ts";
import { OrchestrationReactorLive } from "../src/orchestration/Layers/OrchestrationReactor.ts";
import { ProviderCommandReactorLive } from "../src/orchestration/Layers/ProviderCommandReactor.ts";
import { ProviderRuntimeIngestionLive } from "../src/orchestration/Layers/ProviderRuntimeIngestion.ts";
import {
OrchestrationEngineService,
type OrchestrationEngineShape,
} from "../src/orchestration/Services/OrchestrationEngine.ts";
import { OrchestrationReactor } from "../src/orchestration/Services/OrchestrationReactor.ts";
import { ProjectionSnapshotQuery } from "../src/orchestration/Services/ProjectionSnapshotQuery.ts";

import {
makeTestProviderAdapterHarness,
type TestProviderAdapterHarness,
} from "./TestProviderAdapter.integration.ts";
import { ServerConfig } from "../src/config.ts";

function runGit(cwd: string, args: ReadonlyArray<string>) {
return execFileSync("git", args, {
cwd,
stdio: ["ignore", "pipe", "pipe"],
encoding: "utf8",
});
}

function initializeGitWorkspace(cwd: string) {
runGit(cwd, ["init", "--initial-branch=main"]);
runGit(cwd, ["config", "user.email", "test@example.com"]);
runGit(cwd, ["config", "user.name", "Test User"]);
fs.writeFileSync(path.join(cwd, "README.md"), "v1\n", "utf8");
runGit(cwd, ["add", "."]);
runGit(cwd, ["commit", "-m", "Initial"]);
}

export function gitRefExists(cwd: string, ref: string): boolean {
try {
runGit(cwd, ["show-ref", "--verify", "--quiet", ref]);
return true;
} catch {
return false;
}
}

export function gitShowFileAtRef(cwd: string, ref: string, filePath: string): string {
return runGit(cwd, ["show", `${ref}:${filePath}`]);
}

class WaitForTimeoutError extends Schema.TaggedErrorClass<WaitForTimeoutError>()(
"WaitForTimeoutError",
{
description: Schema.String,
},
) {}

function waitFor<A, E>(
read: Effect.Effect<A, E>,
predicate: (value: A) => boolean,
description: string,
timeoutMs?: number,
): Effect.Effect<A, never>;
function waitFor<A, B extends A, E>(
read: Effect.Effect<A, E>,
predicate: (value: A) => value is B,
description: string,
timeoutMs?: number,
): Effect.Effect<B, never>;
function waitFor<A, E>(
read: Effect.Effect<A, E>,
predicate: (value: A) => boolean,
description: string,
timeoutMs = 3000,
): Effect.Effect<A, never> {
const RETRY_SIGNAL = "wait_for_retry";
const retryIntervalMs = 10;
const maxRetries = Math.max(0, Math.floor(timeoutMs / retryIntervalMs));
const retrySchedule = Schedule.spaced(`${retryIntervalMs} millis`);

return read.pipe(
Effect.filterOrFail(predicate, () => RETRY_SIGNAL),
Effect.retry({
schedule: retrySchedule,
times: maxRetries,
while: (error) => error === RETRY_SIGNAL,
}),
Effect.mapError((error) =>
error === RETRY_SIGNAL ? new WaitForTimeoutError({ description }) : error,
),
Effect.orDie,
);
}

class OrchestrationHarnessRuntimeError extends Schema.TaggedErrorClass<OrchestrationHarnessRuntimeError>()(
"OrchestrationHarnessRuntimeError",
{
operation: Schema.String,
cause: Schema.optional(Schema.Defect),
},
) {}

const tryRuntimePromise = <A>(operation: string, run: () => Promise<A>) =>
Effect.tryPromise({
try: run,
catch: (cause) => new OrchestrationHarnessRuntimeError({ operation, cause }),
});

export interface OrchestrationIntegrationHarness {
readonly rootDir: string;
readonly workspaceDir: string;
readonly dbPath: string;
readonly adapterHarness: TestProviderAdapterHarness | null;
readonly engine: OrchestrationEngineShape;
readonly snapshotQuery: ProjectionSnapshotQuery["Service"];
readonly providerService: ProviderService["Service"];
readonly checkpointStore: CheckpointStore["Service"];
readonly checkpointRepository: ProjectionCheckpointRepository["Service"];
readonly pendingApprovalRepository: ProjectionPendingApprovalRepository["Service"];
readonly waitForThread: (
threadId: string,
predicate: (thread: OrchestrationThread) => boolean,
timeoutMs?: number,
) => Effect.Effect<OrchestrationThread, never>;
readonly waitForDomainEvent: (
predicate: (event: OrchestrationEvent) => boolean,
timeoutMs?: number,
) => Effect.Effect<ReadonlyArray<OrchestrationEvent>, never>;
readonly waitForPendingApproval: (
requestId: string,
predicate: (row: {
readonly status: "pending" | "resolved";
readonly decision: "accept" | "acceptForSession" | "decline" | "cancel" | null;
readonly resolvedAt: string | null;
}) => boolean,
timeoutMs?: number,
) => Effect.Effect<
{
readonly status: "pending" | "resolved";
readonly decision: "accept" | "acceptForSession" | "decline" | "cancel" | null;
readonly resolvedAt: string | null;
},
never

> ;
> readonly dispose: Effect.Effect<void, never>;
> }

interface MakeOrchestrationIntegrationHarnessOptions {
readonly provider?: "codex";
readonly realCodex?: boolean;
}

export const makeOrchestrationIntegrationHarness = (
options?: MakeOrchestrationIntegrationHarnessOptions,
) =>
Effect.gen(function* () {
const sleep = (ms: number) => Effect.sleep(ms);
const provider = options?.provider ?? "codex";
const useRealCodex = options?.realCodex === true;
const adapterHarness = useRealCodex
? null
: yield* makeTestProviderAdapterHarness({
provider,
});
const fakeRegistry = adapterHarness
? Layer.succeed(ProviderAdapterRegistry, {
getByProvider: (resolvedProvider) =>
resolvedProvider === adapterHarness.provider
? Effect.succeed(adapterHarness.adapter)
: Effect.fail(new ProviderUnsupportedError({ provider: resolvedProvider })),
listProviders: () => Effect.succeed([adapterHarness.provider]),
} as typeof ProviderAdapterRegistry.Service)
: null;
const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "t3-orchestration-integration-"));
const workspaceDir = path.join(rootDir, "workspace");
const stateDir = path.join(rootDir, "state");
const dbPath = path.join(stateDir, "state.sqlite");
fs.mkdirSync(workspaceDir, { recursive: true });
fs.mkdirSync(stateDir, { recursive: true });
initializeGitWorkspace(workspaceDir);

    const persistenceLayer = makeSqlitePersistenceLive(dbPath);
    const orchestrationLayer = OrchestrationEngineLive.pipe(
      Layer.provide(OrchestrationProjectionPipelineLive),
      Layer.provide(OrchestrationEventStoreLive),
      Layer.provide(OrchestrationCommandReceiptRepositoryLive),
    );
    const providerSessionDirectoryLayer = ProviderSessionDirectoryLive.pipe(
      Layer.provide(ProviderSessionRuntimeRepositoryLive),
    );
    const realCodexRegistry = Layer.effect(
      ProviderAdapterRegistry,
      Effect.gen(function* () {
        const codexAdapter = yield* CodexAdapter;
        return {
          getByProvider: (resolvedProvider) =>
            resolvedProvider === "codex"
              ? Effect.succeed(codexAdapter)
              : Effect.fail(new ProviderUnsupportedError({ provider: resolvedProvider })),
          listProviders: () => Effect.succeed(["codex"] as const),
        } as typeof ProviderAdapterRegistry.Service;
      }),
    ).pipe(
      Layer.provide(makeCodexAdapterLive()),
      Layer.provideMerge(ServerConfig.layerTest(workspaceDir, stateDir)),
      Layer.provideMerge(NodeServices.layer),
      Layer.provideMerge(providerSessionDirectoryLayer),
    );
    const providerLayer = useRealCodex
      ? makeProviderServiceLive().pipe(
          Layer.provide(providerSessionDirectoryLayer),
          Layer.provide(realCodexRegistry),
          Layer.provide(AnalyticsService.layerTest),
        )
      : makeProviderServiceLive().pipe(
          Layer.provide(providerSessionDirectoryLayer),
          Layer.provide(fakeRegistry!),
          Layer.provide(AnalyticsService.layerTest),
        );

    const runtimeServicesLayer = Layer.mergeAll(
      orchestrationLayer,
      OrchestrationProjectionSnapshotQueryLive,
      ProjectionCheckpointRepositoryLive,
      ProjectionPendingApprovalRepositoryLive,
      CheckpointStoreLive,
      providerLayer,
    );
    const runtimeIngestionLayer = ProviderRuntimeIngestionLive.pipe(
      Layer.provideMerge(runtimeServicesLayer),
    );
    const gitCoreLayer = Layer.succeed(GitCore, {
      renameBranch: (input: Parameters<GitCoreShape["renameBranch"]>[0]) =>
        Effect.succeed({ branch: input.newBranch }),
    } as unknown as GitCoreShape);
    const textGenerationLayer = Layer.succeed(TextGeneration, {
      generateBranchName: () => Effect.succeed({ branch: null }),
    } as unknown as TextGenerationShape);
    const providerCommandReactorLayer = ProviderCommandReactorLive.pipe(
      Layer.provideMerge(runtimeServicesLayer),
      Layer.provideMerge(gitCoreLayer),
      Layer.provideMerge(textGenerationLayer),
    );
    const checkpointReactorLayer = CheckpointReactorLive.pipe(
      Layer.provideMerge(runtimeServicesLayer),
    );
    const orchestrationReactorLayer = OrchestrationReactorLive.pipe(
      Layer.provideMerge(runtimeIngestionLayer),
      Layer.provideMerge(providerCommandReactorLayer),
      Layer.provideMerge(checkpointReactorLayer),
    );
    const layer = orchestrationReactorLayer.pipe(
      Layer.provide(persistenceLayer),
      Layer.provideMerge(ServerConfig.layerTest(workspaceDir, stateDir)),
      Layer.provideMerge(NodeServices.layer),
    );

    const runtime = ManagedRuntime.make(layer);
    const engine = yield* tryRuntimePromise("load OrchestrationEngine service", () =>
      runtime.runPromise(Effect.service(OrchestrationEngineService)),
    ).pipe(Effect.orDie);
    const reactor = yield* tryRuntimePromise("load OrchestrationReactor service", () =>
      runtime.runPromise(Effect.service(OrchestrationReactor)),
    ).pipe(Effect.orDie);
    const snapshotQuery = yield* tryRuntimePromise("load ProjectionSnapshotQuery service", () =>
      runtime.runPromise(Effect.service(ProjectionSnapshotQuery)),
    ).pipe(Effect.orDie);
    const providerService = yield* tryRuntimePromise("load ProviderService service", () =>
      runtime.runPromise(Effect.service(ProviderService)),
    ).pipe(Effect.orDie);
    const checkpointStore = yield* tryRuntimePromise("load CheckpointStore service", () =>
      runtime.runPromise(Effect.service(CheckpointStore)),
    ).pipe(Effect.orDie);
    const checkpointRepository = yield* tryRuntimePromise(
      "load ProjectionCheckpointRepository service",
      () => runtime.runPromise(Effect.service(ProjectionCheckpointRepository)),
    ).pipe(Effect.orDie);
    const pendingApprovalRepository = yield* tryRuntimePromise(
      "load ProjectionPendingApprovalRepository service",
      () => runtime.runPromise(Effect.service(ProjectionPendingApprovalRepository)),
    ).pipe(Effect.orDie);

    const scope = yield* Scope.make("sequential");
    yield* tryRuntimePromise("start OrchestrationReactor", () =>
      runtime.runPromise(reactor.start.pipe(Scope.provide(scope))),
    ).pipe(Effect.orDie);
    yield* sleep(10);

    const waitForThread: OrchestrationIntegrationHarness["waitForThread"] = (
      threadId,
      predicate,
      timeoutMs,
    ) =>
      waitFor(
        snapshotQuery
          .getSnapshot()
          .pipe(
            Effect.map(
              (snapshot) => snapshot.threads.find((thread) => thread.id === threadId) ?? null,
            ),
          ),
        (thread): thread is OrchestrationThread => thread !== null && predicate(thread),
        `projected thread '${threadId}'`,
        timeoutMs,
      ) as Effect.Effect<OrchestrationThread, never>;

    const waitForDomainEvent: OrchestrationIntegrationHarness["waitForDomainEvent"] = (
      predicate,
      timeoutMs,
    ) =>
      waitFor(
        Stream.runCollect(engine.readEvents(0)).pipe(
          Effect.map((chunk): ReadonlyArray<OrchestrationEvent> => Array.from(chunk)),
        ),
        (events) => events.some(predicate),
        "domain event",
        timeoutMs,
      );

    const waitForPendingApproval: OrchestrationIntegrationHarness["waitForPendingApproval"] = (
      requestId,
      predicate,
      timeoutMs,
    ) =>
      waitFor(
        pendingApprovalRepository
          .getByRequestId({ requestId: ApprovalRequestId.makeUnsafe(requestId) })
          .pipe(
            Effect.map((row) =>
              Option.match(row, {
                onNone: () => null,
                onSome: (value) => ({
                  status: value.status,
                  decision: value.decision,
                  resolvedAt: value.resolvedAt,
                }),
              }),
            ),
          ),
        (
          row,
        ): row is {
          readonly status: "pending" | "resolved";
          readonly decision: "accept" | "acceptForSession" | "decline" | "cancel" | null;
          readonly resolvedAt: string | null;
        } => row !== null && predicate(row),
        `pending approval '${requestId}'`,
        timeoutMs,
      ) as Effect.Effect<
        {
          readonly status: "pending" | "resolved";
          readonly decision: "accept" | "acceptForSession" | "decline" | "cancel" | null;
          readonly resolvedAt: string | null;
        },
        never
      >;

    let disposed = false;
    const dispose = Effect.gen(function* () {
      if (disposed) {
        return;
      }
      disposed = true;

      const shutdown = Effect.gen(function* () {
        const closeScopeExit = yield* Effect.exit(Scope.close(scope, Exit.void));
        const disposeRuntimeExit = yield* Effect.exit(Effect.promise(() => runtime.dispose()));

        const failureCause = Exit.isFailure(closeScopeExit)
          ? closeScopeExit.cause
          : Exit.isFailure(disposeRuntimeExit)
            ? disposeRuntimeExit.cause
            : null;

        if (failureCause) {
          return yield* Effect.failCause(failureCause);
        }
      });

      yield* shutdown.pipe(
        Effect.ensuring(
          Effect.sync(() => {
            fs.rmSync(rootDir, { recursive: true, force: true });
          }),
        ),
      );
    });

    return {
      rootDir,
      workspaceDir,
      dbPath,
      adapterHarness,
      engine,
      snapshotQuery,
      providerService,
      checkpointStore,
      checkpointRepository,
      pendingApprovalRepository,
      waitForThread,
      waitForDomainEvent,
      waitForPendingApproval,
      dispose,
    } satisfies OrchestrationIntegrationHarness;

});

================================================
FILE: apps/server/integration/providerService.integration.test.ts
================================================
import type { ProviderRuntimeEvent } from "@t3tools/contracts";
import { ThreadId } from "@t3tools/contracts";
import \* as NodeServices from "@effect/platform-node/NodeServices";
import { it, assert } from "@effect/vitest";
import { Effect, FileSystem, Layer, Path, Queue, Stream } from "effect";

import { ProviderUnsupportedError } from "../src/provider/Errors.ts";
import { ProviderAdapterRegistry } from "../src/provider/Services/ProviderAdapterRegistry.ts";
import { ProviderSessionDirectoryLive } from "../src/provider/Layers/ProviderSessionDirectory.ts";
import { makeProviderServiceLive } from "../src/provider/Layers/ProviderService.ts";
import {
ProviderService,
type ProviderServiceShape,
} from "../src/provider/Services/ProviderService.ts";
import { AnalyticsService } from "../src/telemetry/Services/AnalyticsService.ts";
import { SqlitePersistenceMemory } from "../src/persistence/Layers/Sqlite.ts";
import { ProviderSessionRuntimeRepositoryLive } from "../src/persistence/Layers/ProviderSessionRuntime.ts";

import {
makeTestProviderAdapterHarness,
type TestProviderAdapterHarness,
type TestTurnResponse,
} from "./TestProviderAdapter.integration.ts";
import {
codexTurnApprovalFixture,
codexTurnToolFixture,
codexTurnTextFixture,
} from "./fixtures/providerRuntime.ts";

const makeWorkspaceDirectory = Effect.gen(function* () {
const fs = yield* FileSystem.FileSystem;
const pathService = yield* Path.Path;
const cwd = yield* fs.makeTempDirectory();
yield\* fs.writeFileString(pathService.join(cwd, "README.md"), "v1\n");
return cwd;
}).pipe(Effect.provide(NodeServices.layer));

interface IntegrationFixture {
readonly cwd: string;
readonly harness: TestProviderAdapterHarness;
readonly layer: Layer.Layer<ProviderService, unknown, never>;
}

const makeIntegrationFixture = Effect.gen(function* () {
const cwd = yield* makeWorkspaceDirectory;
const harness = yield\* makeTestProviderAdapterHarness();

const registry: typeof ProviderAdapterRegistry.Service = {
getByProvider: (provider) =>
provider === "codex"
? Effect.succeed(harness.adapter)
: Effect.fail(new ProviderUnsupportedError({ provider })),
listProviders: () => Effect.succeed(["codex"]),
};

const directoryLayer = ProviderSessionDirectoryLive.pipe(
Layer.provide(ProviderSessionRuntimeRepositoryLive),
);

const shared = Layer.mergeAll(
directoryLayer,
Layer.succeed(ProviderAdapterRegistry, registry),
AnalyticsService.layerTest,
).pipe(Layer.provide(SqlitePersistenceMemory));

const layer = makeProviderServiceLive().pipe(Layer.provide(shared));

return {
cwd,
harness,
layer,
} satisfies IntegrationFixture;
});

const collectEventsDuring = <A, E, R>(
stream: Stream.Stream<ProviderRuntimeEvent>,
count: number,
action: Effect.Effect<A, E, R>,
) =>
Effect.gen(function* () {
const queue = yield* Queue.unbounded<ProviderRuntimeEvent>();
yield\* Stream.runForEach(stream, (event) => Queue.offer(queue, event).pipe(Effect.asVoid)).pipe(
Effect.forkScoped,
);

    yield* action;

    return yield* Effect.forEach(
      Array.from({ length: count }, () => undefined),
      () => Queue.take(queue),
      { discard: false },
    );

});

const runTurn = (input: {
readonly provider: ProviderServiceShape;
readonly harness: TestProviderAdapterHarness;
readonly threadId: ThreadId;
readonly userText: string;
readonly response: TestTurnResponse;
}) =>
Effect.gen(function* () {
yield* input.harness.queueTurnResponse(input.threadId, input.response);

    return yield* collectEventsDuring(
      input.provider.streamEvents,
      input.response.events.length,
      input.provider.sendTurn({
        threadId: input.threadId,
        input: input.userText,
        attachments: [],
      }),
    );

});

it.effect("replays typed runtime fixture events", () =>
Effect.gen(function* () {
const fixture = yield* makeIntegrationFixture;

    yield* Effect.gen(function* () {
      const provider = yield* ProviderService;
      const session = yield* provider.startSession(
        ThreadId.makeUnsafe("thread-integration-typed"),
        {
          threadId: ThreadId.makeUnsafe("thread-integration-typed"),
          provider: "codex",
          cwd: fixture.cwd,
          runtimeMode: "full-access",
        },
      );
      assert.equal((session.threadId ?? "").length > 0, true);

      const observedEvents = yield* runTurn({
        provider,
        harness: fixture.harness,
        threadId: session.threadId,
        userText: "hello",
        response: { events: codexTurnTextFixture },
      });

      assert.deepEqual(
        observedEvents.map((event) => event.type),
        codexTurnTextFixture.map((event) => event.type),
      );
    }).pipe(Effect.provide(fixture.layer));

}).pipe(Effect.provide(NodeServices.layer)),
);

it.effect("replays file-changing fixture turn events", () =>
Effect.gen(function* () {
const fixture = yield* makeIntegrationFixture;
const { join } = yield* Path.Path;
const { writeFileString } = yield* FileSystem.FileSystem;

    yield* Effect.gen(function* () {
      const provider = yield* ProviderService;
      const session = yield* provider.startSession(
        ThreadId.makeUnsafe("thread-integration-tools"),
        {
          threadId: ThreadId.makeUnsafe("thread-integration-tools"),
          provider: "codex",
          cwd: fixture.cwd,
          runtimeMode: "full-access",
        },
      );
      assert.equal((session.threadId ?? "").length > 0, true);

      const observedEvents = yield* runTurn({
        provider,
        harness: fixture.harness,
        threadId: session.threadId,
        userText: "make a small change",
        response: {
          events: codexTurnToolFixture,
          mutateWorkspace: ({ cwd }) =>
            writeFileString(join(cwd, "README.md"), "v2\n").pipe(Effect.asVoid, Effect.ignore),
        },
      });

      assert.deepEqual(
        observedEvents.map((event) => event.type),
        codexTurnToolFixture.map((event) => event.type),
      );
    }).pipe(Effect.provide(fixture.layer));

}).pipe(Effect.provide(NodeServices.layer)),
);

it.effect("runs multi-turn tool/approval flow", () =>
Effect.gen(function* () {
const fixture = yield* makeIntegrationFixture;
const { join } = yield* Path.Path;
const { writeFileString } = yield* FileSystem.FileSystem;

    yield* Effect.gen(function* () {
      const provider = yield* ProviderService;
      const session = yield* provider.startSession(
        ThreadId.makeUnsafe("thread-integration-multi"),
        {
          threadId: ThreadId.makeUnsafe("thread-integration-multi"),
          provider: "codex",
          cwd: fixture.cwd,
          runtimeMode: "full-access",
        },
      );
      assert.equal((session.threadId ?? "").length > 0, true);

      const firstTurnEvents = yield* runTurn({
        provider,
        harness: fixture.harness,
        threadId: session.threadId,
        userText: "turn 1",
        response: {
          events: codexTurnToolFixture,
          mutateWorkspace: ({ cwd }) =>
            writeFileString(join(cwd, "README.md"), "v2\n").pipe(Effect.asVoid, Effect.ignore),
        },
      });
      assert.deepEqual(
        firstTurnEvents.map((event) => event.type),
        codexTurnToolFixture.map((event) => event.type),
      );

      const secondTurnEvents = yield* runTurn({
        provider,
        harness: fixture.harness,
        threadId: session.threadId,
        userText: "turn 2 approval",
        response: {
          events: codexTurnApprovalFixture,
          mutateWorkspace: ({ cwd }) =>
            writeFileString(join(cwd, "README.md"), "v3\n").pipe(Effect.asVoid, Effect.ignore),
        },
      });
      assert.deepEqual(
        secondTurnEvents.map((event) => event.type),
        codexTurnApprovalFixture.map((event) => event.type),
      );
    }).pipe(Effect.provide(fixture.layer));

}).pipe(Effect.provide(NodeServices.layer)),
);

it.effect("rolls back provider conversation state only", () =>
Effect.gen(function* () {
const fixture = yield* makeIntegrationFixture;
const { join } = yield* Path.Path;
const { writeFileString, readFileString } = yield* FileSystem.FileSystem;

    yield* Effect.gen(function* () {
      const provider = yield* ProviderService;
      const session = yield* provider.startSession(
        ThreadId.makeUnsafe("thread-integration-rollback"),
        {
          threadId: ThreadId.makeUnsafe("thread-integration-rollback"),
          provider: "codex",
          cwd: fixture.cwd,
          runtimeMode: "full-access",
        },
      );
      assert.equal((session.threadId ?? "").length > 0, true);

      yield* runTurn({
        provider,
        harness: fixture.harness,
        threadId: session.threadId,
        userText: "turn 1",
        response: {
          events: codexTurnToolFixture,
          mutateWorkspace: ({ cwd }) =>
            writeFileString(join(cwd, "README.md"), "v2\n").pipe(Effect.asVoid, Effect.ignore),
        },
      });

      yield* runTurn({
        provider,
        harness: fixture.harness,
        threadId: session.threadId,
        userText: "turn 2 approval",
        response: {
          events: codexTurnApprovalFixture,
          mutateWorkspace: ({ cwd }) =>
            writeFileString(join(cwd, "README.md"), "v3\n").pipe(Effect.asVoid, Effect.ignore),
        },
      });

      yield* provider.rollbackConversation({
        threadId: session.threadId,
        numTurns: 1,
      });

      const rollbackCalls = fixture.harness.getRollbackCalls(session.threadId);
      assert.deepEqual(rollbackCalls, [1]);

      const readme = yield* readFileString(join(fixture.cwd, "README.md"));
      assert.equal(readme, "v3\n");
    }).pipe(Effect.provide(fixture.layer));

}).pipe(Effect.provide(NodeServices.layer)),
);

================================================
FILE: apps/server/integration/TestProviderAdapter.integration.ts
================================================
import { randomUUID } from "node:crypto";

import {
ApprovalRequestId,
EventId,
ProviderApprovalDecision,
ProviderRuntimeEvent,
RuntimeSessionId,
ProviderSession,
ProviderTurnStartResult,
ThreadId,
TurnId,
} from "@t3tools/contracts";
import { Effect, Queue, Stream } from "effect";

import {
ProviderAdapterSessionNotFoundError,
ProviderAdapterValidationError,
type ProviderAdapterError,
} from "../src/provider/Errors.ts";
import type {
ProviderAdapterShape,
ProviderThreadSnapshot,
ProviderThreadTurnSnapshot,
} from "../src/provider/Services/ProviderAdapter.ts";

export interface TestTurnResponse {
readonly events: ReadonlyArray<FixtureProviderRuntimeEvent>;
readonly mutateWorkspace?: (input: {
readonly cwd: string;
readonly turnCount: number;
}) => Effect.Effect<void, never>;
}

export type FixtureProviderRuntimeEvent = {
readonly type: string;
readonly eventId: EventId;
readonly provider: "codex";
readonly createdAt: string;
readonly threadId: string;
readonly turnId?: string | undefined;
readonly itemId?: string | undefined;
readonly requestId?: string | undefined;
readonly payload?: unknown | undefined;
readonly [key: string]: unknown;
};

// Temporary alias while fixtures migrate to the new name.
export type LegacyProviderRuntimeEvent = FixtureProviderRuntimeEvent;

interface SessionState {
readonly session: ProviderSession;
snapshot: ProviderThreadSnapshot;
turnCount: number;
readonly queuedResponses: Array<TestTurnResponse>;
readonly rollbackCalls: Array<number>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
return typeof value === "object" && value !== null;
}

function normalizeTurnState(value: unknown): "completed" | "failed" | "interrupted" | "cancelled" {
if (
value === "completed" ||
value === "failed" ||
value === "interrupted" ||
value === "cancelled"
) {
return value;
}
return "completed";
}

function mapRequestType(requestKind: unknown):
| "command_execution_approval"
| "file_change_approval"
| "unknown" {
if (requestKind === "command") {
return "command_execution_approval";
}
if (requestKind === "file-change") {
return "file_change_approval";
}
return "unknown";
}

function mapItemType(toolKind: unknown): "command_execution" | "file_change" | "unknown" {
if (toolKind === "command") {
return "command_execution";
}
if (toolKind === "file-change") {
return "file_change";
}
return "unknown";
}

function normalizeFixtureEvent(rawEvent: Record<string, unknown>): ProviderRuntimeEvent {
const type = typeof rawEvent.type === "string" ? rawEvent.type : "";
switch (type) {
case "turn.started":
return {
...rawEvent,
type: "turn.started",
payload: isRecord(rawEvent.payload) ? rawEvent.payload : {},
} as ProviderRuntimeEvent;
case "turn.completed":
return {
...rawEvent,
type: "turn.completed",
payload: isRecord(rawEvent.payload)
? rawEvent.payload
: {
state: normalizeTurnState(rawEvent.status),
},
} as ProviderRuntimeEvent;
case "message.delta":
return {
...rawEvent,
type: "content.delta",
payload: {
streamKind: "assistant_text",
delta: typeof rawEvent.delta === "string" ? rawEvent.delta : "",
},
} as ProviderRuntimeEvent;
case "message.completed":
return {
...rawEvent,
type: "item.completed",
payload: {
itemType: "assistant_message",
...(typeof rawEvent.detail === "string" ? { detail: rawEvent.detail } : {}),
},
} as ProviderRuntimeEvent;
case "tool.started":
return {
...rawEvent,
type: "item.started",
payload: {
itemType: mapItemType(rawEvent.toolKind),
...(typeof rawEvent.title === "string" ? { title: rawEvent.title } : {}),
...(typeof rawEvent.detail === "string" ? { detail: rawEvent.detail } : {}),
},
} as ProviderRuntimeEvent;
case "tool.completed":
return {
...rawEvent,
type: "item.completed",
payload: {
itemType: mapItemType(rawEvent.toolKind),
status: "completed",
...(typeof rawEvent.title === "string" ? { title: rawEvent.title } : {}),
...(typeof rawEvent.detail === "string" ? { detail: rawEvent.detail } : {}),
},
} as ProviderRuntimeEvent;
case "approval.requested":
return {
...rawEvent,
type: "request.opened",
payload: {
requestType: mapRequestType(rawEvent.requestKind),
...(typeof rawEvent.detail === "string" ? { detail: rawEvent.detail } : {}),
},
} as ProviderRuntimeEvent;
case "approval.resolved":
return {
...rawEvent,
type: "request.resolved",
payload: {
requestType: mapRequestType(rawEvent.requestKind),
...(typeof rawEvent.decision === "string" ? { decision: rawEvent.decision } : {}),
},
} as ProviderRuntimeEvent;
default:
return rawEvent as ProviderRuntimeEvent;
}
}

export interface TestProviderAdapterHarness {
readonly adapter: ProviderAdapterShape<ProviderAdapterError>;
readonly provider: "codex";
readonly queueTurnResponse: (
threadId: ThreadId,
response: TestTurnResponse,
) => Effect.Effect<void, ProviderAdapterSessionNotFoundError>;
readonly queueTurnResponseForNextSession: (
response: TestTurnResponse,
) => Effect.Effect<void, never>;
readonly getStartCount: () => number;
readonly getRollbackCalls: (threadId: ThreadId) => ReadonlyArray<number>;
readonly getInterruptCalls: (threadId: ThreadId) => ReadonlyArray<TurnId | undefined>;
readonly listActiveSessionIds: () => ReadonlyArray<ThreadId>;
readonly getApprovalResponses: (threadId: ThreadId) => ReadonlyArray<{
readonly threadId: ThreadId;
readonly requestId: ApprovalRequestId;
readonly decision: ProviderApprovalDecision;
}>;
}

interface MakeTestProviderAdapterHarnessOptions {
readonly provider?: "codex";
}

function nowIso(): string {
return new Date().toISOString();
}

function sessionNotFound(
provider: "codex",
threadId: ThreadId,
): ProviderAdapterSessionNotFoundError {
return new ProviderAdapterSessionNotFoundError({
provider,
threadId: String(threadId),
});
}

function missingSessionEffect(
provider: "codex",
threadId: ThreadId,
): Effect.Effect<never, ProviderAdapterError> {
return Effect.fail(sessionNotFound(provider, threadId));
}

export const makeTestProviderAdapterHarness = (options?: MakeTestProviderAdapterHarnessOptions) =>
Effect.gen(function* () {
const provider = options?.provider ?? "codex";
const runtimeEvents = yield* Queue.unbounded<ProviderRuntimeEvent>();
let sessionCount = 0;
const sessions = new Map<ThreadId, SessionState>();
const queuedResponsesForNextSession: TestTurnResponse[] = [];
const interruptCallsBySession = new Map<ThreadId, Array<TurnId | undefined>>();
const approvalResponsesBySession = new Map<
ThreadId,
Array<{
readonly threadId: ThreadId;
readonly requestId: ApprovalRequestId;
readonly decision: ProviderApprovalDecision;
}> >();

const emit = (event: ProviderRuntimeEvent) => Queue.offer(runtimeEvents, event);

const startSession: ProviderAdapterShape<ProviderAdapterError>["startSession"] = (input) =>
Effect.gen(function* () {
if (input.provider !== undefined && input.provider !== provider) {
return yield* new ProviderAdapterValidationError({
provider,
operation: "startSession",
issue: `Expected provider '${provider}' but received '${input.provider}'.`,
});
}

      sessionCount += 1;
      const threadId = input.threadId;
      const createdAt = nowIso();

      const session: ProviderSession = {
        provider,
        status: "ready",
        runtimeMode: input.runtimeMode,
        threadId,
        cwd: input.cwd,
        resumeCursor: input.resumeCursor ?? { threadId: String(threadId), seed: sessionCount },
        createdAt,
        updatedAt: createdAt,
      };

      sessions.set(threadId, {
        session,
        snapshot: {
          threadId,
          turns: [],
        },
        turnCount: 0,
        queuedResponses: queuedResponsesForNextSession.splice(0),
        rollbackCalls: [],
      });

      return session;
    });

const sendTurn: ProviderAdapterShape<ProviderAdapterError>["sendTurn"] = (input) =>
Effect.gen(function* () {
const state = sessions.get(input.threadId);
if (!state) {
return yield* missingSessionEffect(provider, input.threadId);
}

      state.turnCount += 1;
      const turnCount = state.turnCount;
      const turnId = TurnId.makeUnsafe(`turn-${turnCount}`);

      const response = state.queuedResponses.shift();
      if (!response) {
        return yield* new ProviderAdapterValidationError({
          provider,
          operation: "sendTurn",
          issue: `No queued turn response for thread ${input.threadId}.`,
        });
      }

      const assistantDeltas: string[] = [];
      const deferredTurnCompletedEvents: ProviderRuntimeEvent[] = [];
      for (const fixtureEvent of response.events) {
        const rawEvent: Record<string, unknown> = {
          ...(fixtureEvent as Record<string, unknown>),
          eventId: randomUUID(),
          provider,
          sessionId: RuntimeSessionId.makeUnsafe(String(input.threadId)),
          createdAt: nowIso(),
        };
        rawEvent.threadId = state.snapshot.threadId;
        if (Object.hasOwn(rawEvent, "turnId")) {
          rawEvent.turnId = turnId;
        }

        const runtimeEvent = normalizeFixtureEvent(rawEvent);
        const runtimeType = (runtimeEvent as { type: string }).type;
        if (runtimeType === "content.delta") {
          const payload = runtimeEvent.payload as { delta?: unknown } | undefined;
          if (typeof payload?.delta === "string") {
            assistantDeltas.push(payload.delta);
          }
        } else if (runtimeType === "message.delta") {
          const legacyDelta = (runtimeEvent as { delta?: unknown }).delta;
          if (typeof legacyDelta === "string") {
            assistantDeltas.push(legacyDelta);
          }
        }
        if (runtimeEvent.type === "turn.completed") {
          deferredTurnCompletedEvents.push(runtimeEvent);
          continue;
        }

        yield* emit(runtimeEvent);
      }

      if (response.mutateWorkspace && state.session.cwd) {
        yield* response.mutateWorkspace({ cwd: state.session.cwd!, turnCount });
      }

      const userItem = {
        type: "userMessage",
        content: [{ type: "text", text: input.input }],
      } as const;
      const assistantText = assistantDeltas.join("");
      const nextItems: Array<unknown> =
        assistantText.length > 0
          ? [userItem, { type: "agentMessage", text: assistantText }]
          : [userItem];

      const nextTurn: ProviderThreadTurnSnapshot = {
        id: turnId,
        items: nextItems,
      };

      state.snapshot = {
        threadId: state.snapshot.threadId,
        turns: [...state.snapshot.turns, nextTurn],
      };

      if (deferredTurnCompletedEvents.length === 0) {
        yield* emit({
          type: "turn.completed",
          eventId: EventId.makeUnsafe(randomUUID()),
          provider,
          createdAt: nowIso(),
          threadId: state.snapshot.threadId,
          turnId,
          payload: {
            state: "completed",
          },
        });
      } else {
        for (const completedEvent of deferredTurnCompletedEvents) {
          yield* emit(completedEvent);
        }
      }

      return {
        threadId: state.snapshot.threadId,
        turnId,
      } satisfies ProviderTurnStartResult;
    });

const interruptTurn: ProviderAdapterShape<ProviderAdapterError>["interruptTurn"] = (
threadId,
turnId,
) =>
sessions.has(threadId)
? Effect.sync(() => {
const existing = interruptCallsBySession.get(threadId) ?? [];
existing.push(turnId);
interruptCallsBySession.set(threadId, existing);
})
: missingSessionEffect(provider, threadId);

const respondToRequest: ProviderAdapterShape<ProviderAdapterError>["respondToRequest"] = (
threadId,
requestId,
decision,
) =>
sessions.has(threadId)
? Effect.sync(() => {
const existing = approvalResponsesBySession.get(threadId) ?? [];
existing.push({
threadId,
requestId,
decision,
});
approvalResponsesBySession.set(threadId, existing);
})
: missingSessionEffect(provider, threadId);

const respondToUserInput: ProviderAdapterShape<ProviderAdapterError>["respondToUserInput"] = (
threadId,
\_requestId,
\_answers,
) => (sessions.has(threadId) ? Effect.void : missingSessionEffect(provider, threadId));

const stopSession: ProviderAdapterShape<ProviderAdapterError>["stopSession"] = (threadId) =>
Effect.sync(() => {
sessions.delete(threadId);
});

const listSessions: ProviderAdapterShape<ProviderAdapterError>["listSessions"] = () =>
Effect.sync(() => Array.from(sessions.values(), (state) => state.session));

const hasSession: ProviderAdapterShape<ProviderAdapterError>["hasSession"] = (threadId) =>
Effect.succeed(sessions.has(threadId));

const readThread: ProviderAdapterShape<ProviderAdapterError>["readThread"] = (threadId) => {
const state = sessions.get(threadId);
if (!state) {
return missingSessionEffect(provider, threadId);
}
return Effect.succeed(state.snapshot);
};

const rollbackThread: ProviderAdapterShape<ProviderAdapterError>["rollbackThread"] = (
threadId,
numTurns,
) => {
const state = sessions.get(threadId);
if (!state) {
return missingSessionEffect(provider, threadId);
}
if (!Number.isInteger(numTurns) || numTurns < 0 || numTurns > state.snapshot.turns.length) {
return Effect.fail(
new ProviderAdapterValidationError({
provider,
operation: "rollbackThread",
issue: "numTurns must be an integer between 0 and current turn count.",
}),
);
}

    return Effect.sync(() => {
      state.rollbackCalls.push(numTurns);
      state.snapshot = {
        threadId: state.snapshot.threadId,
        turns: state.snapshot.turns.slice(0, state.snapshot.turns.length - numTurns),
      };
      state.turnCount = state.snapshot.turns.length;
      return state.snapshot;
    });

};

const stopAll: ProviderAdapterShape<ProviderAdapterError>["stopAll"] = () =>
Effect.sync(() => {
sessions.clear();
});

const adapter: ProviderAdapterShape<ProviderAdapterError> = {
provider,
capabilities: {
sessionModelSwitch: "in-session",
},
startSession,
sendTurn,
interruptTurn,
respondToRequest,
respondToUserInput,
stopSession,
listSessions,
hasSession,
readThread,
rollbackThread,
stopAll,
streamEvents: Stream.fromQueue(runtimeEvents),
};

const queueTurnResponse = (
threadId: ThreadId,
response: TestTurnResponse,
): Effect.Effect<void, ProviderAdapterSessionNotFoundError> =>
Effect.sync(() => sessions.get(threadId)).pipe(
Effect.flatMap((state) =>
state
? Effect.sync(() => {
state.queuedResponses.push(response);
})
: Effect.fail(sessionNotFound(provider, threadId)),
),
);

const queueTurnResponseForNextSession = (
response: TestTurnResponse,
): Effect.Effect<void, never> =>
Effect.sync(() => {
queuedResponsesForNextSession.push(response);
});

const getRollbackCalls = (threadId: ThreadId): ReadonlyArray<number> => {
const state = sessions.get(threadId);
if (!state) {
return [];
}
return [...state.rollbackCalls];
};

const getStartCount = (): number => sessionCount;

const getInterruptCalls = (threadId: ThreadId): ReadonlyArray<TurnId | undefined> => {
const calls = interruptCallsBySession.get(threadId);
if (!calls) {
return [];
}
return [...calls];
};

const listActiveSessionIds = (): ReadonlyArray<ThreadId> =>
Array.from(sessions.values(), (state) => state.session.threadId);

const getApprovalResponses = (
threadId: ThreadId,
): ReadonlyArray<{
readonly threadId: ThreadId;
readonly requestId: ApprovalRequestId;
readonly decision: ProviderApprovalDecision;
}> => {
const responses = approvalResponsesBySession.get(threadId);
if (!responses) {
return [];
}
return [...responses];
};

return {
adapter,
provider,
queueTurnResponse,
queueTurnResponseForNextSession,
getStartCount,
getRollbackCalls,
getInterruptCalls,
listActiveSessionIds,
getApprovalResponses,
} satisfies TestProviderAdapterHarness;
});

================================================
FILE: apps/server/integration/fixtures/providerRuntime.ts
================================================
import { EventId, RuntimeRequestId } from "@t3tools/contracts";
import type { LegacyProviderRuntimeEvent } from "../TestProviderAdapter.integration.ts";

const PROVIDER = "codex" as const;
const SESSION_ID = "fixture-session";
const THREAD_ID = "fixture-thread";
const TURN_ID = "fixture-turn";
const REQUEST_ID = RuntimeRequestId.makeUnsafe("req-1");

function baseEvent(
eventId: string,
createdAt: string,
): Pick<LegacyProviderRuntimeEvent, "eventId" | "provider" | "sessionId" | "createdAt"> {
return {
eventId: EventId.makeUnsafe(eventId),
provider: PROVIDER,
sessionId: SESSION_ID,
createdAt,
};
}

export const codexTurnTextFixture = [
{
type: "turn.started",
...baseEvent("evt-1", "2026-02-23T00:00:00.000Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {},
},
{
type: "content.delta",
...baseEvent("evt-2", "2026-02-23T00:00:00.100Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
streamKind: "assistant_text",
delta: "I will make a small update.\n",
},
},
{
type: "content.delta",
...baseEvent("evt-3", "2026-02-23T00:00:00.200Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
streamKind: "assistant_text",
delta: "Done.\n",
},
},
{
type: "turn.completed",
...baseEvent("evt-4", "2026-02-23T00:00:00.300Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
state: "completed",
},
},
] satisfies ReadonlyArray<LegacyProviderRuntimeEvent>;

export const codexTurnToolFixture = [
{
type: "turn.started",
...baseEvent("evt-11", "2026-02-23T00:01:00.000Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {},
},
{
type: "item.started",
...baseEvent("evt-12", "2026-02-23T00:01:00.100Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
itemType: "command_execution",
title: "Command run",
detail: "echo integration",
},
},
{
type: "item.completed",
...baseEvent("evt-13", "2026-02-23T00:01:00.200Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
itemType: "command_execution",
status: "completed",
title: "Command run",
detail: "echo integration",
},
},
{
type: "content.delta",
...baseEvent("evt-14", "2026-02-23T00:01:00.300Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
streamKind: "assistant_text",
delta: "Applied the requested edit.\n",
},
},
{
type: "turn.completed",
...baseEvent("evt-15", "2026-02-23T00:01:00.400Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
state: "completed",
},
},
] satisfies ReadonlyArray<LegacyProviderRuntimeEvent>;

export const codexTurnApprovalFixture = [
{
type: "turn.started",
...baseEvent("evt-21", "2026-02-23T00:02:00.000Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {},
},
{
type: "request.opened",
...baseEvent("evt-22", "2026-02-23T00:02:00.100Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
requestId: REQUEST_ID,
payload: {
requestType: "command_execution_approval",
detail: "Please approve command",
},
},
{
type: "request.resolved",
...baseEvent("evt-23", "2026-02-23T00:02:00.200Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
requestId: REQUEST_ID,
payload: {
requestType: "command_execution_approval",
decision: "accept",
},
},
{
type: "content.delta",
...baseEvent("evt-24", "2026-02-23T00:02:00.300Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
streamKind: "assistant_text",
delta: "Approval received and command executed.\n",
},
},
{
type: "turn.completed",
...baseEvent("evt-25", "2026-02-23T00:02:00.400Z"),
threadId: THREAD_ID,
turnId: TURN_ID,
payload: {
state: "completed",
},
},
] satisfies ReadonlyArray<LegacyProviderRuntimeEvent>;

================================================
FILE: apps/server/scripts/cli.ts
================================================
#!/usr/bin/env node

import _ as NodeRuntime from "@effect/platform-node/NodeRuntime";
import _ as NodeServices from "@effect/platform-node/NodeServices";
import { Data, Effect, FileSystem, Logger, Option, Path } from "effect";
import { Command, Flag } from "effect/unstable/cli";
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process";

import { DEVELOPMENT_ICON_OVERRIDES, PUBLISH_ICON_OVERRIDES } from "../../../scripts/lib/brand-assets.ts";
import { resolveCatalogDependencies } from "../../../scripts/lib/resolve-catalog.ts";
import rootPackageJson from "../../../package.json" with { type: "json" };
import serverPackageJson from "../package.json" with { type: "json" };

class CliError extends Data.TaggedError("CliError")<{
readonly message: string;
readonly cause?: unknown;
}> {}

const RepoRoot = Effect.service(Path.Path).pipe(
Effect.flatMap((path) => path.fromFileUrl(new URL("../../..", import.meta.url))),
);

const runCommand = Effect.fn("runCommand")(function* (command: ChildProcess.Command) {
const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
const child = yield* spawner.spawn(command);
const exitCode = yield* child.exitCode;

if (exitCode !== 0) {
return yield\* new CliError({
message: `Command exited with non-zero exit code (${exitCode})`,
});
}
});

interface PublishIconBackup {
readonly targetPath: string;
readonly backupPath: string;
}

const applyPublishIconOverrides = Effect.fn("applyPublishIconOverrides")(function* (
repoRoot: string,
serverDir: string,
) {
const path = yield* Path.Path;
const fs = yield\* FileSystem.FileSystem;
const backups: PublishIconBackup[] = [];

for (const override of PUBLISH_ICON_OVERRIDES) {
const sourcePath = path.join(repoRoot, override.sourceRelativePath);
const targetPath = path.join(serverDir, override.targetRelativePath);
const backupPath = `${targetPath}.publish-bak`;

    if (!(yield* fs.exists(sourcePath))) {
      return yield* new CliError({
        message: `Missing publish icon source: ${sourcePath}`,
      });
    }
    if (!(yield* fs.exists(targetPath))) {
      return yield* new CliError({
        message: `Missing publish icon target: ${targetPath}. Run the build subcommand first.`,
      });
    }

    yield* fs.copyFile(targetPath, backupPath);
    yield* fs.copyFile(sourcePath, targetPath);
    backups.push({ targetPath, backupPath });

}

yield\* Effect.log("[cli] Applied publish icon overrides to dist/client");
return backups as ReadonlyArray<PublishIconBackup>;
});

const restorePublishIconOverrides = Effect.fn("restorePublishIconOverrides")(function* (
backups: ReadonlyArray<PublishIconBackup>,
) {
const fs = yield* FileSystem.FileSystem;
for (const backup of backups) {
if (!(yield* fs.exists(backup.backupPath))) {
continue;
}
yield* fs.rename(backup.backupPath, backup.targetPath);
}
});

const applyDevelopmentIconOverrides = Effect.fn("applyDevelopmentIconOverrides")(function* (
repoRoot: string,
serverDir: string,
) {
const path = yield* Path.Path;
const fs = yield\* FileSystem.FileSystem;

for (const override of DEVELOPMENT_ICON_OVERRIDES) {
const sourcePath = path.join(repoRoot, override.sourceRelativePath);
const targetPath = path.join(serverDir, override.targetRelativePath);

    if (!(yield* fs.exists(sourcePath))) {
      return yield* new CliError({
        message: `Missing development icon source: ${sourcePath}`,
      });
    }
    if (!(yield* fs.exists(targetPath))) {
      return yield* new CliError({
        message: `Missing development icon target: ${targetPath}. Build web first.`,
      });
    }

    yield* fs.copyFile(sourcePath, targetPath);

}

yield\* Effect.log("[cli] Applied development icon overrides to dist/client");
});

// ---------------------------------------------------------------------------
// build subcommand
// ---------------------------------------------------------------------------

const buildCmd = Command.make(
"build",
{
verbose: Flag.boolean("verbose").pipe(Flag.withDefault(false)),
},
(config) =>
Effect.gen(function* () {
const path = yield* Path.Path;
const fs = yield* FileSystem.FileSystem;
const repoRoot = yield* RepoRoot;
const serverDir = path.join(repoRoot, "apps/server");

      yield* Effect.log("[cli] Running tsdown...");
      yield* runCommand(
        ChildProcess.make({
          cwd: serverDir,
          stdout: config.verbose ? "inherit" : "ignore",
          stderr: "inherit",
          // Windows needs shell mode to resolve .cmd shims (e.g. bun.cmd).
          shell: process.platform === "win32",
        })`bun tsdown`,
      );

      const webDist = path.join(repoRoot, "apps/web/dist");
      const clientTarget = path.join(serverDir, "dist/client");

      if (yield* fs.exists(webDist)) {
        yield* fs.copy(webDist, clientTarget);
        yield* applyDevelopmentIconOverrides(repoRoot, serverDir);
        yield* Effect.log("[cli] Bundled web app into dist/client");
      } else {
        yield* Effect.logWarning("[cli] Web dist not found — skipping client bundle.");
      }
    }),

).pipe(Command.withDescription("Build the server package (tsdown + bundle web client)."));

// ---------------------------------------------------------------------------
// publish subcommand
// ---------------------------------------------------------------------------

const publishCmd = Command.make(
"publish",
{
tag: Flag.string("tag").pipe(Flag.withDefault("latest")),
access: Flag.string("access").pipe(Flag.withDefault("public")),
appVersion: Flag.string("app-version").pipe(Flag.optional),
provenance: Flag.boolean("provenance").pipe(Flag.withDefault(false)),
dryRun: Flag.boolean("dry-run").pipe(Flag.withDefault(false)),
verbose: Flag.boolean("verbose").pipe(Flag.withDefault(false)),
},
(config) =>
Effect.gen(function* () {
const path = yield* Path.Path;
const fs = yield* FileSystem.FileSystem;
const repoRoot = yield* RepoRoot;
const serverDir = path.join(repoRoot, "apps/server");
const packageJsonPath = path.join(serverDir, "package.json");
const backupPath = `${packageJsonPath}.bak`;

      // Assert build assets exist
      for (const relPath of ["dist/index.mjs", "dist/client/index.html"]) {
        const abs = path.join(serverDir, relPath);
        if (!(yield* fs.exists(abs))) {
          return yield* new CliError({
            message: `Missing build asset: ${abs}. Run the build subcommand first.`,
          });
        }
      }

      yield* Effect.acquireUseRelease(
        // Acquire: backup package.json, resolve catalog: deps, strip devDependencies/scripts
        Effect.gen(function* () {
          // Resolve catalog dependencies before any file mutations. If this throws,
          // acquire fails and no release hook runs, so filesystem must still be untouched.
          const version = Option.getOrElse(config.appVersion, () => serverPackageJson.version);
          const pkg = {
            name: serverPackageJson.name,
            repository: serverPackageJson.repository,
            bin: serverPackageJson.bin,
            type: serverPackageJson.type,
            version,
            engines: serverPackageJson.engines,
            files: serverPackageJson.files,
            dependencies: serverPackageJson.dependencies as Record<string, unknown>,
          };

          pkg.dependencies = resolveCatalogDependencies(
            pkg.dependencies,
            rootPackageJson.workspaces.catalog,
            "apps/server dependencies",
          );

          const original = yield* fs.readFileString(packageJsonPath);
          yield* fs.writeFileString(backupPath, original);
          yield* fs.writeFileString(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
          yield* Effect.log("[cli] Resolved package.json for publish");

          const iconBackups = yield* applyPublishIconOverrides(repoRoot, serverDir);
          return { iconBackups };
        }),
        // Use: npm publish
        () =>
          Effect.gen(function* () {
            const args = ["publish", "--access", config.access, "--tag", config.tag];
            if (config.provenance) args.push("--provenance");
            if (config.dryRun) args.push("--dry-run");

            yield* Effect.log(`[cli] Running: npm ${args.join(" ")}`);
            yield* runCommand(
              ChildProcess.make("npm", [...args], {
                cwd: serverDir,
                stdout: config.verbose ? "inherit" : "ignore",
                stderr: "inherit",
                // Windows needs shell mode to resolve .cmd shims.
                shell: process.platform === "win32",
              }),
            );
          }),
        // Release: restore
        (resource: { readonly iconBackups: ReadonlyArray<PublishIconBackup> }) =>
          Effect.gen(function* () {
            yield* restorePublishIconOverrides(resource.iconBackups).pipe(
              Effect.catch((error) =>
                Effect.logError(
                  `[cli] Failed to restore publish icon overrides: ${String(error)}`,
                ),
              ),
            );
            yield* fs.rename(backupPath, packageJsonPath);
            if (config.verbose) yield* Effect.log("[cli] Restored original package.json");
          }),
      );
    }),

).pipe(Command.withDescription("Publish the server package to npm."));

// ---------------------------------------------------------------------------
// root command
// ---------------------------------------------------------------------------

const cli = Command.make("cli").pipe(
Command.withDescription("T3 server build & publish CLI."),
Command.withSubcommands([buildCmd, publishCmd]),
);

Command.run(cli, { version: "0.0.0" }).pipe(
Effect.scoped,
Effect.provide([Logger.layer([Logger.consolePretty()]), NodeServices.layer]),
NodeRuntime.runMain,
);

================================================
FILE: apps/server/src/attachmentPaths.ts
================================================
import path from "node:path";

export const ATTACHMENTS_ROUTE_PREFIX = "/attachments";

export function normalizeAttachmentRelativePath(rawRelativePath: string): string | null {
const normalized = path.normalize(rawRelativePath).replace(/^[/\\]+/, "");
if (normalized.length === 0 || normalized.startsWith("..") || normalized.includes("\0")) {
return null;
}
return normalized.replace(/\\/g, "/");
}

export function resolveAttachmentRelativePath(input: {
readonly stateDir: string;
readonly relativePath: string;
}): string | null {
const normalizedRelativePath = normalizeAttachmentRelativePath(input.relativePath);
if (!normalizedRelativePath) {
return null;
}

const attachmentsRoot = path.resolve(path.join(input.stateDir, "attachments"));
const filePath = path.resolve(path.join(attachmentsRoot, normalizedRelativePath));
if (!filePath.startsWith(`${attachmentsRoot}${path.sep}`)) {
return null;
}
return filePath;
}

================================================
FILE: apps/server/src/attachmentStore.test.ts
================================================
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
createAttachmentId,
parseThreadSegmentFromAttachmentId,
resolveAttachmentPathById,
} from "./attachmentStore.ts";

describe("attachmentStore", () => {
it("sanitizes thread ids when creating attachment ids", () => {
const attachmentId = createAttachmentId("thread.folder/unsafe space");
expect(attachmentId).toBeTruthy();
if (!attachmentId) {
return;
}

    const threadSegment = parseThreadSegmentFromAttachmentId(attachmentId);
    expect(threadSegment).toBeTruthy();
    expect(threadSegment).toMatch(/^[a-z0-9_-]+$/i);
    expect(threadSegment).not.toContain(".");
    expect(threadSegment).not.toContain("%");
    expect(threadSegment).not.toContain("/");

});

it("parses exact thread segments from attachment ids without prefix collisions", () => {
const fooId = "foo-00000000-0000-4000-8000-000000000001";
const fooBarId = "foo-bar-00000000-0000-4000-8000-000000000002";

    expect(parseThreadSegmentFromAttachmentId(fooId)).toBe("foo");
    expect(parseThreadSegmentFromAttachmentId(fooBarId)).toBe("foo-bar");

});

it("normalizes created thread segments to lowercase", () => {
const attachmentId = createAttachmentId("Thread.Foo");
expect(attachmentId).toBeTruthy();
if (!attachmentId) {
return;
}
expect(parseThreadSegmentFromAttachmentId(attachmentId)).toBe("thread-foo");
});

it("resolves attachment path by id using the extension that exists on disk", () => {
const stateDir = fs.mkdtempSync(path.join(os.tmpdir(), "t3code-attachment-store-"));
try {
const attachmentId = "thread-1-attachment";
const attachmentsDir = path.join(stateDir, "attachments");
fs.mkdirSync(attachmentsDir, { recursive: true });
const pngPath = path.join(attachmentsDir, `${attachmentId}.png`);
fs.writeFileSync(pngPath, Buffer.from("hello"));

      const resolved = resolveAttachmentPathById({
        stateDir,
        attachmentId,
      });
      expect(resolved).toBe(pngPath);
    } finally {
      fs.rmSync(stateDir, { recursive: true, force: true });
    }

});

it("returns null when no attachment file exists for the id", () => {
const stateDir = fs.mkdtempSync(path.join(os.tmpdir(), "t3code-attachment-store-"));
try {
const resolved = resolveAttachmentPathById({
stateDir,
attachmentId: "thread-1-missing",
});
expect(resolved).toBeNull();
} finally {
fs.rmSync(stateDir, { recursive: true, force: true });
}
});
});

================================================
FILE: apps/server/src/attachmentStore.ts
================================================
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";

import type { ChatAttachment } from "@t3tools/contracts";

import {
normalizeAttachmentRelativePath,
resolveAttachmentRelativePath,
} from "./attachmentPaths.ts";
import { inferImageExtension, SAFE_IMAGE_FILE_EXTENSIONS } from "./imageMime.ts";

const ATTACHMENT*FILENAME_EXTENSIONS = [...SAFE_IMAGE_FILE_EXTENSIONS, ".bin"];
const ATTACHMENT_ID_THREAD_SEGMENT_MAX_CHARS = 80;
const ATTACHMENT_ID_THREAD_SEGMENT_PATTERN = "[a-z0-9*]+(?:-[a-z0-9_]+)\*";
const ATTACHMENT_ID_UUID_PATTERN =
"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
const ATTACHMENT_ID_PATTERN = new RegExp(
`^(${ATTACHMENT_ID_THREAD_SEGMENT_PATTERN})-(${ATTACHMENT_ID_UUID_PATTERN})$`,
"i",
);

export function toSafeThreadAttachmentSegment(threadId: string): string | null {
const segment = threadId
.trim()
.toLowerCase()
.replace(/[^a-z0-9_-]+/gi, "-")
.replace(/-+/g, "-")
.replace(/^[-_]+|[-_]+$/g, "")
    .slice(0, ATTACHMENT_ID_THREAD_SEGMENT_MAX_CHARS)
    .replace(/[-_]+$/g, "");
if (segment.length === 0) {
return null;
}
return segment;
}

export function createAttachmentId(threadId: string): string | null {
const threadSegment = toSafeThreadAttachmentSegment(threadId);
if (!threadSegment) {
return null;
}
return `${threadSegment}-${randomUUID()}`;
}

export function parseThreadSegmentFromAttachmentId(attachmentId: string): string | null {
const normalizedId = normalizeAttachmentRelativePath(attachmentId);
if (!normalizedId || normalizedId.includes("/") || normalizedId.includes(".")) {
return null;
}
const match = normalizedId.match(ATTACHMENT_ID_PATTERN);
if (!match) {
return null;
}
return match[1]?.toLowerCase() ?? null;
}

export function attachmentRelativePath(attachment: ChatAttachment): string {
switch (attachment.type) {
case "image": {
const extension = inferImageExtension({
mimeType: attachment.mimeType,
fileName: attachment.name,
});
return `${attachment.id}${extension}`;
}
}
}

export function resolveAttachmentPath(input: {
readonly stateDir: string;
readonly attachment: ChatAttachment;
}): string | null {
return resolveAttachmentRelativePath({
stateDir: input.stateDir,
relativePath: attachmentRelativePath(input.attachment),
});
}

export function resolveAttachmentPathById(input: {
readonly stateDir: string;
readonly attachmentId: string;
}): string | null {
const normalizedId = normalizeAttachmentRelativePath(input.attachmentId);
if (!normalizedId || normalizedId.includes("/") || normalizedId.includes(".")) {
return null;
}
for (const extension of ATTACHMENT_FILENAME_EXTENSIONS) {
const maybePath = resolveAttachmentRelativePath({
stateDir: input.stateDir,
relativePath: `${normalizedId}${extension}`,
});
if (maybePath && existsSync(maybePath)) {
return maybePath;
}
}
return null;
}

export function parseAttachmentIdFromRelativePath(relativePath: string): string | null {
const normalized = normalizeAttachmentRelativePath(relativePath);
if (!normalized || normalized.includes("/")) {
return null;
}
const extensionIndex = normalized.lastIndexOf(".");
if (extensionIndex <= 0) {
return null;
}
const id = normalized.slice(0, extensionIndex);
return id.length > 0 && !id.includes(".") ? id : null;
}

================================================
FILE: apps/server/src/codexAppServerManager.test.ts
================================================
import { describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { ApprovalRequestId, ThreadId } from "@t3tools/contracts";

import {
buildCodexInitializeParams,
CODEX_DEFAULT_MODE_DEVELOPER_INSTRUCTIONS,
CODEX_PLAN_MODE_DEVELOPER_INSTRUCTIONS,
CodexAppServerManager,
classifyCodexStderrLine,
isRecoverableThreadResumeError,
normalizeCodexModelSlug,
readCodexAccountSnapshot,
resolveCodexModelForAccount,
} from "./codexAppServerManager";

const asThreadId = (value: string): ThreadId => ThreadId.makeUnsafe(value);

function createSendTurnHarness() {
const manager = new CodexAppServerManager();
const context = {
session: {
provider: "codex",
status: "ready",
threadId: "thread_1",
runtimeMode: "full-access",
model: "gpt-5.3-codex",
resumeCursor: { threadId: "thread_1" },
createdAt: "2026-02-10T00:00:00.000Z",
updatedAt: "2026-02-10T00:00:00.000Z",
},
account: {
type: "unknown",
planType: null,
sparkEnabled: true,
},
};

const requireSession = vi
.spyOn(
manager as unknown as { requireSession: (sessionId: string) => unknown },
"requireSession",
)
.mockReturnValue(context);
const sendRequest = vi
.spyOn(
manager as unknown as { sendRequest: (...args: unknown[]) => Promise<unknown> },
"sendRequest",
)
.mockResolvedValue({
turn: {
id: "turn_1",
},
});
const updateSession = vi
.spyOn(manager as unknown as { updateSession: (...args: unknown[]) => void }, "updateSession")
.mockImplementation(() => {});

return { manager, context, requireSession, sendRequest, updateSession };
}

function createThreadControlHarness() {
const manager = new CodexAppServerManager();
const context = {
session: {
provider: "codex",
status: "ready",
threadId: "thread_1",
runtimeMode: "full-access",
model: "gpt-5.3-codex",
resumeCursor: { threadId: "thread_1" },
createdAt: "2026-02-10T00:00:00.000Z",
updatedAt: "2026-02-10T00:00:00.000Z",
},
};

const requireSession = vi
.spyOn(
manager as unknown as { requireSession: (sessionId: string) => unknown },
"requireSession",
)
.mockReturnValue(context);
const sendRequest = vi.spyOn(
manager as unknown as { sendRequest: (...args: unknown[]) => Promise<unknown> },
"sendRequest",
);
const updateSession = vi
.spyOn(manager as unknown as { updateSession: (...args: unknown[]) => void }, "updateSession")
.mockImplementation(() => {});

return { manager, context, requireSession, sendRequest, updateSession };
}

function createPendingUserInputHarness() {
const manager = new CodexAppServerManager();
const context = {
session: {
provider: "codex",
status: "ready",
threadId: "thread_1",
runtimeMode: "full-access",
model: "gpt-5.3-codex",
resumeCursor: { threadId: "thread_1" },
createdAt: "2026-02-10T00:00:00.000Z",
updatedAt: "2026-02-10T00:00:00.000Z",
},
pendingUserInputs: new Map([
[
ApprovalRequestId.makeUnsafe("req-user-input-1"),
{
requestId: ApprovalRequestId.makeUnsafe("req-user-input-1"),
jsonRpcId: 42,
threadId: asThreadId("thread_1"),
},
],
]),
};

const requireSession = vi
.spyOn(
manager as unknown as { requireSession: (sessionId: string) => unknown },
"requireSession",
)
.mockReturnValue(context);
const writeMessage = vi
.spyOn(manager as unknown as { writeMessage: (...args: unknown[]) => void }, "writeMessage")
.mockImplementation(() => {});
const emitEvent = vi
.spyOn(manager as unknown as { emitEvent: (...args: unknown[]) => void }, "emitEvent")
.mockImplementation(() => {});

return { manager, context, requireSession, writeMessage, emitEvent };
}

describe("classifyCodexStderrLine", () => {
it("ignores empty lines", () => {
expect(classifyCodexStderrLine(" ")).toBeNull();
});

it("ignores non-error structured codex logs", () => {
const line =
"2026-02-08T04:24:19.241256Z WARN codex_core::features: unknown feature key in config: skills";
expect(classifyCodexStderrLine(line)).toBeNull();
});

it("ignores known benign rollout path errors", () => {
const line =
"\u001b[2m2026-02-08T04:24:20.085687Z\u001b[0m \u001b[31mERROR\u001b[0m \u001b[2mcodex_core::rollout::list\u001b[0m: state db missing rollout path for thread 019c3b6c-46b8-7b70-ad23-82f824d161fb";
expect(classifyCodexStderrLine(line)).toBeNull();
});

it("keeps unknown structured errors", () => {
const line = "2026-02-08T04:24:20.085687Z ERROR codex_core::runtime: unrecoverable failure";
expect(classifyCodexStderrLine(line)).toEqual({
message: line,
});
});

it("keeps plain stderr messages", () => {
const line = "fatal: permission denied";
expect(classifyCodexStderrLine(line)).toEqual({
message: line,
});
});
});

describe("normalizeCodexModelSlug", () => {
it("maps 5.3 aliases to gpt-5.3-codex", () => {
expect(normalizeCodexModelSlug("5.3")).toBe("gpt-5.3-codex");
expect(normalizeCodexModelSlug("gpt-5.3")).toBe("gpt-5.3-codex");
});

it("prefers codex id when model differs", () => {
expect(normalizeCodexModelSlug("gpt-5.3", "gpt-5.3-codex")).toBe("gpt-5.3-codex");
});

it("keeps non-aliased models as-is", () => {
expect(normalizeCodexModelSlug("gpt-5.2-codex")).toBe("gpt-5.2-codex");
expect(normalizeCodexModelSlug("gpt-5.2")).toBe("gpt-5.2");
});
});

describe("isRecoverableThreadResumeError", () => {
it("matches not-found resume errors", () => {
expect(
isRecoverableThreadResumeError(new Error("thread/resume failed: thread not found")),
).toBe(true);
});

it("ignores non-resume errors", () => {
expect(
isRecoverableThreadResumeError(new Error("thread/start failed: permission denied")),
).toBe(false);
});

it("ignores non-recoverable resume errors", () => {
expect(
isRecoverableThreadResumeError(
new Error("thread/resume failed: timed out waiting for server"),
),
).toBe(false);
});
});

describe("readCodexAccountSnapshot", () => {
it("disables spark for chatgpt plus accounts", () => {
expect(
readCodexAccountSnapshot({
type: "chatgpt",
email: "plus@example.com",
planType: "plus",
}),
).toEqual({
type: "chatgpt",
planType: "plus",
sparkEnabled: false,
});
});

it("keeps spark enabled for chatgpt pro accounts", () => {
expect(
readCodexAccountSnapshot({
type: "chatgpt",
email: "pro@example.com",
planType: "pro",
}),
).toEqual({
type: "chatgpt",
planType: "pro",
sparkEnabled: true,
});
});

it("keeps spark enabled for api key accounts", () => {
expect(
readCodexAccountSnapshot({
type: "apiKey",
}),
).toEqual({
type: "apiKey",
planType: null,
sparkEnabled: true,
});
});
});

describe("resolveCodexModelForAccount", () => {
it("falls back from spark to default for unsupported chatgpt plans", () => {
expect(
resolveCodexModelForAccount("gpt-5.3-codex-spark", {
type: "chatgpt",
planType: "plus",
sparkEnabled: false,
}),
).toBe("gpt-5.3-codex");
});

it("keeps spark for supported plans", () => {
expect(
resolveCodexModelForAccount("gpt-5.3-codex-spark", {
type: "chatgpt",
planType: "pro",
sparkEnabled: true,
}),
).toBe("gpt-5.3-codex-spark");
});
});

describe("startSession", () => {
it("enables Codex experimental api capabilities during initialize", () => {
expect(buildCodexInitializeParams()).toEqual({
clientInfo: {
name: "t3code_desktop",
title: "T3 Code Desktop",
version: "0.1.0",
},
capabilities: {
experimentalApi: true,
},
});
});

it("emits session/startFailed when resolving cwd throws before process launch", async () => {
const manager = new CodexAppServerManager();
const events: Array<{ method: string; kind: string; message?: string }> = [];
manager.on("event", (event) => {
events.push({
method: event.method,
kind: event.kind,
...(event.message ? { message: event.message } : {}),
});
});

    const processCwd = vi.spyOn(process, "cwd").mockImplementation(() => {
      throw new Error("cwd missing");
    });
    try {
      await expect(
        manager.startSession({
          threadId: asThreadId("thread-1"),
          provider: "codex",
          runtimeMode: "full-access",
        }),
      ).rejects.toThrow("cwd missing");
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({
        method: "session/startFailed",
        kind: "error",
        message: "cwd missing",
      });
    } finally {
      processCwd.mockRestore();
      manager.stopAll();
    }

});

it("fails fast with an upgrade message when codex is below the minimum supported version", async () => {
const manager = new CodexAppServerManager();
const events: Array<{ method: string; kind: string; message?: string }> = [];
manager.on("event", (event) => {
events.push({
method: event.method,
kind: event.kind,
...(event.message ? { message: event.message } : {}),
});
});

    const versionCheck = vi
      .spyOn(
        manager as unknown as {
          assertSupportedCodexCliVersion: (input: {
            binaryPath: string;
            cwd: string;
            homePath?: string;
          }) => void;
        },
        "assertSupportedCodexCliVersion",
      )
      .mockImplementation(() => {
        throw new Error(
          "Codex CLI v0.36.0 is too old for T3 Code. Upgrade to v0.37.0 or newer and restart T3 Code.",
        );
      });

    try {
      await expect(
        manager.startSession({
          threadId: asThreadId("thread-1"),
          provider: "codex",
          runtimeMode: "full-access",
        }),
      ).rejects.toThrow(
        "Codex CLI v0.36.0 is too old for T3 Code. Upgrade to v0.37.0 or newer and restart T3 Code.",
      );
      expect(versionCheck).toHaveBeenCalledTimes(1);
      expect(events).toEqual([
        {
          method: "session/startFailed",
          kind: "error",
          message:
            "Codex CLI v0.36.0 is too old for T3 Code. Upgrade to v0.37.0 or newer and restart T3 Code.",
        },
      ]);
    } finally {
      versionCheck.mockRestore();
      manager.stopAll();
    }

});
});

describe("sendTurn", () => {
it("sends text and image user input items to turn/start", async () => {
const { manager, context, requireSession, sendRequest, updateSession } =
createSendTurnHarness();

    const result = await manager.sendTurn({
      threadId: asThreadId("thread_1"),
      input: "Inspect this image",
      attachments: [
        {
          type: "image",
          url: "data:image/png;base64,AAAA",
        },
      ],
      model: "gpt-5.3",
      serviceTier: "fast",
      effort: "high",
    });

    expect(result).toEqual({
      threadId: "thread_1",
      turnId: "turn_1",
      resumeCursor: { threadId: "thread_1" },
    });
    expect(requireSession).toHaveBeenCalledWith("thread_1");
    expect(sendRequest).toHaveBeenCalledWith(context, "turn/start", {
      threadId: "thread_1",
      input: [
        {
          type: "text",
          text: "Inspect this image",
          text_elements: [],
        },
        {
          type: "image",
          url: "data:image/png;base64,AAAA",
        },
      ],
      model: "gpt-5.3-codex",
      serviceTier: "fast",
      effort: "high",
    });
    expect(updateSession).toHaveBeenCalledWith(context, {
      status: "running",
      activeTurnId: "turn_1",
      resumeCursor: { threadId: "thread_1" },
    });

});

it("supports image-only turns", async () => {
const { manager, context, sendRequest } = createSendTurnHarness();

    await manager.sendTurn({
      threadId: asThreadId("thread_1"),
      attachments: [
        {
          type: "image",
          url: "data:image/png;base64,BBBB",
        },
      ],
    });

    expect(sendRequest).toHaveBeenCalledWith(context, "turn/start", {
      threadId: "thread_1",
      input: [
        {
          type: "image",
          url: "data:image/png;base64,BBBB",
        },
      ],
      model: "gpt-5.3-codex",
    });

});

it("passes Codex plan mode as a collaboration preset on turn/start", async () => {
const { manager, context, sendRequest } = createSendTurnHarness();

    await manager.sendTurn({
      threadId: asThreadId("thread_1"),
      input: "Plan the work",
      interactionMode: "plan",
    });

    expect(sendRequest).toHaveBeenCalledWith(context, "turn/start", {
      threadId: "thread_1",
      input: [
        {
          type: "text",
          text: "Plan the work",
          text_elements: [],
        },
      ],
      model: "gpt-5.3-codex",
      collaborationMode: {
        mode: "plan",
        settings: {
          model: "gpt-5.3-codex",
          reasoning_effort: "medium",
          developer_instructions: CODEX_PLAN_MODE_DEVELOPER_INSTRUCTIONS,
        },
      },
    });

});

it("passes Codex default mode as a collaboration preset on turn/start", async () => {
const { manager, context, sendRequest } = createSendTurnHarness();

    await manager.sendTurn({
      threadId: asThreadId("thread_1"),
      input: "PLEASE IMPLEMENT THIS PLAN:\n- step 1",
      interactionMode: "default",
    });

    expect(sendRequest).toHaveBeenCalledWith(context, "turn/start", {
      threadId: "thread_1",
      input: [
        {
          type: "text",
          text: "PLEASE IMPLEMENT THIS PLAN:\n- step 1",
          text_elements: [],
        },
      ],
      model: "gpt-5.3-codex",
      collaborationMode: {
        mode: "default",
        settings: {
          model: "gpt-5.3-codex",
          reasoning_effort: "medium",
          developer_instructions: CODEX_DEFAULT_MODE_DEVELOPER_INSTRUCTIONS,
        },
      },
    });

});

it("keeps the session model when interaction mode is set without an explicit model", async () => {
const { manager, context, sendRequest } = createSendTurnHarness();
context.session.model = "gpt-5.2-codex";

    await manager.sendTurn({
      threadId: asThreadId("thread_1"),
      input: "Plan this with my current session model",
      interactionMode: "plan",
    });

    expect(sendRequest).toHaveBeenCalledWith(context, "turn/start", {
      threadId: "thread_1",
      input: [
        {
          type: "text",
          text: "Plan this with my current session model",
          text_elements: [],
        },
      ],
      model: "gpt-5.2-codex",
      collaborationMode: {
        mode: "plan",
        settings: {
          model: "gpt-5.2-codex",
          reasoning_effort: "medium",
          developer_instructions: CODEX_PLAN_MODE_DEVELOPER_INSTRUCTIONS,
        },
      },
    });

});

it("rejects empty turn input", async () => {
const { manager } = createSendTurnHarness();

    await expect(
      manager.sendTurn({
        threadId: asThreadId("thread_1"),
      }),
    ).rejects.toThrow("Turn input must include text or attachments.");

});
});

describe("thread checkpoint control", () => {
it("reads thread turns from thread/read", async () => {
const { manager, context, requireSession, sendRequest } = createThreadControlHarness();
sendRequest.mockResolvedValue({
thread: {
id: "thread_1",
turns: [
{
id: "turn_1",
items: [{ type: "userMessage", content: [{ type: "text", text: "hello" }] }],
},
],
},
});

    const result = await manager.readThread(asThreadId("thread_1"));

    expect(requireSession).toHaveBeenCalledWith("thread_1");
    expect(sendRequest).toHaveBeenCalledWith(context, "thread/read", {
      threadId: "thread_1",
      includeTurns: true,
    });
    expect(result).toEqual({
      threadId: "thread_1",
      turns: [
        {
          id: "turn_1",
          items: [{ type: "userMessage", content: [{ type: "text", text: "hello" }] }],
        },
      ],
    });

});

it("reads thread turns from flat thread/read responses", async () => {
const { manager, context, sendRequest } = createThreadControlHarness();
sendRequest.mockResolvedValue({
threadId: "thread_1",
turns: [
{
id: "turn_1",
items: [{ type: "userMessage", content: [{ type: "text", text: "hello" }] }],
},
],
});

    const result = await manager.readThread(asThreadId("thread_1"));

    expect(sendRequest).toHaveBeenCalledWith(context, "thread/read", {
      threadId: "thread_1",
      includeTurns: true,
    });
    expect(result).toEqual({
      threadId: "thread_1",
      turns: [
        {
          id: "turn_1",
          items: [{ type: "userMessage", content: [{ type: "text", text: "hello" }] }],
        },
      ],
    });

});

it("rolls back turns via thread/rollback and resets session running state", async () => {
const { manager, context, sendRequest, updateSession } = createThreadControlHarness();
sendRequest.mockResolvedValue({
thread: {
id: "thread_1",
turns: [],
},
});

    const result = await manager.rollbackThread(asThreadId("thread_1"), 2);

    expect(sendRequest).toHaveBeenCalledWith(context, "thread/rollback", {
      threadId: "thread_1",
      numTurns: 2,
    });
    expect(updateSession).toHaveBeenCalledWith(context, {
      status: "ready",
      activeTurnId: undefined,
    });
    expect(result).toEqual({
      threadId: "thread_1",
      turns: [],
    });

});
});

describe("respondToUserInput", () => {
it("serializes canonical answers to Codex native answer objects", async () => {
const { manager, context, requireSession, writeMessage, emitEvent } =
createPendingUserInputHarness();

    await manager.respondToUserInput(
      asThreadId("thread_1"),
      ApprovalRequestId.makeUnsafe("req-user-input-1"),
      {
        scope: "All request methods",
        compat: "Keep current envelope",
      },
    );

    expect(requireSession).toHaveBeenCalledWith("thread_1");
    expect(writeMessage).toHaveBeenCalledWith(context, {
      id: 42,
      result: {
        answers: {
          scope: { answers: ["All request methods"] },
          compat: { answers: ["Keep current envelope"] },
        },
      },
    });
    expect(emitEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "item/tool/requestUserInput/answered",
        payload: {
          requestId: "req-user-input-1",
          answers: {
            scope: { answers: ["All request methods"] },
            compat: { answers: ["Keep current envelope"] },
          },
        },
      }),
    );

});

it("preserves explicit empty multi-select answers", async () => {
const { manager, context, requireSession, writeMessage, emitEvent } =
createPendingUserInputHarness();

    await manager.respondToUserInput(
      asThreadId("thread_1"),
      ApprovalRequestId.makeUnsafe("req-user-input-1"),
      {
        scope: [],
      },
    );

    expect(requireSession).toHaveBeenCalledWith("thread_1");
    expect(writeMessage).toHaveBeenCalledWith(context, {
      id: 42,
      result: {
        answers: {
          scope: { answers: [] },
        },
      },
    });
    expect(emitEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "item/tool/requestUserInput/answered",
        payload: {
          requestId: "req-user-input-1",
          answers: {
            scope: { answers: [] },
          },
        },
      }),
    );

});

it("tracks file-read approval requests with the correct method", () => {
const manager = new CodexAppServerManager();
const context = {
session: {
sessionId: "sess_1",
provider: "codex",
status: "ready",
threadId: asThreadId("thread_1"),
resumeCursor: { threadId: "thread_1" },
createdAt: "2026-02-10T00:00:00.000Z",
updatedAt: "2026-02-10T00:00:00.000Z",
},
pendingApprovals: new Map(),
pendingUserInputs: new Map(),
};
type ApprovalRequestContext = {
session: typeof context.session;
pendingApprovals: typeof context.pendingApprovals;
pendingUserInputs: typeof context.pendingUserInputs;
};

    (
      manager as unknown as {
        handleServerRequest: (
          context: ApprovalRequestContext,
          request: Record<string, unknown>,
        ) => void;
      }
    ).handleServerRequest(context, {
      jsonrpc: "2.0",
      id: 42,
      method: "item/fileRead/requestApproval",
      params: {},
    });

    const request = Array.from(context.pendingApprovals.values())[0];
    expect(request?.requestKind).toBe("file-read");
    expect(request?.method).toBe("item/fileRead/requestApproval");

});
});

describe.skipIf(!process.env.CODEX_BINARY_PATH)("startSession live Codex resume", () => {
it(
"keeps prior thread history when resuming with a changed runtime mode",
async () => {
const workspaceDir = mkdtempSync(path.join(os.tmpdir(), "codex-live-resume-"));
writeFileSync(path.join(workspaceDir, "README.md"), "hello\n", "utf8");

      const manager = new CodexAppServerManager();

      try {
        const firstSession = await manager.startSession({
          threadId: asThreadId("thread-live"),
          provider: "codex",
          cwd: workspaceDir,
          runtimeMode: "full-access",
          providerOptions: {
            codex: {
              ...(process.env.CODEX_BINARY_PATH
                ? { binaryPath: process.env.CODEX_BINARY_PATH }
                : {}),
              ...(process.env.CODEX_HOME_PATH
                ? { homePath: process.env.CODEX_HOME_PATH }
                : {}),
            },
          },
        });

        const firstTurn = await manager.sendTurn({
          threadId: firstSession.threadId,
          input: `Reply with exactly the word ALPHA ${randomUUID()}`,
        });

        expect(firstTurn.threadId).toBe(firstSession.threadId);

        await vi.waitFor(async () => {
          const snapshot = await manager.readThread(firstSession.threadId);
          expect(snapshot.turns.length).toBeGreaterThan(0);
        }, { timeout: 120_000, interval: 1_000 });

        const firstSnapshot = await manager.readThread(firstSession.threadId);
        const originalThreadId = firstSnapshot.threadId;
        const originalTurnCount = firstSnapshot.turns.length;

        manager.stopSession(firstSession.threadId);

        const resumedSession = await manager.startSession({
          threadId: firstSession.threadId,
          provider: "codex",
          cwd: workspaceDir,
          runtimeMode: "approval-required",
          resumeCursor: firstSession.resumeCursor,
          providerOptions: {
            codex: {
              ...(process.env.CODEX_BINARY_PATH
                ? { binaryPath: process.env.CODEX_BINARY_PATH }
                : {}),
              ...(process.env.CODEX_HOME_PATH
                ? { homePath: process.env.CODEX_HOME_PATH }
                : {}),
            },
          },
        });

        expect(resumedSession.threadId).toBe(originalThreadId);

        const resumedSnapshotBeforeTurn = await manager.readThread(resumedSession.threadId);
        expect(resumedSnapshotBeforeTurn.threadId).toBe(originalThreadId);
        expect(resumedSnapshotBeforeTurn.turns.length).toBeGreaterThanOrEqual(originalTurnCount);

        await manager.sendTurn({
          threadId: resumedSession.threadId,
          input: `Reply with exactly the word BETA ${randomUUID()}`,
        });

        await vi.waitFor(async () => {
          const snapshot = await manager.readThread(resumedSession.threadId);
          expect(snapshot.turns.length).toBeGreaterThan(originalTurnCount);
        }, { timeout: 120_000, interval: 1_000 });
      } finally {
        manager.stopAll();
        rmSync(workspaceDir, { recursive: true, force: true });
      }
    },
    180_000,

);
});

================================================
FILE: apps/server/src/config.ts
================================================
/\*\*

- ServerConfig - Runtime configuration services.
-
- Defines process-level server configuration and networking helpers used by
- startup and runtime layers.
-
- @module ServerConfig
  \*/
  import { Effect, FileSystem, Layer, Path, ServiceMap } from "effect";

export const DEFAULT_PORT = 3773;

export type RuntimeMode = "web" | "desktop";

/\*\*

- ServerConfigShape - Process/runtime configuration required by the server.
  \*/
  export interface ServerConfigShape {
  readonly mode: RuntimeMode;
  readonly port: number;
  readonly host: string | undefined;
  readonly cwd: string;
  readonly keybindingsConfigPath: string;
  readonly stateDir: string;
  readonly staticDir: string | undefined;
  readonly devUrl: URL | undefined;
  readonly noBrowser: boolean;
  readonly authToken: string | undefined;
  readonly autoBootstrapProjectFromCwd: boolean;
  readonly logWebSocketEvents: boolean;
  }

/\*\*

- ServerConfig - Service tag for server runtime configuration.
  _/
  export class ServerConfig extends ServiceMap.Service<ServerConfig, ServerConfigShape>()(
  "t3/config/ServerConfig",
  ) {
  static readonly layerTest = (cwd: string, statedir: string) =>
  Layer.effect(
  ServerConfig,
  Effect.gen(function_ () {
  const path = yield\* Path.Path;
  return {
  cwd,
  stateDir: statedir,
  mode: "web",
  autoBootstrapProjectFromCwd: false,
  logWebSocketEvents: false,
  port: 0,
  host: undefined,
  authToken: undefined,
  keybindingsConfigPath: path.join(statedir, "keybindings.json"),
  staticDir: undefined,
  devUrl: undefined,
  noBrowser: false,
  };
  }),
  );
  }

export const resolveStaticDir = Effect.fn(function* () {
const { join, resolve } = yield* Path.Path;
const { exists } = yield* FileSystem.FileSystem;
const bundledClient = resolve(join(import.meta.dirname, "client"));
const bundledStat = yield* exists(join(bundledClient, "index.html")).pipe(
Effect.orElseSucceed(() => false),
);
if (bundledStat) {
return bundledClient;
}

const monorepoClient = resolve(join(import.meta.dirname, "../../web/dist"));
const monorepoStat = yield\* exists(join(monorepoClient, "index.html")).pipe(
Effect.orElseSucceed(() => false),
);
if (monorepoStat) {
return monorepoClient;
}
return undefined;
});

================================================
FILE: apps/server/src/imageMime.test.ts
================================================
import { describe, expect, it } from "vitest";

import { inferImageExtension, parseBase64DataUrl } from "./imageMime.ts";

describe("imageMime", () => {
it("parses base64 data URL with mime type", () => {
expect(parseBase64DataUrl("data:image/png;base64,SGVsbG8=")).toEqual({
mimeType: "image/png",
base64: "SGVsbG8=",
});
});

it("parses base64 data URL with mime parameters", () => {
expect(parseBase64DataUrl("data:image/png;charset=utf-8;base64,SGVsbG8=")).toEqual({
mimeType: "image/png",
base64: "SGVsbG8=",
});
});

it("rejects non-base64 data URL", () => {
expect(parseBase64DataUrl("data:image/png;charset=utf-8,hello")).toBeNull();
});

it("rejects missing mime type", () => {
expect(parseBase64DataUrl("data:;base64,SGVsbG8=")).toBeNull();
});

it("parses base64 data URL with spaces in payload", () => {
expect(parseBase64DataUrl("data:image/png;base64,SGVs bG8=\n")).toEqual({
mimeType: "image/png",
base64: "SGVsbG8=",
});
});

it("does not read inherited keys from mime extension map", () => {
expect(inferImageExtension({ mimeType: "constructor" })).toBe(".bin");
});
});

================================================
FILE: apps/server/src/imageMime.ts
================================================
import Mime from "@effect/platform-node/Mime";

export const IMAGE_EXTENSION_BY_MIME_TYPE: Record<string, string> = {
"image/avif": ".avif",
"image/bmp": ".bmp",
"image/gif": ".gif",
"image/heic": ".heic",
"image/heif": ".heif",
"image/jpeg": ".jpg",
"image/jpg": ".jpg",
"image/png": ".png",
"image/svg+xml": ".svg",
"image/tiff": ".tiff",
"image/webp": ".webp",
};

export const SAFE_IMAGE_FILE_EXTENSIONS = new Set([
".avif",
".bmp",
".gif",
".heic",
".heif",
".ico",
".jpeg",
".jpg",
".png",
".svg",
".tiff",
".webp",
]);

export function parseBase64DataUrl(
dataUrl: string,
): { readonly mimeType: string; readonly base64: string } | null {
const match = /^data:([^,]+),([a-z0-9+/=\r\n ]+)$/i.exec(dataUrl.trim());
if (!match) return null;

const headerParts = (match[1] ?? "")
.split(";")
.map((part) => part.trim())
.filter((part) => part.length > 0);
if (headerParts.length < 2) {
return null;
}
const trailingToken = headerParts.at(-1)?.toLowerCase();
if (trailingToken !== "base64") {
return null;
}

const mimeType = headerParts[0]?.toLowerCase();
const base64 = match[2]?.replace(/\s+/g, "");
if (!mimeType || !base64) return null;

return { mimeType, base64 };
}

export function inferImageExtension(input: { mimeType: string; fileName?: string }): string {
const key = input.mimeType.toLowerCase();
const fromMime = Object.hasOwn(IMAGE_EXTENSION_BY_MIME_TYPE, key)
? IMAGE_EXTENSION_BY_MIME_TYPE[key]
: undefined;
if (fromMime) {
return fromMime;
}

const fromMimeExtension = Mime.getExtension(input.mimeType);
if (fromMimeExtension && SAFE_IMAGE_FILE_EXTENSIONS.has(fromMimeExtension)) {
return fromMimeExtension;
}

const fileName = input.fileName?.trim() ?? "";
const extensionMatch = /\.([a-z0-9]{1,8})$/i.exec(fileName);
  const fileNameExtension = extensionMatch ? `.${extensionMatch[1]!.toLowerCase()}` : "";
if (SAFE_IMAGE_FILE_EXTENSIONS.has(fileNameExtension)) {
return fileNameExtension;
}

return ".bin";
}

================================================
FILE: apps/server/src/index.ts
================================================
import _ as NodeRuntime from "@effect/platform-node/NodeRuntime";
import _ as NodeServices from "@effect/platform-node/NodeServices";
import _ as Effect from "effect/Effect";
import _ as Layer from "effect/Layer";

import { CliConfig, t3Cli } from "./main";
import { OpenLive } from "./open";
import { Command } from "effect/unstable/cli";
import { version } from "../package.json" with { type: "json" };
import { ServerLive } from "./wsServer";
import { NetService } from "@t3tools/shared/Net";
import { FetchHttpClient } from "effect/unstable/http";

const RuntimeLayer = Layer.empty.pipe(
Layer.provideMerge(CliConfig.layer),
Layer.provideMerge(ServerLive),
Layer.provideMerge(OpenLive),
Layer.provideMerge(NetService.layer),
Layer.provideMerge(NodeServices.layer),
Layer.provideMerge(FetchHttpClient.layer),
);

Command.run(t3Cli, { version }).pipe(Effect.provide(RuntimeLayer), NodeRuntime.runMain);

================================================
FILE: apps/server/src/keybindings.test.ts
================================================
import { KeybindingCommand, KeybindingRule, KeybindingsConfig } from "@t3tools/contracts";
import \* as NodeServices from "@effect/platform-node/NodeServices";
import { assert, it } from "@effect/vitest";
import { assertFailure } from "@effect/vitest/utils";
import { Effect, FileSystem, Layer, Logger, Path, Schema } from "effect";
import { ServerConfig, type ServerConfigShape } from "./config";

import {
DEFAULT_KEYBINDINGS,
Keybindings,
KeybindingsConfigError,
KeybindingsLive,
ResolvedKeybindingFromConfig,
compileResolvedKeybindingRule,
compileResolvedKeybindingsConfig,
parseKeybindingShortcut,
} from "./keybindings";

const KeybindingsConfigJson = Schema.fromJsonString(KeybindingsConfig);
const makeKeybindingsLayer = () =>
KeybindingsLive.pipe(
Layer.provideMerge(
Layer.effect(
ServerConfig,
Effect.gen(function* () {
const fs = yield* FileSystem.FileSystem;
const { join } = yield* Path.Path;
const dir = yield* fs.makeTempDirectoryScoped({ prefix: "t3code-server-config-test-" });
const configPath = join(dir, "keybindings.json");
return { keybindingsConfigPath: configPath } as ServerConfigShape;
}),
),
),
);

const toDetailResult = <A, R>(effect: Effect.Effect<A, KeybindingsConfigError, R>) =>
effect.pipe(
Effect.mapError((error) => error.detail),
Effect.result,
);

const writeKeybindingsConfig = (configPath: string, rules: readonly KeybindingRule[]) =>
Effect.gen(function* () {
const fileSystem = yield* FileSystem.FileSystem;
const encoded = yield* Schema.encodeEffect(KeybindingsConfigJson)(rules);
yield* fileSystem.writeFileString(configPath, encoded);
});

const readKeybindingsConfig = (configPath: string) =>
Effect.gen(function* () {
const fileSystem = yield* FileSystem.FileSystem;
const rawConfig = yield* fileSystem.readFileString(configPath);
return yield* Schema.decodeUnknownEffect(KeybindingsConfigJson)(rawConfig);
});

it.layer(NodeServices.layer)("keybindings", (it) => {
it.effect("parses shortcuts including plus key", () =>
Effect.sync(() => {
assert.deepEqual(parseKeybindingShortcut("mod+j"), {
key: "j",
metaKey: false,
ctrlKey: false,
shiftKey: false,
altKey: false,
modKey: true,
});
assert.deepEqual(parseKeybindingShortcut("mod++"), {
key: "+",
metaKey: false,
ctrlKey: false,
shiftKey: false,
altKey: false,
modKey: true,
});
}),
);

it.effect("compiles valid rule with parsed when AST", () =>
Effect.sync(() => {
const compiled = compileResolvedKeybindingRule({
key: "mod+d",
command: "terminal.split",
when: "terminalOpen && !terminalFocus",
});

      assert.deepEqual(compiled, {
        command: "terminal.split",
        shortcut: {
          key: "d",
          metaKey: false,
          ctrlKey: false,
          shiftKey: false,
          altKey: false,
          modKey: true,
        },
        whenAst: {
          type: "and",
          left: { type: "identifier", name: "terminalOpen" },
          right: {
            type: "not",
            node: { type: "identifier", name: "terminalFocus" },
          },
        },
      });
    }),

);

it.effect("encodes resolved plus-key shortcuts", () =>
Effect.gen(function* () {
const encoded = yield* Schema.encodeEffect(ResolvedKeybindingFromConfig)({
command: "terminal.toggle",
shortcut: {
key: "+",
metaKey: false,
ctrlKey: false,
shiftKey: false,
altKey: false,
modKey: true,
},
});

      assert.equal(encoded.key, "mod++");
      assert.equal(encoded.command, "terminal.toggle");
    }),

);

it.effect("rejects invalid rules", () =>
Effect.sync(() => {
assert.isNull(
compileResolvedKeybindingRule({
key: "mod+shift+d+o",
command: "terminal.new",
}),
);

      assert.isNull(
        compileResolvedKeybindingRule({
          key: "mod+d",
          command: "terminal.split",
          when: "terminalFocus && (",
        }),
      );

      assert.isNull(
        compileResolvedKeybindingRule({
          key: "mod+d",
          command: "terminal.split",
          when: `${"!".repeat(300)}terminalFocus`,
        }),
      );
    }),

);

it.effect("bootstraps default keybindings when config file is missing", () =>
Effect.gen(function* () {
const fs = yield* FileSystem.FileSystem;
const { keybindingsConfigPath } = yield* ServerConfig;
assert.isFalse(yield* fs.exists(keybindingsConfigPath));

      yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        yield* keybindings.syncDefaultKeybindingsOnStartup;
      });

      const persisted = yield* readKeybindingsConfig(keybindingsConfigPath);
      assert.deepEqual(persisted, DEFAULT_KEYBINDINGS);
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("uses defaults in runtime when config is malformed without overriding file", () =>
Effect.gen(function* () {
const fs = yield* FileSystem.FileSystem;
const { keybindingsConfigPath } = yield* ServerConfig;
yield* fs.writeFileString(keybindingsConfigPath, "{ not-json");

      const configState = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        return yield* keybindings.loadConfigState;
      });

      assert.deepEqual(
        configState.keybindings,
        compileResolvedKeybindingsConfig(DEFAULT_KEYBINDINGS),
      );
      assert.deepEqual(configState.issues, [
        {
          kind: "keybindings.malformed-config",
          message: configState.issues[0]?.message ?? "",
        },
      ]);
      assert.equal(yield* fs.readFileString(keybindingsConfigPath), "{ not-json");
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("ignores invalid entries in runtime and reports them as issues", () =>
Effect.gen(function* () {
const fs = yield* FileSystem.FileSystem;
const { keybindingsConfigPath } = yield* ServerConfig;
yield* fs.writeFileString(
keybindingsConfigPath,
JSON.stringify([
{ key: "mod+j", command: "terminal.toggle" },
{ key: "mod+shift+d+o", command: "terminal.new" },
{ key: "mod+x", command: "invalid.command" },
]),
);

      const configState = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        return yield* keybindings.loadConfigState;
      });

      assert.isTrue(configState.keybindings.some((entry) => entry.command === "terminal.toggle"));
      assert.isFalse(configState.keybindings.some((entry) => String(entry.command) === "invalid.command"));
      assert.deepEqual(configState.issues, [
        {
          kind: "keybindings.invalid-entry",
          index: 1,
          message: configState.issues[0]?.message ?? "",
        },
        {
          kind: "keybindings.invalid-entry",
          index: 2,
          message: configState.issues[1]?.message ?? "",
        },
      ]);
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect(
"upserts missing default keybindings on startup without overriding existing command rules",
() =>
Effect.gen(function* () {
const { keybindingsConfigPath } = yield* ServerConfig;
yield\* writeKeybindingsConfig(keybindingsConfigPath, [
{ key: "mod+shift+t", command: "terminal.toggle" },
{ key: "mod+shift+r", command: "script.run-tests.run" },
]);

        yield* Effect.gen(function* () {
          const keybindings = yield* Keybindings;
          yield* keybindings.syncDefaultKeybindingsOnStartup;
        });

        const persisted = yield* readKeybindingsConfig(keybindingsConfigPath);
        const byCommand = new Map(persisted.map((entry) => [entry.command, entry]));

        const persistedToggle = byCommand.get("terminal.toggle");
        assert.isNotNull(persistedToggle);
        assert.equal(persistedToggle?.key, "mod+shift+t");
        assert.isFalse(
          persisted.some((entry) => entry.command === "terminal.toggle" && entry.key === "mod+j"),
        );

        for (const defaultRule of DEFAULT_KEYBINDINGS) {
          assert.isTrue(byCommand.has(defaultRule.command), `expected ${defaultRule.command}`);
        }
        assert.isTrue(byCommand.has("script.run-tests.run"));
      }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("skips conflicting default keybindings on startup and logs a detailed warning", () => {
const messages: string[] = [];
const logger = Logger.make(({ message }) => {
messages.push(String(message));
});

    return Effect.gen(function* () {
      const { keybindingsConfigPath } = yield* ServerConfig;
      yield* writeKeybindingsConfig(keybindingsConfigPath, [
        { key: "mod+j", command: "script.custom-action.run" },
      ]);

      yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        yield* keybindings.syncDefaultKeybindingsOnStartup;
      });

      const persisted = yield* readKeybindingsConfig(keybindingsConfigPath);
      assert.isFalse(persisted.some((entry) => entry.command === "terminal.toggle"));
      assert.isTrue(persisted.some((entry) => entry.command === "script.custom-action.run"));

      assert.isTrue(
        messages.some((message) =>
          message.includes("skipping default keybinding due to shortcut conflict"),
        ),
      );
    }).pipe(
      Effect.provide(
        Layer.mergeAll(
          makeKeybindingsLayer(),
          Logger.layer([logger], { mergeWithExisting: false }),
        ),
      ),
    );

});

it.effect("upserts custom keybindings to configured path", () =>
Effect.gen(function* () {
const { keybindingsConfigPath } = yield* ServerConfig;
yield\* writeKeybindingsConfig(keybindingsConfigPath, [
{ key: "mod+j", command: "terminal.toggle" },
]);

      const resolved = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        return yield* keybindings.upsertKeybindingRule({
          key: "mod+shift+r",
          command: "script.run-tests.run",
        });
      });

      const persisted = yield* readKeybindingsConfig(keybindingsConfigPath);
      const persistedView = persisted.map(({ key, command }) => ({ key, command }));

      assert.deepEqual(persistedView, [
        { key: "mod+j", command: "terminal.toggle" },
        { key: "mod+shift+r", command: "script.run-tests.run" },
      ]);
      assert.isTrue(resolved.some((entry) => entry.command === "script.run-tests.run"));
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("replaces existing custom keybinding for the same command", () =>
Effect.gen(function* () {
const { keybindingsConfigPath } = yield* ServerConfig;
yield* writeKeybindingsConfig(keybindingsConfigPath, [
{ key: "mod+r", command: "script.run-tests.run" },
]);
yield* Effect.gen(function* () {
const keybindings = yield* Keybindings;
return yield\* keybindings.upsertKeybindingRule({
key: "mod+shift+r",
command: "script.run-tests.run",
});
});

      const persisted = yield* readKeybindingsConfig(keybindingsConfigPath);
      const persistedView = persisted.map(({ key, command }) => ({ key, command }));
      assert.deepEqual(persistedView, [{ key: "mod+shift+r", command: "script.run-tests.run" }]);
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("refuses to overwrite malformed keybindings config", () =>
Effect.gen(function* () {
const fs = yield* FileSystem.FileSystem;
const { keybindingsConfigPath } = yield* ServerConfig;
yield* fs.writeFileString(keybindingsConfigPath, "{ not-json");

      const result = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        return yield* keybindings.upsertKeybindingRule({
          key: "mod+shift+r",
          command: "script.run-tests.run",
        });
      }).pipe(toDetailResult);
      assertFailure(result, "expected JSON array");

      const persistedRaw = yield* fs.readFileString(keybindingsConfigPath);
      assert.equal(persistedRaw, "{ not-json");
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("reports non-array config parse errors without duplicate prefix", () =>
Effect.gen(function* () {
const fs = yield* FileSystem.FileSystem;
const { keybindingsConfigPath } = yield* ServerConfig;
yield* fs.writeFileString(
keybindingsConfigPath,
'{"key":"mod+j","command":"terminal.toggle"}',
);

      const firstResult = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        return yield* keybindings.upsertKeybindingRule({
          key: "mod+shift+r",
          command: "script.run-tests.run",
        });
      }).pipe(toDetailResult);
      assertFailure(firstResult, "expected JSON array");

      const secondResult = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        return yield* keybindings.upsertKeybindingRule({
          key: "mod+shift+r",
          command: "script.run-tests.run",
        });
      }).pipe(toDetailResult);
      assertFailure(secondResult, "expected JSON array");
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("fails when config directory is not writable", () =>
Effect.gen(function* () {
const fs = yield* FileSystem.FileSystem;
const { keybindingsConfigPath } = yield* ServerConfig;
const { dirname } = yield* Path.Path;
yield* writeKeybindingsConfig(keybindingsConfigPath, [
{ key: "mod+j", command: "terminal.toggle" },
]);
yield* fs.chmod(dirname(keybindingsConfigPath), 0o500);

      const result = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        return yield* keybindings.upsertKeybindingRule({
          key: "mod+shift+r",
          command: "script.run-tests.run",
        });
      }).pipe(toDetailResult);
      assertFailure(result, "failed to write keybindings config");

      yield* fs.chmod(dirname(keybindingsConfigPath), 0o700);

      const persisted = yield* readKeybindingsConfig(keybindingsConfigPath);
      const persistedView = persisted.map(({ key, command }) => ({ key, command }));
      assert.deepEqual(persistedView, [{ key: "mod+j", command: "terminal.toggle" }]);
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("caches loaded resolved config across repeated reads", () =>
Effect.gen(function* () {
const { keybindingsConfigPath } = yield* ServerConfig;
yield\* writeKeybindingsConfig(keybindingsConfigPath, [
{ key: "mod+j", command: "terminal.toggle" },
]);

      const [first, second] = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        const firstLoad = (yield* keybindings.loadConfigState).keybindings;
        const secondLoad = (yield* keybindings.loadConfigState).keybindings;
        return [firstLoad, secondLoad] as const;
      });

      assert.deepEqual(first, second);
      assert.isTrue(second.some((entry) => entry.command === "terminal.toggle"));
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("updates cached resolved config after upsert", () =>
Effect.gen(function* () {
const { keybindingsConfigPath } = yield* ServerConfig;
yield\* writeKeybindingsConfig(keybindingsConfigPath, [
{ key: "mod+j", command: "terminal.toggle" },
]);

      const loadedAfterUpsert = yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        yield* keybindings.loadConfigState;
        yield* keybindings.upsertKeybindingRule({
          key: "mod+shift+r",
          command: "script.run-tests.run",
        });
        return (yield* keybindings.loadConfigState).keybindings;
      });

      assert.isTrue(loadedAfterUpsert.some((entry) => entry.command === "script.run-tests.run"));
      assert.isTrue(loadedAfterUpsert.some((entry) => entry.command === "terminal.toggle"));
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);

it.effect("serializes concurrent upserts to avoid lost updates", () =>
Effect.gen(function* () {
const { keybindingsConfigPath } = yield* ServerConfig;
yield\* writeKeybindingsConfig(keybindingsConfigPath, []);

      const commands = Array.from(
        { length: 20 },
        (_, index): KeybindingCommand => `script.concurrent-${index}.run`,
      );
      yield* Effect.gen(function* () {
        const keybindings = yield* Keybindings;
        yield* Effect.all(
          commands.map((command, index) =>
            keybindings.upsertKeybindingRule({
              key: `mod+${String.fromCharCode(97 + index)}`,
              command,
            }),
          ),
          { concurrency: "unbounded", discard: true },
        );
      });

      const persisted = yield* readKeybindingsConfig(keybindingsConfigPath);
      const persistedCommands = new Set(persisted.map((entry) => entry.command));
      for (const command of commands) {
        assert.isTrue(persistedCommands.has(command), `expected persisted command ${command}`);
      }
    }).pipe(Effect.provide(makeKeybindingsLayer())),

);
});

================================================
FILE: apps/server/src/keybindings.ts
================================================
/\*\*

- Keybindings - Keybinding configuration service definitions.
-
- Owns parsing, validation, merge, and persistence of user keybinding
- configuration consumed by the server runtime.
-
- @module Keybindings
  _/
  import {
  KeybindingRule,
  KeybindingsConfig,
  KeybindingShortcut,
  KeybindingWhenNode,
  MAX_KEYBINDINGS_COUNT,
  MAX_WHEN_EXPRESSION_DEPTH,
  ResolvedKeybindingRule,
  ResolvedKeybindingsConfig,
  type ServerConfigIssue,
  } from "@t3tools/contracts";
  import { Mutable } from "effect/Types";
  import {
  Array,
  Cache,
  Cause,
  Effect,
  FileSystem,
  Path,
  Layer,
  Option,
  Predicate,
  PubSub,
  Schema,
  SchemaGetter,
  SchemaIssue,
  SchemaTransformation,
  ServiceMap,
  Stream,
  } from "effect";
  import _ as Semaphore from "effect/Semaphore";
  import { ServerConfig } from "./config";

export class KeybindingsConfigError extends Schema.TaggedErrorClass<KeybindingsConfigError>()(
"KeybindingsConfigParseError",
{
configPath: Schema.String,
detail: Schema.String,
cause: Schema.optional(Schema.Defect),
},
) {
override get message(): string {
return `Unable to parse keybindings config at ${this.configPath}: ${this.detail}`;
}
}

type WhenToken =
| { type: "identifier"; value: string }
| { type: "not" }
| { type: "and" }
| { type: "or" }
| { type: "lparen" }
| { type: "rparen" };

export const DEFAULT_KEYBINDINGS: ReadonlyArray<KeybindingRule> = [
{ key: "mod+j", command: "terminal.toggle" },
{ key: "mod+d", command: "terminal.split", when: "terminalFocus" },
{ key: "mod+n", command: "terminal.new", when: "terminalFocus" },
{ key: "mod+w", command: "terminal.close", when: "terminalFocus" },
{ key: "mod+d", command: "diff.toggle", when: "!terminalFocus" },
{ key: "mod+n", command: "chat.new", when: "!terminalFocus" },
{ key: "mod+shift+o", command: "chat.new", when: "!terminalFocus" },
{ key: "mod+shift+n", command: "chat.newLocal", when: "!terminalFocus" },
{ key: "mod+o", command: "editor.openFavorite" },
];

function normalizeKeyToken(token: string): string {
if (token === "space") return " ";
if (token === "esc") return "escape";
return token;
}

/\*_ @internal - Exported for testing _/
export function parseKeybindingShortcut(value: string): KeybindingShortcut | null {
const rawTokens = value
.toLowerCase()
.split("+")
.map((token) => token.trim());
const tokens = [...rawTokens];
let trailingEmptyCount = 0;
while (tokens[tokens.length - 1] === "") {
trailingEmptyCount += 1;
tokens.pop();
}
if (trailingEmptyCount > 0) {
tokens.push("+");
}
if (tokens.some((token) => token.length === 0)) {
return null;
}
if (tokens.length === 0) return null;

let key: string | null = null;
let metaKey = false;
let ctrlKey = false;
let shiftKey = false;
let altKey = false;
let modKey = false;

for (const token of tokens) {
switch (token) {
case "cmd":
case "meta":
metaKey = true;
break;
case "ctrl":
case "control":
ctrlKey = true;
break;
case "shift":
shiftKey = true;
break;
case "alt":
case "option":
altKey = true;
break;
case "mod":
modKey = true;
break;
default: {
if (key !== null) return null;
key = normalizeKeyToken(token);
}
}
}

if (key === null) return null;
return {
key,
metaKey,
ctrlKey,
shiftKey,
altKey,
modKey,
};
}

function tokenizeWhenExpression(expression: string): WhenToken[] | null {
const tokens: WhenToken[] = [];
let index = 0;

while (index < expression.length) {
const current = expression[index];
if (!current) break;

    if (/\s/.test(current)) {
      index += 1;
      continue;
    }
    if (expression.startsWith("&&", index)) {
      tokens.push({ type: "and" });
      index += 2;
      continue;
    }
    if (expression.startsWith("||", index)) {
      tokens.push({ type: "or" });
      index += 2;
      continue;
    }
    if (current === "!") {
      tokens.push({ type: "not" });
      index += 1;
      continue;
    }
    if (current === "(") {
      tokens.push({ type: "lparen" });
      index += 1;
      continue;
    }
    if (current === ")") {
      tokens.push({ type: "rparen" });
      index += 1;
      continue;
    }

    const identifier = /^[A-Za-z_][A-Za-z0-9_.-]*/.exec(expression.slice(index));
    if (!identifier) {
      return null;
    }
    tokens.push({ type: "identifier", value: identifier[0] });
    index += identifier[0].length;

}

return tokens;
}

function parseKeybindingWhenExpression(expression: string): KeybindingWhenNode | null {
const tokens = tokenizeWhenExpression(expression);
if (!tokens || tokens.length === 0) return null;
let index = 0;

const parsePrimary = (depth: number): KeybindingWhenNode | null => {
if (depth > MAX_WHEN_EXPRESSION_DEPTH) {
return null;
}
const token = tokens[index];
if (!token) return null;

    if (token.type === "identifier") {
      index += 1;
      return { type: "identifier", name: token.value };
    }

    if (token.type === "lparen") {
      index += 1;
      const expressionNode = parseOr(depth + 1);
      const closeToken = tokens[index];
      if (!expressionNode || !closeToken || closeToken.type !== "rparen") {
        return null;
      }
      index += 1;
      return expressionNode;
    }

    return null;

};

const parseUnary = (depth: number): KeybindingWhenNode | null => {
let notCount = 0;
while (tokens[index]?.type === "not") {
index += 1;
notCount += 1;
if (notCount > MAX_WHEN_EXPRESSION_DEPTH) {
return null;
}
}

    let node = parsePrimary(depth);
    if (!node) return null;

    while (notCount > 0) {
      node = { type: "not", node };
      notCount -= 1;
    }

    return node;

};

const parseAnd = (depth: number): KeybindingWhenNode | null => {
let left = parseUnary(depth);
if (!left) return null;

    while (tokens[index]?.type === "and") {
      index += 1;
      const right = parseUnary(depth);
      if (!right) return null;
      left = { type: "and", left, right };
    }

    return left;

};

const parseOr = (depth: number): KeybindingWhenNode | null => {
let left = parseAnd(depth);
if (!left) return null;

    while (tokens[index]?.type === "or") {
      index += 1;
      const right = parseAnd(depth);
      if (!right) return null;
      left = { type: "or", left, right };
    }

    return left;

};

const ast = parseOr(0);
if (!ast || index !== tokens.length) return null;
return ast;
}

/\*_ @internal - Exported for testing _/
export function compileResolvedKeybindingRule(rule: KeybindingRule): ResolvedKeybindingRule | null {
const shortcut = parseKeybindingShortcut(rule.key);
if (!shortcut) return null;

if (rule.when !== undefined) {
const whenAst = parseKeybindingWhenExpression(rule.when);
if (!whenAst) return null;
return {
command: rule.command,
shortcut,
whenAst,
};
}

return {
command: rule.command,
shortcut,
};
}

export function compileResolvedKeybindingsConfig(
config: KeybindingsConfig,
): ResolvedKeybindingsConfig {
const compiled: Mutable<ResolvedKeybindingsConfig> = [];
for (const rule of config) {
const result = Schema.decodeExit(ResolvedKeybindingFromConfig)(rule);
if (result.\_tag === "Success") {
compiled.push(result.value);
}
}
return compiled;
}

export const ResolvedKeybindingFromConfig = KeybindingRule.pipe(
Schema.decodeTo(
Schema.toType(ResolvedKeybindingRule),
SchemaTransformation.transformOrFail({
decode: (rule) =>
Effect.succeed(compileResolvedKeybindingRule(rule)).pipe(
Effect.filterOrFail(
Predicate.isNotNull,
() =>
new SchemaIssue.InvalidValue(Option.some(rule), {
title: "Invalid keybinding rule",
}),
),
Effect.map((resolved) => resolved),
),

      encode: (resolved) =>
        Effect.gen(function* () {
          const key = encodeShortcut(resolved.shortcut);
          if (!key) {
            return yield* Effect.fail(
              new SchemaIssue.InvalidValue(Option.some(resolved), {
                title: "Resolved shortcut cannot be encoded to key string",
              }),
            );
          }

          const when = resolved.whenAst ? encodeWhenAst(resolved.whenAst) : undefined;
          return {
            key,
            command: resolved.command,
            when,
          };
        }),
    }),

),
);

export const ResolvedKeybindingsFromConfig = Schema.Array(ResolvedKeybindingFromConfig).check(
Schema.isMaxLength(MAX_KEYBINDINGS_COUNT),
);

function isSameKeybindingRule(left: KeybindingRule, right: KeybindingRule): boolean {
return (
left.command === right.command &&
left.key === right.key &&
(left.when ?? undefined) === (right.when ?? undefined)
);
}

function keybindingShortcutContext(rule: KeybindingRule): string | null {
const parsed = parseKeybindingShortcut(rule.key);
if (!parsed) return null;
const encoded = encodeShortcut(parsed);
if (!encoded) return null;
return `${encoded}\u0000${rule.when ?? ""}`;
}

function hasSameShortcutContext(left: KeybindingRule, right: KeybindingRule): boolean {
const leftContext = keybindingShortcutContext(left);
const rightContext = keybindingShortcutContext(right);
if (!leftContext || !rightContext) return false;
return leftContext === rightContext;
}

function encodeShortcut(shortcut: KeybindingShortcut): string | null {
const modifiers: string[] = [];
if (shortcut.modKey) modifiers.push("mod");
if (shortcut.metaKey) modifiers.push("meta");
if (shortcut.ctrlKey) modifiers.push("ctrl");
if (shortcut.altKey) modifiers.push("alt");
if (shortcut.shiftKey) modifiers.push("shift");
if (!shortcut.key) return null;
if (shortcut.key !== "+" && shortcut.key.includes("+")) return null;
const key = shortcut.key === " " ? "space" : shortcut.key;
return [...modifiers, key].join("+");
}

function encodeWhenAst(node: KeybindingWhenNode): string {
switch (node.type) {
case "identifier":
return node.name;
case "not":
return `!(${encodeWhenAst(node.node)})`;
case "and":
return `(${encodeWhenAst(node.left)} && ${encodeWhenAst(node.right)})`;
case "or":
return `(${encodeWhenAst(node.left)} || ${encodeWhenAst(node.right)})`;
}
}

const DEFAULT_RESOLVED_KEYBINDINGS = compileResolvedKeybindingsConfig(DEFAULT_KEYBINDINGS);

const RawKeybindingsEntries = Schema.fromJsonString(Schema.Array(Schema.Unknown));
const KeybindingsConfigJson = Schema.fromJsonString(KeybindingsConfig);
const PrettyJsonString = SchemaGetter.parseJson<string>().compose(
SchemaGetter.stringifyJson({ space: 2 }),
);
const KeybindingsConfigPrettyJson = KeybindingsConfigJson.pipe(
Schema.encode({
decode: PrettyJsonString,
encode: PrettyJsonString,
}),
);

export interface KeybindingsConfigState {
readonly keybindings: ResolvedKeybindingsConfig;
readonly issues: readonly ServerConfigIssue[];
}

export interface KeybindingsChangeEvent {
readonly issues: readonly ServerConfigIssue[];
}

function trimIssueMessage(message: string): string {
const trimmed = message.trim();
return trimmed.length > 0 ? trimmed : "Invalid keybindings configuration.";
}

function malformedConfigIssue(detail: string): ServerConfigIssue {
return {
kind: "keybindings.malformed-config",
message: trimIssueMessage(detail),
};
}

function invalidEntryIssue(index: number, detail: string): ServerConfigIssue {
return {
kind: "keybindings.invalid-entry",
index,
message: trimIssueMessage(detail),
};
}

function mergeWithDefaultKeybindings(custom: ResolvedKeybindingsConfig): ResolvedKeybindingsConfig {
if (custom.length === 0) {
return [...DEFAULT_RESOLVED_KEYBINDINGS];
}

const overriddenCommands = new Set(custom.map((binding) => binding.command));
const retainedDefaults = DEFAULT_RESOLVED_KEYBINDINGS.filter(
(binding) => !overriddenCommands.has(binding.command),
);
const merged = [...retainedDefaults, ...custom];

if (merged.length <= MAX_KEYBINDINGS_COUNT) {
return merged;
}

// Keep the latest rules when the config exceeds max size; later rules have higher precedence.
return merged.slice(-MAX_KEYBINDINGS_COUNT);
}

/\*\*

- KeybindingsShape - Service API for keybinding configuration operations.
  \*/
  export interface KeybindingsShape {
  /\*\*
  - Ensure the on-disk keybindings file exists and includes all default
  - commands so newly-added defaults are backfilled on startup.
    \*/
    readonly syncDefaultKeybindingsOnStartup: Effect.Effect<void, KeybindingsConfigError>;

/\*\*

- Load runtime keybindings state along with non-fatal configuration issues.
  \*/
  readonly loadConfigState: Effect.Effect<KeybindingsConfigState, KeybindingsConfigError>;

/\*\*

- Stream keybindings config change events.
  \*/
  readonly changes: Stream.Stream<KeybindingsChangeEvent>;

/\*\*

- Upsert a keybinding rule and persist the resulting configuration.
-
- Writes config atomically and enforces the max rule count by truncating
- oldest entries when needed.
  \*/
  readonly upsertKeybindingRule: (
  rule: KeybindingRule,
  ) => Effect.Effect<ResolvedKeybindingsConfig, KeybindingsConfigError>;
  }

/\*\*

- Keybindings - Service tag for keybinding configuration operations.
  \*/
  export class Keybindings extends ServiceMap.Service<Keybindings, KeybindingsShape>()(
  "t3/keybindings",
  ) {}

const makeKeybindings = Effect.gen(function* () {
const { keybindingsConfigPath } = yield* ServerConfig;
const fs = yield* FileSystem.FileSystem;
const path = yield* Path.Path;
const upsertSemaphore = yield* Semaphore.make(1);
const resolvedConfigCacheKey = "resolved" as const;
const changesPubSub = yield* PubSub.unbounded<KeybindingsChangeEvent>();

const emitChange = (issues: readonly ServerConfigIssue[]) =>
PubSub.publish(changesPubSub, { issues }).pipe(Effect.asVoid);

const readConfigExists = fs.exists(keybindingsConfigPath).pipe(
Effect.mapError(
(cause) =>
new KeybindingsConfigError({
configPath: keybindingsConfigPath,
detail: "failed to access keybindings config",
cause,
}),
),
);

const readRawConfig = fs.readFileString(keybindingsConfigPath).pipe(
Effect.mapError(
(cause) =>
new KeybindingsConfigError({
configPath: keybindingsConfigPath,
detail: "failed to read keybindings config",
cause,
}),
),
);

const loadWritableCustomKeybindingsConfig = Effect.fn(function\* (): Effect.fn.Return<
readonly KeybindingRule[],
KeybindingsConfigError

> {

    if (!(yield* readConfigExists)) {
      return [];
    }

    const rawConfig = yield* readRawConfig.pipe(
      Effect.flatMap(Schema.decodeEffect(RawKeybindingsEntries)),
      Effect.mapError(
        (cause) =>
          new KeybindingsConfigError({
            configPath: keybindingsConfigPath,
            detail: "expected JSON array",
            cause,
          }),
      ),
    );

    return yield* Effect.forEach(rawConfig, (entry) =>
      Effect.gen(function* () {
        const decodedRule = Schema.decodeUnknownExit(KeybindingRule)(entry);
        if (decodedRule._tag === "Failure") {
          yield* Effect.logWarning("ignoring invalid keybinding entry", {
            path: keybindingsConfigPath,
            entry,
            error: Cause.pretty(decodedRule.cause),
          });
          return null;
        }
        const resolved = Schema.decodeExit(ResolvedKeybindingFromConfig)(decodedRule.value);
        if (resolved._tag === "Failure") {
          yield* Effect.logWarning("ignoring invalid keybinding entry", {
            path: keybindingsConfigPath,
            entry,
            error: Cause.pretty(resolved.cause),
          });
          return null;
        }
        return decodedRule.value;
      }),
    ).pipe(Effect.map(Array.filter(Predicate.isNotNull)));

});

const loadRuntimeCustomKeybindingsConfig = Effect.fn(function\* (): Effect.fn.Return<
{
readonly keybindings: readonly KeybindingRule[];
readonly issues: readonly ServerConfigIssue[];
},
KeybindingsConfigError

> {

    if (!(yield* readConfigExists)) {
      return { keybindings: [], issues: [] };
    }

    const rawConfig = yield* readRawConfig;
    const decodedEntries = Schema.decodeUnknownExit(RawKeybindingsEntries)(rawConfig);
    if (decodedEntries._tag === "Failure") {
      const detail = `expected JSON array (${Cause.pretty(decodedEntries.cause)})`;
      return {
        keybindings: [],
        issues: [malformedConfigIssue(detail)],
      };
    }

    const keybindings: KeybindingRule[] = [];
    const issues: ServerConfigIssue[] = [];
    for (const [index, entry] of decodedEntries.value.entries()) {
      const decodedRule = Schema.decodeUnknownExit(KeybindingRule)(entry);
      if (decodedRule._tag === "Failure") {
        const detail = Cause.pretty(decodedRule.cause);
        issues.push(invalidEntryIssue(index, detail));
        yield* Effect.logWarning("ignoring invalid keybinding entry", {
          path: keybindingsConfigPath,
          index,
          entry,
          error: detail,
        });
        continue;
      }

      const resolvedRule = Schema.decodeExit(ResolvedKeybindingFromConfig)(decodedRule.value);
      if (resolvedRule._tag === "Failure") {
        const detail = Cause.pretty(resolvedRule.cause);
        issues.push(invalidEntryIssue(index, detail));
        yield* Effect.logWarning("ignoring invalid keybinding entry", {
          path: keybindingsConfigPath,
          index,
          entry,
          error: detail,
        });
        continue;
      }
      keybindings.push(decodedRule.value);
    }

    return { keybindings, issues };

});

const writeConfigAtomically = (rules: readonly KeybindingRule[]) => {
const tempPath = `${keybindingsConfigPath}.${process.pid}.${Date.now()}.tmp`;

    return Schema.encodeEffect(KeybindingsConfigPrettyJson)(rules).pipe(
      Effect.map((encoded) => `${encoded}\n`),
      Effect.tap(() => fs.makeDirectory(path.dirname(keybindingsConfigPath), { recursive: true })),
      Effect.tap((encoded) => fs.writeFileString(tempPath, encoded)),
      Effect.flatMap(() => fs.rename(tempPath, keybindingsConfigPath)),
      Effect.mapError(
        (cause) =>
          new KeybindingsConfigError({
            configPath: keybindingsConfigPath,
            detail: "failed to write keybindings config",
            cause,
          }),
      ),
    );

};

const loadConfigStateFromDisk = loadRuntimeCustomKeybindingsConfig().pipe(
Effect.map(({ keybindings, issues }) => ({
keybindings: mergeWithDefaultKeybindings(compileResolvedKeybindingsConfig(keybindings)),
issues,
})),
);

const resolvedConfigCache = yield\* Cache.make<
typeof resolvedConfigCacheKey,
KeybindingsConfigState,
KeybindingsConfigError

> ({

    capacity: 1,
    lookup: () => loadConfigStateFromDisk,

});

const loadConfigStateFromCacheOrDisk = Cache.get(resolvedConfigCache, resolvedConfigCacheKey);

const revalidateAndEmit = upsertSemaphore.withPermits(1)(
Effect.gen(function* () {
yield* Cache.invalidate(resolvedConfigCache, resolvedConfigCacheKey);
const configState = yield* loadConfigStateFromCacheOrDisk;
yield* emitChange(configState.issues);
}),
);

const keybindingsConfigDir = path.dirname(keybindingsConfigPath);
const keybindingsConfigFile = path.basename(keybindingsConfigPath);
const keybindingsConfigPathResolved = path.resolve(keybindingsConfigPath);
yield* fs
.makeDirectory(keybindingsConfigDir, { recursive: true })
.pipe(Effect.orElseSucceed(() => undefined));
yield* Stream.runForEach(fs.watch(keybindingsConfigDir), (event) => {
const isTargetConfigEvent =
event.path === keybindingsConfigFile ||
event.path === keybindingsConfigPath ||
path.resolve(keybindingsConfigDir, event.path) === keybindingsConfigPathResolved;
if (!isTargetConfigEvent) {
return Effect.void;
}
return revalidateAndEmit.pipe(
Effect.catch((error) =>
Effect.logWarning("failed to revalidate keybindings config after file update", {
path: keybindingsConfigPath,
detail: error.detail,
cause: error.cause,
}),
),
);
}).pipe(
Effect.catch((cause) =>
Effect.logWarning("keybindings config watcher stopped unexpectedly", {
path: keybindingsConfigPath,
cause,
}),
),
Effect.forkScoped,
);

const syncDefaultKeybindingsOnStartup = upsertSemaphore.withPermits(1)(
Effect.gen(function* () {
const configExists = yield* readConfigExists;
if (!configExists) {
yield* writeConfigAtomically(DEFAULT_KEYBINDINGS);
yield* Cache.invalidate(resolvedConfigCache, resolvedConfigCacheKey);
return;
}

      const runtimeConfig = yield* loadRuntimeCustomKeybindingsConfig();
      if (runtimeConfig.issues.length > 0) {
        yield* Effect.logWarning(
          "skipping startup keybindings default sync because config has issues",
          {
            path: keybindingsConfigPath,
            issues: runtimeConfig.issues,
          },
        );
        yield* Cache.invalidate(resolvedConfigCache, resolvedConfigCacheKey);
        return;
      }
      const customConfig = runtimeConfig.keybindings;
      const existingCommands = new Set(customConfig.map((entry) => entry.command));
      const missingDefaults: KeybindingRule[] = [];
      const shortcutConflictWarnings: Array<{
        defaultCommand: KeybindingRule["command"];
        conflictingCommand: KeybindingRule["command"];
        key: string;
        when: string | null;
      }> = [];
      for (const defaultRule of DEFAULT_KEYBINDINGS) {
        if (existingCommands.has(defaultRule.command)) {
          continue;
        }
        const conflictingEntry = customConfig.find((entry) =>
          hasSameShortcutContext(entry, defaultRule),
        );
        if (conflictingEntry) {
          shortcutConflictWarnings.push({
            defaultCommand: defaultRule.command,
            conflictingCommand: conflictingEntry.command,
            key: defaultRule.key,
            when: defaultRule.when ?? null,
          });
          continue;
        }
        missingDefaults.push(defaultRule);
      }
      for (const conflict of shortcutConflictWarnings) {
        yield* Effect.logWarning("skipping default keybinding due to shortcut conflict", {
          path: keybindingsConfigPath,
          defaultCommand: conflict.defaultCommand,
          conflictingCommand: conflict.conflictingCommand,
          key: conflict.key,
          when: conflict.when,
          reason: "shortcut context already used by existing rule",
        });
      }
      if (missingDefaults.length === 0) {
        yield* Cache.invalidate(resolvedConfigCache, resolvedConfigCacheKey);
        return;
      }

      const matchingDefaults = DEFAULT_KEYBINDINGS.filter((defaultRule) =>
        customConfig.some((entry) => isSameKeybindingRule(entry, defaultRule)),
      ).map((rule) => rule.command);
      if (matchingDefaults.length > 0) {
        yield* Effect.logWarning("default keybinding rule already defined in user config", {
          path: keybindingsConfigPath,
          commands: matchingDefaults,
        });
      }

      const nextConfig = [...customConfig, ...missingDefaults];
      const cappedConfig =
        nextConfig.length > MAX_KEYBINDINGS_COUNT
          ? nextConfig.slice(-MAX_KEYBINDINGS_COUNT)
          : nextConfig;
      if (nextConfig.length > MAX_KEYBINDINGS_COUNT) {
        yield* Effect.logWarning("truncating keybindings config to max entries", {
          path: keybindingsConfigPath,
          maxEntries: MAX_KEYBINDINGS_COUNT,
        });
      }

      yield* writeConfigAtomically(cappedConfig);
      yield* Cache.invalidate(resolvedConfigCache, resolvedConfigCacheKey);
    }),

);

return {
syncDefaultKeybindingsOnStartup,
loadConfigState: loadConfigStateFromCacheOrDisk,
changes: Stream.fromPubSub(changesPubSub),
upsertKeybindingRule: (rule) =>
upsertSemaphore.withPermits(1)(
Effect.gen(function* () {
const customConfig = yield* loadWritableCustomKeybindingsConfig();
const nextConfig = [
...customConfig.filter((entry) => entry.command !== rule.command),
rule,
];
const cappedConfig =
nextConfig.length > MAX_KEYBINDINGS_COUNT
? nextConfig.slice(-MAX_KEYBINDINGS_COUNT)
: nextConfig;
if (nextConfig.length > MAX_KEYBINDINGS_COUNT) {
yield* Effect.logWarning("truncating keybindings config to max entries", {
path: keybindingsConfigPath,
maxEntries: MAX_KEYBINDINGS_COUNT,
});
}
yield* writeConfigAtomically(cappedConfig);
const nextResolved = mergeWithDefaultKeybindings(
compileResolvedKeybindingsConfig(cappedConfig),
);
yield* Cache.set(resolvedConfigCache, resolvedConfigCacheKey, {
keybindings: nextResolved,
issues: [],
});
yield* emitChange([]);
return nextResolved;
}),
),
} satisfies KeybindingsShape;
});

export const KeybindingsLive = Layer.effect(Keybindings, makeKeybindings);

================================================
FILE: apps/server/src/logger.ts
================================================
import util from "node:util";

type LogLevel = "info" | "warn" | "error" | "event";

type LogContext = Record<string, unknown>;

const ANSI = {
reset: "\u001b[0m",
dim: "\u001b[2m",
cyan: "\u001b[36m",
yellow: "\u001b[33m",
red: "\u001b[31m",
magenta: "\u001b[35m",
} as const;

const LEVEL_LABEL: Record<LogLevel, string> = {
info: "INFO",
warn: "WARN",
error: "ERROR",
event: "EVENT",
};

const LEVEL_COLOR: Record<LogLevel, string> = {
info: ANSI.cyan,
warn: ANSI.yellow,
error: ANSI.red,
event: ANSI.magenta,
};

function useColors() {
return Boolean(process.stdout.isTTY) && process.env.NO_COLOR === undefined;
}

function colorize(value: string, color: string, enabled: boolean) {
return enabled ? `${color}${value}${ANSI.reset}` : value;
}

function timeStamp() {
return new Date().toISOString().slice(11, 23);
}

function formatValue(value: unknown) {
if (typeof value === "string") {
return JSON.stringify(value);
}
if (
typeof value === "number" ||
typeof value === "boolean" ||
value === null ||
value === undefined
) {
return String(value);
}
return util.inspect(value, {
depth: 4,
breakLength: Infinity,
compact: true,
maxArrayLength: 25,
maxStringLength: 320,
});
}

function formatContext(context: LogContext | undefined) {
if (!context) return "";
const entries = Object.entries(context).filter(([, value]) => value !== undefined);
if (entries.length === 0) return "";
return entries.map(([key, value]) => `${key}=${formatValue(value)}`).join(" ");
}

function write(level: LogLevel, scope: string, message: string, context?: LogContext) {
const colorEnabled = useColors();
const ts = colorize(timeStamp(), ANSI.dim, colorEnabled);
const levelLabel = colorize(LEVEL_LABEL[level], LEVEL_COLOR[level], colorEnabled);
const contextText = formatContext(context);
const line = `${ts} ${levelLabel} [${scope}] ${message}${contextText ? ` ${contextText}` : ""}`;

if (level === "warn") {
console.warn(line);
return;
}
if (level === "error") {
console.error(line);
return;
}
console.log(line);
}

export function createLogger(scope: string) {
return {
info(message: string, context?: LogContext) {
write("info", scope, message, context);
},
warn(message: string, context?: LogContext) {
write("warn", scope, message, context);
},
error(message: string, context?: LogContext) {
write("error", scope, message, context);
},
event(message: string, context?: LogContext) {
write("event", scope, message, context);
},
};
}

================================================
FILE: apps/server/src/main.test.ts
================================================
import _ as Http from "node:http";
import _ as NodeServices from "@effect/platform-node/NodeServices";
import { assert, it, vi } from "@effect/vitest";
import type { OrchestrationReadModel } from "@t3tools/contracts";
import _ as ConfigProvider from "effect/ConfigProvider";
import _ as Effect from "effect/Effect";
import _ as Layer from "effect/Layer";
import _ as Command from "effect/unstable/cli/Command";
import { FetchHttpClient } from "effect/unstable/http";
import { beforeEach } from "vitest";
import { NetService } from "@t3tools/shared/Net";

import { CliConfig, recordStartupHeartbeat, t3Cli, type CliConfigShape } from "./main";
import { ServerConfig, type ServerConfigShape } from "./config";
import { Open, type OpenShape } from "./open";
import { ProjectionSnapshotQuery } from "./orchestration/Services/ProjectionSnapshotQuery";
import { AnalyticsService } from "./telemetry/Services/AnalyticsService";
import { Server, type ServerShape } from "./wsServer";

const start = vi.fn(() => undefined);
const stop = vi.fn(() => undefined);
let resolvedConfig: ServerConfigShape | null = null;
const serverStart = Effect.acquireRelease(
Effect.gen(function* () {
resolvedConfig = yield* ServerConfig;
start();
return {} as unknown as Http.Server;
}),
() => Effect.sync(() => stop()),
);
const findAvailablePort = vi.fn((preferred: number) => Effect.succeed(preferred));

// Shared service layer used by this CLI test suite.
const testLayer = Layer.mergeAll(
Layer.succeed(CliConfig, {
cwd: "/tmp/t3-test-workspace",
fixPath: Effect.void,
resolveStaticDir: Effect.undefined,
} satisfies CliConfigShape),
Layer.succeed(NetService, {
canListenOnHost: () => Effect.succeed(true),
isPortAvailableOnLoopback: () => Effect.succeed(true),
reserveLoopbackPort: () => Effect.succeed(0),
findAvailablePort,
}),
Layer.succeed(Server, {
start: serverStart,
stopSignal: Effect.void,
} satisfies ServerShape),
Layer.succeed(Open, {
openBrowser: (\_target: string) => Effect.void,
openInEditor: () => Effect.void,
} satisfies OpenShape),
AnalyticsService.layerTest,
FetchHttpClient.layer,
NodeServices.layer,
);

const runCli = (
args: ReadonlyArray<string>,
env: Record<string, string> = { T3CODE_NO_BROWSER: "true" },
) => {
const uniqueStateDir = `/tmp/t3-cli-state-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
return Command.runWith(t3Cli, { version: "0.0.0-test" })(args).pipe(
Effect.provide(
ConfigProvider.layer(
ConfigProvider.fromEnv({
env: {
T3CODE_STATE_DIR: uniqueStateDir,
...env,
},
}),
),
),
);
};

beforeEach(() => {
vi.clearAllMocks();
resolvedConfig = null;
start.mockImplementation(() => undefined);
stop.mockImplementation(() => undefined);
findAvailablePort.mockImplementation((preferred: number) => Effect.succeed(preferred));
});

it.layer(testLayer)("server CLI command", (it) => {
it.effect("parses all CLI flags and wires scoped start/stop", () =>
Effect.gen(function* () {
yield* runCli([
"--mode",
"desktop",
"--port",
"4010",
"--host",
"0.0.0.0",
"--state-dir",
"/tmp/t3-cli-state",
"--dev-url",
"http://127.0.0.1:5173",
"--no-browser",
"--auth-token",
"auth-secret",
]);

      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.mode, "desktop");
      assert.equal(resolvedConfig?.port, 4010);
      assert.equal(resolvedConfig?.host, "0.0.0.0");
      assert.equal(resolvedConfig?.stateDir, "/tmp/t3-cli-state");
      assert.equal(resolvedConfig?.devUrl?.toString(), "http://127.0.0.1:5173/");
      assert.equal(resolvedConfig?.noBrowser, true);
      assert.equal(resolvedConfig?.authToken, "auth-secret");
      assert.equal(resolvedConfig?.autoBootstrapProjectFromCwd, false);
      assert.equal(resolvedConfig?.logWebSocketEvents, true);
      assert.equal(stop.mock.calls.length, 1);
    }),

);

it.effect("supports --token as an alias for --auth-token", () =>
Effect.gen(function* () {
yield* runCli(["--token", "token-secret"]);

      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.authToken, "token-secret");
    }),

);

it.effect("uses env fallbacks when flags are not provided", () =>
Effect.gen(function* () {
yield* runCli([], {
T3CODE_MODE: "desktop",
T3CODE_PORT: "4999",
T3CODE_HOST: "100.88.10.4",
T3CODE_STATE_DIR: "/tmp/t3-env-state",
VITE_DEV_SERVER_URL: "http://localhost:5173",
T3CODE_NO_BROWSER: "true",
T3CODE_AUTH_TOKEN: "env-token",
});

      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.mode, "desktop");
      assert.equal(resolvedConfig?.port, 4999);
      assert.equal(resolvedConfig?.host, "100.88.10.4");
      assert.equal(resolvedConfig?.stateDir, "/tmp/t3-env-state");
      assert.equal(resolvedConfig?.devUrl?.toString(), "http://localhost:5173/");
      assert.equal(resolvedConfig?.noBrowser, true);
      assert.equal(resolvedConfig?.authToken, "env-token");
      assert.equal(resolvedConfig?.autoBootstrapProjectFromCwd, false);
      assert.equal(resolvedConfig?.logWebSocketEvents, true);
      assert.equal(findAvailablePort.mock.calls.length, 0);
    }),

);

it.effect("prefers --mode over T3CODE_MODE", () =>
Effect.gen(function* () {
findAvailablePort.mockImplementation((\_preferred: number) => Effect.succeed(4666));
yield* runCli(["--mode", "web"], {
T3CODE_MODE: "desktop",
T3CODE_NO_BROWSER: "true",
});

      assert.deepStrictEqual(findAvailablePort.mock.calls, [[3773]]);
      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.mode, "web");
      assert.equal(resolvedConfig?.port, 4666);
      assert.equal(resolvedConfig?.host, undefined);
    }),

);

it.effect("prefers --no-browser over T3CODE_NO_BROWSER", () =>
Effect.gen(function* () {
yield* runCli(["--no-browser"], {
T3CODE_NO_BROWSER: "false",
});

      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.noBrowser, true);
    }),

);

it.effect("uses dynamic port discovery in web mode when port is omitted", () =>
Effect.gen(function* () {
findAvailablePort.mockImplementation((\_preferred: number) => Effect.succeed(5444));
yield* runCli([]);

      assert.deepStrictEqual(findAvailablePort.mock.calls, [[3773]]);
      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.port, 5444);
      assert.equal(resolvedConfig?.mode, "web");
    }),

);

it.effect("uses fixed localhost defaults in desktop mode", () =>
Effect.gen(function* () {
yield* runCli([], {
T3CODE_MODE: "desktop",
T3CODE_NO_BROWSER: "true",
});

      assert.equal(findAvailablePort.mock.calls.length, 0);
      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.port, 3773);
      assert.equal(resolvedConfig?.host, "127.0.0.1");
      assert.equal(resolvedConfig?.mode, "desktop");
    }),

);

it.effect("allows overriding desktop host with --host", () =>
Effect.gen(function* () {
yield* runCli(["--host", "0.0.0.0"], {
T3CODE_MODE: "desktop",
T3CODE_NO_BROWSER: "true",
});

      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.mode, "desktop");
      assert.equal(resolvedConfig?.host, "0.0.0.0");
    }),

);

it.effect("supports CLI and env for bootstrap/log websocket toggles", () =>
Effect.gen(function* () {
yield* runCli(["--auto-bootstrap-project-from-cwd"], {
T3CODE_MODE: "desktop",
T3CODE_LOG_WS_EVENTS: "false",
T3CODE_AUTO_BOOTSTRAP_PROJECT_FROM_CWD: "false",
T3CODE_NO_BROWSER: "true",
});

      assert.equal(start.mock.calls.length, 1);
      assert.equal(resolvedConfig?.autoBootstrapProjectFromCwd, true);
      assert.equal(resolvedConfig?.logWebSocketEvents, false);
    }),

);

it.effect("records a startup heartbeat with thread/project counts", () =>
Effect.gen(function\* () {
const recordTelemetry = vi.fn(
(\_event: string, \_properties?: Readonly<Record<string, unknown>>) => Effect.void,
);
const getSnapshot = vi.fn(() =>
Effect.succeed({
snapshotSequence: 2,
projects: [{} as OrchestrationReadModel["projects"][number]],
threads: [
{} as OrchestrationReadModel["threads"][number],
{} as OrchestrationReadModel["threads"][number],
],
updatedAt: new Date(1).toISOString(),
} satisfies OrchestrationReadModel),
);

      yield* recordStartupHeartbeat.pipe(
        Effect.provideService(ProjectionSnapshotQuery, {
          getSnapshot,
        }),
        Effect.provideService(AnalyticsService, {
          record: recordTelemetry,
          flush: Effect.void,
        }),
      );

      assert.deepEqual(recordTelemetry.mock.calls[0], [
        "server.boot.heartbeat",
        {
          threadCount: 2,
          projectCount: 1,
        },
      ]);
    }),

);

it.effect("does not start server for invalid --mode values", () =>
Effect.gen(function* () {
yield* runCli(["--mode", "invalid"]);

      assert.equal(start.mock.calls.length, 0);
      assert.equal(stop.mock.calls.length, 0);
    }),

);

it.effect("does not start server for invalid --dev-url values", () =>
Effect.gen(function* () {
yield* runCli(["--dev-url", "not-a-url"]).pipe(Effect.catch(() => Effect.void));

      assert.equal(start.mock.calls.length, 0);
      assert.equal(stop.mock.calls.length, 0);
    }),

);

it.effect("does not start server for out-of-range --port values", () =>
Effect.gen(function* () {
yield* runCli(["--port", "70000"]);

      // effect/unstable/cli renders help/errors for parse failures and returns success.
      assert.equal(start.mock.calls.length, 0);
      assert.equal(stop.mock.calls.length, 0);
    }),

);
});

================================================
FILE: apps/server/src/main.ts
================================================
/\*\*

- CliConfig - CLI/runtime bootstrap service definitions.
-
- Defines startup-only service contracts used while resolving process config
- and constructing server runtime layers.
-
- @module CliConfig
  _/
  import { Config, Data, Effect, FileSystem, Layer, Option, Path, Schema, ServiceMap } from "effect";
  import { Command, Flag } from "effect/unstable/cli";
  import { NetService } from "@t3tools/shared/Net";
  import {
  DEFAULT_PORT,
  resolveStaticDir,
  ServerConfig,
  type RuntimeMode,
  type ServerConfigShape,
  } from "./config";
  import { fixPath, resolveStateDir } from "./os-jank";
  import { Open } from "./open";
  import _ as SqlitePersistence from "./persistence/Layers/Sqlite";
  import { makeServerProviderLayer, makeServerRuntimeServicesLayer } from "./serverLayers";
  import { ProjectionSnapshotQuery } from "./orchestration/Services/ProjectionSnapshotQuery";
  import { ProviderHealthLive } from "./provider/Layers/ProviderHealth";
  import { Server } from "./wsServer";
  import { ServerLoggerLive } from "./serverLogger";
  import { AnalyticsServiceLayerLive } from "./telemetry/Layers/AnalyticsService";
  import { AnalyticsService } from "./telemetry/Services/AnalyticsService";

export class StartupError extends Data.TaggedError("StartupError")<{
readonly message: string;
readonly cause?: unknown;
}> {}

interface CliInput {
readonly mode: Option.Option<RuntimeMode>;
readonly port: Option.Option<number>;
readonly host: Option.Option<string>;
readonly stateDir: Option.Option<string>;
readonly devUrl: Option.Option<URL>;
readonly noBrowser: Option.Option<boolean>;
readonly authToken: Option.Option<string>;
readonly autoBootstrapProjectFromCwd: Option.Option<boolean>;
readonly logWebSocketEvents: Option.Option<boolean>;
}

/\*\*

- CliConfigShape - Startup helpers required while building server layers.
  \*/
  export interface CliConfigShape {
  /\*\*
  - Current process working directory.
    \*/
    readonly cwd: string;

/\*\*

- Apply OS-specific PATH normalization.
  \*/
  readonly fixPath: Effect.Effect<void>;

/\*\*

- Resolve static web asset directory for server mode.
  \*/
  readonly resolveStaticDir: Effect.Effect<string | undefined>;
  }

/\*\*

- CliConfig - Service tag for startup CLI/runtime helpers.
  _/
  export class CliConfig extends ServiceMap.Service<CliConfig, CliConfigShape>()(
  "t3/main/CliConfig",
  ) {
  static readonly layer = Layer.effect(
  CliConfig,
  Effect.gen(function_ () {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  return {
  cwd: process.cwd(),
  fixPath: Effect.sync(fixPath),
  resolveStaticDir: resolveStaticDir().pipe(
  Effect.provideService(FileSystem.FileSystem, fileSystem),
  Effect.provideService(Path.Path, path),
  ),
  } satisfies CliConfigShape;
  }),
  );
  }

const CliEnvConfig = Config.all({
mode: Config.string("T3CODE_MODE").pipe(
Config.option,
Config.map(
Option.match<RuntimeMode, string>({
onNone: () => "web",
onSome: (value) => (value === "desktop" ? "desktop" : "web"),
}),
),
),
port: Config.port("T3CODE_PORT").pipe(Config.option, Config.map(Option.getOrUndefined)),
host: Config.string("T3CODE_HOST").pipe(Config.option, Config.map(Option.getOrUndefined))
