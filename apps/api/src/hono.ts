import { getRedis, type user as UserTable } from "@sonex/db";
import { handleError, logger, SonexApiError } from "@sonex/utils";
import type { Context, Next } from "hono";
import { Hono } from "hono";

export type AppEnv = {
  Variables: {
    user: typeof UserTable & {
      isAuthor: string; // legacy flag — keep type as-is for now (TODO: remove in prod)
    };
  };
};

export function getApp() {
  const app = new Hono<AppEnv>();
  const api = new Hono<AppEnv>();

  api.onError(handleError);

  const isPublicPath = (path: string) =>
    path.startsWith("/health") || path.startsWith("/version");

  // (OPTIONAL) Auth middleware placeholder
  // If you have auth logic, set c.set("user", userObject) here.
  // For now we don't enforce auth; the middleware pattern is preserved.
  api.use("*", async (c: Context<AppEnv>, next: Next) => {
    if (isPublicPath(c.req.path)) {
      return await next();
    }

    // Example: if you implement auth, set the user onto the context here:
    // try {
    //   const user = await getUserFromToken(c);
    //   c.set("user", user);
    // } catch (err) {
    //   logger.error({ err }, "Auth error");
    //   throw new SonexApiError({ code: "UNAUTHORIZED", message: "Authentication failed" });
    // }

    return next();
  });

  const RATE_LIMIT_WINDOW_SECONDS = 1;
  const USER_RATE_LIMIT = 50;

  api.use("*", async (c: Context<AppEnv>, next: Next) => {
    if (isPublicPath(c.req.path)) {
      return next();
    }

    const user = c.var.user;
    // If there's no user on the context, skip rate limiting (public or unauthenticated)
    if (!user) {
      return next();
    }

    const limit = USER_RATE_LIMIT;
    const key = `rl:user:${user.id}`;
    const redis = getRedis();

    let currentRequests: number;
    let ttl: number;

    try {
      currentRequests = await redis.incr(key);

      if (currentRequests === 1) {
        await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
      }

      ttl = await redis.ttl(key);
    } catch (error) {
      logger.error({ err: error }, "Redis error during rate limiting");
      return next();
    }

    const resetTime =
      Math.floor(Date.now() / 1000) +
      (ttl > 0 ? ttl : RATE_LIMIT_WINDOW_SECONDS);
    const remainingRequests = Math.max(0, limit - currentRequests);

    c.header("X-RateLimit-Limit", String(limit));
    c.header("X-RateLimit-Remaining", String(remainingRequests));
    c.header("X-RateLimit-Reset", String(resetTime));

    if (currentRequests > limit) {
      c.header(
        "Retry-After",
        String(ttl > 0 ? ttl : RATE_LIMIT_WINDOW_SECONDS)
      );
      throw new SonexApiError({
        code: "RATE_LIMITED",
        message: `Rate limit exceeded. Try again in ${ttl > 0 ? ttl : RATE_LIMIT_WINDOW_SECONDS} seconds.`,
      });
    }

    return next();
  });
  return app;
}

export type PublicAPIApp = Hono<AppEnv>;
