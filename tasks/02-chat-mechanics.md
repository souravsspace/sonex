# Task 02: Chat Mechanics & Composer — Full A-Z Implementation Plan

Detailed step-by-step guide for implementing Task 02. Each step is labeled, ordered, and dependency-aware. No code — only clear action descriptions.

**Make sure all file names should be in kebab-case.**

---

## Reference Sources (`ref.md`)

Reference implementation from T3 Code:
- `apps/web/src/components/ComposerPromptEditor.tsx`
- `apps/web/src/components/ChatMarkdown.tsx`
- `apps/web/src/components/ChatView.browser.tsx`
- `apps/web/src/composer-logic.ts`, `composerDraftStore.ts`, `composer-editor-mentions.ts`
- `apps/web/src/markdown-links.ts`
- `packages/contracts/src/model.ts`

---

## PHASE 0: Prerequisites & Dependencies Check

Before starting, ensure:
- ✅ Task 01 is **100% complete** (routing, UI components, sidebar structure all working)
- ✅ All shadcn UI components from Task 01 are installed and functional
- ✅ TanStack Router is properly configured and generating `routeTree.gen.ts`
- ✅ The project builds without errors (`bun run dev` works)

---

## PHASE 1: Model & Type System Setup

### Step 1.1 — Create TypeScript Model Interfaces

**Location:** `src/lib/models.ts`

Port the core domain models from the reference `packages/contracts/src/model.ts`:

**What to define:**

1. **Thread model** — Represents a chat conversation thread with properties:
   - `id` (unique identifier, string)
   - `projectId` (which project this thread belongs to)
   - `title` (display name of the thread)
   - `createdAt` (ISO timestamp string)
   - `updatedAt` (ISO timestamp string)
   - `status` (enum: 'active', 'archived', etc.)

2. **Message model** — Individual messages in a thread:
   - `id` (unique identifier)
   - `threadId` (parent thread reference)
   - `role` ('user' | 'assistant' | 'system')
   - `content` (string - the message text/markdown)
   - `createdAt` (timestamp)
   - `attachments` (array of file references - optional)
   - `metadata` (optional object for tool calls, errors, etc.)

3. **User model** — Simple user representation:
   - `id` (string)
   - `name` (string)
   - `email` (optional string)

4. **Attachment model** — File attachments in messages:
   - `id` (string)
   - `fileName` (string)
   - `filePath` (string - local file system path)
   - `mimeType` (string)
   - `size` (number in bytes)

**Why this matters:**
These types will be used throughout the entire chat UI, composer, and message rendering pipeline. Having them defined first ensures type safety across all components.

---

### Step 1.2 — Create Composer State Types

**Location:** `src/lib/composer-types.ts`

Define types specific to the composer/editor:

1. **ComposerDraft** — The in-progress message state:
   - `threadId` (string | null - if replying to existing thread)
   - `content` (string - current editor text)
   - `mentions` (array of file mentions like `@filename.ts`)
   - `attachments` (array of file attachments)
   - `lastSaved` (timestamp - for auto-save tracking)

2. **MentionSuggestion** — For autocomplete dropdown:
   - `id` (string)
   - `label` (string - display name like "src/App.tsx")
   - `type` ('file' | 'symbol' | 'folder')
   - `path` (string - full file path)

3. **EditorSelection** — Cursor/selection state:
   - `start` (number - character offset)
   - `end` (number - character offset)
   - `direction` ('forward' | 'backward' | 'none')

**Why separate file:**
Keeps model types clean and separates domain logic from UI state.

---

## PHASE 2: State Management — Composer Draft Store

### Step 2.1 — Install Zustand for State Management

**Action:**
Run `bun add zustand`

Zustand is a lightweight state management library. The reference codebase uses a custom store pattern, but Zustand provides a simpler, more maintainable alternative that's perfect for draft state persistence.

---

### Step 2.2 — Create Composer Draft Store

**Location:** `src/stores/composer-draft-store.ts`

**Responsibilities:**
1. **Per-thread draft storage** — Each thread can have its own unsent draft
2. **Persistence** — Auto-save drafts to localStorage so they survive page refresh
3. **Operations:**
   - `getDraft(threadId)` — Retrieve draft for specific thread
   - `setDraft(threadId, content, mentions, attachments)` — Update draft
   - `clearDraft(threadId)` — Remove draft after message sent
   - `getAllDrafts()` — Get all saved drafts (for cleanup/debugging)

