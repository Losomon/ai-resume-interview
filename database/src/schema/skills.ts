import { pgTable, text, uniqueIndex } from "drizzle-orm/pg-core"; import { sql } from "drizzle-orm"; import { pk } from "./_shared.js";
/** The catalog of recognised skills (not per-user). Case-insensitive unique. */
export const skills = pgTable("skills", { id: pk(), name: text("name").notNull() }, (t) => [uniqueIndex("skills_name_uq").on(sql`lower(${t.name})`)]);
