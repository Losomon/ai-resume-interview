import { create } from "zustand";
import { atsApi } from "@/services/ats.api";
import type { ATSAnalysis, Resume } from "@/types/resume";

type ATSState = {
  jobDescription: string;
  analysis: ATSAnalysis | null;
  analyzing: boolean;
  error: string | null;

  setJobDescription: (jd: string) => void;
  analyze: (resume: Resume) => Promise<ATSAnalysis>;
  reset: () => void;
};

export const useATSStore = create<ATSState>((set, get) => ({
  jobDescription: "",
  analysis: null,
  analyzing: false,
  error: null,

  setJobDescription(jobDescription) {
    set({ jobDescription });
  },

  async analyze(resume) {
    const jd = get().jobDescription;
    set({ analyzing: true, error: null });
    try {
      const analysis = await atsApi.analyze(resume, jd);
      set({ analysis, analyzing: false });
      return analysis;
    } catch (e) {
      set({ error: (e as Error).message, analyzing: false });
      throw e;
    }
  },

  reset() {
    set({ jobDescription: "", analysis: null, analyzing: false, error: null });
  },
}));