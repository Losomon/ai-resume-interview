import {
  AIMark,
  Button,
  Card,
  Input,
  Badge,
  Progress,
  Skeleton,
  SkeletonText,
} from '@/components/ui';

const S = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <section className="border-t border-border py-8">
    <h2 className="mb-4 text-card text-text">{t}</h2>
    {children}
  </section>
);

const swatches = [
  { name: 'bg', hex: '#FDFCF7' },
  { name: 'bg-secondary', hex: '#F7F5EC' },
  { name: 'card', hex: '#FFFFFF' },
  { name: 'card-elevated', hex: '#FFFDF6' },
  { name: 'border', hex: '#E8E4D5' },
  { name: 'border-hover', hex: '#D6D0BC' },
  { name: 'primary', hex: '#15803D' },
  { name: 'primary-hover', hex: '#166534' },
  { name: 'primary-tint', hex: '#DCFCE7' },
  { name: 'info', hex: '#0E7490' },
  { name: 'info-tint', hex: '#CFFAFE' },
  { name: 'success', hex: '#16A34A' },
  { name: 'success-tint', hex: '#DCFCE7' },
  { name: 'attention', hex: '#D97706' },
  { name: 'attention-tint', hex: '#FEF3C7' },
  { name: 'problem', hex: '#DC2626' },
  { name: 'problem-tint', hex: '#FEE2E2' },
  { name: 'glow', hex: '#86EFAC' },
  { name: 'glow-warm', hex: '#FDE68A' },
  { name: 'text', hex: '#1C1917' },
  { name: 'text-secondary', hex: '#57534E' },
  { name: 'text-muted', hex: '#A8A29E' },
];

export default function DesignSystem() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-12">
      <div className="mb-8 flex items-center gap-4">
        <AIMark size={40} />
        <div>
          <h1 className="text-dashboard text-text">CareerForge AI</h1>
          <p className="text-small text-text-secondary">
            Every token and component, live. Toggle theme from the navbar.
          </p>
        </div>
      </div>

      <S t="Color">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {swatches.map((s) => (
            <div key={s.name}>
              <div className={`h-16 rounded-card border border-border bg-${s.name}`} />
              <p className="mt-1.5 text-small text-text">{s.name}</p>
              <p className="text-xs text-text-muted">{s.hex}</p>
            </div>
          ))}
        </div>
      </S>

      <S t="Typography">
        <p className="font-display text-[48px] leading-tight text-text">Your career, engineered.</p>
        <p className="mt-3 text-dashboard text-text">Dashboard heading 30</p>
        <p className="mt-3 text-card text-text">Card heading 17</p>
        <p className="mt-3 text-body text-text-secondary">
          Body 15 / 1.6 in Inter. Secondary text uses text-secondary, captions use text-muted.
        </p>
        <p className="mt-3 text-small text-text-muted">Small / muted caption text.</p>
      </S>

      <S t="Ember mark">
        <div className="flex flex-wrap items-end gap-10">
          <div className="flex flex-col items-center gap-2">
            <AIMark size={16} />
            <span className="text-xs text-text-muted">16 nav</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AIMark size={24} />
            <span className="text-xs text-text-muted">24 default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AIMark size={64} />
            <span className="text-xs text-text-muted">64 glow</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AIMark size={64} thinking />
            <span className="text-xs text-text-muted">64 thinking</span>
          </div>
        </div>
      </S>

      <S t="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button size="lg">Large CTA</Button>
        </div>
      </S>

      <S t="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="ai">AI</Badge>
          <Badge tone="progress">Progress</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="attention">Attention</Badge>
          <Badge tone="problem">Problem</Badge>
          <Badge tone="neutral">Neutral</Badge>
        </div>
      </S>

      <S t="Progress">
        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-4">
            <span className="w-24 text-small text-text-secondary">Resume</span>
            <Progress value={92} tone="primary" />
            <span className="w-10 text-small text-text">92%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-small text-text-secondary">ATS</span>
            <Progress value={87} tone="success" />
            <span className="w-10 text-small text-text">87%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-small text-text-secondary">Skills</span>
            <Progress value={68} tone="attention" />
            <span className="w-10 text-small text-text">68%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-small text-text-secondary">Formatting</span>
            <Progress value={34} tone="problem" />
            <span className="w-10 text-small text-text">34%</span>
          </div>
        </Card>
      </S>

      <S t="Inputs">
        <Card className="grid gap-6 p-6 sm:grid-cols-2">
          <Input label="Full name" placeholder="John Doe" />
          <Input label="Email" placeholder="you@example.com" />
          <Input label="With error" placeholder="Invalid" error="This field is required" />
          <Input label="Disabled" placeholder="Disabled" disabled />
        </Card>
      </S>

      <S t="Loading">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-6">
            <SkeletonText lines={4} />
          </Card>
          <Card className="flex flex-col gap-3 p-6">
            <div className="flex items-center gap-2 text-small text-text-secondary">
              <AIMark size={16} /> AI is analyzing
              <span className="ml-1 flex gap-1">
                <span className="animate-dot-1">●</span>
                <span className="animate-dot-2">●</span>
                <span className="animate-dot-3">●</span>
              </span>
            </div>
            <Skeleton className="h-20 w-full" />
          </Card>
        </div>
      </S>
    </main>
  );
}
