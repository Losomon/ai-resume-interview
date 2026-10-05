import { Router } from "express"; import { z } from "zod"; import { and, desc, eq } from "drizzle-orm";
import { db } from "../db/index.js"; import { resumes, atsAnalyses } from "../db/schema.js"; import { requireAuth } from "../middleware/auth.js"; import { AppError } from "../middleware/error.js"; import { analyze } from "../services/ats.js";
export const atsRouter = Router(); atsRouter.use(requireAuth);
const owned = async (id: string, uid: string) => { const [r] = await db.select().from(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, uid))); if (!r) throw new AppError(404, "NOT_FOUND", "Resume not found"); return r; };
/** Scoring happens here, never in the browser, so the stored score can be trusted. */
atsRouter.post("/analyze", async (req, res) => {
  const b = z.object({ resumeId: z.string().uuid(), jobDescription: z.string().trim().min(40, "Paste the full job description").max(15000) }).parse(req.body);
  const resume = await owned(b.resumeId, req.userId!);
  const result = analyze(resume.content, b.jobDescription);
  if (!result) throw new AppError(422, "NO_KEYWORDS_FOUND", "We couldn't recognise skills in this job description. Paste the requirements section.");
  const [saved] = await db.insert(atsAnalyses).values({ resumeId: resume.id, jobDescription: b.jobDescription, ...result }).returning();
  await db.update(resumes).set({ atsScore: result.score }).where(eq(resumes.id, resume.id));
  res.status(201).json(saved);
});
atsRouter.get("/history/:resumeId", async (req, res) => {
  const resume = await owned(z.string().uuid().parse(req.params.resumeId), req.userId!);
  res.json(await db.select().from(atsAnalyses).where(eq(atsAnalyses.resumeId, resume.id)).orderBy(desc(atsAnalyses.createdAt)).limit(20));
});
