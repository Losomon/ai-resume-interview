import { useEffect, useState } from "react"; import { motion } from "framer-motion"; import { Link } from "react-router-dom"; import clsx from "clsx";
import { SparkIcon } from "../ui/SparkIcon"; import { Button } from "../ui/Button";
export function Navbar() { const [s, setS] = useState(false);
  useEffect(() => { const f = () => setS(scrollY > 12); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return (<motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className={clsx("fixed top-0 inset-x-0 z-40 h-[72px] transition-colors", s && "bg-bg/85 backdrop-blur-xl border-b border-line")}>
    <div className="mx-auto max-w-[1200px] h-full px-6 flex items-center justify-between"><Link to="/" className="flex items-center gap-2 text-ink font-semibold"><SparkIcon size={20} animate="glow" />CareerForge</Link>
      <nav aria-label="Sections" className="hidden md:flex gap-8 text-sm">{["Features", "AI Interview", "ATS", "Pricing"].map((l) => <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="hover:text-ink transition-colors">{l}</a>)}</nav>
      <div className="flex items-center gap-3"><Link to="/login" className="text-sm hover:text-ink hidden sm:block">Log in</Link><Link to="/register"><Button>Get started</Button></Link></div></div></motion.header>); }
