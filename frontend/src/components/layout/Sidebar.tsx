import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Target,
  Mic,
  Briefcase,
  Sparkles,
  ClipboardCheck,
  Settings,
  HelpCircle,
} from "lucide-react";
import { AIMark } from "@/components/ui";
import { cn } from "@/utils/cn";

const primaryNav = [
  { to: "/dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { to: "/resumes",      label: "My Resumes",   icon: FileText },
  { to: "/ats",          label: "ATS Analyzer", icon: Target },
  { to: "/interview",    label: "AI Interviews",icon: Mic },
  { to: "/jobs",         label: "Job Matches",  icon: Briefcase },
  { to: "/coach",        label: "Career Coach", icon: Sparkles },
  { to: "/applications", label: "Applications", icon: ClipboardCheck },
] as const;

const secondaryNav = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help",     label: "Help",     icon: HelpCircle },
] as const;

export function Sidebar() {
  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col",
        "fixed inset-y-0 left-0 z-30 w-[248px]",
        "border-r border-border bg-card",
      )}
    >
      {/* Logo */}
      <div className="flex h-[72px] items-center gap-2.5 px-6">
        <AIMark size={26} />
        <span className="text-[17px] font-semibold tracking-tight text-text">
          CareerForge
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 py-2">
        {primaryNav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-button px-3 py-2.5",
                "text-small font-medium transition-colors duration-card",
                isActive
                  ? "bg-primary-tint text-green-deep"
                  : "text-text-secondary hover:bg-bg-secondary hover:text-text",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  strokeWidth={2}
                  className={cn(
                    "shrink-0 transition-colors duration-card",
                    isActive ? "text-primary" : "text-text-muted group-hover:text-text-secondary",
                  )}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Divider + secondary nav */}
      <div className="border-t border-border px-3 py-2">
        {secondaryNav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-button px-3 py-2.5",
                "text-small font-medium transition-colors duration-card",
                isActive
                  ? "bg-primary-tint text-green-deep"
                  : "text-text-secondary hover:bg-bg-secondary hover:text-text",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  strokeWidth={2}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-primary" : "text-text-muted group-hover:text-text-secondary",
                  )}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}