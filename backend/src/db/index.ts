import { drizzle } from "drizzle-orm/node-postgres"; import pg from "pg"; import { config } from "../config.js"; import * as schema from "./schema.js";
export const pool = new pg.Pool({ connectionString: config.DATABASE_URL, max: 10 });
export const db = drizzle(pool, { schema });
