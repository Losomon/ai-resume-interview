import { api } from "./api"; import type { Job } from "../types/job";
export const searchJobs = (q: string) => api<Job[]>(`/jobs?q=${encodeURIComponent(q)}`);
