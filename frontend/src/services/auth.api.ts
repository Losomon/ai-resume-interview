import { api } from "./api"; import type { User } from "../types/user";
export const login = (email: string, password: string) => api<{ token: string; user: User }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const register = (name: string, email: string, password: string) => api<{ token: string; user: User }>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
