CREATE TYPE "public"."application_stage" AS ENUM('saved', 'applied', 'interviewing', 'offer', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."coach_role" AS ENUM('user', 'assistant');--> statement-breakpoint
CREATE TYPE "public"."interview_status" AS ENUM('draft', 'active', 'complete');--> statement-breakpoint
CREATE TYPE "public"."job_level" AS ENUM('junior', 'mid', 'senior', 'lead');--> statement-breakpoint
CREATE TYPE "public"."skill_source" AS ENUM('manual', 'resume');--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"email_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ats_analyses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resume_id" uuid NOT NULL,
	"job_description" text NOT NULL,
	"score" integer NOT NULL,
	"breakdown" jsonb NOT NULL,
	"matched" jsonb NOT NULL,
	"missing_evidence" jsonb NOT NULL,
	"skill_gaps" jsonb NOT NULL,
	"suggestions" jsonb NOT NULL,
	"model_version" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ats_score_range" CHECK ("ats_analyses"."score" between 0 and 100)
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"template" text DEFAULT 'classic' NOT NULL,
	"content" jsonb NOT NULL,
	"ats_score" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "resumes_ats_range" CHECK ("resumes"."ats_score" is null or "resumes"."ats_score" between 0 and 100)
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"level" integer,
	"source" "skill_source" DEFAULT 'manual' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "skills_level_range" CHECK ("skills"."level" is null or "skills"."level" between 1 and 5)
);
--> statement-breakpoint
CREATE TABLE "job_matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"job_id" uuid NOT NULL,
	"resume_id" uuid,
	"score" integer NOT NULL,
	"reasons" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "job_matches_score_range" CHECK ("job_matches"."score" between 0 and 100)
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"remote" boolean DEFAULT false NOT NULL,
	"level" "job_level",
	"salary_min" integer,
	"salary_max" integer,
	"description" text DEFAULT '' NOT NULL,
	"skills" text[] DEFAULT '{}'::text[] NOT NULL,
	"source" text DEFAULT 'manual' NOT NULL,
	"external_id" text,
	"posted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_jobs" (
	"user_id" uuid NOT NULL,
	"job_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "saved_jobs_user_id_job_id_pk" PRIMARY KEY("user_id","job_id")
);
--> statement-breakpoint
CREATE TABLE "interview_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"interview_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"question" text NOT NULL,
	"answer" text,
	"seconds_taken" integer,
	"feedback" jsonb,
	"score" integer
);
--> statement-breakpoint
CREATE TABLE "interviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"resume_id" uuid,
	"role" text NOT NULL,
	"level" text NOT NULL,
	"status" "interview_status" DEFAULT 'draft' NOT NULL,
	"score" integer,
	"scores" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"job_id" uuid,
	"resume_id" uuid,
	"company" text NOT NULL,
	"title" text NOT NULL,
	"stage" "application_stage" DEFAULT 'saved' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"applied_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coach_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "coach_role" NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_plan_steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"skill" text NOT NULL,
	"title" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "readiness_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"score" integer NOT NULL,
	"resume" integer,
	"ats" integer,
	"interview" integer,
	"skills" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "snapshots_score_range" CHECK ("readiness_snapshots"."score" between 0 and 100)
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"action" text NOT NULL,
	"ip" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ats_analyses" ADD CONSTRAINT "ats_analyses_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_matches" ADD CONSTRAINT "job_matches_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_matches" ADD CONSTRAINT "job_matches_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_matches" ADD CONSTRAINT "job_matches_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_answers" ADD CONSTRAINT "interview_answers_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coach_messages" ADD CONSTRAINT "coach_messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_plan_steps" ADD CONSTRAINT "learning_plan_steps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readiness_snapshots" ADD CONSTRAINT "readiness_snapshots_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "pwreset_hash_uq" ON "password_reset_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE UNIQUE INDEX "refresh_hash_uq" ON "refresh_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "refresh_expires_idx" ON "refresh_tokens" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_uq" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "ats_resume_created_idx" ON "ats_analyses" USING btree ("resume_id","created_at");--> statement-breakpoint
CREATE INDEX "resumes_user_updated_idx" ON "resumes" USING btree ("user_id","updated_at");--> statement-breakpoint
CREATE UNIQUE INDEX "skills_user_name_uq" ON "skills" USING btree ("user_id",lower("name"));--> statement-breakpoint
CREATE INDEX "skills_user_idx" ON "skills" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "job_matches_user_score_idx" ON "job_matches" USING btree ("user_id","score");--> statement-breakpoint
CREATE INDEX "jobs_skills_gin" ON "jobs" USING gin ("skills");--> statement-breakpoint
CREATE INDEX "jobs_fts_gin" ON "jobs" USING gin (to_tsvector('english', "title" || ' ' || "description"));--> statement-breakpoint
CREATE UNIQUE INDEX "jobs_source_ext_uq" ON "jobs" USING btree ("source","external_id");--> statement-breakpoint
CREATE INDEX "jobs_level_remote_idx" ON "jobs" USING btree ("level","remote");--> statement-breakpoint
CREATE INDEX "answers_interview_pos_idx" ON "interview_answers" USING btree ("interview_id","position");--> statement-breakpoint
CREATE INDEX "interviews_user_started_idx" ON "interviews" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "applications_user_stage_pos_idx" ON "applications" USING btree ("user_id","stage","position");--> statement-breakpoint
CREATE INDEX "coach_user_created_idx" ON "coach_messages" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "plan_user_pos_idx" ON "learning_plan_steps" USING btree ("user_id","position");--> statement-breakpoint
CREATE INDEX "snapshots_user_created_idx" ON "readiness_snapshots" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "audit_user_created_idx" ON "audit_log" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "audit_action_idx" ON "audit_log" USING btree ("action");