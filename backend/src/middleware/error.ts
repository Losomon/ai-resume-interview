import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../utils/http';
import { env } from '../config/env';

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: { message: 'Not found' } });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: { message: 'Validation failed', details: err.flatten().fieldErrors } });
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: { message: err.message, details: err.details } });
  }
  console.error(err);
  res.status(500).json({ error: { message: env.NODE_ENV === 'production' ? 'Server error' : String(err?.message ?? err) } });
};
