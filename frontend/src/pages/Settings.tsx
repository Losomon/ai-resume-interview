import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Shield,
  Bell,
  Sparkles,
  Palette,
  Check,
  Moon,
  Sun,
  Laptop,
  Download,
  Trash2,
  LogOut,
} from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Card, Input, Badge, AIMark } from "@/components/ui";
import { ConfirmDialog } from "@/components/resume/ConfirmDialog";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

type Section = "profile" | "security" | "notifications" | "ai" | "appearance";

const SECTIONS: { id: Section; label: string; blurb: string; icon: typeof User }[] = [
  { id: "profile",       label: "Profile & career goals", blurb: "Your name, education, experience and preferences", icon: User },
  { id: "security",      label: "Security & privacy",     blurb: "Password, sessions and account data",             icon: Shield },
  { id: "notifications", label: "Notifications",          blurb: "Interview, follow-up and plan reminders",         icon: Bell },
  { id: "ai",            label: "AI preferences",         blurb: "What CareerForge can use for personalization",    icon: Sparkles },
  { id: "appearance",    label: "Appearance",             blurb: "Theme, motion and formatting",                    icon: Palette },
];

export default function Settings() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [section, setSection] = useState<Section>("profile");
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences."
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Section nav — sidebar on desktop, horizontal on mobile */}
        <nav className="flex gap-1 overflow-x-auto rounded-card border border-border bg-card p-2 lg:h-fit lg:flex-col lg:overflow-visible">
          {SECTIONS.map(({ id, label, blurb, icon: Icon }) => {
            const active = section === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSection(id)}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-button px-3 py-2.5 text-left transition-colors duration-card lg:shrink",
                  active
                    ? "bg-primary-tint text-green-deep"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-text",
                )}
              >
                <Icon
                  size={16}
                  className={cn(
                    "shrink-0",
                    active ? "text-primary" : "text-text-muted",
                  )}
                />
                <div className="min-w-0">
                  <div className="whitespace-nowrap text-small font-medium lg:whitespace-normal">
                    {label}
                  </div>
                  <div className="hidden text-xs text-text-muted lg:block">
                    {blurb}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Section content */}
        <div className="min-w-0">
          {section === "profile" && <ProfileSection name={user?.name ?? ""} email={user?.email ?? ""} />}
          {section === "security" && (
            <SecuritySection onDelete={() => setConfirmDelete(true)} onLogout={handleLogout} />
          )}
          {section === "notifications" && <NotificationsSection />}
          {section === "ai" && <AISection />}
          {section === "appearance" && <AppearanceSection />}
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete your account?"
        message="This will permanently remove your account and every resume, ATS analysis, interview, and application you've created. This can't be undone."
        confirmLabel="Delete account"
        tone="danger"
        onConfirm={() => setConfirmDelete(false)}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
}

/* ============================================================
   Section: Profile
   ============================================================ */

