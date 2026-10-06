import express from "express"; import cors from "cors"; import helmet from "helmet"; import cookieParser from "cookie-parser";
import { env } from "./env.js"; import { pool } from "./db.js"; import { errorHandler, notFound } from "./middleware/error.js"; import { requestLogger } from "./lib/logger.js"; import { apiRouter } from "./routes/index.js";
/** A factory so tests can build the app without opening a port. */
export function createApp() {
  const app = express(); app.set("trust proxy", 1); // behind a hosting proxy: correct client IPs for rate limits
  app.use(helmet()); app.use(cors({ origin: env.CORS_ORIGIN, credentials: true })); app.use(express.json({ limit: "200kb" })); app.use(cookieParser()); app.use(requestLogger);
  app.get("/health/live", (_q, res) => { res.json({ ok: true }); });
  app.get("/health/ready", async (_q, res) => { try { await pool.query("select 1"); res.json({ ok: true }); } catch { res.status(503).json({ ok: false }); } });
  app.use("/api/v1", apiRouter); app.use(notFound); app.use(errorHandler); return app;
}
