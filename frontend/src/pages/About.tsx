import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Sparkles,
  Mail,
} from 'lucide-react';
import { AIMark, Card, Button } from '@/components/ui';

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const values = [
  {
    icon: ShieldCheck,
    title: 'Honesty comes first',
    description:
      'AI suggestions should reflect real experience — not invent it. You stay in control of every claim.',
  },
  {
    icon: Compass,
    title: 'One connected workflow',
    description:
      'Resume building, ATS analysis, interview practice, and application tracking in one workspace.',
  },
  {
    icon: Heart,
    title: 'Built around you',
    description:
      'Career tools designed for job seekers — practical, respectful, and focused on your real ambitions.',
  },
];

const benefits = [
  'Improve your resume',
  'Analyze job descriptions',
  'Practice interviews',
  'Track applications',
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function About() {
  return (
    <div className="min-h-screen overflow-hidden bg-bg">
      {/* ==================================================================== */}
      {/*  Section 1 — Header                                                  */}
      {/* ==================================================================== */}
      <header className="border-b border-border bg-surface/60 backdrop-blur-sm">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6 lg:px-10">
          {/* Left — logo + back link */}
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

          {/* Right — get started */}
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
        {/*  Section 2 — Hero                                                  */}
        {/* ================================================================== */}
        <section className="relative px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
          <div className="pointer-events-none absolute left-1/2 top-16 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-7 flex justify-center">
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <AIMark size={48} glow />
              </div>
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text-secondary">
              <Sparkles size={13} className="text-primary" />
              THE STORY BEHIND CAREERFORGE AI
            </div>

            <h1
              className="mx-auto max-w-3xl text-[40px] font-bold leading-[1.1] tracking-[-0.045em] text-text sm:text-[56px] lg:text-[68px]"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Your next opportunity starts with <span className="text-primary">the real you.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
              CareerForge AI helps you tell your professional story, prepare for opportunities, and
              move forward with confidence — without pretending to be someone you're not.
            </p>
          </div>
        </section>

        {/* ================================================================== */}
        {/*  Section 3 — Our story                                             */}
        {/* ================================================================== */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* Left column — heading */}
            <div className="lg:sticky lg:top-12 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Why we exist
              </p>

              <h2
                className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                AI should help you grow, not help you pretend.
              </h2>

              <p className="mt-5 text-base leading-7 text-text-secondary">
                Better applications begin with a clearer understanding of what you already bring to
                the table.
              </p>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">
                    Real experience. Better presentation.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-text-secondary">
                    Our guiding principle.
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — story paragraphs */}
            <article className="space-y-6 text-[15px] leading-8 text-text-secondary sm:text-base">
              <p>
                CareerForge began with a simple frustration: AI career tools could make almost
                anyone sound impressive, even when the advice crossed the line between presenting
                experience well and inventing experience that never happened.
              </p>

              <p>
                A resume suggestion might add achievements you never measured. A job-matching tool
                might encourage you to claim skills you have never used. Interview feedback might
                tell you what you want to hear instead of what you need to improve.
              </p>

              <p>
                That kind of assistance can create bigger problems later. Your resume should prepare
                you for an interview, not set you up to defend claims you cannot support.
              </p>

              {/* Core promise — soft pink panel */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Our promise
                </p>
                <p
                  className="mt-3 text-xl font-semibold leading-relaxed text-text sm:text-2xl"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  We will never ask you to claim something you cannot back up.
                </p>
              </div>

              <p>
                That principle shapes how CareerForge approaches resume improvement and job
                matching. When a job description contains a missing keyword, the right next step is
                not always to add it. Sometimes you already have the relevant experience but have
                not described it clearly. Other times, it is a genuine skill gap worth working on.
              </p>

              <p>
                CareerForge is designed to help you recognize the difference, present your existing
                strengths, and identify where you can grow. You stay in control of the final
                application and every claim you make.
              </p>
            </article>
          </div>
        </section>

        {/* ================================================================== */}
        {/*  Section 4 — Core values                                           */}
        {/* ================================================================== */}
        <section className="border-y border-border bg-surface/50 px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                What guides us
              </p>

              <h2
                className="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                Career growth, built on trust.
              </h2>

              <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
                Useful technology should make your strengths clearer and your next steps easier to
                understand.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {values.map(({ icon: Icon, title, description }) => (
                <Card
                  key={title}
                  className="group h-full border border-border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-text">{title}</h3>

                  <p className="mt-3 text-sm leading-7 text-text-secondary">{description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/*  Section 5 — What you can do with CareerForge                      */}
        {/* ================================================================== */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border bg-surface p-7 sm:p-10">
              <h2
                className="text-2xl font-semibold text-text sm:text-3xl"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                What you can do with CareerForge
              </h2>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {benefits.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={19} className="mt-1 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 border-t border-border pt-6 text-sm leading-7 text-text-secondary">
                CareerForge cannot guarantee a job offer. What it can do is help you prepare more
                thoughtfully, communicate your strengths more clearly, and approach opportunities
                with greater confidence.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/*  Section 6 — Contact and call to action                            */}
        {/* ================================================================== */}
        <section className="px-6 pb-20 sm:pb-24">
          {/* Contact invitation */}
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-2xl font-semibold text-text sm:text-3xl"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Have a question or an idea?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
              We're building CareerForge to make the job search more thoughtful and human. We'd love
              to hear your feedback.
            </p>

            <a
              href="mailto:hello@careerforge.ai"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <Mail size={15} />
              hello@careerforge.ai
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Closing CTA */}
          <Card className="relative mx-auto mt-16 max-w-5xl overflow-hidden border border-border p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles size={23} />
              </div>

              <h2
                className="mt-5 text-2xl font-semibold text-text sm:text-3xl"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                Ready to move your career forward?
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-text-secondary sm:text-base">
                Build a stronger application, prepare for your next interview, and take the next
                step with confidence.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/register">
                  <Button size="lg">
                    Create your account
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>

                <Link
                  to="/"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text"
                >
                  Explore CareerForge
                </Link>
              </div>

              <p className="mt-5 text-xs text-text-secondary">
                Free during beta · You stay in control of every suggestion
              </p>
            </div>
          </Card>
        </section>
      </main>

      {/* ==================================================================== */}
      {/*  Section 7 — Footer                                                  */}
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
