# CareerForge backend

Node 20+, TypeScript, Express 5, zod, cookie sessions. The database is the sibling package `../database` (`@careerforge/database`).

## Run (from the project root that holds `database/`, `backend/` and the root `package.json`)
```bash
npm install                      # installs both packages and builds database
cp database/.env.example database/.env && cp backend/.env.example backend/.env   # set DATABASE_URL, JWT_SECRET
npm run db:migrate && npm run db:seed
npm run dev                      # http://localhost:3000/health/ready
npm run smoke                    # in another terminal: walks every route group (needs bash, curl, node)
```

## Layout
```text
src/  index.ts (listen)  app.ts (createApp factory)  env.ts (validated env)  db.ts
├── routes/       *.routes.ts  thin: parse, call a service, respond
├── services/     *.service.ts business logic and queries
├── middleware/   auth  error  validate  rate-limit
├── lib/          jwt  password  errors  logger  llm (provider adapter)
└── types/        express.d.ts
```

## Endpoints (`/api/v1`; everything except `/auth/*` needs the session cookie)
| Area | Routes |
|---|---|
| Auth | POST `/auth/register` `/login` `/refresh` `/logout`; GET `/auth/me` |
| Resumes | GET/POST `/resumes`; GET/PATCH/DELETE `/resumes/:id`; POST `/resumes/:id/duplicate` |
| AI | POST `/ai/rewrite` (SSE), POST `/ai/suggestions` |
| ATS | POST `/ats/analyze`; GET `/ats/history/:resumeId` |
| Interview | POST/GET `/interview/sessions`; GET/PATCH `/interview/sessions/:id`; POST `/interview/sessions/:id/submit` |
| Applications | GET/POST `/applications`; PATCH/DELETE `/applications/:id` |
| Coach | GET `/coach/conversation`; POST `/coach/message`, `/coach/plan`; PATCH `/coach/plan/:stepId` |
| Jobs | GET `/jobs` (filters: q, location, level, remote, minSalary, limit); GET `/jobs/:id` |
| Health | GET `/health/live`, `/health/ready` |

## How the smart parts work
- **ATS** (`rules-v1`): deterministic keyword matching against the shared skill catalog. A required skill that is absent but has a related one (Spring Boot ← Java) is *missing evidence*; otherwise it is a *skill gap*. Runs on the server, so stored scores can't be edited by users.
- **Interview scoring** (`rules-v1`): transparent rules on length, action verbs, numbers, results and hedging, not an LLM. `technical` means depth for technical questions and measurable impact for behavioural ones. Unanswered questions count as zero.
- **Job match**: share of a job's required skills found in the user's most recently edited resume.
- **AI and coach**: with `ANTHROPIC_API_KEY` set they call the model (prompts forbid inventing facts; user text is treated as data). Without it they return labelled mock output (rewrite) or rule-based replies (coach), so the whole UI works offline.

## Security notes
httpOnly `SameSite=Lax` cookies (15 min access, 7 day rotating refresh stored hashed), bcrypt cost 12, every query owner-scoped (other users' ids return 404), zod on every input, helmet, single-origin CORS, rate limits on auth (20 per 15 min) and AI (30 per hour per user), no request bodies in logs. Details and open items: docs 10.

## Not built yet
Password reset (needs an email provider), email verification, refresh-token reuse detection, automated tests (`npm run smoke` is a manual end-to-end check), the real-model paths have not been exercised.
