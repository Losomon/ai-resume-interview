import { Router } from "express"; import { z } from "zod"; import { interviewConfig, interviewAnswer } from "@careerforge/database"; import { requireAuth } from "../middleware/auth.js"; import { validateBody, parse } from "../middleware/validate.js"; import * as interviews from "../services/interview.service.js";
export const interviewRouter = Router(); interviewRouter.use(requireAuth);
const id = z.string().uuid(), answers = z.object({ answers: z.array(interviewAnswer).max(20) });
interviewRouter.post("/sessions", validateBody(interviewConfig.extend({ resumeId: z.string().uuid().optional() })), async (req, res) => { const { resumeId, ...config } = req.body; res.status(201).json(await interviews.create(req.userId!, config, resumeId)); });
interviewRouter.get("/sessions", async (req, res) => { res.json(await interviews.list(req.userId!)); });
interviewRouter.get("/sessions/:id", async (req, res) => { res.json(await interviews.getOwned(req.userId!, parse(id, req.params.id))); });
interviewRouter.patch("/sessions/:id", validateBody(answers), async (req, res) => { res.json(await interviews.saveAnswers(req.userId!, parse(id, req.params.id), req.body.answers)); });
interviewRouter.post("/sessions/:id/submit", validateBody(answers.partial()), async (req, res) => { res.json(await interviews.submit(req.userId!, parse(id, req.params.id), req.body.answers)); });
