import type { ViteUserConfig } from "vitest/config";

export const sharedConfig: ViteUserConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.spec.ts",
        "**/*.test.ts",
        "**/test/**",
        "**/__tests__/**",
      ],
    },
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".next", "build"],
  },
};
