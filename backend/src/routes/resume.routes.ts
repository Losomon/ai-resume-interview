import { Router } from "express"; import { z } from "zod"; import { resumeContent } from "@careerforge/database"; import { requireAuth } from "../middleware/auth.js"; import { validateBody, parse } from "../middleware/validate.js"; import * as resumes from "../services/resume.service.js";
export const resumeRouter = Router(); resumeRouter.use(requireAuth);
const id = z.string().uuid(), title = z.string().trim().min(1).max(120);
resumeRouter.get("/", async (req, res) => { res.json(await resumes.listByUser(req.userId!)); });
resumeRouter.post("/", validateBody(z.object({ title, template: z.string().max(40).optional(), content: resumeContent.optional() })), async (req, res) => { res.status(201).json(await resumes.create(req.userId!, req.body)); });
resumeRouter.get("/:id", async (req, res) => { res.json(await resumes.getOwned(req.userId!, parse(id, req.params.id))); });
resumeRouter.patch("/:id", validateBody(z.object({ title, template: z.string().max(40), content: resumeContent }).partial()), async (req, res) => { res.json(await resumes.update(req.userId!, parse(id, req.params.id), req.body)); });
resumeRouter.delete("/:id", async (req, res) => { await resumes.remove(req.userId!, parse(id, req.params.id)); res.status(204).end(); });
resumeRouter.post("/:id/duplicate", async (req, res) => { res.status(201).json(await resumes.duplicate(req.userId!, parse(id, req.params.id))); });
