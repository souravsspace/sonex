# Task 03: Diff Rendering & Client State `(src/)`

## Overview
Port the diff rendering system and global state management from t3code. This includes visual diff rendering with syntax highlighting, worker-based parsing for performance, and Zustand state management adapted to Sonex architecture.

## Reference Sources (`ref.md`)
- `apps/web/src/components/DiffPanel.tsx`, `DiffWorkerPoolProvider.tsx`
- `apps/web/src/lib/diffRendering.ts`, `turnDiffTree.ts`
- `apps/web/src/store.ts`, `session-logic.ts`
- `apps/web/src/diffRouteSearch.ts`

---

## Implementation Plan A-Z

### Phase A: Setup & Dependencies

**A1. Install Required Dependencies**
- Add diff parsing libraries: `diff` or `diff2html` for unified diff parsing
- Add syntax highlighting: `shiki` or `prism-react-renderer`
- Add Web Worker support via Vite: verify `vite-plugin-worker` or native Worker support
- Type definitions: `@types/diff` if needed

```bash
bun add diff shiki
bun add -d @types/diff
```

**A2. Verify Vite Worker Configuration**
- Check `vite.config.ts` supports `new Worker()` with `?worker` suffix
- Ensure Vite bundles workers correctly for production builds

---

### Phase B: Type Definitions & Models

**B1. Create Diff Domain Types** → `src/lib/diff-types.ts`

Define all diff-related types following Sonex conventions:
```typescript
/**
 * Unified diff hunk with line-level changes
 */
export interface DiffHunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  lines: DiffLine[];
  header: string;
}

/**
 * Individual line in a diff hunk
 */
export interface DiffLine {
  type: 'context' | 'addition' | 'deletion';
  content: string;
  oldLineNumber: number | null;
  newLineNumber: number | null;
}

/**
 * Parsed file-level diff with metadata
 */
export interface FileDiff {
  id: string; // Unique identifier (hash or path-based)
  oldPath: string | null;
  newPath: string | null;
  hunks: DiffHunk[];
  isNew: boolean;
  isDeleted: boolean;
  isRenamed: boolean;
  isBinary: boolean;
}

/**
 * Abstract syntax tree node for rendered diff
 */
export interface DiffTreeNode {
  type: 'file' | 'hunk' | 'line';
  id: string;
  data: FileDiff | DiffHunk | DiffLine;
  children?: DiffTreeNode[];
  collapsed?: boolean;
}

/**
 * Worker message types for async parsing
 */
export interface DiffWorkerRequest {
  id: string;
  type: 'parse';
  payload: string; // Raw unified diff string
}

export interface DiffWorkerResponse {
  id: string;
  type: 'result' | 'error';
  payload: FileDiff[] | string;
}
```

**B2. Create Session State Types** → `src/lib/session-types.ts`

```typescript
import type { FileDiff } from './diff-types';

/**
 * Active chat session state
 */
export interface SessionState {
  threadId: string;
  branchName: string | null;
  workTreePath: string | null;
  isActive: boolean;
  lastActivityAt: string; // ISO timestamp
}

/**
 * Turn-level diff state (per assistant response)
 */
export interface TurnDiffState {
  turnId: string;
  threadId: string;
  diffs: FileDiff[];
  createdAt: string;
  status: 'pending' | 'parsed' | 'error';
  errorMessage?: string;
}
```

---

### Phase C: Core Diff Parsing Logic

**C1. Create Diff Parser Utility** → `src/lib/diff-parser.ts`

