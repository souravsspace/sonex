/**
 * Core domain models for chat threads, messages, users, and attachments
 */

// Thread status enum
export type ThreadStatus = "active" | "archived" | "deleted";

// Message role enum
export type MessageRole = "user" | "assistant" | "system";

/**
 * Thread model - represents a chat conversation thread
 */
export interface Thread {
  createdAt: string; // ISO timestamp
  id: string;
  projectId: string;
  status: ThreadStatus;
  title: string;
  updatedAt: string; // ISO timestamp
}

/**
 * Attachment model - represents a file attachment in a message
 */
export interface Attachment {
  fileName: string;
  filePath: string; // Local file system path
  id: string;
  mimeType: string;
  size: number; // Size in bytes
}

/**
 * Message metadata - optional data for tool calls, errors, etc.
 */
export interface MessageMetadata {
  error?: {
    message: string;
    code?: string;
  };
  tokens?: {
    input: number;
    output: number;
  };
  toolCalls?: Array<{
    id: string;
    name: string;
    arguments: unknown;
    result?: unknown;
  }>;
}

/**
 * Message model - represents an individual message in a thread
 */
export interface Message {
  attachments?: Attachment[];
  content: string; // Markdown content
  createdAt: string; // ISO timestamp
  id: string;
  metadata?: MessageMetadata;
  role: MessageRole;
  threadId: string;
}

/**
 * User model - represents a user in the system
 */
export interface User {
  email?: string;
  id: string;
  name: string;
}
