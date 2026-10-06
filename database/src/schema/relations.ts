import { relations } from "drizzle-orm";
import { users } from "./users.js"; import { resumes } from "./resumes.js"; import { atsAnalyses } from "./ats-analyses.js"; import { jobs } from "./jobs.js"; import { skills } from "./skills.js"; import { jobSkills } from "./job-skills.js"; import { applications } from "./applications.js";
// Enables db.query.jobs.findMany({ with: { skills: { with: { skill: true } } } }). Constraints live in the tables; these are only for typed joins.
export const usersRelations = relations(users, ({ many }) => ({ resumes: many(resumes), applications: many(applications) }));
export const resumesRelations = relations(resumes, ({ one, many }) => ({ user: one(users, { fields: [resumes.userId], references: [users.id] }), analyses: many(atsAnalyses) }));
export const atsRelations = relations(atsAnalyses, ({ one }) => ({ resume: one(resumes, { fields: [atsAnalyses.resumeId], references: [resumes.id] }) }));
export const jobsRelations = relations(jobs, ({ many }) => ({ skills: many(jobSkills) }));
export const skillsRelations = relations(skills, ({ many }) => ({ jobs: many(jobSkills) }));
export const jobSkillsRelations = relations(jobSkills, ({ one }) => ({ job: one(jobs, { fields: [jobSkills.jobId], references: [jobs.id] }), skill: one(skills, { fields: [jobSkills.skillId], references: [skills.id] }) }));
export const applicationsRelations = relations(applications, ({ one }) => ({ job: one(jobs, { fields: [applications.jobId], references: [jobs.id] }), resume: one(resumes, { fields: [applications.resumeId], references: [resumes.id] }) }));
