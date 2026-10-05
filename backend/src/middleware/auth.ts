import type { RequestHandler } from "express"; import jwt from "jsonwebtoken"; import { config } from "../config.js"; import { AppError } from "./error.js";
declare global { namespace Express { interface Request { userId?: string } } }
export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.cf_at; if (!token) throw new AppError(401, "UNAUTHENTICATED", "Please log in");
  try { req.userId = jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] }).sub as string; } catch { throw new AppError(401, "UNAUTHENTICATED", "Session expired"); }
  next();
};
