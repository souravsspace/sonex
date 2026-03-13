/**
 * Composer Prompt Editor Component
 * Main text input for composing messages with mention support
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  detectMentionQuery,
  extractAllMentions,
  insertMention,
} from "@/lib/composer-editor-mentions";
import type { MentionSuggestion } from "@/lib/composer-types";
import { searchFiles } from "@/lib/file-search";
import { cn } from "@/lib/utils";
import { useComposerDraftStore } from "@/stores/composer-draft-store";
import { MentionAutocomplete } from "./mention-autocomplete";

interface ComposerPromptEditorProps {
  disabled?: boolean;
  onSubmit: (data: {
    content: string;
    mentions: Array<{ path: string }>;
    attachments: Array<{ filePath: string }>;
  }) => void;
  placeholder?: string;
  threadId: string | null;
}

export function ComposerPromptEditor({
  threadId,
  onSubmit,
  disabled = false,
  placeholder = "Ask a question or type @ to mention a file...",
}: ComposerPromptEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [suggestions, setSuggestions] = useState<MentionSuggestion[]>([]);
  const [autocompletePosition, setAutocompletePosition] = useState({
    x: 0,
    y: 0,
  });

  const { getDraft, setDraft, clearDraft } = useComposerDraftStore();

  // Load draft on mount
  useEffect(() => {
    const draftId = threadId || "__new__";
    const draft = getDraft(draftId);
    if (draft?.content) {
      setContent(draft.content);
    }
  }, [threadId, getDraft]);

  // Save draft with debounce
  useEffect(() => {
    if (!content) {
      return;
    }

    const draftId = threadId || "__new__";
    const timeoutId = setTimeout(() => {
      const mentions = extractAllMentions(content);
      setDraft(draftId, content, mentions, []);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [content, threadId, setDraft]);

  // Auto-resize textarea
  // biome-ignore lint/correctness/useExhaustiveDependencies: only need to resize on content change
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    const maxHeight = 15 * 24; // 15 rows * 24px per row
    const scrollHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${scrollHeight}px`;
  }, [content]);

  // Detect mention query when cursor moves or content changes
  useEffect(() => {
    const query = detectMentionQuery(content, cursorPosition);

    if (query) {
      setMentionQuery(query.query);
      setShowAutocomplete(true);

      // Get suggestions
      const results = searchFiles(query.query, 10);
      setSuggestions(results);

      // Calculate autocomplete position
      const textarea = textareaRef.current;
      if (textarea) {
        const rect = textarea.getBoundingClientRect();
        setAutocompletePosition({
          x: rect.left,
          y: rect.bottom + 8,
        });
      }
    } else {
      setShowAutocomplete(false);
      setMentionQuery("");
      setSuggestions([]);
    }
  }, [content, cursorPosition]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleCursorChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      setCursorPosition(textarea.selectionStart);
    }
  };

  const handleSelectMention = useCallback(
    (suggestion: MentionSuggestion) => {
      const query = detectMentionQuery(content, cursorPosition);
      if (!query) {
        return;
      }

      const result = insertMention(
        content,
        suggestion.path,
        query.startIndex,
        query.endIndex
      );

      setContent(result.text);
      setShowAutocomplete(false);

      // Set cursor position after mention
      setTimeout(() => {
        textareaRef.current?.focus();
        textareaRef.current?.setSelectionRange(
          result.cursorPosition,
          result.cursorPosition
        );
      }, 0);
    },
    [content, cursorPosition]
  );

  const handleCancelAutocomplete = useCallback(() => {
    setShowAutocomplete(false);
  }, []);

  const handleSubmit = () => {
    if (!content.trim() || disabled) {
      return;
    }

    const mentions = extractAllMentions(content);
    onSubmit({
      content,
      mentions: mentions.map((m) => ({ path: m.path })),
      attachments: [],
    });

    // Clear content and draft
    setContent("");
    const draftId = threadId || "__new__";
    clearDraft(draftId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl + Enter to submit
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
      return;
    }

    // Shift + Enter to insert newline (default behavior)
    if (e.shiftKey && e.key === "Enter") {
      return;
    }

    // Escape to cancel autocomplete or blur
    if (e.key === "Escape") {
      if (showAutocomplete) {
        e.preventDefault();
        handleCancelAutocomplete();
      } else {
        textareaRef.current?.blur();
      }
      return;
    }

    // Tab to accept first autocomplete suggestion
    if (e.key === "Tab" && showAutocomplete && suggestions.length > 0) {
      e.preventDefault();
      handleSelectMention(suggestions[0]);
      return;
    }
  };

  const characterCount = content.length;
  const showCharCount = characterCount > 1000;
  const isOverLimit = characterCount > 10_000;

  return (
    <div className="relative">
      <Textarea
        aria-label="Message composer"
        className={cn(
          "min-h-[72px] resize-none border-border/40 bg-muted/40 backdrop-blur-xl focus-visible:border-border/40 focus-visible:ring-0 dark:border-border/30 dark:bg-muted/20",
          isOverLimit && "border-destructive focus-visible:border-destructive"
        )}
        disabled={disabled}
        onChange={handleContentChange}
        onClick={handleCursorChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleCursorChange}
        placeholder={placeholder}
        ref={textareaRef}
        value={content}
      />

      {showCharCount && (
        <div
          className={cn(
            "absolute right-2 bottom-2 text-xs",
            isOverLimit ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {characterCount.toLocaleString()} chars
          {isOverLimit && " (over limit)"}
        </div>
      )}

      {showAutocomplete && (
        <MentionAutocomplete
          onCancel={handleCancelAutocomplete}
          onSelect={handleSelectMention}
          position={autocompletePosition}
          query={mentionQuery}
          suggestions={suggestions}
        />
      )}
    </div>
  );
}
