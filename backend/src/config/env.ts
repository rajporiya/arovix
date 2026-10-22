import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  MONGODB_URI: z.string().min(1),
  REDIS_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ACCESS_TOKEN_TTL: z.string().default('15m'),
  REFRESH_TOKEN_TTL: z.string().default('7d'),
  COOKIE_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  EMAILJS_SERVICE_ID: z.string().min(1).optional(),
  EMAILJS_API_KEY: z.string().min(1).optional(),
  EMAILJS_PRIVATE_KEY: z.string().min(1).optional(),
  EMAILJS_CONTACT_TEMPLATE_ID: z.string().min(1).optional(),
  EMAILJS_CAREER_TEMPLATE_ID: z.string().min(1).optional(),
  EMAILJS_CONTACT_CONFIRMATION_TEMPLATE_ID: z.string().min(1).optional(),
  EMAILJS_CAREER_CONFIRMATION_TEMPLATE_ID: z.string().min(1).optional(),
  ADMIN_NOTIFICATION_EMAIL: z.string().email().optional(),
})

const result = schema.safeParse(process.env)
if (!result.success) {
  throw new Error(`Invalid environment configuration: ${result.error.issues.map((issue) => issue.path.join('.')).join(', ')}`)
}

export const env = result.data
export type Env = typeof env
