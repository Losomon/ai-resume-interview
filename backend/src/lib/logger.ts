import type { RequestHandler } from "express"; import { env } from "../env.js";
type Level = "info" | "warn" | "error";
const log = (level: Level, msg: string, meta: Record<string, unknown> = {}) => {
  if (env.NODE_ENV === "test") return;
  if (env.NODE_ENV === "production") console[level](JSON.stringify({ level, msg, time: new Date().toISOString(), ...meta })); // one JSON line per event
  else console[level](`${level.toUpperCase().padEnd(5)} ${msg}`, Object.keys(meta).length ? meta : "");
};
export const logger = { info: (m: string, x?: Record<string, unknown>) => log("info", m, x), warn: (m: string, x?: Record<string, unknown>) => log("warn", m, x), error: (m: string, x?: Record<string, unknown>) => log("error", m, x) };
/** Never logs bodies, cookies or headers (they hold resumes and tokens). */
export const requestLogger: RequestHandler = (req, res, next) => { const t = Date.now(); res.on("finish", () => { if (req.path.startsWith("/health")) return; logger.info("request", { method: req.method, path: req.path, status: res.statusCode, ms: Date.now() - t, userId: req.userId }); }); next(); };
