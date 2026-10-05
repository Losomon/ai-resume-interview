import "dotenv/config"; import { createDatabase } from "../client.js";
const url = process.env.DATABASE_URL; if (!url) { console.error("DATABASE_URL is not set (see .env.example)"); process.exit(1); }
export const { db, pool } = createDatabase({ connectionString: url, max: 2 });
