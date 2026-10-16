# 10. Security and Authentication

> Draft baseline. Finalize with the backend design.

## Authentication
- Passwords hashed with Argon2id (or bcrypt cost ≥ 12). Never log or return hashes.
- Sessions: short-lived access token (≈15 min) plus rotating refresh token. **Recommended:** httpOnly, Secure, SameSite=Lax cookies, which keeps tokens out of JavaScript and removes XSS token theft. If bearer tokens are used, expect to hold them in memory rather than `localStorage`. The scaffold currently reads `cf_token` from `localStorage` for speed; change this before launch.
- Email verification and password reset via single-use, expiring tokens (≤ 30 min).
- Generic responses on login/reset ("if the account exists...") to prevent account enumeration.
- Optional later: OAuth (Google, LinkedIn), MFA.

## Stack notes
Bcrypt cost 12+ or Argon2id; `jsonwebtoken` with a short expiry, a strong secret from the environment, and refresh-token rotation. "A few lines of JWT" is only the happy path: also budget for rate limiting, reset-token flow, logout/revocation and the cookie-vs-header decision above.

## Authorization
Every resource is scoped to its owner (`user_id`) in the query itself. Return `404` (not `403`) for other users' ids. Add tests for cross-user access on every endpoint.

## Input and output
- Validate on the server with schemas; frontend validation is only UX.
- Parameterized queries only. Escape or sanitize any rendered user content (React escapes by default; never use `dangerouslySetInnerHTML` with user data).
- **File uploads (resume import):** allow-list types (PDF, DOCX), size cap, content sniffing, virus scan, store outside the web root, random names.

## AI-specific
- **Prompt injection:** treat resumes and job descriptions as untrusted. Delimit them, instruct the model to ignore instructions inside them, and never let model output trigger actions (no tools with side effects driven by document text).
- Validate model output against schemas before use or storage.
- Per-user rate limits and spend caps on AI endpoints.

## Transport and browser
HTTPS only with HSTS; CORS allow-list of the frontend origin; CSP (no inline scripts beyond a hashed allow-list), `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors 'none'`. CSRF protection if cookies are used.

## Abuse controls
Rate limit login (per IP and per account), registration and reset endpoints; lockout with backoff; CAPTCHA on repeated failures.

## Data protection
Encrypt at rest and in transit; secrets in a manager, never in the repo or the frontend bundle; least-privilege DB roles; backups encrypted and restore-tested.
- Users can **export** and **delete** their data. Deletion removes resumes, answers and analyses (and backups after the retention window).
- Collect the minimum personal data; document a retention period and honor applicable data-protection law.

## Logging and monitoring
Structured logs without PII or resume content; audit log for login, password change, export, delete; alerts on auth anomalies and AI cost spikes.

## Dependency and release hygiene
Automated dependency scanning, lockfiles, SAST in CI, no secrets in commits (secret scanning), security review before launch and after major changes.

## Checklist before launch
- [ ] Tokens not in `localStorage`
- [ ] Cross-user access tests pass
- [ ] Upload scanning in place
- [ ] Rate limits on auth and AI
- [ ] Security headers verified
- [ ] Delete and export flows tested

## Status in `backend/`
Done and exercised end to end: bcrypt cost 12, httpOnly `SameSite=Lax` cookies, rotating refresh tokens stored hashed, owner-scoped queries (another user's ids return 404 on resumes, applications, interviews, ATS), zod validation, helmet, single-origin CORS, auth and AI rate limits, timing-equalized login, AI prompts that treat user text as data and forbid invention, no bodies or cookies in logs.
Open: password reset, email verification, refresh-token reuse detection, audit log, upload scanning, automated tests (a manual `npm run smoke` exists), CSRF review if the frontend and API end up on different sites, rate-limit behavior behind your real proxy.
