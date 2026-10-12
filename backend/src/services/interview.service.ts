import crypto from "node:crypto"; import { and, desc, eq } from "drizzle-orm"; import { interviewSessions, SKILL_CATALOG, type InterviewConfig, type InterviewQuestion, type InterviewAnswer, type InterviewScores, type InterviewFeedback } from "@careerforge/database";
import { db } from "../db.js"; import { NotFoundError, UnprocessableError } from "../lib/errors.js"; import { getOwned as getResume } from "./resume.service.js"; import { has } from "./ats.service.js";
type Q = Omit<InterviewQuestion, "id">;
const BEHAVIORAL = ["Tell me about a time you had to learn something quickly to deliver a project.", "Describe a conflict with a teammate and how you resolved it.", "Tell me about a project you're proud of and your specific contribution.", "Describe a time you made a mistake at work. What did you do next?",
  "Tell me about a time you had to meet a tight deadline.", "Give an example of when you took initiative beyond your assigned work.", "Describe a time you received critical feedback. How did you respond?", "Tell me about a time you had to explain something complex to a non-technical person."];
const TECHNICAL = ["Walk me through how you would design a REST API for a resume-builder application.", "Tell me about a challenging technical problem you solved and how you debugged it.", "How do you decide what to test, and what is your approach to writing tests?",
  "Explain the trade-offs between a relational database and a document database.", "How would you improve the performance of a slow API endpoint?", "What happens, step by step, when a user logs in to a web application you built?",
  "How do you keep code maintainable as a project grows?", "Describe how you would handle a production bug reported by a customer."];
