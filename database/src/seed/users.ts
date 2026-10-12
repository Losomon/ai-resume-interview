import bcrypt from "bcryptjs"; import { db } from "../cli/env.js"; import { users, resumes } from "../schema/index.js"; import { resumeContent } from "../validation/index.js";
export const DEMO = { email: "demo@careerforge.dev", password: "demo-password-123" }; // development only
export async function seedUsers() {
  const [u] = await db.insert(users).values({ name: "Demo User", email: DEMO.email, passwordHash: await bcrypt.hash(DEMO.password, 12) }).onConflictDoNothing().returning();
  if (u) await db.insert(resumes).values({ userId: u.id, title: "Software Engineer Resume", content: resumeContent.parse({ fullName: "Demo User", title: "Software Engineer", summary: "Backend developer focused on reliable APIs.",
    skills: ["Java", "SQL", "REST", "Git", "React"], experience: [{ id: "e1", role: "Backend Developer", company: "Sample Co", bullets: ["Built REST services in Java backed by PostgreSQL", "Wrote unit tests that cut regressions in the billing module"] }] }) });
}
