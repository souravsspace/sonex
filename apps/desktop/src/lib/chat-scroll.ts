/**
 * Chat scroll management utilities
 * Handles auto-scroll behavior and scroll state tracking
 */

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Check if container is scrolled to bottom (within threshold)
 */
export function shouldAutoScroll(container: HTMLElement): boolean {
  const threshold = 50; // pixels
  const { scrollTop, scrollHeight, clientHeight } = container;
  return scrollHeight - scrollTop - clientHeight < threshold;
}

/**
 * Scroll container to bottom with smooth animation
 */
export function scrollToBottom(container: HTMLElement, smooth = true): void {
  const targetScroll = container.scrollHeight - container.clientHeight;

  if (smooth) {
    // Use motion's animate for smoother scrolling
    animate(container, { scrollTop: targetScroll }, { duration: 0.5 });
  } else {
    container.scrollTop = targetScroll;
  }
}

/**
 * Custom hook for auto-scroll behavior
 */
export function useAutoScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  messages: unknown[]
) {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [canAutoScroll, setCanAutoScroll] = useState(true);
  const prevMessagesLength = useRef(messages.length);

  // Track scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    function handleScroll() {
      if (!container) {
        return;
      }
      const atBottom = shouldAutoScroll(container);
      setIsAtBottom(atBottom);
      setCanAutoScroll(atBottom);
    }

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  // Auto-scroll on new messages
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Only auto-scroll if:
    // 1. User hasn't manually scrolled up (canAutoScroll is true)
    // 2. New messages were added
    if (canAutoScroll && messages.length > prevMessagesLength.current) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        scrollToBottom(container, true);
      }, 100);
    }

    prevMessagesLength.current = messages.length;
  }, [messages, canAutoScroll, containerRef]);

  const scrollToBottomManual = () => {
    const container = containerRef.current;
    if (container) {
      scrollToBottom(container, true);
      setCanAutoScroll(true);
      setIsAtBottom(true);
    }
  };

  return {
    isAtBottom,
    scrollToBottom: scrollToBottomManual,
    canAutoScroll,
  };
}
