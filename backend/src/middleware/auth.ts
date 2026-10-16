import type { Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { HttpError } from '../utils/http';

export const COOKIE_NAME = 'cf_session';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

declare module 'express-serve-static-core' {
  interface Request { userId?: string }
}

export function setSession(res: Response, userId: string) {
  const token = jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.COOKIE_SECURE === 'true',
    maxAge: MAX_AGE_MS,
    path: '/',
  });
}

export function clearSession(res: Response) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
}

export const requireAuth: RequestHandler = (req: Request, _res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return next(new HttpError(401, 'Not authenticated'));
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    next(new HttpError(401, 'Session expired'));
  }
};

export const uid = (req: Request): string => {
  if (!req.userId) throw new HttpError(401, 'Not authenticated');
  return req.userId;
};
