import { Router } from "express"; import { z } from "zod";
import { db, pool } from "../db.js"; import { resumes } from "@careerforge/database"; import { requireAuth } from "../middleware/auth.js"; import { AppError } from "../middleware/error.js"; import { resumeContent } from "../types.js";

export const resumesRouter = Router();
resumesRouter.use(requireAuth);

const idp = z.object({ id: z.string().uuid() });
const mapResume = (row: any) => ({ ...row, userId: row.user_id, createdAt: row.created_at, updatedAt: row.updated_at });
const one = <T>(rows: T[]) => { if (!rows[0]) throw new AppError(404, "NOT_FOUND", "Resume not found"); return rows[0]; };
const mine = async (id: string, uid: string) => {
  const { rows } = await pool.query("SELECT * FROM resumes WHERE id = $1 AND user_id = $2 LIMIT 1", [id, uid]);
  return one(rows.map(mapResume));
};

resumesRouter.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT id, title, template, ats_score AS \"atsScore\", updated_at AS \"updatedAt\" FROM resumes WHERE user_id = $1 ORDER BY updated_at DESC",
    [req.userId!],
  );
  res.json(rows);
});

resumesRouter.post("/", async (req, res) => {
  const b = z.object({ title: z.string().trim().min(1).max(120), template: z.string().max(40).optional(), content: resumeContent.optional() }).parse(req.body);
  const [created] = await db.insert(resumes).values({ userId: req.userId!, title: b.title, template: b.template, content: b.content ?? resumeContent.parse({}) }).returning();
  res.status(201).json(created);
});

resumesRouter.get("/:id", async (req, res) => { res.json(await mine(idp.parse(req.params).id, req.userId!)); });

resumesRouter.patch("/:id", async (req, res) => {
  const b = z.object({ title: z.string().trim().min(1).max(120), template: z.string().max(40), content: resumeContent }).partial().parse(req.body);
  await mine(idp.parse(req.params).id, req.userId!);

  const { rows } = await pool.query(
    "UPDATE resumes SET title = COALESCE($1, title), template = COALESCE($2, template), content = COALESCE($3::jsonb, content), updated_at = NOW() WHERE id = $4 AND user_id = $5 RETURNING *",
    [b.title ?? null, b.template ?? null, b.content ? JSON.stringify(b.content) : null, idp.parse(req.params).id, req.userId!],
  );
  res.json(mapResume(one(rows)));
});

resumesRouter.delete("/:id", async (req, res) => {
  const id = idp.parse(req.params).id;
  const { rows } = await pool.query("DELETE FROM resumes WHERE id = $1 AND user_id = $2 RETURNING id", [id, req.userId!]);
  one(rows);
  res.status(204).end();
});

resumesRouter.post("/:id/duplicate", async (req, res) => {
  const id = idp.parse(req.params).id;
  const src = await mine(id, req.userId!);
  const [created] = await db.insert(resumes).values({ userId: req.userId!, title: `${src.title} (copy)`.slice(0, 120), template: src.template, content: src.content, atsScore: null }).returning();
  res.status(201).json(created);
});
