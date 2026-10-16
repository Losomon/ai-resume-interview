import { sql } from "drizzle-orm";
import { bigint, boolean, check, index, integer, jsonb, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, pk, updatedAt } from "./_shared.js";
import { fileFormat, fileKind } from "./_enums.js";
import { owner } from "./users.js";
import type { ResumeContent } from "../content.js";

export const resumes = pgTable(
  "resumes",
  {
    id: pk(),
    userId: owner(),
    title: text("title").notNull(),
    template: text("template").notNull().default("classic"),
    content: jsonb("content").$type<ResumeContent>().notNull().default({}),
    isPrimary: boolean("is_primary").notNull().default(false),
    currentVersion: integer("current_version").notNull().default(1),
    atsScore: integer("ats_score"), // latest score, denormalized for list views
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("resumes_user_updated_idx").on(t.userId, t.updatedAt),
    check("resumes_ats_score_range", sql`${t.atsScore} is null or ${t.atsScore} between 0 and 100`),
  ],
);

// Immutable snapshots so edits can be undone and compared.
export const resumeVersions = pgTable(
  "resume_versions",
  {
    id: pk(),
    userId: owner(),
    resumeId: uuid("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }),
    version: integer("version").notNull(),
    content: jsonb("content").$type<ResumeContent>().notNull(),
    note: text("note"),
    createdAt: createdAt(),
  },
  (t) => [unique("resume_versions_resume_version_uq").on(t.resumeId, t.version)],
);

// Uploaded resumes (to parse) and generated exports. Bytes live in object storage; only the key is here.
export const resumeFiles = pgTable(
  "resume_files",
  {
    id: pk(),
    userId: owner(),
    resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "set null" }),
    kind: fileKind("kind").notNull(),
    format: fileFormat("format").notNull(),
    originalName: text("original_name"),
    mimeType: text("mime_type").notNull(),
    storageKey: text("storage_key").notNull().unique(),
    sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
    sha256: text("sha256"),
    extractedText: text("extracted_text"),
    createdAt: createdAt(),
  },
  (t) => [
    index("resume_files_user_idx").on(t.userId, t.createdAt),
    check("resume_files_size_range", sql`${t.sizeBytes} > 0 and ${t.sizeBytes} <= 10485760`),
  ],
);

export const atsAnalyses = pgTable(
  "ats_analyses",
  {
    id: pk(),
    userId: owner(),
    resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "set null" }),
    jobTitle: text("job_title"),
    company: text("company"),
    jobDescription: text("job_description").notNull(),
    score: integer("score").notNull(),
    engine: text("engine").notNull().default("rules-v1"),
    // { matched: string[], evidence: {keyword, because[]}[], gaps: string[], summary }
    breakdown: jsonb("breakdown").$type<Record<string, unknown>>().notNull(),
    createdAt: createdAt(),
  },
  (t) => [
    index("ats_resume_created_idx").on(t.resumeId, t.createdAt),
    index("ats_user_created_idx").on(t.userId, t.createdAt),
    check("ats_score_range", sql`${t.score} between 0 and 100`),
  ],
);
