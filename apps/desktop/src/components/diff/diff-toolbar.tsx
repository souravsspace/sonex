import { cn } from "@/lib/utils";
import { useDiffRouteSearchStore } from "@/stores/diff-route-search-store";

/**
 * Toolbar for diff panel with search and filter controls
 */
export function DiffToolbar() {
  const searchQuery = useDiffRouteSearchStore((state) => state.searchQuery);
  const setSearchQuery = useDiffRouteSearchStore(
    (state) => state.setSearchQuery
  );
  const clearFilters = useDiffRouteSearchStore((state) => state.clearFilters);

  return (
    <div className="flex items-center gap-3 border-border/50 border-b bg-muted/40 px-4 py-3 backdrop-blur-xl">
      <input
        className={cn(
          "flex-1 rounded-md px-3 py-1.5 text-sm",
          "border border-border/50 bg-background/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/50"
        )}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search files..."
        type="text"
        value={searchQuery}
      />

      {searchQuery && (
        <button
          className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          onClick={clearFilters}
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  );
}
