# Sonex Development Guide

This guide is for AI coding agents working on the Sonex project - a Tauri-based desktop application with React, TanStack Router, and iOS 26-inspired glassmorphism UI.

<strong>
Be sure to commit every change you make. After **every modification** — whether it's editing a file, creating a new one, or deleting one — you must immediately run:

```
git add <the file(s) you changed>
git commit -m "descriptive message of what you changed"
```

Do **not** batch changes together and commit at the end. Each individual change gets its own `git add` + `git commit`, right after you make it.
</strong>

<strong>
All file names should be in snake-case and use mcp as you needed.

As you work, keep the file and folder structure clean and organized at all times. This means:

- **Place every file in the right folder** — don't dump files in the root or wrong directory. Group related files logically (e.g. components/, utils/, assets/, etc.)
- **Rename files clearly** — file names should describe what they do. No `file1.js`, `test2.py`, `newfile.txt`.
- **Create folders as needed** — if a new category of files emerges, make a folder for it on the spot, don't wait.
- **Move misplaced files immediately** — if you notice a file is in the wrong place while working, move it right then and commit it.
- **After every move, rename, or restructure**, run:

```
git add -A
git commit -m "organize: descriptive message of what you moved/renamed/restructured"
```

Do **not** leave organizing for the end. Every structural change gets its own commit, immediately after you make it.
</strong>

## Quick Commands

### Development & Build

- **Start dev server**: `bun dev` (Vite React dev server)
- **Build for production**: `bun run build` (TypeScript check + Vite build)
- **Preview production build**: `bun preview`
- **Start Tauri dev**: `bun tauri:dev` (Desktop app with hot reload)
- **Build Tauri app**: `bun tauri:build` (Create distributable)

### Code Quality

- **Format & fix issues**: `bun x ultracite fix` (auto-fix formatting + linting)
- **Check for issues**: `bun x ultracite check` (reports without fixing)
- **Diagnose setup**: `bun x ultracite doctor`

### Testing

⚠️ **No testing infrastructure currently set up**. When adding tests:

- Use Vitest for unit/integration tests
- Run single test file: `vitest path/to/test-file.test.ts`
- Place tests adjacent to source files or in `__tests__` directories

---

## Project Structure

```
sonex/
├── src/
│   ├── components/         # Feature components (kebab-case)
│   │   ├── ui/             # Reusable UI primitives (Base UI + CVA)
│   │   ├── chat-view.tsx
│   │   └── composer-prompt-editor.tsx
│   ├── routes/             # TanStack Router pages
│   │   ├── __root.tsx
│   │   ├── _chat.tsx       # Layout route
│   │   └── _chat.$threadId.tsx  # Dynamic route
│   ├── hooks/              # Custom React hooks
│   │   └── use-theme.ts
│   ├── lib/                # Utilities, types, helpers
│   │   ├── utils.ts        # cn() helper
│   │   └── models.ts       # Shared types
│   ├── stores/             # Zustand state management
│   │   └── composer-draft-store.ts
│   └── main.tsx
├── src-tauri/              # Rust backend (Tauri)
└── public/                 # Static assets
```

**Import alias**: Use `@/` for absolute imports from `src/`

```typescript
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/models";
```

---

## File Naming Conventions

**ALL FILES MUST USE KEBAB-CASE** (mandatory):

- ✅ `chat-view.tsx`, `use-theme.ts`, `composer-draft-store.ts`
- ✅ `alert-dialog.tsx`, `input-group.tsx`, `aurora-palettes.ts`
- ❌ `ChatView.tsx`, `useTheme.ts`, `ComposerDraftStore.ts` (PascalCase - WRONG)
- ❌ `chatView.tsx`, `alertDialog.tsx` (camelCase - WRONG)

**Exception**: `__root.tsx` (TanStack Router convention)

---

## Code Style Guidelines

### Type Safety

- Use **explicit types** for function parameters and return values
- Prefer `unknown` over `any` for truly unknown types
- Use `type` keyword for type-only imports: `import type { Message } from "@/lib/models"`
- Use const assertions for immutable values: `const ROLES = ["user", "assistant"] as const`
- Extract magic numbers into named constants

### Imports Organization

```typescript
// 1. External packages (grouped)
import { useEffect, useState } from "react";
import { create } from "zustand";
import { cva, type VariantProps } from "class-variance-authority";

// 2. Internal imports with @/ alias
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/models";
import { ChatMessageList } from "@/components/chat-message-list";
import { useComposerDraftStore } from "@/stores/composer-draft-store";
```

