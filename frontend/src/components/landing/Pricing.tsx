import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { fadeUp, stagger, viewportOnce } from "./motion";
import { cn } from "@/utils/cn";

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Everything you need to get started.",
    features: [
      "1 resume",
      "3 ATS analyses per month",
      "2 mock interviews per month",
      "Basic feedback report",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "per month",
    blurb: "For anyone actively job hunting.",
    features: [
      "Unlimited resumes",
      "Unlimited ATS analyses",
      "Unlimited mock interviews",
      "Full feedback + transcript",
      "Job match recommendations",
      "Priority AI responses",
    ],
    cta: "Start 7-day trial",
    highlighted: true,
  },
  {
    name: "Teams",
    price: "Custom",
    cadence: "contact us",
    blurb: "For career coaches and bootcamps.",
    features: [
      "Everything in Pro",
      "Multi-seat management",
      "Cohort analytics",
      "Custom question banks",
      "Dedicated support",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[640px] text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[40px]"
          >
            Simple pricing.
            <br />
            No surprises.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 lg:grid-cols-3"
        >
          {tiers.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <Card
                className={cn(
                  "relative flex h-full flex-col p-6",
                  t.highlighted && "border-primary/40 shadow-card-hover",
                )}
              >
                {t.highlighted && (
                  <div className="absolute -top-3 left-6">
                    <Badge tone="ai">Most popular</Badge>
                  </div>
                )}

                <div className="text-card text-text">{t.name}</div>
                <p className="mt-1 text-small text-text-secondary">{t.blurb}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-[36px] font-bold leading-none text-text">
                    {t.price}
                  </span>
                  <span className="text-small text-text-muted">{t.cadence}</span>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-small text-text-secondary">
                      <Check size={14} className="mt-1 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to="/register" className="mt-8">
                  <Button
                    variant={t.highlighted ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {t.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}