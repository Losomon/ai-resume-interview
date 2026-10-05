import { pgTable, uuid, text, integer, timestamp, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";
import type { ResumeContent, Gap } from "../types.js";
const pk = () => uuid("id").defaultRandom().primaryKey();
const ts = (n: string) => timestamp(n, { withTimezone: true }).defaultNow().notNull();
const owner = () => uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" });

export const users = pgTable("users", { id: pk(), name: text("name").notNull(), email: text("email").notNull(), passwordHash: text("password_hash").notNull(), createdAt: ts("created_at") },
  (t) => [uniqueIndex("users_email_uq").on(t.email)]);
/** Opaque refresh tokens, stored as SHA-256 hashes. */
export const refreshTokens = pgTable("refresh_tokens", { id: pk(), userId: owner(), tokenHash: text("token_hash").notNull(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), createdAt: ts("created_at") },
  (t) => [uniqueIndex("refresh_hash_uq").on(t.tokenHash)]);
export const resumes = pgTable("resumes", { id: pk(), userId: owner(), title: text("title").notNull(), template: text("template").notNull().default("classic"),
  content: jsonb("content").$type<ResumeContent>().notNull(), atsScore: integer("ats_score"), createdAt: ts("created_at"), updatedAt: ts("updated_at") },
  (t) => [index("resumes_user_updated").on(t.userId, t.updatedAt)]);
export const atsAnalyses = pgTable("ats_analyses", { id: pk(), resumeId: uuid("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }), jobDescription: text("job_description").notNull(),
  score: integer("score").notNull(), breakdown: jsonb("breakdown").$type<Record<string, number>>().notNull(), matched: jsonb("matched").$type<string[]>().notNull(),
  missingEvidence: jsonb("missing_evidence").$type<Gap[]>().notNull(), skillGaps: jsonb("skill_gaps").$type<Gap[]>().notNull(), suggestions: jsonb("suggestions").$type<string[]>().notNull(),
  modelVersion: text("model_version").notNull(), createdAt: ts("created_at") }, (t) => [index("ats_resume_created").on(t.resumeId, t.createdAt)]);
// Next routes: interviews, applications (tables ready), then jobs, skills, coach_messages, readiness_snapshots (doc 08).
export const interviews = pgTable("interviews", { id: pk(), userId: owner(), role: text("role").notNull(), level: text("level").notNull(), status: text("status").notNull().default("draft"),
  score: integer("score"), scores: jsonb("scores").$type<Record<string, number>>(), startedAt: ts("started_at"), completedAt: timestamp("completed_at", { withTimezone: true }) });
export const interviewAnswers = pgTable("interview_answers", { id: pk(), interviewId: uuid("interview_id").notNull().references(() => interviews.id, { onDelete: "cascade" }), position: integer("position").notNull(),
  question: text("question").notNull(), answer: text("answer"), secondsTaken: integer("seconds_taken"), feedback: jsonb("feedback"), score: integer("score") });
export const applications = pgTable("applications", { id: pk(), userId: owner(), company: text("company").notNull(), title: text("title").notNull(), stage: text("stage").notNull().default("saved"),
  notes: text("notes").notNull().default(""), appliedAt: timestamp("applied_at", { withTimezone: true }), createdAt: ts("created_at"), updatedAt: ts("updated_at") },
  (t) => [index("applications_user_stage").on(t.userId, t.stage)]);
