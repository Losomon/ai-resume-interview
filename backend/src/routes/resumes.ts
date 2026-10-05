import { Router } from "express"; import { z } from "zod"; import { and, desc, eq } from "drizzle-orm";
import { db } from "../db/index.js"; import { resumes } from "../db/schema.js"; import { requireAuth } from "../middleware/auth.js"; import { AppError } from "../middleware/error.js"; import { resumeContent } from "../types.js";
export const resumesRouter = Router(); resumesRouter.use(requireAuth);
const idp = z.object({ id: z.string().uuid() });
const mine = (id: string, uid: string) => and(eq(resumes.id, id), eq(resumes.userId, uid)); // every query is scoped to the owner
const one = <T>(rows: T[]) => { if (!rows[0]) throw new AppError(404, "NOT_FOUND", "Resume not found"); return rows[0]; };
const summary = { id: resumes.id, title: resumes.title, template: resumes.template, atsScore: resumes.atsScore, updatedAt: resumes.updatedAt };

resumesRouter.get("/", async (req, res) => { res.json(await db.select(summary).from(resumes).where(eq(resumes.userId, req.userId!)).orderBy(desc(resumes.updatedAt))); });
resumesRouter.post("/", async (req, res) => {
  const b = z.object({ title: z.string().trim().min(1).max(120), template: z.string().max(40).optional(), content: resumeContent.optional() }).parse(req.body);
  res.status(201).json(one(await db.insert(resumes).values({ userId: req.userId!, title: b.title, template: b.template, content: b.content ?? resumeContent.parse({}) }).returning()));
});
resumesRouter.get("/:id", async (req, res) => { res.json(one(await db.select().from(resumes).where(mine(idp.parse(req.params).id, req.userId!)))); });
resumesRouter.patch("/:id", async (req, res) => {
  const b = z.object({ title: z.string().trim().min(1).max(120), template: z.string().max(40), content: resumeContent }).partial().parse(req.body);
  res.json(one(await db.update(resumes).set({ ...b, updatedAt: new Date() }).where(mine(idp.parse(req.params).id, req.userId!)).returning()));
});
resumesRouter.delete("/:id", async (req, res) => { one(await db.delete(resumes).where(mine(idp.parse(req.params).id, req.userId!)).returning({ id: resumes.id })); res.status(204).end(); });
resumesRouter.post("/:id/duplicate", async (req, res) => {
  const src = one(await db.select().from(resumes).where(mine(idp.parse(req.params).id, req.userId!)));
  res.status(201).json(one(await db.insert(resumes).values({ userId: req.userId!, title: `${src.title} (copy)`.slice(0, 120), template: src.template, content: src.content, atsScore: null }).returning()));
});
