# CareerForge backend

Node 20+, TypeScript, Express 5, PostgreSQL, Drizzle, zod. Cookie sessions (httpOnly JWT + rotating refresh token).

## Run
```bash
cp .env.example .env            # fill DATABASE_URL and JWT_SECRET
npm install express cors helmet cookie-parser express-rate-limit zod drizzle-orm pg jsonwebtoken bcryptjs @anthropic-ai/sdk dotenv
npm install -D typescript tsx drizzle-kit @types/node @types/express @types/cors @types/cookie-parser @types/pg @types/jsonwebtoken
npm run db:generate && npm run db:migrate
npm run dev                     # http://localhost:3000/health/ready
```
`bcryptjs` (pure JS) is used instead of native bcrypt/argon2 so installs work on Windows without a compiler.

## Implemented (base path `/api/v1`)
| Route | Notes |
|---|---|
| POST `/auth/register` `/auth/login` | Sets cookies, returns `{ user }`. Rate limited. Same error for wrong email or password |
| POST `/auth/refresh` `/auth/logout`; GET `/auth/me` | Refresh rotates the token |
| GET/POST `/resumes`; GET/PATCH/DELETE `/resumes/:id`; POST `/resumes/:id/duplicate` | Always filtered by owner; other users' ids return 404 |
| POST `/ai/rewrite` | SSE stream, 30/hour per user, mock mode without `ANTHROPIC_API_KEY` |
| POST `/ats/analyze`; GET `/ats/history/:resumeId` | Deterministic `rules-v1`; separates missing evidence from skill gaps; writes `resumes.ats_score` |

## Not yet built
Interviews, applications, jobs, skills, coach routes (interview and application tables exist). Forgot/reset password (needs an email provider), email verification, refresh-token reuse detection, tests.

## Design notes
- Errors use `{ error: { code, message, fields? } }` (doc 07). Validation is zod on every input.
- Cookies are `SameSite=Lax`; CSRF relies on that plus a JSON-only body and a single allowed CORS origin. If the frontend and API end up on different sites, revisit (doc 10).
- Resume content is one validated JSONB document instead of a `resume_sections` table, matching the builder's data model.
- ATS rules only know a fixed skill list; widen it or add an LLM extraction step later, keeping the evidence-versus-gap rule.
