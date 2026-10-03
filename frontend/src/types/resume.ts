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

/* ---------- Phase 9 additions ---------- */

export type InterviewConfig = {
  role: string;
  level: 'junior' | 'mid' | 'senior' | 'lead';
  type: 'behavioral' | 'technical' | 'mixed';
  questionCount: number;
};

export type InterviewQuestion = {
  id: string;
  text: string;
  category: 'behavioral' | 'technical' | 'situational';
  hint?: string;
};

export type InterviewAnswer = {
  questionId: string;
  text: string;
  durationSec: number;
};

export type InterviewScores = {
  overall: number;
  communication: number;
  technical: number;
  confidence: number;
};

export type InterviewFeedback = {
  scores: InterviewScores;
  strengths: string[];
  improvements: string[];
  perQuestion: {
    questionId: string;
    note: string;
  }[];
};

export type InterviewSession = {
  id: string;
  config: InterviewConfig;
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  feedback?: InterviewFeedback;
  startedAt: string;
  completedAt?: string;
};

/* ---------- Phase 10 additions ---------- */

export type CoachMessage = {
  id: string;
  role: 'user' | 'coach';
  text: string;
  createdAt: string;
};

export type LearningPlanStep = {
  id: string;
  title: string;
  description: string;
  category: 'skill' | 'portfolio' | 'certification' | 'interview' | 'resume';
  /** Rough time commitment in hours */
  estimatedHours: number;
  completed: boolean;
};

export type LearningPlan = {
  id: string;
  goal: string;
  summary: string;
  steps: LearningPlanStep[];
  createdAt: string;
};

/* ---------- Phase 11 additions ---------- */

export type JobLevel = 'junior' | 'mid' | 'senior' | 'lead';

export type Job = {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  location: string;
  remote: boolean;
  level: JobLevel;
  salaryMin: number;
  salaryMax: number;
  tags: string[];
  description: string;
  postedAt: string;
};

export type JobMatch = {
  jobId: string;
  score: number; // 0–100
  matchedSkills: string[];
  missingSkills: string[];
};

export type JobFilters = {
  query: string;
  location: string;
  remoteOnly: boolean;
  level: JobLevel | 'all';
  minSalary: number;
};

/* ---------- Phase 13 additions ---------- */

export type ApplicationStage = 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyInitial: string;
  location: string;
  stage: ApplicationStage;
  notes: string;
  appliedAt: string | null;
  updatedAt: string;
  /** Snapshot of match score at save-time */
  matchScore?: number;
};

export type ApplicationDraft = {
  jobId: string;
  jobTitle: string;
  company: string;
  companyInitial: string;
  location: string;
  matchScore?: number;
};
