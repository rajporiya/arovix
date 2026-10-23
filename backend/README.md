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

## SMTP email notifications

Email notifications are sent from the backend over SMTP using Nodemailer, with Gmail as the default service. SMTP credentials live only in the backend `.env` and are never sent to the frontend or included in API responses.

### Account and service setup

1. Enable 2-Step Verification on the Gmail account, then create an App Password at https://myaccount.google.com/apppasswords (a normal login password will be rejected by Gmail).
2. Copy the values into `.env`: `SMTP_SERVICE=gmail`, `SMTP_USER`, `SMTP_PASSWORD`, and `ADMIN_NOTIFICATION_EMAIL` (where new inquiries and applications are delivered). Use `.env.example` as the variable reference.
3. The backend composes the emails itself — no templates are required. Each submission sends two messages: an administrator notification and a confirmation to the submitter.

Notification content comes from these fields:

- Contact: `name`, `email`, `subject`, `message`, `submittedAt`.
- Career: `applicantName`, `applicantEmail`, `jobTitle`, `applicationId`, `submittedAt`.

If SMTP configuration is missing or Gmail rejects a request, the contact or application remains saved and the API still returns the submission result; the server records only a redacted, generic notification failure. SMTP attempts have an eight-second connection/greeting/socket timeout and are not blindly retried, preventing duplicate messages.

To test locally, submit `POST /api/v1/contact` or `POST /api/v1/applications` against a published career record and check the recipient inbox (and the spam folder). Automated tests mock Nodemailer and never send real email. Diagnose provider failures using the backend warning log and Gmail's activity page, without logging or sharing the app password.

## Deployment

Run the compiled `dist/server.js` with managed MongoDB and Redis. Rotate JWT and cookie secrets by changing them and restarting; this invalidates existing tokens. Do not put secrets in images or source control. Redis is required at startup because it is used for rate-limit infrastructure; cache failures are logged and fall back to MongoDB reads.
