import { create } from "zustand";
import { buildDiffTree, toggleNodeCollapse } from "@/lib/diff/tree-builder";
import type { DiffTreeNode, FileDiff } from "@/lib/diff/types";
import type { TurnDiffState } from "@/lib/session-types";

interface DiffStoreState {
  clearTurnDiff: (turnId: string) => void;
  diffTrees: Map<string, DiffTreeNode[]>;
  getDiffTree: (turnId: string) => DiffTreeNode[] | null;
  getTurnDiff: (turnId: string) => TurnDiffState | null;
  setTurnDiff: (turnId: string, threadId: string, diffs: FileDiff[]) => void;
  setTurnDiffError: (turnId: string, error: string) => void;
  toggleNodeInTree: (turnId: string, nodeId: string) => void;
  turnDiffs: Map<string, TurnDiffState>;
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
      status: "parsed",
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
      if (!existing) {
        return state;
      }

      const updated: TurnDiffState = {
        ...existing,
        status: "error",
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
    if (!tree) {
      return;
    }

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
