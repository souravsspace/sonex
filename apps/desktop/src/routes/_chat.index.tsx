import { Message02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";

export const Route = createFileRoute("/_chat/")({
  component: ChatIndex,
});

function ChatIndex() {
  // TODO: Remove placeholder navigation — wire to Tauri IPC in Task 04
  const navigate = useNavigate();
  const handleNewThread = () => {
    navigate({
      to: "/$threadId",
      params: { threadId: `thread-${Date.now()}` },
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <Empty
        description="Select a thread from the sidebar or create a new one to get started."
        icon={<HugeiconsIcon icon={Message02Icon} size={24} />}
        title="No thread selected"
      >
        <Button onClick={handleNewThread} size="sm" variant="outline">
          New Thread
        </Button>
      </Empty>
    </div>
  );
}
