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

## EmailJS notifications

Email notifications use the official EmailJS REST endpoint (`/api/v1.0/email/send`) from the backend. The backend sends the EmailJS public key as `user_id` and the private key as `accessToken`; the private key is never sent to the frontend or included in API responses.

### Account and service setup

1. Create an EmailJS account and an email service in the EmailJS dashboard.
2. Create a contact notification template and a career notification template.
3. Configure the templates to deliver to the administrator. If the template uses a dynamic recipient, map its recipient field to `{{adminEmail}}`; the backend supplies this value from `ADMIN_NOTIFICATION_EMAIL`.
4. Optionally create contact and career confirmation templates. Their recipient fields should use `{{email}}` and `{{applicantEmail}}`, respectively.
5. Copy the service ID, public key, private key/access token, and template IDs into `.env`. Use `.env.example` as the variable reference.

Required notification variables are:

- Contact: `name`, `email`, `subject`, `message`, `submittedAt` (plus server-controlled `adminEmail` when used by the template).
- Career: `applicantName`, `applicantEmail`, `jobTitle`, `applicationId`, `submittedAt` (plus server-controlled `adminEmail` when used by the template).

The required provider settings are `EMAILJS_SERVICE_ID`, `EMAILJS_API_KEY` (EmailJS public key), `EMAILJS_PRIVATE_KEY` (EmailJS private key/access token), the two administrator template IDs, and `ADMIN_NOTIFICATION_EMAIL`. Confirmation template IDs are optional. If provider configuration is missing or EmailJS rejects a request, the contact or application remains saved and the API still returns the submission result; the server records only a redacted, generic notification failure. The provider request has an eight-second timeout and is not blindly retried, preventing duplicate messages.

To test locally, configure test EmailJS templates and submit `POST /api/v1/contact` or `POST /api/v1/applications` against a published career record. Automated tests mock `fetch` and never send real email. Diagnose provider failures using the backend warning log and the EmailJS dashboard status, without logging or sharing private keys. EmailJS accepting a request is not a guarantee that a message reached the recipient, so delivery should be verified in the provider dashboard.

## Deployment

Run the compiled `dist/server.js` with managed MongoDB and Redis. Rotate JWT and cookie secrets by changing them and restarting; this invalidates existing tokens. Do not put secrets in images or source control. Redis is required at startup because it is used for rate-limit infrastructure; cache failures are logged and fall back to MongoDB reads.
