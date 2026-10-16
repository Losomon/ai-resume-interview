import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Scale } from 'lucide-react';
import { AIMark, Card } from '@/components/ui';

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const EFFECTIVE_DATE = 'January 15, 2026';
const LAST_UPDATED = 'January 15, 2026';

const sections = [
  { id: 'acceptance', title: 'Acceptance of terms' },
  { id: 'eligibility', title: 'Eligibility and user accounts' },
  { id: 'account-security', title: 'Account security and responsibilities' },
  { id: 'acceptable-use', title: 'Acceptable use' },
  { id: 'user-content', title: 'User content and uploaded resumes' },
  { id: 'ai-content', title: 'AI-generated content and limitations' },
  { id: 'employment', title: 'Job applications and employment outcomes' },
  { id: 'beta', title: 'Beta access and service availability' },
  { id: 'payments', title: 'Payments and subscriptions' },
  { id: 'intellectual-property', title: 'Intellectual property' },
  { id: 'termination', title: 'Suspension and account termination' },
  { id: 'liability', title: 'Disclaimers and limitation of liability' },
  { id: 'changes', title: 'Changes to the terms' },
  { id: 'governing-law', title: 'Governing law and disputes' },
  { id: 'contact', title: 'Contact information' },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Terms() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-bg">
      {/* ==================================================================== */}
      {/*  Section 1 — Header (same as Privacy Policy)                         */}
      {/* ==================================================================== */}
      <header className="border-b border-border bg-surface/60 backdrop-blur-sm">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text transition-opacity hover:opacity-75"
            >
              <AIMark size={26} />
              <span className="hidden sm:inline">CareerForge AI</span>
            </Link>

            <span className="hidden h-5 w-px bg-border sm:block" />

            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text sm:inline-flex"
            >
              <ArrowLeft size={15} />
              Back to CareerForge
            </Link>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-75"
          >
            Get started
            <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main>
        {/* ================================================================== */}
        {/*  Section 2 — Page introduction                                     */}
        {/* ================================================================== */}
        <section className="px-6 pb-10 pt-14 sm:pb-12 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text-secondary">
              <Scale size={13} className="text-primary" />
              LEGAL
            </div>

            <h1
              className="text-[34px] font-bold leading-[1.15] tracking-[-0.03em] text-text sm:text-[44px]"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Terms of Service
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
              The rules and responsibilities that apply when you use CareerForge AI.
            </p>

            <p className="mt-4 text-sm text-text-secondary">
              Effective: <span className="text-text">{EFFECTIVE_DATE}</span>
              <span className="mx-2 text-border">·</span>
              Last updated: <span className="text-text">{LAST_UPDATED}</span>
            </p>
          </div>
        </section>

        {/* ================================================================== */}
        {/*  Section 3 — Table of contents + terms                             */}
        {/* ================================================================== */}
        <section className="px-6 pb-20 sm:pb-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
            {/* ---------- Left sidebar — TOC ---------- */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                On this page
              </p>

              <nav className="mt-4">
                <ul className="space-y-1">
                  {sections.map(({ id, title }) => {
                    const isActive = activeId === id;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={
                            'block rounded-md px-3 py-2 text-sm transition-colors ' +
                            (isActive
                              ? 'bg-primary/10 font-medium text-primary'
                              : 'text-text-secondary hover:bg-surface hover:text-text')
                          }
                        >
                          {title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* ---------- Main document ---------- */}
            <article className="min-w-0">
              <Card className="border border-border p-6 sm:p-10">
                {/* Document header */}
                <header className="border-b border-border pb-6">
                  <h2
                    className="text-xl font-semibold text-text sm:text-2xl"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    Terms of Service
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary">
                    Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    The rules and responsibilities that apply when you use CareerForge AI.
                  </p>
                </header>

                {/* Sections */}
                <div className="mt-8 space-y-10">
                  <Section id="acceptance" number="1" title="Acceptance of terms">
                    <p>
                      By creating an account or using CareerForge AI, you agree to these Terms of
                      Service. If you do not agree, please do not use the service.
                    </p>
                  </Section>

                  <Section id="eligibility" number="2" title="Eligibility and user accounts">
                    <p>
                      You must be at least 16 years old to use CareerForge. You agree to provide
                      accurate information when creating your account and to keep it up to date.
                    </p>
                  </Section>

                  <Section
                    id="account-security"
                    number="3"
                    title="Account security and responsibilities"
                  >
                    <p>
                      You are responsible for keeping your login credentials secure and for all
                      activity that happens under your account. Notify us promptly if you believe
                      your account has been compromised.
                    </p>
                  </Section>

                  <Section id="acceptable-use" number="4" title="Acceptable use">
                    <p>
                      You agree not to misuse CareerForge — including by attempting to disrupt the
                      service, access other users' data, or use the platform for unlawful purposes.
                    </p>
                  </Section>

                  <Section id="user-content" number="5" title="User content and uploaded resumes">
                    <p>
                      You retain ownership of the resumes, cover letters, and other content you
                      upload. By using the service, you grant us the limited rights needed to
                      process that content and provide the features you request.
                    </p>
                  </Section>

                  <Section id="ai-content" number="6" title="AI-generated content and limitations">
                    <p>
                      CareerForge uses AI to generate suggestions, rewrites, and feedback. AI output
                      can be inaccurate, incomplete, or misleading. You are responsible for
                      reviewing every suggestion before using it and for the accuracy of any claim
                      you make in a resume or application.
                    </p>
                    <p>
                      We design CareerForge to avoid inventing experience, but no automated system
                      is perfect. Always use your own judgment and only submit content you can stand
                      behind.
                    </p>
                  </Section>

                  <Section
                    id="employment"
                    number="7"
                    title="Job applications and employment outcomes"
                  >
                    <p>
                      CareerForge helps you prepare and apply, but it does not guarantee interviews,
                      job offers, or any particular employment outcome. Hiring decisions are made by
                      employers, not by us.
                    </p>
                  </Section>

                  <Section id="beta" number="8" title="Beta access and service availability">
                    <p>
                      Some features may be offered in beta. Beta features are provided as-is, may
                      change or be removed without notice, and may not be suitable for critical use.
                    </p>
                  </Section>

                  <Section id="payments" number="9" title="Payments and subscriptions">
                    <p>
                      Paid plans, if offered, are billed according to the terms shown at checkout.
                      Fees are non-refundable except where required by law.
                    </p>
                  </Section>

                  <Section id="intellectual-property" number="10" title="Intellectual property">
                    <p>
                      The CareerForge name, interface, and underlying technology are owned by us and
                      protected by applicable intellectual property laws. These terms do not grant
                      you any rights to our trademarks or branding.
                    </p>
                  </Section>

                  <Section id="termination" number="11" title="Suspension and account termination">
                    <p>
                      You may close your account at any time. We may suspend or terminate accounts
                      that violate these terms, present a security risk, or are used unlawfully.
                    </p>
                  </Section>

                  <Section
                    id="liability"
                    number="12"
                    title="Disclaimers and limitation of liability"
                  >
                    <p>
                      CareerForge is provided "as is" without warranties of any kind. To the fullest
                      extent permitted by law, we are not liable for indirect, incidental, or
                      consequential damages arising from your use of the service.
                    </p>
                  </Section>

                  <Section id="changes" number="13" title="Changes to the terms">
                    <p>
                      We may update these terms from time to time. When we do, we'll revise the
                      "last updated" date above and, where appropriate, notify you. Continued use of
                      CareerForge after changes means you accept the updated terms.
                    </p>
                  </Section>

                  <Section id="governing-law" number="14" title="Governing law and disputes">
                    <p>
                      These terms are governed by the laws of the jurisdiction in which CareerForge
                      operates. Any disputes will be resolved in the courts of that jurisdiction,
                      unless applicable law requires otherwise.
                    </p>
                  </Section>

                  <Section id="contact" number="15" title="Contact information">
                    <p>
                      Questions about these terms can be sent to{' '}
                      <a
                        href="mailto:legal@careerforge.ai"
                        className="font-medium text-primary hover:underline"
                      >
                        legal@careerforge.ai
                      </a>
                      .
                    </p>
                  </Section>
                </div>
              </Card>

              {/* ============================================================ */}
              {/*  Section 4 — Questions about the terms                       */}
              {/* ============================================================ */}
              <div className="mt-10 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
                <p className="text-sm leading-7 text-text-secondary">
                  Questions about these terms?{' '}
                  <Link to="/contact" className="font-semibold text-primary hover:underline">
                    Contact our support team
                  </Link>
                  .
                </p>

                <a
                  href="mailto:legal@careerforge.ai"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <Mail size={15} />
                  legal@careerforge.ai
                  <ArrowRight size={15} />
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* ==================================================================== */}
      {/*  Section 5 — Footer (same as Privacy / About / Contact)              */}
      {/* ==================================================================== */}
      <footer className="border-t border-border px-6 py-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-text-secondary sm:flex-row">
          <Link to="/" className="font-semibold text-text hover:text-primary">
            CareerForge AI
          </Link>

          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/about" className="hover:text-text">
              About
            </Link>
            <Link to="/contact" className="hover:text-text">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-text">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-text">
              Terms
            </Link>
          </div>

          <p>© {new Date().getFullYear()} CareerForge AI</p>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section helper                                                            */
/* -------------------------------------------------------------------------- */

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h3 className="text-base font-semibold text-text sm:text-lg">
        <span className="mr-2 text-primary">{number}.</span>
        {title}
      </h3>
      <div className="mt-3 space-y-4 text-[15px] leading-8 text-text-secondary">{children}</div>
    </section>
  );
}
