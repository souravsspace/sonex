// biome-ignore lint/style/useFilenamingConvention: TanStack Router requires $ prefix for dynamic route params
import { createFileRoute } from "@tanstack/react-router";
import { DiffPanel } from "@/components/diff/diff-panel";
import { DiffToolbar } from "@/components/diff/diff-toolbar";

export const Route = createFileRoute("/_chat/$threadId/diff")({
  component: DiffRoute,
});

/**
 * Diff view route for a specific thread
 * Shows all file diffs for the current turn in the thread
 */
function DiffRoute() {
  // TODO: Get threadId and turnId from thread state (will be implemented in Task 02)
  // For now, using a placeholder until session management is connected
  const turnId = "current-turn-id";

  return (
    <div className="flex h-full flex-col">
      <DiffToolbar />
      <div className="flex-1 overflow-y-auto">
        <DiffPanel turnId={turnId} />
      </div>
    </div>
  );
}
