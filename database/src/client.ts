import { drizzle } from "drizzle-orm/node-postgres"; import pg from "pg"; import * as schema from "./schema/index.js";
export interface DatabaseOptions { connectionString: string; max?: number }
/** The package never reads process.env: the consumer passes the connection string. */
export function createDatabase({ connectionString, max = 10 }: DatabaseOptions) {
  const pool = new pg.Pool({ connectionString, max });
  return { db: drizzle(pool, { schema }), pool };
}
export type Database = ReturnType<typeof createDatabase>["db"];
