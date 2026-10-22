import type { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { AppError } from '../utils/app-error.js'
import { logger } from '../config/logger.js'

export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  if (error instanceof AppError) return response.status(error.statusCode).json({ success: false, message: error.message, errors: error.errors })
  if (error instanceof mongoose.Error.ValidationError) return response.status(400).json({ success: false, message: 'Validation failed', errors: Object.values(error.errors).map((item) => item.message) })
  if (error instanceof mongoose.Error.CastError) return response.status(400).json({ success: false, message: 'Invalid resource identifier' })
  if ((error as { code?: number }).code === 11000) return response.status(409).json({ success: false, message: 'A record with those unique fields already exists' })
  logger.error({ err: error, method: request.method, path: request.path }, 'Unhandled request error')
  return response.status(500).json({ success: false, message: 'Internal server error' })
}
