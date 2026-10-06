import { Router } from "express"; import { z } from "zod"; import { applicationCreate, applicationPatch } from "@careerforge/database"; import { requireAuth } from "../middleware/auth.js"; import { validateBody, parse } from "../middleware/validate.js"; import * as applications from "../services/application.service.js";
export const applicationRouter = Router(); applicationRouter.use(requireAuth); const id = z.string().uuid();
applicationRouter.get("/", async (req, res) => { res.json(await applications.list(req.userId!)); });
applicationRouter.post("/", validateBody(applicationCreate), async (req, res) => { res.status(201).json(await applications.create(req.userId!, req.body)); });
applicationRouter.patch("/:id", validateBody(applicationPatch), async (req, res) => { res.json(await applications.update(req.userId!, parse(id, req.params.id), req.body)); });
applicationRouter.delete("/:id", async (req, res) => { await applications.remove(req.userId!, parse(id, req.params.id)); res.status(204).end(); });
