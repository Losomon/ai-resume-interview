import { pgTable, text, uuid, index } from "drizzle-orm/pg-core"; import { pk, createdAt } from "./_shared.js"; import { users } from "./users.js";
/** Security events (login, password change, export, delete). user_id is SET NULL so the trail survives account deletion. Never store resume content here. */
export const auditLog = pgTable("audit_log", { id: pk(), userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }), action: text("action").notNull(), ip: text("ip"), createdAt: createdAt() },
  (t) => [index("audit_user_created_idx").on(t.userId, t.createdAt), index("audit_action_idx").on(t.action)]);
