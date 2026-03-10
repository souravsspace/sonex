/**
 * Chat Message Component
 * Displays individual messages with role-specific styling
 */

import { memo, useState } from "react";
import type { Message } from "@/lib/models";
import { cn } from "@/lib/utils";
import { ChatMarkdown } from "./chat-markdown";

interface ChatMessageProps {
  message: Message;
}

function ChatMessageComponent({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    }
    if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    }
    if (diffInSeconds < 86_400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    }
    return `${Math.floor(diffInSeconds / 86_400)} days ago`;
  };

  if (isSystem) {
    return (
      <article aria-label="System message" className="flex justify-center py-4">
        <div className="max-w-2xl text-center text-muted-foreground text-sm italic">
          {message.content}
        </div>
      </article>
    );
  }

  return (
    <div
      className={cn(
        "px-4 py-4",
        isUser ? "flex justify-end" : "flex justify-start"
      )}
    >
      <article
        aria-label={`${message.role} message`}
        className={cn(
          "group/message w-full max-w-4xl space-y-2",
          isUser && "flex flex-col items-end"
        )}
      >
        {/* Content */}
        <div className={cn("min-w-0 space-y-2", isUser && "max-w-2xl")}>
          {/* Message content */}
          <div
            className={cn(
              "chat-message-content prose-sm",
              isUser &&
                "rounded-lg border-border/30 bg-accent/20 px-4 py-3 backdrop-blur-md dark:border-border/20"
            )}
          >
            <ChatMarkdown content={message.content} />
          </div>

          {/* Metadata footer */}
          <div
            className={cn(
              "flex items-center gap-3 text-muted-foreground text-xs",
              isUser ? "justify-end" : "justify-start"
            )}
          >
            <time dateTime={message.createdAt}>
              {getRelativeTime(message.createdAt)}
            </time>

            {message.metadata?.error && (
              <span className="text-destructive">
                Error: {message.metadata.error.message}
              </span>
            )}

            {message.metadata?.tokens && (
              <span>
                {message.metadata.tokens.input + message.metadata.tokens.output}{" "}
                tokens
              </span>
            )}

            {/* Copy button - only for assistant messages */}
            {!isUser && (
              <button
                aria-label="copy message"
                className="opacity-0 transition-opacity hover:text-foreground group-hover/message:opacity-100"
                onClick={handleCopyMessage}
                type="button"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export const ChatMessage = memo(ChatMessageComponent);
