import { createApp } from "./app.js"; import { env } from "./env.js"; import { pool } from "./db.js"; import { llmEnabled } from "./lib/llm.js"; import { logger } from "./lib/logger.js";
const server = createApp().listen(env.PORT, () => logger.info(`API on http://localhost:${env.PORT}`, { env: env.NODE_ENV, ai: llmEnabled ? "live" : "MOCK (no ANTHROPIC_API_KEY)" }));
const stop = () => server.close(async () => { await pool.end(); process.exit(0); });
process.on("SIGTERM", stop); process.on("SIGINT", stop);
