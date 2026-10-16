import { sql } from "drizzle-orm";
import { check, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdAt, pk } from "./_shared.js";
import { skillSource } from "./_enums.js";
import { owner } from "./users.js";

export const skills = pgTable(
  "skills",
  {
    id: pk(),
    userId: owner(),
    name: text("name").notNull(),
    level: integer("level").notNull().default(3), // 1 (learning) to 5 (expert)
    yearsExperience: integer("years_experience"),
    source: skillSource("source").notNull().default("manual"),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("skills_user_name_lower_uq").on(t.userId, sql`lower(${t.name})`),
    check("skills_level_range", sql`${t.level} between 1 and 5`),
  ],
);
