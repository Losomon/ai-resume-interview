import { pgTable, text, integer, boolean, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core"; import { sql } from "drizzle-orm"; import { pk, createdAt } from "./_shared.js"; import { jobLevel } from "./_enums.js";
/** salary_min/max are annual amounts in USD. Required skills live in job_skills. */
export const jobs = pgTable("jobs", { id: pk(), title: text("title").notNull(), company: text("company").notNull(), location: text("location").notNull().default(""), remote: boolean("remote").notNull().default(false), level: jobLevel("level"),
  salaryMin: integer("salary_min"), salaryMax: integer("salary_max"), description: text("description").notNull().default(""), source: text("source").notNull().default("manual"), externalId: text("external_id"),
  postedAt: timestamp("posted_at", { withTimezone: true }), createdAt: createdAt() },
  (t) => [index("jobs_fts_gin").using("gin", sql`to_tsvector('english', ${t.title} || ' ' || ${t.description})`), uniqueIndex("jobs_source_ext_uq").on(t.source, t.externalId), index("jobs_level_remote_idx").on(t.level, t.remote)]);
