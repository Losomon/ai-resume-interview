# 06. Feature Specifications

Each feature lists its screens, components, states and acceptance criteria. Every data view needs **loading** (skeleton), **empty** and **error** states.

## Dashboard (Phase 4)
- **Layout:** WelcomeCard, then three summary tiles (Resume, ATS, Interview), then Career Readiness and Recommended Actions.
- **Components:** `WelcomeCard`, `ResumeCard` (StatCard), `ReadinessScore`, `RecommendedActions`, `RecentActivity`, `CareerProgress`.
- **Data:** scores, recent activity, suggested actions.
- **Accept:** cards stagger in; scores link to their feature; empty account shows "Create your first resume".

## Resume management (Phase 5)
Grid of resume cards (title, score, updated date), create, duplicate, delete with confirmation. Empty state: "No resumes yet".

## Resume builder (Phase 6)
- **Desktop:** Sections list | Editor | Live preview. **Mobile:** Editor above Preview.
- **Sections:** Profile, Experience, Education, Skills, Projects.
- **Components:** `ResumeEditor`, `ResumeSection`, `ResumePreview`, `ResumeTemplate`, `ResumeScore`.
- **Accept:** preview updates near-instantly; debounced autosave; unsaved-changes indicator; keyboard reorderable sections.

## AI resume assist (Phase 7)
- User selects text, chooses "Improve with AI". `AIRewritePanel` shows Original and Suggested with Accept, Edit, Dismiss.
- Suggestions never add facts. Invented metrics appear as editable placeholders, e.g. "[X]%".
- **Accept:** streaming text; panel slide-in 200–250 ms; Dismiss restores focus to the editor.

## ATS analyzer (Phase 8)
- **Inputs:** resume + job description (`JobDescriptionInput`).
- **Outputs:** overall score, breakdown (keywords, experience, formatting, skills), keyword match list, gaps.
- **Rule:** gaps are two lists: **Missing evidence** (likely present, not shown) and **Skill gaps** (not demonstrated). Each item has a suggested next step.
- **Accept:** "AI is analyzing" state; results are reproducible for identical inputs within the same model version.

## AI interview (Phases 9–10)
- **Setup:** target role, level, number of questions (default 10).
- **Room:** no sidebar; `AIInterviewer` (orb), `QuestionCard`, `InterviewTimer`, `AnswerInput`; "Question n/10".
- **Results:** overall, communication, technical, confidence, strengths, improvements, Practice again, View full report.
- **Accept:** answer submits with the button or Ctrl/Cmd+Enter; timer is announced sparingly to screen readers (not every second); progress persists if the tab closes.

## Job matching (Phase 11)
Search, job cards with match score, details with skill requirements compared to the user's skills. Match reasons are shown, not just a number.

## Career coach (Phase 12)
Chat interface with context from resume, ATS results and interview feedback. Suggested prompts on empty state. Same honesty rules as doc 09.

## Application tracker (Phase 13)
Board or list by status, notes, dates, link to job and resume version used.

## Settings (Phase 4)
Profile, password, notification preferences, data export, delete account (confirmation, doc 10).

## Auth (Phase 3)
Login, Register, Forgot password. Inline validation (`utils/validators.ts`), error text that explains the fix, disabled submit while pending, no password hints that reveal whether an account exists.

## Landing (parallel track)
Order: Navbar, Hero, Live Product Preview, One Platform, Resume, ATS, AI Interview, Career Readiness, How it works, Job Matching, Testimonials, Pricing, FAQ, Final CTA, Footer.
