import bcrypt from "bcryptjs"; import { db, pool } from "./env.js"; import { users, resumes, jobs, resumeContent } from "../index.js";
if (process.env.NODE_ENV === "production") throw new Error("Refusing to seed in production");
const EMAIL = "demo@careerforge.dev", PASSWORD = "demo-password-123"; // development only
const [u] = await db.insert(users).values({ name: "Demo User", email: EMAIL, passwordHash: await bcrypt.hash(PASSWORD, 12) }).onConflictDoNothing().returning();
if (u) await db.insert(resumes).values({ userId: u.id, title: "Software Engineer Resume", content: resumeContent.parse({ fullName: "Demo User", title: "Software Engineer", summary: "Backend developer focused on reliable APIs.",
  skills: ["Java", "SQL", "REST", "Git", "React"], experience: [{ id: "e1", role: "Backend Developer", company: "Sample Co", bullets: ["Built REST services in Java backed by PostgreSQL", "Wrote unit tests that cut regressions in the billing module"] }] }) });
// Fictional postings so the matching UI has data.
const rows: [string, string, string, boolean, "junior" | "mid" | "senior", string[]][] = [
  ["Backend Developer", "Northwind Labs", "Nairobi", true, "mid", ["java", "spring boot", "postgresql", "docker"]], ["Full-Stack Engineer", "Brightpath", "Remote", true, "mid", ["react", "typescript", "node.js", "sql"]],
  ["Junior Java Developer", "Lumen Systems", "Mombasa", false, "junior", ["java", "sql", "git", "rest"]], ["Platform Engineer", "Cloudline", "Remote", true, "senior", ["aws", "kubernetes", "terraform", "ci/cd"]],
  ["Frontend Developer", "Pixelforge", "Nairobi", false, "junior", ["react", "javascript", "git"]], ["Data Platform Engineer", "Quarry", "Remote", true, "senior", ["python", "sql", "aws", "docker"]],
  ["API Developer", "Relay", "Kisumu", false, "mid", ["node.js", "graphql", "postgresql", "testing"]], ["QA Automation Engineer", "Steadfast", "Remote", true, "mid", ["testing", "junit", "ci/cd", "java"]]];
await db.insert(jobs).values(rows.map(([title, company, location, remote, level, skills], i) => ({ title, company, location, remote, level, skills, source: "seed", externalId: `seed-${i}`, description: `${title} at ${company}. Requires ${skills.join(", ")}.` }))).onConflictDoNothing();
console.log(`Seeded. Log in as ${EMAIL} / ${PASSWORD}`); await pool.end();
