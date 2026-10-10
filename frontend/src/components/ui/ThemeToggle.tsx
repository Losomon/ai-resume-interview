import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

type ThemeToggleProps = {
  className?: string;
  variant?: 'icon' | 'row';
};

export function ThemeToggle({ className, variant = 'icon' }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  if (variant === 'row') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className={cn(
          'group flex w-full items-center gap-3 rounded-button px-3 py-2.5',
          'text-small font-medium text-text-secondary transition-colors duration-card',
          'hover:bg-bg-secondary hover:text-text',
          className,
        )}
      >
        <Icon
          size={18}
          strokeWidth={2}
          className="shrink-0 text-text-muted transition-colors duration-card group-hover:text-text-secondary"
        />
        <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-button',
        'text-text-secondary transition-colors duration-card',
        'hover:bg-bg-secondary hover:text-text',
        className,
      )}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );
}
