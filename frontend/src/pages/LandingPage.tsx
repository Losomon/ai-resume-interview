import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Mic, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const features = [
  {
    icon: FileText,
    title: 'AI Resume Builder',
    text: 'Create a professional resume and improve every section with AI.',
  },
  {
    icon: Target,
    title: 'ATS Analyzer',
    text: 'Compare your resume with a job description and find genuine skill gaps.',
  },
  {
    icon: Mic,
    title: 'AI Interview Coach',
    text: 'Practice realistic interviews and receive structured feedback.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navbar */}
      <nav className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-content-primary font-bold text-[17px]">
              CareerForge<span className="text-accent"> AI</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <a href="#">Sign in</a>
            </Button>
            <Button asChild>
              <Link to="/dashboard">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-10 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-pill border border-[#3a2d68] bg-primary-soft/60 px-3 py-1.5 text-caption text-[#C4B5FD] mb-6">
          <Sparkles className="h-3.5 w-3.5" /> AI-powered career preparation
        </div>
        <h1 className="text-hero text-content-primary max-w-[800px] mx-auto">
          Your AI-powered{' '}
          <span className="bg-gradient-to-r from-[#a78bfa] to-[#38bdf8] bg-clip-text text-transparent">
            career coach.
          </span>
        </h1>
        <p className="text-body-lg text-content-muted max-w-[650px] mx-auto mt-6">
          Build a stronger resume, analyze real job requirements, practice
          interviews, and understand exactly where you can improve.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button size="lg" asChild>
            <Link to="/dashboard">
              Build my resume <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/interview">Practice interview</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1280px] px-10 py-20 border-t border-border">
        <div className="text-center mb-12">
          <span className="text-caption text-accent font-semibold tracking-wider uppercase">
            One Career Workspace
          </span>
          <h2 className="text-h2 text-content-primary mt-3">Everything you need to prepare.</h2>
          <p className="text-body text-content-muted mt-3 max-w-[650px] mx-auto">
            CareerForge connects your resume, target jobs, skills, and interview
            practice in one workflow.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-lg border border-border bg-surface p-6 transition-colors hover:bg-surface-hover hover:border-border-hover"
            >
              <div className="h-11 w-11 rounded-lg border border-[#3a2d68] bg-primary-soft text-[#C4B5FD] flex items-center justify-center mb-5">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-h4 text-content-primary mb-2">{title}</h3>
              <p className="text-[13px] text-content-muted mb-4">{text}</p>
              <Link to="/dashboard" className="text-[13px] font-medium text-[#C4B5FD] hover:underline">
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-content-primary font-bold text-[16px]">
              CareerForge<span className="text-accent"> AI</span>
            </span>
          </div>
          <span className="text-[12px] text-content-muted">Build. Practice. Improve.</span>
        </div>
      </footer>
    </div>
  );
}