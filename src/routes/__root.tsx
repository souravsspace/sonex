import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/components/ui/toast";
import { bootstrapHistory } from "@/utils/history-bootstrap";

export const Route = createRootRoute({
  beforeLoad: () => {
    return bootstrapHistory();
  },
  component: RootComponent,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center">
        <h2 className="mb-2 font-semibold text-destructive">
          Something went wrong
        </h2>
        <p className="text-muted-foreground text-sm">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    </div>
  ),
});

function RootComponent() {
  return (
    <div className="flex h-full flex-col overflow-hidden" id="app-root">
      <Outlet />
      <Toaster />
      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </div>
  );
}