Port core logic from `diffRendering.ts`:
```typescript
import type { FileDiff, DiffHunk, DiffLine } from './diff-types';

/**
 * Parse unified diff string into structured FileDiff objects
 * 
 * @param unifiedDiff - Raw git diff output (unified format)
 * @returns Array of parsed file diffs
 */
export function parseUnifiedDiff(unifiedDiff: string): FileDiff[] {
  // Implementation:
  // 1. Split diff by file headers (diff --git a/... b/...)
  // 2. Extract old/new paths from headers
  // 3. Parse hunks (@@ -X,Y +A,B @@)
  // 4. Classify lines (+/-/ prefix)
  // 5. Detect special cases (binary, renamed, new, deleted files)
  // 6. Generate unique IDs (hash path + hunk positions)
  
  // Use `diff` library or manual parsing
}

/**
 * Detect if a diff represents a binary file
 */
export function isBinaryDiff(diffHeader: string): boolean {
  return /Binary files? .* differ/.test(diffHeader);
}

/**
 * Extract file rename information from diff header
 */
export function extractRenameInfo(diffHeader: string): {
  oldPath: string;
  newPath: string;
} | null {
  // Parse "rename from X" / "rename to Y" headers
}

/**
 * Generate stable ID for a file diff
 */
export function generateFileDiffId(oldPath: string | null, newPath: string | null): string {
  const path = newPath ?? oldPath ?? 'unknown';
  return `diff-${path.replace(/\//g, '-')}`;
}
```

**C2. Create Diff Tree Builder** → `src/lib/diff-tree-builder.ts`

Port logic from `turnDiffTree.ts`:
```typescript
import type { FileDiff, DiffTreeNode } from './diff-types';

/**
 * Convert flat FileDiff array into hierarchical tree for rendering
 * 
 * @param diffs - Parsed file diffs
 * @returns Tree structure optimized for UI rendering
 */
export function buildDiffTree(diffs: FileDiff[]): DiffTreeNode[] {
  // Implementation:
  // 1. Create file-level nodes
  // 2. Nest hunk nodes under files
  // 3. Nest line nodes under hunks
  // 4. Mark all nodes as expanded by default
  // 5. Preserve IDs for efficient React keys
}

/**
 * Flatten tree back to array for virtualized rendering
 */
export function flattenDiffTree(tree: DiffTreeNode[]): DiffTreeNode[] {
  // Depth-first traversal respecting collapsed state
}

/**
 * Toggle collapsed state for a specific node
 */
export function toggleNodeCollapse(
  tree: DiffTreeNode[],
  nodeId: string
): DiffTreeNode[] {
  // Immutable update preserving tree structure
}
```

---

### Phase D: Web Worker for Async Parsing

**D1. Create Diff Worker** → `src/workers/diff-worker.ts`

```typescript
import type { DiffWorkerRequest, DiffWorkerResponse } from '@/lib/diff-types';
import { parseUnifiedDiff } from '@/lib/diff-parser';

// Web Worker entry point
self.onmessage = (event: MessageEvent<DiffWorkerRequest>) => {
  const { id, type, payload } = event.data;

  if (type !== 'parse') {
    const errorResponse: DiffWorkerResponse = {
      id,
      type: 'error',
      payload: 'Unknown message type',
    };
    self.postMessage(errorResponse);
    return;
  }

  try {
    const diffs = parseUnifiedDiff(payload);
    const response: DiffWorkerResponse = {
      id,
      type: 'result',
      payload: diffs,
    };
    self.postMessage(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Parse failed';
    const errorResponse: DiffWorkerResponse = {
      id,
      type: 'error',
      payload: errorMessage,
    };
    self.postMessage(errorResponse);
  }
};
```

**D2. Create Worker Pool Manager** → `src/lib/diff-worker-pool.ts`

Port `DiffWorkerPoolProvider.tsx` logic:
```typescript
/**
 * Manages a pool of diff parsing workers for parallel processing
 */
export class DiffWorkerPool {
  private workers: Worker[] = [];
  private activeRequests = new Map<string, {
    resolve: (diffs: FileDiff[]) => void;
    reject: (error: Error) => void;
  }>();
  private poolSize: number;

  constructor(poolSize = navigator.hardwareConcurrency || 4) {
    this.poolSize = Math.min(poolSize, 8); // Cap at 8 workers
    this.initializeWorkers();
  }

  private initializeWorkers(): void {
    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(
        new URL('../workers/diff-worker.ts', import.meta.url),
        { type: 'module' }
      );
      
      worker.onmessage = this.handleWorkerMessage.bind(this);
      worker.onerror = this.handleWorkerError.bind(this);
      this.workers.push(worker);
    }
  }

  private handleWorkerMessage(event: MessageEvent<DiffWorkerResponse>): void {
    const { id, type, payload } = event.data;
    const request = this.activeRequests.get(id);
    if (!request) return;

    if (type === 'result') {
      request.resolve(payload as FileDiff[]);
    } else {
      request.reject(new Error(payload as string));
    }
    
    this.activeRequests.delete(id);
  }

  private handleWorkerError(error: ErrorEvent): void {
    // Handle worker-level errors
    console.error('[DiffWorkerPool] Worker error:', error);
  }

  async parseDiff(unifiedDiff: string): Promise<FileDiff[]> {
    const requestId = `${Date.now()}-${Math.random()}`;
    const workerIndex = this.activeRequests.size % this.workers.length;
    const worker = this.workers[workerIndex];

    return new Promise((resolve, reject) => {
      this.activeRequests.set(requestId, { resolve, reject });
      
      const request: DiffWorkerRequest = {
        id: requestId,
        type: 'parse',
        payload: unifiedDiff,
      };
      
      worker.postMessage(request);
      
      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.activeRequests.has(requestId)) {
          this.activeRequests.delete(requestId);
          reject(new Error('Diff parsing timeout'));
        }
      }, 30000);
    });
  }

  terminate(): void {
    for (const worker of this.workers) {
      worker.terminate();
    }
    this.workers = [];
    this.activeRequests.clear();
  }
}
```

**D3. Create Worker Pool Hook** → `src/hooks/use-diff-worker-pool.ts`

```typescript
import { useEffect, useRef } from 'react';
import { DiffWorkerPool } from '@/lib/diff-worker-pool';

