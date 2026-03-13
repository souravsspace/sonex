import type { DiffWorkerRequest, DiffWorkerResponse, FileDiff } from "./types";

interface PendingRequest {
  reject: (error: Error) => void;
  resolve: (diffs: FileDiff[]) => void;
}

const WORKER_TIMEOUT_MS = 30_000;
const MAX_WORKER_POOL_SIZE = 8;

/**
 * Manages a pool of diff parsing workers for parallel processing
 */
export class DiffWorkerPool {
  private workers: Worker[] = [];
  private readonly activeRequests = new Map<string, PendingRequest>();
  private readonly poolSize: number;

  constructor(poolSize = navigator.hardwareConcurrency || 4) {
    this.poolSize = Math.min(poolSize, MAX_WORKER_POOL_SIZE);
    this.initializeWorkers();
  }

  private initializeWorkers(): void {
    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(
        new URL("../workers/diff-worker.ts", import.meta.url),
        { type: "module" }
      );

      worker.onmessage = this.handleWorkerMessage.bind(this);
      worker.onerror = this.handleWorkerError.bind(this);
      this.workers.push(worker);
    }
  }

  private handleWorkerMessage(event: MessageEvent<DiffWorkerResponse>): void {
    const { id, type, payload } = event.data;
    const request = this.activeRequests.get(id);
    if (!request) {
      return;
    }

    if (type === "result") {
      request.resolve(payload as FileDiff[]);
    } else {
      request.reject(new Error(payload as string));
    }

    this.activeRequests.delete(id);
  }

  private handleWorkerError(error: ErrorEvent): void {
    const errorMessage = `Worker error: ${error.message}`;
    for (const request of this.activeRequests.values()) {
      request.reject(new Error(errorMessage));
    }
    this.activeRequests.clear();
  }

  parseDiff(unifiedDiff: string): Promise<FileDiff[]> {
    const requestId = `${Date.now()}-${Math.random()}`;
    const workerIndex = this.activeRequests.size % this.workers.length;
    const worker = this.workers[workerIndex];

    return new Promise((resolve, reject) => {
      this.activeRequests.set(requestId, { resolve, reject });

      const request: DiffWorkerRequest = {
        id: requestId,
        type: "parse",
        payload: unifiedDiff,
      };

      worker.postMessage(request);

      const timeoutId = setTimeout(() => {
        if (this.activeRequests.has(requestId)) {
          this.activeRequests.delete(requestId);
          reject(new Error("Diff parsing timeout"));
        }
      }, WORKER_TIMEOUT_MS);

      const originalResolve = this.activeRequests.get(requestId)?.resolve;
      const originalReject = this.activeRequests.get(requestId)?.reject;

      if (originalResolve && originalReject) {
        this.activeRequests.set(requestId, {
          resolve: (diffs) => {
            clearTimeout(timeoutId);
            originalResolve(diffs);
          },
          reject: (error) => {
            clearTimeout(timeoutId);
            originalReject(error);
          },
        });
      }
    });
  }

  terminate(): void {
    for (const worker of this.workers) {
      worker.terminate();
    }
    this.workers = [];
    this.activeRequests.clear();
  }
}
