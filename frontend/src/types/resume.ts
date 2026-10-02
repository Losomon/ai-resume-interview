export type ResumeSection = 'profile' | 'experience' | 'education' | 'skills' | 'projects';

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
};

export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
};

export type Resume = {
  id: string;
  title: string;
  fullName: string;
  headline: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
  atsScore?: number;
};

/* ---------- Phase 5 additions ---------- */

export type AISuggestion = {
  id: string;
  original: string;
  suggested: string;
  reason?: string;
};

export type EditorDraft = {
  resumeId: string;
  dirty: boolean;
  lastSavedAt: string | null;
};

/* ---------- Phase 8 additions ---------- */

export type ATSKeywordMatch = {
  keyword: string;
  matched: boolean;
  /** true if the resume would need a *new claim* to match — never auto-suggested */
  needsEvidence: boolean;
};

export type ATSScoreBreakdown = {
  overall: number; // 0–100
  keywords: number; // 0–100
  experience: number; // 0–100
  formatting: number; // 0–100
  skills: number; // 0–100
};

export type ATSMissing = {
  keyword: string;
  /** "evidence" = probably has it, just not written; "gap" = likely doesn't have it yet */
  kind: 'evidence' | 'gap';
};

export type ATSAnalysis = {
  resumeId: string;
  jobDescription: string;
  score: ATSScoreBreakdown;
  matches: ATSKeywordMatch[];
  missing: ATSMissing[];
  strengths: string[];
  suggestions: string[];
  analyzedAt: string;
};
