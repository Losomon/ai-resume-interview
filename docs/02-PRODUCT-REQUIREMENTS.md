# 02. Product Requirements

## Personas
| Persona | Situation | Needs |
|---|---|---|
| **Amina, graduate** | First job search, one generic resume | Structure, confidence, interview practice |
| **Daniel, career switcher** | Skills exist but resume speaks the old industry's language | ATS keyword alignment, honest gap analysis |
| **Priya, mid-level engineer** | Strong resume, rusty interviews | Targeted mock interviews, measurable-results coaching |

## Goals
- A user can go from upload to a job-ready resume in one session.
- Every score comes with a concrete next action.
- Users return to practice interviews and track a rising readiness score.

## Non-goals (v1)
Recruiter dashboards, live human coaching, auto-applying to jobs, generating fake experience.

## Requirements by priority
**P0 (launch)**
| ID | Requirement | Acceptance |
|---|---|---|
| R1 | Register, log in, reset password | Validation errors are specific; session persists |
| R2 | Create, list, edit, delete resumes | Preview updates within ~100 ms of typing |
| R3 | AI rewrite of a selected bullet | Shows original vs suggestion; user must accept, edit or dismiss |
| R4 | ATS analysis against a pasted job description | Score, keyword match, gaps split into *missing evidence* and *skill gaps* |
| R5 | AI mock interview (text) with 10 questions and timer | Per-question answer; results page with category scores |
| R6 | Dashboard with readiness score and recommended actions | Two-tier layout; loads with skeletons |

**P1**: job search and match scores, interview history, resume templates, PDF export.
**P2**: career coach chat, application tracker, skill roadmap.

## Honesty requirements (non-negotiable)
- AI suggestions must be grounded in text the user supplied. No invented employers, dates, metrics or credentials.
- When a suggestion needs a number ("improved performance by 38%"), it is shown as a **placeholder the user fills in**, not a fact.

## Non-functional
| Area | Target |
|---|---|
| Performance | LCP under 2.5 s on 4G; AI responses stream, first token under 2 s |
| Accessibility | WCAG 2.1 AA, reduced motion honored |
| Responsiveness | 360 px to 1920 px; mobile tested at 390×844 |
| Privacy | Resume data private by default; deletion on request (doc 10) |

## Success metrics (to be baselined)
Activation (first resume saved), ATS analyses per user, interviews completed, readiness score change after 14 days, 30-day retention.

## Open questions
- Free vs paid limits (analyses, interviews per month)?
- Which languages beyond English?
- Are resumes exportable to DOCX as well as PDF?
