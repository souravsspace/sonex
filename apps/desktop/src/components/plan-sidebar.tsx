import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { projectApi, threadApi } from "@/lib/native-api";

interface PlanSidebarProps {
  activeThreadId?: string;
}

function PlanSidebar({ activeThreadId }: PlanSidebarProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch projects (for now, we'll use the first project)
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectApi.list(),
  });

  const currentProjectId = projects[0]?.id;

  // Fetch threads for the current project
  const { data: threads = [], isLoading: threadsLoading } = useQuery({
    queryKey: ["threads", currentProjectId],
    queryFn: () => threadApi.list(currentProjectId),
    enabled: !!currentProjectId,
  });

  // Create new thread mutation
  const createThreadMutation = useMutation({
    mutationFn: () => {
      if (!currentProjectId) {
        throw new Error("No project selected");
      }
      return threadApi.create({
        projectId: currentProjectId,
        title: "New Thread",
      });
    },
    onSuccess: (newThread) => {
      // Invalidate threads query to refetch
      queryClient.invalidateQueries({
        queryKey: ["threads", currentProjectId],
      });
      // Navigate to the new thread
      navigate({ to: "/$threadId", params: { threadId: newThread.id } });
    },
  });

  const handleNewThread = () => {
    createThreadMutation.mutate();
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
              {threadsLoading && (
                <div className="px-3 py-2 text-muted-foreground text-xs">
                  Loading threads...
                </div>
              )}
              {!threadsLoading && threads.length === 0 && (
                <div className="px-3 py-2 text-muted-foreground text-xs">
                  No threads yet. Create one to get started.
                </div>
              )}
              {!threadsLoading &&
                threads.length > 0 &&
                threads.map((thread) => (
                  <SidebarMenuItem key={thread.id}>
                    <SidebarMenuButton
                      isActive={activeThreadId === thread.id}
                      render={
                        <Link
                          params={{ threadId: thread.id }}
                          to="/$threadId"
                        />
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
