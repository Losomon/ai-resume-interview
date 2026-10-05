# CareerForge backend

Node 20+, TypeScript, Express 5, zod, cookie sessions. The database lives in the sibling package `../database` (`@careerforge/database`); this folder holds only the API.

## Run (from the project root, which contains `database/`, `backend/` and the root `package.json`)
```bash
npm install                      # installs both packages and builds database
cp database/.env.example database/.env && cp backend/.env.example backend/.env   # fill DATABASE_URL, JWT_SECRET
npm run db:migrate               # apply migrations
npm run db:seed                  # optional, dev only
npm run dev                      # http://localhost:3000/health/ready
```
After changing the schema: `npm run build -w database`. Passwords use `bcryptjs` (pure JS) so Windows installs need no compiler.

## Implemented (base path `/api/v1`)
| Route | Notes |
|---|---|
| POST `/auth/register` `/auth/login` | Sets cookies, returns `{ user }`. Rate limited. Same error for wrong email or password |
| POST `/auth/refresh` `/auth/logout`; GET `/auth/me` | Refresh rotates the token |
| GET/POST `/resumes`; GET/PATCH/DELETE `/resumes/:id`; POST `/resumes/:id/duplicate` | Always owner-filtered; other users' ids return 404 |
| POST `/ai/rewrite` | SSE stream, 30/hour per user, labelled mock without `ANTHROPIC_API_KEY` |
| POST `/ats/analyze`; GET `/ats/history/:resumeId` | Deterministic `rules-v1`; separates missing evidence from skill gaps |

## Not yet built
Routes for interviews, applications, jobs, skills, coach and progress (their tables exist and are migrated). Password reset (needs an email provider), email verification, refresh-token reuse detection, tests.

## Design notes
Errors are `{ error: { code, message, fields? } }`. Cookies are `SameSite=Lax`; CSRF relies on that, JSON-only bodies and one allowed CORS origin. ATS rules know a fixed skill list; widen it or add LLM extraction later while keeping the evidence-versus-gap rule.
