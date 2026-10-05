import { pgTable, text, timestamp, uuid, uniqueIndex, index } from "drizzle-orm/pg-core"; import { pk, createdAt } from "./_shared.js";
export const users = pgTable("users", { id: pk(), name: text("name").notNull(), email: text("email").notNull(), passwordHash: text("password_hash").notNull(),
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }), createdAt: createdAt() }, (t) => [uniqueIndex("users_email_uq").on(t.email)]);
/** Every user-owned table uses this FK. Deleting a user cascades, which is what makes account deletion one statement. */
export const owner = () => uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" });
/** Opaque tokens, stored only as SHA-256 hashes. */
export const refreshTokens = pgTable("refresh_tokens", { id: pk(), userId: owner(), tokenHash: text("token_hash").notNull(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), createdAt: createdAt() },
  (t) => [uniqueIndex("refresh_hash_uq").on(t.tokenHash), index("refresh_expires_idx").on(t.expiresAt)]);
export const passwordResetTokens = pgTable("password_reset_tokens", { id: pk(), userId: owner(), tokenHash: text("token_hash").notNull(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }), createdAt: createdAt() }, (t) => [uniqueIndex("pwreset_hash_uq").on(t.tokenHash)]);
