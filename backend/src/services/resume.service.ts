import { and, desc, eq } from "drizzle-orm"; import { resumes, resumeContent, type ResumeContent } from "@careerforge/database"; import { db } from "../db.js"; import { NotFoundError } from "../lib/errors.js";
const summary = { id: resumes.id, title: resumes.title, template: resumes.template, atsScore: resumes.atsScore, updatedAt: resumes.updatedAt };
/** Every query is scoped to the owner; other users' ids look like they don't exist. */
export async function getOwned(userId: string, id: string) { const [r] = await db.select().from(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, userId))); if (!r) throw new NotFoundError("Resume"); return r; }
export const listByUser = (userId: string) => db.select(summary).from(resumes).where(eq(resumes.userId, userId)).orderBy(desc(resumes.updatedAt));
export async function latestByUser(userId: string) { const [r] = await db.select().from(resumes).where(eq(resumes.userId, userId)).orderBy(desc(resumes.updatedAt)).limit(1); return r; }
export async function create(userId: string, i: { title: string; template?: string; content?: ResumeContent }) {
  const [r] = await db.insert(resumes).values({ userId, title: i.title, template: i.template, content: i.content ?? resumeContent.parse({}) }).returning(); return r!;
}
export async function update(userId: string, id: string, patch: { title?: string; template?: string; content?: ResumeContent }) {
  await getOwned(userId, id); const [r] = await db.update(resumes).set(patch).where(and(eq(resumes.id, id), eq(resumes.userId, userId))).returning(); return r!;
}
export async function remove(userId: string, id: string) { await getOwned(userId, id); await db.delete(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, userId))); }
export async function duplicate(userId: string, id: string) {
  const src = await getOwned(userId, id);
  const [r] = await db.insert(resumes).values({ userId, title: `${src.title} (copy)`.slice(0, 120), template: src.template, content: structuredClone(src.content), atsScore: null }).returning(); return r!;
}
