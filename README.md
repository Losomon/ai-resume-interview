# CareerForge AI

> **AI-powered resume, job matching, and interview preparation platform.**

CareerForge AI is a full-stack SaaS application designed to help job seekers:

- Build and improve professional resumes
- Analyze resumes against job descriptions
- Identify missing skills and keywords
- Practice AI-generated interviews
- Receive structured interview feedback
- Track career readiness
- Eventually receive personalized career coaching

---

## 🚀 Project Status

**Current phase: Foundation / V1 scaffold**

The project is intentionally divided into milestones so you can implement and test one feature at a time.

### Progress

- [ ] 01 — Project setup
- [ ] 02 — Design system
- [ ] 03 — Landing page
- [ ] 04 — Authentication
- [ ] 05 — Dashboard
- [ ] 06 — Resume management
- [ ] 07 — Resume builder
- [ ] 08 — Resume PDF export
- [ ] 09 — ATS analyzer
- [ ] 10 — Job matcher
- [ ] 11 — Interview setup
- [ ] 12 — Text interview
- [ ] 13 — Interview evaluation
- [ ] 14 — Career coach
- [ ] 15 — Application tracker
- [ ] 16 — PostgreSQL integration
- [ ] 17 — AI provider integration
- [ ] 18 — Security hardening
- [ ] 19 — Testing
- [ ] 20 — Production deployment

Update the checkboxes as you complete each milestone.

---

# 1. Product Architecture

```text
CareerForge AI
│
├── frontend
│   └── React + TypeScript + Vite
│
├── backend
│   └── Node.js + Express + TypeScript
│
├── database
│   └── PostgreSQL + Prisma
│
├── docs
│   ├── architecture
│   ├── api
│   └── database
│
└── README.md
```

---

# 2. Recommended Technology

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Lucide React
- TanStack Query

## Backend

- Node.js
- Express
- TypeScript
- Zod
- Prisma
- JWT authentication

## Database

- PostgreSQL

## AI

Use an AI API through the backend.

**Never expose the AI API key in the React frontend.**

## Deployment

Recommended eventual setup:

```text
Frontend → Vercel
Backend  → Railway
Database → PostgreSQL / Railway
```

---

# 3. Design System

## Colors

```text
Background       #080B12
Secondary        #0D111A
Surface          #111722
Surface Hover    #161D2A
Elevated         #192231

Border           #222B3A
Border Hover     #344054

Primary          #7C5CFC
Primary Hover    #6D4FE8
Primary Soft     #211A3D
Accent           #A78BFA

Success          #22C55E
Warning          #F59E0B
Danger           #EF4444
Info             #38BDF8

Text Primary     #F8FAFC
Text Secondary   #CBD5E1
Text Muted       #64748B
```

## Typography

Primary font:

```text
Inter
```

Fallback:

```text
Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

## Spacing

Use an 8px grid:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

## Radius

```text
Small       6px
Input       8px
Button      8px
Card        12px
Large Card  16px
Modal       20px
Pill        999px
```

---

# 4. Development Order

## Phase 01 — Foundation

Goal:

Get the project running locally.

Tasks:

- Install dependencies
- Configure environment variables
- Start frontend
- Start backend
- Connect frontend to backend
- Confirm health endpoint

Expected result:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:4000
Health:   http://localhost:4000/api/health
```

---

# Phase 02 — Design System

Build reusable components before building pages.

Components:

```text
Button
Input
Textarea
Select
Card
Badge
Modal
Toast
Spinner
Skeleton
Progress
CircularProgress
Dropdown
Tabs
Avatar
EmptyState
```

States to support:

```text
Default
Hover
Active
Focus
Disabled
Loading
Success
Error
```

---

# Phase 03 — Landing Page

Sections:

```text
Hero
How It Works
AI Resume Builder
ATS Analyzer
AI Interview
Career Coach
Testimonials
Pricing
FAQ
CTA
Footer
```

Primary CTA:

```text
Build My Resume
```

Secondary CTA:

```text
Practice Interview
```

---

# Phase 04 — Authentication

Pages:

```text
/login
/register
/forgot-password
/reset-password
```

Requirements:

- Email/password
- Secure password hashing
- JWT access token
- Refresh token
- Protected routes
- Logout
- Form validation

---

# Phase 05 — Dashboard

Route:

```text
/dashboard
```

Main sections:

```text
Career Readiness
Resume Score
Interview Score
Skills
Applications
Quick Actions
Recent Activity
Interview Performance
```

---

# Phase 06 — Resume Management

Routes:

```text
/resumes
/resumes/new
/resumes/:id/edit
```

Features:

- Create resume
- Edit resume
- Duplicate resume
- Delete resume
- Save draft
- Resume status
- ATS score

---

# Phase 07 — Resume Builder

Use the three-column desktop layout:

```text
┌────────────┬─────────────────────┬──────────────────────┐
│ Sections   │ Editor              │ Live Preview         │
├────────────┼─────────────────────┼──────────────────────┤
│ Personal   │ Form fields         │ Resume document      │
│ Summary    │                     │                      │
│ Experience │ AI actions          │ A4 preview           │
│ Education  │                     │                      │
│ Skills     │                     │                      │
│ Projects   │                     │                      │
└────────────┴─────────────────────┴──────────────────────┘
```

