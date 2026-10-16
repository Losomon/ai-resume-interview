import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { users, userProfiles, userSettings } from '../db/schema';
import { asyncHandler, HttpError } from '../utils/http';
import { clearSession, requireAuth, setSession, uid } from '../middleware/auth';

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

const registerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
});
const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(128),
});

const publicUser = (u: { id: string; email: string; name: string }) => ({ id: u.id, email: u.email, name: u.name });

export const authRouter = Router();

authRouter.post('/register', limiter, asyncHandler(async (req, res) => {
  const { name, email, password } = registerSchema.parse(req.body);
  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) throw new HttpError(409, 'An account with this email already exists');
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await db.transaction(async (tx) => {
    const [u] = await tx.insert(users).values({ name, email, passwordHash }).returning();
    await tx.insert(userProfiles).values({ userId: u.id });
    await tx.insert(userSettings).values({ userId: u.id });
    return u;
  });
  setSession(res, user.id);
  res.status(201).json({ user: publicUser(user) });
}));

authRouter.post('/login', limiter, asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });
  // Same error for unknown email and wrong password: no account enumeration.
  const ok = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!user || !ok) throw new HttpError(401, 'Incorrect email or password');
  setSession(res, user.id);
  res.json({ user: publicUser(user) });
}));

authRouter.post('/logout', (_req, res) => {
  clearSession(res);
  res.status(204).end();
});

authRouter.get('/me', requireAuth, asyncHandler(async (req, res) => {
  const user = await db.query.users.findFirst({ where: eq(users.id, uid(req)) });
  if (!user) { clearSession(res); throw new HttpError(401, 'Not authenticated'); }
  res.json({ user: publicUser(user) });
}));
