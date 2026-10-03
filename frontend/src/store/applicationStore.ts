import { create } from "zustand";
import { applicationApi } from "@/services/application.api";
import type { Application, ApplicationStage } from "@/types/resume";

type ApplicationState = {
  applications: Application[];
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  add: (draft: Omit<Application, "id" | "stage" | "notes" | "appliedAt" | "updatedAt">) => Promise<Application>;
  move: (id: string, stage: ApplicationStage) => Promise<void>;
  updateNotes: (id: string, notes: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clearError: () => void;
};

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  applications: [],
  loading: false,
  error: null,

  async fetchAll() {
    set({ loading: true, error: null });
    try {
      const applications = await applicationApi.list();
      set({ applications, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  async add(draft) {
    const app = await applicationApi.create(draft);
    set((s) => ({ applications: [app, ...s.applications] }));
    return app;
  },

  async move(id, stage) {
    // Optimistic update
    const prev = get().applications;
    set({
      applications: prev.map((a) =>
        a.id === id
          ? {
              ...a,
              stage,
              appliedAt:
                a.stage === "saved" && stage !== "saved" && !a.appliedAt
                  ? new Date().toISOString()
                  : a.appliedAt,
              updatedAt: new Date().toISOString(),
            }
          : a,
      ),
    });

    try {
      const updated = await applicationApi.update(id, { stage });
      set((s) => ({
        applications: s.applications.map((a) => (a.id === id ? updated : a)),
      }));
    } catch (e) {
      // Roll back
      set({ applications: prev, error: (e as Error).message });
    }
  },

  async updateNotes(id, notes) {
    const updated = await applicationApi.update(id, { notes });
    set((s) => ({
      applications: s.applications.map((a) => (a.id === id ? updated : a)),
    }));
  },

  async remove(id) {
    await applicationApi.remove(id);
    set((s) => ({ applications: s.applications.filter((a) => a.id !== id) }));
  },

  clearError() {
    set({ error: null });
  },
}));