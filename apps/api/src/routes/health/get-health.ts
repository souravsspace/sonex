import { HttpStatus } from "@sonex/utils";
import type { PublicAPIApp } from "../../hono.ts";

export default function (app: PublicAPIApp) {
  app.get("/health", (c) =>
    c.json(
      {
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
      },
      HttpStatus.OK
    )
  );
}
