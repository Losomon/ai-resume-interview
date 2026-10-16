import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Settings as SettingsIcon,
  CreditCard,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

export function AccountMenu() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { theme, toggle } = useTheme();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "?";
  const isDark = theme === "dark";

  async function handleLogout() {
    setOpen(false);
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Account menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full bg-primary-tint",
          "text-[13px] font-semibold text-green-deep ring-1 ring-border",
          "transition-all duration-card",
          "hover:ring-border-hover",
          open && "ring-primary/40",
        )}
      >
        {initial}
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-12 z-40 w-[280px] overflow-hidden",
            "rounded-card border border-border bg-card shadow-card-hover",
          )}
        >
          <div className="border-b border-border px-4 py-3.5">
            <div className="truncate text-small font-semibold text-text">
              {user?.name ?? "Signed in"}
            </div>
            <div className="mt-0.5 truncate text-xs text-text-muted">
              {user?.email ?? ""}
            </div>
          </div>

          <nav className="p-1">
            <MenuLink to="/settings" icon={<User size={14} />} onClick={() => setOpen(false)}>
              Profile
            </MenuLink>
            <MenuLink to="/settings" icon={<SettingsIcon size={14} />} onClick={() => setOpen(false)}>
              Settings
            </MenuLink>
            <MenuButton icon={<CreditCard size={14} />} disabled>
              Billing <span className="ml-auto text-[10px] text-text-muted">coming soon</span>
            </MenuButton>
          </nav>

          <div className="border-t border-border p-1">
            <MenuButton
              icon={isDark ? <Sun size={14} /> : <Moon size={14} />}
              onClick={toggle}
            >
              {isDark ? "Switch to light mode" : "Switch to dark mode"}
            </MenuButton>
          </div>

          <div className="border-t border-border p-1">
            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-[6px] px-3 py-2 text-small",
                "text-text-secondary transition-colors duration-card",
                "hover:bg-problem-tint hover:text-problem",
              )}
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  to,
  icon,
  children,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-[6px] px-3 py-2 text-small",
        "text-text-secondary transition-colors duration-card",
        "hover:bg-bg-secondary hover:text-text",
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

function MenuButton({
  icon,
  children,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-[6px] px-3 py-2 text-small",
        "text-text-secondary transition-colors duration-card",
        !disabled && "hover:bg-bg-secondary hover:text-text",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {icon}
      {children}
    </button>
  );
}