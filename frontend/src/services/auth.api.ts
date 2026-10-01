import type { AuthResponse, User } from "@/types/user";

const LATENCY = 700;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY));
}

function fakeUser(email: string, name?: string): User {
  return {
    id: crypto.randomUUID(),
    email,
    name: name ?? email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    createdAt: new Date().toISOString(),
  };
}

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    if (!email || !password) throw new Error("Email and password are required.");
    if (password.length < 6) throw new Error("Invalid email or password.");
    return delay({
      user: fakeUser(email),
      tokens: { accessToken: "mock-access", refreshToken: "mock-refresh" },
    });
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    if (!name || !email || !password) throw new Error("All fields are required.");
    if (password.length < 8) throw new Error("Password must be at least 8 characters.");
    return delay({
      user: fakeUser(email, name),
      tokens: { accessToken: "mock-access", refreshToken: "mock-refresh" },
    });
  },

  async forgotPassword(email: string): Promise<{ ok: true }> {
    if (!email) throw new Error("Email is required.");
    return delay({ ok: true });
  },

  async me(): Promise<User | null> {
    return null;
  },

  async logout(): Promise<void> {
    return delay(undefined);
  },
};