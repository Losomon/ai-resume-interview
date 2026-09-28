# CareerForge AI Architecture

## High-level

```text
React Frontend
      |
      | HTTPS / JSON
      v
Express API
      |
      +---- PostgreSQL
      |
      +---- AI Service
      |
      +---- File Storage
```

## Rules

1. The browser never receives private AI provider keys.
2. Business logic belongs in backend services.
3. Controllers should remain thin.
4. Validate external input.
5. Keep resume data and AI-generated suggestions separate.
6. Never silently modify a user's factual qualifications.
7. Add authorization checks to every user-owned resource.
