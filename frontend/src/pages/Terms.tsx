import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
        <h1
          className="mt-12 text-[36px] leading-tight tracking-[-0.02em] text-text"
          style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700 }}
        >
          Terms of Service
        </h1>
        <p className="mt-3 text-small text-text-muted">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="mt-10 flex flex-col gap-8 text-[15px] leading-relaxed text-text-secondary">
          <Section title="What CareerForge is">
            <p>
              CareerForge is a career preparation tool. It helps you write
              resumes, analyse them against job descriptions, practise
              interviews, and track applications.
            </p>
          </Section>

          <Section title="What CareerForge is not">
            <p>
              CareerForge is not a recruiter, a job board, or an employment
              agency. We don't guarantee employment outcomes. The AI suggestions
              we provide are tools for you to use — they don't replace your own
              judgement about what's true and accurate on your resume.
            </p>
          </Section>

          <Section title="Your account">
            <p>
              You're responsible for keeping your password safe and for the
              content you create in your account. Don't use CareerForge to
              create content that's fraudulent or misleading — including claims
              of experience or qualifications you don't have.
            </p>
          </Section>

          <Section title="AI outputs">
            <p>
              AI models occasionally make mistakes. When CareerForge suggests a
              rewrite, you review it before accepting. You're responsible for
              what ends up in your final resume.
            </p>
          </Section>

          <Section title="Availability">
            <p>
              We aim to keep CareerForge available continuously, but we don't
              promise it. We may pause the service for maintenance or
              improvements. During beta, the service is provided as-is.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If we change these terms materially, we'll notify you by email.
              Continued use of CareerForge after a change means you accept the
              updated terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms? Email{" "}
              <a
                href="mailto:hello@careerforge.ai"
                className="font-medium text-primary hover:underline"
              >
                hello@careerforge.ai
              </a>
              .
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-[20px] leading-tight text-text"
        style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 600 }}
      >
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}