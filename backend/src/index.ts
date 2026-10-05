import { app } from "./app.js"; import { config } from "./config.js"; import { pool } from "./db.js";
const server = app.listen(config.PORT, () => console.log(`API on http://localhost:${config.PORT} (${config.NODE_ENV})${config.ANTHROPIC_API_KEY ? "" : ", AI in MOCK mode"}`));
const stop = () => server.close(async () => { await pool.end(); process.exit(0); });
process.on("SIGTERM", stop); process.on("SIGINT", stop);
