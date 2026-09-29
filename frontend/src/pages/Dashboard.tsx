import { motion } from "framer-motion";
import { WelcomeCard } from "../components/dashboard/WelcomeCard"; import { StatCard, ResumeCard } from "../components/dashboard/ResumeCard";
import { ReadinessScore } from "../components/dashboard/ReadinessScore"; import { RecommendedActions } from "../components/dashboard/RecommendedActions";
const grid = { show: { transition: { staggerChildren: 0.07 } } }; const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };
/** Two-tier grid: summary tiles, then readiness + actions. Pages compose, components render. */
export default function Dashboard() {
  return (<><WelcomeCard /><motion.div variants={grid} initial="hidden" animate="show" className="space-y-4">
    <div className="grid gap-4 md:grid-cols-3"><motion.div variants={item}><ResumeCard /></motion.div><motion.div variants={item}><StatCard label="ATS" value={87} tone="#38BDF8" /></motion.div><motion.div variants={item}><StatCard label="Interview" value={84} /></motion.div></div>
    <div className="grid gap-4 md:grid-cols-2"><motion.div variants={item}><ReadinessScore /></motion.div><motion.div variants={item}><RecommendedActions /></motion.div></div></motion.div></>); }
