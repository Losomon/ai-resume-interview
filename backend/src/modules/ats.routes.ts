import { Router } from 'express';
import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { atsAnalyses, resumes } from '../db/schema';
import { asyncHandler, HttpError } from '../utils/http';
import { requireAuth, uid } from '../middleware/auth';
import { analyze, flattenContent } from './ats.service';

export const atsRouter = Router();
atsRouter.use(requireAuth);

const bodySchema = z.object({
  resumeId: z.string().uuid(),
  jobTitle: z.string().max(150).optional(),
  jobDescription: z.string().trim().min(20).max(20000),
});

atsRouter.post('/analyze', asyncHandler(async (req, res) => {
  const { resumeId, jobTitle, jobDescription } = bodySchema.parse(req.body);
  const userId = uid(req);
  const [resume] = await db.select().from(resumes).where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)));
  if (!resume) throw new HttpError(404, 'Resume not found');

  const report = analyze(flattenContent(resume.content), jobDescription);
  const [row] = await db.insert(atsAnalyses).values({
    userId, resumeId, jobTitle, jobDescription, score: report.score, report,
  }).returning();
  res.status(201).json({ analysis: row });
}));

atsRouter.get('/', asyncHandler(async (req, res) => {
  const rows = await db.select().from(atsAnalyses).where(eq(atsAnalyses.userId, uid(req)))
    .orderBy(desc(atsAnalyses.createdAt)).limit(50);
  res.json({ analyses: rows });
}));

atsRouter.get('/:id', asyncHandler(async (req, res) => {
  const id = z.string().uuid().parse(req.params.id);
  const [row] = await db.select().from(atsAnalyses).where(and(eq(atsAnalyses.id, id), eq(atsAnalyses.userId, uid(req))));
  if (!row) throw new HttpError(404, 'Analysis not found');
  res.json({ analysis: row });
}));
