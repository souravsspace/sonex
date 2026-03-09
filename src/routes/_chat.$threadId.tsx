// biome-ignore lint/style/useFilenamingConvention: TanStack Router requires $ prefix for dynamic route params
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_chat/$threadId")({
  component: ThreadView,
});

function ThreadView() {
  const { threadId } = Route.useParams();

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 p-4">
        <p>{threadId}</p>
        {/* ChatView renders here in Task 02 */}
      </div>
    </div>
  );
}
