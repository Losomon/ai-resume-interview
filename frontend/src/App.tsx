import { ArrowRight, FileText, Mic, Sparkles, Target } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    text: "Create a professional resume and improve every section with AI.",
  },
  {
    icon: Target,
    title: "ATS Analyzer",
    text: "Compare your resume with a job description and find genuine skill gaps.",
  },
  {
    icon: Mic,
    title: "AI Interview Coach",
    text: "Practice realistic interviews and receive structured feedback.",
  },
];

function App() {
  return (
    <main className="app-shell">
      <nav className="navbar container">
        <div className="brand">
          <span className="brand-mark">
            <Sparkles size={16} />
          </span>
          <span>CareerForge<span className="brand-ai"> AI</span></span>
        </div>

        <div className="nav-actions">
          <button className="button button-ghost">Sign in</button>
          <button className="button button-primary">
            Get started <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <section className="hero container">
        <div className="hero-badge">
          <Sparkles size={14} />
          AI-powered career preparation
        </div>

        <h1>
          Your AI-powered
          <span className="gradient-text"> career coach.</span>
        </h1>

        <p className="hero-copy">
          Build a stronger resume, analyze real job requirements, practice
          interviews, and understand exactly where you can improve.
        </p>

        <div className="hero-actions">
          <button className="button button-primary button-large">
            Build my resume <ArrowRight size={18} />
          </button>
          <button className="button button-secondary button-large">
            Practice interview
          </button>
        </div>

        <div className="dashboard-preview">
          <div className="preview-topbar">
            <div className="preview-dots">
              <span />
              <span />
              <span />
            </div>
            <span>CareerForge AI</span>
            <span className="preview-status">Live workspace</span>
          </div>

          <div className="preview-body">
            <aside className="preview-sidebar">
              <div className="preview-logo">CF</div>
              <div className="preview-nav active">Dashboard</div>
              <div className="preview-nav">Resume</div>
              <div className="preview-nav">Job Matcher</div>
              <div className="preview-nav">AI Interview</div>
              <div className="preview-nav">Career Coach</div>
            </aside>

            <div className="preview-content">
              <div className="preview-heading">
                <div>
                  <small>CAREER DASHBOARD</small>
                  <h2>Good evening, Solomon 👋</h2>
                </div>
                <span className="preview-avatar">SM</span>
              </div>

              <div className="preview-stats">
                <div className="preview-card readiness">
                  <small>CAREER READINESS</small>
                  <strong>87%</strong>
                  <span>↑ 8% this month</span>
                  <div className="progress"><i style={{ width: "87%" }} /></div>
                </div>
                <div className="preview-card">
                  <small>RESUME</small>
                  <strong>92%</strong>
                  <span>ATS score</span>
                </div>
                <div className="preview-card">
                  <small>INTERVIEW</small>
                  <strong>81%</strong>
                  <span>Latest score</span>
                </div>
              </div>

              <div className="preview-lower">
                <div className="preview-card chart-card">
                  <small>INTERVIEW PERFORMANCE</small>
                  <div className="fake-chart">
                    <div style={{ height: "38%" }} />
                    <div style={{ height: "54%" }} />
                    <div style={{ height: "48%" }} />
                    <div style={{ height: "72%" }} />
                    <div style={{ height: "86%" }} />
                    <div style={{ height: "79%" }} />
                  </div>
                </div>
                <div className="preview-card">
                  <small>QUICK ACTIONS</small>
                  <button className="preview-action">Create resume →</button>
                  <button className="preview-action">Analyze a job →</button>
                  <button className="preview-action">Start interview →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="section-heading">
          <span>ONE CAREER WORKSPACE</span>
          <h2>Everything you need to prepare.</h2>
          <p>
            CareerForge connects your resume, target jobs, skills, and
            interview practice in one workflow.
          </p>
        </div>

        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
              <div className="feature-icon"><Icon size={21} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <button className="text-button">Explore <ArrowRight size={15} /></button>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer container">
        <div className="brand">
          <span className="brand-mark"><Sparkles size={16} /></span>
          CareerForge<span className="brand-ai"> AI</span>
        </div>
        <span>Build. Practice. Improve.</span>
      </footer>
    </main>
  );
}

export default App;
