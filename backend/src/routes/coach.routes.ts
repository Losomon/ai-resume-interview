import { Router } from "express"; import { z } from "zod"; import { requireAuth } from "../middleware/auth.js"; import { aiLimiter } from "../middleware/rate-limit.js"; import { validateBody, parse } from "../middleware/validate.js"; import * as coach from "../services/coach.service.js";
export const coachRouter = Router(); coachRouter.use(requireAuth);
coachRouter.get("/conversation", async (req, res) => { res.json(await coach.getConversation(req.userId!)); });
coachRouter.post("/message", aiLimiter, validateBody(z.object({ text: z.string().trim().min(1).max(1500) })), async (req, res) => { res.json(await coach.sendMessage(req.userId!, req.body.text)); });
coachRouter.post("/plan", async (req, res) => { res.status(201).json(await coach.generatePlan(req.userId!)); });
coachRouter.patch("/plan/:stepId", validateBody(z.object({ done: z.boolean() })), async (req, res) => { res.json(await coach.setStepDone(req.userId!, parse(z.string().uuid(), req.params.stepId), req.body.done)); });
