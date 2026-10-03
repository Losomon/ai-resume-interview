import type { Job, JobFilters, JobMatch, Resume, ATSAnalysis } from "@/types/resume";

const LATENCY = 500;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY));
}

const JOBS: Job[] = [
  {
    id: "j1",
    title: "Senior Frontend Developer",
    company: "Google",
    companyInitial: "G",
    location: "Remote",
    remote: true,
    level: "senior",
    salaryMin: 150000,
    salaryMax: 210000,
    tags: ["React", "TypeScript", "Next.js", "GraphQL"],
    description:
      "Build performant, accessible UI at scale. Own architecture decisions for a suite of products used by millions.",
    postedAt: "2026-09-28",
  },
  {
    id: "j2",
    title: "Full Stack Developer",
    company: "Microsoft",
    companyInitial: "M",
    location: "Hybrid",
    remote: false,
    level: "mid",
    salaryMin: 110000,
    salaryMax: 160000,
    tags: ["React", "Node.js", "PostgreSQL", "Azure"],
    description:
      "Ship features across the stack. Work closely with design, product, and platform teams.",
    postedAt: "2026-09-27",
  },
  {
    id: "j3",
    title: "Software Engineer",
    company: "Amazon",
    companyInitial: "A",
    location: "Hybrid",
    remote: false,
    level: "mid",
    salaryMin: 120000,
    salaryMax: 170000,
    tags: ["Java", "Spring Boot", "AWS", "Kubernetes"],
    description:
      "Design and operate distributed systems at scale. Strong focus on operational excellence.",
    postedAt: "2026-09-26",
  },
  {
    id: "j4",
    title: "Backend Engineer",
    company: "Stripe",
    companyInitial: "S",
    location: "Remote",
    remote: true,
    level: "senior",
    salaryMin: 160000,
    salaryMax: 220000,
    tags: ["Go", "PostgreSQL", "gRPC", "Docker"],
    description:
      "Work on high-throughput payment infrastructure. Care deeply about correctness and latency.",
    postedAt: "2026-09-25",
  },
  {
    id: "j5",
    title: "Frontend Engineer",
    company: "Linear",
    companyInitial: "L",
    location: "Remote",
    remote: true,
    level: "mid",
    salaryMin: 130000,
    salaryMax: 180000,
    tags: ["React", "TypeScript", "CSS", "Motion"],
    description:
      "Craft a polished, fast app used by thousands of teams. Obsess over interaction details.",
    postedAt: "2026-09-29",
  },
  {
    id: "j6",
    title: "Junior Software Engineer",
    company: "Shopify",
    companyInitial: "S",
    location: "Remote",
    remote: true,
    level: "junior",
    salaryMin: 80000,
    salaryMax: 110000,
    tags: ["Ruby", "React", "GraphQL"],
    description:
      "Join a supportive team building commerce tools for millions of merchants.",
    postedAt: "2026-09-20",
  },
  {
    id: "j7",
    title: "Staff Engineer, Platform",
    company: "Vercel",
    companyInitial: "V",
    location: "Remote",
    remote: true,
    level: "lead",
    salaryMin: 200000,
    salaryMax: 280000,
    tags: ["TypeScript", "Rust", "Edge", "CI/CD"],
    description:
      "Lead platform architecture. Set technical direction across teams.",
    postedAt: "2026-09-24",
  },
  {
    id: "j8",
    title: "Product Engineer",
    company: "Notion",
    companyInitial: "N",
    location: "Hybrid",
    remote: false,
    level: "mid",
    salaryMin: 140000,
    salaryMax: 190000,
    tags: ["React", "TypeScript", "Node.js"],
    description:
      "Work across product surfaces with high autonomy. Ship weekly.",
    postedAt: "2026-09-22",
  },
  {
    id: "j9",
    title: "Software Engineer, Data",
    company: "Figma",
    companyInitial: "F",
    location: "Hybrid",
    remote: false,
    level: "mid",
    salaryMin: 140000,
    salaryMax: 185000,
    tags: ["Python", "SQL", "Spark", "AWS"],
    description:
      "Build data pipelines and analytics that inform product decisions.",
    postedAt: "2026-09-23",
  },
  {
    id: "j10",
    title: "Frontend Developer",
    company: "Spotify",
    companyInitial: "S",
    location: "Remote",
    remote: true,
    level: "mid",
    salaryMin: 120000,
    salaryMax: 165000,
    tags: ["React", "TypeScript", "Web Audio"],
    description:
      "Shape how millions of listeners experience music. Focus on performance and delight.",
    postedAt: "2026-09-21",
  },
  {
    id: "j11",
    title: "Backend Developer",
    company: "Discord",
    companyInitial: "D",
    location: "Remote",
    remote: true,
    level: "senior",
    salaryMin: 150000,
    salaryMax: 200000,
    tags: ["Elixir", "Rust", "PostgreSQL", "Kubernetes"],
    description:
      "Work on real-time messaging infrastructure. High scale, low latency.",
    postedAt: "2026-09-26",
  },
  {
    id: "j12",
    title: "Software Engineer",
    company: "Airbnb",
    companyInitial: "A",
    location: "Hybrid",
    remote: false,
    level: "mid",
    salaryMin: 130000,
    salaryMax: 175000,
    tags: ["Java", "Kotlin", "React", "AWS"],
    description:
      "Build core booking and trust systems. Collaborate across global teams.",
    postedAt: "2026-09-19",
  },
];

/* ---------- filtering ---------- */

function matchesFilters(job: Job, f: JobFilters): boolean {
  if (f.query) {
    const q = f.query.toLowerCase();
    const inText =
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.tags.some((t) => t.toLowerCase().includes(q));
    if (!inText) return false;
  }

  if (f.location && f.location !== "All locations") {
    if (!job.location.toLowerCase().includes(f.location.toLowerCase())) return false;
  }

  if (f.remoteOnly && !job.remote) return false;

  if (f.level !== "all" && job.level !== f.level) return false;

  if (f.minSalary > 0 && job.salaryMax < f.minSalary) return false;

  return true;
}

/* ---------- match scoring ---------- */

function computeMatch(
  job: Job,
  resume: Resume | null,
  _ats: ATSAnalysis | null,
): JobMatch {
  const resumeSkills = new Set(
    (resume?.skills ?? []).map((s) => s.toLowerCase()),
  );

  const matched: string[] = [];
  const missing: string[] = [];

  for (const tag of job.tags) {
    const t = tag.toLowerCase();
    const hit =
      resumeSkills.has(t) ||
      [...resumeSkills].some((s) => s.includes(t) || t.includes(s));
    if (hit) matched.push(tag);
    else missing.push(tag);
  }

  const total = job.tags.length || 1;
  const baseScore = Math.round((matched.length / total) * 100);

  // Small bonus if resume exists at all — otherwise score reads as 0 for empty resumes
  const score = resume ? baseScore : 0;

  return {
    jobId: job.id,
    score,
    matchedSkills: matched,
    missingSkills: missing,
  };
}

/* ---------- public API ---------- */

export const jobApi = {
  async list(filters: JobFilters): Promise<Job[]> {
    const filtered = JOBS.filter((j) => matchesFilters(j, filters));
    // Sort newest first
    filtered.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    return delay(filtered);
  },

  async match(
    jobs: Job[],
    resume: Resume | null,
    ats: ATSAnalysis | null,
  ): Promise<JobMatch[]> {
    return delay(jobs.map((j) => computeMatch(j, resume, ats)));
  },
};