import { redis } from '../config/redis.js'
import { logger } from '../config/logger.js'

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const value = await redis.get(key)
    return value ? (JSON.parse(value) as T) : null
  } catch (error) {
    logger.warn({ err: error, key }, 'Cache read failed')
    return null
  }
}

export async function setCache<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  try {
    await redis.set(key, JSON.stringify(value), { EX: ttlSeconds })
  } catch (error) {
    logger.warn({ err: error, key }, 'Cache write failed')
  }
}

export async function deleteCache(...keys: string[]): Promise<void> {
  try {
    if (keys.length > 0) await redis.del(keys)
  } catch (error) {
    logger.warn({ err: error, keys }, 'Cache invalidation failed')
  }
}
