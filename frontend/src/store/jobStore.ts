import { create } from "zustand";
import { jobApi } from "@/services/job.api";
import type {
  ATSAnalysis,
  Job,
  JobFilters,
  JobMatch,
  Resume,
} from "@/types/resume";

type JobState = {
  jobs: Job[];
  matches: Record<string, JobMatch>;
  filters: JobFilters;
  loading: boolean;
  error: string | null;
  saved: string[];

  setFilters: (patch: Partial<JobFilters>) => void;
  search: (resume: Resume | null, ats: ATSAnalysis | null) => Promise<void>;
  toggleSaved: (jobId: string) => void;
};

const DEFAULT_FILTERS: JobFilters = {
  query: "",
  location: "All locations",
  remoteOnly: false,
  level: "all",
  minSalary: 0,
};

export const useJobStore = create<JobState>()((set, get) => ({
  jobs: [],
  matches: {},
  filters: DEFAULT_FILTERS,
  loading: false,
  error: null,
  saved: [],

  setFilters(patch) {
    set({ filters: { ...get().filters, ...patch } });
  },

  async search(resume, ats) {
    set({ loading: true, error: null });
    try {
      const jobs = await jobApi.list(get().filters);
      const matchList = await jobApi.match(jobs, resume, ats);
      const matches = Object.fromEntries(matchList.map((m) => [m.jobId, m]));
      set({ jobs, matches, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  toggleSaved(jobId) {
    set((s) => ({
      saved: s.saved.includes(jobId)
        ? s.saved.filter((id) => id !== jobId)
        : [...s.saved, jobId],
    }));
  },
}));