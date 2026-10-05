import { pgTable, text, integer, boolean, jsonb, timestamp, uuid, index, uniqueIndex, primaryKey, check } from "drizzle-orm/pg-core"; import { sql } from "drizzle-orm";
import { pk, createdAt } from "./_shared.js"; import { jobLevel } from "./_enums.js"; import { owner } from "./users.js"; import { resumes } from "./resumes.js";
export const jobs = pgTable("jobs", { id: pk(), title: text("title").notNull(), company: text("company").notNull(), location: text("location").notNull().default(""), remote: boolean("remote").notNull().default(false),
  level: jobLevel("level"), salaryMin: integer("salary_min"), salaryMax: integer("salary_max"), description: text("description").notNull().default(""),
  skills: text("skills").array().notNull().default(sql`'{}'::text[]`), source: text("source").notNull().default("manual"), externalId: text("external_id"),
  postedAt: timestamp("posted_at", { withTimezone: true }), createdAt: createdAt() },
  (t) => [index("jobs_skills_gin").using("gin", t.skills), index("jobs_fts_gin").using("gin", sql`to_tsvector('english', ${t.title} || ' ' || ${t.description})`),
    uniqueIndex("jobs_source_ext_uq").on(t.source, t.externalId), index("jobs_level_remote_idx").on(t.level, t.remote)]);
/** Why a job scored what it did: reasons = { matched: string[], missing: string[] }. */
export const jobMatches = pgTable("job_matches", { id: pk(), userId: owner(), jobId: uuid("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }),
  resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "set null" }), score: integer("score").notNull(), reasons: jsonb("reasons").$type<{ matched: string[]; missing: string[] }>().notNull(), createdAt: createdAt() },
  (t) => [index("job_matches_user_score_idx").on(t.userId, t.score), check("job_matches_score_range", sql`${t.score} between 0 and 100`)]);
export const savedJobs = pgTable("saved_jobs", { userId: owner(), jobId: uuid("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }), createdAt: createdAt() }, (t) => [primaryKey({ columns: [t.userId, t.jobId] })]);