Mobile:

```text
[ Edit ] [ Preview ]
```

---

# Phase 08 — ATS Analyzer

Route:

```text
/ats
```

Input:

```text
Resume
+
Job Description
```

Output:

```text
ATS Score
Keyword Match
Experience Match
Skills Match
Formatting
Missing Keywords
Recommendations
```

Important rule:

> The AI must not invent experience, qualifications, employment history, certifications, or skills for the user.

Recommendations should be based on information actually provided by the user.

---

# Phase 09 — Job Matcher

Route:

```text
/jobs/analyze
```

Workflow:

```text
Paste Job Description
        ↓
Analyze
        ↓
Extract Requirements
        ↓
Compare With Resume
        ↓
Calculate Match
        ↓
Show Skill Gaps
        ↓
Prepare Interview
```

---

# Phase 10 — Interview

Routes:

```text
/interview
/interview/setup
/interview/:id
/interview/:id/results
```

V1 should start with **text answers**.

Do not make voice/video a requirement for the first release.

Interview types:

```text
Technical
Behavioral
HR
Mixed
```

Difficulty:

```text
Easy
Medium
Hard
```

Experience:

```text
Entry
Junior
Mid
Senior
```

---

# Phase 11 — Interview Evaluation

Evaluate answers using structured criteria:

```text
Communication
Relevance
Technical Accuracy
Problem Solving
Clarity
Answer Structure
```

Use:

```text
Situation
Task
Action
Result
```

for behavioral answers where appropriate.

The system should explain why feedback was given instead of producing unexplained scores.

---

# Phase 12 — Career Coach

Route:

```text
/coach
```

The coach should eventually understand:

```text
User profile
Resume
Skills
Target roles
Job descriptions
Interview history
Skill gaps
```

Possible questions:

```text
How can I improve my resume?

What should I learn for backend development?

Prepare me for a Java interview.

Why did I score low in my interview?

What skills am I missing for this job?
```

---

# Phase 13 — Application Tracker

Route:

```text
/applications
```

Statuses:

```text
Saved
Applied
Screening
Interview
Offer
Rejected
Withdrawn
```

Use a Kanban-style interface on desktop.

---

# 5. Folder Guide

## frontend

```text
frontend/src/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   ├── resume/
│   ├── ats/
│   ├── jobs/
│   └── interview/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── index.css
```

### `components/ui`

Reusable visual components.

Do not put business logic here.

### `pages`

Page-level components.

### `services`

API communication.

### `hooks`

Reusable React logic.

### `store`

Global application state.

---

# 6. Backend Guide

```text
backend/src/
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
│   ├── ai/
│   ├── resume/
│   ├── ats/
│   ├── interview/
│   └── jobs/
├── validators/
├── utils/
├── app.ts
└── server.ts
```

Architecture:

```text
Request
  ↓
Route
  ↓
Controller
  ↓
Validation
  ↓
Service
  ↓
Database / AI
  ↓
Response
```

Keep AI logic inside services.

Do not call the AI provider directly from route files.

---

# 7. API Plan

Base URL:

```text
/api
```

Health:

```text
GET /api/health
```

Authentication:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

Resumes:

```text
GET    /api/resumes
POST   /api/resumes
GET    /api/resumes/:id
PATCH  /api/resumes/:id
DELETE /api/resumes/:id
```

ATS:

```text
POST /api/ats/analyze
```

Jobs:

```text
POST /api/jobs/analyze
GET  /api/jobs
```

Interviews:

```text
POST /api/interviews
GET  /api/interviews
GET  /api/interviews/:id
POST /api/interviews/:id/answer
POST /api/interviews/:id/complete
```

Coach:

```text
POST /api/coach/chat
```

---

# 8. Database Plan

Core tables:

```text
users
profiles
resumes
resume_versions
experiences
educations
projects
skills
certifications

jobs
job_requirements

applications

interviews
interview_questions
interview_answers
interview_feedback

career_goals
coach_conversations
coach_messages
```

Relationships should always use `user_id` where appropriate.

---

# 9. Environment Variables

Frontend:

```env
VITE_API_URL=http://localhost:4000/api
```

Backend:

```env
PORT=4000
NODE_ENV=development

DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/careerforge"

JWT_ACCESS_SECRET=change_me
JWT_REFRESH_SECRET=change_me

AI_API_KEY=change_me
```

Never commit the real `.env` file.

Only commit:

```text
.env.example
```

---

# 10. Security Checklist

Before production:

- [ ] Hash passwords
- [ ] Validate all request bodies
- [ ] Protect private routes
- [ ] Rate-limit authentication
- [ ] Sanitize uploaded files
- [ ] Restrict file types
- [ ] Limit upload sizes
- [ ] Keep AI keys server-side
- [ ] Configure CORS
- [ ] Secure cookies/tokens
- [ ] Add database constraints
- [ ] Add audit logging where needed
- [ ] Never trust AI-generated data as user facts

