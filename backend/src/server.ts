import { createServer } from 'node:http'
import { app } from './app.js'
import { env } from './config/env.js'
import { connectDatabase, disconnectDatabase } from './config/database.js'
import { connectRedis, disconnectRedis } from './config/redis.js'
import { logger } from './config/logger.js'
import { adminRecipient, emailConfigured } from './modules/email/email.service.js'

const server = createServer(app)
let shuttingDown = false

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) return
  shuttingDown = true
  logger.info({ signal }, 'Shutting down')
  await new Promise<void>((resolve) => server.close(() => resolve()))
  await Promise.all([disconnectDatabase(), disconnectRedis()])
  process.exit(0)
}

async function start(): Promise<void> {
  await connectDatabase()
  await connectRedis()
  if (emailConfigured()) {
    logger.info({ recipient: adminRecipient() }, 'Email notifications enabled')
  } else {
    logger.warn('Email notifications are DISABLED — set SMTP_USER and SMTP_PASSWORD in backend/.env (npm run email:test to verify)')
  }
  server.listen(env.PORT, () => logger.info({ port: env.PORT }, 'API listening'))
}

process.once('SIGINT', () => void shutdown('SIGINT'))
process.once('SIGTERM', () => void shutdown('SIGTERM'))
start().catch((error: unknown) => {
  logger.fatal({ err: error }, 'Startup failed')
  process.exit(1)
})
