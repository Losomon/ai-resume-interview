import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { db } from '../db';
import { contactMessages } from '../db/schema';
import { asyncHandler } from '../utils/http';

export const contactRouter = Router();
const limiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });

contactRouter.post('/', limiter, asyncHandler(async (req, res) => {
  const body = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(10).max(5000),
  }).parse(req.body);
  await db.insert(contactMessages).values(body);
  res.status(201).json({ ok: true });
}));
