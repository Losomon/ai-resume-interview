import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

export function createDatabase(opts: { connectionString: string; max?: number }) {
  const pool = new pg.Pool({ connectionString: opts.connectionString, max: opts.max ?? 10 });
  const db = drizzle(pool, { schema });
  return { db, pool };
}
export type Database = ReturnType<typeof createDatabase>["db"];
