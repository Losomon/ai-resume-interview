# API Contract

Base URL:

```text
/api
```

## Health

```http
GET /api/health
```

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET /api/auth/me
```

## Resumes

```http
GET /api/resumes
POST /api/resumes
GET /api/resumes/:id
PATCH /api/resumes/:id
DELETE /api/resumes/:id
```

## ATS

```http
POST /api/ats/analyze
```

## Jobs

```http
POST /api/jobs/analyze
GET /api/jobs
```

## Interviews

```http
POST /api/interviews
GET /api/interviews
GET /api/interviews/:id
POST /api/interviews/:id/answer
POST /api/interviews/:id/complete
```

## Career Coach

```http
POST /api/coach/chat
```
