import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../utils/app-error.js'
import type { AuthUser } from '../types/auth.types.js'
import { accessCookie } from '../utils/cookies.js'

export const authenticate: RequestHandler = (request, _response, next) => {
  const header = request.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : request.cookies?.[accessCookie]
  if (!token) return next(new AppError(401, 'Authentication required'))
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET, { algorithms: ['HS256'], issuer: 'arovix-api', audience: 'arovix-admin' })
    if (typeof payload === 'string' || !payload.sub || typeof payload.email !== 'string' || typeof payload.role !== 'string') {
      return next(new AppError(401, 'Invalid authentication token'))
    }
    request.user = { id: payload.sub, email: payload.email, role: payload.role as AuthUser['role'] }
    return next()
  } catch {
    return next(new AppError(401, 'Invalid or expired authentication token'))
  }
}
