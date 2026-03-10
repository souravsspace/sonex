/**
 * Composer editor mention parsing utilities
 * Handles @ mention detection and manipulation
 */

import type { Mention, MentionQuery } from "./composer-types";

/**
 * Detect if user is typing a mention at current cursor position
 * Returns null if no active mention detected
 */
export function detectMentionQuery(
  text: string,
  cursorPosition: number
): MentionQuery | null {
  // Scan backwards from cursor to find @ character
  let startIndex = -1;

  for (let i = cursorPosition - 1; i >= 0; i--) {
    const char = text[i];

    // Found @ - this is a potential mention
    if (char === "@") {
      startIndex = i;
      break;
    }

    // Hit whitespace or newline - not a valid mention
    if (char === " " || char === "\n" || char === "\t") {
      return null;
    }

    // Don't look too far back (max 100 chars)
    if (cursorPosition - i > 100) {
      return null;
    }
  }

  // No @ found
  if (startIndex === -1) {
    return null;
  }

  // Extract query text between @ and cursor
  const query = text.slice(startIndex + 1, cursorPosition);

  return {
    trigger: "@",
    query,
    startIndex,
    endIndex: cursorPosition,
  };
}

/**
 * Insert a mention into text, replacing the query
 */
export function insertMention(
  text: string,
  mentionPath: string,
  startIndex: number,
  endIndex: number
): { text: string; cursorPosition: number } {
  // Insert mention with @ prefix
  const mention = `@${mentionPath}`;
  const before = text.slice(0, startIndex);
  const after = text.slice(endIndex);

  const newText = `${before}${mention} ${after}`;
  const newCursorPosition = startIndex + mention.length + 1; // +1 for the space

  return {
    text: newText,
    cursorPosition: newCursorPosition,
  };
}

/**
 * Extract all mentions from text
 * Returns array of mentions with their positions
 */
export function extractAllMentions(text: string): Mention[] {
  const mentions: Mention[] = [];
  const mentionRegex = /@([\w\-./]+\.\w+)/g;

  let match = mentionRegex.exec(text);

  while (match !== null) {
    mentions.push({
      id: match[1],
      path: match[1],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    });
    match = mentionRegex.exec(text);
  }

  return mentions;
}

/**
 * Remove a mention from text
 */
export function removeMention(
  text: string,
  startIndex: number,
  endIndex: number
): string {
  const before = text.slice(0, startIndex);
  const after = text.slice(endIndex);
  return before + after;
}
