import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { PlanSidebar } from "@/components/plan-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/_chat")({
  component: ChatLayout,
});

function TopBar({ threadId }: { threadId?: string }) {
  const { state } = useSidebar();
  return (
    <div className="flex items-center gap-2 px-2 pt-9 pb-3">
      <div
        className="overflow-hidden transition-all duration-200 ease-linear"
        style={{
          maxWidth: state === "expanded" ? 0 : 32,
          opacity: state === "expanded" ? 0 : 1,
          pointerEvents: state === "expanded" ? "none" : "auto",
        }}
      >
        <SidebarTrigger className="h-6 w-6 shrink-0" />
      </div>
      {threadId && (
        // FIXME: hidden for now!
        <p className="hidden truncate font-mono text-muted-foreground text-xs">
          Thread: {threadId}
        </p>
      )}
    </div>
  );
}

function ChatLayout() {
  const matches = useRouterState({ select: (s) => s.matches });
  const threadMatch = [...matches]
    .reverse()
    .find((m) => "threadId" in m.params);
  const threadId = (threadMatch?.params as Record<string, string> | undefined)
    ?.threadId;

  return (
    <SidebarProvider className="h-full overflow-hidden">
      <PlanSidebar activeThreadId={threadId} />
      <SidebarInset className="flex min-h-0 flex-col overflow-hidden">
        <TopBar threadId={threadId} />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
