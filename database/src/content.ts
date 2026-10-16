import { z } from "zod";

/** Shape of resumes.content (JSONB). Validate at the API edge; the database stores it as-is. */
export const resumeContent = z.object({
  summary: z.string().max(2000).optional(),
  contact: z.object({
    email: z.string().optional(), phone: z.string().optional(), location: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }).partial().optional(),
  experience: z.array(z.object({
    company: z.string(), title: z.string(), start: z.string(), end: z.string().nullable().optional(),
    bullets: z.array(z.string()).default([]),
  })).default([]),
  education: z.array(z.object({
    school: z.string(), degree: z.string().optional(), start: z.string().optional(), end: z.string().optional(),
  })).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(z.object({ name: z.string(), description: z.string().optional(), bullets: z.array(z.string()).default([]) })).default([]),
}).partial();

export type ResumeContent = z.infer<typeof resumeContent>;
