import { z } from "zod";
export const APPLICATION_STAGES = ["saved", "applied", "interviewing", "offer", "rejected"] as const;
export const applicationCreate = z.object({ company: z.string().trim().min(1).max(120), title: z.string().trim().min(1).max(120), stage: z.enum(APPLICATION_STAGES).default("saved"),
  jobId: z.string().uuid().optional(), resumeId: z.string().uuid().optional(), notes: z.string().max(5000).default("") });
export const applicationPatch = z.object({ company: z.string().trim().min(1).max(120), title: z.string().trim().min(1).max(120), stage: z.enum(APPLICATION_STAGES), notes: z.string().max(5000),
  position: z.number().int().min(0), resumeId: z.string().uuid().nullable() }).partial();
export type ApplicationCreate = z.infer<typeof applicationCreate>; export type ApplicationPatch = z.infer<typeof applicationPatch>;
