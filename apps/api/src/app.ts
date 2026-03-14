import { getApp } from "./hono";
import getHealth from "./routes/health/get-health";
import getVersion from "./routes/version/get-version";

let _app: ReturnType<typeof getApp> | null = null;

export function initializeApp() {
  if (_app) {
    return _app;
  }

  _app = getApp();

  /**
   * System routes
   */
  getHealth(_app);
  getVersion(_app);

  return _app;
}

// For backward compatibility and local dev
export const app = new Proxy({} as ReturnType<typeof getApp>, {
  get(_target, prop) {
    const initializedApp = initializeApp();
    return initializedApp[prop as keyof ReturnType<typeof getApp>];
  },
});

export default app;
