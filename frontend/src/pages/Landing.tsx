import {
  Navbar,
  Hero,
  LivePreview,
  OnePlatform,
  ResumeSection,
  ATSSection,
  InterviewSection,
  CareerReadiness,
  HowItWorks,
  JobsSection,
  Testimonials,
  Pricing,
  FAQ,
  FinalCTA,
  Footer,
} from "@/components/landing";

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />
        <LivePreview />
        <OnePlatform />
        <ResumeSection />
        <ATSSection />
        <InterviewSection />
        <CareerReadiness />
        <HowItWorks />
        <JobsSection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}