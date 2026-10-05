import type { ResumeContent, Gap } from "../types.js";
export const MODEL_VERSION = "rules-v1";
const SKILLS = ["java", "spring boot", "python", "javascript", "typescript", "node.js", "react", "sql", "postgresql", "mysql", "mongodb", "redis", "docker", "kubernetes", "aws", "azure", "gcp", "ci/cd", "terraform", "rest", "graphql", "microservices", "git", "linux", "testing", "junit", "agile"];
/** If a required skill is absent but a related one is present, it is "missing evidence" (maybe real, just not shown) rather than a gap. */
const RELATED: Record<string, string[]> = { "spring boot": ["java", "spring"], docker: ["kubernetes", "ci/cd", "linux"], kubernetes: ["docker"], aws: ["azure", "gcp"], azure: ["aws", "gcp"], gcp: ["aws", "azure"],
  typescript: ["javascript"], "node.js": ["javascript", "typescript"], react: ["javascript", "typescript"], postgresql: ["sql", "mysql"], mysql: ["sql", "postgresql"], junit: ["testing", "java"], terraform: ["aws", "azure", "gcp"] };
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const has = (text: string, k: string) => new RegExp(`(^|[^a-z0-9+#])${esc(k)}($|[^a-z0-9+#])`).test(text);
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

/** Deterministic and reproducible: same input and MODEL_VERSION give the same result (doc 09). Never invents facts. */
export function analyze(r: ResumeContent, jobDescription: string) {
  const jd = jobDescription.toLowerCase();
  const required = SKILLS.filter((k) => has(jd, k));
  if (required.length === 0) return null;
  const text = [r.title, r.summary, ...r.skills, ...r.experience.flatMap((e) => [e.role, e.company, ...e.bullets]), ...r.projects.flatMap((p) => [p.name, p.description])].join("\n").toLowerCase();
  const listed = new Set(r.skills.map((s) => s.toLowerCase().trim()));
  const matched: string[] = [], missingEvidence: Gap[] = [], skillGaps: Gap[] = [];
  for (const k of required) {
    const rel = (RELATED[k] ?? []).filter((x) => has(text, x));
    if (has(text, k)) matched.push(k);
    else if (rel.length) missingEvidence.push({ skill: k, hint: `You show related experience (${rel.join(", ")}). If you have used ${k}, add where.` });
    else skillGaps.push({ skill: k, hint: `Not found in your resume. Build it or leave it off; don't claim it.` });
  }
  const strongRoles = r.experience.filter((e) => e.bullets.filter((b) => b.trim().length > 20).length >= 2).length;
  const checks = [r.fullName, r.title, r.summary, r.skills.length >= 5, r.experience.length >= 1];
  const breakdown = { keywords: pct(matched.length, required.length), experience: Math.min(100, Math.round((strongRoles / 2) * 100)),
    skills: pct(required.filter((k) => listed.has(k)).length, required.length), formatting: pct(checks.filter(Boolean).length, checks.length) };
  const score = Math.round(0.35 * breakdown.keywords + 0.3 * breakdown.experience + 0.25 * breakdown.skills + 0.1 * breakdown.formatting);
  const suggestions: string[] = [];
  if (breakdown.experience < 100) suggestions.push("Give each recent role at least two specific, measurable bullets.");
  if (!r.summary) suggestions.push("Add a short summary aimed at this role.");
  if (r.skills.length < 5) suggestions.push("List your core skills in a dedicated section.");
  if (missingEvidence.length) suggestions.push(`Show evidence for: ${missingEvidence.map((m) => m.skill).join(", ")} (only if true).`);
  return { score, breakdown, matched, missingEvidence, skillGaps, suggestions, modelVersion: MODEL_VERSION };
}
