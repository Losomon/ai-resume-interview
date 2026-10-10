import type { ErrorRequestHandler, RequestHandler } from "express"; import { z } from "zod"; import { AppError } from "../lib/errors.js"; import { logger } from "../lib/logger.js";
export { AppError };
export const notFound: RequestHandler = (_req, res) => { res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } }); };
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof z.ZodError) {
    const fields = Object.fromEntries(Object.entries(err.flatten().fieldErrors as Record<string, string[] | undefined>).map(([k, v]) => [k, v?.[0] ?? "Invalid"]));
    res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Please check the highlighted fields", fields } }); return;
  }
  if (err instanceof AppError) { res.status(err.status).json({ error: { code: err.code, message: err.message } }); return; }
  const s = (err as { status?: number }).status;
  if (s && s >= 400 && s < 500) { res.status(s).json({ error: { code: "BAD_REQUEST", message: "Malformed request" } }); return; }
  logger.error("unhandled", { err: String(err), stack: (err as Error).stack }); res.status(500).json({ error: { code: "INTERNAL", message: "Something went wrong" } }); // never leak a stack trace
};
