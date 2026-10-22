import type { RequestHandler } from 'express'
import { AppError } from '../utils/app-error.js'
import type { AdminRole } from '../types/auth.types.js'

export const authorize = (...roles: AdminRole[]): RequestHandler => (request, _response, next) => {
  if (!request.user || !roles.includes(request.user.role)) return next(new AppError(403, 'Insufficient permissions'))
  next()
}
