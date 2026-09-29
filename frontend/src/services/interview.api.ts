import { api } from "./api"; import type { InterviewQuestion, InterviewResult } from "../types/interview";
export const startInterview = (role: string) => api<{ id: string; questions: InterviewQuestion[] }>("/interviews", { method: "POST", body: JSON.stringify({ role }) });
export const getResult = (id: string) => api<InterviewResult>(`/interviews/${id}/result`);
