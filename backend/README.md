# Arovix backend

Secure, modular REST API for the company website. It uses Node.js, Express, TypeScript, MongoDB/Mongoose, Redis, Zod, JWT cookies, Pino, and rate limiting.

## Local setup

1. Install Node.js 22+ and start MongoDB. Redis is optional; when it is unavailable, the API continues without caching.
2. Copy `.env.example` to `.env` and replace all secret placeholders with random values of at least 32 characters.
3. Run `npm install`, then `npm run dev`.
4. Create the first administrator with `ADMIN_EMAIL=... ADMIN_PASSWORD=... npx tsx scripts/create-admin.ts`.

`MONGODB_URI`, `REDIS_URL`, and all secret settings are required in configuration. If Redis is unavailable at runtime, cache operations are skipped and the API remains available. Refresh sessions are rotated and stored only as hashes; authentication cookies are HttpOnly and never require localStorage.

## Commands

`npm run dev`, `npm run build`, `npm start`, `npm run typecheck`, `npm test`, and `npm run lint`.

## API

All endpoints are under `/api/v1`. Public reads are `/about`, `/services`, `/employees`, `/projects`, and `/careers`. Public writes are `/contact` and `/applications`. Authentication is `/auth/login`, `/auth/refresh`, `/auth/logout`, and `/auth/me`. Content CRUD, inquiry/application management, and `/admin/dashboard` require an authenticated admin.

Responses use `{ success, message, data, meta }`; paginated endpoints include `page`, `limit`, `total`, and `totalPages`. The API accepts credentials from the configured `FRONTEND_URL`, and state-changing requests are protected by same-site cookies and strict CORS.

## SMTP email notifications

Email notifications are sent from the backend over SMTP using Nodemailer, with Gmail as the default service. SMTP credentials live only in the backend `.env` and are never sent to the frontend or included in API responses.

### Account and service setup

1. Enable 2-Step Verification on the Gmail account, then create an App Password at https://myaccount.google.com/apppasswords (a normal login password will be rejected by Gmail).
2. Copy the values into `.env`: `SMTP_SERVICE=gmail`, `SMTP_USER`, `SMTP_PASSWORD`, and optionally `ADMIN_NOTIFICATION_EMAIL` (where new inquiries and applications are delivered; it defaults to `SMTP_USER` when empty).
3. Run `npm run email:test`. It verifies the SMTP connection, sends a real sample inquiry to the admin inbox, and sends the confirmation template to `SMTP_USER`. Check the inbox and spam folder.
4. The backend composes the emails itself — no templates are required. Each submission sends two designed HTML emails: an administrator notification (with `Reply-To` set to the submitter) and a branded confirmation to the submitter.

Optional variables: `MAIL_FROM_NAME` (sender display name), `MAIL_REPLY_TO` (reply-to for confirmations), `MAIL_TIMEZONE` (timestamps in emails), and `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` for any non-Gmail SMTP provider.

Notification content comes from these fields:

- Contact: `name`, `email`, `subject`, `message`, `submittedAt`.
- Career: `applicantName`, `applicantEmail`, `jobTitle`, `applicationId`, `submittedAt`.

### Delivery behaviour and troubleshooting

The inquiry/application is always saved first. The API response now includes a truthful delivery state:

```json
{ "id": "...", "email": { "admin": "sent", "confirmation": "sent" } }
```

`"failed"` means the record was stored but the message did not leave the server. The server logs the provider code and response code (never the password) with a hint to check `.env`. Common causes:

- `SMTP_USER` / `SMTP_PASSWORD` empty → "Email provider is not configured". Copy `.env.example` to `.env` and fill them in.
- `EAUTH` / `535` → the Gmail App Password is wrong, revoked, or 2-Step Verification is off. Create a new App Password.
- Timeouts (`ETIMEDOUT`, `ESOCKET`) on a host that blocks port 587 → use port 465 with `SMTP_SECURE=true`, or a different provider.
- Email in spam → for a custom domain, configure SPF, DKIM, and DMARC; Gmail "Send mail as" also requires verification.
- Nothing in the admin inbox → `ADMIN_NOTIFICATION_EMAIL` is empty and `SMTP_USER` is wrong.

SMTP attempts have an eight-second connection/greeting/socket timeout and are not blindly retried, preventing duplicate messages. Automated tests mock Nodemailer and never send real email.

## Deployment

Run the compiled `dist/server.js` with managed MongoDB and Redis. Rotate JWT and cookie secrets by changing them and restarting; this invalidates existing tokens. Do not put secrets in images or source control. Redis is used for rate-limit infrastructure when available; cache failures are logged and fall back to MongoDB reads.
