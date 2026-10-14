import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-small text-text-muted">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 flex flex-col gap-8 text-[15px] leading-relaxed text-text-secondary">
          <Section title="What we collect">
            <p>When you create a CareerForge account, we collect:</p>
            <ul className="mt-3 flex flex-col gap-2 pl-5">
              <li className="list-disc">
                Your name and email address
              </li>
              <li className="list-disc">
                The resumes, job descriptions, interview answers, and
                applications you create
              </li>
              <li className="list-disc">
                Basic technical information needed to keep your session
                secure (authentication cookies)
              </li>
            </ul>
          </Section>

          <Section title="What we don't collect">
            <p>
              We don't run tracking scripts. We don't sell your data. We don't
              use your resume or interview answers to train AI models. We don't
              contact you for marketing unless you ask us to.
            </p>
          </Section>

          <Section title="Where your data lives">
            <p>
              Your data is stored in a PostgreSQL database that only
              CareerForge can access. Your session is managed with an HTTP-only
              cookie, which means JavaScript running on the page cannot read
              your session token.
            </p>
          </Section>

          <Section title="AI and your content">
            <p>
              When you use an AI feature, the specific text you're working with
              is sent to our AI provider for processing. We don't store the
              requests beyond what's needed to return the response to you. We
              never send your full resume unless you're using a feature that
              explicitly requires it.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can request a copy of your data, ask us to correct it, or ask
              us to delete your account at any time. Email{" "}
              <a
                href="mailto:hello@careerforge.ai"
                className="font-medium text-primary hover:underline"
              >
                hello@careerforge.ai
              </a>
              .
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we make material changes to how we handle your data, we'll
              notify you by email before the change takes effect.
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