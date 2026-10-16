import { Router } from 'express';
import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { applications, resumes } from '../db/schema';
import { asyncHandler, HttpError } from '../utils/http';
import { requireAuth, uid } from '../middleware/auth';

export const STATUSES = ['saved', 'applied', 'interview', 'offer', 'rejected'] as const;

export const applicationsRouter = Router();
applicationsRouter.use(requireAuth);

const createSchema = z.object({
  company: z.string().trim().min(1).max(150),
  position: z.string().trim().min(1).max(150),
  status: z.enum(STATUSES).optional(),
  resumeId: z.string().uuid().nullable().optional(),
  appliedAt: z.coerce.date().nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
});
const patchSchema = createSchema.partial();
const owned = (id: string, userId: string) => and(eq(applications.id, id), eq(applications.userId, userId));

async function assertResumeOwned(resumeId: string | null | undefined, userId: string) {
  if (!resumeId) return;
  const [r] = await db.select({ id: resumes.id }).from(resumes).where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)));
  if (!r) throw new HttpError(400, 'Linked resume not found');
}

applicationsRouter.get('/', asyncHandler(async (req, res) => {
  const rows = await db.select().from(applications).where(eq(applications.userId, uid(req))).orderBy(desc(applications.updatedAt));
  res.json({ applications: rows });
}));

applicationsRouter.post('/', asyncHandler(async (req, res) => {
  const body = createSchema.parse(req.body);
  const userId = uid(req);
  await assertResumeOwned(body.resumeId, userId);
  const [row] = await db.insert(applications).values({ ...body, userId }).returning();
  res.status(201).json({ application: row });
}));

applicationsRouter.patch('/:id', asyncHandler(async (req, res) => {
  const id = z.string().uuid().parse(req.params.id);
  const body = patchSchema.parse(req.body);
  const userId = uid(req);
  await assertResumeOwned(body.resumeId, userId);
  const [row] = await db.update(applications).set({ ...body, updatedAt: new Date() }).where(owned(id, userId)).returning();
  if (!row) throw new HttpError(404, 'Application not found');
  res.json({ application: row });
}));

applicationsRouter.delete('/:id', asyncHandler(async (req, res) => {
  const id = z.string().uuid().parse(req.params.id);
  const [row] = await db.delete(applications).where(owned(id, uid(req))).returning({ id: applications.id });
  if (!row) throw new HttpError(404, 'Application not found');
  res.status(204).end();
}));
