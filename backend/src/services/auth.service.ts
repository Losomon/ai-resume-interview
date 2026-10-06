import crypto from "node:crypto"; import { and, eq, gt } from "drizzle-orm"; import { users, refreshTokens } from "@careerforge/database";
import { db } from "../db.js"; import { env } from "../env.js"; import { hashPassword, verifyPassword } from "../lib/password.js"; import { signAccessToken } from "../lib/jwt.js"; import { ConflictError, UnauthorizedError } from "../lib/errors.js";
const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
const publicUser = (u: { id: string; name: string; email: string }) => ({ id: u.id, name: u.name, email: u.email });
export interface Session { access: string; refresh: string }
async function issueSession(userId: string): Promise<Session> {
  const refresh = crypto.randomBytes(48).toString("base64url");
  await db.insert(refreshTokens).values({ userId, tokenHash: sha(refresh), expiresAt: new Date(Date.now() + env.REFRESH_TTL_DAYS * 86_400_000) });
  return { access: signAccessToken(userId), refresh };
}
export async function register(i: { name: string; email: string; password: string }) {
  const [u] = await db.insert(users).values({ name: i.name, email: i.email, passwordHash: await hashPassword(i.password) }).onConflictDoNothing().returning();
  if (!u) throw new ConflictError("EMAIL_TAKEN", "An account with this email already exists");
  return { user: publicUser(u), session: await issueSession(u.id) };
}
export async function login(email: string, password: string) {
  const [u] = await db.select().from(users).where(eq(users.email, email)); const ok = await verifyPassword(password, u?.passwordHash);
  if (!u || !ok) throw new UnauthorizedError("Email or password is incorrect"); // same message for both cases
  return { user: publicUser(u), session: await issueSession(u.id) };
}
/** Rotates: the presented refresh token is deleted and a new pair issued. */
export async function refresh(token?: string): Promise<Session> {
  if (!token) throw new UnauthorizedError();
  const [row] = await db.delete(refreshTokens).where(and(eq(refreshTokens.tokenHash, sha(token)), gt(refreshTokens.expiresAt, new Date()))).returning();
  if (!row) throw new UnauthorizedError("Session expired"); return issueSession(row.userId);
}
export async function logout(token?: string) { if (token) await db.delete(refreshTokens).where(eq(refreshTokens.tokenHash, sha(token))); }
export async function me(userId: string) { const [u] = await db.select().from(users).where(eq(users.id, userId)); if (!u) throw new UnauthorizedError(); return publicUser(u); }
