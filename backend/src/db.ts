import { createDatabase } from "@careerforge/database"; import { env } from "./env.js";
export const { db, pool } = createDatabase({ connectionString: env.DATABASE_URL });
