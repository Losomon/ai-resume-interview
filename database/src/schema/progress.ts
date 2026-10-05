import { pgTable, integer, index, check } from "drizzle-orm/pg-core"; import { sql } from "drizzle-orm"; import { pk, createdAt } from "./_shared.js"; import { owner } from "./users.js";
/** Written after each scored event; feeds the dashboard "+6 this month" and the progress chart. */
export const readinessSnapshots = pgTable("readiness_snapshots", { id: pk(), userId: owner(), score: integer("score").notNull(), resume: integer("resume"), ats: integer("ats"), interview: integer("interview"), skills: integer("skills"), createdAt: createdAt() },
  (t) => [index("snapshots_user_created_idx").on(t.userId, t.createdAt), check("snapshots_score_range", sql`${t.score} between 0 and 100`)]);
