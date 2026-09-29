import { Hero } from "../components/landing/Hero";
import { CareerSignal } from "../components/ui/CareerSignal";
export default function Landing() {
  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-[1000px] px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">One platform. Your entire career.</h2>
        <p className="mt-3 mb-12 text-soft">Each step feeds the next, so every session moves your readiness score.</p>
        <CareerSignal />
      </section>
    </main>
  );
}
