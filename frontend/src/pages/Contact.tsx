import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Clock } from "lucide-react";
import { AIMark, Card, Button } from "@/components/ui";

export default function Contact() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="mx-auto flex h-[72px] max-w-[720px] items-center px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-small font-medium text-text-secondary transition-colors hover:text-text"
        >
          <ArrowLeft size={14} />
          Back to CareerForge
        </Link>
      </header>

      <main className="mx-auto max-w-[720px] px-6 pb-24">
        <div className="mt-12 text-center">
          <div className="flex justify-center">
            <AIMark size={48} glow />
          </div>
          <h1
            className="mt-6 text-[36px] leading-tight tracking-[-0.02em] text-text"
            style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700 }}
          >
            Get in touch.
          </h1>
          <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-relaxed text-text-secondary">
            Feedback, bug reports, or a question about how CareerForge works —
            all welcome. I read every email.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Card className="flex flex-col items-center gap-2 p-5 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-tint text-primary">
              <Mail size={18} />
            </span>
            <div className="mt-1 text-small font-semibold text-text">Email</div>
            <a
              href="mailto:hello@careerforge.ai"
              className="text-xs text-primary hover:underline"
            >
              hello@careerforge.ai
            </a>
          </Card>

          <Card className="flex flex-col items-center gap-2 p-5 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-tint text-primary">
              <MessageSquare size={18} />
            </span>
            <div className="mt-1 text-small font-semibold text-text">Feedback</div>
            <p className="text-xs leading-relaxed text-text-secondary">
              Tell me what's working and what isn't.
            </p>
          </Card>

          <Card className="flex flex-col items-center gap-2 p-5 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-tint text-primary">
              <Clock size={18} />
            </span>
            <div className="mt-1 text-small font-semibold text-text">Response time</div>
            <p className="text-xs leading-relaxed text-text-secondary">
              Usually within a few hours.
            </p>
          </Card>
        </div>

        <Card className="mt-8 flex flex-col items-center gap-4 p-8 text-center">
          <p className="max-w-[420px] text-small leading-relaxed text-text-secondary">
            For password issues, include the email address on your account. For
            bug reports, a screenshot helps.
          </p>
          <a href="mailto:hello@careerforge.ai?subject=CareerForge feedback">
            <Button size="lg">
              <Mail size={16} />
              Email me
            </Button>
          </a>
        </Card>
      </main>
    </div>
  );
}