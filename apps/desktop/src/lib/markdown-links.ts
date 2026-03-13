/**
 * Markdown link processing utilities
 * Handles file link detection, normalization, and transformation
 */

import type { FileLinkMatch } from "./composer-types";

// Regex patterns at top level for performance
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(file:\/\/([^)]+)\)/g;
const MENTION_REGEX = /@([\w\-./]+\.\w+)/g;
const FILE_LINK_REGEX = /^[\w\-./]+\.\w+$/;
const LINE_NUMBER_REGEX = /^(.+):(\d+)$/;

/**
 * Extract file links from markdown content
 * Matches patterns like [text](file://path) and @filepath
 */
export function extractFileLinks(markdown: string): FileLinkMatch[] {
  const matches: FileLinkMatch[] = [];

  // Reset regex lastIndex before use
  MARKDOWN_LINK_REGEX.lastIndex = 0;
  MENTION_REGEX.lastIndex = 0;

  // Match markdown links with file:// protocol
  let match = MARKDOWN_LINK_REGEX.exec(markdown);

  while (match !== null) {
    matches.push({
      text: match[1],
      path: match[2],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    });
    match = MARKDOWN_LINK_REGEX.exec(markdown);
  }

  // Match bare @filepath mentions
  match = MENTION_REGEX.exec(markdown);

  while (match !== null) {
    matches.push({
      text: match[0],
      path: match[1],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    });
    match = MENTION_REGEX.exec(markdown);
  }

  return matches;
}

/**
 * Normalize a file path by removing protocols and handling relative paths
 */
export function normalizeFilePath(rawPath: string): string {
  let path = rawPath;

  // Remove file:// protocol if present
  if (path.startsWith("file://")) {
    path = path.slice(7);
  }

  // Handle home directory ~ expansion
  if (path.startsWith("~")) {
    // In browser context, we can't expand ~, so just remove it
    path = path.slice(1);
  }

  // Normalize path separators (convert \ to /)
  path = path.replace(/\\/g, "/");

  // Remove leading slash if present (for relative paths)
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  return path;
}

/**
 * Check if a URL is a file link
 */
export function isFileLink(url: string): boolean {
  return url.startsWith("file://") || FILE_LINK_REGEX.test(url);
}

/**
 * Convert a file path to a file:// URL
 */
export function toFileUrl(path: string): string {
  const normalized = normalizeFilePath(path);
  return `file://${normalized}`;
}

/**
 * Extract line number from file path (e.g., "file.ts:42" -> { path: "file.ts", line: 42 })
 */
export function extractLineNumber(path: string): {
  path: string;
  line?: number;
} {
  const match = LINE_NUMBER_REGEX.exec(path);
  if (match) {
    return {
      path: match[1],
      line: Number.parseInt(match[2], 10),
    };
  }
  return { path };
}
