import { relations } from "drizzle-orm";
import { users, userProfiles, userSettings } from "./users.js";
import { resumes, resumeVersions, atsAnalyses } from "./resumes.js";
import { applications, applicationEvents } from "./applications.js";
import { interviews, interviewQuestions, interviewAnswers } from "./interviews.js";
import { coachConversations, coachMessages } from "./coach.js";
import { jobs, jobMatches } from "./jobs.js";

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, { fields: [users.id], references: [userProfiles.userId] }),
  settings: one(userSettings, { fields: [users.id], references: [userSettings.userId] }),
  resumes: many(resumes),
  applications: many(applications),
  interviews: many(interviews),
  conversations: many(coachConversations),
}));
export const resumesRelations = relations(resumes, ({ one, many }) => ({
  user: one(users, { fields: [resumes.userId], references: [users.id] }),
  versions: many(resumeVersions),
  analyses: many(atsAnalyses),
}));
export const resumeVersionsRelations = relations(resumeVersions, ({ one }) => ({
  resume: one(resumes, { fields: [resumeVersions.resumeId], references: [resumes.id] }),
}));
export const atsRelations = relations(atsAnalyses, ({ one }) => ({
  resume: one(resumes, { fields: [atsAnalyses.resumeId], references: [resumes.id] }),
}));
export const jobsRelations = relations(jobs, ({ many }) => ({ matches: many(jobMatches), applications: many(applications) }));
export const jobMatchesRelations = relations(jobMatches, ({ one }) => ({
  job: one(jobs, { fields: [jobMatches.jobId], references: [jobs.id] }),
}));
export const applicationsRelations = relations(applications, ({ one, many }) => ({
  job: one(jobs, { fields: [applications.jobId], references: [jobs.id] }),
  resume: one(resumes, { fields: [applications.resumeId], references: [resumes.id] }),
  events: many(applicationEvents),
}));
export const applicationEventsRelations = relations(applicationEvents, ({ one }) => ({
  application: one(applications, { fields: [applicationEvents.applicationId], references: [applications.id] }),
}));
export const interviewsRelations = relations(interviews, ({ one, many }) => ({
  job: one(jobs, { fields: [interviews.jobId], references: [jobs.id] }),
  questions: many(interviewQuestions),
}));
export const interviewQuestionsRelations = relations(interviewQuestions, ({ one }) => ({
  interview: one(interviews, { fields: [interviewQuestions.interviewId], references: [interviews.id] }),
  answer: one(interviewAnswers, { fields: [interviewQuestions.id], references: [interviewAnswers.questionId] }),
}));
export const coachConversationsRelations = relations(coachConversations, ({ many }) => ({ messages: many(coachMessages) }));
export const coachMessagesRelations = relations(coachMessages, ({ one }) => ({
  conversation: one(coachConversations, { fields: [coachMessages.conversationId], references: [coachConversations.id] }),
}));
