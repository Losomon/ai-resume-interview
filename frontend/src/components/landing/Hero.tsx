import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { FileText, Mic } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Progress } from "../ui/Progress";
import { Badge } from "../ui/Badge";
import { SparkIcon } from "../ui/SparkIcon";
import { AIOrb } from "../ui/AIOrb";

const rise = (delay: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: "easeOut" as const } });

function Score({ to }: { to: number }) {
  const v = useMotionValue(0); const r = useTransform(v, (n) => Math.round(n));
  useEffect(() => { const c = animate(v, to, { duration: 1.6, delay: 1.2, ease: "easeOut" }); return c.stop; }, [to, v]);
  return <motion.span className="text-6xl font-bold text-ink tabular-nums">{r}</motion.span>;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-primary/20 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-6 text-center">
        <motion.div {...rise(0.3)}><Badge><SparkIcon size={12} /> AI career platform</Badge></motion.div>
        <motion.h1 {...rise(0.4)} className="h-hero mt-5">Your career.<br />Engineered.</motion.h1>
        <motion.p {...rise(0.55)} className="mx-auto mt-5 max-w-xl text-lg text-soft">Build a stronger resume, beat the ATS, and rehearse interviews with feedback that tells you exactly what to fix.</motion.p>
        <motion.div {...rise(0.7)} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg"><FileText size={18} /> Build my resume</Button>
          <Button size="lg" variant="ghost"><Mic size={18} /> Practice an interview</Button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50, rotateX: 5, scale: 0.97 }} animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }} style={{ perspective: 1000 }} className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute -right-10 -top-16 hidden lg:block opacity-90"><AIOrb size={180} /></div>
          <Card className="text-left grid md:grid-cols-[200px_1fr] gap-8 p-8 bg-elevated/80 backdrop-blur">
            <div className="text-center">
              <p className="text-sm text-mute">Career readiness</p>
              <div className="my-2"><Score to={82} /><span className="text-mute">/100</span></div>
              <Badge tone="ok">Up 6 this week</Badge>
            </div>
            <div className="space-y-4">
              <Progress label="Resume" value={92} />
              <Progress label="ATS match" value={78} tone="#38BDF8" />
              <Progress label="Interview" value={86} />
              <Progress label="Skills" value={68} tone="#F59E0B" />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
