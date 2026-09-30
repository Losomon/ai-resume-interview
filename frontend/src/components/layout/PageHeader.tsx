import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8", className)}>
      <div className="min-w-0">
        <h1 className="text-dashboard text-text truncate">{title}</h1>
        {subtitle && (
          <p className="mt-1.5 text-small text-text-secondary">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}