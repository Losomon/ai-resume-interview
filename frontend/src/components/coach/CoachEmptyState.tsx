import { AIMark, Card } from "@/components/ui";
import { Sparkles } from "lucide-react";

const prompts = [
  "How can I improve my chances of getting a senior developer role?",
  "What should I focus on first in my resume?",
  "Which skills from my ATS gaps matter most?",
  "How should I prepare for a behavioral interview?",
];

export function CoachEmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-glow-green opacity-70 blur-xl" />
        <AIMark size={56} glow />
      </div>

      <h2 className="text-card text-text">Your Career Coach</h2>
      <p className="mt-2 max-w-[400px] text-small leading-relaxed text-text-secondary">
        Ask anything about your resume, job search, or interview prep.
        I use your actual data — no generic advice.
      </p>

      <div className="mt-8 grid w-full max-w-[560px] gap-2 sm:grid-cols-2">
        {prompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPick(p)}
            className="group text-left"
          >
            <Card
              hover
              className="flex h-full items-start gap-2 p-3.5"
            >
              <Sparkles
                size={14}
                className="mt-0.5 shrink-0 text-text-muted transition-colors group-hover:text-primary"
              />
              <span className="text-small leading-snug text-text-secondary group-hover:text-text">
                {p}
              </span>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}