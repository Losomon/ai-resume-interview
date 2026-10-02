import { Badge } from '@/components/ui';

type ResumeScoreProps = {
  score?: number;
};

export function ResumeScore({ score }: ResumeScoreProps) {
  if (typeof score !== 'number') {
    return <Badge tone="neutral">ATS not scored</Badge>;
  }

  const tone = score >= 80 ? 'progress' : score >= 60 ? 'attention' : 'problem';

  return <Badge tone={tone}>ATS {score}</Badge>;
}
