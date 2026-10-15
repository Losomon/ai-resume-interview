import { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui';

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  error?: string;
};

export function PasswordField({ label, error, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        label={label}
        type={visible ? 'text' : 'password'}
        error={error}
        className="pr-11"
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        className="absolute right-3 top-[34px] flex h-6 w-6 items-center justify-center rounded text-text-muted transition-colors hover:text-text"
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}
