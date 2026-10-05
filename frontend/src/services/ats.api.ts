import type { Resume } from "@/types/resume";
import type {
  ATSAnalysis,
  ATSKeywordMatch,
  ATSMissing,
  ATSScoreBreakdown,
} from "@/types/resume";

const LATENCY = 1100;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY));
}

/* ---------- keyword extraction ---------- */

const STOPWORDS = new Set([
  "and", "or", "the", "a", "an", "to", "of", "in", "for", "with", "on",
  "at", "by", "is", "are", "be", "as", "we", "you", "your", "our", "will",
  "this", "that", "from", "have", "has", "experience", "work", "role",
  "team", "job", "position", "candidate", "ability", "strong", "good",
  "excellent", "including", "etc", "such", "plus", "using",
]);

function extractKeywords(jd: string): string[] {
  const words = jd
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));

  // Preserve order, dedupe
  const seen = new Set<string>();
  const out: string[] = [];
  for (const w of words) {
    if (!seen.has(w)) {
      seen.add(w);
      out.push(w);
    }
  }
  return out.slice(0, 40);
}

/* ---------- matching ---------- */

function buildHaystack(resume: Resume): string {
  const parts = [
    resume.headline,
    resume.summary,
    ...resume.skills,
    ...resume.experience.flatMap((e) => [e.role, e.company, e.description]),
    ...resume.education.flatMap((e) => [e.degree, e.institution]),
  ];
  return parts.join(" ").toLowerCase();
}

function matchKeywords(resume: Resume, keywords: string[]): ATSKeywordMatch[] {
  const haystack = buildHaystack(resume);
  const resumeSkills = new Set(resume.skills.map((s) => s.toLowerCase()));

  return keywords.map((keyword) => {
    const matched = haystack.includes(keyword);
    // needsEvidence: not matched, but the user has related skills listed
    const looksRelated =
      !matched &&
      [...resumeSkills].some(
        (s) => s.includes(keyword) || keyword.includes(s),
      );

    return {
      keyword,
      matched,
      needsEvidence: looksRelated,
    };
  });
}

/* ---------- scoring ---------- */

function scoreFromMatches(matches: ATSKeywordMatch[]): number {
  if (matches.length === 0) return 0;
  const hit = matches.filter((m) => m.matched).length;
  return Math.round((hit / matches.length) * 100);
}

function scoreExperience(resume: Resume): number {
  if (resume.experience.length === 0) return 0;
  const withMetrics = resume.experience.filter((e) =>
    /\d+%|\d+x|\$\d|reduced|increased|improved|grew|saved/i.test(e.description),
  ).length;
  const ratio = withMetrics / resume.experience.length;
  return Math.round(50 + ratio * 50);
}

function scoreFormatting(resume: Resume): number {
  let score = 100;
  if (!resume.summary) score -= 20;
  if (!resume.headline) score -= 15;
  if (resume.skills.length < 5) score -= 15;
  if (resume.experience.some((e) => e.description.length < 40)) score -= 10;
  if (resume.experience.some((e) => !e.endDate && !/present/i.test(e.startDate))) {
    score -= 5;
  }
  return Math.max(0, score);
}

function buildBreakdown(
  resume: Resume,
  matches: ATSKeywordMatch[],
): ATSScoreBreakdown {
  const keywords = scoreFromMatches(matches);
  const experience = scoreExperience(resume);
  const formatting = scoreFormatting(resume);
  const skills = Math.min(100, Math.round((resume.skills.length / 12) * 100));

  const overall = Math.round(
    keywords * 0.4 + experience * 0.3 + skills * 0.2 + formatting * 0.1,
  );

  return { overall, keywords, experience, formatting, skills };
}

/* ---------- missing / strengths ---------- */

function buildMissing(matches: ATSKeywordMatch[]): ATSMissing[] {
  return matches
    .filter((m) => !m.matched)
    .map((m): ATSMissing => ({
      keyword: m.keyword,
      kind: m.needsEvidence ? 'evidence' : 'gap',
    }))
    .slice(0, 8);
}

function buildStrengths(
  resume: Resume,
  breakdown: ATSScoreBreakdown,
): string[] {
  const out: string[] = [];
  if (breakdown.keywords >= 80) out.push("Strong keyword alignment with the job description.");
  if (breakdown.experience >= 80) out.push("Experience bullets include measurable outcomes.");
  if (resume.skills.length >= 8) out.push("Broad and specific skills section.");
  if (resume.summary.length > 120) out.push("Detailed professional summary.");
  if (out.length === 0) out.push("Resume has the core sections in place — ready to refine.");
  return out;
}

function buildSuggestions(
  breakdown: ATSScoreBreakdown,
  missing: ATSMissing[],
): string[] {
  const out: string[] = [];

  if (breakdown.keywords < 70) {
    out.push("Add more keywords from the job description to your skills and experience.");
  }
  if (breakdown.experience < 70) {
    out.push("Quantify at least one bullet per role with a number, %, or $ figure.");
  }
  if (breakdown.skills < 60) {
    out.push("Expand the skills section to at least 10 relevant items.");
  }
  if (breakdown.formatting < 80) {
    out.push("Fill in missing fields — summary, headline, or end dates.");
  }

  const evidenceOnly = missing.filter((m) => m.kind === "evidence");
  if (evidenceOnly.length > 0) {
    out.push(
      `You may already have experience with ${evidenceOnly
        .slice(0, 3)
        .map((m) => m.keyword)
        .join(", ")} — make it explicit if so.`,
    );
  }

  return out.slice(0, 4);
}

/* ---------- public API ---------- */

export const atsApi = {
  async analyze(resume: Resume, jobDescription: string): Promise<ATSAnalysis> {
    if (!jobDescription.trim()) {
      throw new Error("Please paste a job description to analyze.");
    }

    const keywords = extractKeywords(jobDescription);
    const matches = matchKeywords(resume, keywords);
    const score = buildBreakdown(resume, matches);
    const missing = buildMissing(matches);
    const strengths = buildStrengths(resume, score);
    const suggestions = buildSuggestions(score, missing);

    return delay({
      resumeId: resume.id,
      jobDescription,
      score,
      matches,
      missing,
      strengths,
      suggestions,
      analyzedAt: new Date().toISOString(),
    });
  },
};