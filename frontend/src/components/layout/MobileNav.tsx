import { NavLink } from "react-router-dom"; import { Home, FileText, ScanSearch, Mic, MoreHorizontal } from "lucide-react"; import clsx from "clsx";
const items = [{ to: "/dashboard", l: "Home", I: Home }, { to: "/resumes", l: "Resume", I: FileText }, { to: "/ats", l: "ATS", I: ScanSearch }, { to: "/interview", l: "AI", I: Mic }, { to: "/settings", l: "More", I: MoreHorizontal }];
/** Navigation only. Primary actions belong in the page content as full-width 48px+ buttons. */
export const MobileNav = () => (<nav aria-label="Main" className="md:hidden fixed bottom-0 inset-x-0 h-16 z-30 grid grid-cols-5 border-t border-line bg-bg2/90 backdrop-blur">
  {items.map(({ to, l, I }) => (<NavLink key={to} to={to} className={({ isActive }) => clsx("grid place-items-center content-center gap-0.5 text-[11px]", isActive ? "text-primary-glow" : "text-mute")}><I size={20} />{l}</NavLink>))}</nav>);
