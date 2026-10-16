/**
 * Deterministic, rules-based ATS analysis ("rules-v1").
 * It only classifies keywords against text the user actually wrote.
 * It never adds skills, employers or facts to a resume.
 */

// Canonical skill -> aliases (lowercase).
const VOCAB: Record<string, string[]> = {
  'React': ['react', 'react.js', 'reactjs'],
  'TypeScript': ['typescript'],
  'JavaScript': ['javascript', 'js', 'ecmascript'],
  'Node.js': ['node.js', 'nodejs', 'node'],
  'PostgreSQL': ['postgresql', 'postgres'],
  'MySQL': ['mysql'],
  'MongoDB': ['mongodb', 'mongo'],
  'Java': ['java'],
  'Spring Boot': ['spring boot', 'springboot', 'spring'],
  'Python': ['python'],
  'Django': ['django'],
  'AWS': ['aws', 'amazon web services'],
  'Docker': ['docker'],
  'Kubernetes': ['kubernetes', 'k8s'],
  'CI/CD': ['ci/cd', 'cicd', 'continuous integration', 'github actions', 'jenkins'],
  'GraphQL': ['graphql'],
  'REST APIs': ['rest', 'restful', 'rest api', 'rest apis'],
  'SQL': ['sql'],
  'Git': ['git'],
  'Agile': ['agile', 'scrum'],
};

// Having the key skill makes the value plausible-but-unwritten ("missing evidence").
const RELATED: Record<string, string[]> = {
  'Spring Boot': ['Java'],
  'AWS': ['Docker', 'Node.js', 'Python'],
  'CI/CD': ['Git', 'Docker'],
  'Docker': ['CI/CD', 'AWS'],
  'Kubernetes': ['Docker'],
  'GraphQL': ['React', 'Node.js', 'TypeScript'],
  'REST APIs': ['Node.js', 'Java', 'Python', 'Spring Boot', 'Django'],
  'Django': ['Python'],
  'PostgreSQL': ['SQL', 'MySQL'],
  'TypeScript': ['JavaScript'],
  'React': ['JavaScript', 'TypeScript'],
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
const has = (text: string, aliases: string[]) =>
  aliases.some((a) => new RegExp(`(^|[^a-z0-9+#.])${escape(a)}($|[^a-z0-9+#])`, 'i').test(text));

export function flattenContent(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(flattenContent).join('\n');
  if (typeof value === 'object') return Object.values(value as object).map(flattenContent).join('\n');
  return '';
}

export type AtsReport = {
  engine: 'rules-v1';
  score: number;
  matched: string[];
  evidence: { keyword: string; because: string[] }[];
  gaps: string[];
  summary: string;
};

export function analyze(resumeText: string, jobDescription: string): AtsReport {
  const text = resumeText.toLowerCase();
  const jd = jobDescription.toLowerCase();
  const required = Object.keys(VOCAB).filter((k) => has(jd, VOCAB[k]));
  const resumeHas = (k: string) => has(text, VOCAB[k]);

  const matched: string[] = [];
  const evidence: AtsReport['evidence'] = [];
  const gaps: string[] = [];

  for (const k of required) {
    if (resumeHas(k)) { matched.push(k); continue; }
    const because = (RELATED[k] ?? []).filter(resumeHas);
    if (because.length) evidence.push({ keyword: k, because });
    else gaps.push(k);
  }

  const score = required.length
    ? Math.round(((matched.length + evidence.length * 0.5) / required.length) * 100)
    : 0;

  const summary = required.length
    ? `${matched.length} of ${required.length} required skills are on your resume. ` +
      `${evidence.length} may already apply but aren't written down. ${gaps.length} look like real gaps.`
    : 'No recognized skills were found in this job description.';

  return { engine: 'rules-v1', score, matched, evidence, gaps, summary };
}
