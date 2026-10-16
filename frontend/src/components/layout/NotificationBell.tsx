import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { AIMark } from "@/components/ui";
import { cn } from "@/utils/cn";

export type Notification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  href?: string;
  read: boolean;
};

type Props = {
  notifications?: Notification[];
};

export function NotificationBell({ notifications = [] }: Props) {
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={
          unreadCount > 0
            ? `Notifications (${unreadCount} unread)`
            : "Notifications"
        }
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-button transition-colors duration-card",
          "text-text-secondary hover:bg-bg-secondary hover:text-text",
          open && "bg-bg-secondary text-text",
        )}
      >
        <Bell size={18} strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-text-inverse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-12 z-40 w-[340px] overflow-hidden",
            "rounded-card border border-border bg-card shadow-card-hover",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-small font-semibold text-text">
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                type="button"
                className="text-xs font-medium text-primary hover:text-primary-hover"
              >
                Mark all read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-glow-green opacity-50 blur-lg" />
                <AIMark size={36} />
              </div>
              <p className="max-w-[240px] text-small leading-relaxed text-text-secondary">
                No notifications yet. We'll let you know when something needs
                your attention.
              </p>
            </div>
          ) : (
            <ul className="max-h-[400px] overflow-y-auto">
              {notifications.map((n, i) => (
                <li key={n.id}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                      "hover:bg-bg-secondary",
                      i > 0 && "border-t border-border",
                      !n.read && "bg-primary-tint/30",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                        n.read ? "bg-border-hover" : "bg-primary",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-small font-medium text-text">
                        {n.title}
                      </div>
                      <div className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                        {n.body}
                      </div>
                      <div className="mt-1 text-[11px] text-text-muted">
                        {new Date(n.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}