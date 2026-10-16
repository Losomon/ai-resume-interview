import { pgTable, uuid, text, timestamp, jsonb, integer, index } from 'drizzle-orm/pg-core';

const id = () => uuid('id').primaryKey().defaultRandom();
const createdAt = () => timestamp('created_at', { withTimezone: true }).notNull().defaultNow();
const updatedAt = () => timestamp('updated_at', { withTimezone: true }).notNull().defaultNow();

export const users = pgTable('users', {
  id: id(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  createdAt: createdAt(),
});

const userRef = () => uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' });

export const userProfiles = pgTable('user_profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  headline: text('headline'),
  targetRole: text('target_role'),
  skills: jsonb('skills').$type<string[]>().notNull().default([]),
  education: jsonb('education').$type<unknown[]>().notNull().default([]),
  experience: jsonb('experience').$type<unknown[]>().notNull().default([]),
  updatedAt: updatedAt(),
});

export const userSettings = pgTable('user_settings', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  preferences: jsonb('preferences').$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: updatedAt(),
});

export const resumes = pgTable('resumes', {
  id: id(),
  userId: userRef(),
  title: text('title').notNull(),
  template: text('template').notNull().default('classic'),
  content: jsonb('content').$type<Record<string, unknown>>().notNull().default({}),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [index('resumes_user_idx').on(t.userId)]);

export const atsAnalyses = pgTable('ats_analyses', {
  id: id(),
  userId: userRef(),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'set null' }),
  jobTitle: text('job_title'),
  jobDescription: text('job_description').notNull(),
  score: integer('score').notNull(),
  report: jsonb('report').$type<Record<string, unknown>>().notNull(),
  createdAt: createdAt(),
}, (t) => [index('ats_user_idx').on(t.userId)]);

export const applications = pgTable('applications', {
  id: id(),
  userId: userRef(),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'set null' }),
  company: text('company').notNull(),
  position: text('position').notNull(),
  status: text('status').notNull().default('saved'),
  appliedAt: timestamp('applied_at', { withTimezone: true }),
  notes: text('notes'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [index('applications_user_idx').on(t.userId)]);

export const contactMessages = pgTable('contact_messages', {
  id: id(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: createdAt(),
});
