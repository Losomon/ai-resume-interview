import { boolean, index, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, pk, ts, updatedAt } from "./_shared.js";
import { coachRole } from "./_enums.js";
import { owner } from "./users.js";

export const coachConversations = pgTable(
  "coach_conversations",
  {
    id: pk(),
    userId: owner(),
    title: text("title").notNull().default("New conversation"),
    archivedAt: ts("archived_at"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [index("coach_conversations_user_idx").on(t.userId, t.updatedAt)],
);

export const coachMessages = pgTable(
  "coach_messages",
  {
    id: pk(),
    userId: owner(),
    conversationId: uuid("conversation_id").notNull().references(() => coachConversations.id, { onDelete: "cascade" }),
    role: coachRole("role").notNull(),
    content: text("content").notNull(),
    tokens: integer("tokens"),
    createdAt: createdAt(),
  },
  (t) => [index("coach_messages_conversation_idx").on(t.conversationId, t.createdAt)],
);

// Career plan steps the coach proposes and the user ticks off.
export const learningPlanSteps = pgTable(
  "learning_plan_steps",
  {
    id: pk(),
    userId: owner(),
    conversationId: uuid("conversation_id").references(() => coachConversations.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    done: boolean("done").notNull().default(false),
    dueAt: ts("due_at"),
    createdAt: createdAt(),
  },
  (t) => [index("learning_plan_user_idx").on(t.userId, t.sortOrder)],
);
