/**
 * Native API Abstraction Layer
 * Type-safe wrapper around Tauri's invoke() for IPC communication
 */

import { invoke } from "@tauri-apps/api/core";
import type {
  AppSettings,
  CommitParams,
  CreateThreadParams,
  GitBranch,
  GitStatus,
  IPCContracts,
  Keybinding,
  Project,
  ReadFileParams,
  SendMessageParams,
  Terminal,
  TerminalInputParams,
  TerminalResizeParams,
  WorkspaceEntry,
  WriteFileParams,
} from "./ipc-contracts";
import type { Message, Thread } from "./models";

/**
 * Core NativeAPI class - provides type-safe invoke wrapper
 */
class NativeAPI {
  /**
   * Generic invoke wrapper with full type safety
   */
  async call<K extends keyof IPCContracts>(
    command: K,
    request: IPCContracts[K]["request"]
  ): Promise<IPCContracts[K]["response"]> {
    try {
      // For undefined requests, don't pass a request parameter
      if (request === undefined) {
        return await invoke(command);
      }
      return await invoke(command, { request });
    } catch (error) {
      console.error(`IPC call failed: ${command}`, error);
      throw error;
    }
  }
}

/**
 * Singleton instance of Native API
 */
export const nativeApi = new NativeAPI();

/**
 * Project API - Convenience methods for project management
 */
export const projectApi = {
  /**
   * Create a new project
   */
  create: (path: string, name: string): Promise<Project> =>
    nativeApi.call("project:create", { path, name }),

  /**
   * Get a project by ID
   */
  get: (projectId: string): Promise<Project> =>
    nativeApi.call("project:get", { projectId }),

  /**
   * List all projects
   */
  list: (): Promise<Project[]> => nativeApi.call("project:list", undefined),
};

/**
 * Thread API - Convenience methods for thread management
 */
export const threadApi = {
  /**
   * Create a new thread
   */
  create: (params: CreateThreadParams): Promise<Thread> =>
    nativeApi.call("thread:create", params),

  /**
   * Delete a thread
   */
  delete: (threadId: string): Promise<undefined> =>
    nativeApi.call("thread:delete", { threadId }),

  /**
   * Get a thread by ID
   */
  get: (threadId: string): Promise<Thread> =>
    nativeApi.call("thread:get", { threadId }),

  /**
   * List all threads for a project
   */
  list: (projectId: string): Promise<Thread[]> =>
    nativeApi.call("thread:list", { projectId }),
};

/**
 * Message API - Convenience methods for message operations
 */
export const messageApi = {
  /**
   * List all messages in a thread
   */
  list: (threadId: string): Promise<Message[]> =>
    nativeApi.call("message:list", { threadId }),

  /**
   * Send a new message
   */
  send: (params: SendMessageParams): Promise<undefined> =>
    nativeApi.call("message:send", params),
};

/**
 * Workspace API - Convenience methods for file operations
 */
export const workspaceApi = {
  /**
   * Get entries in a directory
   */
  getEntries: (path: string): Promise<WorkspaceEntry[]> =>
    nativeApi.call("workspace:get-entries", { path }),

  /**
   * Read a file's content
   */
  readFile: (params: ReadFileParams): Promise<string> =>
    nativeApi.call("workspace:read-file", params),

  /**
   * Write content to a file
   */
  writeFile: (params: WriteFileParams): Promise<undefined> =>
    nativeApi.call("workspace:write-file", params),
};

/**
 * Git API - Convenience methods for git operations
 */
export const gitApi = {
  /**
   * List branches
   */
  branch: (projectId: string): Promise<GitBranch[]> =>
    nativeApi.call("git:branch", { projectId }),

  /**
   * Commit changes
   */
  commit: (params: CommitParams): Promise<undefined> =>
    nativeApi.call("git:commit", params),

  /**
   * Get git status
   */
  status: (projectId: string): Promise<GitStatus> =>
    nativeApi.call("git:status", { projectId }),
};

/**
 * Terminal API - Convenience methods for terminal operations
 */
export const terminalApi = {
  /**
   * Close a terminal
   */
  close: (terminalId: string): Promise<undefined> =>
    nativeApi.call("terminal:close", { terminalId }),

  /**
   * Create a new terminal
   */
  create: (projectId: string): Promise<Terminal> =>
    nativeApi.call("terminal:create", { projectId }),

  /**
   * Send input to a terminal
   */
  input: (params: TerminalInputParams): Promise<undefined> =>
    nativeApi.call("terminal:input", params),

  /**
   * Resize a terminal
   */
  resize: (params: TerminalResizeParams): Promise<undefined> =>
    nativeApi.call("terminal:resize", params),
};

/**
 * Settings API - Convenience methods for app settings
 */
export const settingsApi = {
  /**
   * Get current app settings
   */
  get: (): Promise<AppSettings> => nativeApi.call("settings:get", undefined),

  /**
   * Update app settings
   */
  update: (settings: Partial<AppSettings>): Promise<undefined> =>
    nativeApi.call("settings:update", settings),
};

/**
 * Keybindings API - Convenience methods for keybindings
 */
export const keybindingsApi = {
  /**
   * Get all keybindings
   */
  get: (): Promise<Keybinding[]> =>
    nativeApi.call("keybindings:get", undefined),
};
