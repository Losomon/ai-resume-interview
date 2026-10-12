import { Search, Bell } from 'lucide-react';
import { AIMark, Badge, ThemeToggle } from '@/components/ui';
import { cn } from '@/utils/cn';

type TopbarProps = {
  title?: string;
};

export function Topbar({ title }: TopbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-20 h-[72px]',
        'border-b border-border bg-bg/85 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center gap-4 px-6 lg:px-10">
        {/* Mobile logo (sidebar hidden) */}
        <div className="flex items-center gap-2 lg:hidden">
          <AIMark size={22} />
          <span className="text-[15px] font-semibold text-text">CareerForge</span>
        </div>

        {/* Optional page title (desktop only) */}
        {title && <h1 className="hidden lg:block text-[15px] font-semibold text-text">{title}</h1>}

        {/* Search */}
        <div className="ml-auto hidden md:flex items-center gap-2 w-[280px] lg:w-[320px] h-10 rounded-button border border-border bg-card px-3 text-small text-text-muted hover:border-border-hover transition-colors duration-card">
          <Search size={16} strokeWidth={2} className="shrink-0" />
          <span className="flex-1">Search anything</span>
          <Badge tone="neutral" className="text-[10px]">
            ⌘K
          </Badge>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-button text-text-secondary hover:bg-bg-secondary hover:text-text transition-colors duration-card"
          >
            <Bell size={18} strokeWidth={2} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          {/* Avatar */}
          <button
            type="button"
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-tint text-[13px] font-semibold text-green-deep ring-1 ring-border hover:ring-border-hover transition-all duration-card"
          >
            A
          </button>
        </div>
      </div>
    </header>
  );
}