### React Patterns

- Use **function components** exclusively (React 19+)
- Call hooks at the top level only (never conditionally)
- Use `ref` as a prop (React 19 - no `forwardRef` needed)
- Specify all dependencies in hook dependency arrays
- Use unique IDs for `key` prop (avoid array indices)
- Don't define components inside other components

### State Management with Zustand

```typescript
// stores/example-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExampleState {
  value: string;
  setValue: (val: string) => void;
}

export const useExampleStore = create<ExampleState>()(
  persist(
    (set, get) => ({
      value: "",
      setValue: (val) => set({ value: val }),
    }),
    { name: "sonex-example" },
  ),
);
```

### Component Structure

```typescript
/**
 * Component description
 * Additional details if needed
 */

interface ComponentProps {
  threadId: string;
  onSubmit?: (text: string) => void;
}

export function ComponentName({ threadId, onSubmit }: ComponentProps) {
  // 1. Zustand stores
  const { getDraft } = useComposerDraftStore();

  // 2. React hooks
  const [isOpen, setIsOpen] = useState(false);

  // 3. Early returns for conditional rendering
  if (!threadId) return null;

  // 4. JSX
  return <div className="...">...</div>;
}
```

---

## UI & Styling - iOS 26 Glassmorphism

### Design System

- **Tailwind CSS v4** with custom design tokens
- **OKLCH color space** for better perceptual uniformity
- **Glassmorphism effects** inspired by iOS 26
- **Theme support**: light, dark, system (via `use-theme` hook)

### Glassmorphism Pattern

Use backdrop blur with semi-transparent backgrounds:

```tsx
<div className="backdrop-blur-xl bg-muted/40 border border-border/50 rounded-lg">
  {/* Content */}
</div>
```

**Key utilities**:

- `backdrop-blur-sm` to `backdrop-blur-3xl` - glass effect strength
- `bg-*/40`, `bg-*/60` - semi-transparent backgrounds (40% = 0.4 opacity)
- `border-*/50` - subtle borders
- Combine with `shadow-sm` or `shadow-md` for depth

### UI Components (Base UI + CVA)

Built on `@base-ui/react` with class-variance-authority for variants:

```tsx
import { Button } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const variants = cva("base-classes", {
  variants: {
    variant: { default: "...", ghost: "..." },
    size: { sm: "h-7", default: "h-8", lg: "h-9" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export function CustomButton({ variant, size, className, ...props }) {
  return (
    <Button className={cn(variants({ variant, size }), className)} {...props} />
  );
}
```

### Theme Colors

Access via CSS custom properties:

- `bg-background` / `text-foreground` - base colors
- `bg-muted` / `text-muted-foreground` - secondary
- `bg-primary` / `text-primary-foreground` - accent
- `bg-card` / `border-border` - surfaces
- All colors adapt to light/dark theme automatically

---

## Ultracite Code Standards

This project uses **Ultracite** - a zero-config preset enforcing strict code quality through Biome.

### Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity over brevity.

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer access
- Prefer template literals over string concatenation
- Use destructuring for object/array assignments
- Use `const` by default, `let` only when reassignment needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget the return value
- Use `async/await` over promise chains for readability
- Handle errors with try-catch blocks
- Don't use async functions as Promise executors

### Error Handling

- Remove `console.log`, `debugger`, `alert` from production code
- Throw `Error` objects with descriptive messages (not strings)
- Use try-catch meaningfully (don't catch just to rethrow)
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused (reasonable cognitive complexity)
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternaries
- Group related code, separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals (not in loops)
- Prefer specific imports over namespace imports
- Avoid barrel files (index files re-exporting everything)

### Accessibility

- Provide meaningful `alt` text for images
- Use proper heading hierarchy (`h1` → `h2` → `h3`)
- Add labels for form inputs
- Include keyboard event handlers alongside mouse events
- Use semantic elements (`<button>`, `<nav>`) over divs with roles

---

## Before Committing

1. Run `bun x ultracite fix` to auto-format and fix linting issues
2. Verify all new files use **kebab-case** naming
3. Check glassmorphism effects are applied to new UI components
4. Ensure TypeScript compiles: `bun run build`
5. Test in both light and dark themes

Most formatting and common issues are automatically fixed by Ultracite/Biome. Focus on business logic correctness, meaningful naming, and user experience.


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.