**State structure:**
```
{
  drafts: Record<string, ComposerDraft>, // keyed by threadId
  activeDraftId: string | null // currently focused draft
}
```

**Persistence strategy:**
- Use `zustand/middleware` with `persist` to auto-save to localStorage
- Storage key: `sonex-composer-drafts`
- Debounce writes (500ms) to avoid excessive localStorage writes on every keystroke

**Why Zustand here:**
The draft state needs to be shared between the composer input (where you type) and the chat view (which shows unsent drafts). Zustand makes this trivial without prop drilling.

---

## PHASE 3: Markdown Processing Pipeline

### Step 3.1 — Install Markdown Dependencies

**Action:**
Run: `bun add remark remark-gfm remark-react rehype-highlight`

These libraries handle:
- `remark` — Core markdown parser (AST-based)
- `remark-gfm` — GitHub Flavored Markdown (tables, strikethrough, task lists)
- `remark-react` — Render markdown AST to React components
- `rehype-highlight` — Syntax highlighting for code blocks

---

### Step 3.2 — Create Markdown Link Processor

**Location:** `src/lib/markdown-links.ts`

**Purpose:**
LLM responses often include file references like `[src/App.tsx](file://src/App.tsx)` or `@src/components/Button.tsx`. This module detects and transforms these into clickable links that open files in the editor.

**Functions to implement:**

1. **`extractFileLinks(markdown: string): FileLinkMatch[]`**
   - Use regex to find `[text](file://path)` patterns
   - Also detect bare `@filepath` mentions
   - Return array of `{ text, path, startIndex, endIndex }`

