import { create } from "zustand"; import type { OrbState } from "../components/ui/AIOrb";
interface S { index: number; orb: OrbState; answers: string[]; setOrb: (o: OrbState) => void; submit: (a: string) => void; reset: () => void }
export const useInterviewStore = create<S>((set) => ({ index: 0, orb: "idle", answers: [], setOrb: (orb) => set({ orb }), submit: (a) => set((s) => ({ answers: [...s.answers, a], index: s.index + 1 })), reset: () => set({ index: 0, answers: [], orb: "idle" }) }));
