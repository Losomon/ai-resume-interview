import { Badge } from '@/components/ui';
import type { InterviewQuestion } from '@/types/resume';

export function QuestionCard({ question }: { question: InterviewQuestion }) {
  const tone =
    question.category === 'technical'
      ? 'info'
      : question.category === 'behavioral'
        ? 'ai'
        : 'attention';

  return (
    <div className="flex flex-col gap-3">
      <Badge tone={tone}>{question.category}</Badge>
      <h2 className="text-[22px] font-semibold leading-snug text-text">{question.text}</h2>
      <p className="text-small text-text-muted">
        {question.hint ??
          'Take your time. Explain in your own words and give an example if you can.'}
      </p>
    </div>
  );
}
