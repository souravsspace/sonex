import { HttpStatus } from "@sonex/utils";
import pkg from "#pkg";
import type { PublicAPIApp } from "../../hono.ts";

export default function (app: PublicAPIApp) {
  app.get("/version", (c) =>
    c.json(
      {
        name: pkg.name,
        version: pkg.version,
        author: pkg.author,
        environment: process.env.NODE_ENV,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        timestamp: new Date().toISOString(),
        memory: process.memoryUsage(),
      },
      HttpStatus.OK
    )
  );
}
