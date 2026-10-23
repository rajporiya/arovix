import type { RequestHandler } from 'express'
import { z } from 'zod'
import { AppError } from '../utils/app-error.js'

export function validate(schema: z.ZodType): RequestHandler {
  return (request, _response, next) => {
    const result = schema.safeParse({ body: request.body ?? {}, query: request.query ?? {}, params: request.params ?? {} })
    if (!result.success) return next(new AppError(400, 'Invalid request data', result.error.issues))
    const data = result.data as { body: unknown; query: unknown; params: unknown }
    request.body = data.body
    Object.defineProperty(request, 'query', { configurable: true, enumerable: true, value: data.query })
    request.params = data.params as typeof request.params
    return next()
  }
}
