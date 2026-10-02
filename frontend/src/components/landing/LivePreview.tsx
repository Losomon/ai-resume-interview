import { motion } from "framer-motion";
import { Card, AIMark } from "@/components/ui";
import { dashboardRise, fadeUp, stagger, viewportOnce } from "./motion";

export function LivePreview() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[720px] text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <AIMark size={40} glow />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[40px]"
          >
            Everything you need,
            <br />
            in one calm dashboard.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[16px] leading-relaxed text-text-secondary"
          >
            Resume, ATS, interview practice, and career readiness — measured,
            connected, and improving together.
          </motion.p>
        </motion.div>

        <motion.div
          variants={dashboardRise}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          style={{ perspective: 1200 }}
          className="mt-16"
        >
          <div className="rounded-card border border-border bg-card p-3 shadow-card-hover">
            <div className="grid gap-4 rounded-[10px] bg-bg p-6 lg:grid-cols-4">
              <DashboardTile label="Career Readiness" value="82" suffix="/100" />
              <DashboardTile label="Resume Score" value="92" suffix="%" />
              <DashboardTile label="ATS Match" value="87" suffix="/100" />
              <DashboardTile label="Interview" value="84" suffix="/100" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardTile({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix: string;
}) {
  return (
    <Card className="p-5">
      <div className="text-xs text-text-muted">{label}</div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[32px] font-bold leading-none text-text">{value}</span>
        <span className="text-xs text-text-muted">{suffix}</span>
      </div>
    </Card>
  );
}