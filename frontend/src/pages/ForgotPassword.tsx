import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button, Input, AIMark } from '@/components/ui';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { isValidEmail } from '@/utils/validation';

const SUPPORT_EMAIL = 'hello@careerforge.ai';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <AuthLayout
        title="Reach out to us"
        subtitle="Password reset isn't automated yet."
        footer={
          <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
            Back to sign in
          </Link>
        }
      >
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-glow-green opacity-50 blur-xl" />
              <AIMark size={48} glow />
            </div>
            <p className="text-small leading-relaxed text-text-secondary">
              Send us an email from <span className="font-medium text-text">{email}</span> and
              we&apos;ll help you get back into your account — usually within a few hours.
            </p>
          </motion.div>

          <a href={`mailto:${SUPPORT_EMAIL}?subject=Password reset request`}>
            <Button size="lg" className="w-full">
              <Mail size={16} />
              Email {SUPPORT_EMAIL}
            </Button>
          </a>

          <p className="text-center text-xs leading-relaxed text-text-muted">
            Automated reset is coming soon. In the meantime, human help is faster.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll show you how to get back in."
      footer={
        <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
          Back to sign in
        </Link>
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

        <Button type="submit" size="lg" className="mt-2 w-full" disabled={!email.trim()}>
          Continue
        </Button>

        <p className="text-center text-xs leading-relaxed text-text-muted">
          We&apos;ll check if there&apos;s an account with this email and show you the next step.
        </p>
      </form>
    </AuthLayout>
  );
}
