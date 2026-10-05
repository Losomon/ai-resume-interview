import { migrate } from "drizzle-orm/node-postgres/migrator"; import { fileURLToPath } from "node:url"; import { db, pool } from "./env.js";
/** Applies pending migrations in order. Also the production release step (doc 12). */
await migrate(db, { migrationsFolder: fileURLToPath(new URL("../../migrations", import.meta.url)) });
console.log("Migrations applied"); await pool.end();
