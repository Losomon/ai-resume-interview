import { Outlet, useLocation } from "react-router-dom"; import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar"; import { Topbar } from "./Topbar"; import { MobileNav } from "./MobileNav";
export function DashboardLayout() { const { pathname } = useLocation();
  return (<div className="min-h-screen"><Sidebar /><div className="md:pl-[248px]"><Topbar />
    <motion.main key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="mx-auto max-w-[1280px] px-4 md:px-10 py-8 pb-24 md:pb-8"><Outlet /></motion.main></div><MobileNav /></div>); }
