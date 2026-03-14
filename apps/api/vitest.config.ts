import { sharedConfig } from "@sonex/vitest-config";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environment: "node",
      env: {},
      setupFiles: ["./src/test-setup.ts"],
    },
  })
);
