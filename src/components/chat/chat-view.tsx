/**
 * Chat View Component
 * Main container that orchestrates messages and composer
 */

import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "@/lib/mock-api";
import type { Message } from "@/lib/models";
import { ChatMessageList } from "./chat-message-list";
import { ComposerPromptEditor } from "./composer-prompt-editor";

interface ChatViewProps {
  threadId: string;
}

export function ChatView({ threadId }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load messages when thread changes
  useEffect(() => {
    async function loadMessages() {
      setIsLoadingMessages(true);
      setError(null);
      try {
        const data = await fetchMessages(threadId);
        setMessages(data);
      } catch (err) {
        setError("Failed to load messages");
        console.error("Error loading messages:", err);
      } finally {
        setIsLoadingMessages(false);
      }
    }

    loadMessages();
  }, [threadId]);

  const handleSubmit = async (data: {
    content: string;
    mentions: Array<{ path: string }>;
    attachments: Array<{ filePath: string }>;
  }) => {
    setIsSending(true);
    setError(null);

    try {
      const { userMessage, assistantMessage } = await sendMessage(
        threadId,
        data.content,
        data.mentions,
        data.attachments
      );

      // Add messages to list
      setMessages((prev) => [...prev, userMessage, assistantMessage]);
    } catch (err) {
      setError("Failed to send message");
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Error Banner */}
      {error && (
        <div className="shrink-0 border-destructive/20 border-b bg-destructive/10 px-6 py-3">
          <div className="flex items-center justify-between text-destructive text-sm">
            <span>{error}</span>
            <button
              className="text-xs hover:underline"
              onClick={() => setError(null)}
              type="button"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Message List */}
      <ChatMessageList
        className="min-h-0 flex-1 overflow-y-auto pt-20 pb-32"
        isLoading={isLoadingMessages || isSending}
        messages={messages}
      />

      {/* Blur gradient overlay for bottom - ends right before Composer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-32 backdrop-blur-xl"
        style={{
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 5%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.05) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 5%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.05) 95%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Composer - Absolutely positioned with margin for glass effect */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="pointer-events-auto m-4">
          <ComposerPromptEditor
            disabled={isSending}
            onSubmit={handleSubmit}
            threadId={threadId}
          />
        </div>
      </div>
    </div>
  );
}
