import type { AuthResponse, User } from "@/types/user";
import { api } from "@/lib/api";

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await api<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return { user, tokens: { accessToken: "session", refreshToken: "session" } };
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const user = await api<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    return { user, tokens: { accessToken: "session", refreshToken: "session" } };
  },

  async forgotPassword(email: string): Promise<{ ok: true }> {
    if (!email) throw new Error("Email is required.");
    return { ok: true };
  },

  async me(): Promise<User | null> {
    try {
      const res = await api<{ user: User }>("/auth/me");
      return res.user;
    } catch (e) {
      return null;
    }
  },

  async logout(): Promise<void> {
    await api<void>("/auth/logout", { method: "POST" });
  },
};
