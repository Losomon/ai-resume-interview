import { create } from "zustand"; import type { User } from "../types/user";
interface S { user: User | null; setAuth: (t: string, u: User) => void; logout: () => void }
export const useAuthStore = create<S>((set) => ({ user: null, setAuth: (t, user) => { localStorage.setItem("cf_token", t); set({ user }); }, logout: () => { localStorage.removeItem("cf_token"); set({ user: null }); } }));
