import { relations } from "drizzle-orm";
import { users, refreshTokens } from "./users.js"; import { resumes, atsAnalyses } from "./resumes.js"; import { jobs, jobMatches, savedJobs } from "./jobs.js";
import { interviews, interviewAnswers } from "./interviews.js"; import { applications } from "./applications.js";
// Enables db.query.resumes.findMany({ with: { analyses: true } }). Constraints live in the tables; these are only for typed joins.
export const usersRelations = relations(users, ({ many }) => ({ resumes: many(resumes), interviews: many(interviews), applications: many(applications), refreshTokens: many(refreshTokens) }));
export const resumesRelations = relations(resumes, ({ one, many }) => ({ user: one(users, { fields: [resumes.userId], references: [users.id] }), analyses: many(atsAnalyses) }));
export const atsRelations = relations(atsAnalyses, ({ one }) => ({ resume: one(resumes, { fields: [atsAnalyses.resumeId], references: [resumes.id] }) }));
export const jobsRelations = relations(jobs, ({ many }) => ({ matches: many(jobMatches), saved: many(savedJobs) }));
export const jobMatchesRelations = relations(jobMatches, ({ one }) => ({ job: one(jobs, { fields: [jobMatches.jobId], references: [jobs.id] }) }));
export const interviewsRelations = relations(interviews, ({ one, many }) => ({ user: one(users, { fields: [interviews.userId], references: [users.id] }), answers: many(interviewAnswers) }));
export const answersRelations = relations(interviewAnswers, ({ one }) => ({ interview: one(interviews, { fields: [interviewAnswers.interviewId], references: [interviews.id] }) }));
export const applicationsRelations = relations(applications, ({ one }) => ({ job: one(jobs, { fields: [applications.jobId], references: [jobs.id] }), resume: one(resumes, { fields: [applications.resumeId], references: [resumes.id] }) }));