/**
 * Singleton worker pool accessible via React hook
 */
export function useDiffWorkerPool(): DiffWorkerPool {
  const poolRef = useRef<DiffWorkerPool | null>(null);

  useEffect(() => {
    if (!poolRef.current) {
      poolRef.current = new DiffWorkerPool();
    }

    return () => {
      poolRef.current?.terminate();
      poolRef.current = null;
    };
  }, []);

  if (!poolRef.current) {
    poolRef.current = new DiffWorkerPool();
  }

  return poolRef.current;
}
```

---

### Phase E: State Management with Zustand

**E1. Create Session Store** → `src/stores/session-store.ts`

Port relevant parts of `store.ts` and `session-logic.ts`:
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SessionState } from '@/lib/session-types';

interface SessionStoreState {
  // Current active session
  activeSession: SessionState | null;
  
  // Session history (recent sessions)
  recentSessions: SessionState[];
  
  // Actions
  setActiveSession: (session: SessionState) => void;
  clearActiveSession: () => void;
  updateSessionActivity: (threadId: string) => void;
  addRecentSession: (session: SessionState) => void;
  getSessionByThreadId: (threadId: string) => SessionState | null;
}

export const useSessionStore = create<SessionStoreState>()(
  persist(
    (set, get) => ({
      activeSession: null,
      recentSessions: [],

      setActiveSession: (session) => {
        set({ activeSession: session });
        get().addRecentSession(session);
      },

      clearActiveSession: () => {
        set({ activeSession: null });
      },

      updateSessionActivity: (threadId) => {
        const { activeSession, recentSessions } = get();
        const now = new Date().toISOString();

        if (activeSession?.threadId === threadId) {
          set({
            activeSession: { ...activeSession, lastActivityAt: now },
          });
        }

        const updated = recentSessions.map((session) =>
          session.threadId === threadId
            ? { ...session, lastActivityAt: now }
            : session
        );
        set({ recentSessions: updated });
      },

      addRecentSession: (session) => {
        const { recentSessions } = get();
        const filtered = recentSessions.filter(
          (s) => s.threadId !== session.threadId
        );
        const updated = [session, ...filtered].slice(0, 20); // Keep last 20
        set({ recentSessions: updated });
      },

      getSessionByThreadId: (threadId) => {
        return get().recentSessions.find((s) => s.threadId === threadId) ?? null;
      },
    }),
    { name: 'sonex-session' }
  )
);
```

**E2. Create Diff State Store** → `src/stores/diff-store.ts`

