import { useCallback, useState } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

function useToastQueue() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type: ToastType, message: string) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => dismiss(id), 4000);
      return id;
    },
    [dismiss]
  );

  const success = useCallback(
    (message: string) => push("success", message),
    [push]
  );
  const error = useCallback(
    (message: string) => push("error", message),
    [push]
  );
  const info = useCallback((message: string) => push("info", message), [push]);

  return { toasts, dismiss, success, error, info };
}

export { useToastQueue };
export type { Toast, ToastType };
