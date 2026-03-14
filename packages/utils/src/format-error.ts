import type { ZodError } from "zod";

/**
 * Formats a Zod validation error into a user-friendly message
 * @param error - The ZodError instance
 * @returns Formatted error message
 */
export function FormatZodError(error: ZodError): string {
  const issues = error.issues;

  if (issues.length === 0) {
    return "Validation failed";
  }

  if (issues.length === 1) {
    // biome-ignore lint/style/noNonNullAssertion: we checked length above
    const issue = issues[0]!;
    const path = issue.path.join(".");
    const field = path || "input";

    const message = issue.message;

    if (message === "Required") {
      return `${field} is required`;
    }

    if (path) {
      return `${field}: ${message}`;
    }

    return message;
  }

  const errorMessages = issues.map((issue) => {
    const path = issue.path.join(".");
    const field = path || "input";
    return field ? `${field}: ${issue.message}` : issue.message;
  });

  return `Validation failed: ${errorMessages.join("; ")}`;
}

/**
 * Formats an API error into a standard response object
 * @param code - The error code
 * @param message - The error message
 */
export function FormatApiError(code: string, message: string) {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}
