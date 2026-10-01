import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/services/auth.api";
import type { AuthTokens, User } from "@/types/user";

type AuthState = {
  user: User | null;
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      loading: false,
      error: null,

      async login(email, password) {
        set({ loading: true, error: null });
        try {
          const { user, tokens } = await authApi.login(email, password);
          set({ user, tokens, loading: false });
        } catch (e) {
          set({ error: (e as Error).message, loading: false });
          throw e;
        }
      },

      async register(name, email, password) {
        set({ loading: true, error: null });
        try {
          const { user, tokens } = await authApi.register(name, email, password);
          set({ user, tokens, loading: false });
        } catch (e) {
          set({ error: (e as Error).message, loading: false });
          throw e;
        }
      },

      async logout() {
        await authApi.logout();
        set({ user: null, tokens: null });
      },

      clearError() {
        set({ error: null });
      },
    }),
    {
      name: "careerforge-auth",
      partialize: (s) => ({ user: s.user, tokens: s.tokens }),
    },
  ),
);

export const isAuthenticated = () => Boolean(useAuthStore.getState().tokens?.accessToken);