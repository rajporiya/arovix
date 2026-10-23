import { createClient, type RedisClientType } from 'redis'
import { env } from './env.js'
import { logger } from './logger.js'

export const redis: RedisClientType = createClient({
  url: env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => retries === 0 ? 100 : false,
  },
})
redis.on('error', (error) => logger.error({ err: error }, 'Redis client error'))

export async function connectRedis(): Promise<void> {
  try {
    await redis.connect()
    logger.info('Redis connected')
  } catch (error) {
    logger.warn({ err: error }, 'Redis unavailable; continuing without cache')
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redis.isOpen) await redis.quit()
}
