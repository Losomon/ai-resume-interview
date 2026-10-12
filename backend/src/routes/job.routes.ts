import { Router } from "express"; import { z } from "zod"; import { requireAuth } from "../middleware/auth.js"; import { parse } from "../middleware/validate.js"; import * as jobs from "../services/job.service.js";
export const jobRouter = Router(); jobRouter.use(requireAuth);
const filters = z.object({ q: z.string().trim().max(100).optional(), location: z.string().trim().max(100).optional(), level: z.enum(["junior", "mid", "senior", "lead"]).optional(),
  remote: z.enum(["true", "false"]).transform((v) => v === "true").optional(), minSalary: z.coerce.number().int().min(0).optional(), limit: z.coerce.number().int().min(1).max(100).default(50) });
jobRouter.get("/", async (req, res) => { res.json({ jobs: await jobs.list(req.userId!, parse(filters, req.query)) }); });
jobRouter.get("/:id", async (req, res) => { res.json(await jobs.get(req.userId!, parse(z.string().uuid(), req.params.id))); });
