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
    <>
      {/* Blur gradient overlay for top - ends right after TopBar */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-[9] h-24 backdrop-blur-xl"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 5%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.05) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 5%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.05) 95%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* TopBar content */}
      <div className="pointer-events-none absolute top-0 left-0 z-10">
        <div className="pointer-events-auto pt-9">
          <div className="mb-3 ml-4 flex w-fit items-center gap-2 rounded-lg border border-border/40 bg-muted/40 px-3 py-1 backdrop-blur-xl dark:border-border/30 dark:bg-muted/20">
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
              <span className="font-mono text-muted-foreground text-xs">
                Thread: {threadId}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
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
      <SidebarInset className="relative flex min-h-0 flex-col overflow-hidden">
        <TopBar threadId={threadId} />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
