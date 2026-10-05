# 07. API Specification

> **DRAFT / PROPOSAL.** Derived from what the frontend needs (`services/*.api.ts`). Replace with the real contract as the backend design firms up, then update the services to match.

## Conventions
- Base path `/api/v1`, JSON, UTC ISO-8601 timestamps, ids as strings.
- Auth: `Authorization: Bearer <JWT>` (or httpOnly cookie, see doc 10).
- Pagination: `?page=1&pageSize=20` → `{ items, total, page }`.
- Errors: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": { "email": "Invalid email" } } }`.
- Statuses: 200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500.
- Long AI operations either stream (SSE) or return `202` with a job id.

## Endpoints
| Area | Method + path | Purpose |
|---|---|---|
| Auth | POST `/auth/register` | Create account |
| | POST `/auth/login` | Returns token + user |
| | POST `/auth/logout`, `/auth/refresh` | Session |
| | POST `/auth/forgot-password`, `/auth/reset-password` | Recovery |
| User | GET/PATCH `/me`, DELETE `/me` | Profile, account deletion |
| Dashboard | GET `/dashboard` | Scores, activity, recommendations |
| Resumes | GET/POST `/resumes`; GET/PUT/DELETE `/resumes/{id}` | CRUD |
| | POST `/resumes/{id}/duplicate`, `/resumes/import` | Duplicate, upload |
| | GET `/resumes/{id}/export?format=pdf` | Export |
| AI resume | POST `/resumes/{id}/rewrite` (SSE) | Improve selected text |
| ATS | POST `/ats/analyses`; GET `/ats/analyses/{id}` | Run, fetch |
| Jobs | GET `/jobs?q=`; GET `/jobs/{id}`; POST `/jobs/{id}/match` | Search, details, match |
| Interview | POST `/interviews`; GET `/interviews`; GET `/interviews/{id}` | Start, list, get |
| | POST `/interviews/{id}/answers`; POST `/interviews/{id}/complete` | Answer, finish |
| | GET `/interviews/{id}/result` | Scores and feedback |
| Coach | POST `/coach/messages` (SSE); GET `/coach/messages` | Chat |
| Applications | GET/POST `/applications`; PATCH/DELETE `/applications/{id}` | Tracker |

## Key payloads
**POST /auth/login**
```json
{ "email": "a@b.com", "password": "..." }
→ { "token": "jwt", "user": { "id": "u_1", "name": "Amina W", "email": "a@b.com" } }
```
**POST /resumes/{id}/rewrite**
```json
{ "sectionId": "exp_1", "text": "Developed a website.", "instruction": "make measurable" }
→ stream: { "suggestion": "Designed and developed a responsive web app using [stack]...", "placeholders": ["[stack]", "[X]%"] }
```
**POST /ats/analyses**
```json
{ "resumeId": "r_1", "jobDescription": "..." }
→ { "id": "a_1", "score": 87,
    "breakdown": { "keywords": 91, "experience": 88, "formatting": 96, "skills": 76 },
    "missingEvidence": [{ "skill": "Docker", "hint": "Add where you used containers" }],
    "skillGaps": [{ "skill": "AWS", "hint": "Not found in your resume or skills" }] }
```
**GET /interviews/{id}/result**
```json
{ "id": "i_1", "score": 84, "communication": 88, "technical": 81, "confidence": 83,
  "strengths": ["Clear explanation"], "improvements": ["Add measurable results"] }
```

## Versioning and rate limits
Breaking changes bump `/v2`. AI endpoints are rate-limited per user (proposal: 30 requests/hour, plan-dependent) and return `429` with `Retry-After`.

## Open questions for the backend design
- JWT in header or httpOnly cookie? Refresh strategy?
- SSE vs WebSocket for streaming?
- Are ATS and interview scoring synchronous or job-based?
- File upload path for resume import (multipart vs pre-signed URL)?

## Implementation notes (decided stack)
- Express 5 (async handlers forward rejected promises to the error middleware; on Express 4 you must wrap them). Layout: `routes/`, `services/`, `db/`, `middleware/`.
- Validate every request body, query and params with **zod**; map failures to the `VALIDATION_ERROR` format above.
- Streaming (rewrite, coach) uses Server-Sent Events: `Content-Type: text/event-stream`, flush each chunk, and stop the LLM call when the client disconnects.
- CORS: allow only the frontend origin; add `credentials: true` if cookies are used. An open `cors()` is acceptable for local step 1 only.
- Keep ATS keyword matching and scoring on the server. Browser-computed scores can be edited by the user and must not be trusted or stored as truth.
