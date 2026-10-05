import { Router, type Response } from "express"; import { z } from "zod"; import bcrypt from "bcryptjs"; import jwt from "jsonwebtoken"; import crypto from "node:crypto";
import { and, eq, gt } from "drizzle-orm"; import { db } from "../db.js"; import { users, refreshTokens } from "@careerforge/database"; import { config } from "../config.js";
import { AppError } from "../middleware/error.js"; import { requireAuth } from "../middleware/auth.js"; import { authLimiter } from "../middleware/rateLimit.js";
export const authRouter = Router();
const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
const base = { httpOnly: true, secure: config.NODE_ENV === "production", sameSite: "lax" as const };
const DAY = 86_400_000;
const publicUser = (u: { id: string; name: string; email: string }) => ({ id: u.id, name: u.name, email: u.email });

async function issueSession(res: Response, userId: string) {
  const refresh = crypto.randomBytes(48).toString("base64url");
  await db.insert(refreshTokens).values({ userId, tokenHash: sha(refresh), expiresAt: new Date(Date.now() + 30 * DAY) });
  res.cookie("cf_at", jwt.sign({ sub: userId }, config.JWT_SECRET, { algorithm: "HS256", expiresIn: "15m" }), { ...base, maxAge: 15 * 60_000, path: "/" });
  res.cookie("cf_rt", refresh, { ...base, maxAge: 30 * DAY, path: "/api/v1/auth" });
}
const creds = z.object({ email: z.string().trim().toLowerCase().email().max(254), password: z.string().min(8, "Use at least 8 characters").max(128) });
const DUMMY = bcrypt.hashSync("not-a-real-password", 12); // equalizes timing when the email doesn't exist

authRouter.post("/register", authLimiter, async (req, res) => {
  const { name, email, password } = creds.extend({ name: z.string().trim().min(1).max(120) }).parse(req.body);
  const [user] = await db.insert(users).values({ name, email, passwordHash: await bcrypt.hash(password, 12) }).onConflictDoNothing().returning();
  if (!user) throw new AppError(409, "EMAIL_TAKEN", "An account with this email already exists");
  await issueSession(res, user.id); res.status(201).json({ user: publicUser(user) });
});
authRouter.post("/login", authLimiter, async (req, res) => {
  const { email, password } = creds.parse(req.body);
  const [user] = await db.select().from(users).where(eq(users.email, email));
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY);
  if (!user || !ok) throw new AppError(401, "INVALID_CREDENTIALS", "Email or password is incorrect");
  await issueSession(res, user.id); res.json({ user: publicUser(user) });
});
/** Rotates the refresh token: the presented one is deleted and a new pair issued. */
authRouter.post("/refresh", async (req, res) => {
  const token = req.cookies?.cf_rt; if (!token) throw new AppError(401, "UNAUTHENTICATED", "Please log in");
  const [row] = await db.delete(refreshTokens).where(and(eq(refreshTokens.tokenHash, sha(token)), gt(refreshTokens.expiresAt, new Date()))).returning();
  if (!row) throw new AppError(401, "UNAUTHENTICATED", "Session expired");
  await issueSession(res, row.userId); res.json({ ok: true });
});
authRouter.post("/logout", async (req, res) => {
  const token = req.cookies?.cf_rt; if (token) await db.delete(refreshTokens).where(eq(refreshTokens.tokenHash, sha(token)));
  res.clearCookie("cf_at", { ...base, path: "/" }).clearCookie("cf_rt", { ...base, path: "/api/v1/auth" }).status(204).end();
});
authRouter.get("/me", requireAuth, async (req, res) => {
  const [user] = await db.select().from(users).where(eq(users.id, req.userId!)); if (!user) throw new AppError(401, "UNAUTHENTICATED", "Please log in");
  res.json({ user: publicUser(user) });
});
