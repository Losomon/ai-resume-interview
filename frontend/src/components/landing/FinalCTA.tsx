import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, AIMark } from "@/components/ui";
import { fadeUp, stagger, viewportOnce } from "./motion";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 bg-glow-green opacity-50 blur-3xl" />

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mx-auto max-w-[720px] px-6 text-center lg:px-10"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          <AIMark size={64} glow />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-8 text-[34px] font-bold leading-tight tracking-tight text-text lg:text-[48px]"
        >
          Build a career that
          <br />
          moves with you.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-[480px] text-[17px] leading-relaxed text-text-secondary"
        >
          Free to start. No credit card. Your resume, ATS score, and interview
          practice in one place.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link to="/register">
            <Button size="lg">
              Get started free
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="ghost">
              I already have an account
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}