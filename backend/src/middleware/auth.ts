import type { Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env.js';
import { AppError } from '../lib/errors.js';

export const COOKIE_NAME = 'cf_at';
const MAX_AGE_MS = env.ACCESS_TTL_MINUTES * 60_000;

declare module 'express-serve-static-core' {
  interface Request { userId?: string }
}

export function setSession(res: Response, userId: string) {
  const token = jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.ACCESS_TTL_MINUTES * 60 });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.COOKIE_SECURE === 'true',
const MAX_AGE_MS = env.ACCESS_TTL_MINUTES * 60_000;
    path: '/',
  });
}

export function clearSession(res: Response) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
}

export const requireAuth: RequestHandler = (req: Request, _res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return next(new AppError(401, 'Not authenticated'));
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    next(new AppError(401, 'Session expired'));
  }
};

export const uid = (req: Request): string => {
  if (!req.userId) throw new AppError(401, 'Not authenticated');
  return req.userId;
};



