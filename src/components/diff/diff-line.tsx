import { memo } from "react";
import type { DiffLine } from "@/lib/diff/types";
import { cn } from "@/lib/utils";

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
    addition: "bg-green-500/10 text-green-700 dark:text-green-300",
    deletion: "bg-red-500/10 text-red-700 dark:text-red-300",
    context: "bg-transparent text-foreground",
  };

  return (
    <div
      className={cn(
        "flex items-start px-4 py-1 font-mono text-sm",
        lineTypeClasses[line.type]
      )}
    >
      {showLineNumbers && (
        <>
          <span className="w-12 select-none text-right text-muted-foreground">
            {line.oldLineNumber}
          </span>
          <span className="ml-2 w-12 select-none text-right text-muted-foreground">
            {line.newLineNumber}
          </span>
        </>
      )}
      <pre className="ml-4 flex-1 whitespace-pre-wrap break-all">
        <code>{line.content}</code>
      </pre>
    </div>
  );
});