```typescript
import { create } from 'zustand';
import type { TurnDiffState } from '@/lib/session-types';
import type { FileDiff, DiffTreeNode } from '@/lib/diff-types';
import { buildDiffTree, toggleNodeCollapse } from '@/lib/diff-tree-builder';

interface DiffStoreState {
  // Turn-level diff storage
  turnDiffs: Map<string, TurnDiffState>; // turnId -> state
  
  // Rendered diff trees (cached)
  diffTrees: Map<string, DiffTreeNode[]>; // turnId -> tree
  
  // Actions
  setTurnDiff: (turnId: string, threadId: string, diffs: FileDiff[]) => void;
  setTurnDiffError: (turnId: string, error: string) => void;
  getTurnDiff: (turnId: string) => TurnDiffState | null;
  getDiffTree: (turnId: string) => DiffTreeNode[] | null;
  toggleNodeInTree: (turnId: string, nodeId: string) => void;
  clearTurnDiff: (turnId: string) => void;
}

export const useDiffStore = create<DiffStoreState>((set, get) => ({
  turnDiffs: new Map(),
  diffTrees: new Map(),

  setTurnDiff: (turnId, threadId, diffs) => {
    const turnDiffState: TurnDiffState = {
      turnId,
      threadId,
      diffs,
      createdAt: new Date().toISOString(),
      status: 'parsed',
    };

    const tree = buildDiffTree(diffs);

    set((state) => {
      const newTurnDiffs = new Map(state.turnDiffs);
      newTurnDiffs.set(turnId, turnDiffState);
      
      const newDiffTrees = new Map(state.diffTrees);
      newDiffTrees.set(turnId, tree);

      return {
        turnDiffs: newTurnDiffs,
        diffTrees: newDiffTrees,
      };
    });
  },

  setTurnDiffError: (turnId, error) => {
    set((state) => {
      const existing = state.turnDiffs.get(turnId);
      if (!existing) return state;

      const updated: TurnDiffState = {
        ...existing,
        status: 'error',
        errorMessage: error,
      };

      const newTurnDiffs = new Map(state.turnDiffs);
      newTurnDiffs.set(turnId, updated);

      return { turnDiffs: newTurnDiffs };
    });
  },

  getTurnDiff: (turnId) => {
    return get().turnDiffs.get(turnId) ?? null;
  },

  getDiffTree: (turnId) => {
    return get().diffTrees.get(turnId) ?? null;
  },

  toggleNodeInTree: (turnId, nodeId) => {
    const tree = get().diffTrees.get(turnId);
    if (!tree) return;

    const updated = toggleNodeCollapse(tree, nodeId);

    set((state) => {
      const newDiffTrees = new Map(state.diffTrees);
      newDiffTrees.set(turnId, updated);
      return { diffTrees: newDiffTrees };
    });
  },

  clearTurnDiff: (turnId) => {
    set((state) => {
      const newTurnDiffs = new Map(state.turnDiffs);
      newTurnDiffs.delete(turnId);
      
      const newDiffTrees = new Map(state.diffTrees);
      newDiffTrees.delete(turnId);

      return {
        turnDiffs: newTurnDiffs,
        diffTrees: newDiffTrees,
      };
    });
  },
}));
```

**E3. Create Diff Route Search State** → `src/stores/diff-route-search-store.ts`

Port `diffRouteSearch.ts` logic:
```typescript
import { create } from 'zustand';

interface DiffRouteSearchState {
  // Search/filter state for diff panel
  searchQuery: string;
  fileFilter: string | null; // Filter to specific file path
  showOnlyChanges: boolean; // Hide context lines
  
  // Actions
  setSearchQuery: (query: string) => void;
  setFileFilter: (filePath: string | null) => void;
  toggleShowOnlyChanges: () => void;
  clearFilters: () => void;
}

export const useDiffRouteSearchStore = create<DiffRouteSearchState>((set) => ({
  searchQuery: '',
  fileFilter: null,
  showOnlyChanges: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFileFilter: (filePath) => set({ fileFilter: filePath }),
  toggleShowOnlyChanges: () =>
    set((state) => ({ showOnlyChanges: !state.showOnlyChanges })),
  clearFilters: () =>
    set({ searchQuery: '', fileFilter: null, showOnlyChanges: false }),
}));
```

---

### Phase F: UI Components

**F1. Create Diff Line Component** → `src/components/diff-line.tsx`

