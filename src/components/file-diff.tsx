import { memo } from "react";
import type { FileDiff } from "@/lib/diff/types";
import { cn } from "@/lib/utils";
import { useDiffStore } from "@/stores/diff-store";
import { DiffHunkComponent } from "./diff-hunk";

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

  const displayPath = fileDiff.newPath ?? fileDiff.oldPath ?? "unknown";

  let statusLabel = "Modified";
  if (fileDiff.isNew) {
    statusLabel = "Added";
  } else if (fileDiff.isDeleted) {
    statusLabel = "Deleted";
  } else if (fileDiff.isRenamed) {
    statusLabel = "Renamed";
  }

  if (fileDiff.isBinary) {
    return (
      <div className="mb-4 rounded-lg border border-border/50 bg-card/40 backdrop-blur-lg">
        <div className="flex items-center justify-between border-border/50 border-b px-4 py-3">
          <span className="font-medium font-mono text-sm">{displayPath}</span>
          <span className="text-muted-foreground text-xs">Binary file</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-border/50 bg-card/40 backdrop-blur-lg">
      <div className="flex items-center justify-between border-border/50 border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="font-medium font-mono text-sm">{displayPath}</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs",
              fileDiff.isNew &&
                "bg-green-500/20 text-green-700 dark:text-green-300",
              fileDiff.isDeleted &&
                "bg-red-500/20 text-red-700 dark:text-red-300",
              !(fileDiff.isNew || fileDiff.isDeleted) &&
                "bg-blue-500/20 text-blue-700 dark:text-blue-300"
            )}
          >
            {statusLabel}
          </span>
        </div>
        <span className="text-muted-foreground text-xs">
          {fileDiff.hunks.length}{" "}
          {fileDiff.hunks.length === 1 ? "hunk" : "hunks"}
        </span>
      </div>

      <div className="divide-y divide-border/30">
        {fileDiff.hunks.map((hunk) => {
          const hunkKey = `${fileDiff.id}-${hunk.oldStart}-${hunk.newStart}`;
          return (
            <DiffHunkComponent
              hunk={hunk}
              key={hunkKey}
              onToggleCollapse={() => toggleNodeInTree(turnId, hunkKey)}
            />
          );
        })}
      </div>
    </div>
  );
});
