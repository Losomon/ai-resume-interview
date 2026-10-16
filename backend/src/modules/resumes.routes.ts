import { Router } from 'express';
import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { resumes } from '../db/schema';
import { asyncHandler, HttpError } from '../utils/http';
import { requireAuth, uid } from '../middleware/auth';

export const resumesRouter = Router();
resumesRouter.use(requireAuth);

const idParam = z.string().uuid();
const createSchema = z.object({
  title: z.string().trim().min(1).max(150),
  template: z.string().max(40).optional(),
  content: z.record(z.unknown()).optional(),
});
const patchSchema = createSchema.partial();

// Every query is scoped by user_id: users can only ever reach their own rows.
const owned = (id: string, userId: string) => and(eq(resumes.id, id), eq(resumes.userId, userId));

resumesRouter.get('/', asyncHandler(async (req, res) => {
  const rows = await db.select().from(resumes).where(eq(resumes.userId, uid(req))).orderBy(desc(resumes.updatedAt));
  res.json({ resumes: rows });
}));

resumesRouter.post('/', asyncHandler(async (req, res) => {
  const body = createSchema.parse(req.body);
  const [row] = await db.insert(resumes).values({ ...body, userId: uid(req) }).returning();
  res.status(201).json({ resume: row });
}));

resumesRouter.get('/:id', asyncHandler(async (req, res) => {
  const id = idParam.parse(req.params.id);
  const [row] = await db.select().from(resumes).where(owned(id, uid(req)));
  if (!row) throw new HttpError(404, 'Resume not found');
  res.json({ resume: row });
}));

resumesRouter.patch('/:id', asyncHandler(async (req, res) => {
  const id = idParam.parse(req.params.id);
  const body = patchSchema.parse(req.body);
  const [row] = await db.update(resumes).set({ ...body, updatedAt: new Date() }).where(owned(id, uid(req))).returning();
  if (!row) throw new HttpError(404, 'Resume not found');
  res.json({ resume: row });
}));

resumesRouter.delete('/:id', asyncHandler(async (req, res) => {
  const id = idParam.parse(req.params.id);
  const [row] = await db.delete(resumes).where(owned(id, uid(req))).returning({ id: resumes.id });
  if (!row) throw new HttpError(404, 'Resume not found');
  res.status(204).end();
}));
