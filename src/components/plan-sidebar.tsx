import { Link, useNavigate } from "@tanstack/react-router";
import { PlusIcon, SettingsIcon, ThreadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface PlanSidebarProps {
  activeThreadId?: string;
}

// TODO: Placeholder thread data — replaced by store data in Task 03
const PLACEHOLDER_THREADS = [
  { id: "thread-1", title: "Implement auth flow", updatedAt: "2 hours ago" },
  { id: "thread-2", title: "Fix navigation bug", updatedAt: "Yesterday" },
  { id: "thread-3", title: "Add dark mode", updatedAt: "3 days ago" },
];

function PlanSidebar({ activeThreadId }: PlanSidebarProps) {
  const navigate = useNavigate();

  const handleNewThread = () => {
    // TODO: Remove placeholder navigation — wire to Tauri IPC in Task 04
    navigate({
      to: "/",
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="gap-0 p-0">
        <div className="flex items-center justify-between px-4 pt-9 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="font-bold text-xs">S</span>
            </div>
            <span className="font-semibold text-sm">Sonex</span>
          </div>
          <SidebarTrigger className="h-6 w-6" />
        </div>
        <Separator />
        <div className="px-2 py-2">
          <Button
            className="w-full justify-start gap-2"
            onClick={handleNewThread}
            size="sm"
            variant="ghost"
          >
            <PlusIcon size={14} />
            New Thread
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {PLACEHOLDER_THREADS.map((thread) => (
                <SidebarMenuItem key={thread.id}>
                  <SidebarMenuButton
                    isActive={activeThreadId === thread.id}
                    render={
                      <Link params={{ threadId: thread.id }} to="/$threadId" />
                    }
                    tooltip={thread.title}
                  >
                    <ThreadIcon size={14} />
                    <span className="truncate">{thread.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Separator />
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2 px-1">
            <div className="flex size-6 items-center justify-center rounded-full bg-muted font-medium text-xs">
              U
            </div>
            <span className="text-muted-foreground text-xs">User</span>
          </div>
          <Button
            onClick={() => navigate({ to: "/settings" })}
            size="icon-sm"
            variant="ghost"
          >
            <SettingsIcon size={14} />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export { PlanSidebar };
