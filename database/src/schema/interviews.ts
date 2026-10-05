import { pgTable, text, integer, jsonb, timestamp, uuid, index } from "drizzle-orm/pg-core"; import { pk, createdAt } from "./_shared.js"; import { interviewStatus } from "./_enums.js"; import { owner } from "./users.js"; import { resumes } from "./resumes.js";
export const interviews = pgTable("interviews", { id: pk(), userId: owner(), resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "set null" }), role: text("role").notNull(), level: text("level").notNull(),
  status: interviewStatus("status").notNull().default("draft"), score: integer("score"), scores: jsonb("scores").$type<Record<string, number>>(), startedAt: createdAt(), completedAt: timestamp("completed_at", { withTimezone: true }) },
  (t) => [index("interviews_user_started_idx").on(t.userId, t.startedAt)]);
/** Questions live here too: position orders them, answer stays null until submitted. */
export const interviewAnswers = pgTable("interview_answers", { id: pk(), interviewId: uuid("interview_id").notNull().references(() => interviews.id, { onDelete: "cascade" }), position: integer("position").notNull(),
  question: text("question").notNull(), answer: text("answer"), secondsTaken: integer("seconds_taken"), feedback: jsonb("feedback"), score: integer("score") }, (t) => [index("answers_interview_pos_idx").on(t.interviewId, t.position)]);
