import { and, desc, eq, gte, ilike, inArray, or } from "drizzle-orm"; import { jobs, jobSkills, skills } from "@careerforge/database"; import { db } from "../db.js"; import { NotFoundError } from "../lib/errors.js"; import { latestByUser } from "./resume.service.js"; import { has, resumeText } from "./ats.service.js";
export interface JobFilters { q?: string; location?: string; level?: "junior" | "mid" | "senior" | "lead"; remote?: boolean; minSalary?: number; limit: number }
async function attach(userId: string, rows: (typeof jobs.$inferSelect)[]) {
  if (rows.length === 0) return [];
  const links = await db.select({ jobId: jobSkills.jobId, name: skills.name }).from(jobSkills).innerJoin(skills, eq(skills.id, jobSkills.skillId)).where(inArray(jobSkills.jobId, rows.map((r) => r.id)));
  const resume = await latestByUser(userId), text = resume ? resumeText(resume.content) : null;
  return rows.map((j) => {
    const names = links.filter((l) => l.jobId === j.id).map((l) => l.name), matched = text ? names.filter((n) => has(text, n)) : [];
    return { ...j, skills: names, match: text && names.length ? { score: Math.round((matched.length / names.length) * 100), matched, missing: names.filter((n) => !matched.includes(n)) } : null };
  });
}
/** Match = share of a job's required skills that appear in the user's most recently edited resume. Sorted best-first when a resume exists. */
export async function list(userId: string, f: JobFilters) {
  const where = and(f.q ? or(ilike(jobs.title, `%${f.q}%`), ilike(jobs.company, `%${f.q}%`), ilike(jobs.description, `%${f.q}%`)) : undefined, f.location ? ilike(jobs.location, `%${f.location}%`) : undefined,
    f.level ? eq(jobs.level, f.level) : undefined, f.remote !== undefined ? eq(jobs.remote, f.remote) : undefined, f.minSalary ? gte(jobs.salaryMax, f.minSalary) : undefined);
  const out = await attach(userId, await db.select().from(jobs).where(where).orderBy(desc(jobs.createdAt)).limit(f.limit));
  return out.sort((a, b) => (b.match?.score ?? -1) - (a.match?.score ?? -1));
}
export async function get(userId: string, id: string) { const [j] = await db.select().from(jobs).where(eq(jobs.id, id)); if (!j) throw new NotFoundError("Job"); return (await attach(userId, [j]))[0]!; }
