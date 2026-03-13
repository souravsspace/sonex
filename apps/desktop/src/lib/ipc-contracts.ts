/**
 * IPC Contract Definitions for Tauri IPC Bridge
 * Replaces WebSocket-based communication with type-safe Tauri invoke/emit patterns
 */

import type { Attachment, Message, Thread } from "./models";

/**
 * Project Management Types
 */
export interface Project {
  createdAt: string; // ISO timestamp
  id: string;
  name: string;
  path: string; // Absolute file system path
}

export interface CreateProjectParams {
  name: string;
  path: string;
}

/**
 * Thread Management Types
 */
export interface CreateThreadParams {
  projectId: string;
  title: string;
}

/**
 * Message Operations Types
 */
export interface SendMessageParams {
  attachments?: Attachment[];
  content: string;
  threadId: string;
}

/**
 * Workspace Operations Types
 */
export interface WorkspaceEntry {
  isDirectory: boolean;
  modifiedAt?: string; // ISO timestamp
  name: string;
  path: string; // Relative to workspace root
  size?: number; // Size in bytes (for files)
}

export interface ReadFileParams {
  path: string;
}

export interface WriteFileParams {
  content: string;
  path: string;
}

/**
 * Git Operations Types
 */
export interface GitStatus {
  branch: string;
  changes: GitChange[];
  projectId: string;
}

export interface GitChange {
  path: string;
  status: "added" | "modified" | "deleted" | "renamed" | "untracked";
}

export interface GitBranch {
  current: boolean;
  name: string;
  remote?: string;
}

export interface CommitParams {
  message: string;
  paths: string[];
  projectId: string;
}

/**
 * Terminal Operations Types
 */
export interface Terminal {
  cols: number;
  cwd: string;
  id: string;
  rows: number;
}

export interface TerminalInputParams {
  input: string;
  terminalId: string;
}

export interface TerminalResizeParams {
  cols: number;
  rows: number;
  terminalId: string;
}

/**
 * Settings & Configuration Types
 */
export interface AppSettings {
  anthropicApiKey?: string;
  autoSave: boolean;
  editorFontSize: number;
  theme: "light" | "dark" | "system";
}

export interface Keybinding {
  command: string;
  key: string;
  when?: string;
}

/**
 * Orchestration Event Types
 */
export interface OrchestrationEvent {
  eventType: string;
  payload: unknown;
  threadId: string;
  timestamp: string; // ISO timestamp
}

/**
 * Provider Runtime Event Types
 */
export interface ProviderRuntimeEvent {
  eventType: "started" | "progress" | "completed" | "error";
  message?: string;
  payload?: unknown;
  threadId: string;
}

/**
 * IPC Contracts - Request/Response mapping for all commands
 * These define the shape of data sent via Tauri invoke() calls
 */
export interface IPCContracts {
  // Git Operations
  "git:branch": { request: { projectId: string }; response: GitBranch[] };
  "git:commit": { request: CommitParams; response: undefined };
  "git:status": { request: { projectId: string }; response: GitStatus };

  // Settings & Config
  "keybindings:get": { request: undefined; response: Keybinding[] };

  // Message Operations
  "message:list": { request: { threadId: string }; response: Message[] };
  "message:send": { request: SendMessageParams; response: undefined };
  // Project Management
  "project:create": { request: CreateProjectParams; response: Project };
  "project:get": { request: { projectId: string }; response: Project };
  "project:list": { request: undefined; response: Project[] };
  "settings:get": { request: undefined; response: AppSettings };
  "settings:update": { request: Partial<AppSettings>; response: undefined };

  // Terminal Operations
  "terminal:close": { request: { terminalId: string }; response: undefined };
  "terminal:create": { request: { projectId: string }; response: Terminal };
  "terminal:input": { request: TerminalInputParams; response: undefined };
  "terminal:resize": { request: TerminalResizeParams; response: undefined };

  // Thread Management
  "thread:create": { request: CreateThreadParams; response: Thread };
  "thread:delete": { request: { threadId: string }; response: undefined };
  "thread:get": { request: { threadId: string }; response: Thread };
  "thread:list": { request: { projectId: string }; response: Thread[] };

  // Workspace Operations
  "workspace:get-entries": {
    request: { path: string };
    response: WorkspaceEntry[];
  };
  "workspace:read-file": { request: ReadFileParams; response: string };
  "workspace:write-file": { request: WriteFileParams; response: undefined };
}

/**
 * IPC Events - Event types for backend→frontend push notifications
 * These are emitted from Rust and listened to in the frontend
 */
export interface IPCEvents {
  "git:status-changed": { projectId: string; status: GitStatus };
  "orchestration:domain-event": OrchestrationEvent;
  "provider:runtime-event": ProviderRuntimeEvent;
  "terminal:output": { data: string; terminalId: string };
}
