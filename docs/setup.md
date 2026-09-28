# Local Setup

## Requirements

Install:

- Node.js 20+
- npm
- PostgreSQL (when database development begins)
- Git

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

API:

```text
http://localhost:4000
```

Health check:

```text
http://localhost:4000/api/health
```

## Environment

Copy:

```text
frontend/.env.example → frontend/.env
backend/.env.example   → backend/.env
```

Do not commit `.env`.

## Current scaffold

The frontend currently contains the first visual foundation and landing-page preview.

The backend currently contains a health endpoint and secure baseline middleware.

Database and AI integration are intentionally left for later milestones.
