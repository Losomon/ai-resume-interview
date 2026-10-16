import { index, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, pk, ts, updatedAt } from "./_shared.js";
import { applicationStage } from "./_enums.js";
import { owner } from "./users.js";
import { resumes } from "./resumes.js";
import { jobs } from "./jobs.js";

export const applications = pgTable(
  "applications",
  {
    id: pk(),
    userId: owner(),
    jobId: uuid("job_id").references(() => jobs.id, { onDelete: "set null" }),
    resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "set null" }), // outlives the resume
    company: text("company").notNull(),
    position: text("position").notNull(),
    url: text("url"),
    stage: applicationStage("stage").notNull().default("saved"),
    sortOrder: integer("sort_order").notNull().default(0), // order within a kanban column
    appliedAt: ts("applied_at"),
    notes: text("notes"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("applications_board_idx").on(t.userId, t.stage, t.sortOrder)],
);

// Timeline of stage changes and notes per application.
export const applicationEvents = pgTable(
  "application_events",
  {
    id: pk(),
    userId: owner(),
    applicationId: uuid("application_id").notNull().references(() => applications.id, { onDelete: "cascade" }),
    fromStage: applicationStage("from_stage"),
    toStage: applicationStage("to_stage"),
    note: text("note"),
    occurredAt: ts("occurred_at").notNull().defaultNow(),
  },
  (t) => [index("application_events_app_idx").on(t.applicationId, t.occurredAt)],
);
