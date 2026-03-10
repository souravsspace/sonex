/**
 * Chat Message List Component
 * Displays a scrollable list of messages with virtualization
 */

import { motion } from "motion/react";
import { useRef } from "react";
import { useAutoScroll } from "@/lib/chat-scroll";
import type { Message } from "@/lib/models";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-message";

interface ChatMessageListProps {
  className?: string;
  isLoading?: boolean;
  messages: Message[];
}

export function ChatMessageList({
  messages,
  isLoading = false,
  className,
}: ChatMessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAtBottom, scrollToBottom } = useAutoScroll(containerRef, messages);

  // Empty state
  if (messages.length === 0 && !isLoading) {
    return (
      <div
        className={cn(
          "flex flex-1 items-center justify-center overflow-y-auto p-8",
          className
        )}
        ref={containerRef}
      >
        <div className="max-w-md space-y-4 text-center">
          <div className="font-medium text-lg text-muted-foreground">
            Start a conversation
          </div>
          <div className="text-muted-foreground text-sm">
            Ask a question, request code changes, or mention files with @
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="font-medium text-muted-foreground text-xs">
              Try asking:
            </div>
            <div className="flex flex-col gap-1">
              {[
                "How do I add authentication?",
                "Explain the routing setup",
                "Help me debug this component",
              ].map((prompt) => (
                <button
                  className="rounded-md bg-muted px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
                  key={prompt}
                  type="button"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading && messages.length === 0) {
    return (
      <div
        className={cn("flex-1 overflow-y-auto p-4", className)}
        ref={containerRef}
      >
        {[1, 2, 3].map((i) => (
          <div className="flex animate-pulse gap-3 px-4 py-4" key={i}>
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <motion.div
        className={cn("h-full overflow-y-auto scroll-smooth", className)}
        layoutScroll
        ref={containerRef}
      >
        {messages.map((message) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, y: 20 }}
            key={message.id}
            layout
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ChatMessage message={message} />
          </motion.div>
        ))}

        {/* Loading indicator for new messages */}
        {isLoading && (
          <div className="flex animate-pulse gap-3 px-4 py-4">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-16 animate-pulse rounded bg-muted">...</div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Scroll to bottom button */}
      {!isAtBottom && (
        <button
          aria-label="Scroll to bottom"
          className="absolute right-4 bottom-4 rounded-full border-border/30 bg-primary/90 px-4 py-2 font-medium text-primary-foreground text-sm shadow-lg backdrop-blur-xl transition-colors hover:bg-primary dark:border-border/20 dark:bg-primary/80"
          onClick={scrollToBottom}
          type="button"
        >
          ↓ New messages
        </button>
      )}
    </div>
  );
}
