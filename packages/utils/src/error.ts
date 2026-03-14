import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";
import { ZodError, z } from "zod";
import { FormatApiError, FormatZodError } from "./format-error";
import { logger } from "./logger";
import { HttpStatus } from "./status";

const ErrorCode = z.enum([
  "BAD_REQUEST",
  "FORBIDDEN",
  "INTERNAL_SERVER_ERROR",
  "NOT_FOUND",
  "NOT_UNIQUE",
  "RATE_LIMITED",
  "UNAUTHORIZED",
  "METHOD_NOT_ALLOWED",
]);

function codeToStatus(code: z.infer<typeof ErrorCode>): ContentfulStatusCode {
  switch (code) {
    case "BAD_REQUEST":
      return HttpStatus.BAD_REQUEST;
    case "UNAUTHORIZED":
      return HttpStatus.UNAUTHORIZED;
    case "FORBIDDEN":
      return HttpStatus.FORBIDDEN;
    case "NOT_FOUND":
      return HttpStatus.NOT_FOUND;
    case "METHOD_NOT_ALLOWED":
      return HttpStatus.METHOD_NOT_ALLOWED;
    case "NOT_UNIQUE":
      return HttpStatus.CONFLICT;
    case "RATE_LIMITED":
      return HttpStatus.TOO_MANY_REQUESTS;
    case "INTERNAL_SERVER_ERROR":
      return HttpStatus.INTERNAL_SERVER_ERROR;

    default:
      return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

function statusToCode(status: StatusCode): z.infer<typeof ErrorCode> {
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      return "BAD_REQUEST";
    case HttpStatus.UNAUTHORIZED:
      return "UNAUTHORIZED";
    case HttpStatus.FORBIDDEN:
      return "FORBIDDEN";
    case HttpStatus.NOT_FOUND:
      return "NOT_FOUND";
    case HttpStatus.METHOD_NOT_ALLOWED:
      return "METHOD_NOT_ALLOWED";
    case HttpStatus.CONFLICT:
      return "NOT_UNIQUE";
    case HttpStatus.TOO_MANY_REQUESTS:
      return "RATE_LIMITED";
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return "INTERNAL_SERVER_ERROR";
    default:
      return "INTERNAL_SERVER_ERROR";
  }
}

export class SonexApiError extends HTTPException {
  // biome-ignore lint/style/useConsistentMemberAccessibility:idk
  public readonly code: z.infer<typeof ErrorCode>;

  constructor({
    code,
    message,
  }: {
    code: z.infer<typeof ErrorCode>;
    message: string;
  }) {
    super(codeToStatus(code), { message });
    this.code = code;
  }
}

export function handleError(err: Error, c: Context): Response {
  /**
   * We can handle this very well, as it is something we threw ourselves
   */
  if (err instanceof SonexApiError) {
    if (err.status >= 500) {
      logger.error(
        { name: err.name, code: err.code, status: err.status, err },
        err.message
      );
    }
    return c.json(FormatApiError(err.code, err.message), {
      status: err.status,
    });
  }

  /**
   * ZodErrors are validation errors that we can format nicely
   */
  if (err instanceof ZodError) {
    const message = FormatZodError(err);
    return c.json(
      {
        success: false,
        error: {
          code: "BAD_REQUEST",
          message,
          details: err.issues,
        },
      },
      { status: HttpStatus.BAD_REQUEST }
    );
  }

  /**
   * HTTPExceptions from hono at least give us some idea of what to do as they provide a status and
   * message
   */
  if (err instanceof HTTPException) {
    if (err.status >= 500) {
      logger.error(
        { message: err.message, status: err.status, err },
        "HTTPException"
      );
    }
    const code = statusToCode(err.status);
    return c.json(FormatApiError(code, err.message), { status: err.status });
  }

  /**
   * We're lost here, all we can do is return a 500 and log it to investigate
   */
  logger.error(
    {
      err,
      name: err.name,
      message: err.message,
      cause: err.cause,
      stack: err.stack,
    },
    "unhandled exception"
  );
  return c.json(
    FormatApiError("INTERNAL_SERVER_ERROR", "something unexpected happened"),
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}
