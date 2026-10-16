import { FileText, Upload } from "lucide-react";
import { AIMark, Button } from "@/components/ui";

type ResumeEmptyStateProps = {
  onCreate: () => void;
};

export function ResumeEmptyState({ onCreate }: ResumeEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-border bg-card/40 px-6 py-20 text-center lg:py-24">
      {/* Ember mark with warm glow */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-glow-green opacity-60 blur-2xl" />
        <AIMark size={64} glow />
      </div>

      {/* Headline — Fraunces */}
      <h2
        className="mt-8 max-w-[560px] text-[28px] leading-tight tracking-[-0.02em] text-text lg:text-[34px]"
        style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700 }}
      >
        Your next opportunity starts here.
      </h2>

      {/* Body */}
      <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-text-secondary">
        Create your first professional resume, tailor it to a job, and get
        ready to apply.
      </p>

      {/* Primary CTA */}
      <Button size="lg" onClick={onCreate} className="mt-8">
        <FileText size={16} />
        Create your first resume
      </Button>

      {/* Import — disabled, honest */}
      <button
        type="button"
        disabled
        title="Coming soon"
        className="mt-5 inline-flex cursor-not-allowed items-center gap-1.5 text-small text-text-muted opacity-70"
      >
        <Upload size={13} />
        Import from PDF — coming soon
      </button>
    </div>
  );
}