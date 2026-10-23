import 'dotenv/config'
import { z } from 'zod'

const emptyToUndefined = (value: unknown): unknown =>
  typeof value === 'string' && value.trim() === '' ? undefined : value

const optionalText = z.preprocess(emptyToUndefined, z.string().trim().min(1).optional())
const optionalPort = z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(65535).optional())
const optionalFlag = z.preprocess((value) => {
  if (typeof value === 'boolean') return value
  if (typeof value !== 'string' || value.trim() === '') return undefined
  const normalized = value.trim().toLowerCase()
  if (['true', '1', 'yes', 'on'].includes(normalized)) return true
  if (['false', '0', 'no', 'off'].includes(normalized)) return false
  return value
}, z.boolean().optional())

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
  SMTP_SERVICE: z.string().trim().min(1).default('gmail'),
  SMTP_HOST: optionalText,
  SMTP_PORT: optionalPort,
  SMTP_SECURE: optionalFlag,
  SMTP_USER: optionalText,
  SMTP_PASSWORD: z
    .preprocess(emptyToUndefined, z.string().transform((value) => value.replace(/\s+/g, '')).pipe(z.string().min(1)).optional()),
  ADMIN_NOTIFICATION_EMAIL: z.preprocess(emptyToUndefined, z.string().trim().email().optional()),
  MAIL_FROM_NAME: z.string().trim().min(1).max(80).default('Arovix'),
  MAIL_REPLY_TO: z.preprocess(emptyToUndefined, z.string().trim().email().optional()),
  MAIL_TIMEZONE: z.string().trim().min(1).default('Asia/Kolkata'),
})

const result = schema.safeParse(process.env)
if (!result.success) {
  throw new Error(`Invalid environment configuration: ${result.error.issues.map((issue) => issue.path.join('.')).join(', ')}`)
}

export const env = result.data
export type Env = typeof env
