/**
 * Native Events - Type-safe event listener system for Tauri IPC events
 * Handles backend→frontend event subscriptions
 */

import { type Event, listen, type UnlistenFn } from "@tauri-apps/api/event";
import { useEffect } from "react";
import type { IPCEvents } from "./ipc-contracts";

/**
 * NativeEvents class - manages event listeners with automatic cleanup
 */
class NativeEvents {
  private readonly listeners = new Map<string, UnlistenFn>();

  /**
   * Listen to a specific event type with type safety
   * Returns an unlisten function for cleanup
   */
  async listen<K extends keyof IPCEvents>(
    eventName: K,
    handler: (payload: IPCEvents[K]) => void
  ): Promise<UnlistenFn> {
    const unlisten = await listen<IPCEvents[K]>(
      eventName,
      (event: Event<IPCEvents[K]>) => {
        handler(event.payload);
      }
    );

    const key = `${eventName as string}-${Date.now()}`;
    this.listeners.set(key, unlisten);

    return () => {
      unlisten();
      this.listeners.delete(key);
    };
  }

  /**
   * Cleanup all active listeners
   */
  cleanup(): void {
    for (const unlisten of this.listeners.values()) {
      unlisten();
    }
    this.listeners.clear();
  }
}

/**
 * Singleton instance of Native Events
 */
export const nativeEvents = new NativeEvents();

/**
 * React hook for subscribing to IPC events
 * Automatically handles cleanup on unmount
 *
 * @param eventName - The event to listen to
 * @param handler - Callback function when event is received
 *
 * @example
 * ```tsx
 * useIPCEvent('terminal:output', (payload) => {
 *   console.log('Terminal:', payload.data);
 * });
 * ```
 */
export function useIPCEvent<K extends keyof IPCEvents>(
  eventName: K,
  handler: (payload: IPCEvents[K]) => void
): void {
  useEffect(() => {
    let unlisten: UnlistenFn | null = null;

    nativeEvents
      .listen(eventName, handler)
      .then((fn) => {
        unlisten = fn;
      })
      .catch((error) => {
        // biome-ignore lint/suspicious/noConsole: Error logging for event setup failures
        console.error(
          `Failed to setup event listener for ${eventName as string}:`,
          error
        );
      });

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, [eventName, handler]);
}

/**
 * Convenience hooks for specific event types
 */

/**
 * Hook for listening to orchestration domain events
 */
export function useOrchestrationEvent(
  handler: (payload: IPCEvents["orchestration:domain-event"]) => void
): void {
  useIPCEvent("orchestration:domain-event", handler);
}

/**
 * Hook for listening to provider runtime events
 */
export function useProviderRuntimeEvent(
  handler: (payload: IPCEvents["provider:runtime-event"]) => void
): void {
  useIPCEvent("provider:runtime-event", handler);
}

/**
 * Hook for listening to terminal output events
 */
export function useTerminalOutput(
  handler: (payload: IPCEvents["terminal:output"]) => void
): void {
  useIPCEvent("terminal:output", handler);
}

/**
 * Hook for listening to git status change events
 */
export function useGitStatusChanged(
  handler: (payload: IPCEvents["git:status-changed"]) => void
): void {
  useIPCEvent("git:status-changed", handler);
}
