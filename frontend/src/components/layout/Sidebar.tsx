import { NavLink, useNavigate } from "react-router-dom";
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
  LogOut,
} from "lucide-react";
import { AIMark } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
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
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  async function onLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

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

      {/* Footer: secondary nav + user + logout */}
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

        {/* Divider */}
        <div className="my-2 border-t border-border" />

        {/* User + logout */}
        <div className="flex items-center gap-3 rounded-button px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-tint text-[12px] font-semibold text-green-deep ring-1 ring-border">
            {user?.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-small font-medium text-text">
              {user?.name ?? "Guest"}
            </div>
            <div className="truncate text-[11px] text-text-muted">
              {user?.email ?? "not signed in"}
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-button text-text-muted transition-colors duration-card hover:bg-bg-secondary hover:text-problem"
          >
            <LogOut size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </aside>
  );
}