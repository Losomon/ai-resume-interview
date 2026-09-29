import { useAuthStore } from "../../store/authStore";
export function WelcomeCard() { const name = useAuthStore((s) => s.user?.name.split(" ")[0]) ?? "there";
  return (<div className="mb-6 flex items-end justify-between"><div><h1 className="text-[28px] font-semibold text-ink tracking-tight">Dashboard</h1><p className="mt-0.5 text-sm">Welcome back, {name}.</p></div>
    <time className="hidden sm:block text-sm text-mute">{new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</time></div>); }
