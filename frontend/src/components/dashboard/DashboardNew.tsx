import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, Card, AIMark } from "@/components/ui";
import { StatCard } from "./StatCard";
import { CareerChecklist } from "./CareerChecklist";
import { RecentActivity } from "./RecentActivity";

const softSpring = { type: "spring" as const, stiffness: 80, damping: 20 };

export function DashboardNew({ userName }: { userName: string }) {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const checklist = [
    { id: "resume",      label: "Create your first resume",        href: "/resumes",      done: false },
    { id: "ats",         label: "Run an ATS analysis",             href: "/ats",          done: false },
    { id: "interview",   label: "Practice an interview",           href: "/interview",    done: false },
    { id: "application", label: "Track your first job application", href: "/applications", done: false },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* ---------- Welcome ---------- */}
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={softSpring}
        className="mb-2"
      >
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {today}
        </p>
        <h1
          className="mt-3 font-display text-[36px] leading-[1.05] tracking-[-0.03em] text-text lg:text-[44px]"
          style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700 }}
        >
          Good morning, {userName}.
        </h1>
        <p className="mt-3 max-w-[560px] text-[16px] leading-relaxed text-text-secondary">
          Let's take the next step. Everything you need is here — start wherever
          makes sense for you.
        </p>
      </motion.header>

      {/* ---------- Stat cards ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...softSpring, delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard value="0" label="My resumes"           action="+ Create resume"      href="/resumes" />
        <StatCard value="—" label="Latest ATS score"     action="Analyze resume"       href="/ats" />
        <StatCard value="0" label="Practice interviews"  action="Start practicing"     href="/interview" />
        <StatCard value="0" label="Applications tracked" action="Track an application" href="/applications" />
      </motion.div>

      {/* ---------- Checklist + AI recommendation ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...softSpring, delay: 0.1 }}
        className="grid gap-4 lg:grid-cols-[1.4fr_1fr]"
      >
        <CareerChecklist items={checklist} />

        <Card className="flex flex-col p-6">
          <div className="flex items-center gap-2 text-small font-medium text-text-secondary">
            <AIMark size={16} />
            AI career recommendation
          </div>

          <p className="mt-4 text-small leading-relaxed text-text-secondary">
            Your personalized recommendation appears here once you've created a
            resume and run an ATS analysis. It's based on your real data — never
            invented.
          </p>

          <div className="mt-auto pt-6">
            <Button variant="secondary" onClick={() => navigate("/resumes")}>
              Get started
              <ArrowRight size={14} />
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* ---------- Recent activity ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...softSpring, delay: 0.15 }}
      >
        <RecentActivity items={[]} />
      </motion.div>
    </div>
  );
}