2. **`normalizeFilePath(rawPath: string): string`**
   - Remove `file://` prefix if present
   - Convert relative paths to absolute based on project root
   - Handle `~` for home directory
   - Normalize separators (`/` vs `\`)

3. **`isFileLink(url: string): boolean`**
   - Check if URL starts with `file://`
   - Used by markdown renderer to style differently

**Why this matters:**
AI responses will reference code files. Users need to click these to open the file in their editor. This is a **core UX feature** of the app.

---

### Step 3.3 — Create Markdown Rendering Component

**Location:** `src/components/chat-markdown.tsx`

**Component:** `<ChatMarkdown content={string} />`

**Rendering pipeline:**
1. Parse markdown string using `remark`
2. Apply GFM transformations (tables, checkboxes, etc.)
3. Transform file links using the `markdown-links.ts` logic
4. Render to React components with custom overrides:
   - `<a>` tags → Check if file link, if so make clickable with custom handler
   - `<code>` blocks → Apply syntax highlighting via `rehype-highlight`
   - `<pre>` → Wrap in a container with copy button
   - `<table>` → Wrap in scroll container if wide
   - `<img>` → Add loading state, error fallback

**Custom overrides object:**
```typescript
{
  a: FileLink,  // Custom link component
  code: CodeBlock,  // Syntax highlighted
  pre: CodePre,  // With copy button
  table: ScrollableTable,  // Horizontal scroll
}
```

**Accessibility considerations:**
- Code blocks need `aria-label="code snippet"`
- Copy buttons need `aria-label="copy code"`
- File links need `aria-label="open file {path}"`

---

## PHASE 4: File Mention Autocomplete System

### Step 4.1 — Create File Search Utility

**Location:** `src/lib/file-search.ts`

**Purpose:**
When user types `@` in the composer, show a dropdown of files they can mention. This requires fast file tree search.

**Functions:**

1. **`searchFiles(query: string, limit = 10): FileSuggestion[]`**
   - Use fuzzy matching algorithm (simple: substring match on file path)
   - Prioritize recently opened files first
   - Then match by relevance (query appears in filename vs deep in path)
   - Return max `limit` results

2. **`getRecentFiles(limit = 5): string[]`**
   - Read from localStorage key `recent-files`
   - Return most recently accessed file paths

3. **`scoreFilePath(path: string, query: string): number`**
   - Scoring heuristic:
     - Exact filename match = 100
     - Filename contains query = 50
     - Full path contains query = 10
   - Used to sort search results

**Note:**
For now, implement a mock file list. Task 04 (IPC bridge) will replace this with real Tauri filesystem calls.

---

### Step 4.2 — Create Mention Parser

**Location:** `src/lib/composer-editor-mentions.ts`

**Purpose:**
Detect when user is typing a mention (like `@filename`) and extract the query for autocomplete.

**Functions:**

1. **`detectMentionQuery(text: string, cursorPosition: number): MentionQuery | null`**
   - Scan backwards from cursor to find `@` character
   - Extract text between `@` and cursor (the query)
   - Return `{ trigger: '@', query: 'filenam', startIndex: 42, endIndex: 50 }`
   - Return `null` if no active mention detected

2. **`insertMention(text: string, mention: Mention, startIndex: number, endIndex: number): string`**
   - Replace the `@query` text with the full mention like `@src/App.tsx`
   - Return updated text string

3. **`extractAllMentions(text: string): Mention[]`**
   - Find all `@filepath` patterns in the full text
   - Used when submitting message to attach mentioned files

**Why separate from editor component:**
Keeps the logic testable and reusable if you add other mention types later (like `@user` or `#channel`).

---

### Step 4.3 — Create Autocomplete Dropdown Component

**Location:** `src/components/mention-autocomplete.tsx`

**Component:** `<MentionAutocomplete query={string} onSelect={fn} onCancel={fn} position={{ x, y }} />`

**Behavior:**
- Render as a floating popover positioned near cursor
- Show list of file suggestions from `searchFiles(query)`
- Keyboard navigation:
  - ↓/↑ arrows to navigate
  - Enter to select
  - Escape to cancel
  - Tab to select first item
- Click to select item
- Show file icon (use `vscode-icons` utility from Task 01)
- Highlight the query match in the suggestion text

**Styling:**
- Use `@base-ui/react` Popover for positioning
- Max height 300px, scrollable
- Each item: 40px tall, hover/focus state
- Show loading spinner while searching (if async)

**Accessibility:**
- `role="listbox"`
- Each item: `role="option"`
- Currently selected item: `aria-selected="true"`
- Announce count: `aria-label="5 file suggestions"`

---

## PHASE 5: Composer Editor Component

### Step 5.1 — Create Base Composer Input

**Location:** `src/components/composer-prompt-editor.tsx`

**Component:** `<ComposerPromptEditor threadId={string | null} onSubmit={fn} />`

**Core functionality:**

1. **Textarea with auto-resize:**
   - Start at 3 rows minimum
   - Grow as user types (up to 15 rows max)
   - Use `useEffect` to adjust height based on `scrollHeight`

2. **Draft persistence integration:**
   - On mount: Load draft from `composer-draft-store` if exists
   - On text change: Debounce and save to store (500ms delay)
   - On submit: Clear draft from store

3. **Mention detection:**
   - On every text change + cursor position change:
     - Call `detectMentionQuery()` to check for `@` trigger
     - If detected, show `<MentionAutocomplete>` at cursor position
     - If not detected, hide autocomplete

4. **Keyboard shortcuts:**
   - **Cmd/Ctrl + Enter** → Submit message
   - **Escape** → Cancel autocomplete (if open), otherwise blur
   - **Tab** → Accept first autocomplete suggestion (if open)
   - **Shift + Enter** → Insert newline (don't submit)

5. **Submit logic:**
   - Extract all mentions with `extractAllMentions()`
   - Call `onSubmit({ content, mentions, attachments })`
   - Clear textarea and draft

**Styling:**
- Use shadcn `Textarea` as base
- Add subtle border highlight on focus
- Show character count if > 1000 chars (warn if > 10k)
- Disabled state while message is sending

---

### Step 5.2 — Add File Attachment Support

**Enhancement to composer:**

Add an "Attach File" button next to the textarea.

**Behavior:**
1. Click button → Opens file picker dialog
2. User selects file(s) → File paths added to `attachments` array in draft
3. Show attached files as pills/chips above textarea
4. Each chip shows filename + X button to remove
5. Limit: Max 10 files per message

**File picker:**
For now, use standard HTML `<input type="file" multiple />`. Task 04 will replace this with Tauri's native file picker API.

**Visual design:**
- Attachment chips: Small badges with filename, file icon, and remove button
- Show file size next to name (e.g., "App.tsx • 2.4 KB")
- Use `vscode-icons` for file type icon

---

### Step 5.3 — Add Placeholder & Empty States

**When editor is empty:**
- Show placeholder text: "Ask a question or type @ to mention a file..."
- Grayed out, disappears on focus

**When draft exists but not focused:**
- Show "Resume draft" hint

**When sending message:**
- Disable input
- Show spinner in submit button
- Gray out textarea

---

## PHASE 6: Chat Message Rendering

### Step 6.1 — Create Message Component

**Location:** `src/components/chat-message.tsx`

**Component:** `<ChatMessage message={Message} />`

**Layout:**
```
[Avatar] [Message Bubble]
         [Markdown Content]
         [Metadata Footer]
```

**Variants:**
- **User message:** Right-aligned, blue/accent background
- **Assistant message:** Left-aligned, gray background
- **System message:** Centered, muted, italic

**Features:**
1. **Avatar:**
   - User messages: User initial or profile pic
   - Assistant messages: AI icon (robot/sparkle icon)
   - System messages: No avatar

2. **Message content:**
   - Render using `<ChatMarkdown>` component
   - Preserve whitespace in code blocks

3. **Metadata footer:**
   - Timestamp (relative: "2 minutes ago")
   - Message status icon (sending, sent, error)
   - Copy message button (on hover)
   - Edit button (only for user messages - future feature)

**Accessibility:**
- Each message: `role="article"`
- Timestamp: `<time datetime={isoString}>`
- Copy button: `aria-label="copy message"`

---

### Step 6.2 — Create Message List Container

**Location:** `src/components/chat-message-list.tsx`

**Component:** `<ChatMessageList messages={Message[]} />`

**Behavior:**
1. **Virtualization:**
   - If message count > 100, use virtualization library
   - Install: `bun add @tanstack/react-virtual`
   - Only render visible messages + buffer
   - Improves performance for long threads

2. **Auto-scroll:**
   - When new message arrives, scroll to bottom automatically
   - **Unless** user has scrolled up manually
   - Show "New message" button to jump to bottom if scrolled up

3. **Loading states:**
   - Initial load: Show skeleton messages (3-5 gray boxes)
   - Loading more (pagination): Spinner at top

4. **Empty state:**
   - No messages: Show welcome message
   - Use `<Empty>` component from Task 01
   - Suggestions: "Try asking..." with example prompts

---

### Step 6.3 — Implement Scroll Management

**Location:** `src/lib/chat-scroll.ts`

**Purpose:**
Handle complex scroll behavior (auto-scroll, scroll-to-bottom, detect user scroll).

**Functions:**

1. **`useAutoScroll(containerRef, messages)`** — Custom React hook
   - Tracks if user has manually scrolled up
   - Auto-scrolls to bottom on new message (unless user scrolled)
   - Returns `{ isAtBottom, scrollToBottom, canAutoScroll }`

2. **`shouldAutoScroll(container: HTMLElement): boolean`**
   - Check if scrollTop + clientHeight ≈ scrollHeight
   - Allow 50px threshold

3. **`scrollToBottom(container: HTMLElement, smooth = true)`**
   - Scroll to bottom with optional smooth animation

**Usage in ChatMessageList:**
```typescript
const { isAtBottom, scrollToBottom } = useAutoScroll(containerRef, messages);
```

---

## PHASE 7: Chat View Integration

### Step 7.1 — Create Chat View Container

**Location:** `src/components/chat-view.tsx`

**Component:** `<ChatView threadId={string} />`

**This is the main orchestrator component that combines:**
1. `<ChatMessageList>` (displays conversation)
2. `<ComposerPromptEditor>` (input at bottom)
3. Thread header (title, settings icon)
4. Loading/error states

**Layout structure:**
```
┌─────────────────────────┐
│ Thread Header           │ ← Fixed at top
├─────────────────────────┤
│                         │
│ Chat Message List       │ ← Scrollable
│ (grows vertically)      │
│                         │
├─────────────────────────┤
│ Composer Input          │ ← Fixed at bottom
└─────────────────────────┘
```

**State management:**
- Load thread data on mount (from mock for now)
- Load messages for thread
- Handle send message (add to list + API call)
- Handle errors (show toast notification)

---

### Step 7.2 — Connect to Router

**Location:** `src/routes/_chat.$threadId.tsx`

This route file should:
1. Extract `threadId` from route params
2. Render `<ChatView threadId={threadId} />`
3. Handle route errors (invalid thread ID → redirect to index)

**Route layout:**
```
/_chat.$threadId.tsx → Renders inside the sidebar layout from Task 01
```

---

### Step 7.3 — Add Empty Thread View

**Location:** `src/routes/_chat.index.tsx`

When no thread is selected:
- Show welcome screen
- Suggest: "Start a new chat" button
- Show recent threads list (if any)
- Use `<Empty>` component

---

## PHASE 8: Mock Data & Testing

### Step 8.1 — Create Mock Thread Data

**Location:** `src/lib/mock-data.ts`

Create sample data:
- 3-5 sample threads with varying message counts
- Mix of user and assistant messages
- Include code blocks in some messages
- Include file mentions in others
- Include attachments in some

**Why:**
Allows testing the full UI without backend integration.

---

### Step 8.2 — Create Mock Message Sending

**Location:** `src/lib/mock-api.ts`

Simulate API calls:
- `sendMessage(threadId, content, mentions, attachments)`:
  - Delay 500-1500ms
  - Return fake assistant response
  - Include mock file mentions in response
- `createThread(projectId, initialMessage)`:
  - Create new thread ID
  - Return thread object

**Why:**
Test the full flow (loading, sending, receiving) before Task 06 (API layer).

---

## PHASE 9: Polish & UX Enhancements

### Step 9.1 — Add Keyboard Shortcuts

Implement global shortcuts (building on Task 01's shortcut system):
- **Cmd/Ctrl + K** → Focus composer
- **Cmd/Ctrl + N** → New thread
- **Esc** → Clear composer focus

---

### Step 9.2 — Add Copy Message Button

On message hover:
- Show copy button
- Click → Copy message content to clipboard
- Show toast: "Message copied"
- Use `navigator.clipboard.writeText()`

---

### Step 9.3 — Add Loading Indicators

**While sending message:**
- Show "..." animated dots in assistant message area
- Disable composer input
- Show spinner on send button

**While loading thread:**
- Show skeleton message placeholders
- 3-4 gray boxes fading in/out

---

### Step 9.4 — Add Error Handling UI

**Message send failures:**
- Show red error banner above composer
- Offer "Retry" button
- Preserve draft so user doesn't lose text

**Thread load failures:**
- Show error state in message list
- Button to retry loading
- Use `<Alert variant="destructive">` from shadcn

---

## PHASE 10: Final Integration & Testing

### Step 10.1 — End-to-End Flow Test

Test the complete user journey:
1. Open app → See empty thread view
2. Click "New Chat" → Open composer
3. Type message with `@` mention → Autocomplete appears
4. Select file → Mention inserted
5. Press Cmd+Enter → Message sends
6. See loading dots → Assistant response appears
7. Response includes markdown + code blocks → All render correctly
8. Click file link in response → (Will work after Task 04)
9. Refresh page → Draft persists if not sent

---

### Step 10.2 — Accessibility Audit

Check:
- ✅ All interactive elements keyboard navigable
- ✅ Proper ARIA labels on buttons/inputs
- ✅ Focus visible on all elements
- ✅ Screen reader announces message arrivals
- ✅ Autocomplete uses proper listbox/option roles

---

### Step 10.3 — Responsive Design Check

Test at different viewport sizes:
- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667) — if mobile support is planned

**Adjustments:**
- Composer should stack vertically on mobile
- Sidebar collapses on narrow screens
- Message bubbles max-width on wide screens

---

### Step 10.4 — Performance Optimization

1. **Memoization:**
   - Wrap `<ChatMessage>` in `React.memo`
   - Memoize markdown rendering result
   - Memoize file search results

2. **Debouncing:**
   - Draft saves (already noted above)
   - File search queries (300ms debounce)
   - Scroll event handlers (100ms throttle)

3. **Code splitting:**
   - Lazy load markdown processing libraries
   - Use dynamic imports for syntax highlighter

---

## CRITICAL FILES TO CREATE (Summary)

### Core Models & Types:
1. `src/lib/models.ts` — Thread, Message, User, Attachment types
2. `src/lib/composer-types.ts` — ComposerDraft, MentionSuggestion, etc.

### State Management:
3. `src/stores/composer-draft-store.ts` — Zustand store for drafts

### Markdown Pipeline:
4. `src/lib/markdown-links.ts` — File link detection & normalization
5. `src/components/chat-markdown.tsx` — Markdown rendering component

### Mention System:
6. `src/lib/file-search.ts` — File fuzzy search
7. `src/lib/composer-editor-mentions.ts` — Mention detection & parsing
8. `src/components/mention-autocomplete.tsx` — Autocomplete dropdown

### Composer:
9. `src/components/composer-prompt-editor.tsx` — Main composer input

### Chat Display:
10. `src/components/chat-message.tsx` — Individual message
11. `src/components/chat-message-list.tsx` — Message list container
12. `src/lib/chat-scroll.ts` — Scroll behavior management
13. `src/components/chat-view.tsx` — Main chat orchestrator

### Routes:
14. `src/routes/_chat.$threadId.tsx` — Thread route
15. `src/routes/_chat.index.tsx` — Empty thread view

### Mocks:
16. `src/lib/mock-data.ts` — Sample threads/messages
17. `src/lib/mock-api.ts` — Fake API calls

---

## DEPENDENCIES TO INSTALL (Summary)

```bash
# State management
bun add zustand

# Markdown processing
bun add remark remark-gfm remark-react rehype-highlight

# Virtualization (optional, for performance)
bun add @tanstack/react-virtual
```

---

## TESTING STRATEGY

For each phase:
1. **Unit tests** — Test utilities in isolation (`markdown-links.ts`, `composer-editor-mentions.ts`, `file-search.ts`)
2. **Component tests** — Test React components with mock data
3. **Integration tests** — Test full chat flow end-to-end
4. **Visual regression tests** — Screenshot comparisons for UI stability

**No automated tests required for Task 02** — Manual testing is sufficient at this stage. Focus on getting the UI working correctly first.

---

## POTENTIAL PITFALLS & SOLUTIONS

### Pitfall 1: Autocomplete positioning breaks on scroll
**Solution:** Recalculate position on every scroll event, or use CSS `position: fixed` with transform.

### Pitfall 2: Markdown rendering is slow on long messages
**Solution:** Memoize rendered output, lazy-load syntax highlighter only when needed.

### Pitfall 3: Draft store grows unbounded
**Solution:** Add cleanup logic to prune drafts older than 7 days.

### Pitfall 4: Auto-scroll fights user when they try to scroll up
**Solution:** Implement scroll lock correctly (check `isAtBottom` before auto-scrolling).

### Pitfall 5: Mention autocomplete flickers on fast typing
**Solution:** Debounce the search query (300ms) but show dropdown immediately.

---

## SUCCESS CRITERIA

Task 02 is complete when:

✅ User can open a thread and see a list of messages  
✅ User can type in the composer and see their text  
✅ User can type `@` and get file autocomplete dropdown  
✅ User can select a file mention and it inserts correctly  
✅ User can press Cmd+Enter to send a message  
✅ Messages display with proper markdown rendering  
✅ Code blocks have syntax highlighting  
✅ File links in AI responses are clickable (even if they don't open files yet)  
✅ Drafts persist across page refresh  
✅ Auto-scroll works correctly (scrolls on new messages, but not if user scrolled up)  
✅ Empty states show when no thread or no messages  
✅ Loading states show during message send  
✅ Error states show when things fail  
✅ All UI is keyboard accessible  
✅ No console errors or warnings  
✅ `bun lint` and `bun typecheck` pass

---

## NEXT STEPS (After Task 02)

Once Task 02 is complete:
- **Task 03** will add diff rendering for code changes
- **Task 04** will replace mocks with real Tauri IPC calls
- **Task 06** will integrate Anthropic API for real LLM responses
- **Task 08** will add git operations and terminal

For now, focus solely on building the chat UI and composer mechanics with mock data.

---

**Total estimated effort:** 20-30 hours depending on experience level.

**Recommended order:** Follow the phases in sequence. Don't skip ahead. Each phase builds on the previous one.
