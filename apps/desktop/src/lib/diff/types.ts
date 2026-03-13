/**
 * Type definitions for diff rendering and parsing
 */

/**
 * Individual line in a diff hunk
 */
export interface DiffLine {
  content: string;
  newLineNumber: number | null;
  oldLineNumber: number | null;
  type: "context" | "addition" | "deletion";
}

/**
 * Unified diff hunk with line-level changes
 */
export interface DiffHunk {
  header: string;
  lines: DiffLine[];
  newLines: number;
  newStart: number;
  oldLines: number;
  oldStart: number;
}

/**
 * Parsed file-level diff with metadata
 */
export interface FileDiff {
  hunks: DiffHunk[];
  id: string;
  isBinary: boolean;
  isDeleted: boolean;
  isNew: boolean;
  isRenamed: boolean;
  newPath: string | null;
  oldPath: string | null;
}

/**
 * Abstract syntax tree node for rendered diff
 */
export interface DiffTreeNode {
  children?: DiffTreeNode[];
  collapsed?: boolean;
  data: FileDiff | DiffHunk | DiffLine;
  id: string;
  type: "file" | "hunk" | "line";
}

/**
 * Worker message types for async parsing
 */
export interface DiffWorkerRequest {
  id: string;
  payload: string;
  type: "parse";
}

export interface DiffWorkerResponse {
  id: string;
  payload: FileDiff[] | string;
  type: "result" | "error";
}
