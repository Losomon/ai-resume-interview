import { createDatabase } from "@careerforge/database"; import { config } from "./config.js";
export const { db, pool } = createDatabase({ connectionString: config.DATABASE_URL });
