import { useNavigate } from "react-router-dom";
import {
  FileText,
  Target,
  Mic,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Button, Progress, Badge, AIMark } from "@/components/ui";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Good morning, Solomon"
        subtitle="Let's improve your career readiness."
      />

      {/* Tier 1 — summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={<FileText size={18} />}
          label="Resume"
          value="92%"
          tone="primary"
        />
        <SummaryCard
          icon={<Target size={18} />}
          label="ATS"
          value="87"
          tone="success"
        />
        <SummaryCard
          icon={<Mic size={18} />}
          label="Interview"
          value="84"
          tone="primary"
        />
      </div>

      {/* Tier 2 — readiness + recommended */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-small font-medium text-text-secondary">
            <TrendingUp size={16} />
            Career Readiness
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-[48px] font-bold leading-none text-text">82</span>
            <span className="text-small text-text-muted">/100</span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <ScoreRow label="Resume"    value={92} />
            <ScoreRow label="ATS"       value={78} />
            <ScoreRow label="Interview" value={86} />
            <ScoreRow label="Skills"    value={68} />
          </div>
        </Card>

        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-small font-medium text-text-secondary">
            <AIMark size={16} />
            Recommended for you
          </div>

          <ActionRow
            title="Improve ATS Score"
            description="Add missing keywords"
            onClick={() => navigate("/ats")}
          />
          <ActionRow
            title="Practice Interview"
            description="Complete a mock session"
            onClick={() => navigate("/interview")}
          />
          <ActionRow
            title="Update Resume"
            description="Use AI suggestions"
            onClick={() => navigate("/resumes")}
          />
        </Card>
      </div>
    </>
  );
}

/* ---------- helpers ---------- */

function SummaryCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "primary" | "success";
}) {
  return (
    <Card hover className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-small font-medium text-text-secondary">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-tint text-primary">
            {icon}
          </span>
          {label}
        </div>
        <Badge tone={tone === "success" ? "progress" : "ai"}>
          {tone === "success" ? "Good" : "Strong"}
        </Badge>
      </div>
      <div className="mt-4 text-dashboard text-text">{value}</div>
    </Card>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-20 text-small text-text-secondary">{label}</span>
      <Progress
        value={value}
        tone={value >= 80 ? "primary" : value >= 60 ? "success" : "attention"}
      />
      <span className="w-10 text-right text-small text-text">{value}%</span>
    </div>
  );
}

function ActionRow({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-button border border-border bg-card px-4 py-3 text-left transition-all duration-card hover:-translate-y-px hover:border-border-hover hover:bg-card-elevated"
    >
      <div className="min-w-0 flex-1">
        <div className="text-small font-medium text-text">{title}</div>
        <div className="text-xs text-text-muted">{description}</div>
      </div>
      <ArrowRight
        size={16}
        className="text-text-muted transition-transform duration-card group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </button>
  );
}