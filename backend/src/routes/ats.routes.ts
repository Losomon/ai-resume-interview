import { Router } from "express"; import { z } from "zod"; import { requireAuth } from "../middleware/auth.js"; import { validateBody, parse } from "../middleware/validate.js"; import * as ats from "../services/ats.service.js";
export const atsRouter = Router(); atsRouter.use(requireAuth);
atsRouter.post("/analyze", validateBody(z.object({ resumeId: z.string().uuid(), jobDescription: z.string().trim().min(40, "Paste the full job description").max(15000) })), async (req, res) => { res.status(201).json(await ats.runAnalysis(req.userId!, req.body.resumeId, req.body.jobDescription)); });
atsRouter.get("/history/:resumeId", async (req, res) => { res.json(await ats.history(req.userId!, parse(z.string().uuid(), req.params.resumeId))); });
