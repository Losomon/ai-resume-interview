import { sql } from "drizzle-orm";
import { boolean, index, jsonb, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { createdAt, pk, ts, updatedAt } from "./_shared.js";
import { oauthProvider, userStatus } from "./_enums.js";

export const users = pgTable(
  "users",
  {
    id: pk(),
    email: text("email").notNull(),
    // null for accounts that only sign in with OAuth
    passwordHash: text("password_hash"),
    name: text("name").notNull(),
    status: userStatus("status").notNull().default("active"),
    emailVerifiedAt: ts("email_verified_at"),
    lastLoginAt: ts("last_login_at"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [uniqueIndex("users_email_lower_uq").on(sql`lower(${t.email})`)],
);

/** FK helper: every user-owned row is deleted with the account. */
export const owner = () =>
  uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" });

export const userProfiles = pgTable("user_profiles", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  fullName: text("full_name"),
  headline: text("headline"),
  location: text("location"),
  phone: text("phone"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  portfolioUrl: text("portfolio_url"),
  targetRole: text("target_role"),
  careerGoals: text("career_goals"),
  education: jsonb("education").$type<Record<string, unknown>[]>().notNull().default([]),
  experience: jsonb("experience").$type<Record<string, unknown>[]>().notNull().default([]),
  updatedAt: updatedAt(),
});

export const userSettings = pgTable("user_settings", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  theme: text("theme").notNull().default("system"),
  emailNotifications: boolean("email_notifications").notNull().default(true),
  weeklyDigest: boolean("weekly_digest").notNull().default(true),
  preferences: jsonb("preferences").$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: updatedAt(),
});

export const oauthAccounts = pgTable(
  "oauth_accounts",
  {
    id: pk(),
    userId: owner(),
    provider: oauthProvider("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    email: text("email"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("oauth_provider_account_uq").on(t.provider, t.providerAccountId)],
);

// Secrets are stored only as SHA-256 hashes, never raw.
export const refreshTokens = pgTable(
  "refresh_tokens",
  {
    id: pk(),
    userId: owner(),
    tokenHash: text("token_hash").notNull().unique(),
    familyId: uuid("family_id").notNull().defaultRandom(), // rotation chain: reuse revokes the family
    userAgent: text("user_agent"),
    ip: text("ip"),
    expiresAt: ts("expires_at").notNull(),
    revokedAt: ts("revoked_at"),
    createdAt: createdAt(),
  },
  (t) => [index("refresh_tokens_expires_idx").on(t.expiresAt), index("refresh_tokens_user_idx").on(t.userId)],
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: pk(),
    userId: owner(),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: ts("expires_at").notNull(),
    usedAt: ts("used_at"),
    createdAt: createdAt(),
  },
  (t) => [index("password_reset_expires_idx").on(t.expiresAt)],
);

export const emailVerificationTokens = pgTable(
  "email_verification_tokens",
  {
    id: pk(),
    userId: owner(),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: ts("expires_at").notNull(),
    usedAt: ts("used_at"),
    createdAt: createdAt(),
  },
  (t) => [index("email_verification_expires_idx").on(t.expiresAt)],
);
