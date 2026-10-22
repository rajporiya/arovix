# Arovix Developer Guide

This document explains the repository structure, application flow, local setup, and
the usual places to make changes. It is intended for a developer joining the
project.

## 1. Project overview

Arovix is a company website with two separate applications:

- `frontend/company-website`: React, TypeScript, and Vite website.
- `backend`: Node.js, Express, TypeScript, MongoDB, Redis, and REST APIs.

The frontend is the browser client. The backend owns authentication, content,
contact inquiries, job applications, persistence, validation, and admin APIs.

## 2. Repository structure

```text
it-website/
├── DEVELOPER_GUIDE.md          # This document
├── backend/                    # Express REST API
│   ├── src/
│   │   ├── app.ts              # Express application and middleware
│   │   ├── server.ts           # Database/Redis startup and shutdown
│   │   ├── config/             # Environment, MongoDB, Redis, and logging
│   │   ├── middleware/         # Auth, validation, rate limiting, errors
│   │   ├── models/             # Mongoose models
│   │   ├── modules/            # Feature-specific modules such as auth
│   │   ├── routes/             # Public and admin API routes
│   │   ├── types/              # Shared TypeScript types
│   │   ├── utils/              # Response, cache, cookies, and error helpers
│   │   └── tests/              # Vitest/Supertest tests
│   ├── scripts/                # Operational scripts, including admin creation
│   ├── .env.example            # Environment variable template
│   ├── Dockerfile              # Production container image
│   ├── package.json             # Backend scripts and dependencies
│   └── README.md               # Backend-specific setup and API notes
└── frontend/
    ├── package.json             # Frontend workspace dependencies
    └── company-website/
        ├── public/              # Static public assets
        ├── src/
        │   ├── App.tsx          # Main page component
        │   ├── App.css          # App-level styles
        │   ├── index.css        # Global styles and CSS variables
        │   ├── main.tsx         # React/Vite entry point
        │   └── assets/           # Images and other imported assets
        ├── index.html
        ├── package.json
        └── vite.config.ts
```

The frontend currently contains the Vite starter page. New pages, routing,
state, API clients, and reusable UI components should be added under
`frontend/company-website/src`.

## 3. Prerequisites

- Node.js 22 or newer
- npm
- MongoDB running locally or a managed MongoDB connection
- Redis running locally or a managed Redis connection

## 4. Local setup

### Backend

Open a terminal in `backend`:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Update `.env` before starting the server. Secret values must be at least 32
characters long. The backend defaults to port `4000`.

Create the first administrator:

```powershell
$env:ADMIN_EMAIL="admin@example.com"
$env:ADMIN_PASSWORD="replace-with-a-strong-password"
npx tsx scripts/create-admin.ts
```

### Frontend

Open another terminal in `frontend/company-website`:

```powershell
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`.

## 5. Backend request flow

1. `src/server.ts` validates the environment and connects to MongoDB and Redis.
2. `src/app.ts` configures Helmet, CORS, cookies, JSON parsing, compression,
   request logging, health endpoints, and API routes.
3. `src/routes/index.ts` registers public content endpoints, contact and
   application submission, and protected admin endpoints.
4. `src/modules/auth.ts` handles login, refresh, logout, and current-admin
   authentication.
5. `src/middleware/validate.ts` validates request body, query, and path
   parameters with Zod.
6. Controllers/handlers query Mongoose models and return the standard API
   response shape.
7. `src/middleware/error-handler.ts` converts known errors into safe JSON
   responses and logs unexpected errors.

## 6. API conventions

All backend endpoints use the `/api/v1` prefix.

### Health

- `GET /api/v1/health/live`: process liveness check.
- `GET /api/v1/health/ready`: MongoDB and Redis readiness check.

### Authentication

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

Authentication uses HttpOnly cookies. Do not add a requirement to store access
or refresh tokens in `localStorage`.

### Public content

- `GET /api/v1/about`
- `GET /api/v1/services`
- `GET /api/v1/employees`
- `GET /api/v1/projects`
- `GET /api/v1/careers`
- `POST /api/v1/contact`
- `POST /api/v1/applications`

Public content only includes published and non-archived records.

### Admin

Admin requests require the authenticated cookie:

- `/api/v1/admin/services`
- `/api/v1/admin/employees`
- `/api/v1/admin/projects`
- `/api/v1/admin/careers`
- `/api/v1/admin/about`
- `/api/v1/admin/contact`
- `/api/v1/admin/applications`
- `GET /api/v1/admin/dashboard`

The admin router applies authentication and role authorization before handling
requests.

Successful responses follow this shape:

```json
{
  "success": true,
  "message": "Request completed",
  "data": {},
  "meta": {}
}
```

Paginated responses include `page`, `limit`, `total`, and `totalPages` in
`meta`. Error responses use `success: false` and a safe `message`.

## 7. Where to make common changes

| Change | Main location |
| --- | --- |
| Add an environment variable | `backend/src/config/env.ts` and `backend/.env.example` |
| Add a database field | `backend/src/models/content.model.ts` |
| Add a public endpoint | `backend/src/routes/index.ts` |
| Add authentication behavior | `backend/src/modules/auth.ts` |
| Add request validation | The route's Zod schema in `backend/src/routes/index.ts` or a feature module |
| Change auth permissions | `backend/src/middleware/authorize.ts` |
| Change cache behavior | `backend/src/utils/cache.ts` and the relevant route |
| Change API error formatting | `backend/src/middleware/error-handler.ts` |
| Change frontend entry UI | `frontend/company-website/src/App.tsx` |
| Change global frontend styling | `frontend/company-website/src/index.css` |
| Change app-specific frontend styling | `frontend/company-website/src/App.css` |
| Add frontend dependencies | `frontend/company-website/package.json` |
| Add backend dependencies | `backend/package.json` |

When adding a feature, keep validation, persistence, authorization, cache
invalidation, and tests together. Do not expose raw MongoDB documents when a
smaller public response is sufficient.

## 8. Data and security rules

- Never commit `.env`, credentials, tokens, password hashes, or database dumps.
- Never log passwords, cookies, authorization headers, or refresh tokens.
- Use explicit allowlists for fields accepted from request bodies.
- Validate IDs and all user-controlled query values.
- Keep contact submissions and applications admin-only.
- Do not cache personalized or sensitive responses.
- Invalidate public content cache entries after content mutations.
- Use the existing password hashing and refresh-token rotation flow for admins.
- Use `npm audit` when upgrading dependencies or preparing a deployment.

## 9. Testing and verification

Run these commands from `backend`:

```powershell
npm run typecheck
npm test
npm run build
```

The test environment is configured in `src/tests/setup.ts` with a separate test
MongoDB URI. Tests must never use production database or Redis credentials.

Before opening a pull request:

1. Run backend type checking, tests, and build.
2. Run the frontend build from `frontend/company-website`.
3. Confirm no secrets or generated files are included in Git.
4. Update this guide or the backend README when setup or architecture changes.

## 10. Deployment notes

The backend starts only after MongoDB and Redis are available. Use managed
services or separately deployed infrastructure in production. Supply secrets
through the deployment environment, not through the Docker image or repository.

Changing JWT or cookie secrets invalidates existing authentication tokens.
Deploy behind HTTPS so production cookies can use the `Secure` attribute.
