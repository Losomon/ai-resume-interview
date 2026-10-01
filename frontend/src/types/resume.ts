export type ResumeSection =
  | "profile"
  | "experience"
  | "education"
  | "skills"
  | "projects";

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