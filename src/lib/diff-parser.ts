import { parsePatch } from "diff";
import type { DiffHunk, DiffLine, FileDiff } from "./diff-types";

const BINARY_FILE_REGEX = /Binary files? .* differ/;
const RENAME_FROM_REGEX = /^rename from (.+)$/m;
const RENAME_TO_REGEX = /^rename to (.+)$/m;

/**
 * Process a single hunk and convert it to DiffHunk format
 */
function processHunk(hunk: {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  lines: string[];
}): DiffHunk {
  const diffLines: DiffLine[] = [];
  let oldLineNum = hunk.oldStart;
  let newLineNum = hunk.newStart;

  for (const line of hunk.lines) {
    const firstChar = line[0];
    const content = line.slice(1);

    if (firstChar === "+") {
      diffLines.push({
        type: "addition",
        content,
        oldLineNumber: null,
        newLineNumber: newLineNum,
      });
      newLineNum++;
    } else if (firstChar === "-") {
      diffLines.push({
        type: "deletion",
        content,
        oldLineNumber: oldLineNum,
        newLineNumber: null,
      });
      oldLineNum++;
    } else {
      diffLines.push({
        type: "context",
        content,
        oldLineNumber: oldLineNum,
        newLineNumber: newLineNum,
      });
      oldLineNum++;
      newLineNum++;
    }
  }

  return {
    oldStart: hunk.oldStart,
    oldLines: hunk.oldLines,
    newStart: hunk.newStart,
    newLines: hunk.newLines,
    lines: diffLines,
    header: `@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`,
  };
}

/**
 * Parse unified diff string into structured FileDiff objects
 *
 * @param unifiedDiff - Raw git diff output (unified format)
 * @returns Array of parsed file diffs
 */
export function parseUnifiedDiff(unifiedDiff: string): FileDiff[] {
  if (!unifiedDiff || unifiedDiff.trim().length === 0) {
    return [];
  }

  const patches = parsePatch(unifiedDiff);
  const fileDiffs: FileDiff[] = [];

  for (const patch of patches) {
    const oldPath =
      patch.oldFileName === "/dev/null" ? null : patch.oldFileName;
    const newPath =
      patch.newFileName === "/dev/null" ? null : patch.newFileName;

    const isNew = oldPath === null;
    const isDeleted = newPath === null;
    const isRenamed =
      oldPath !== null && newPath !== null && oldPath !== newPath;
    const isBinary = patch.hunks.length === 0 && patch.index !== undefined;

    const hunks = patch.hunks.map((hunk) => processHunk(hunk));

    fileDiffs.push({
      id: generateFileDiffId(oldPath, newPath),
      oldPath,
      newPath,
      hunks,
      isNew,
      isDeleted,
      isRenamed,
      isBinary,
    });
  }

  return fileDiffs;
}

/**
 * Detect if a diff represents a binary file
 */
export function isBinaryDiff(diffHeader: string): boolean {
  return BINARY_FILE_REGEX.test(diffHeader);
}

/**
 * Extract file rename information from diff header
 */
export function extractRenameInfo(diffHeader: string): {
  oldPath: string;
  newPath: string;
} | null {
  const renameFromMatch = RENAME_FROM_REGEX.exec(diffHeader);
  const renameToMatch = RENAME_TO_REGEX.exec(diffHeader);

  if (renameFromMatch && renameToMatch) {
    return {
      oldPath: renameFromMatch[1],
      newPath: renameToMatch[1],
    };
  }

  return null;
}

/**
 * Generate stable ID for a file diff
 */
export function generateFileDiffId(
  oldPath: string | null,
  newPath: string | null
): string {
  const path = newPath ?? oldPath ?? "unknown";
  return `diff-${path.replace(/\//g, "-")}`;
}
