import { Briefcase, Mic, Calendar, Trophy } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { Application } from "@/types/resume";

type Props = {
  applications: Application[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export function ApplicationSummary({ applications, activeFilter, onFilterChange }: Props) {
  const total = applications.length;

  // Follow-ups: applications with a due date within the next 7 days OR overdue
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const followUps = applications.filter((a) => {
    const next = (a as unknown as { followUpAt?: string }).followUpAt;
    if (!next) return false;
    const t = new Date(next).getTime();
    return t <= now + sevenDays;
  }).length;

  const interviews = applications.filter((a) => a.stage === "interview").length;
  const offers = applications.filter((a) => a.stage === "offer").length;

  const cards: { id: string; label: string; value: number; icon: typeof Briefcase }[] = [
    { id: "all",       label: "Total applications", value: total,     icon: Briefcase },
    { id: "interview", label: "Interviews",          value: interviews, icon: Mic },
    { id: "followup",  label: "Follow-ups due",      value: followUps,  icon: Calendar },
    { id: "offer",     label: "Offers received",     value: offers,     icon: Trophy },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ id, label, value, icon: Icon }) => {
        const active = activeFilter === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onFilterChange(active && id !== "all" ? "all" : id)}
            className={cn(
              "flex flex-col items-start rounded-card border p-5 text-left transition-all duration-card",
              active
                ? "border-primary/40 bg-primary-tint"
                : "border-border bg-card hover:-translate-y-0.5 hover:border-border-hover hover:shadow-card-hover",
            )}
          >
            <div className="flex w-full items-start justify-between gap-2">
              <span
                className={cn(
                  "font-display text-[36px] leading-none tracking-[-0.03em]",
                  active ? "text-green-deep" : "text-text",
                )}
                style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 600 }}
              >
                {value}
              </span>
              <Icon
                size={16}
                className={cn(
                  active ? "text-green-deep" : "text-text-muted",
                )}
              />
            </div>
            <span
              className={cn(
                "mt-2 text-small font-medium",
                active ? "text-green-deep" : "text-text-secondary",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}