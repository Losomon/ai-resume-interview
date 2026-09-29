import { Navbar } from "../components/landing/Navbar"; import { Hero } from "../components/landing/Hero"; import { Footer } from "../components/landing/Footer"; import { CareerSignal } from "../components/ui/CareerSignal";
// Order follows the spec: Navbar > Hero (+ live preview) > One Platform > feature sections > ... > Footer. Add stubs from components/landing as they're built.
export default function Landing() {
  return (<><Navbar /><main><Hero />
    <section className="mx-auto max-w-[1000px] px-6 py-24 text-center"><h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">One platform. Your entire career.</h2><p className="mt-3 mb-12">Each step feeds the next, so every session moves your readiness score.</p><CareerSignal /></section></main><Footer /></>); }
