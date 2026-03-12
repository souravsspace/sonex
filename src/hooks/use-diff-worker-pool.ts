import { useEffect, useRef } from "react";
import { DiffWorkerPool } from "@/lib/diff/worker-pool";

/**
 * Singleton worker pool accessible via React hook
 */
export function useDiffWorkerPool(): DiffWorkerPool {
  const poolRef = useRef<DiffWorkerPool | null>(null);

  useEffect(() => {
    if (!poolRef.current) {
      poolRef.current = new DiffWorkerPool();
    }

    return () => {
      poolRef.current?.terminate();
      poolRef.current = null;
    };
  }, []);

  if (!poolRef.current) {
    poolRef.current = new DiffWorkerPool();
  }

  return poolRef.current;
}
