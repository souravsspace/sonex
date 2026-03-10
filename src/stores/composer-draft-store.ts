/**
 * Composer draft store using Zustand
 * Handles per-thread draft storage with localStorage persistence
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ComposerDraft } from "@/lib/composer-types";

interface ComposerDraftState {
  activeDraftId: string | null;
  clearDraft: (threadId: string) => void;
  drafts: Record<string, ComposerDraft>; // Keyed by threadId
  getAllDrafts: () => ComposerDraft[];

  // Actions
  getDraft: (threadId: string) => ComposerDraft | undefined;
  setActiveDraft: (threadId: string | null) => void;
  setDraft: (
    threadId: string,
    content: string,
    mentions?: ComposerDraft["mentions"],
    attachments?: ComposerDraft["attachments"]
  ) => void;
}

const STORAGE_KEY = "sonex-composer-drafts";
const NEW_THREAD_ID = "__new__";

export const useComposerDraftStore = create<ComposerDraftState>()(
  persist(
    (set, get) => ({
      drafts: {},
      activeDraftId: null,

      getDraft: (threadId: string) => {
        return get().drafts[threadId];
      },

      setDraft: (threadId, content, mentions = [], attachments = []) => {
        set((state) => ({
          drafts: {
            ...state.drafts,
            [threadId]: {
              threadId,
              content,
              mentions,
              attachments,
              lastSaved: new Date().toISOString(),
            },
          },
        }));
      },

      clearDraft: (threadId: string) => {
        set((state) => {
          const { [threadId]: _, ...rest } = state.drafts;
          return { drafts: rest };
        });
      },

      getAllDrafts: () => {
        return Object.values(get().drafts);
      },

      setActiveDraft: (threadId: string | null) => {
        set({ activeDraftId: threadId });
      },
    }),
    {
      name: STORAGE_KEY,
      // Only persist drafts, not activeDraftId
      partialize: (state) => ({ drafts: state.drafts }),
    }
  )
);

// Helper to get the draft ID for new threads
export const getNewThreadDraftId = () => NEW_THREAD_ID;
