/**
 * ChatMarkdown component
 * Renders markdown content with code highlighting and file link support
 */

import hljs from "highlight.js";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isFileLink, normalizeFilePath } from "@/lib/markdown-links";
import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark.css";

interface ChatMarkdownProps {
  className?: string;
  content: string;
}

/**
 * CodeBlock component with independent copy state and syntax highlighting
 */
function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  // Extract code content and language
  const codeChild = children as React.ReactElement<{
    className?: string;
    children: string;
  }>;
  const codeContent = codeChild.props?.children || "";
  const language = codeChild.props?.className?.replace("language-", "") || "";

  // Apply syntax highlighting after render
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  });

  const handleCopy = () => {
    if (typeof codeContent === "string") {
      navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group/code relative my-4">
      <button
        aria-label="copy code"
        className="absolute top-2 right-2 z-10 cursor-pointer rounded border bg-background/80 px-2 py-1 text-xs opacity-0 transition-opacity hover:bg-background group-hover/code:opacity-100"
        onClick={handleCopy}
        type="button"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre {...props} className="overflow-x-auto rounded-xl">
        <code className={language ? `language-${language}` : ""} ref={codeRef}>
          {codeContent}
        </code>
      </pre>
    </div>
  );
}

/**
 * Main ChatMarkdown component
 */
export function ChatMarkdown({ content, className }: ChatMarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        "prose-pre:my-4 prose-p:leading-7",
        "prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm",
        "prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:bg-muted prose-pre:p-4",
        "prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-border",
        "prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2",
        "prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2",
        className
      )}
    >
      <ReactMarkdown
        components={{
          // Custom link component for file links
          a: ({ href, children, ...props }) => {
            const handleFileLink = (e: React.MouseEvent) => {
              if (!href) {
                return;
              }

              if (isFileLink(href)) {
                e.preventDefault();
                const normalizedPath = normalizeFilePath(href);
                // TODO: Will be implemented in Task 04 (IPC bridge)
                console.log("Open file:", normalizedPath);
              }
            };

            const isFile = href ? isFileLink(href) : false;

            return (
              <a
                aria-label={isFile ? `open file ${href}` : undefined}
                className={cn(
                  "underline transition-colors hover:text-primary",
                  isFile && "font-mono text-blue-500 text-sm"
                )}
                href={href}
                onClick={handleFileLink}
                {...props}
              >
                {children}
              </a>
            );
          },
          // Pre block with copy button - each instance has independent state
          pre: CodeBlock,
          // Table wrapper for horizontal scrolling
          table: ({ children, ...props }) => {
            return (
              <div className="my-4 overflow-x-auto">
                <table {...props}>{children}</table>
              </div>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
