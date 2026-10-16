import { motion } from 'framer-motion';
import { FileText, Target, Mic, Briefcase } from 'lucide-react';
import { Card, AIMark } from '@/components/ui';
import { cn } from '@/utils/cn';

type ActivityType = 'resume' | 'ats' | 'interview' | 'application';

type Activity = {
  id: string;
  type: ActivityType;
  label: string;
  timestamp: string;
};

const typeMeta = {
  resume: { icon: FileText, tone: 'text-primary', bg: 'bg-primary-tint' },
  ats: { icon: Target, tone: 'text-info', bg: 'bg-info-tint' },
  interview: { icon: Mic, tone: 'text-attention', bg: 'bg-attention-tint' },
  application: { icon: Briefcase, tone: 'text-green-deep', bg: 'bg-primary-tint' },
} as const;

export function RecentActivity({ items = [] }: { items?: Activity[] }) {
  return (
    <Card className="p-6">
      <h2 className="text-card text-text">Recent activity</h2>
      <p className="mt-1 text-small text-text-secondary">
        Your resume edits, ATS analyses, interview sessions, and application updates will appear
        here.
      </p>

      {items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-button border border-dashed border-border bg-bg-secondary/50 px-6 py-10 text-center">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-glow-green opacity-40 blur-lg" />
            <AIMark size={40} />
          </div>
          <p className="max-w-[360px] text-small leading-relaxed text-text-muted">
            Nothing here yet. Once you start using the tools, your progress will show up in this
            feed.
          </p>
        </div>
      ) : (
        <ul className="mt-5 flex flex-col">
          {items.map((item, i) => {
            const meta = typeMeta[item.type];
            const Icon = meta.icon;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn('flex items-start gap-3 py-3', i > 0 && 'border-t border-border')}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                    meta.bg,
                    meta.tone,
                  )}
                >
                  <Icon size={14} strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-small text-text">{item.label}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{item.timestamp}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
