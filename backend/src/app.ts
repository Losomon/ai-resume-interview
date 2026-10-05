import express from "express"; import cors from "cors"; import helmet from "helmet"; import cookieParser from "cookie-parser";
import { config } from "./config.js"; import { pool } from "./db.js"; import { errorHandler, notFound } from "./middleware/error.js";
import { authRouter } from "./routes/auth.js"; import { resumesRouter } from "./routes/resumes.js"; import { aiRouter } from "./routes/ai.js"; import { atsRouter } from "./routes/ats.js";
export const app = express();
app.set("trust proxy", 1); // behind a hosting proxy; needed for correct client IPs in rate limits
app.use(helmet()); app.use(cors({ origin: config.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json({ limit: "200kb" })); app.use(cookieParser());
app.get("/health/live", (_q, res) => { res.json({ ok: true }); });
app.get("/health/ready", async (_q, res) => { try { await pool.query("select 1"); res.json({ ok: true }); } catch { res.status(503).json({ ok: false }); } });
const v1 = express.Router(); v1.use("/auth", authRouter); v1.use("/resumes", resumesRouter); v1.use("/ai", aiRouter); v1.use("/ats", atsRouter);
app.use("/api/v1", v1); app.use(notFound); app.use(errorHandler);
