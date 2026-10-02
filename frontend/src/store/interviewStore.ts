import { create } from "zustand";
import { persist } from "zustand/middleware";
import { interviewApi } from "@/services/interview.api";
import type {
  InterviewConfig,
  InterviewQuestion,
  InterviewAnswer,
  InterviewFeedback,
  InterviewSession,
} from "@/types/resume";

type InterviewState = {
  session: InterviewSession | null;
  generating: boolean;
  evaluating: boolean;
  error: string | null;

  start: (config: InterviewConfig) => Promise<InterviewQuestion[]>;
  answer: (questionId: string, text: string, durationSec: number) => void;
  submit: () => Promise<InterviewFeedback>;
  reset: () => void;
};

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set, get) => ({
      session: null,
      generating: false,
      evaluating: false,
      error: null,

      async start(config) {
        set({ generating: true, error: null });
        try {
          const questions = await interviewApi.generate(config);
          const session: InterviewSession = {
            id: crypto.randomUUID(),
            config,
            questions,
            answers: [],
            startedAt: new Date().toISOString(),
          };
          set({ session, generating: false });
          return questions;
        } catch (e) {
          set({ error: (e as Error).message, generating: false });
          throw e;
        }
      },

      answer(questionId, text, durationSec) {
        const session = get().session;
        if (!session) return;
        const existing = session.answers.find((a) => a.questionId === questionId);
        const answers = existing
          ? session.answers.map((a) =>
              a.questionId === questionId ? { ...a, text, durationSec } : a,
            )
          : [...session.answers, { questionId, text, durationSec }];
        set({ session: { ...session, answers } });
      },

      async submit() {
        const session = get().session;
        if (!session) throw new Error("No active interview session.");
        set({ evaluating: true, error: null });
        try {
          const feedback = await interviewApi.evaluate(session.answers);
          const completed: InterviewSession = {
            ...session,
            feedback,
            completedAt: new Date().toISOString(),
          };
          set({ session: completed, evaluating: false });
          return feedback;
        } catch (e) {
          set({ error: (e as Error).message, evaluating: false });
          throw e;
        }
      },

      reset() {
        set({ session: null, generating: false, evaluating: false, error: null });
      },
    }),
    {
      name: "careerforge-interview",
      partialize: (s) => ({ session: s.session }),
    },
  ),
);