```typescript
import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { DiffLine } from '@/lib/diff-types';

interface DiffLineProps {
  line: DiffLine;
  showLineNumbers?: boolean;
}

/**
 * Single line in a diff hunk with syntax highlighting
 */
export const DiffLineComponent = memo(function DiffLineComponent({
  line,
  showLineNumbers = true,
}: DiffLineProps) {
  const lineTypeClasses = {
    addition: 'bg-green-500/10 text-green-700 dark:text-green-300',
    deletion: 'bg-red-500/10 text-red-700 dark:text-red-300',
    context: 'bg-transparent text-foreground',
  };

  return (
    <div
      className={cn(
        'flex items-start font-mono text-sm px-4 py-1',
        lineTypeClasses[line.type]
      )}
    >
      {showLineNumbers && (
        <>
          <span className="w-12 text-right text-muted-foreground select-none">
            {line.oldLineNumber}
          </span>
          <span className="w-12 text-right text-muted-foreground select-none ml-2">
            {line.newLineNumber}
          </span>
        </>
      )}
      <pre className="flex-1 ml-4 whitespace-pre-wrap break-all">
        <code>{line.content}</code>
      </pre>
    </div>
  );
});
```

**F2. Create Diff Hunk Component** → `src/components/diff-hunk.tsx`

```typescript
import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { DiffHunk } from '@/lib/diff-types';
import { DiffLineComponent } from './diff-line';

interface DiffHunkProps {
  hunk: DiffHunk;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

/**
 * Collapsible hunk section within a file diff
 */
export const DiffHunkComponent = memo(function DiffHunkComponent({
  hunk,
  collapsed = false,
  onToggleCollapse,
}: DiffHunkProps) {
  return (
    <div className="border-t border-border/50">
      <button
        type="button"
        onClick={onToggleCollapse}
        className={cn(
          'w-full px-4 py-2 text-left text-xs font-mono',
          'bg-muted/30 hover:bg-muted/50 transition-colors',
          'flex items-center justify-between'
        )}
      >
        <span className="text-muted-foreground">{hunk.header}</span>
        <span className="text-xs">
          {collapsed ? '▶' : '▼'}
        </span>
      </button>
      
      {!collapsed && (
        <div className="divide-y divide-border/30">
          {hunk.lines.map((line, index) => (
            <DiffLineComponent
              key={`${hunk.header}-${index}`}
              line={line}
            />
          ))}
        </div>
      )}
    </div>
  );
});
```

**F3. Create File Diff Component** → `src/components/file-diff.tsx`

```typescript
import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { FileDiff } from '@/lib/diff-types';
import { DiffHunkComponent } from './diff-hunk';
import { useDiffStore } from '@/stores/diff-store';

interface FileDiffProps {
  fileDiff: FileDiff;
  turnId: string;
}

/**
 * Complete file diff with header and collapsible hunks
 */
export const FileDiffComponent = memo(function FileDiffComponent({
  fileDiff,
  turnId,
}: FileDiffProps) {
  const toggleNodeInTree = useDiffStore((state) => state.toggleNodeInTree);

  const displayPath = fileDiff.newPath ?? fileDiff.oldPath ?? 'unknown';
  const statusLabel = fileDiff.isNew
    ? 'Added'
    : fileDiff.isDeleted
    ? 'Deleted'
    : fileDiff.isRenamed
    ? 'Renamed'
    : 'Modified';

  if (fileDiff.isBinary) {
    return (
      <div className="backdrop-blur-lg bg-card/40 border border-border/50 rounded-lg mb-4">
        <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
          <span className="font-mono text-sm font-medium">{displayPath}</span>
          <span className="text-xs text-muted-foreground">Binary file</span>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-lg bg-card/40 border border-border/50 rounded-lg mb-4 overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium">{displayPath}</span>
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              fileDiff.isNew && 'bg-green-500/20 text-green-700 dark:text-green-300',
              fileDiff.isDeleted && 'bg-red-500/20 text-red-700 dark:text-red-300',
              !fileDiff.isNew && !fileDiff.isDeleted && 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
            )}
          >
            {statusLabel}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {fileDiff.hunks.length} {fileDiff.hunks.length === 1 ? 'hunk' : 'hunks'}
        </span>
      </div>

      <div className="divide-y divide-border/30">
        {fileDiff.hunks.map((hunk, index) => (
          <DiffHunkComponent
            key={`${fileDiff.id}-hunk-${index}`}
            hunk={hunk}
            onToggleCollapse={() => toggleNodeInTree(turnId, `${fileDiff.id}-hunk-${index}`)}
          />
        ))}
      </div>
    </div>
  );
});
```

