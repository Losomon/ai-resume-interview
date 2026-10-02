import { create } from 'zustand';
import { resumeApi } from '@/services/resume.api';
import type { Resume } from '@/types/resume';

type ResumeState = {
  resumes: Resume[];
  activeId: string | null;
  loading: boolean;
  saving: boolean;
  error: string | null;

  // list / mutate
  fetchAll: () => Promise<void>;
  create: (title: string) => Promise<Resume>;
  remove: (id: string) => Promise<void>;
  update: (id: string, patch: Partial<Resume>) => Promise<Resume>;

  // builder
  load: (id: string) => Promise<Resume>;
  save: (id: string, patch: Partial<Resume>) => Promise<Resume>;

  // misc
  setActive: (id: string | null) => void;
  clearError: () => void;
};

export const useResumeStore = create<ResumeState>((set, get) => ({
  resumes: [],
  activeId: null,
  loading: false,
  saving: false,
  error: null,

  /* ---------- list / mutate ---------- */

  async fetchAll() {
    set({ loading: true, error: null });
    try {
      const resumes = await resumeApi.list();
      set({ resumes, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  async create(title) {
    const resume = await resumeApi.create(title);
    set((s) => ({ resumes: [resume, ...s.resumes] }));
    return resume;
  },

  async remove(id) {
    await resumeApi.remove(id);
    set((s) => ({
      resumes: s.resumes.filter((r) => r.id !== id),
      activeId: s.activeId === id ? null : s.activeId,
    }));
  },

  async update(id, patch) {
    const updated = await resumeApi.update(id, patch);
    set((s) => ({
      resumes: s.resumes.map((r) => (r.id === id ? updated : r)),
    }));
    return updated;
  },

  /* ---------- builder ---------- */

  async load(id) {
    // Already in memory — just activate it
    const existing = get().resumes.find((r) => r.id === id);
    if (existing) {
      set({ activeId: id });
      return existing;
    }

    // Fetch from API
    set({ loading: true, error: null });
    try {
      const resume = await resumeApi.get(id);
      if (!resume) throw new Error('Resume not found');
      set((s) => ({
        resumes: [resume, ...s.resumes],
        activeId: id,
        loading: false,
      }));
      return resume;
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
      throw e;
    }
  },

  async save(id, patch) {
    set({ saving: true });
    try {
      const updated = await resumeApi.update(id, patch);
      set((s) => ({
        resumes: s.resumes.map((r) => (r.id === id ? updated : r)),
        saving: false,
      }));
      return updated;
    } catch (e) {
      set({ saving: false, error: (e as Error).message });
      throw e;
    }
  },

  /* ---------- misc ---------- */

  setActive(id) {
    set({ activeId: id });
  },

  clearError() {
    set({ error: null });
  },
}));
