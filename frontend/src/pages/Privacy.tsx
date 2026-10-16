import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { AIMark, Card } from '@/components/ui';

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const LAST_UPDATED = 'January 15, 2026';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information we collect' },
  { id: 'how-we-use', title: 'How we use your information' },
  { id: 'resume-processing', title: 'Resume and document processing' },
  { id: 'ai-providers', title: 'AI services and third-party providers' },
  { id: 'storage-security', title: 'Data storage and security' },
  { id: 'retention', title: 'Data retention and deletion' },
  { id: 'cookies', title: 'Cookies and analytics' },
  { id: 'your-rights', title: 'Your privacy rights' },
  { id: 'children', title: "Children's privacy" },
  { id: 'changes', title: 'Changes to the policy' },
  { id: 'contact', title: 'Contact information' },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Privacy() {
  const [activeId, setActiveId] = useState(sections[0].id);

  /* Scroll-spy: highlight the TOC entry for the section in view. */
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
      {/*  Section 1 — Header (same as About / Contact)                        */}
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
              <ShieldCheck size={13} className="text-primary" />
              LEGAL
            </div>

            <h1
              className="text-[34px] font-bold leading-[1.15] tracking-[-0.03em] text-text sm:text-[44px]"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary">
              Learn how CareerForge AI collects, uses, stores, and protects your information.
            </p>

            <p className="mt-4 text-sm text-text-secondary">
              Last updated: <span className="text-text">{LAST_UPDATED}</span>
            </p>

            <p className="mt-6 max-w-2xl border-l-2 border-primary/30 pl-4 text-sm leading-7 text-text-secondary">
              We respect your privacy. This policy is written in plain language, and we only collect
              what we need to run CareerForge well.
            </p>
          </div>
        </section>

        {/* ================================================================== */}
        {/*  Section 3 — Table of contents + document                          */}
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
                    Privacy Policy
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary">Last updated: {LAST_UPDATED}</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    How we handle your information.
                  </p>
                </header>

                {/* Sections */}
                <div className="mt-8 space-y-10">
                  <Section id="introduction" number="1" title="Introduction">
                    <p>
                      CareerForge AI ("we", "us") provides tools that help you build resumes,
                      analyze job descriptions, practice interviews, and track applications. This
                      policy explains what information we collect when you use those tools, why we
                      collect it, and the choices you have.
                    </p>
                    <p>
                      By using CareerForge, you agree to the practices described here. If you do not
                      agree, please do not use the service.
                    </p>
                  </Section>

                  <Section id="information-we-collect" number="2" title="Information we collect">
                    <p>
                      We collect information you provide directly, such as your name, email address,
                      account credentials, and the content you choose to upload — including resumes,
                      cover letters, and job descriptions.
                    </p>
                    <p>
                      We also collect limited technical information automatically, such as your
                      browser type, device, and general usage patterns, to keep the service secure
                      and working properly.
                    </p>
                  </Section>

                  <Section id="how-we-use" number="3" title="How we use your information">
                    <p>
                      We use your information to operate CareerForge, generate the suggestions you
                      request, communicate with you about your account, and improve the product. We
                      do not sell your personal information.
                    </p>
                  </Section>

                  <Section id="resume-processing" number="4" title="Resume and document processing">
                    <p>
                      Resumes and other documents you upload are processed so we can provide the
                      features you ask for — such as rewriting a bullet point or comparing your
                      resume to a job description. You remain the owner of your content.
                    </p>
                  </Section>

                  <Section
                    id="ai-providers"
                    number="5"
                    title="AI services and third-party providers"
                  >
                    <p>
                      Some features rely on third-party AI providers to generate suggestions. When
                      you use those features, the relevant content may be sent to those providers
                      solely to produce the requested output. We choose providers that contractually
                      agree to protect your data.
                    </p>
                  </Section>

                  <Section id="storage-security" number="6" title="Data storage and security">
                    <p>
                      Your data is stored on secure infrastructure with encryption in transit and at
                      rest. Access is limited to what is necessary to run the service.
                    </p>
                  </Section>

                  <Section id="retention" number="7" title="Data retention and deletion">
                    <p>
                      We retain your information for as long as your account is active, or as long
                      as needed to provide the service. You can request deletion of your account and
                      associated data at any time.
                    </p>
                  </Section>

                  <Section id="cookies" number="8" title="Cookies and analytics">
                    <p>
                      We use a small number of cookies to keep you signed in and to understand how
                      the product is used. You can control cookies through your browser settings.
                    </p>
                  </Section>

                  <Section id="your-rights" number="9" title="Your privacy rights">
                    <p>
                      Depending on where you live, you may have the right to access, correct,
                      export, or delete your personal information. To exercise these rights, contact
                      us using the details below.
                    </p>
                  </Section>

                  <Section id="children" number="10" title="Children's privacy">
                    <p>
                      CareerForge is not intended for children under 16, and we do not knowingly
                      collect personal information from them.
                    </p>
                  </Section>

                  <Section id="changes" number="11" title="Changes to the policy">
                    <p>
                      We may update this policy from time to time. When we do, we'll revise the
                      "last updated" date at the top of this page and, where appropriate, notify
                      you.
                    </p>
                  </Section>

                  <Section id="contact" number="12" title="Contact information">
                    <p>
                      Privacy questions can be sent to{' '}
                      <a
                        href="mailto:privacy@careerforge.ai"
                        className="font-medium text-primary hover:underline"
                      >
                        privacy@careerforge.ai
                      </a>
                      .
                    </p>
                  </Section>
                </div>
              </Card>

              {/* ============================================================ */}
              {/*  Section 4 — Privacy questions                               */}
              {/* ============================================================ */}
              <div className="mt-10 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
                <h2
                  className="text-lg font-semibold text-text sm:text-xl"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  Privacy questions
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-text-secondary">
                  If anything in this policy is unclear, or you'd like to ask about your data, email
                  us at{' '}
                  <a
                    href="mailto:privacy@careerforge.ai"
                    className="font-medium text-primary hover:underline"
                  >
                    privacy@careerforge.ai
                  </a>
                  . We'll respond as soon as we can.
                </p>

                <a
                  href="mailto:privacy@careerforge.ai"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <Mail size={15} />
                  privacy@careerforge.ai
                  <ArrowRight size={15} />
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* ==================================================================== */}
      {/*  Section 5 — Footer (same as About / Contact)                        */}
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
