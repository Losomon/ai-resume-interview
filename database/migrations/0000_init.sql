CREATE TYPE "public"."application_stage" AS ENUM('saved', 'applied', 'interviewing', 'offer', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."interview_status" AS ENUM('active', 'complete');--> statement-breakpoint
CREATE TYPE "public"."job_level" AS ENUM('junior', 'mid', 'senior', 'lead');--> statement-breakpoint
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
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
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
CREATE TABLE "interview_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"resume_id" uuid,
	"config" jsonb NOT NULL,
	"questions" jsonb NOT NULL,
	"answers" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"scores" jsonb,
	"feedback" jsonb,
	"status" "interview_status" DEFAULT 'active' NOT NULL,
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
CREATE TABLE "coach_conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"messages" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"plan" jsonb,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
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
	"source" text DEFAULT 'manual' NOT NULL,
	"external_id" text,
	"posted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_skills" (
	"job_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	CONSTRAINT "job_skills_job_id_skill_id_pk" PRIMARY KEY("job_id","skill_id")
);
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ats_analyses" ADD CONSTRAINT "ats_analyses_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_sessions" ADD CONSTRAINT "interview_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_sessions" ADD CONSTRAINT "interview_sessions_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coach_conversations" ADD CONSTRAINT "coach_conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "refresh_hash_uq" ON "refresh_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "refresh_expires_idx" ON "refresh_tokens" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_uq" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "resumes_user_updated_idx" ON "resumes" USING btree ("user_id","updated_at");--> statement-breakpoint
CREATE INDEX "ats_resume_created_idx" ON "ats_analyses" USING btree ("resume_id","created_at");--> statement-breakpoint
CREATE INDEX "interview_user_started_idx" ON "interview_sessions" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "applications_user_stage_pos_idx" ON "applications" USING btree ("user_id","stage","position");--> statement-breakpoint
CREATE UNIQUE INDEX "coach_user_uq" ON "coach_conversations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "jobs_fts_gin" ON "jobs" USING gin (to_tsvector('english', "title" || ' ' || "description"));--> statement-breakpoint
CREATE UNIQUE INDEX "jobs_source_ext_uq" ON "jobs" USING btree ("source","external_id");--> statement-breakpoint
CREATE INDEX "jobs_level_remote_idx" ON "jobs" USING btree ("level","remote");--> statement-breakpoint
CREATE UNIQUE INDEX "skills_name_uq" ON "skills" USING btree (lower("name"));--> statement-breakpoint
CREATE INDEX "job_skills_skill_idx" ON "job_skills" USING btree ("skill_id");