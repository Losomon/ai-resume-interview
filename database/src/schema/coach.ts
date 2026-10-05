import { pgTable, text, integer, boolean, index } from "drizzle-orm/pg-core"; import { pk, createdAt } from "./_shared.js"; import { coachRole } from "./_enums.js"; import { owner } from "./users.js";
export const coachMessages = pgTable("coach_messages", { id: pk(), userId: owner(), role: coachRole("role").notNull(), content: text("content").notNull(), createdAt: createdAt() }, (t) => [index("coach_user_created_idx").on(t.userId, t.createdAt)]);
export const learningPlanSteps = pgTable("learning_plan_steps", { id: pk(), userId: owner(), skill: text("skill").notNull(), title: text("title").notNull(), done: boolean("done").notNull().default(false), position: integer("position").notNull().default(0), createdAt: createdAt() },
  (t) => [index("plan_user_pos_idx").on(t.userId, t.position)]);
