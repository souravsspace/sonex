# Task 02: Chat Mechanics & Composer `(apps/web/src/components)`

## Reference Sources (`ref.md`)
- `apps/web/src/components/ComposerPromptEditor.tsx`
- `apps/web/src/components/ChatMarkdown.tsx`
- `apps/web/src/components/ChatView.browser.tsx`
- `apps/web/src/composer-logic.ts`, `composerDraftStore.ts`, `composer-editor-mentions.ts`
- `apps/web/src/markdown-links.ts`
- `packages/contracts/src/model.ts`

## Details
1. **Model Synchronization:** Port TypeScript interfaces from `packages/contracts/src/model.ts` (Threads, Messages, Users) so the front-end has the correct models.
2. **Composer Editor:** Port `ComposerPromptEditor.tsx`. Implement file mentions (`@filename`), prompt handling, and the internal state inside `composerDraftStore.ts`.
3. **Markdown Rendering:** Migrate `ChatMarkdown.tsx` which parses the LLM output. Port `markdown-links.ts` to ensure file links in LLM responses map properly to local files.
4. **Chat View:** Implement the `ChatView.browser.tsx` structure which coordinates the scrolling (`chat-scroll.ts`) and message rendering loops.