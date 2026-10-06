import { pgEnum } from "drizzle-orm/pg-core"; import { APPLICATION_STAGES } from "../validation/application.js";
// Add values with a migration (ALTER TYPE ... ADD VALUE); never reorder or remove.
export const interviewStatus = pgEnum("interview_status", ["active", "complete"]);
export const applicationStage = pgEnum("application_stage", APPLICATION_STAGES);
export const jobLevel = pgEnum("job_level", ["junior", "mid", "senior", "lead"]);
