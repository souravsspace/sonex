/**
 * Mention autocomplete dropdown component
 * Shows file suggestions when user types @
 */

import { useEffect, useRef, useState } from "react";
import type { MentionSuggestion } from "@/lib/composer-types";
import { cn } from "@/lib/utils";

interface MentionAutocompleteProps {
  isLoading?: boolean;
  onCancel: () => void;
  onSelect: (suggestion: MentionSuggestion) => void;
  position?: { x: number; y: number };
  query: string;
  suggestions: MentionSuggestion[];
}

export function MentionAutocomplete({
  query,
  suggestions,
  onSelect,
  onCancel,
  position,
  isLoading = false,
}: MentionAutocompleteProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Reset selection when suggestions change
  // biome-ignore lint/correctness/useExhaustiveDependencies: only want to reset on length change
  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions.length]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
        case "Tab":
          e.preventDefault();
          if (suggestions[selectedIndex]) {
            onSelect(suggestions[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onCancel();
          break;
        default:
          // No action for other keys
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [suggestions, selectedIndex, onSelect, onCancel]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = listRef.current?.children[
      selectedIndex
    ] as HTMLElement;
    selectedElement?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (suggestions.length === 0 && !isLoading) {
    return (
      <div
        className="absolute z-50 w-80 rounded-lg border-border/30 bg-popover/80 p-3 text-muted-foreground text-sm shadow-lg backdrop-blur-xl dark:border-border/20 dark:bg-popover/60"
        style={position ? { left: position.x, top: position.y } : undefined}
      >
        No files found matching "{query}"
      </div>
    );
  }

  return (
    <div
      aria-label={`${suggestions.length} file suggestions`}
      className="absolute z-50 max-h-[300px] w-80 overflow-hidden rounded-lg border-border/30 bg-popover/80 shadow-lg backdrop-blur-xl dark:border-border/20 dark:bg-popover/60"
      role="listbox"
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      {isLoading ? (
        <div className="p-4 text-center text-muted-foreground text-sm">
          Searching...
        </div>
      ) : (
        <div className="max-h-[300px] overflow-y-auto" ref={listRef}>
          {suggestions.map((suggestion, index) => (
            <button
              aria-selected={index === selectedIndex}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-accent",
                index === selectedIndex && "bg-accent"
              )}
              key={suggestion.id}
              onClick={() => onSelect(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
              type="button"
            >
              <FileIcon fileName={suggestion.label} />
              <span className="flex-1 truncate font-mono text-xs">
                {highlightMatch(suggestion.label, query)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Simple file icon based on extension
 */
function FileIcon({ fileName }: { fileName: string }) {
  const ext = fileName.split(".").pop()?.toLowerCase();

  // Map common extensions to colors
  const colorMap: Record<string, string> = {
    ts: "text-blue-500",
    tsx: "text-blue-400",
    js: "text-yellow-500",
    jsx: "text-yellow-400",
    json: "text-green-500",
    css: "text-purple-500",
    html: "text-orange-500",
    md: "text-gray-500",
  };

  const color = ext
    ? colorMap[ext] || "text-muted-foreground"
    : "text-muted-foreground";

  return (
    <svg
      aria-hidden="true"
      className={cn("h-4 w-4 flex-shrink-0", color)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <title>File icon</title>
      <path
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

/**
 * Highlight matching text in the suggestion
 */
function highlightMatch(text: string, query: string) {
  if (!query) {
    return text;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return text;
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="bg-yellow-200 dark:bg-yellow-900/50">{match}</span>
      {after}
    </>
  );
}