**F4. Create Main Diff Panel** → `src/components/diff-panel.tsx`

Port `DiffPanel.tsx` with glassmorphism:
```typescript
import { useDiffStore } from '@/stores/diff-store';
import { useDiffRouteSearchStore } from '@/stores/diff-route-search-store';
import { FileDiffComponent } from './file-diff';
import { cn } from '@/lib/utils';

interface DiffPanelProps {
  turnId: string;
  className?: string;
}

/**
 * Main panel displaying all file diffs for a turn
 * Features: search, filtering, glassmorphism UI
 */
export function DiffPanel({ turnId, className }: DiffPanelProps) {
  const turnDiff = useDiffStore((state) => state.getTurnDiff(turnId));
  const searchQuery = useDiffRouteSearchStore((state) => state.searchQuery);
  const fileFilter = useDiffRouteSearchStore((state) => state.fileFilter);

  if (!turnDiff) {
    return (
      <div className={cn('p-8 text-center text-muted-foreground', className)}>
        No diff data available
      </div>
    );
  }

  if (turnDiff.status === 'error') {
    return (
      <div className={cn('p-8 text-center', className)}>
        <p className="text-red-600 dark:text-red-400">
          Failed to parse diff: {turnDiff.errorMessage}
        </p>
      </div>
    );
  }

  // Apply filters
  let filteredDiffs = turnDiff.diffs;

  if (fileFilter) {
    filteredDiffs = filteredDiffs.filter(
      (diff) => diff.newPath === fileFilter || diff.oldPath === fileFilter
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredDiffs = filteredDiffs.filter((diff) => {
      const path = (diff.newPath ?? diff.oldPath ?? '').toLowerCase();
      return path.includes(query);
    });
  }

  if (filteredDiffs.length === 0) {
    return (
      <div className={cn('p-8 text-center text-muted-foreground', className)}>
        No files match the current filters
      </div>
    );
  }

  return (
    <div className={cn('p-4 space-y-4', className)}>
      {filteredDiffs.map((fileDiff) => (
        <FileDiffComponent
          key={fileDiff.id}
          fileDiff={fileDiff}
          turnId={turnId}
        />
      ))}
    </div>
  );
}
```

**F5. Create Diff Toolbar** → `src/components/diff-toolbar.tsx`

```typescript
import { useDiffRouteSearchStore } from '@/stores/diff-route-search-store';
import { cn } from '@/lib/utils';

/**
 * Toolbar for diff panel with search and filter controls
 */
export function DiffToolbar() {
  const searchQuery = useDiffRouteSearchStore((state) => state.searchQuery);
  const setSearchQuery = useDiffRouteSearchStore((state) => state.setSearchQuery);
  const clearFilters = useDiffRouteSearchStore((state) => state.clearFilters);

  return (
    <div className="backdrop-blur-xl bg-muted/40 border-b border-border/50 px-4 py-3 flex items-center gap-3">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search files..."
        className={cn(
          'flex-1 px-3 py-1.5 rounded-md text-sm',
          'bg-background/50 border border-border/50',
          'focus:outline-none focus:ring-2 focus:ring-primary/50'
        )}
      />
      
      {searchQuery && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
```

---

### Phase G: Integration & Routing

**G1. Create Diff Route** → `src/routes/_chat.$threadId.diff.tsx`

```typescript
import { createFileRoute } from '@tanstack/react-router';
import { DiffPanel } from '@/components/diff-panel';
import { DiffToolbar } from '@/components/diff-toolbar';

export const Route = createFileRoute('/_chat/$threadId/diff')({
  component: DiffRoute,
});

function DiffRoute() {
  const { threadId } = Route.useParams();
  
  // TODO: Get turnId from thread state (will be implemented in Task 02)
  const turnId = 'current-turn-id'; // Placeholder

  return (
    <div className="flex flex-col h-full">
      <DiffToolbar />
      <div className="flex-1 overflow-y-auto">
        <DiffPanel turnId={turnId} />
      </div>
    </div>
  );
}
```

