/**
 * Fixed-window rate limiter. With Upstash Redis configured (Vercel's Upstash
 * integration sets KV_REST_API_URL / KV_REST_API_TOKEN) the count is shared by
 * every serverless instance; without it (local dev) it falls back to memory.
 */
export function createRateLimiter({ limit, windowMs, prefix }: { limit: number; windowMs: number; prefix: string }) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const local = createMemoryLimiter({ limit, windowMs });

  return async function allow(key: string): Promise<boolean> {
    if (!url || !token) return local(key);
    const window = Math.floor(Date.now() / windowMs);
    const id = `${prefix}:${key}:${window}`;
    try {
      const response = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([["INCR", id], ["PEXPIRE", id, String(windowMs), "NX"]]),
        cache: "no-store",
        signal: AbortSignal.timeout(2000),
      });
      if (!response.ok) throw new Error(String(response.status));
      const [count] = (await response.json()) as [{ result?: number }];
      return (count.result ?? 0) <= limit;
    } catch (error) {
      // Redis unreachable: keep a per-instance limit rather than none.
      console.error("rate-limit: redis unavailable", (error as Error).message);
      return local(key);
    }
  };
}

/** In-memory sliding window; per instance only. */
function createMemoryLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function allow(key: string, now = Date.now()) {
    const recent = (hits.get(key) ?? []).filter(time => now - time < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    // Keep the map from growing without bound.
    if (hits.size > 5000) for (const [entry, times] of hits) if (times.every(time => now - time >= windowMs)) hits.delete(entry);
    return true;
  };
}
