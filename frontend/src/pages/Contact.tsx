import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MessageSquare,
  LifeBuoy,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { AIMark, Card, Button } from '@/components/ui';

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const channels = [
  {
    icon: Mail,
    title: 'Email support',
    description: 'hello@careerforge.ai',
    href: 'mailto:hello@careerforge.ai',
    isLink: true,
  },
  {
    icon: MessageSquare,
    title: 'Feedback and ideas',
    description: 'Share suggestions for improving the platform.',
    isLink: false,
  },
  {
    icon: LifeBuoy,
    title: 'Technical support',
    description: 'Get help with accounts and platform issues.',
    isLink: false,
  },
];

const subjects = ['Account Support', 'Technical Issue', 'Feedback', 'Other'];

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // TODO: replace with your real backend / email service endpoint.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("We couldn't send your message right now. Please try again.");
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-bg">
      {/* ==================================================================== */}
      {/*  Section 1 — Header (same as About)                                  */}
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
        {/*  Section 2 — Introductory hero                                     */}
        {/* ================================================================== */}
        <section className="px-6 pb-12 pt-16 sm:pb-16 sm:pt-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text-secondary">
              <Mail size={13} className="text-primary" />
              CONTACT CAREERFORGE
            </div>

            <h1
              className="text-[36px] font-bold leading-[1.15] tracking-[-0.03em] text-text sm:text-[48px]"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              We're here to help.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-text-secondary">
              Have a question, found an issue, or have an idea to improve CareerForge? We'd love to
              hear from you.
            </p>
          </div>
        </section>

        {/* ================================================================== */}
        {/*  Section 3 — Main contact area                                     */}
        {/* ================================================================== */}
        <section className="px-6 pb-20 sm:pb-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            {/* ---------- Left column — support channels ---------- */}
            <div>
              <h2
                className="text-2xl font-semibold tracking-tight text-text sm:text-3xl"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                Let's talk
              </h2>

              <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
                Whether you need a hand with your account, want to report something that isn't
                working, or have an idea that would make CareerForge better — we're listening.
              </p>

              <div className="mt-8 space-y-3">
                {channels.map(({ icon: Icon, title, description, href, isLink }) => (
                  <Card
                    key={title}
                    className="flex items-start gap-4 border border-border p-5 transition-all duration-200 hover:shadow-md"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={18} />
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text">{title}</p>

                      {isLink ? (
                        <a
                          href={href}
                          className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
                        >
                          {description}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm leading-6 text-text-secondary">{description}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* ---------- Right column — contact form ---------- */}
            <Card className="border border-border p-6 sm:p-8">
              <h2
                className="text-2xl font-semibold tracking-tight text-text sm:text-3xl"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                Send us a message
              </h2>

              {/* ---------- Success state ---------- */}
              {status === 'success' && (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-text">Message sent</p>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      Thanks for reaching out. We'll get back to you as soon as we can.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-3 text-sm font-semibold text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}

              {/* ---------- Error state ---------- */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-5"
                >
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      We couldn't send your message
                    </p>
                    <p className="mt-1 text-sm leading-6 text-red-700">{errorMessage}</p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-3 text-sm font-semibold text-red-700 hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}

              {/* ---------- Form ---------- */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      className="mt-2 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={update('subject')}
                      className="mt-2 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="How can we help?"
                      className="mt-2 w-full resize-y rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm leading-6 text-text placeholder:text-text-secondary/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </section>
      </main>

      {/* ==================================================================== */}
      {/*  Section 5 — Footer (same as About)                                  */}
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
