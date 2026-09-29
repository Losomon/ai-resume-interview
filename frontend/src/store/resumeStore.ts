import { create } from "zustand";
export const useResumeStore = create<{ activeId: string | null; setActive: (id: string | null) => void }>((set) => ({ activeId: null, setActive: (activeId) => set({ activeId }) }));
