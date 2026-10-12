import type { RequestHandler } from "express"; import { verifyAccessToken } from "../lib/jwt.js"; import { UnauthorizedError } from "../lib/errors.js";
/** Reads the httpOnly access cookie, sets req.userId. Every route except /auth/* uses this. */
export const requireAuth: RequestHandler = (req, _res, next) => { const t = req.cookies?.cf_at; if (!t) throw new UnauthorizedError(); req.userId = verifyAccessToken(t); next(); };
