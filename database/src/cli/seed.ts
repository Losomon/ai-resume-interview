import bcrypt from "bcryptjs";
import { db, pool } from "./env.js";
import { users, resumes, jobs, resumeContent } from "../index.js";

if (process.env.NODE_ENV === "production") {
  throw new Error("Refusing to seed in production");
}

const EMAIL = "demo@careerforge.dev";
const PASSWORD = "demo-password-123";

try {
  const [existingUser] = await db
    .select()
    .from(users)
    .where((await import("drizzle-orm")).eq(users.email, EMAIL))
    .limit(1);

  let user = existingUser;

  if (!user) {
    const [createdUser] = await db
      .insert(users)
      .values({
        name: "Demo User",
        email: EMAIL,
        passwordHash: await bcrypt.hash(PASSWORD, 12),
      })
      .onConflictDoNothing()
      .returning();

    user = createdUser;
  }

  if (user) {
    const [existingResume] = await db
      .select()
      .from(resumes)
      .where((await import("drizzle-orm")).eq(resumes.userId, user.id))
      .limit(1);

    if (!existingResume) {
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
        userId: user.id,
        title: "Software Engineer Resume",
        content,
      });
    }
  }

  const rows: [
    string,
    string,
    string,
    boolean,
    "junior" | "mid" | "senior" | "lead",
    string[],
  ][] = [
    [
      "Backend Developer",
      "Northwind Labs",
      "Nairobi",
      true,
      "mid",
      ["java", "spring boot", "postgresql", "docker"],
    ],
    [
      "Full-Stack Engineer",
      "Brightpath",
      "Remote",
      true,
      "mid",
      ["react", "typescript", "node.js", "sql"],
    ],
    [
      "Junior Java Developer",
      "Lumen Systems",
      "Mombasa",
      false,
      "junior",
      ["java", "sql", "git", "rest"],
    ],
    [
      "Platform Engineer",
      "Cloudline",
      "Remote",
      true,
      "senior",
      ["aws", "kubernetes", "terraform", "ci/cd"],
    ],
    [
      "Frontend Developer",
      "Pixelforge",
      "Nairobi",
      false,
      "junior",
      ["react", "javascript", "git"],
    ],
    [
      "Data Platform Engineer",
      "Quarry",
      "Remote",
      true,
      "senior",
      ["python", "sql", "aws", "docker"],
    ],
    [
      "API Developer",
      "Relay",
      "Kisumu",
      false,
      "mid",
      ["node.js", "graphql", "postgresql", "testing"],
    ],
    [
      "QA Automation Engineer",
      "Steadfast",
      "Remote",
      true,
      "mid",
      ["testing", "junit", "ci/cd", "java"],
    ],
    [
      "DevOps Engineer",
      "Harbor",
      "Nairobi",
      true,
      "mid",
      ["docker", "kubernetes", "linux", "ci/cd"],
    ],
    [
      "Software Engineer",
      "Tidewater",
      "Remote",
      true,
      "lead",
      ["microservices", "java", "aws", "agile"],
    ],
    [
      "Junior Python Developer",
      "Savanna Data",
      "Nairobi",
      false,
      "junior",
      ["python", "sql", "git", "linux"],
    ],
    [
      "Frontend Engineer",
      "Kite",
      "Remote",
      true,
      "senior",
      ["react", "typescript", "testing", "rest"],
    ],
  ];

  await db
    .insert(jobs)
    .values(
      rows.map(([title, company, location, remote, level, skills], i) => ({
        title,
        company,
        location,
        remote,
        level,
        skills,
        source: "seed",
        externalId: `seed-${i}`,
        description: `${title} at ${company}. Requires ${skills.join(", ")}.`,
      })),
    )
    .onConflictDoNothing();

  console.log(`Seeded jobs and demo user: ${EMAIL} / ${PASSWORD}`);
} finally {
  await pool.end();
}
