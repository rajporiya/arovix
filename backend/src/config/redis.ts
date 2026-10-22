import { createClient, type RedisClientType } from 'redis'
import { env } from './env.js'
import { logger } from './logger.js'

export const redis: RedisClientType = createClient({ url: env.REDIS_URL })
redis.on('error', (error) => logger.error({ err: error }, 'Redis client error'))

export async function connectRedis(): Promise<void> {
  await redis.connect()
  logger.info('Redis connected')
}

export async function disconnectRedis(): Promise<void> {
  if (redis.isOpen) await redis.quit()
}
