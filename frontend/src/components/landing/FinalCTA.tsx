import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button, AIMark } from '@/components/ui';
import { fadeUp, stagger, viewportOnce } from './motion';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 lg:py-32">
      {/* Green glow behind the panel */}
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
          Your resume, ATS score, and interview practice — in one honest place. Every suggestion is
          yours to accept or reject.
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

        {/* Trust line */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-text-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-primary" />
            No credit card required
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-primary" />
            Free to start
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-primary" />
            Your data stays yours
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
