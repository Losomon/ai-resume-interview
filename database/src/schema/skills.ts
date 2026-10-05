import { pgTable, text, integer, index, uniqueIndex, check } from "drizzle-orm/pg-core"; import { sql } from "drizzle-orm";
import { pk, createdAt } from "./_shared.js"; import { skillSource } from "./_enums.js"; import { owner } from "./users.js";
export const skills = pgTable("skills", { id: pk(), userId: owner(), name: text("name").notNull(), level: integer("level"), source: skillSource("source").notNull().default("manual"), createdAt: createdAt() },
  (t) => [uniqueIndex("skills_user_name_uq").on(t.userId, sql`lower(${t.name})`), index("skills_user_idx").on(t.userId), check("skills_level_range", sql`${t.level} is null or ${t.level} between 1 and 5`)]);
