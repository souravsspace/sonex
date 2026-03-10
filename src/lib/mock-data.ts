/**
 * Mock data for testing chat UI
 * Will be replaced with real API calls in Task 06
 */

import type { Message, Thread } from "./models";

// Sample threads
export const mockThreads: Thread[] = [
  {
    id: "thread-1",
    projectId: "project-1",
    title: "Setting up authentication",
    createdAt: new Date(Date.now() - 86_400_000 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 3_600_000).toISOString(), // 1 hour ago
    status: "active",
  },
  {
    id: "thread-2",
    projectId: "project-1",
    title: "Fixing TypeScript errors",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 7_200_000).toISOString(), // 2 hours ago
    status: "active",
  },
  {
    id: "thread-3",
    projectId: "project-1",
    title: "Adding dark mode",
    createdAt: new Date(Date.now() - 86_400_000 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 86_400_000 * 3).toISOString(), // 3 days ago
    status: "active",
  },
];

// Sample messages for thread-1
export const mockMessagesThread1: Message[] = [
  {
    id: "msg-1",
    threadId: "thread-1",
    role: "user",
    content: `How do I add authentication to this app? I want to use JWT tokens.

I'm building a full-stack application and need to implement user authentication. Here are my requirements:

1. User registration with email and password
2. Login functionality that returns a JWT token
3. Protected routes that require authentication
4. Token refresh mechanism
5. Secure password storage with hashing

I've heard JWT is a good choice for stateless authentication, but I'm not sure about the best practices for implementation. Should I store the token in localStorage or use httpOnly cookies? What about token expiration and refresh tokens?

Also, I want to make sure I'm following security best practices. Any recommendations for password hashing libraries and JWT secret management?`,
    createdAt: new Date(Date.now() - 86_400_000 * 2).toISOString(),
  },
  {
    id: "msg-2",
    threadId: "thread-1",
    role: "assistant",
    content: `To add JWT authentication to your app, you'll need to:

1. Install the required package:
\`\`\`bash
bun add jsonwebtoken
\`\`\`

2. Create an authentication middleware in [src/middleware/auth.ts](file://src/middleware/auth.ts)

3. Add login/logout routes

Here's a basic example of the auth middleware:

\`\`\`typescript
import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
\`\`\`

## Security Best Practices

For **token storage**, I recommend using **httpOnly cookies** instead of localStorage. This prevents XSS attacks from accessing the token:

\`\`\`typescript
// Set httpOnly cookie
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
\`\`\`

For **password hashing**, use bcrypt:

\`\`\`bash
bun add bcrypt
\`\`\`

\`\`\`typescript
import bcrypt from 'bcrypt';

// Hash password before saving
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password on login
const isValid = await bcrypt.compare(password, hashedPassword);
\`\`\`

## Token Management

- **Access tokens**: Short-lived (15 minutes)
- **Refresh tokens**: Long-lived (7 days), stored in httpOnly cookie
- Store refresh tokens in database for revocation capability

Would you like me to help implement the full authentication flow?`,
    createdAt: new Date(Date.now() - 86_400_000 * 2 + 60_000).toISOString(),
    metadata: {
      tokens: { input: 45, output: 120 },
    },
  },
  {
    id: "msg-3",
    threadId: "thread-1",
    role: "user",
    content:
      "Yes, please show me the full implementation with login and signup.",
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
  },
];

// Sample messages for thread-2
export const mockMessagesThread2: Message[] = [
  {
    id: "msg-4",
    threadId: "thread-2",
    role: "user",
    content: "I'm getting TypeScript errors in @src/components/Button.tsx",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
  },
  {
    id: "msg-5",
    threadId: "thread-2",
    role: "assistant",
    content: `Let me check the [Button component](file://src/components/Button.tsx).

I see the issue. The component is missing proper type definitions for the props. Here's the fix:

\`\`\`typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  // component implementation
}
\`\`\`

This should resolve the type errors.`,
    createdAt: new Date(Date.now() - 86_400_000 + 120_000).toISOString(),
  },
];

// Empty messages for new thread
export const mockMessagesEmpty: Message[] = [];

// Mock message database
export const mockMessagesDb: Record<string, Message[]> = {
  "thread-1": mockMessagesThread1,
  "thread-2": mockMessagesThread2,
  "thread-3": mockMessagesEmpty,
};
