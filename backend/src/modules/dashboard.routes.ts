import { Router } from 'express';
import { desc, eq, sql } from 'drizzle-orm';
import { db } from '../db';
import { applications, atsAnalyses, resumes } from '../db/schema';
import { asyncHandler } from '../utils/http';
import { requireAuth, uid } from '../middleware/auth';

export const dashboardRouter = Router();
dashboardRouter.use(requireAuth);

// Everything here is computed from the user's real rows. New users get zeros, not demo data.
dashboardRouter.get('/', asyncHandler(async (req, res) => {
  const userId = uid(req);

  const [{ count: resumeCount }] = await db.select({ count: sql<number>`count(*)::int` }).from(resumes).where(eq(resumes.userId, userId));
  const statusRows = await db.select({ status: applications.status, count: sql<number>`count(*)::int` })
    .from(applications).where(eq(applications.userId, userId)).groupBy(applications.status);
  const [latestAts] = await db.select({ score: atsAnalyses.score, createdAt: atsAnalyses.createdAt })
    .from(atsAnalyses).where(eq(atsAnalyses.userId, userId)).orderBy(desc(atsAnalyses.createdAt)).limit(1);

  const recentResumes = await db.select({ id: resumes.id, title: resumes.title, at: resumes.updatedAt })
    .from(resumes).where(eq(resumes.userId, userId)).orderBy(desc(resumes.updatedAt)).limit(5);
  const recentApps = await db.select({ id: applications.id, title: applications.company, status: applications.status, at: applications.updatedAt })
    .from(applications).where(eq(applications.userId, userId)).orderBy(desc(applications.updatedAt)).limit(5);

  const activity = [
    ...recentResumes.map((r) => ({ type: 'resume' as const, id: r.id, label: r.title, at: r.at })),
    ...recentApps.map((a) => ({ type: 'application' as const, id: a.id, label: `${a.title} (${a.status})`, at: a.at })),
  ].sort((a, b) => +b.at - +a.at).slice(0, 8);

  res.json({
    stats: {
      resumes: resumeCount,
      applicationsByStatus: Object.fromEntries(statusRows.map((s) => [s.status, s.count])),
      latestAtsScore: latestAts?.score ?? null,
    },
    activity,
  });
}));
