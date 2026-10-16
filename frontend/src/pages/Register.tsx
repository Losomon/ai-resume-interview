import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components/ui';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { PasswordField } from '@/components/auth/PasswordField';
import { SocialAuthOptions } from '@/components/auth/SocialAuthOptions';
import { useAuthStore } from '@/store/authStore';
import { isValidEmail } from '@/utils/validation';

export default function Register() {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const nameError = nameTouched && !name.trim() ? 'Enter your name.' : undefined;
  const emailError =
    emailTouched && !isValidEmail(email) ? 'Enter a valid email address.' : undefined;
  const passwordError =
    passwordTouched && password.length < 8 ? 'Use at least 8 characters.' : undefined;
  const confirmError =
    confirmTouched && !confirm
      ? 'Confirm your password.'
      : confirm && password !== confirm
        ? 'Passwords do not match.'
        : undefined;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    clearError();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmTouched(true);
    if (!name.trim() || !isValidEmail(email) || password.length < 8 || password !== confirm) return;

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch {
      /* error surfaced from store */
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="No fake experience. Ever."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Input
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Solomon Adeyemi"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameTouched(true);
          }}
          onBlur={() => setNameTouched(true)}
          error={nameError}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailTouched(true);
          }}
          onBlur={() => setEmailTouched(true)}
          error={emailError}
          required
        />
        <div className="flex flex-col gap-2">
          <PasswordField
            label="Password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordTouched(true);
              clearError();
            }}
            onBlur={() => setPasswordTouched(true)}
            error={passwordError}
            required
          />
          {password && (
            <>
              <div
                className="flex gap-1.5"
                role="meter"
                aria-label={`Password strength: ${passwordStrengthLabel(password)}`}
                aria-valuemin={0}
                aria-valuemax={3}
                aria-valuenow={passwordStrength(password)}
              >
                {[1, 2, 3].map((bar) => (
                  <span
                    key={bar}
                    className={`h-1 flex-1 rounded-full ${
                      bar <= passwordStrength(password)
                        ? passwordStrengthColor(password)
                        : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-text-muted">
                Password strength: {passwordStrengthLabel(password)}
              </p>
            </>
          )}
        </div>
        <PasswordField
          label="Confirm password"
          name="confirm"
          autoComplete="new-password"
          placeholder="Repeat password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setConfirmTouched(true);
            clearError();
          }}
          onBlur={() => setConfirmTouched(true)}
          error={confirmError}
          required
        />
        {confirm && !confirmError && (
          <p className="-mt-4 text-small text-success" role="status">
            Passwords match.
          </p>
        )}

        {error && (
          <div className="rounded-button border border-problem/20 bg-problem-tint px-3 py-2.5 text-small text-problem">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" variant="primary" loading={loading} className="mt-2 w-full">
          Create account
        </Button>
        <SocialAuthOptions />

        <p className="text-center text-xs leading-relaxed text-text-muted">
          By creating an account you agree to our{' '}
          <Link to="/terms" className="underline hover:text-text-secondary">
            Terms
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline hover:text-text-secondary">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthLayout>
  );
}

function passwordStrength(password: string): number {
  return [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d|[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
}

function passwordStrengthLabel(password: string): string {
  const strength = passwordStrength(password);
  if (strength <= 1) return 'Weak';
  if (strength === 2) return 'Fair';
  return 'Strong';
}

function passwordStrengthColor(password: string): string {
  const strength = passwordStrength(password);
  if (strength <= 1) return 'bg-problem';
  if (strength === 2) return 'bg-attention';
  return 'bg-success';
}