const shuffle = <T,>(a: T[]) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = crypto.randomInt(i + 1); [r[i], r[j]] = [r[j]!, r[i]!]; } return r; };
function pickQuestions(c: InterviewConfig): Q[] {
  const b: Q[] = BEHAVIORAL.map((text) => ({ text, category: "behavioral" })), t: Q[] = TECHNICAL.map((text) => ({ text, category: "technical" }));
  const pool = c.type === "behavioral" ? shuffle(b) : c.type === "technical" ? shuffle(t) : shuffle(b).flatMap((q, i) => [q, shuffle(t)[i % t.length]!]).filter((q, i, a) => a.findIndex((x) => x.text === q.text) === i);
  return pool.slice(0, c.count);
}
export async function create(userId: string, config: InterviewConfig, resumeId?: string) {
  if (resumeId) await getResume(userId, resumeId);
  const picked = pickQuestions(config), questions = picked.map((q) => ({ id: crypto.randomUUID(), ...q }));
  const [s] = await db.insert(interviewSessions).values({ userId, resumeId, config: { ...config, count: questions.length }, questions }).returning(); return s!;
}
export const list = (userId: string) => db.select().from(interviewSessions).where(eq(interviewSessions.userId, userId)).orderBy(desc(interviewSessions.startedAt));
export async function getOwned(userId: string, id: string) { const [s] = await db.select().from(interviewSessions).where(and(eq(interviewSessions.id, id), eq(interviewSessions.userId, userId))); if (!s) throw new NotFoundError("Interview session"); return s; }
/** Merge answers by questionId (autosave while the user progresses). */
export async function saveAnswers(userId: string, id: string, incoming: InterviewAnswer[]) {
  const s = await getOwned(userId, id); if (s.status === "complete") throw new UnprocessableError("ALREADY_COMPLETE", "This interview is already submitted");
  const valid = new Set(s.questions.map((q) => q.id)); const map = new Map(s.answers.map((a) => [a.questionId, a]));
  for (const a of incoming) if (valid.has(a.questionId)) map.set(a.questionId, a);
  const [u] = await db.update(interviewSessions).set({ answers: [...map.values()] }).where(eq(interviewSessions.id, id)).returning(); return u!;
}
// ---- Scoring: transparent rules (rules-v1), not an LLM. technical = depth for technical questions, measurable impact for behavioural ones. ----
const ACTION = /\b(built|designed|led|implemented|reduced|improved|delivered|fixed|optimi[sz]ed|launched|migrated|automated|wrote|created)\b/gi, RESULT = /(result|outcome|improved|reduced|increased|saved|decreased|faster|%)/i, HEDGE = /\b(maybe|i guess|kind of|sort of|i think|probably|not sure)\b/gi;
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
function scoreAnswer(q: InterviewQuestion, a: string) {
  const words = a.trim().split(/\s+/).filter(Boolean).length, len = Math.min(1, words / 120), metrics = /\d/.test(a), actions = (a.match(ACTION) ?? []).length, result = RESULT.test(a), own = /\b(i|my)\b/i.test(a), hedges = (a.match(HEDGE) ?? []).length;
  const tech = SKILL_CATALOG.filter((s) => has(a.toLowerCase(), s)).length;
  const communication = clamp(len * 55 + (actions >= 2 ? 25 : actions * 12) + (result ? 20 : 0));
  const technical = clamp(q.category === "technical" ? len * 35 + Math.min(tech, 3) * 15 + (metrics ? 10 : 0) + (actions ? 10 : 0) : len * 40 + (metrics ? 30 : 0) + (result ? 30 : 0));
  const confidence = clamp(60 + (own ? 15 : 0) - hedges * 12 + (len > 0.5 ? 10 : 0) - (words < 15 ? 30 : 0));
  return { communication, technical, confidence, overall: clamp(0.4 * communication + 0.3 * technical + 0.3 * confidence), words, metrics, actions, hedges };
}
export async function submit(userId: string, id: string, finalAnswers?: InterviewAnswer[]) {
  if (finalAnswers?.length) await saveAnswers(userId, id, finalAnswers);
  const s = await getOwned(userId, id); if (s.status === "complete") return s;
  const answered = s.answers.filter((a) => a.answer.trim().length > 0); if (answered.length === 0) throw new UnprocessableError("NO_ANSWERS", "Answer at least one question before submitting");
  const byQ = new Map(s.questions.map((q) => [q.id, q])), rows = answered.map((a) => ({ id: a.questionId, ...scoreAnswer(byQ.get(a.questionId)!, a.answer) })), total = s.questions.length;
  const avg = (k: "communication" | "technical" | "confidence" | "overall") => Math.round(rows.reduce((n, r) => n + r[k], 0) / total); // unanswered questions count as 0
  const scores: InterviewScores = { overall: avg("overall"), communication: avg("communication"), technical: avg("technical"), confidence: avg("confidence") };
  const share = (f: (r: (typeof rows)[number]) => boolean) => rows.filter(f).length / rows.length, strengths: string[] = [], improvements: string[] = [];
  if (share((r) => r.metrics) >= 0.5) strengths.push("Backs answers with specific numbers and results"); else improvements.push("Add measurable results (numbers, percentages, time saved)");
  if (share((r) => r.actions >= 2) >= 0.5) strengths.push("Clearly says what you personally did"); else improvements.push("Say what you personally did, using verbs like built, led and implemented");
  if (rows.reduce((n, r) => n + r.words, 0) / rows.length >= 60) strengths.push("Gives enough detail to be convincing"); else improvements.push("Give fuller answers: aim for about 80 to 150 words");
  if (rows.reduce((n, r) => n + r.hedges, 0) > 0) improvements.push("Reduce hedging words such as 'maybe' and 'I guess'");
  if (answered.length < total) improvements.push(`Answer every question: ${total - answered.length} left blank`);
  if (strengths.length === 0) strengths.push(`You completed ${answered.length} of ${total} questions`);
  const feedback: InterviewFeedback = { strengths, improvements, method: "rules-v1", perQuestion: rows.map((r) => ({ questionId: r.id, score: r.overall, note: r.metrics && r.actions ? "Specific and action-focused" : "Add concrete actions and numbers" })) };
  const [u] = await db.update(interviewSessions).set({ scores, feedback, status: "complete", completedAt: new Date() }).where(eq(interviewSessions.id, id)).returning(); return u!;
}
