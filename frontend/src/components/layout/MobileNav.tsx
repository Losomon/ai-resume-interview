import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Target,
  Mic,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/utils/cn";

const items = [
  { to: "/dashboard", label: "Home",    icon: Home },
  { to: "/resumes",   label: "Resume",  icon: FileText },
  { to: "/ats",       label: "ATS",     icon: Target },
  { to: "/interview", label: "AI",      icon: Mic },
  { to: "/settings",  label: "More",    icon: MoreHorizontal },
] as const;

export function MobileNav() {
  return (
    <nav
      className={cn(
        "lg:hidden fixed inset-x-0 bottom-0 z-30",
        "border-t border-border bg-card/95 backdrop-blur-md",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <ul className="flex h-[68px] items-stretch">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex h-full flex-col items-center justify-center gap-1",
                  "text-[11px] font-medium transition-colors duration-card",
                  isActive ? "text-primary" : "text-text-muted",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}