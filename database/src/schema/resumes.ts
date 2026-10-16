import { pgTable, text, integer, jsonb, index, check } from "drizzle-orm/pg-core"; import { sql } from "drizzle-orm";
import { pk, createdAt, updatedAt } from "./_shared.js"; import { owner } from "./users.js"; import type { ResumeContent } from "../validation/index.js";
export const resumes = pgTable("resumes", { id: pk(), userId: owner(), title: text("title").notNull(), template: text("template").notNull().default("classic"), content: jsonb("content").$type<ResumeContent>().notNull(),
  atsScore: integer("ats_score"), createdAt: createdAt(), updatedAt: updatedAt() }, (t) => [index("resumes_user_updated_idx").on(t.userId, t.updatedAt), check("resumes_ats_range", sql`${t.atsScore} is null or ${t.atsScore} between 0 and 100`)]);
