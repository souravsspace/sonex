export interface Thread {
  createdAt: number;
  id: string;
  projectPath: string;
  title: string;
}

export interface Project {
  id: string;
  name: string;
  path: string;
  threads: Thread[];
}

export type Theme = "light" | "dark" | "system";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  duration?: number;
  id: string;
  message: string;
  type: ToastType;
}
