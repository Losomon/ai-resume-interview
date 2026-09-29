import { Avatar } from "../ui/Avatar"; import { useAuthStore } from "../../store/authStore";
export function Topbar() { const user = useAuthStore((s) => s.user);
  return <div className="sticky top-0 z-20 h-[72px] flex items-center justify-end px-4 md:px-10 border-b border-line bg-bg/85 backdrop-blur"><Avatar name={user?.name ?? "Guest User"} /></div>; }
