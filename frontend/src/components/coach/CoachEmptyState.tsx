import { Compass, BookOpen, FileText, Mic } from 'lucide-react';
import { AIMark, Card } from '@/components/ui';

type PromptCard = {
  id: string;
  icon: typeof Compass;
  label: string;
  blurb: string;
  prompt: string;
};

const CARDS: PromptCard[] = [
  {
    id: 'path',
    icon: Compass,
    label: 'Career path',
    blurb: 'Plan your next move',
    prompt: 'What should my next career move be, given my current skills and experience?',
  },
  {
    id: 'skills',
    icon: BookOpen,
    label: 'Learn new skills',
    blurb: 'Find skill gaps',
    prompt: 'Which skills should I focus on learning next to move forward in my career?',
  },
  {
    id: 'resume',
    icon: FileText,
    label: 'Improve my resume',
    blurb: 'Make it job-ready',
    prompt: "How can I make my resume stronger for the roles I'm targeting?",
  },
  {
    id: 'interview',
    icon: Mic,
    label: 'Interview advice',
    blurb: 'Practice with confidence',
    prompt: 'How should I prepare for a behavioral interview?',
  },
];

export function CoachEmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-glow-green opacity-70 blur-xl" />
        <AIMark size={56} glow />
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        Career Coach
      </p>
      <p className="mt-3 max-w-[440px] text-[15px] leading-relaxed text-text-secondary">
        Hi! I'm here to help you move forward in your career. What would you like to work on today?
      </p>

      <p className="mt-8 text-small font-medium text-text">What can I help you with?</p>

      <div className="mt-4 grid w-full max-w-[600px] gap-2 sm:grid-cols-2">
        {CARDS.map(({ id, icon: Icon, label, blurb, prompt }) => (
          <button key={id} type="button" onClick={() => onPick(prompt)} className="group text-left">
            <Card hover className="flex h-full items-start gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary transition-colors duration-card group-hover:bg-primary group-hover:text-text-inverse">
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-small font-medium text-text">{label}</div>
                <div className="mt-0.5 text-xs text-text-muted">{blurb}</div>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
