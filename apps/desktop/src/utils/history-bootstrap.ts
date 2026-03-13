const LAST_THREAD_KEY = "sonex-last-thread";

function bootstrapHistory(): { redirect?: string } {
  const lastThreadId = localStorage.getItem(LAST_THREAD_KEY);
  if (lastThreadId) {
    return { redirect: `/_chat/${lastThreadId}` };
  }
  return {};
}

function persistLastThread(threadId: string): void {
  localStorage.setItem(LAST_THREAD_KEY, threadId);
}

function clearLastThread(): void {
  localStorage.removeItem(LAST_THREAD_KEY);
}

export { bootstrapHistory, persistLastThread, clearLastThread };