function ProfileSection({ name, email }: { name: string; email: string }) {
  const [fullName, setFullName] = useState(name);
  const [emailValue, setEmailValue] = useState(email);
  const [headline, setHeadline] = useState("");
  const [goal, setGoal] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState<"remote" | "hybrid" | "onsite">("remote");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card className="p-6">
      <SectionHeader
        title="Profile & career goals"
        blurb="Update your personal information and control how CareerForge works for you."
      />

      <div className="mt-6 flex flex-col gap-5">
        <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <Input label="Email" type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
        <Input
          label="Professional headline"
          placeholder="e.g. Senior Software Engineer"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
        <Input
          label="Career goal"
          placeholder="e.g. Backend developer at a Series B startup"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <Input
          label="Preferred location"
          placeholder="e.g. Nairobi, Kenya"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="text-small font-medium text-text-secondary">Work arrangement</label>
          <div className="grid grid-cols-3 gap-2">
            {(["remote", "hybrid", "onsite"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setWorkMode(m)}
                className={cn(
                  "rounded-button border px-3 py-2.5 text-small font-medium capitalize transition-colors duration-card",
                  workMode === m
                    ? "border-primary bg-primary-tint text-green-deep"
                    : "border-border bg-card text-text-secondary hover:border-border-hover hover:bg-bg-secondary",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <SaveRow saved={saved} onSave={save} />
      </div>
    </Card>
  );
}

/* ============================================================
   Section: Security
   ============================================================ */

function SecuritySection({ onDelete, onLogout }: { onDelete: () => void; onLogout: () => void }) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saved, setSaved] = useState(false);

  function changePassword() {
    setSaved(true);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => setSaved(false), 2000);
  }

  const canChange = currentPw.length > 0 && newPw.length >= 8 && newPw === confirmPw;

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-6">
        <SectionHeader title="Change password" blurb="Use at least 8 characters." />
        <div className="mt-5 flex flex-col gap-4">
          <Input
            label="Current password"
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
          />
          <Input
            label="New password"
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
          />
          <Input
            label="Confirm new password"
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
          <SaveRow saved={saved} onSave={changePassword} disabled={!canChange} label="Update password" />
        </div>
      </Card>

      <Card className="p-6">
        <SectionHeader title="Active session" blurb="You're signed in on this device." />
        <div className="mt-5 flex items-center justify-between rounded-button border border-border bg-bg-secondary p-4">
          <div>
            <div className="text-small font-medium text-text">This browser</div>
            <div className="mt-0.5 text-xs text-text-muted">Current session</div>
          </div>
          <Button variant="secondary" onClick={onLogout}>
            <LogOut size={14} />
            Sign out
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <SectionHeader title="Your data" blurb="Export or permanently remove your account." />
        <div className="mt-5 flex flex-col gap-2">
          <Button variant="secondary" className="justify-start" disabled>
            <Download size={14} />
            Export my data (coming soon)
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-problem hover:bg-problem-tint hover:text-problem"
            onClick={onDelete}
          >
            <Trash2 size={14} />
            Delete my account
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   Section: Notifications
   ============================================================ */

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    interviewReminders: true,
    followUpReminders: true,
    planReminders: false,
    productUpdates: false,
  });

  function toggle(key: keyof typeof prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  const rows: { key: keyof typeof prefs; label: string; blurb: string }[] = [
    { key: "interviewReminders", label: "Interview reminders",       blurb: "Alerts before scheduled interviews" },
    { key: "followUpReminders",  label: "Application follow-ups",    blurb: "Reminders when a follow-up is due" },
    { key: "planReminders",      label: "Career plan tasks",         blurb: "Nudges for learning plan steps" },
    { key: "productUpdates",     label: "Product & account updates", blurb: "New features and important changes" },
  ];

  return (
    <Card className="p-6">
      <SectionHeader
        title="Notifications"
        blurb="In-app reminders. Email delivery requires a configured service."
      />
      <div className="mt-6 flex flex-col divide-y divide-border">
        {rows.map(({ key, label, blurb }) => (
          <ToggleRow
            key={key}
            label={label}
            blurb={blurb}
            on={prefs[key]}
            onChange={() => toggle(key)}
          />
        ))}
      </div>
      <p className="mt-5 text-xs text-text-muted">
        Email notifications are not yet available. These settings currently
        control in-app reminders only.
      </p>
    </Card>
  );
}

/* ============================================================
   Section: AI preferences
   ============================================================ */

