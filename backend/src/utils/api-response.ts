import type { Response } from 'express'
import type { ApiSuccess } from '../types/api.types.js'

export function sendSuccess<T>(response: Response, statusCode: number, message: string, data: T, meta?: Record<string, unknown>): void {
  const body: ApiSuccess<T> = meta ? { success: true, message, data, meta } : { success: true, message, data }
  response.status(statusCode).json(body)
}
