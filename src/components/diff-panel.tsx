import { cn } from "@/lib/utils";
import { useDiffRouteSearchStore } from "@/stores/diff-route-search-store";
import { useDiffStore } from "@/stores/diff-store";
import { FileDiffComponent } from "./file-diff";

interface DiffPanelProps {
  className?: string;
  turnId: string;
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
      <div className={cn("p-8 text-center text-muted-foreground", className)}>
        No diff data available
      </div>
    );
  }

  if (turnDiff.status === "error") {
    return (
      <div className={cn("p-8 text-center", className)}>
        <p className="text-red-600 dark:text-red-400">
          Failed to parse diff: {turnDiff.errorMessage}
        </p>
      </div>
    );
  }

  let filteredDiffs = turnDiff.diffs;

  if (fileFilter) {
    filteredDiffs = filteredDiffs.filter(
      (diff) => diff.newPath === fileFilter || diff.oldPath === fileFilter
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredDiffs = filteredDiffs.filter((diff) => {
      const path = (diff.newPath ?? diff.oldPath ?? "").toLowerCase();
      return path.includes(query);
    });
  }

  if (filteredDiffs.length === 0) {
    return (
      <div className={cn("p-8 text-center text-muted-foreground", className)}>
        No files match the current filters
      </div>
    );
  }

  return (
    <div className={cn("space-y-4 p-4", className)}>
      {filteredDiffs.map((fileDiff) => (
        <FileDiffComponent
          fileDiff={fileDiff}
          key={fileDiff.id}
          turnId={turnId}
        />
      ))}
    </div>
  );
}
