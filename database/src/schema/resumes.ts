import { pgTable, text, integer, jsonb, uuid, index, check } from "drizzle-orm/pg-core"; import { sql } from "drizzle-orm";
import { pk, createdAt, updatedAt } from "./_shared.js"; import { owner } from "./users.js"; import type { ResumeContent, Gap } from "../content.js";
export const resumes = pgTable("resumes", { id: pk(), userId: owner(), title: text("title").notNull(), template: text("template").notNull().default("classic"),
  content: jsonb("content").$type<ResumeContent>().notNull(), atsScore: integer("ats_score"), createdAt: createdAt(), updatedAt: updatedAt() },
  (t) => [index("resumes_user_updated_idx").on(t.userId, t.updatedAt), check("resumes_ats_range", sql`${t.atsScore} is null or ${t.atsScore} between 0 and 100`)]);
/** One row per run. model_version makes every score explainable and comparable. */
export const atsAnalyses = pgTable("ats_analyses", { id: pk(), resumeId: uuid("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }), jobDescription: text("job_description").notNull(),
  score: integer("score").notNull(), breakdown: jsonb("breakdown").$type<Record<string, number>>().notNull(), matched: jsonb("matched").$type<string[]>().notNull(),
  missingEvidence: jsonb("missing_evidence").$type<Gap[]>().notNull(), skillGaps: jsonb("skill_gaps").$type<Gap[]>().notNull(), suggestions: jsonb("suggestions").$type<string[]>().notNull(),
  modelVersion: text("model_version").notNull(), createdAt: createdAt() }, (t) => [index("ats_resume_created_idx").on(t.resumeId, t.createdAt), check("ats_score_range", sql`${t.score} between 0 and 100`)]);
