import { eq } from "drizzle-orm"; import { db } from "../cli/env.js"; import { jobs, skills, jobSkills } from "../schema/index.js";
type Row = [title: string, company: string, location: string, remote: boolean, level: "junior" | "mid" | "senior" | "lead", min: number, max: number, skills: string[]];
// Fictional postings so job matching has data. Salaries: annual USD.
const ROWS: Row[] = [
  ["Backend Developer", "Northwind Labs", "Nairobi", true, "mid", 24000, 38000, ["java", "spring boot", "postgresql", "docker"]], ["Full-Stack Engineer", "Brightpath", "Remote", true, "mid", 30000, 48000, ["react", "typescript", "node.js", "sql"]],
  ["Junior Java Developer", "Lumen Systems", "Mombasa", false, "junior", 12000, 18000, ["java", "sql", "git", "rest"]], ["Platform Engineer", "Cloudline", "Remote", true, "senior", 52000, 78000, ["aws", "kubernetes", "terraform", "ci/cd"]],
  ["Frontend Developer", "Pixelforge", "Nairobi", false, "junior", 12000, 20000, ["react", "javascript", "git"]], ["Data Platform Engineer", "Quarry", "Remote", true, "senior", 55000, 82000, ["python", "sql", "aws", "docker"]],
  ["API Developer", "Relay", "Kisumu", false, "mid", 22000, 34000, ["node.js", "graphql", "postgresql", "testing"]], ["QA Automation Engineer", "Steadfast", "Remote", true, "mid", 20000, 32000, ["testing", "junit", "ci/cd", "java"]],
  ["DevOps Engineer", "Harbor", "Nairobi", true, "mid", 28000, 44000, ["docker", "kubernetes", "linux", "ci/cd"]], ["Software Engineer", "Tidewater", "Remote", true, "lead", 65000, 95000, ["microservices", "java", "aws", "agile"]],
  ["Junior Python Developer", "Savanna Data", "Nairobi", false, "junior", 12000, 19000, ["python", "sql", "git", "linux"]], ["Frontend Engineer", "Kite", "Remote", true, "senior", 45000, 66000, ["react", "typescript", "testing", "rest"]]];
export async function seedJobs() {
  await db.insert(jobs).values(ROWS.map(([title, company, location, remote, level, salaryMin, salaryMax], i) => ({ title, company, location, remote, level, salaryMin, salaryMax, source: "seed", externalId: `seed-${i}`, description: `${title} at ${company}.` }))).onConflictDoNothing();
  const byExt = new Map((await db.select().from(jobs).where(eq(jobs.source, "seed"))).map((j) => [j.externalId, j.id])); const byName = new Map((await db.select().from(skills)).map((s) => [s.name, s.id]));
  const links = ROWS.flatMap((r, i) => r[7].map((s) => ({ jobId: byExt.get(`seed-${i}`)!, skillId: byName.get(s)! })));
  await db.insert(jobSkills).values(links).onConflictDoNothing();
}
