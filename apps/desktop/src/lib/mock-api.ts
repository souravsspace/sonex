/**
 * Mock API for testing chat functionality
 * Simulates backend API calls with delays
 */

import { mockMessagesDb, mockThreads } from "./mock-data";
import type { Message, Thread } from "./models";

/**
 * Simulate network delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Get all threads for a project
 */
export async function fetchThreads(projectId: string): Promise<Thread[]> {
  await delay(300);
  return mockThreads.filter((thread) => thread.projectId === projectId);
}

/**
 * Get a single thread by ID
 */
export async function fetchThread(threadId: string): Promise<Thread | null> {
  await delay(200);
  return mockThreads.find((thread) => thread.id === threadId) || null;
}

/**
 * Get messages for a thread
 */
export async function fetchMessages(threadId: string): Promise<Message[]> {
  await delay(400);
  return mockMessagesDb[threadId] || [];
}

/**
 * Send a message and get AI response
 */
export async function sendMessage(
  threadId: string,
  content: string,
  mentions: Array<{ path: string }>,
  attachments: Array<{ filePath: string }>
): Promise<{ userMessage: Message; assistantMessage: Message }> {
  // Simulate delay
  await delay(800 + Math.random() * 700);

  // Create user message
  const userMessage: Message = {
    id: generateId(),
    threadId,
    role: "user",
    content,
    createdAt: new Date().toISOString(),
    attachments: attachments.map((a) => ({
      id: generateId(),
      fileName: a.filePath.split("/").pop() || a.filePath,
      filePath: a.filePath,
      mimeType: "text/plain",
      size: 0,
    })),
  };

  // Generate mock AI response
  const assistantMessage: Message = {
    id: generateId(),
    threadId,
    role: "assistant",
    content: generateMockResponse(content, mentions),
    createdAt: new Date(Date.now() + 100).toISOString(),
    metadata: {
      tokens: {
        input: content.length,
        output: 200,
      },
    },
  };

  // Add to mock database
  if (!mockMessagesDb[threadId]) {
    mockMessagesDb[threadId] = [];
  }
  mockMessagesDb[threadId].push(userMessage, assistantMessage);

  return { userMessage, assistantMessage };
}

/**
 * Create a new thread
 */
export async function createThread(
  projectId: string,
  initialMessage: string
): Promise<Thread> {
  await delay(300);

  const thread: Thread = {
    id: generateId(),
    projectId,
    title:
      initialMessage.slice(0, 50) + (initialMessage.length > 50 ? "..." : ""),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active",
  };

  mockThreads.unshift(thread);
  mockMessagesDb[thread.id] = [];

  return thread;
}

/**
 * Generate a mock AI response based on user input
 */
function generateMockResponse(
  userContent: string,
  mentions: Array<{ path: string }>
): string {
  const responses = [
    `I understand you're asking about: "${userContent.slice(0, 50)}..."

Here's what I can help with:

1. First, let me analyze the relevant files${mentions.length > 0 ? `: ${mentions.map((m) => `\`${m.path}\``).join(", ")}` : ""}

2. Then I'll provide a solution

\`\`\`typescript
// Example code
function solution() {
  return "This is a mock response";
}
\`\`\`

Would you like me to implement this?`,

    `Great question! ${mentions.length > 0 ? `Looking at ${mentions[0].path}, ` : ""}Here's my suggestion:

- First approach: Use a simple pattern
- Second approach: Consider edge cases
- Third approach: Optimize for performance

Let me know which direction you prefer!`,

    `Based on your request, here's what I recommend:

\`\`\`bash
# Run this command
npm install example-package
\`\`\`

Then update your configuration${mentions.length > 0 ? ` in [${mentions[0].path}](file://${mentions[0].path})` : ""}.

This should resolve the issue. Let me know if you need more details!`,
  ];

  // Pick a random response
  return responses[Math.floor(Math.random() * responses.length)];
}
