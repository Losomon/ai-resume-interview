import { Router } from 'express';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { users, userProfiles, userSettings } from '../db/schema';
import { asyncHandler } from '../utils/http';
import { requireAuth, uid, clearSession } from '../middleware/auth';

export const usersRouter = Router();
usersRouter.use(requireAuth);

const patchSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  headline: z.string().max(200).nullable().optional(),
  targetRole: z.string().max(120).nullable().optional(),
  skills: z.array(z.string().trim().min(1).max(60)).max(100).optional(),
  education: z.array(z.record(z.unknown())).max(20).optional(),
  experience: z.array(z.record(z.unknown())).max(30).optional(),
});

usersRouter.get('/me', asyncHandler(async (req, res) => {
  const id = uid(req);
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  const profile = await db.query.userProfiles.findFirst({ where: eq(userProfiles.userId, id) });
  res.json({ user: { id, email: user!.email, name: user!.name }, profile });
}));

usersRouter.patch('/me', asyncHandler(async (req, res) => {
  const id = uid(req);
  const { name, ...profile } = patchSchema.parse(req.body);
  if (name) await db.update(users).set({ name }).where(eq(users.id, id));
  if (Object.keys(profile).length) {
    await db.update(userProfiles).set({ ...profile, updatedAt: new Date() }).where(eq(userProfiles.userId, id));
  }
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  const p = await db.query.userProfiles.findFirst({ where: eq(userProfiles.userId, id) });
  res.json({ user: { id, email: user!.email, name: user!.name }, profile: p });
}));

usersRouter.delete('/me', asyncHandler(async (req, res) => {
  await db.delete(users).where(eq(users.id, uid(req))); // cascades to all user data
  clearSession(res);
  res.status(204).end();
}));

export const settingsRouter = Router();
settingsRouter.use(requireAuth);

settingsRouter.get('/', asyncHandler(async (req, res) => {
  const s = await db.query.userSettings.findFirst({ where: eq(userSettings.userId, uid(req)) });
  res.json({ preferences: s?.preferences ?? {} });
}));

settingsRouter.patch('/', asyncHandler(async (req, res) => {
  const body = z.object({ preferences: z.record(z.unknown()) }).parse(req.body);
  const id = uid(req);
  const current = await db.query.userSettings.findFirst({ where: eq(userSettings.userId, id) });
  const merged = { ...(current?.preferences ?? {}), ...body.preferences };
  await db.update(userSettings).set({ preferences: merged, updatedAt: new Date() }).where(eq(userSettings.userId, id));
  res.json({ preferences: merged });
}));
