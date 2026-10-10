import { Router } from "express"; import { z } from "zod";
import { db, pool } from "../db.js"; import { atsAnalyses } from "@careerforge/database"; import { requireAuth } from "../middleware/auth.js"; import { AppError } from "../middleware/error.js"; import { analyze } from "../services/ats.js";
export const atsRouter = Router(); atsRouter.use(requireAuth);
const owned = async (id: string, uid: string) => {
  const { rows } = await pool.query("SELECT * FROM resumes WHERE id = $1 LIMIT 1", [id]);
  const row = rows[0] as any;
  if (!row || row.user_id !== uid) throw new AppError(404, "NOT_FOUND", "Resume not found");
  return { ...row, userId: row.user_id, createdAt: row.created_at, updatedAt: row.updated_at };
};
/** Scoring happens here, never in the browser, so the stored score can be trusted. */
atsRouter.post("/analyze", async (req, res) => {
  const b = z.object({ resumeId: z.string().uuid(), jobDescription: z.string().trim().min(40, "Paste the full job description").max(15000) }).parse(req.body);
  const resume = await owned(b.resumeId, req.userId!);
  const result = analyze(resume.content, b.jobDescription);
  if (!result) throw new AppError(422, "NO_KEYWORDS_FOUND", "We couldn't recognise skills in this job description. Paste the requirements section.");
  const [saved] = await db.insert(atsAnalyses).values({ resumeId: resume.id, jobDescription: b.jobDescription, ...result }).returning();
  await pool.query("UPDATE resumes SET ats_score = $1 WHERE id = $2", [result.score, resume.id]);
  res.status(201).json(saved);
});
atsRouter.get("/history/:resumeId", async (req, res) => {
  const resume = await owned(z.string().uuid().parse(req.params.resumeId), req.userId!);
  const { rows } = await pool.query("SELECT * FROM ats_analyses WHERE resume_id = $1 ORDER BY created_at DESC LIMIT 20", [resume.id]);
  res.json(rows);
});
