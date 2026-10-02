import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "./motion";

export function OnePlatform() {
  return (
    <section className="bg-bg py-24 lg:py-32">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-[900px] px-6 text-center lg:px-10"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        >
          One Platform. Your Entire Career.
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mt-5 text-[34px] font-bold leading-[1.15] tracking-tight text-text lg:text-[46px]"
        >
          CareerForge is the AI career
          <br className="hidden sm:block" />
          operating system for serious job seekers.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-text-secondary"
        >
          Not a resume generator. Not an interview bot. A connected system that
          measures where you are and moves you forward.
        </motion.p>
      </motion.div>
    </section>
  );
}