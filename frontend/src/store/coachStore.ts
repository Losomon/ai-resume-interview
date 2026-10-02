import { create } from "zustand";
import { persist } from "zustand/middleware";
import { coachApi } from "@/services/coach.api";
import type {
  ATSAnalysis,
  CoachMessage,
  LearningPlan,
  Resume,
} from "@/types/resume";

type CoachState = {
  messages: CoachMessage[];
  plan: LearningPlan | null;
  thinking: boolean;
  planning: boolean;
  error: string | null;

  send: (text: string, resume: Resume | null, ats: ATSAnalysis | null) => Promise<void>;
  generatePlan: (resume: Resume | null, ats: ATSAnalysis | null, goal: string) => Promise<void>;
  toggleStep: (stepId: string) => void;
  reset: () => void;
};

export const useCoachStore = create<CoachState>()(
  persist(
    (set, get) => ({
      messages: [],
      plan: null,
      thinking: false,
      planning: false,
      error: null,

      async send(text, resume, ats) {
        const userMsg: CoachMessage = {
          id: crypto.randomUUID(),
          role: "user",
          text,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ messages: [...s.messages, userMsg], thinking: true }));

        try {
          const reply = await coachApi.reply(text, resume, ats);
          set((s) => ({ messages: [...s.messages, reply], thinking: false }));
        } catch (e) {
          set({ thinking: false, error: (e as Error).message });
        }
      },

      async generatePlan(resume, ats, goal) {
        set({ planning: true, error: null });
        try {
          const plan = await coachApi.generatePlan(resume, ats, goal);
          set({ plan, planning: false });
        } catch (e) {
          set({ planning: false, error: (e as Error).message });
        }
      },

      toggleStep(stepId) {
        const plan = get().plan;
        if (!plan) return;
        set({
          plan: {
            ...plan,
            steps: plan.steps.map((s) =>
              s.id === stepId ? { ...s, completed: !s.completed } : s,
            ),
          },
        });
      },

      reset() {
        set({ messages: [], plan: null, thinking: false, planning: false, error: null });
      },
    }),
    {
      name: "careerforge-coach",
      partialize: (s) => ({ messages: s.messages, plan: s.plan }),
    },
  ),
);