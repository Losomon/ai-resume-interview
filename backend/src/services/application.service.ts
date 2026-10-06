import { and, asc, eq, sql } from "drizzle-orm"; import { applications, type ApplicationCreate, type ApplicationPatch } from "@careerforge/database"; import { db } from "../db.js"; import { NotFoundError } from "../lib/errors.js"; import { getOwned as getResume } from "./resume.service.js";
type Stage = ApplicationCreate["stage"];
async function getOwned(userId: string, id: string) { const [a] = await db.select().from(applications).where(and(eq(applications.id, id), eq(applications.userId, userId))); if (!a) throw new NotFoundError("Application"); return a; }
async function nextPosition(userId: string, stage: Stage) { const [r] = await db.select({ m: sql<number>`coalesce(max(${applications.position}), -1)` }).from(applications).where(and(eq(applications.userId, userId), eq(applications.stage, stage))); return Number(r!.m) + 1; }
export const list = (userId: string) => db.select().from(applications).where(eq(applications.userId, userId)).orderBy(asc(applications.stage), asc(applications.position));
export async function create(userId: string, i: ApplicationCreate) {
  if (i.resumeId) await getResume(userId, i.resumeId);
  const [a] = await db.insert(applications).values({ ...i, userId, position: await nextPosition(userId, i.stage), appliedAt: i.stage === "saved" ? null : new Date() }).returning(); return a!;
}
/** Moving to another column appends to it, and the first move out of "saved" stamps applied_at. */
export async function update(userId: string, id: string, patch: ApplicationPatch) {
  const cur = await getOwned(userId, id); if (patch.resumeId) await getResume(userId, patch.resumeId);
  const set: Partial<typeof applications.$inferInsert> = { ...patch };
  if (patch.stage && patch.stage !== cur.stage) { if (patch.position === undefined) set.position = await nextPosition(userId, patch.stage); if (patch.stage !== "saved" && !cur.appliedAt) set.appliedAt = new Date(); }
  const [a] = await db.update(applications).set(set).where(eq(applications.id, id)).returning(); return a!;
}
export async function remove(userId: string, id: string) { await getOwned(userId, id); await db.delete(applications).where(eq(applications.id, id)); }
