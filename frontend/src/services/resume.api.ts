import { api } from "./api"; import type { Resume } from "../types/resume";
export const listResumes = () => api<Resume[]>("/resumes");
export const getResume = (id: string) => api<Resume>(`/resumes/${id}`);
