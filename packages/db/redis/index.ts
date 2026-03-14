import IORedis from "ioredis";
import { keys } from "../key";

export let connection: IORedis | null = null;

export const getRedis = () => {
  if (!connection) {
    const redisUrl = keys().REDIS_URL;
    const isTls = redisUrl.startsWith("rediss://");

    connection = new IORedis(redisUrl, {
      maxRetriesPerRequest: null,
      family: 0,
      tls: isTls
        ? {
            rejectUnauthorized: false,
          }
        : undefined,
    });
  }
  return connection;
};

/**
 * Simple Redis caching helper. Stores JSON-serialized values under `key` for `ttlSeconds`.
 * If the key exists, returns the parsed value; otherwise, runs `fetcher`, caches, and returns it.
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: { ttlSeconds?: number; disable?: boolean }
): Promise<T> {
  const { ttlSeconds = 120, disable = false } = options ?? {};

  const redis = getRedis();

  if (!disable) {
    const cached = await redis.get(key);
    if (cached) {
      try {
        return JSON.parse(cached) as T;
      } catch {
        // fallthrough to refresh cache
      }
    }
  }

  const value = await fetcher();

  if (!disable) {
    try {
      await redis.setex(key, ttlSeconds, JSON.stringify(value));
    } catch {
      // ignore cache set errors
    }
  }

  return value;
}
