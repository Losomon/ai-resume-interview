import { useAuthStore } from "../../store/authStore";
export function WelcomeCard() { const name = useAuthStore((s) => s.user?.name.split(" ")[0]) ?? "there";
  return <div className="mb-8"><h1 className="text-[30px] font-semibold text-ink tracking-tight">Good morning, {name}</h1><p className="mt-1">Let's improve your career readiness.</p></div>; }
