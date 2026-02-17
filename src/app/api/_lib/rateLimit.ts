const ipRequests = new Map<string, number[]>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

export function rateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) || []).filter(t => t > now - WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    return { allowed: false, retryAfter: Math.ceil((oldest + WINDOW_MS - now) / 1000) };
  }

  timestamps.push(now);
  ipRequests.set(ip, timestamps);

  // Cleanup old entries periodically
  if (ipRequests.size > 10000) {
    for (const [key, val] of ipRequests) {
      if (val.every(t => t <= now - WINDOW_MS)) ipRequests.delete(key);
    }
  }

  return { allowed: true };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}
