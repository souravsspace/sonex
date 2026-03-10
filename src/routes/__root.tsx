import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { motion } from "motion/react";
import { Aurora } from "@/components/aurora";
import { Toaster } from "@/components/ui/toast";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { AURORA_PALETTES } from "@/lib/aurora-palettes";
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
  const theme = useResolvedTheme();

  // Choose your Aurora palette here! Options: vibrant, sunset, ocean, neon, aurora, fire, mono
  const palette = AURORA_PALETTES.vibrant;
  const auroraColors = [...(theme === "dark" ? palette.dark : palette.light)];

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      id="app-root"
    >
      {/* Aurora background - fixed layer behind all content */}
      <motion.div
        animate={{ opacity: [0.4, 0.5, 0.4] }}
        className="pointer-events-none fixed inset-0 z-0 dark:opacity-25"
        initial={{ opacity: 0 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Aurora
          amplitude={1.2}
          blend={0.6}
          colorStops={auroraColors}
          speed={0.4}
        />
      </motion.div>

      {/* Main content layer */}
      <div className="relative z-10 flex h-full flex-col overflow-hidden">
        <Outlet />
      </div>

      <Toaster />
      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </div>
  );
}
