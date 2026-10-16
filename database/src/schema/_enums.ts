import { pgEnum } from "drizzle-orm/pg-core";

// Add values with a migration. Never reorder or remove.
export const userStatus = pgEnum("user_status", ["active", "suspended"]);
export const oauthProvider = pgEnum("oauth_provider", ["google", "github", "microsoft"]);
export const fileKind = pgEnum("file_kind", ["upload", "export"]);
export const fileFormat = pgEnum("file_format", ["pdf", "docx"]);
export const skillSource = pgEnum("skill_source", ["manual", "resume", "inferred"]);
export const jobLevel = pgEnum("job_level", ["intern", "junior", "mid", "senior", "lead"]);
export const applicationStage = pgEnum("application_stage", [
  "saved", "applied", "screening", "interview", "offer", "rejected", "withdrawn",
]);
export const interviewType = pgEnum("interview_type", ["behavioral", "technical", "mixed"]);
export const interviewDifficulty = pgEnum("interview_difficulty", ["easy", "medium", "hard"]);
export const interviewStatus = pgEnum("interview_status", ["in_progress", "completed", "abandoned"]);
export const coachRole = pgEnum("coach_role", ["user", "assistant", "system"]);
export const notificationType = pgEnum("notification_type", [
  "reminder", "ats_ready", "interview_feedback", "application_update", "system",
]);
export const contactStatus = pgEnum("contact_status", ["new", "in_progress", "resolved", "spam"]);
export const aiFeature = pgEnum("ai_feature", ["resume_improve", "ats", "interview", "coach"]);
export const plan = pgEnum("plan", ["free", "pro", "team"]);
export const subscriptionStatus = pgEnum("subscription_status", ["active", "past_due", "canceled"]);
