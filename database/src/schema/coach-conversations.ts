import { pgTable, jsonb, uniqueIndex } from "drizzle-orm/pg-core"; import { pk, updatedAt } from "./_shared.js"; import { owner } from "./users.js"; import type { CoachMessage, LearningPlan } from "../validation/index.js";
/** One conversation per user: chat messages (capped by the API) plus the current learning plan. */
export const coachConversations = pgTable("coach_conversations", { id: pk(), userId: owner(), messages: jsonb("messages").$type<CoachMessage[]>().notNull().default([]), plan: jsonb("plan").$type<LearningPlan>(), updatedAt: updatedAt() },
  (t) => [uniqueIndex("coach_user_uq").on(t.userId)]);
