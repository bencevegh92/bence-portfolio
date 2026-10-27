/**
 * In-memory sliding-window limiter. Good enough locally and on a single
 * long-lived server; serverless instances do not share memory, so a public
 * deployment should swap this for a shared store (e.g. Upstash Redis).
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
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
