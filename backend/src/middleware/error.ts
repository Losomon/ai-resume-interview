import type { ErrorRequestHandler, RequestHandler } from "express"; import { z } from "zod"; import { AppError } from "../lib/errors.js"; import { logger } from "../lib/logger.js";
export { AppError };
export const notFound: RequestHandler = (_req, res) => { res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } }); };
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof z.ZodError) {
    const fields = Object.fromEntries(Object.entries(err.flatten().fieldErrors as Record<string, string[] | undefined>).map(([k, v]) => [k, v?.[0] ?? "Invalid"]));
    res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Please check the highlighted fields", fields } }); return;
  }
  console.error(err);
  res.status(500).json({ error: { message: env.NODE_ENV === 'production' ? 'Server error' : String(err?.message ?? err) } });
};
