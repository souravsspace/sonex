/**
 * Types specific to the composer/editor functionality
 */

import type { Attachment } from "./models";

/**
 * File mention type - represents a file mentioned with @
 */
export interface Mention {
  endIndex: number;
  id: string;
  path: string; // Full file path like "src/App.tsx"
  startIndex: number;
}

/**
 * ComposerDraft - the in-progress message state
 */
export interface ComposerDraft {
  attachments: Attachment[];
  content: string; // Current editor text
  lastSaved: string; // ISO timestamp
  mentions: Mention[];
  threadId: string | null; // null for new thread
}

/**
 * Mention suggestion types
 */
export type MentionSuggestionType = "file" | "symbol" | "folder";

/**
 * MentionSuggestion - for autocomplete dropdown
 */
export interface MentionSuggestion {
  id: string;
  label: string; // Display name like "src/App.tsx"
  path: string; // Full file path
  type: MentionSuggestionType;
}

/**
 * EditorSelection - cursor/selection state
 */
export interface EditorSelection {
  direction: "forward" | "backward" | "none";
  end: number; // Character offset
  start: number; // Character offset
}

/**
 * MentionQuery - detected mention being typed
 */
export interface MentionQuery {
  endIndex: number;
  query: string; // The text after @
  startIndex: number;
  trigger: string; // '@'
}

/**
 * File link match - detected file link in markdown
 */
export interface FileLinkMatch {
  endIndex: number;
  path: string; // File path
  startIndex: number;
  text: string; // Link text
}
