import type { Resume } from "@/types/resume";

const STORAGE_KEY = "careerforge-resumes";
const LATENCY = 400;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY));
}

function read(): Resume[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Resume[];
  } catch {
    return [];
  }
}

function write(resumes: Resume[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
}

function makeId() {
  return crypto.randomUUID();
}

function emptyResume(title: string): Resume {
  return {
    id: makeId(),
    title,
    fullName: "",
    headline: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const resumeApi = {
  async list(): Promise<Resume[]> {
    return delay(read().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
  },

  async get(id: string): Promise<Resume | null> {
    const found = read().find((r) => r.id === id) ?? null;
    return delay(found);
  },

  async create(title: string): Promise<Resume> {
    const next = emptyResume(title || "Untitled Resume");
    const all = read();
    all.push(next);
    write(all);
    return delay(next);
  },

  async update(id: string, patch: Partial<Resume>): Promise<Resume> {
    const all = read();
    const idx = all.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error("Resume not found");
    all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
    write(all);
    return delay(all[idx]);
  },

  async remove(id: string): Promise<void> {
    const all = read().filter((r) => r.id !== id);
    write(all);
    return delay(undefined);
  },
};