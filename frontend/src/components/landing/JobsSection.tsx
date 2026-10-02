import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { fadeUp, stagger, viewportOnce } from "./motion";

const jobs = [
  {
    company: "Google",
    role: "Senior Frontend Developer",
    location: "Remote",
    match: 96,
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    company: "Microsoft",
    role: "Full Stack Developer",
    location: "Hybrid",
    match: 92,
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    company: "Amazon",
    role: "Software Engineer",
    location: "Hybrid",
    match: 88,
    tags: ["Java", "Spring Boot", "AWS"],
  },
];

export function JobsSection() {
  return (
    <section className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Job Matching
            </p>
            <h2 className="mt-5 max-w-[520px] text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[40px]">
              Find roles that fit
              <br />
              who you actually are.
            </h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link to="/register">
              <Button variant="secondary">
                Browse matches
                <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {jobs.map((j) => (
            <motion.div key={`${j.company}-${j.role}`} variants={fadeUp}>
              <Card hover className="h-full p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-bg-secondary text-small font-semibold text-text">
                    {j.company.charAt(0)}
                  </div>
                  <Badge tone={j.match >= 90 ? "progress" : "attention"}>
                    {j.match}% match
                  </Badge>
                </div>

                <h3 className="mt-4 text-[15px] font-semibold leading-snug text-text">
                  {j.role}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
                  {j.company}
                  <span className="text-border-hover">·</span>
                  <MapPin size={11} />
                  {j.location}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-bg-secondary px-2.5 py-0.5 text-xs text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}