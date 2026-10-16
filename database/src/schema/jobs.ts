import { sql } from "drizzle-orm";
import { boolean, check, index, integer, jsonb, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, pk, ts } from "./_shared.js";
import { jobLevel } from "./_enums.js";
import { owner, users } from "./users.js";
import { resumes } from "./resumes.js";

// Shared catalog (imported listings) plus jobs a user added by hand.
export const jobs = pgTable(
  "jobs",
  {
    id: pk(),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, { onDelete: "set null" }),
    source: text("source").notNull().default("manual"),
    externalId: text("external_id"),
    title: text("title").notNull(),
    company: text("company").notNull(),
    location: text("location"),
    remote: boolean("remote").notNull().default(false),
    level: jobLevel("level"),
    description: text("description").notNull().default(""),
    skills: text("skills").array().notNull().default(sql`'{}'::text[]`),
    url: text("url"),
    postedAt: ts("posted_at"),
    createdAt: createdAt(),
  },
  (t) => [
    unique("jobs_source_external_uq").on(t.source, t.externalId), // idempotent imports
    index("jobs_skills_gin").using("gin", t.skills),
    index("jobs_search_gin").using(
      "gin",
      sql`to_tsvector('english', ${t.title} || ' ' || ${t.company} || ' ' || ${t.description})`,
    ),
  ],
);

// Per-user score for a job. matched/required power the "based on X of Y skills" line.
export const jobMatches = pgTable(
  "job_matches",
  {
    id: pk(),
    userId: owner(),
    jobId: uuid("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }),
    resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "set null" }),
    score: integer("score").notNull(),
    matchedSkills: integer("matched_skills").notNull(),
    requiredSkills: integer("required_skills").notNull(),
    reasons: jsonb("reasons").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
  },
  (t) => [
    unique("job_matches_user_job_uq").on(t.userId, t.jobId),
    index("job_matches_user_score_idx").on(t.userId, t.score),
    check("job_matches_score_range", sql`${t.score} between 0 and 100`),
    check("job_matches_counts", sql`${t.matchedSkills} >= 0 and ${t.matchedSkills} <= ${t.requiredSkills}`),
  ],
);

export const savedJobs = pgTable(
  "saved_jobs",
  {
    id: pk(),
    userId: owner(),
    jobId: uuid("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }),
    notes: text("notes"),
    createdAt: createdAt(),
  },
  (t) => [unique("saved_jobs_user_job_uq").on(t.userId, t.jobId)],
);
