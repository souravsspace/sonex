import { createContext, useContext } from "react";
import type { Toast } from "@/components/ui/toast.logic";
import { useToastQueue } from "@/components/ui/toast.logic";
import { cn } from "@/lib/utils";

const ToastContext = createContext<ReturnType<typeof useToastQueue> | null>(
  null
);

function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within <Toaster />");
  }
  return ctx;
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const typeStyles = {
    success:
      "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400",
    error: "border-destructive/30 bg-destructive/10 text-destructive",
    info: "border-border bg-background text-foreground",
  } as const;

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg",
        "slide-in-from-bottom-2 fade-in-0 animate-in",
        typeStyles[toast.type]
      )}
      role="alert"
    >
      <span>{toast.message}</span>
      <button
        aria-label="Dismiss notification"
        className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
        onClick={onDismiss}
        type="button"
      >
        ✕
      </button>
    </div>
  );
}

function Toaster() {
  const queue = useToastQueue();

  return (
    <ToastContext.Provider value={queue}>
      <div
        aria-live="polite"
        className="fixed right-4 bottom-4 z-50 flex w-80 flex-col gap-2"
      >
        {queue.toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            onDismiss={() => queue.dismiss(toast.id)}
            toast={toast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export { Toaster, useToast };
