/**
 * Chat View Component
 * Main container that orchestrates messages and composer
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ComposerPromptEditor } from "@/components/composer/composer-prompt-editor";
import { messageApi } from "@/lib/native-api";
import { ChatMessageList } from "./chat-message-list";

interface ChatViewProps {
  threadId: string;
}

export function ChatView({ threadId }: ChatViewProps) {
  const queryClient = useQueryClient();

  // Fetch messages for this thread
  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: () => messageApi.list(threadId),
    enabled: !!threadId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (data: {
      content: string;
      mentions: Array<{ path: string }>;
      attachments: Array<{ filePath: string }>;
    }) =>
      messageApi.send({
        threadId,
        content: data.content,
        attachments: data.attachments.map((a) => ({
          id: crypto.randomUUID(),
          filePath: a.filePath,
          fileName: a.filePath.split("/").pop() || "unknown",
          mimeType: "application/octet-stream", // TODO: Detect proper MIME type
          size: 0, // TODO: Get actual file size
        })),
      }),
    onSuccess: () => {
      // Invalidate messages query to refetch
      queryClient.invalidateQueries({
        queryKey: ["messages", threadId],
      });
    },
  });

  const handleSubmit = (data: {
    content: string;
    mentions: Array<{ path: string }>;
    attachments: Array<{ filePath: string }>;
  }) => {
    sendMessageMutation.mutate(data);
  };

  const error = messagesError || sendMessageMutation.error;
  const errorMessage =
    error instanceof Error ? error.message : "An error occurred";
  const isSending = sendMessageMutation.isPending;

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Error Banner */}
      {error && (
        <div className="shrink-0 border-destructive/20 border-b bg-destructive/10 px-6 py-3">
          <div className="flex items-center justify-between text-destructive text-sm">
            <span>{errorMessage}</span>
            <button
              className="text-xs hover:underline"
              onClick={() => sendMessageMutation.reset()}
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
