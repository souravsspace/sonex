import { create } from "zustand";

interface DiffRouteSearchState {
  clearFilters: () => void;
  fileFilter: string | null;
  searchQuery: string;
  setFileFilter: (filePath: string | null) => void;
  setSearchQuery: (query: string) => void;
  showOnlyChanges: boolean;
  toggleShowOnlyChanges: () => void;
}

export const useDiffRouteSearchStore = create<DiffRouteSearchState>((set) => ({
  searchQuery: "",
  fileFilter: null,
  showOnlyChanges: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFileFilter: (filePath) => set({ fileFilter: filePath }),
  toggleShowOnlyChanges: () =>
    set((state) => ({ showOnlyChanges: !state.showOnlyChanges })),
  clearFilters: () =>
    set({ searchQuery: "", fileFilter: null, showOnlyChanges: false }),
}));
