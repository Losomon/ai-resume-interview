import bcrypt from "bcryptjs";
import { db } from "../cli/env.js";
import { users, resumes } from "../schema/index.js";
import { resumeContent } from "../content.js";

export const DEMO = {
  email: "demo@careerforge.dev",
  password: "demo-password-123",
}; // Development only

export async function seedUsers(): Promise<void> {
  const passwordHash = await bcrypt.hash(DEMO.password, 12);

  const [u] = await db
    .insert(users)
    .values({
      name: "Demo User",
      email: DEMO.email,
      passwordHash,
    })
    .onConflictDoNothing()
    .returning();

  if (!u) {
    return;
  }

  const content = resumeContent.parse({
    summary: "Backend developer focused on reliable APIs.",
    skills: ["Java", "SQL", "REST", "Git", "React"],
    experience: [
      {
        title: "Backend Developer",
        company: "Sample Co",
        start: "2024-01",
        bullets: [
          "Built REST services in Java backed by PostgreSQL",
          "Wrote unit tests that cut regressions in the billing module",
        ],
      },
    ],
  });

  await db.insert(resumes).values({
    userId: u.id,
    title: "Software Engineer Resume",
    content,
  });
}
