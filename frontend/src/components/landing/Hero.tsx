import { motion } from "framer-motion"; import { Button } from "../ui/Button"; import { Card } from "../ui/Card"; import { Progress } from "../ui/Progress";
const fade = (d: number) => ({ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d, ease: "easeOut" as const } });
const H = ({ children }: { children: React.ReactNode }) => <h3 className="mt-5 mb-1.5 border-b border-line pb-1 text-[11px] font-semibold tracking-[0.1em] text-mute">{children}</h3>;
const Item = ({ t, d, tone }: { t: string; d: string; tone: string }) => <li className="flex gap-2 text-sm"><span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone}`} /><span><span className="text-ink">{t}</span>, {d}</span></li>;
export function Hero() {
  return (<section className="pt-32 pb-20"><div className="mx-auto max-w-[1100px] px-6 text-center">
    <motion.p {...fade(0.05)} className="text-xs font-medium tracking-[0.16em] text-mute">CAREERFORGE</motion.p>
    <motion.h1 {...fade(0.1)} className="h-hero mt-4">Your career, engineered.</motion.h1>
    <motion.p {...fade(0.2)} className="mx-auto mt-5 max-w-lg text-lg">Build a stronger resume. Understand how recruiters see it. Practice interviews. Track where you're going.</motion.p>
    <motion.div {...fade(0.3)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button size="lg" to="/register">Build my resume</Button><Button size="lg" variant="ghost" to="/#platform">Explore the platform</Button></motion.div>
    <motion.div {...fade(0.45)} className="mx-auto mt-16 max-w-3xl text-left"><Card flush className="grid overflow-hidden shadow-md md:grid-cols-[1.4fr_1fr]">
      <div className="border-b border-line p-6 md:border-b-0 md:border-r md:p-8"><p className="text-xs text-mute">Resume</p><p className="mt-2 text-xl font-semibold text-ink">Solomon Mwangi</p><p className="text-sm">Software Engineer</p>
        <H>EXPERIENCE</H><p className="text-sm text-ink">Backend Development</p><p className="text-sm">Built and maintained REST services with Java and PostgreSQL.</p>
        <H>SKILLS</H><p className="text-sm">Java, PostgreSQL, React, REST APIs</p></div>
      <div className="bg-elevated p-6 md:p-8"><p className="text-xs text-mute">ATS match · Backend Developer</p><div className="mt-2"><Progress label="ATS match" value={87} /></div>
        <H>MISSING EVIDENCE</H><ul className="space-y-1.5"><Item t="Spring Boot" d="add where you used it" tone="bg-warn" /><Item t="Docker" d="mention container work" tone="bg-warn" /></ul>
        <H>SKILL GAP</H><ul><Item t="AWS" d="not found in your profile" tone="bg-bad" /></ul></div></Card></motion.div></div></section>); }
