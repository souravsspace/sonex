/**
 * File search utility for mention autocomplete
 * Provides fuzzy file search with relevance scoring
 */

import type { MentionSuggestion } from "./composer-types";

// Mock file list - will be replaced with real Tauri filesystem calls in Task 04
const MOCK_FILES = [
  "src/main.tsx",
  "src/router.ts",
  "src/routes/__root.tsx",
  "src/routes/_chat.tsx",
  "src/routes/_chat.index.tsx",
  "src/routes/_chat.$threadId.tsx",
  "src/routes/_chat.settings.tsx",
  "src/components/icons.tsx",
  "src/components/plan-sidebar.tsx",
  "src/components/chat-markdown.tsx",
  "src/lib/models.ts",
  "src/lib/composer-types.ts",
  "src/lib/markdown-links.ts",
  "src/lib/utils.ts",
  "src/stores/composer-draft-store.ts",
  "package.json",
  "tsconfig.json",
  "tailwind.config.ts",
  "vite.config.ts",
];

const RECENT_FILES_KEY = "sonex-recent-files";
const MAX_RECENT_FILES = 10;

/**
 * Get recently accessed files from localStorage
 */
export function getRecentFiles(limit = 5): string[] {
  try {
    const stored = localStorage.getItem(RECENT_FILES_KEY);
    if (!stored) {
      return [];
    }

    const recent = JSON.parse(stored) as string[];
    return recent.slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * Add a file to the recent files list
 */
export function addRecentFile(filePath: string): void {
  try {
    const recent = getRecentFiles(MAX_RECENT_FILES);

    // Remove if already exists
    const filtered = recent.filter((path) => path !== filePath);

    // Add to front
    const updated = [filePath, ...filtered].slice(0, MAX_RECENT_FILES);

    localStorage.setItem(RECENT_FILES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to update recent files:", error);
  }
}

/**
 * Score a file path against a search query
 * Higher score = better match
 */
export function scoreFilePath(path: string, query: string): number {
  const lowerPath = path.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const fileName = path.split("/").pop() || "";
  const lowerFileName = fileName.toLowerCase();

  // Exact filename match (highest score)
  if (lowerFileName === lowerQuery) {
    return 100;
  }

  // Filename starts with query
  if (lowerFileName.startsWith(lowerQuery)) {
    return 80;
  }

  // Filename contains query
  if (lowerFileName.includes(lowerQuery)) {
    return 50;
  }

  // Full path contains query
  if (lowerPath.includes(lowerQuery)) {
    return 10;
  }

  return 0;
}

/**
 * Search for files matching a query
 */
export function searchFiles(query: string, limit = 10): MentionSuggestion[] {
  if (!query) {
    // No query - return recent files
    const recent = getRecentFiles(limit);
    return recent.map((path) => ({
      id: path,
      label: path,
      type: "file" as const,
      path,
    }));
  }

  // Score all files
  const scored = MOCK_FILES.map((path) => ({
    path,
    score: scoreFilePath(path, query),
  })).filter((item) => item.score > 0);

  // Sort by score (highest first)
  scored.sort((a, b) => b.score - a.score);

  // Take top results
  const topResults = scored.slice(0, limit);

  // Convert to MentionSuggestion format
  return topResults.map((item) => ({
    id: item.path,
    label: item.path,
    type: "file" as const,
    path: item.path,
  }));
}

/**
 * Get file extension from path
 */
export function getFileExtension(path: string): string {
  const parts = path.split(".");
  if (parts.length <= 1) {
    return "";
  }
  // biome-ignore lint/style/useAtIndex: fallback for older TS targets
  return parts[parts.length - 1] || "";
}
