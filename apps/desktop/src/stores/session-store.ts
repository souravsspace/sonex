import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SessionState } from "@/lib/session-types";

interface SessionStoreState {
  activeSession: SessionState | null;
  addRecentSession: (session: SessionState) => void;
  clearActiveSession: () => void;
  getSessionByThreadId: (threadId: string) => SessionState | null;
  recentSessions: SessionState[];
  setActiveSession: (session: SessionState) => void;
  updateSessionActivity: (threadId: string) => void;
}

export const useSessionStore = create<SessionStoreState>()(
  persist(
    (set, get) => ({
      activeSession: null,
      recentSessions: [],

      setActiveSession: (session) => {
        set({ activeSession: session });
        get().addRecentSession(session);
      },

      clearActiveSession: () => {
        set({ activeSession: null });
      },

      updateSessionActivity: (threadId) => {
        const { activeSession, recentSessions } = get();
        const now = new Date().toISOString();

        if (activeSession?.threadId === threadId) {
          set({
            activeSession: { ...activeSession, lastActivityAt: now },
          });
        }

        const updated = recentSessions.map((session) =>
          session.threadId === threadId
            ? { ...session, lastActivityAt: now }
            : session
        );
        set({ recentSessions: updated });
      },

      addRecentSession: (session) => {
        const { recentSessions } = get();
        const filtered = recentSessions.filter(
          (s) => s.threadId !== session.threadId
        );
        const updated = [session, ...filtered].slice(0, 20);
        set({ recentSessions: updated });
      },

      getSessionByThreadId: (threadId) => {
        return (
          get().recentSessions.find((s) => s.threadId === threadId) ?? null
        );
      },
    }),
    { name: "sonex-session" }
  )
);
