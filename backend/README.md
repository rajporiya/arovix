# Arovix backend

Secure, modular REST API for the company website. It uses Node.js, Express, TypeScript, MongoDB/Mongoose, Redis, Zod, JWT cookies, Pino, and rate limiting.

## Local setup

1. Install Node.js 22+ and start MongoDB and Redis.
2. Copy `.env.example` to `.env` and replace all secret placeholders with random values of at least 32 characters.
3. Run `npm install`, then `npm run dev`.
4. Create the first administrator with `ADMIN_EMAIL=... ADMIN_PASSWORD=... npx tsx scripts/create-admin.ts`.

`MONGODB_URI`, `REDIS_URL`, and all secret settings are required. The API refuses to start with invalid configuration. Refresh sessions are rotated and stored only as hashes; authentication cookies are HttpOnly and never require localStorage.

## Commands

`npm run dev`, `npm run build`, `npm start`, `npm run typecheck`, `npm test`, and `npm run lint`.

## API

All endpoints are under `/api/v1`. Public reads are `/about`, `/services`, `/employees`, `/projects`, and `/careers`. Public writes are `/contact` and `/applications`. Authentication is `/auth/login`, `/auth/refresh`, `/auth/logout`, and `/auth/me`. Content CRUD, inquiry/application management, and `/admin/dashboard` require an authenticated admin.

Responses use `{ success, message, data, meta }`; paginated endpoints include `page`, `limit`, `total`, and `totalPages`. The API accepts credentials from the configured `FRONTEND_URL`, and state-changing requests are protected by same-site cookies and strict CORS.

## Deployment

Run the compiled `dist/server.js` with managed MongoDB and Redis. Rotate JWT and cookie secrets by changing them and restarting; this invalidates existing tokens. Do not put secrets in images or source control. Redis is required at startup because it is used for rate-limit infrastructure; cache failures are logged and fall back to MongoDB reads.
