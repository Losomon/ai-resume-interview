import type { Application, ApplicationStage } from "@/types/resume";

const STORAGE_KEY = "careerforge-applications";
const LATENCY = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY));
}

function read(): Application[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Application[];
  } catch {
    return [];
  }
}

function write(apps: Application[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export const applicationApi = {
  async list(): Promise<Application[]> {
    return delay(
      read().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    );
  },

  async create(draft: Application["id"] extends never ? never : Omit<Application, "id" | "stage" | "notes" | "appliedAt" | "updatedAt">): Promise<Application> {
    const now = new Date().toISOString();
    const app: Application = {
      id: crypto.randomUUID(),
      stage: "saved",
      notes: "",
      appliedAt: null,
      updatedAt: now,
      ...draft,
    };
    const all = read();
    all.push(app);
    write(all);
    return delay(app);
  },

  async update(id: string, patch: Partial<Application>): Promise<Application> {
    const all = read();
    const idx = all.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error("Application not found");

    const prev = all[idx];
    const next: Application = {
      ...prev,
      ...patch,
      updatedAt: new Date().toISOString(),
    };

    // Set appliedAt when first moving out of "saved"
    if (prev.stage === "saved" && patch.stage && patch.stage !== "saved" && !prev.appliedAt) {
      next.appliedAt = new Date().toISOString();
    }

    all[idx] = next;
    write(all);
    return delay(next);
  },

  async remove(id: string): Promise<void> {
    const all = read().filter((a) => a.id !== id);
    write(all);
    return delay(undefined);
  },

  async hasByJobId(jobId: string): Promise<boolean> {
    return delay(read().some((a) => a.jobId === jobId));
  },
};

/* ---------- stage metadata ---------- */

export const STAGES: {
  id: ApplicationStage;
  label: string;
  tone: "neutral" | "info" | "attention" | "progress" | "problem";
}[] = [
  { id: "saved",     label: "Saved",     tone: "neutral" },
  { id: "applied",   label: "Applied",   tone: "info" },
  { id: "interview", label: "Interview", tone: "attention" },
  { id: "offer",     label: "Offer",     tone: "progress" },
  { id: "rejected",  label: "Rejected",  tone: "problem" },
];