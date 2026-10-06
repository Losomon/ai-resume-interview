import { z } from "zod";
const id = z.string().max(64);
export const resumeContent = z.object({
  fullName: z.string().max(120).default(""), title: z.string().max(120).default(""), summary: z.string().max(1500).default(""),
  skills: z.array(z.string().max(60)).max(60).default([]),
  experience: z.array(z.object({ id, role: z.string().max(120).default(""), company: z.string().max(120).default(""), start: z.string().max(20).default(""), end: z.string().max(20).default(""), bullets: z.array(z.string().max(500)).max(12).default([]) })).max(20).default([]),
  education: z.array(z.object({ id, school: z.string().max(120).default(""), degree: z.string().max(120).default(""), year: z.string().max(20).default("") })).max(10).default([]),
  projects: z.array(z.object({ id, name: z.string().max(120).default(""), description: z.string().max(800).default("") })).max(15).default([]),
});
export type ResumeContent = z.infer<typeof resumeContent>;
