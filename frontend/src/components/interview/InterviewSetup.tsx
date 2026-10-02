import { useState } from "react";
import { Mic, ArrowRight } from "lucide-react";
import { Button, Card, Input } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { InterviewConfig } from "@/types/resume";

const LEVELS: { value: InterviewConfig["level"]; label: string }[] = [
  { value: "junior", label: "Junior" },
  { value: "mid",    label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead",   label: "Lead / Staff" },
];

const TYPES: { value: InterviewConfig["type"]; label: string; blurb: string }[] = [
  { value: "behavioral", label: "Behavioral", blurb: "Team, conflict, growth" },
  { value: "technical",  label: "Technical",  blurb: "Systems, debugging, design" },
  { value: "mixed",      label: "Mixed",      blurb: "A bit of everything" },
];

const COUNTS = [5, 8, 10];

type Props = {
  onStart: (config: InterviewConfig) => void;
  loading?: boolean;
};

export function InterviewSetup({ onStart, loading }: Props) {
  const [role, setRole] = useState("");
  const [level, setLevel] = useState<InterviewConfig["level"]>("mid");
  const [type, setType] = useState<InterviewConfig["type"]>("mixed");
  const [count, setCount] = useState(5);

  function submit() {
    onStart({ role: role.trim() || "Software Engineer", level, type, questionCount: count });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Left: form */}
      <Card className="p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-card text-text">Set up your interview</h2>
          <p className="mt-1 text-small text-text-secondary">
            We'll generate questions tailored to the role and level.
          </p>
        </div>

        <Input
          label="Role"
          placeholder="e.g. Senior Software Engineer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="text-small font-medium text-text-secondary">Level</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LEVELS.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLevel(l.value)}
                className={cn(
                  "rounded-button border px-3 py-2.5 text-small font-medium transition-colors duration-card",
                  level === l.value
                    ? "border-primary bg-primary-tint text-green-deep"
                    : "border-border bg-card text-text-secondary hover:border-border-hover hover:bg-bg-secondary",
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-small font-medium text-text-secondary">Interview type</label>
          <div className="grid gap-2 sm:grid-cols-3">
            {TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={cn(
                  "flex flex-col gap-0.5 rounded-button border px-3 py-3 text-left transition-colors duration-card",
                  type === t.value
                    ? "border-primary bg-primary-tint"
                    : "border-border bg-card hover:border-border-hover hover:bg-bg-secondary",
                )}
              >
                <span className={cn("text-small font-medium", type === t.value ? "text-green-deep" : "text-text")}>
                  {t.label}
                </span>
                <span className="text-xs text-text-muted">{t.blurb}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-small font-medium text-text-secondary">Questions</label>
          <div className="flex gap-2">
            {COUNTS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCount(c)}
                className={cn(
                  "h-10 w-14 rounded-button border text-small font-medium transition-colors duration-card",
                  count === c
                    ? "border-primary bg-primary-tint text-green-deep"
                    : "border-border bg-card text-text-secondary hover:border-border-hover hover:bg-bg-secondary",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={submit} size="lg" loading={loading} className="mt-2 w-full sm:w-auto sm:self-start">
          <Mic size={16} />
          Start Interview
          <ArrowRight size={16} />
        </Button>
      </Card>

      {/* Right: what to expect */}
      <Card className="p-6 flex flex-col gap-4">
        <h3 className="text-small font-semibold text-text">What to expect</h3>
        <ul className="flex flex-col gap-3 text-small text-text-secondary">
          <li className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
            One question at a time, with a timer for each.
          </li>
          <li className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
            Type your answers — no audio recording needed.
          </li>
          <li className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
            A full feedback report at the end with scores and notes.
          </li>
          <li className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
            You can redo any question before submitting.
          </li>
        </ul>
      </Card>
    </div>
  );
}