import { sql } from "drizzle-orm";
import { bigint, check, index, integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, pk, ts, updatedAt } from "./_shared.js";
import { aiFeature, contactStatus, notificationType, plan, subscriptionStatus } from "./_enums.js";
import { owner, users } from "./users.js";

export const readinessSnapshots = pgTable(
  "readiness_snapshots",
  {
    id: pk(),
    userId: owner(),
    overall: integer("overall").notNull(),
    resumeScore: integer("resume_score").notNull(),
    atsScore: integer("ats_score").notNull(),
    interviewScore: integer("interview_score").notNull(),
    skillsScore: integer("skills_score").notNull(),
    createdAt: createdAt(),
  },
  (t) => [
    index("readiness_user_created_idx").on(t.userId, t.createdAt),
    check(
      "readiness_score_ranges",
      sql`${t.overall} between 0 and 100 and ${t.resumeScore} between 0 and 100 and ${t.atsScore} between 0 and 100
        and ${t.interviewScore} between 0 and 100 and ${t.skillsScore} between 0 and 100`,
    ),
  ],
);

export const notifications = pgTable(
  "notifications",
  {
    id: pk(),
    userId: owner(),
    type: notificationType("type").notNull(),
    title: text("title").notNull(),
    body: text("body"),
    link: text("link"),
    readAt: ts("read_at"),
    createdAt: createdAt(),
  },
  (t) => [index("notifications_user_unread_idx").on(t.userId, t.readAt, t.createdAt)],
);

// Public form: user_id is optional and kept as null if the account is later deleted.
export const contactMessages = pgTable(
  "contact_messages",
  {
    id: pk(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    status: contactStatus("status").notNull().default("new"),
    handledAt: ts("handled_at"),
    createdAt: createdAt(),
  },
  (t) => [index("contact_status_idx").on(t.status, t.createdAt)],
);

// One row per AI call: drives usage limits and cost tracking.
export const aiUsage = pgTable(
  "ai_usage",
  {
    id: pk(),
    userId: owner(),
    feature: aiFeature("feature").notNull(),
    model: text("model").notNull(),
    inputTokens: integer("input_tokens").notNull().default(0),
    outputTokens: integer("output_tokens").notNull().default(0),
    costMicros: bigint("cost_micros", { mode: "number" }).notNull().default(0), // millionths of a dollar
    createdAt: createdAt(),
  },
  (t) => [
    index("ai_usage_user_created_idx").on(t.userId, t.createdAt),
    check("ai_usage_non_negative", sql`${t.inputTokens} >= 0 and ${t.outputTokens} >= 0 and ${t.costMicros} >= 0`),
  ],
);

export const subscriptions = pgTable("subscriptions", {
  id: pk(),
  userId: owner().unique(),
  plan: plan("plan").notNull().default("free"),
  status: subscriptionStatus("status").notNull().default("active"),
  currentPeriodEnd: ts("current_period_end"),
  providerCustomerId: text("provider_customer_id"),
  providerSubscriptionId: text("provider_subscription_id"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

// Survives account deletion (user_id set null) so there is still a security trail.
export const auditLog = pgTable(
  "audit_log",
  {
    id: pk(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    action: text("action").notNull(),
    entity: text("entity"),
    entityId: text("entity_id"),
    ip: text("ip"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: createdAt(),
  },
  (t) => [index("audit_user_created_idx").on(t.userId, t.createdAt), index("audit_action_idx").on(t.action)],
);
