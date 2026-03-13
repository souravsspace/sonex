import { memo } from "react";
import type { DiffHunk } from "@/lib/diff/types";
import { cn } from "@/lib/utils";
import { DiffLineComponent } from "./diff-line";

interface DiffHunkProps {
  collapsed?: boolean;
  hunk: DiffHunk;
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
    <div className="border-border/50 border-t">
      <button
        className={cn(
          "w-full px-4 py-2 text-left font-mono text-xs",
          "bg-muted/30 transition-colors hover:bg-muted/50",
          "flex items-center justify-between"
        )}
        onClick={onToggleCollapse}
        type="button"
      >
        <span className="text-muted-foreground">{hunk.header}</span>
        <span className="text-xs">{collapsed ? "▶" : "▼"}</span>
      </button>

      {!collapsed && (
        <div className="divide-y divide-border/30">
          {hunk.lines.map((line) => {
            const lineKey = `${line.oldLineNumber ?? "new"}-${line.newLineNumber ?? "del"}-${line.content.slice(0, 20)}`;
            return <DiffLineComponent key={lineKey} line={line} />;
          })}
        </div>
      )}
    </div>
  );
});
