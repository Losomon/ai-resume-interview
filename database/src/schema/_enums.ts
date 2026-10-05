import { pgEnum } from "drizzle-orm/pg-core";
// Enums are for small, stable sets. Add a value with a migration (ALTER TYPE ... ADD VALUE); never reorder or remove.
export const interviewStatus = pgEnum("interview_status", ["draft", "active", "complete"]);
export const applicationStage = pgEnum("application_stage", ["saved", "applied", "interviewing", "offer", "rejected"]);
export const coachRole = pgEnum("coach_role", ["user", "assistant"]);
export const jobLevel = pgEnum("job_level", ["junior", "mid", "senior", "lead"]);
export const skillSource = pgEnum("skill_source", ["manual", "resume"]);
