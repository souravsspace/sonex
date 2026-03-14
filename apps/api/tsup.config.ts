import { defineConfig, type Options } from "tsup";

const bundleAll = /.*/;

export default defineConfig((options: Options) => ({
  entry: {
    server: "src/server.ts",
  },
  format: ["cjs"],
  target: "node18",
  platform: "node",
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
  noExternal: [bundleAll],
  ...options,
}));
