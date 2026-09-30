import {
  AIMark, Button, Card, Input, Badge, Progress, Skeleton, SkeletonText,
} from '@/components/ui'

const swatches: { name: string; class: string; hex: string }[] = [
  { name: 'bg',              class: 'bg-bg',              hex: '#FDFCF7' },
  { name: 'bg-secondary',    class: 'bg-bg-secondary',    hex: '#F7F5EC' },
  { name: 'card',            class: 'bg-card',            hex: '#FFFFFF' },
  { name: 'card-elevated',   class: 'bg-card-elevated',   hex: '#FFFDF6' },
  { name: 'border',          class: 'bg-border',          hex: '#E8E4D5' },
  { name: 'border-hover',    class: 'bg-border-hover',    hex: '#D6D0BC' },
  { name: 'primary',         class: 'bg-primary',         hex: '#15803D' },
  { name: 'primary-hover',   class: 'bg-primary-hover',   hex: '#166534' },
  { name: 'primary-tint',    class: 'bg-primary-tint',    hex: '#DCFCE7' },
  { name: 'info',            class: 'bg-info',            hex: '#0E7490' },
  { name: 'info-tint',       class: 'bg-info-tint',       hex: '#CFFAFE' },
  { name: 'success',         class: 'bg-success',         hex: '#16A34A' },
  { name: 'success-tint',    class: 'bg-success-tint',    hex: '#DCFCE7' },
  { name: 'attention',       class: 'bg-attention',       hex: '#D97706' },
  { name: 'attention-tint',  class: 'bg-attention-tint',  hex: '#FEF3C7' },
  { name: 'problem',         class: 'bg-problem',         hex: '#DC2626' },
  { name: 'problem-tint',    class: 'bg-problem-tint',    hex: '#FEE2E2' },
  { name: 'glow',            class: 'bg-glow',            hex: '#86EFAC' },
  { name: 'glow-warm',       class: 'bg-glow-warm',       hex: '#FDE68A' },
  { name: 'text',            class: 'bg-text',            hex: '#1C1917' },
  { name: 'text-secondary',  class: 'bg-text-secondary',  hex: '#57534E' },
  { name: 'text-muted',      class: 'bg-text-muted',      hex: '#A8A29E' },
]

export default function ColorsPreview() {
  return (
    <div className="min-h-screen bg-bg p-10">
      <div className="mx-auto max-w-6xl flex flex-col gap-12">

        {/* Header */}
        <header className="flex items-center gap-4">
          <AIMark size={40} />
          <div>
            <h1 className="text-dashboard text-text">CareerForge AI</h1>
            <p className="text-small text-text-secondary">
              Warm palette + Ember mark — design system preview
            </p>
          </div>
        </header>

        {/* Palette */}
        <section>
          <h2 className="text-card text-text mb-4">Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {swatches.map((s) => (
              <Card key={s.name} className="p-3 flex flex-col gap-2">
                <div className={`h-16 rounded-md border border-border ${s.class}`} />
                <div className="text-small font-medium text-text">{s.name}</div>
                <div className="text-xs text-text-muted">{s.hex}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-card text-text mb-4">Typography</h2>
          <Card className="p-6 flex flex-col gap-3">
            <div className="text-hero-sm sm:text-hero-md lg:text-hero text-text">
              Your Career. Engineered.
            </div>
            <div className="text-dashboard text-text">Dashboard heading</div>
            <div className="text-card text-text">Card heading</div>
            <p className="text-body text-text-secondary">
              Body — AI-powered tools to build a stronger career with confidence.
            </p>
            <p className="text-small text-text-muted">Small / muted caption text.</p>
          </Card>
        </section>

        {/* Ember mark states */}
        <section>
          <h2 className="text-card text-text mb-4">Ember Mark</h2>
          <Card className="p-6 flex items-end gap-10 flex-wrap">
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
          </Card>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-card text-text mb-4">Buttons</h2>
          <Card className="p-6 flex items-center gap-3 flex-wrap">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button size="lg">Large CTA</Button>
          </Card>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-card text-text mb-4">Badges</h2>
          <Card className="p-6 flex items-center gap-3 flex-wrap">
            <Badge tone="ai">AI</Badge>
            <Badge tone="progress">Progress</Badge>
            <Badge tone="info">Info</Badge>
            <Badge tone="attention">Attention</Badge>
            <Badge tone="problem">Problem</Badge>
            <Badge tone="neutral">Neutral</Badge>
          </Card>
        </section>

        {/* Progress */}
        <section>
          <h2 className="text-card text-text mb-4">Progress</h2>
          <Card className="p-6 flex flex-col gap-4">
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
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-card text-text mb-4">Inputs</h2>
          <Card className="p-6 grid sm:grid-cols-2 gap-6">
            <Input label="Full name" placeholder="John Doe" />
            <Input label="Email" placeholder="you@example.com" />
            <Input label="With error" placeholder="Invalid" error="This field is required" />
            <Input label="Disabled" placeholder="Disabled" disabled />
          </Card>
        </section>

        {/* Skeleton */}
        <section>
          <h2 className="text-card text-text mb-4">Loading</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <SkeletonText lines={4} />
            </Card>
            <Card className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-small text-text-secondary">
                <AIMark size={16} /> AI is analyzing
                <span className="flex gap-1 ml-1">
                  <span className="animate-dot-1">●</span>
                  <span className="animate-dot-2">●</span>
                  <span className="animate-dot-3">●</span>
                </span>
              </div>
              <Skeleton className="h-20 w-full" />
            </Card>
          </div>
        </section>

        {/* Cards with hover */}
        <section>
          <h2 className="text-card text-text mb-4">Cards</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="text-small text-text-secondary">Static card</div>
              <div className="text-dashboard text-text mt-2">82</div>
            </Card>
            <Card hover className="p-6">
              <div className="text-small text-text-secondary">Hover me</div>
              <div className="text-dashboard text-text mt-2">92%</div>
            </Card>
            <Card hover className="p-6">
              <div className="text-small text-text-secondary">Hover me</div>
              <div className="text-dashboard text-text mt-2">87</div>
            </Card>
          </div>
        </section>

      </div>
    </div>
  )
}