import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z
        .url()
        .default("postgresql://user:password@localhost:5432/db"),
      REDIS_URL: z.url().default("redis://localhost:6379"),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
      REDIS_URL: process.env.REDIS_URL,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
  });
