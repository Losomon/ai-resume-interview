import { sql } from "drizzle-orm";
import { check, index, integer, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, pk, ts } from "./_shared.js";
import { interviewDifficulty, interviewStatus, interviewType } from "./_enums.js";
import { owner } from "./users.js";
import { jobs } from "./jobs.js";
import { resumes } from "./resumes.js";

export const interviews = pgTable(
  "interviews",
  {
    id: pk(),
    userId: owner(),
    jobId: uuid("job_id").references(() => jobs.id, { onDelete: "set null" }),
    resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "set null" }),
    type: interviewType("type").notNull(),
    difficulty: interviewDifficulty("difficulty").notNull().default("medium"),
    status: interviewStatus("status").notNull().default("in_progress"),
    overallScore: integer("overall_score"),
    durationSeconds: integer("duration_seconds"),
    summary: text("summary"),
    startedAt: ts("started_at").notNull().defaultNow(),
    completedAt: ts("completed_at"),
    createdAt: createdAt(),
  },
  (t) => [
    index("interviews_user_started_idx").on(t.userId, t.startedAt),
    check("interviews_score_range", sql`${t.overallScore} is null or ${t.overallScore} between 0 and 100`),
  ],
);

export const interviewQuestions = pgTable(
  "interview_questions",
  {
    id: pk(),
    userId: owner(),
    interviewId: uuid("interview_id").notNull().references(() => interviews.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
    question: text("question").notNull(),
    category: text("category"),
  },
  (t) => [unique("interview_questions_order_uq").on(t.interviewId, t.orderIndex)],
);

// One answer per question, with the five rubric scores stored next to the feedback.
export const interviewAnswers = pgTable(
  "interview_answers",
  {
    id: pk(),
    userId: owner(),
    questionId: uuid("question_id").notNull().unique().references(() => interviewQuestions.id, { onDelete: "cascade" }),
    answer: text("answer").notNull(),
    overallScore: integer("overall_score"),
    communication: integer("communication"),
    relevance: integer("relevance"),
    technicalAccuracy: integer("technical_accuracy"),
    problemSolving: integer("problem_solving"),
    clarity: integer("clarity"),
    feedback: text("feedback"),
    answeredAt: ts("answered_at").notNull().defaultNow(),
  },
  (t) => [
    check(
      "interview_answers_score_ranges",
      sql`(${t.overallScore} is null or ${t.overallScore} between 0 and 100)
        and (${t.communication} is null or ${t.communication} between 0 and 100)
        and (${t.relevance} is null or ${t.relevance} between 0 and 100)
        and (${t.technicalAccuracy} is null or ${t.technicalAccuracy} between 0 and 100)
        and (${t.problemSolving} is null or ${t.problemSolving} between 0 and 100)
        and (${t.clarity} is null or ${t.clarity} between 0 and 100)`,
    ),
  ],
);
