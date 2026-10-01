import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Input, AIMark } from "@/components/ui";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { authApi } from "@/services/auth.api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle="We sent a reset link to your email."
        footer={
          <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
            Back to sign in
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <AIMark size={48} />
          <p className="text-small text-text-secondary">
            If an account exists for <span className="font-medium text-text">{email}</span>,
            you&apos;ll receive a link to reset your password shortly.
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link."
      footer={
        <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={error ?? undefined}
        />

        <Button type="submit" size="lg" loading={loading} className="mt-2 w-full">
          Send reset link
        </Button>
      </form>
    </AuthLayout>
  );
}