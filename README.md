# CareerForge AI — Frontend

The web client for **CareerForge AI**, an AI career operating system that helps
job seekers build stronger resumes, analyze ATS match, practice interviews,
match to jobs, and track applications.

Built with **React + Vite + TypeScript**, styled with **Tailwind CSS**, animated
with **Framer Motion**, and backed by **Zustand** for state.

> **Status:** Frontend-complete, backend pending. All data currently persists to
> `localStorage`. AI responses are mocked. See [Backend](#backend) below for the
> migration plan.

---

## Table of contents

- [Features](#features)
- [Stack](#stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Routing](#routing)
- [State management](#state-management)
- [The Ember mark](#the-ember-mark)
- [Scripts](#scripts)
- [Backend](#backend)
- [License](#license)

---

## Features

- **Landing page** — 15-section marketing page with animated product previews
- **Authentication** — register, login, forgot password, protected routes
- **Dashboard** — two-tier overview with career readiness score
- **Resume builder** — 3-column editor with live preview and streaming AI rewrite
  - 5 rewrite tones: balanced, concise, metrics, leadership, technical
  - Multiple suggestion options
  - Undo after accepting
  - Debounced autosave (600ms)
- **Resume management** — duplicate, inline rename, sort, filter by ATS score
- **ATS Analyzer** — score resume against a job description
  - Keyword match with **evidence vs. actual gap** distinction
  - Score breakdown: keywords, experience, formatting, skills
  - Never invents qualifications for the user
- **AI Interview** — focused mock interview with an animated orb
  - Behavioral, technical, and situational questions
  - Per-question timer, transcript, structured feedback report
- **Career Coach** — context-aware chat that reads your resume and latest ATS analysis
  - Generates a personalized learning plan from your actual gaps
- **Job Matching** — 12 mock jobs with filters and resume-based match scores
- **Application Tracker** — kanban board with drag-and-drop
  - Saved → Applied → Interview → Offer → Rejected
  - Per-application notes with autosave

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Routing | React Router v6 |
| State | Zustand (+ `persist`) |
| Font | Inter (via Google Fonts) |

---

## Getting started

### Requirements

- Node.js 20+
- npm 10+

### Install

```bash
cd frontend
npm install
```

### Run the dev server

```bash
npm run dev
```

Opens on `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

Output goes to `dist/`.

### Type check

```bash
npx tsc --noEmit
```

Should exit clean. If it doesn't, there's a type error to fix.

---

## Project structure

```
frontend/
├── public/
│   └── favicon.svg                 # Ember mark (see "The Ember mark")
│
├── src/
│   ├── assets/                     # imported static files (currently empty)
│   │
│   ├── components/
│   │   ├── ui/                     # design system primitives
│   │   │   ├── AIMark.tsx          # the Ember mark
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                 # app shell
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── resume/                 # resume feature
│   │   │   ├── ResumeCard.tsx
│   │   │   ├── NewResumeModal.tsx
│   │   │   ├── ResumeEmptyState.tsx
│   │   │   ├── ResumeSortFilter.tsx
│   │   │   ├── SectionList.tsx
│   │   │   ├── EditorSection.tsx
│   │   │   ├── ResumeEditor.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   ├── ResumeScore.tsx
│   │   │   ├── AIRewritePanel.tsx
│   │   │   ├── AIBottomSheet.tsx
│   │   │   ├── BuilderTopbar.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── ats/                    # ATS analyzer
│   │   │   ├── JobDescriptionInput.tsx
│   │   │   ├── ATSScore.tsx
│   │   │   ├── ATSScoreBreakdown.tsx
│   │   │   ├── KeywordMatch.tsx
│   │   │   ├── ATSBreakdown.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── interview/              # AI interview
│   │   │   ├── AIInterviewer.tsx
│   │   │   ├── InterviewSetup.tsx
│   │   │   ├── InterviewTimer.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── AnswerInput.tsx
│   │   │   ├── InterviewFeedbackReport.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── coach/                  # career coach
│   │   │   ├── CoachMessageBubble.tsx
│   │   │   ├── CoachComposer.tsx
│   │   │   ├── CoachEmptyState.tsx
│   │   │   ├── LearningPlan.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── jobs/                   # job matching
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobMatchScore.tsx
│   │   │   ├── JobFilters.tsx
│   │   │   ├── JobDetails.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── applications/           # application tracker
│   │   │   ├── ApplicationCard.tsx
│   │   │   ├── KanbanColumn.tsx
│   │   │   ├── ApplicationNotesDrawer.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── landing/                # marketing page
│   │       ├── Navbar.tsx
│   │       ├── Hero.tsx
│   │       ├── LivePreview.tsx
│   │       ├── OnePlatform.tsx
│   │       ├── ResumeSection.tsx
│   │       ├── ATSection.tsx
│   │       ├── InterviewSection.tsx
│   │       ├── CareerReadiness.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── JobsSection.tsx
│   │       ├── Testimonials.tsx
│   │       ├── Pricing.tsx
│   │       ├── FAQ.tsx
│   │       ├── FinalCTA.tsx
│   │       ├── Footer.tsx
│   │       ├── motion.ts           # shared Framer Motion variants
│   │       └── index.ts
│   │
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Resumes.tsx
│   │   ├── ResumeBuilder.tsx
│   │   ├── ATSAnalyzer.tsx
│   │   ├── Jobs.tsx
│   │   ├── Interview.tsx
│   │   ├── InterviewRoom.tsx
│   │   ├── InterviewResults.tsx
│   │   ├── CareerCoach.tsx
│   │   ├── Applications.tsx
│   │   ├── Settings.tsx
│   │   ├── DesignSystem.tsx
│   │   └── NotFound.tsx
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useScrollY.ts
│   │
│   ├── services/                   # API layer (swap these for the backend)
│   │   ├── auth.api.ts
│   │   ├── resume.api.ts
│   │   ├── ai.api.ts
│   │   ├── ats.api.ts
│   │   ├── interview.api.ts
│   │   ├── application.api.ts
│   │   ├── coach.api.ts
│   │   └── job.api.ts
│   │
│   ├── store/                      # Zustand stores
│   │   ├── authStore.ts
│   │   ├── resumeStore.ts
│   │   ├── atsStore.ts
│   │   ├── interviewStore.ts
│   │   ├── applicationStore.ts
│   │   ├── coachStore.ts
│   │   └── jobStore.ts
│   │
│   ├── types/
│   │   ├── user.ts
│   │   ├── resume.ts               # all domain types
│   │   └── api.ts
│   │
│   ├── utils/
│   │   └── cn.ts                   # clsx + tailwind-merge
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── index.html
└── package.json
```

---

## Design system

### Palette

The design uses a **warm light theme** — paper background, green as the
brand/AI/action color.

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FDFCF7` | page background (warm paper) |
| `bg-secondary` | `#F7F5EC` | section background |
| `card` | `#FFFFFF` | cards |
| `border` | `#E8E4D5` | default border |
| `border-hover` | `#D6D0BC` | hover border |
| `primary` | `#15803D` | brand green — buttons, links |
| `primary-hover` | `#166534` | hover state |
| `primary-tint` | `#DCFCE7` | tinted background (badges, active states) |
| `green-deep` | `#14532D` | green text on light surfaces (contrast-safe) |
| `info` | `#0E7490` | informational tone |
| `attention` | `#D97706` | warning tone |
| `problem` | `#DC2626` | error tone |
| `text` | `#1C1917` | primary text (warm near-black) |
| `text-secondary` | `#57534E` | secondary text |
| `text-muted` | `#A8A29E` | muted text |
| `glow-warm` | `#FDE68A` | warm halo (orb, Ember mark) |

All tokens are defined in `tailwind.config.ts`. **Never hardcode a hex value
in a component** — use the token.

### Typography

Inter, loaded via `@import` in `src/index.css`.

| Role | Size | Weight |
|---|---|---|
| Hero | 64 / 48 / 38px (lg / md / sm) | 700 |
| Dashboard heading | 30px | 650 |
| Card heading | 17px | 600 |
| Body | 15px | 400 |
| Small | 14px | 400 |

### Components

Every primitive lives in `src/components/ui/` and is exported from
`src/components/ui/index.ts`:

```tsx
import { Button, Card, Badge, AIMark } from "@/components/ui";
```

**Rule:** no page or feature component should define its own button/card/input.
If a pattern repeats twice, promote it to `ui/`.

### Motion

Three rules:

1. **Fade up on entry** — `opacity: 0 → 1`, `y: 12 → 0`, 350ms ease-out
2. **Stagger** — 60–100ms between children, never more
3. **No bouncing, no parallax, no spinning cards**

Framer Motion's `MotionConfig reducedMotion="user"` is set at the app root, so
the OS "reduce motion" setting is honored site-wide.

Shared variants live in `src/components/landing/motion.ts`:

```ts
import { fadeUp, stagger, viewportOnce } from "./motion";
```

---

## Routing

All routes are defined in `src/routes/AppRoutes.tsx`.

### Public

| Path | Page |
|---|---|
| `/` | Landing |
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Forgot Password |
| `/design-system` | Dev reference |

### Auth-guarded

Wrapped in `<ProtectedRoute />` — redirects to `/login` if no token.

| Path | Layout | Page |
|---|---|---|
| `/dashboard` | DashboardLayout | Dashboard |
| `/resumes` | DashboardLayout | Resumes |
| `/resumes/:id` | **Focused** (no sidebar) | ResumeBuilder |
| `/ats` | DashboardLayout | ATSAnalyzer |
| `/jobs` | DashboardLayout | Jobs |
| `/interview` | DashboardLayout | Interview |
| `/interview/room` | **Focused** (no sidebar) | InterviewRoom |
| `/interview/results` | DashboardLayout | InterviewResults |
| `/coach` | DashboardLayout | CareerCoach |
| `/applications` | DashboardLayout | Applications |
| `/settings` | DashboardLayout | Settings |

**Two routes intentionally sit outside `DashboardLayout`:**
- `/resumes/:id` — the builder has its own topbar and section rail
- `/interview/room` — the interview is a focused, distraction-free view

Both are still inside `ProtectedRoute`, so they require auth.

---

## State management

Zustand stores live in `src/store/`. Each store:

- Owns one domain (`resumes`, `ats`, `interview`, …)
- Exposes async actions that call `services/*.api.ts`
- Persists to `localStorage` via the `persist` middleware where appropriate

Example:

```ts
const { resumes, loading, fetchAll, create, update } = useResumeStore();
```

### What persists

| Store | Persisted? | Key |
|---|---|---|
| `authStore` | ✅ user + tokens | `careerforge-auth` |
| `resumeStore` | ❌ (data lives in `resume.api.ts` localStorage) | — |
| `atsStore` | ❌ (in-memory only) | — |
| `interviewStore` | ✅ active session | `careerforge-interview` |
| `applicationStore` | ❌ (data lives in `application.api.ts` localStorage) | — |
| `coachStore` | ✅ messages + plan | `careerforge-coach` |
| `jobStore` | ❌ (in-memory) | — |

**Rule:** if a store holds **user work in progress** (an interview session, a
coach conversation), persist it. If it holds **server data**, don't — the
backend is the source of truth once it exists.

---

## The Ember mark

CareerForge uses a custom AI mark — **not** the generic ✦ glyph. It's a warm
teardrop / flame-leaf shape, rendered as an inline SVG in
`src/components/ui/AIMark.tsx`.

```tsx
import { AIMark } from "@/components/ui";

<AIMark size={24} />                        // default — solid green
<AIMark size={48} />                        // auto-glow at ≥40px
<AIMark size={32} thinking />               // spinning ring while "thinking"
```

### Why a custom mark

- ✦ renders differently across fonts — no baseline stability
- ✦ is used by every AI product — no brand differentiation
- A custom SVG animates as one unit (breathe, glow, rotate ring)

**Rule:** never type ✦ as text. Always use `<AIMark />`.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts Vite dev server on port 5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serves the built output locally |
| `npm run lint` | ESLint (if configured) |
| `npx tsc --noEmit` | Type check without emitting |

---

## Backend

**The backend does not exist yet.** All services under `src/services/*.api.ts`
are mocks:

- `auth.api.ts`, `resume.api.ts`, `application.api.ts` → **localStorage**
- `ai.api.ts`, `ats.api.ts`, `interview.api.ts`, `coach.api.ts` → **canned responses**
- `job.api.ts` → **static list of 12 jobs**

### Migration plan

The service layer was designed so the backend swap is mechanical. Each file
exposes async functions with the exact signatures a real REST API would have.

| Service | Current | After backend |
|---|---|---|
| `auth.api.ts` | Mock user + fake JWT | `POST /api/auth/*` |
| `resume.api.ts` | localStorage CRUD | `GET/POST/PATCH/DELETE /api/resumes` |
| `ai.api.ts` | String manipulation | `POST /api/ai/rewrite` (SSE stream) |
| `ats.api.ts` | Local scoring | `POST /api/ats/analyze` |
| `interview.api.ts` | Fixed question bank | `POST /api/interview/sessions` |
| `coach.api.ts` | Regex-matched replies | `POST /api/coach/message` |
| `job.api.ts` | Static array | `GET /api/jobs` |
| `application.api.ts` | localStorage CRUD | `GET/POST/PATCH/DELETE /api/applications` |

### Frontend changes required

**Only 8 files change.** Everything else — stores, components, pages, types —
stays exactly as it is.

Add to `frontend/.env`:

```bash
VITE_API_URL=http://localhost:3000
```

Then in each service file, replace the mock body with a `fetch()` call:

```ts
// before
export async function list(): Promise<Resume[]> {
  return JSON.parse(localStorage.getItem("careerforge-resumes") ?? "[]");
}

// after
export async function list(): Promise<Resume[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  return data.resumes;
}
```

The signature doesn't change — which means **no component ever needs updating.**

### Secrets

**Nothing secret goes in the frontend.** The AI API key lives on the backend
and is never exposed to the browser. `VITE_API_URL` is the only env var the
frontend needs, and it's not sensitive.

---

## License

Private — all rights reserved.
