// biome-ignore lint/style/useFilenamingConvention: TanStack Router requires $ prefix for dynamic route params
import { createFileRoute } from "@tanstack/react-router";
import { ChatView } from "@/components/chat/chat-view";

export const Route = createFileRoute("/_chat/$threadId")({
  component: ThreadView,
});

function ThreadView() {
  const { threadId } = Route.useParams();

  return <ChatView threadId={threadId} />;
}
