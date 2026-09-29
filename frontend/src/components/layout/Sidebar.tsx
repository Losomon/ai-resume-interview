import { NavLink, Link } from "react-router-dom"; import { LayoutDashboard, FileText, ScanSearch, Mic, Search, CheckSquare, Settings, HelpCircle } from "lucide-react";
import clsx from "clsx"; import { SparkIcon } from "../ui/SparkIcon"; import { NAV } from "../../utils/constants";
const icons = [LayoutDashboard, FileText, ScanSearch, Mic, Search, null, CheckSquare];
const link = ({ isActive }: { isActive: boolean }) => clsx("flex items-center gap-3 rounded-lg px-3 h-10 text-sm transition-colors", isActive ? "bg-primary/15 text-ink" : "hover:bg-elevated hover:text-ink");
export function Sidebar() {
  return (<aside className="hidden md:flex fixed inset-y-0 left-0 w-[248px] flex-col border-r border-line bg-bg2 p-4">
    <Link to="/" className="flex items-center gap-2 h-12 px-2 text-ink font-semibold"><SparkIcon size={20} animate="glow" />CareerForge</Link>
    <nav aria-label="Main" className="mt-4 flex-1 space-y-1">{NAV.map((n, i) => { const I = icons[i]; return <NavLink key={n.to} to={n.to} className={link}>{I ? <I size={18} /> : <SparkIcon size={18} />}{n.label}</NavLink>; })}</nav>
    <div className="border-t border-line pt-3 space-y-1"><NavLink to="/settings" className={link}><Settings size={18} />Settings</NavLink><a href="#" className={link({ isActive: false })}><HelpCircle size={18} />Help</a></div></aside>);
}
