import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components/ui';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { PasswordField } from '@/components/auth/PasswordField';
import { useAuthStore } from '@/store/authStore';
import { isValidEmail } from '@/utils/validation';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();

  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      /* error surfaced from store */
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue forging your career."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary-hover">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(undefined);
          }}
          onBlur={() => {
            setEmailError(email && !isValidEmail(email) ? 'Enter a valid email address.' : undefined);
          }}
          error={emailError}
          required
        />

        <div className="flex flex-col gap-1.5">
          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-text-secondary hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && (
          <div className="rounded-button border border-problem/20 bg-problem-tint px-3 py-2.5 text-small text-problem">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" loading={loading} className="mt-2 w-full">
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
