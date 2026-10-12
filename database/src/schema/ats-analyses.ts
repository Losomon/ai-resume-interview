import { pgTable, text, integer, jsonb, uuid, index, check } from "drizzle-orm/pg-core"; import { sql } from "drizzle-orm"; import { pk, createdAt } from "./_shared.js"; import { resumes } from "./resumes.js"; import type { Gap } from "../validation/index.js";
/** One row per run. model_version makes each score explainable and comparable. */
export const atsAnalyses = pgTable("ats_analyses", { id: pk(), resumeId: uuid("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }), jobDescription: text("job_description").notNull(), score: integer("score").notNull(),
  breakdown: jsonb("breakdown").$type<Record<string, number>>().notNull(), matched: jsonb("matched").$type<string[]>().notNull(), missingEvidence: jsonb("missing_evidence").$type<Gap[]>().notNull(),
  skillGaps: jsonb("skill_gaps").$type<Gap[]>().notNull(), suggestions: jsonb("suggestions").$type<string[]>().notNull(), modelVersion: text("model_version").notNull(), createdAt: createdAt() },
  (t) => [index("ats_resume_created_idx").on(t.resumeId, t.createdAt), check("ats_score_range", sql`${t.score} between 0 and 100`)]);