function AISection() {
  const [prefs, setPrefs] = useState({
    useResumes: true,
    useAtsReports: true,
    useInterviewResults: false,
    saveHistory: true,
  });

  function toggle(key: keyof typeof prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  const rows: { key: keyof typeof prefs; label: string; blurb: string }[] = [
    { key: "useResumes",         label: "Use my resumes as context",     blurb: "The coach can reference your resume content when advising" },
    { key: "useAtsReports",      label: "Use my ATS reports as context", blurb: "The coach can reference your latest ATS analyses" },
    { key: "useInterviewResults",label: "Use my interview results",      blurb: "The coach can reference your latest feedback report" },
    { key: "saveHistory",        label: "Save conversation history",     blurb: "Keep past chats available when you return" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-6">
        <SectionHeader
          title="AI preferences"
          blurb="Control what CareerForge can use to personalize advice. You can revoke access at any time."
        />
        <div className="mt-6 flex flex-col divide-y divide-border">
          {rows.map(({ key, label, blurb }) => (
            <ToggleRow
              key={key}
              label={label}
              blurb={blurb}
              on={prefs[key]}
              onChange={() => toggle(key)}
            />
          ))}
        </div>
        <p className="mt-5 text-xs text-text-muted">
          The AI never invents experience. It only uses information you've
          actually entered.
        </p>
      </Card>

      <Card className="p-6">
        <SectionHeader title="Conversation history" blurb="Clear everything you've discussed with the coach." />
        <Button variant="secondary" className="mt-5 justify-start" disabled>
          <Trash2 size={14} />
          Clear all conversation history (coming soon)
        </Button>
      </Card>
    </div>
  );
}

/* ============================================================
   Section: Appearance
   ============================================================ */

function AppearanceSection() {
  const { theme, setTheme } = useTheme();

  const modes: { id: "light" | "dark" | "system"; label: string; icon: typeof Sun }[] = [
    { id: "light",  label: "Light",  icon: Sun },
    { id: "dark",   label: "Dark",   icon: Moon },
    { id: "system", label: "System", icon: Laptop },
  ];

  return (
    <Card className="p-6">
      <SectionHeader title="Appearance" blurb="Theme and interface preferences." />

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-small font-medium text-text-secondary">Theme</label>
          <div className="grid grid-cols-3 gap-2">
            {modes.map(({ id, label, icon: Icon }) => {
              const active = theme === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id as "light" | "dark")}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-button border px-3 py-3 text-small font-medium transition-colors duration-card",
                    active
                      ? "border-primary bg-primary-tint text-green-deep"
                      : "border-border bg-card text-text-secondary hover:border-border-hover hover:bg-bg-secondary",
                  )}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-button border border-border bg-bg-secondary p-4">
          <div className="flex items-start gap-3">
            <AIMark size={16} className="mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed text-text-muted">
              Reducing motion is respected automatically when your operating
              system has that setting enabled.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

function SectionHeader({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div>
      <h2
        className="text-[22px] leading-tight tracking-[-0.01em] text-text"
        style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 600 }}
      >
        {title}
      </h2>
      <p className="mt-1.5 text-small leading-relaxed text-text-secondary">{blurb}</p>
    </div>
  );
}

function ToggleRow({
  label,
  blurb,
  on,
  onChange,
}: {
  label: string;
  blurb: string;
  on: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-start justify-between gap-4 py-4 text-left transition-colors hover:bg-bg-secondary/50"
    >
      <div className="min-w-0 flex-1">
        <div className="text-small font-medium text-text">{label}</div>
        <div className="mt-0.5 text-xs leading-relaxed text-text-muted">{blurb}</div>
      </div>
      <span
        className={cn(
          "relative mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-card",
          on ? "bg-primary" : "bg-border-hover",
        )}
      >
        <span
          className={cn(
            "absolute h-5 w-5 rounded-full bg-card shadow-card transition-transform duration-card",
            on ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}

function SaveRow({
  saved,
  onSave,
  disabled,
  label = "Save changes",
}: {
  saved: boolean;
  onSave: () => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
      {saved ? (
        <span className="inline-flex items-center gap-1.5 text-small font-medium text-green-deep">
          <Check size={14} />
          Saved
        </span>
      ) : (
        <span className="text-xs text-text-muted">
          Changes aren't saved to the server yet.
        </span>
      )}
      <Button onClick={onSave} disabled={disabled}>
        {label}
      </Button>
    </div>
  );
}