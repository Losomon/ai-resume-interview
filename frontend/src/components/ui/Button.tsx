import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(124,92,252,0.25)] active:translate-y-0',
  secondary:
    'bg-transparent text-content-primary border border-border hover:bg-surface hover:border-border-hover',
  ghost:
    'bg-transparent text-content-secondary hover:bg-surface hover:text-content-primary',
  destructive:
    'bg-danger text-white hover:brightness-110 hover:-translate-y-px active:translate-y-0',
  success:
    'bg-success text-white hover:brightness-110 hover:-translate-y-px active:translate-y-0',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-3 text-small',
  md: 'h-12 px-5 text-[14px] font-semibold',
  lg: 'h-[54px] px-6 text-[15px] font-semibold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium',
          'transition-all duration-150 ease-out-quick',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          'disabled:opacity-45 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';