**G2. Hook into Chat Message Rendering**

When assistant sends code changes:
1. Extract unified diff from message
2. Use `useDiffWorkerPool()` to parse async
3. Store result via `useDiffStore().setTurnDiff()`
4. Render `<DiffPanel>` inline or in sidebar

---

### Phase H: Testing & Optimization

**H1. Create Unit Tests**
- Test `diff-parser.ts` with various unified diff formats
- Test `diff-tree-builder.ts` tree transformations
- Test Zustand store actions and selectors

**H2. Create Integration Tests**
- Test worker pool under load (multiple concurrent diffs)
- Test UI rendering with large diffs (virtualization if needed)
- Test search/filter interactions

**H3. Performance Optimizations**
- Use `React.memo` on all diff components (already done)
- Add `react-virtualized` or `@tanstack/react-virtual` for large diffs
- Implement lazy loading for collapsed hunks
- Cache parsed diffs in IndexedDB for offline access

**H4. Accessibility**
- Add keyboard navigation for collapsed/expanded hunks
- Ensure proper ARIA labels on interactive elements
- Test screen reader compatibility

---

### Phase I: Final Polish

**I1. Add Syntax Highlighting** (Optional Enhancement)
- Integrate `shiki` for language-aware highlighting
- Detect language from file extension
- Apply theme-aware colors (light/dark mode)

**I2. Add Copy/Download Actions**
- Copy diff to clipboard
- Download diff as `.patch` file
- Share diff permalink (if SaaS supports sharing)

**I3. Add Diff Statistics**
- Show +/- line counts per file
- Show overall changes summary
- Visual bar charts for change distribution

---

## Checklist

### Core Functionality
- [ ] **A1-A2**: Install dependencies, verify Vite worker config
- [ ] **B1-B2**: Define TypeScript types for diffs and sessions
- [ ] **C1-C2**: Implement diff parser and tree builder
- [ ] **D1-D3**: Create Web Worker, pool manager, and React hook
- [ ] **E1-E3**: Create Zustand stores (session, diff, search)
- [ ] **F1-F5**: Build UI components with glassmorphism
- [ ] **G1-G2**: Integrate into routing and chat

### Testing & QA
- [ ] **H1**: Unit tests for parsing and tree logic
- [ ] **H2**: Integration tests for worker pool and UI
- [ ] **H3**: Performance audit (large diffs, memory usage)
- [ ] **H4**: Accessibility audit (keyboard nav, screen readers)

### Polish
- [ ] **I1**: Syntax highlighting (optional)
- [ ] **I2**: Copy/download actions
- [ ] **I3**: Diff statistics UI

### Code Quality
- [ ] All files use **kebab-case** naming
- [ ] Run `bun x ultracite fix` before commit
- [ ] TypeScript compiles (`bun run build`)
- [ ] All components use glassmorphism patterns
- [ ] Test in light and dark themes

---

## Dependencies on Other Tasks

- **Task 02 (Chat Mechanics)**: Needs turn IDs and message streaming to trigger diff parsing
- **Task 04 (IPC Bridge)**: May need Tauri IPC for file system operations (e.g., apply diff)
- **Task 11 (Settings)**: May need settings for diff preferences (theme, syntax highlighting)

---

## Success Criteria

1. Unified diffs parse correctly into `FileDiff[]` structures
2. Worker pool handles 10+ concurrent diffs without blocking UI
3. Diff panel renders with iOS 26 glassmorphism effects
4. Search/filter works instantly on 100+ file diffs
5. All Zustand stores persist state across page reloads
6. No console errors, all TypeScript types explicit
7. Ultracite passes with zero warnings

---

## Notes

- **Performance**: Use Web Workers for parsing to keep UI responsive
- **Glassmorphism**: Apply `backdrop-blur-xl bg-*/40 border-*/50` to all panels
- **State Management**: Separate concerns (session vs diff vs search state)
- **Testing**: Focus on parser correctness and worker reliability
- **Future**: Consider syntax highlighting with `shiki` post-MVP