---

# 11. Testing Checklist

Frontend:

- [ ] Component tests
- [ ] Form validation tests
- [ ] Route tests
- [ ] Mobile layout testing

Backend:

- [ ] Auth tests
- [ ] API tests
- [ ] Validation tests
- [ ] Database tests
- [ ] AI service tests

End-to-end:

```text
Register
↓
Login
↓
Create Resume
↓
Analyze Job
↓
Start Interview
↓
Answer Questions
↓
Receive Feedback
```

---

# 12. Definition of Done

A feature is NOT finished just because the page exists.

A feature is complete when:

```text
UI
+
Responsive design
+
Loading state
+
Empty state
+
Error state
+
API
+
Validation
+
Database
+
Security
+
Testing
```

all work correctly.

---

# 13. Recommended Build Rule

Build in vertical slices.

Bad approach:

```text
Build all frontend
↓
Build all backend
↓
Try to connect everything
```

Better approach:

```text
Feature
↓
UI
↓
API
↓
Database
↓
Testing
↓
Complete
↓
Next feature
```

Example:

```text
Resume
↓
Resume UI
↓
Resume API
↓
Resume database
↓
Save/edit/delete
↓
Test
↓
DONE
```

Then move to ATS.

---

# 14. V1 Definition

The first public version should contain:

```text
✓ Landing page
✓ Registration/login
✓ Dashboard
✓ Resume builder
✓ Resume management
✓ Resume PDF export
✓ Job description analyzer
✓ ATS analysis
✓ Text-based AI interview
✓ Interview feedback
✓ Interview history
```

Do NOT delay V1 for:

```text
Voice
Video
AI avatar
Mobile app
Job scraping
Complex subscriptions
```

Those can come later.

---

# 15. V2

After V1:

```text
Voice interviews
AI speech
Career coach
Application tracker
Skill roadmap
Advanced analytics
Multiple resume templates
Job matching
```

---

# 16. V3

Advanced:

```text
Real-time voice interviewer
AI interviewer avatar
Video interview
Company-specific interview simulations
Personalized career roadmap
Job recommendations
Browser/mobile applications
Subscriptions
Team/enterprise features
```

---

# 17. Daily Progress Log

Use this section while building.

## Day 1

```text
Date:

Completed:
-

Files changed:
-

Problems:
-

Next:
-
```

## Day 2

```text
Date:

Completed:
-

Files changed:
-

Problems:
-

Next:
-
```

Continue this format.

---

# 18. Current Starting Point

You are starting here:

```text
                    CAREERFORGE AI

                         0%
                          │
                          ▼
                 PROJECT SCAFFOLD
                          │
                          ▼
                  DESIGN SYSTEM
                          │
                          ▼
                  LANDING PAGE
                          │
                          ▼
                    AUTHENTICATION
                          │
                          ▼
                      DASHBOARD
                          │
                          ▼
                  RESUME BUILDER
                          │
                          ▼
                    ATS ANALYZER
                          │
                          ▼
                    JOB MATCHER
                          │
                          ▼
                  AI INTERVIEW
                          │
                          ▼
                 INTERVIEW FEEDBACK
                          │
                          ▼
                  CAREER COACH
                          │
                          ▼
                    PRODUCTION
```

**Do not skip ahead.**

Finish each milestone before moving to the next one.

---

# 19. First Goal

The first development goal is NOT AI.

It is:

> **Get a beautiful CareerForge AI shell running locally.**

Success criteria:

```text
Frontend opens
✓ Dark theme
✓ CareerForge branding
✓ Responsive navigation
✓ Landing page
✓ Dashboard shell
✓ Reusable buttons/cards/inputs
✓ No console errors
```

After that, start adding functionality.

---

## Suggested Git commits

Use small commits:

```text
feat: initialize frontend
feat: initialize backend
feat: add design system
feat: build landing page
feat: add authentication UI
feat: add dashboard shell
feat: add resume management
feat: add resume builder
feat: add ats analyzer
feat: add interview simulator
feat: add interview evaluation
feat: connect postgres
feat: integrate ai service
test: add api tests
chore: prepare production deployment
```

---

# 20. Important Principle

CareerForge AI should never fabricate a candidate's qualifications.

For example, if a user has:

```text
Java
Spring Boot
PostgreSQL
```

but a job requires:

```text
AWS
Docker
Kubernetes
```

the application should say:

```text
Potential skill gap:
AWS
Docker
Kubernetes
```

It should **not** automatically add those technologies to the user's resume.

That principle is important for the credibility of the product.

---

## Final Architecture

```text
                       CAREERFORGE AI
                              │
              ┌───────────────┴───────────────┐
              │                               │
          FRONTEND                         BACKEND
       React + TS                         Node + TS
              │                               │
              │                       ┌───────┴────────┐
              │                       │                │
              │                   PostgreSQL          AI
              │                       │                │
              └────────────── API ────┴────────────────┘
                              │
                         Career Data
```

The README is deliberately designed to be your **project control document**: whenever we build a feature, you can update its checkbox and know exactly what remains.
