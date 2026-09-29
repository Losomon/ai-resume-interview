import { useState } from "react"; import { Moon, Sun } from "lucide-react"; import { Avatar } from "../ui/Avatar"; import { useAuthStore } from "../../store/authStore";
export function Topbar() {
  const user = useAuthStore((s) => s.user);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggle = () => { const d = !dark; setDark(d); document.documentElement.classList.toggle("dark", d); try { localStorage.setItem("cf_theme", d ? "dark" : "light"); } catch { /* ignore */ } };
  return (<div className="sticky top-0 z-20 h-[72px] flex items-center justify-end gap-3 px-4 md:px-10 border-b border-line bg-bg/90 backdrop-blur">
    <button onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-soft hover:bg-elevated">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
    <Avatar name={user?.name ?? "Guest User"} /></div>);
}
