import { api } from "./api";
export const analyze = (resumeId: string, jobDescription: string) => api<{ score: number }>("/ats/analyze", { method: "POST", body: JSON.stringify({ resumeId, jobDescription }) });
