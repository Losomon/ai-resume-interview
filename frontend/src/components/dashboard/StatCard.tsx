import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

type StatCardProps = {
  value: string;
  label: string;
  action: string;
  href: string;
  hasData?: boolean;
};

export function StatCard({ value, label, action, href, hasData }: StatCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(href)}
      className={cn(
        "group flex flex-col items-start rounded-card border border-border bg-card p-5 text-left",
        "transition-all duration-card",
        "hover:-translate-y-0.5 hover:border-border-hover hover:shadow-card-hover",
      )}
    >
      <span
        className={cn(
          "font-display text-[40px] leading-none tracking-[-0.03em]",
          hasData ? "text-text" : "text-text-muted",
        )}
        style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 600 }}
      >
        {value}
      </span>

      <span className="mt-3 text-small font-medium text-text-secondary">{label}</span>

      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-70 transition-opacity duration-card group-hover:opacity-100">
        {action}
        <ArrowRight
          size={12}
          className="transition-transform duration-card group-hover:translate-x-0.5"
        />
      </span>
    </button>
  );
}