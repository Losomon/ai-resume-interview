import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select…',
      label,
      hint,
      error,
      disabled,
      className,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [highlighted, setHighlighted] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);

    const selected = options.find((o) => o.value === value);

    React.useEffect(() => {
      if (!open) return;
      setHighlighted(Math.max(0, options.findIndex((o) => o.value === value)));
    }, [open, options, value]);

    React.useEffect(() => {
      if (!open) return;
      const onDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlighted((h) => (h + 1) % options.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlighted((h) => (h - 1 + options.length) % options.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const opt = options[highlighted];
          if (opt) onChange?.(opt.value);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setOpen(false);
        }
      };
      window.addEventListener('keydown', onDown);
      return () => window.removeEventListener('keydown', onDown);
    }, [open, highlighted, options, onChange]);

    React.useEffect(() => {
      if (!open) return;
      const onClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }, [open]);

    React.useEffect(() => {
      if (open && listRef.current) {
        const item = listRef.current.querySelector('[data-highlighted="true"]');
        item?.scrollIntoView({ block: 'nearest' });
      }
    }, [open, highlighted]);

    return (
      <div className="flex flex-col gap-2" ref={containerRef}>
        {label && (
          <label className="text-[13px] font-medium text-content-secondary">{label}</label>
        )}
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={!!error}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'h-[46px] w-full rounded-md bg-bg-secondary px-4 text-left text-body',
            'border transition-colors duration-150 ease-out-quick flex items-center justify-between',
            'text-content-primary',
            open ? 'border-primary focus:ring-[3px] focus:ring-primary/12' : 'border-[#273244]',
            error ? 'border-danger focus:border-danger focus:ring-danger/12' : '',
            disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer',
            className,
          )}
        >
          <span className={selected ? 'text-content-primary' : 'text-content-muted'}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className={cn('h-4 w-4 text-content-muted transition-transform', open && 'rotate-180')}
            aria-hidden
          />
        </button>
        {open && (
          <ul
            ref={listRef}
            role="listbox"
            className="absolute z-50 mt-1 w-full rounded-md border border-border bg-surface-elevated shadow-card py-1 max-h-60 overflow-auto"
          >
            {options.map((opt, i) => {
              const isSel = opt.value === value;
              const isH = i === highlighted;
              return (
                <li
                  key={opt.value}
                  data-highlighted={isH}
                  role="option"
                  aria-selected={isSel}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex items-center justify-between px-4 py-2 text-[14px] cursor-pointer',
                    isH ? 'bg-primary-soft text-content-primary' : 'text-content-secondary hover:bg-surface-hover',
                  )}
                >
                  <span>{opt.label}</span>
                  {isSel && <Check className="h-4 w-4 text-primary" aria-hidden />}
                </li>
              );
            })}
          </ul>
        )}
        {(hint || error) && (
          <p className={cn('text-[12px]', error ? 'text-danger' : 'text-content-muted')}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';