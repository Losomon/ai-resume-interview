import { z } from "zod";
export const coachMessage = z.object({ id: z.string(), role: z.enum(["user", "assistant"]), content: z.string().max(4000), createdAt: z.string() });
export type CoachMessage = z.infer<typeof coachMessage>;
export const learningStep = z.object({ id: z.string(), skill: z.string(), title: z.string(), kind: z.enum(["evidence", "learn"]), done: z.boolean() });
export const learningPlan = z.object({ generatedAt: z.string(), analysisId: z.string(), steps: z.array(learningStep) });
export type LearningPlan = z.infer<typeof learningPlan>;
