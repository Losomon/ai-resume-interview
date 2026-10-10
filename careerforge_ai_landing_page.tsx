import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileText,
  Target,
  Mic,
  Briefcase,
  TrendingUp,
  Star,
  ChevronDown,
  Play,
  Upload,
  RefreshCw,
  Search,
  Users,
  Check,
  X,
  Menu,
  Lock,
  Award,
  Clock,
  Sparkle,
  Globe,
  Sliders,
  BarChart3,
  Cpu,
  Layers
} from 'lucide-react';

export default function App() {
  // Navigation Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Preview Section State
  const [activePreviewTab, setActivePreviewTab] = useState('resume');
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);

  // Resume Section - Before / After Toggle
  const [resumeMode, setResumeMode] = useState('after');

  // ATS Checker Interactive State
  const [atsSimulating, setAtsSimulating] = useState(false);
  const [atsScore, setAtsScore] = useState(88);
  const [pastedText, setPastedText] = useState(
    'Experienced Full Stack Developer skilled in React, Node.js, TypeScript, and AWS cloud infrastructure with 5 years experience.'
  );

  // Mock Interview State
  const [interviewStatus, setInterviewStatus] = useState('idle'); // 'idle' | 'recording' | 'analyzed'
  const [interviewTime, setInterviewTime] = useState(0);

  // Pricing State
  const [billingCycle, setBillingCycle] = useState('yearly');

  // FAQ Active State
  const [openFaq, setOpenFaq] = useState(0);

  // Handle Mock Interview Timer
  useEffect(() => {
    let interval = null;
    if (interviewStatus === 'recording') {
      interval = setInterval(() => {
        setInterviewTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [interviewStatus]);

  const runAtsScan = () => {
    setAtsSimulating(true);
    setTimeout(() => {
      setAtsScore(Math.floor(Math.random() * 15) + 84); // 84-98 range
      setAtsSimulating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* Background Subtle Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* SECTION 1: NAVBAR */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CareerForge<span className="text-indigo-400">.AI</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a>
              <a href="#jobs" className="hover:text-indigo-400 transition-colors">Job Match</a>
              <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2">
                Sign In
              </button>
              <button className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all duration-200 transform hover:-translate-y-0.5">
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                FAQ
              </a>
              <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
                <button className="w-full text-center py-2 text-sm font-medium text-slate-300">
                  Sign In
                </button>
                <button className="w-full py-2.5 text-center text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
                  Get Started Free
                </button>
              </div>
            </div>
          )}
        </header>

        {/* SECTION 2: HERO */}
        {}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-inner">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Next-Gen Career Intelligence Engine v3.5 Released</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.15]">
              Accelerate Your Career with{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered Intelligence
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              Transform raw experience into ATS-crushing resumes, practice real-time AI mock interviews, and land top-tier tech roles 3x faster.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5">
                <FileText className="w-5 h-5" />
                <span>Build Free Resume Now</span>
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 flex items-center justify-center gap-2 transition-all backdrop-blur-sm">
                <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                <span>Watch 2-Min Demo</span>
              </button>
            </div>

            {/* Trust Metrics / Social Proof Stats */}
            <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">50,000+</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Resumes Generated</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">98.4%</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">ATS Pass Rate</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400">3.2x</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">More Callbacks</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">$24k+</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">Avg Salary Lift</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: LIVE PREVIEW */}
        {}
        <section className="py-16 bg-slate-900/50 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold">Interactive Platform Live Preview</h2>
              <p className="text-slate-400 mt-2">Test drive our core AI features right here in real time.</p>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setActivePreviewTab('resume')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activePreviewTab === 'resume'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>AI Builder</span>
                </button>
                <button
                  onClick={() => setActivePreviewTab('ats')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activePreviewTab === 'ats'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>ATS Analyzer</span>
                </button>
                <button
                  onClick={() => setActivePreviewTab('interview')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activePreviewTab === 'interview'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>Mock Interview</span>
                </button>
              </div>
            </div>

            {/* Live Preview Window Frame */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl shadow-indigo-950/40 max-w-5xl mx-auto">
              {/* Window Bar */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="text-xs text-slate-400 ml-3 font-mono">
                    app.careerforge.ai/{activePreviewTab}
                  </span>
                </div>
                {activePreviewTab === 'resume' && (
                  <button
                    onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                    className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg border border-slate-700 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{showAiSuggestions ? 'AI Hints: ON' : 'AI Hints: OFF'}</span>
                  </button>
                )}
              </div>

              {/* Tab 1 Content: AI Resume Builder */}
              {activePreviewTab === 'resume' && (
                <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
                  <div className="md:col-col-span-1 space-y-4 border-r border-slate-800/80 pr-0 md:pr-6">
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Candidate Profile</h4>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-base font-bold text-white">Alex Morgan</div>
                      <div className="text-xs text-indigo-400 font-medium">Senior Software Engineer</div>
                      <div className="text-xs text-slate-400">San Francisco, CA • alex.m@example.com</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">Target Role</label>
                      <input
                        type="text"
                        readOnly
                        value="Staff React & Cloud Architect"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-300">Work Experience Bullet Points</h4>
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> High Impact Score
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative group">
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          "Architected scalable micro-frontend ecosystem using <span className="text-indigo-400 font-semibold underline decoration-indigo-500/50">React 18</span> and <span className="text-indigo-400 font-semibold underline decoration-indigo-500/50">TypeScript</span>, reducing core page load latency by <span className="text-emerald-400 font-bold">42%</span> across 2.4M monthly active users."
                        </p>
                        {showAiSuggestions && (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-300">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-indigo-400" /> AI Optimization: Enhanced with quantifiable metrics
                            </span>
                            <span className="bg-indigo-950 border border-indigo-800 text-indigo-300 px-2 py-0.5 rounded font-mono text-[10px]">98% match</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative group">
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          "Spearheaded automated CI/CD pipeline modernization on <span className="text-indigo-400 font-semibold">AWS ECS</span>, saving over <span className="text-emerald-400 font-bold">120 dev-hours monthly</span> and eliminating deployment downtime."
                        </p>
                        {showAiSuggestions && (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-300">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-indigo-400" /> AI Optimization: Added strong action verb 'Spearheaded'
                            </span>
                            <span className="bg-indigo-950 border border-indigo-800 text-indigo-300 px-2 py-0.5 rounded font-mono text-[10px]">95% match</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2 Content: ATS Analyzer Meter */}
              {activePreviewTab === 'ats' && (
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-8">
                  <div className="text-center md:text-left space-y-3 max-w-sm">
                    <span className="text-xs font-semibold uppercase text-indigo-400 tracking-wider">Automated Scanner</span>
                    <h3 className="text-2xl font-bold">Real-Time ATS Score Meter</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Our system simulates enterprise Applicant Tracking Systems (Workday, Greenhouse, Lever) to ensure zero parser drops.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 w-full max-w-sm">
                    <div className="relative flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-8 border-slate-800 border-t-indigo-500 border-r-indigo-500 border-b-purple-500 animate-spin-slow flex items-center justify-center"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold text-white">94</span>
                        <span className="text-[10px] text-slate-400 font-medium">/ 100 ATS Score</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-medium">
                        <CheckCircle className="w-4 h-4" /> Hard Skills: 98%
                      </div>
                      <div className="flex items-center gap-2 text-indigo-400 font-medium">
                        <CheckCircle className="w-4 h-4" /> Formatting: 100%
                      </div>
                      <div className="flex items-center gap-2 text-amber-400 font-medium">
                        <CheckCircle className="w-4 h-4" /> Keywords: 88%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3 Content: Mock Interview */}
              {activePreviewTab === 'interview' && (
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-medium border border-rose-500/20">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Live AI Voice Session
                    </div>
                    <h3 className="text-xl font-bold">"Tell me about a time you resolved a major system outage."</h3>
                    <p className="text-xs text-slate-400">
                      AI Avatar is listening to tone, pacing, STAR structure alignment, and confidence markers.
                    </p>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="h-16 bg-slate-950 rounded-xl flex items-center justify-center gap-1.5 px-4">
                      {[40, 70, 30, 85, 90, 60, 45, 95, 75, 50, 80, 60, 40, 90, 30].map((height, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-indigo-500 rounded-full animate-pulse"
                          style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-400">Clarity</div>
                        <div className="text-sm font-bold text-emerald-400">96%</div>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-400">Pacing</div>
                        <div className="text-sm font-bold text-indigo-400">145 wpm</div>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-400">Filler Words</div>
                        <div className="text-sm font-bold text-purple-400">0.2 / min</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: ONE PLATFORM (Bento Grid) */}
        {}
        <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Unified AI Platform</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
              One Operating System for Your Entire Career Journey
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              Stop juggling isolated tools. CareerForge AI unifies resume optimization, ATS bypass, interview practice, and job matching under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Resume Builder (Large) */}
            <div className="md:col-span-2 rounded-3xl bg-slate-900/60 border border-slate-800 p-8 hover:border-slate-700 transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Resume Architect</h3>
              <p className="text-slate-400 text-sm max-w-lg mb-6">
                Transform brief task summaries into high-impact, quantified achievement statements tailored to specific job postings with real-time AI guidance.
              </p>
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-indigo-400">// Prompt: Make this bullet point 3x stronger</div>
                <div className="text-slate-400 line-through">"Managed database server and helped team improve query speeds."</div>
                <div className="text-emerald-400 font-semibold">"Re-indexed Postgres cluster and tuned SQL queries, reducing P99 latency by 64% and slashing monthly AWS compute spend by $14,000."</div>
              </div>
            </div>

            {/* Bento Card 2: ATS Scanner */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 hover:border-slate-700 transition duration-300 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">ATS Compatibility Shield</h3>
              <p className="text-slate-400 text-sm mb-6">
                Instant parsing tests against enterprise recruiters' exact filtering criteria before you submit.
              </p>
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300 font-medium">ATS Match Score</span>
                <span className="text-lg font-bold text-emerald-400">98/100</span>
              </div>
            </div>

            {/* Bento Card 3: AI Interviewer */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 hover:border-slate-700 transition duration-300 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Voice AI Mock Prep</h3>
              <p className="text-slate-400 text-sm mb-6">
                Practice behavioral & technical rounds with interactive AI avatars providing instant spoken feedback.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> Real-time vocal pitch & STAR analysis
              </div>
            </div>

            {/* Bento Card 4: Smart Job Matching (Large) */}
            <div className="md:col-span-2 rounded-3xl bg-slate-900/60 border border-slate-800 p-8 hover:border-slate-700 transition duration-300 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Automated Tailored Job Matching</h3>
              <p className="text-slate-400 text-sm max-w-lg mb-6">
                Our algorithm scans 50,000+ daily listings, pairing your custom-optimized resume with high-probability opportunities where you rank in the top 5%.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Senior Frontend Dev</div>
                    <div className="text-[10px] text-slate-400">Stripe • Remote</div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">96% Match</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Fullstack Architect</div>
                    <div className="text-[10px] text-slate-400 font-mono">Datadog • NY</div>
                  </div>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-full border border-indigo-500/20 font-bold">92% Match</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: RESUME SECTION (Before/After Toggle) */}
        {}
        <section className="py-20 bg-slate-900/40 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Transformative AI Rewriting</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">See the AI Optimization Difference</h2>
              <p className="text-slate-400 mt-2 text-sm sm:text-base">
                Toggle between generic resume copy and AI-refined bullet points engineered for hiring managers.
              </p>

              {/* Toggle Switch */}
              <div className="mt-8 inline-flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  onClick={() => setResumeMode('before')}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${
                    resumeMode === 'before'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Standard Draft (Before)
                </button>
                <button
                  onClick={() => setResumeMode('after')}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${
                    resumeMode === 'after'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CareerForge AI (After)
                </button>
              </div>
            </div>

            {/* Dynamic Card Display */}
            <div className="max-w-4xl mx-auto">
              <div
                className={`p-8 rounded-3xl border transition-all duration-300 ${
                  resumeMode === 'before'
                    ? 'bg-rose-950/10 border-rose-900/40 shadow-xl'
                    : 'bg-slate-900 border-emerald-500/30 shadow-2xl shadow-emerald-950/20'
                }`}
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`p-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                        resumeMode === 'before'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {resumeMode === 'before' ? 'Basic Copy' : 'AI Enhanced'}
                    </span>
                    <span className="text-sm text-slate-300 font-semibold">Lead Product Designer</span>
                  </div>
                  <div className="text-xs font-bold">
                    {resumeMode === 'before' ? (
                      <span className="text-rose-400">ATS Score: 48/100 (Weak)</span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-4 h-4" /> ATS Score: 96/100 (Top 1%)
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 text-sm sm:text-base">
                  {resumeMode === 'before' ? (
                    <>
                      <li className="flex items-start space-x-3 text-slate-400">
                        <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <span>Responsible for designing UI components for mobile application.</span>
                      </li>
                      <li className="flex items-start space-x-3 text-slate-400">
                        <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <span>Worked with developers to implement new design features and fixes.</span>
                      </li>
                      <li className="flex items-start space-x-3 text-slate-400">
                        <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <span>Helped increase overall user satisfaction metrics across product.</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start space-x-3 text-slate-200">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          Architected full-scale mobile component design system in Figma, accelerating feature release cycles by <strong className="text-emerald-400">35%</strong> across 4 cross-functional teams.
                        </span>
                      </li>
                      <li className="flex items-start space-x-3 text-slate-200">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          Partnered with senior iOS & Android engineers to roll out design tokens, cutting UI engineering bug tickets by <strong className="text-emerald-400">48%</strong> over 6 months.
                        </span>
                      </li>
                      <li className="flex items-start space-x-3 text-slate-200">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          Pioneered user research initiatives that boosted 30-day user retention rates by <strong className="text-emerald-400">22%</strong> and increased app store rating from 4.1 to 4.8.
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: ATS SECTION (Interactive Simulator Widget) */}
        {}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">ATS Compatibility Engine</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Never Lose a Job Opportunity to an Automated Filter
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Over 75% of resumes are discarded by ATS algorithms before human eyes see them. Our parser matches keyword weights, skills taxonomy, and formatting against target job descriptions in real time.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">✓</div>
                  Hard skill and tech stack alignment matching
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">✓</div>
                  Parse test compatibility across 12+ industry ATS engines
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">✓</div>
                  Real-time missing keyword recommendations
                </div>
              </div>
            </div>

            {/* Interactive ATS Simulator Widget */}
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-400" /> Free Interactive ATS Scan Demo
                </h3>
                <span className="text-xs text-slate-400">Paste & Test</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-2 block">Resume Summary Draft</label>
                <textarea
                  rows="3"
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <button
                onClick={runAtsScan}
                disabled={atsSimulating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {atsSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Scanning Resume...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> Run Instant ATS Scan
                  </>
                )}
              </button>

              {/* Result Preview Box */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Simulated ATS Score</span>
                  <span className="text-2xl font-black text-emerald-400">{atsScore}/100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                    style={{ width: `${atsScore}%` }}
                  ></div>
                </div>

                {/* Keyword Tags Breakdown */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Matched Key terms</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">React.js</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">Node.js</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">TypeScript</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">AWS</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pt-2">Recommended Additions</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium">+ Docker</span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium">+ GraphQL</span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium">+ CI/CD Automation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: INTERVIEW SECTION */}
        {}
        <section className="py-24 bg-slate-900/50 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Mock AI Interviewer</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
                Practice High-Stakes Interviews Without the Pressure
              </h2>
              <p className="text-slate-400 mt-4 text-base">
                Simulate realistic interviews for thousands of roles. Receive immediate AI metrics on STAR method adherence, speech clarity, and technical accuracy.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-0.5">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Mic className="w-7 h-7 text-purple-400" />
                      </div>
                    </div>
                    {interviewStatus === 'recording' && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full animate-ping"></span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Interactive Voice Simulator</h4>
                    <p className="text-xs text-slate-400">Prompt: "Describe a complex technical challenge you solved recently."</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {interviewStatus === 'idle' && (
                    <button
                      onClick={() => setInterviewStatus('recording')}
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                    >
                      <Mic className="w-4 h-4" /> Start Recording
                    </button>
                  )}
                  {interviewStatus === 'recording' && (
                    <button
                      onClick={() => setInterviewStatus('analyzed')}
                      className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                    >
                      <X className="w-4 h-4" /> Stop & Analyze ({interviewTime}s)
                    </button>
                  )}
                  {interviewStatus === 'analyzed' && (
                    <button
                      onClick={() => {
                        setInterviewStatus('idle');
                        setInterviewTime(0);
                      }}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                    >
                      <RefreshCw className="w-4 h-4" /> Reset Practice
                    </button>
                  )}
                </div>
              </div>

              {/* Dynamic Analysis Feedback Panel */}
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">Confidence Score</span>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">92%</div>
                  <p className="text-[11px] text-slate-500 mt-1">Strong tone with minimal hesitation</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">STAR Method Rating</span>
                  <div className="text-2xl font-bold text-indigo-400 mt-1">4.8 / 5.0</div>
                  <p className="text-[11px] text-slate-500 mt-1">Clear Situation, Task, Action & Result</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">Technical Keyword Index</span>
                  <div className="text-2xl font-bold text-purple-400 mt-1">Exemplary</div>
                  <p className="text-[11px] text-slate-500 mt-1">Used domain-specific terminology</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: CAREER READINESS INDEX */}
        {}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Candidate Benchmarking</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold">Your Career Readiness Index</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Get evaluated against global candidate pools for your target salary bracket. See exact skill gaps and recommended learning modules.
                </p>
                <div className="pt-4 flex items-center space-x-6">
                  <div>
                    <div className="text-3xl font-black text-emerald-400">Top 4%</div>
                    <div className="text-xs text-slate-400">Global Percentile</div>
                  </div>
                  <div className="h-10 w-px bg-slate-800"></div>
                  <div>
                    <div className="text-3xl font-black text-indigo-400">94 / 100</div>
                    <div className="text-xs text-slate-400">Overall Readiness</div>
                  </div>
                </div>
              </div>

              {/* Progress Bars Widget */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Resume Optimization</span>
                    <span className="text-emerald-400">96%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[96%]"></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>ATS Keyword Coverage</span>
                    <span className="text-indigo-400">89%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full w-[89%]"></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Mock Interview Readiness</span>
                    <span className="text-purple-400">92%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full w-[92%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: HOW IT WORKS */}
        {}
        <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Simple Step-by-Step</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-2">How CareerForge AI Gets You Hired</h2>
            <p className="text-slate-400 mt-2 text-base">A streamlined 4-step framework from draft to signed offer.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Upload or Build',
                desc: 'Import your current resume or answer 5 simple prompt questions to generate a baseline profile.'
              },
              {
                step: '02',
                title: 'Optimize with AI',
                desc: 'Run ATS compatibility analysis and generate high-impact, bullet-point accomplishments instantly.'
              },
              {
                step: '03',
                title: 'Practice Interviews',
                desc: 'Simulate voice mock interviews tailored to your target company and get real-time vocal feedback.'
              },
              {
                step: '04',
                title: 'Get Hired Fast',
                desc: 'Apply directly to top-matched listings with tailored application packets and land interviews.'
              }
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative group hover:border-indigo-500/50 transition">
                <span className="text-4xl font-black text-indigo-500/20 group-hover:text-indigo-500/40 transition block mb-4">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: JOBS SECTION */}
        {}
        <section id="jobs" className="py-20 bg-slate-900/40 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Smart Job Portal</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Curated AI Job Opportunities</h2>
              <p className="text-slate-400 mt-2 text-sm">Listings scored for maximum resume match probability.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  role: 'Senior Fullstack Engineer',
                  company: 'Vercel',
                  location: 'Remote',
                  salary: '$180k - $220k',
                  match: '96%'
                },
                {
                  role: 'Staff React Developer',
                  company: 'Linear',
                  location: 'San Francisco, CA',
                  salary: '$200k - $250k',
                  match: '94%'
                },
                {
                  role: 'AI Product Designer',
                  company: 'OpenAI',
                  location: 'Hybrid',
                  salary: '$190k - $230k',
                  match: '91%'
                }
              ].map((job, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {job.match} Resume Match
                      </span>
                      <span className="text-xs text-slate-400">{job.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{job.role}</h3>
                    <p className="text-xs text-indigo-400 font-medium mb-4">{job.company}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">{job.salary}</span>
                    <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-lg transition">
                      1-Click Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: TESTIMONIALS */}
        {}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Verified Success Stories</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-2">Loved by Ambitious Professionals</h2>
            <p className="text-slate-400 mt-2 text-base">Here is how candidates landed top tech positions in weeks.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Jenkins',
                role: 'Landed Senior Frontend Role at Google',
                text: 'The ATS checker highlighted critical missing keywords I had overlooked for months. Once optimized, I got 4 interview callbacks in one week!',
                stars: 5
              },
              {
                name: 'Marcus Chen',
                role: 'Landed Staff Engineer at Stripe',
                text: 'The AI Mock Interview simulator was a game changer. Being able to practice voice responses with realistic AI scoring boosted my confidence tenfold.',
                stars: 5
              },
              {
                name: 'Elena Rostova',
                role: 'Landed Product Manager at Airbnb',
                text: 'Rewrote my entire resume in 10 minutes. The bullet points sounded infinitely more impactful with quantified results. Worth every penny!',
                stars: 5
              }
            ].map((t, index) => (
              <div key={index} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">"{t.text}"</p>
                </div>
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-indigo-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 12: PRICING */}
        {}
        <section id="pricing" className="py-24 bg-slate-900/40 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Flexible Investment</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-2">Transparent Pricing Plans</h2>
              <p className="text-slate-400 mt-2 text-base">Invest in your career growth with full access to AI tools.</p>

              {/* Billing Toggle */}
              <div className="mt-8 inline-flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${
                    billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                    billingCycle === 'yearly' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Yearly Billing <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">Save 25%</span>
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {/* Free Tier */}
              <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold">Starter Free</h3>
                    <p className="text-xs text-slate-400 mt-1">Perfect for trying core feature tools.</p>
                  </div>
                  <div className="text-4xl font-extrabold">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
                  <ul className="space-y-3 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1 AI Resume Generation</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic ATS Compatibility Score</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1 Mock Voice Session</li>
                  </ul>
                </div>
                <button className="w-full mt-8 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition">
                  Get Started Free
                </button>
              </div>

              {/* Pro Tier (Highlighted) */}
              <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-900/40 via-slate-900 to-slate-950 border-2 border-indigo-500 flex flex-col justify-between relative shadow-2xl shadow-indigo-950/50">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Pro Career Accelerator</h3>
                    <p className="text-xs text-indigo-300 mt-1">For active job seekers wanting fast callbacks.</p>
                  </div>
                  <div className="text-4xl font-extrabold text-white">
                    {billingCycle === 'yearly' ? '$19' : '$25'} <span className="text-xs font-normal text-slate-400">/ month</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-200">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited AI Resume Rewrites</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Deep ATS Optimization Reports</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Voice Mock Interviews</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Smart Job Match Portal Access</li>
                  </ul>
                </div>
                <button className="w-full mt-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 transition">
                  Start 14-Day Trial
                </button>
              </div>

              {/* Executive Tier */}
              <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold">Executive Leadership</h3>
                    <p className="text-xs text-slate-400 mt-1">High-touch support for senior leaders.</p>
                  </div>
                  <div className="text-4xl font-extrabold">
                    {billingCycle === 'yearly' ? '$49' : '$59'} <span className="text-xs font-normal text-slate-400">/ month</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Pro Tier</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Executive Resume & Bio Writer</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1-on-1 AI Strategy Coaching</li>
                  </ul>
                </div>
                <button className="w-full mt-8 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition">
                  Choose Executive
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 13: FAQ */}
        {}
        <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Answers</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does CareerForge AI ensure ATS compatibility?',
                a: 'We test generated formatting and text structures directly against the top ATS parsing algorithms used by Fortune 500 companies, including Greenhouse, Workday, and Lever.'
              },
              {
                q: 'Can I customize the resume templates?',
                a: 'Yes! You can customize margins, typography, layout hierarchy, colors, and section order with real-time live previews.'
              },
              {
                q: 'How realistic are the AI Voice Mock Interviews?',
                a: 'Our voice models are trained on real-world hiring questions across software engineering, product management, design, and marketing with sub-300ms response latencies.'
              },
              {
                q: 'Can I cancel my subscription at any time?',
                a: 'Absolutely. You can cancel with one click from your account dashboard with zero hidden fees or lock-in periods.'
              }
            ].map((faq, index) => (
              <div key={index} className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full p-6 text-left flex justify-between items-center text-sm sm:text-base font-bold text-slate-200 hover:text-indigo-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 14: FINAL CTA */}
        {}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/30 shadow-2xl shadow-indigo-950/60">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Ready to Supercharge Your Next Job Search?
              </h2>
              <p className="text-indigo-200 text-base sm:text-lg">
                Join over 50,000 professionals who transformed their resumes and landed top-tier interviews in under 14 days.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-white text-slate-950 hover:bg-slate-100 shadow-xl transition transform hover:-translate-y-0.5">
                  Build Your Free Resume Now
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-indigo-300 pt-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>No credit card required • 14-day free trial</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 15: FOOTER */}
        {}
        <footer className="border-t border-slate-800/80 bg-slate-950 py-16 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-base text-white">CareerForge AI</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Empowering candidates worldwide with AI-driven resume optimization, ATS bypass technology, and interactive mock interview prep.
              </p>
              <div className="text-slate-500">© 2026 CareerForge AI Technologies, Inc. All rights reserved.</div>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">Product</div>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition">AI Resume Builder</a></li>
                <li><a href="#features" className="hover:text-white transition">ATS Checker</a></li>
                <li><a href="#features" className="hover:text-white transition">Mock Interviewer</a></li>
                <li><a href="#jobs" className="hover:text-white transition">Job Match Portal</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">Resources</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Career Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Resume Examples</a></li>
                <li><a href="#" className="hover:text-white transition">ATS Keywords List</a></li>
                <li><a href="#" className="hover:text-white transition">Salary Calculators</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">Company & Legal</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}