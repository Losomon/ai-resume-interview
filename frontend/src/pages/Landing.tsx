import { Navbar } from "../components/landing/Navbar"; import { Hero } from "../components/landing/Hero"; import { Footer } from "../components/landing/Footer"; import { CareerProfile } from "../components/ui/CareerProfile";
export default function Landing() {
  return (<><Navbar /><main><Hero />
    <section id="platform" className="mx-auto max-w-[1000px] px-6 py-24 text-center"><h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">One profile that grows with you.</h2>
      <p className="mx-auto mb-10 mt-3 max-w-xl">Every resume edit, skill, application and interview adds to a single career profile, so each feature starts from what you've already done.</p><CareerProfile /></section></main><Footer /></>); }
