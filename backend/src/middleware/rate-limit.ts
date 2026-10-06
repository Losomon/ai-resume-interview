import rateLimit from "express-rate-limit";
const message = { error: { code: "RATE_LIMITED", message: "Too many requests. Try again later." } };
export const authLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 20, standardHeaders: "draft-7", legacyHeaders: false, message });
/** Per user (run after requireAuth): 30 AI calls per hour, as proposed in doc 07. */
export const aiLimiter = rateLimit({ windowMs: 3_600_000, limit: 30, standardHeaders: "draft-7", legacyHeaders: false, message, keyGenerator: (req) => req.userId ?? "anon" });
