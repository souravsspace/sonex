import type { FileDiff } from "./diff/types";

/**
 * Active chat session state
 */
export interface SessionState {
  branchName: string | null;
  isActive: boolean;
  lastActivityAt: string;
  threadId: string;
  workTreePath: string | null;
}

/**
 * Turn-level diff state (per assistant response)
 */
export interface TurnDiffState {
  createdAt: string;
  diffs: FileDiff[];
  errorMessage?: string;
  status: "pending" | "parsed" | "error";
  threadId: string;
  turnId: string;
}
