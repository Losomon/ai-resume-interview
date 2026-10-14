import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Shield, Compass } from "lucide-react";
import { AIMark, Card, Button } from "@/components/ui";

export default function About() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Back link */}
      <header className="mx-auto flex h-[72px] max-w-[820px] items-center px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-small font-medium text-text-secondary transition-colors hover:text-text"
        >
          <ArrowLeft size={14} />
          Back to CareerForge
        </Link>
      </header>

      <main className="mx-auto max-w-[820px] px-6 pb-24">
        {/* Hero */}
        <div className="mt-12 text-center">
          <div className="flex justify-center">
            <AIMark size={56} glow />
          </div>
          <h1
            className="mt-6 text-[36px] leading-tight tracking-[-0.03em] text-text lg:text-[48px]"
            style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700 }}
          >
            Why I built CareerForge.
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-text-secondary">
            A note on what this product is, what it isn't, and the one rule
            everything else follows from.
          </p>
        </div>

        {/* Body */}
        <article className="mt-16 flex flex-col gap-8 text-[16px] leading-relaxed text-text-secondary">
          <p>
            I built CareerForge because every AI resume tool I tried was willing
            to lie for me.
          </p>

          <p>
            Ask one to improve a bullet and it would invent metrics I never
            measured. Ask one to match me to a job and it would suggest adding
            skills I'd never used. Ask one for interview feedback and it would
            tell me I was great. The advice always sounded helpful. It just
            wasn't true.
          </p>

          <p>
            That's dangerous. A resume that claims skills you don't have gets
            you into an interview you'll fail. A cover letter that inflates your
            experience follows you to the offer stage and beyond.
          </p>

          <p className="text-text">
            So CareerForge was built on one rule:{" "}
            <strong className="font-semibold">
              it will never tell you to claim something you can't back up.
            </strong>
          </p>

          <p>
            When you run an ATS analysis, we don't just say "add these keywords."
            We split missing terms into two groups. Some are{" "}
            <em>missing evidence</em> — you probably have them, you just haven't
            written them down. Others are{" "}
            <em>real gaps</em> — you don't have them, so don't pretend. Our
            advice differs for each. That distinction is the whole product.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <ValueCard
              icon={<Shield size={18} />}
              title="Honest by default"
              body="Every AI suggestion shows the original and the rewrite side by side. You accept or reject — you never sign off on a lie."
            />
            <ValueCard
              icon={<Compass size={18} />}
              title="One workflow"
              body="Resume, ATS score, interview practice, and job tracking in one place. Not five tools bolted together."
            />
            <ValueCard
              icon={<Heart size={18} />}
              title="Built for job seekers"
              body="Not recruiters. Not hiring managers. The person doing the applying."
            />
          </div>

          <p>
            CareerForge can't guarantee you a job. Nothing can. It can make sure
            you're ready when the right opportunity shows up — and it can do
            that without asking you to pretend you're someone you're not.
          </p>

          <p className="text-text">
            If that sounds like the kind of tool you want, I'd love to hear from
            you. Email{" "}
            <a
              href="mailto:hello@careerforge.ai"
              className="font-medium text-primary hover:underline"
            >
              hello@careerforge.ai
            </a>
            .
          </p>
        </article>

        {/* CTA */}
        <Card className="mt-16 flex flex-col items-center gap-5 p-8 text-center">
          <h2
            className="text-[22px] leading-tight text-text"
            style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 600 }}
          >
            Ready to try it?
          </h2>
          <p className="max-w-[420px] text-small leading-relaxed text-text-secondary">
            Free while in beta. No credit card. Every suggestion yours to
            accept or reject.
          </p>
          <Link to="/register">
            <Button size="lg">Create your account</Button>
          </Link>
        </Card>
      </main>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="p-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-tint text-primary">
        {icon}
      </span>
      <div className="mt-3 text-small font-semibold text-text">{title}</div>
      <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
        {body}
      </p>
    </Card>
  );
}