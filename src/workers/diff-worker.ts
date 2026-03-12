import { parseUnifiedDiff } from "@/lib/diff-parser";
import type { DiffWorkerRequest, DiffWorkerResponse } from "@/lib/diff-types";

self.onmessage = (event: MessageEvent<DiffWorkerRequest>) => {
  const { id, type, payload } = event.data;

  if (type !== "parse") {
    const errorResponse: DiffWorkerResponse = {
      id,
      type: "error",
      payload: "Unknown message type",
    };
    self.postMessage(errorResponse);
    return;
  }

  try {
    const diffs = parseUnifiedDiff(payload);
    const response: DiffWorkerResponse = {
      id,
      type: "result",
      payload: diffs,
    };
    self.postMessage(response);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Parse failed";
    const errorResponse: DiffWorkerResponse = {
      id,
      type: "error",
      payload: errorMessage,
    };
    self.postMessage(errorResponse);
  }
};
