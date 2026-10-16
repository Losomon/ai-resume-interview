# CareerForge backend (phase 1)

Express + TypeScript + PostgreSQL (Drizzle) + Zod. Auth via httpOnly JWT cookie.

## Run
    npm install
    cp .env.example .env      # set DATABASE_URL and a 32+ char JWT_SECRET
    npm run db:migrate
    npm run dev               # http://localhost:3000, check /health/ready

## Endpoints (all under /api, cookie session)
auth: POST register, login, logout; GET me
users: GET/PATCH/DELETE /users/me      settings: GET/PATCH /settings
resumes: GET/POST /resumes, GET/PATCH/DELETE /resumes/:id
ats: POST /ats/analyze, GET /ats, GET /ats/:id
applications: GET/POST, PATCH/DELETE /:id     dashboard: GET /dashboard
contact: POST /contact (public)

## Not built yet (phase 2+)
AI resume improve, interviews, coach, file upload/parse, PDF/DOCX export,
password reset + email verification, OAuth, jobs, notifications, billing, tests.
