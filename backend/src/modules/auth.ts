import { Router } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { Admin } from '../models/content.model.js'
import { env } from '../config/env.js'
import { authenticate } from '../middleware/authenticate.js'
import { authRateLimit } from '../middleware/rate-limit.js'
import { validate } from '../middleware/validate.js'
import { asyncHandler } from '../utils/async-handler.js'
import { AppError } from '../utils/app-error.js'
import { clearAuthCookies, setAuthCookies, refreshCookie } from '../utils/cookies.js'
import { sendSuccess } from '../utils/api-response.js'

const credentials = z.object({ body: z.object({ email: z.string().email().max(254), password: z.string().min(8).max(128) }), query: z.object({}), params: z.object({}) })
const emptyRequest = z.object({ body: z.object({}), query: z.object({}), params: z.object({}) })
const hash = (value: string) => crypto.createHash('sha256').update(value).digest('hex')
const tokens = (id: string, email: string, role: string) => ({
  access: jwt.sign({ email, role }, env.JWT_ACCESS_SECRET, { subject: id, expiresIn: env.ACCESS_TOKEN_TTL as jwt.SignOptions['expiresIn'], issuer: 'arovix-api', audience: 'arovix-admin' }),
  refresh: jwt.sign({}, env.JWT_REFRESH_SECRET, { subject: id, expiresIn: env.REFRESH_TOKEN_TTL as jwt.SignOptions['expiresIn'], issuer: 'arovix-api', audience: 'arovix-refresh' }),
})

export const authRouter = Router()
authRouter.post('/login', authRateLimit, validate(credentials), asyncHandler(async (request, response) => {
  const { email, password } = request.body as { email: string; password: string }
  const admin = await Admin.findOne({ email }).select('+passwordHash')
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) throw new AppError(401, 'Invalid email or password')
  const pair = tokens(admin.id, admin.email, admin.role)
  await Admin.updateOne({ _id: admin._id }, { refreshTokenHash: hash(pair.refresh) })
  setAuthCookies(response, pair.access, pair.refresh)
  sendSuccess(response, 200, 'Login successful', { admin: { id: admin.id, email: admin.email, role: admin.role } })
}))
authRouter.post('/refresh', authRateLimit, validate(emptyRequest), asyncHandler(async (request, response) => {
  const token = request.cookies?.[refreshCookie]
  if (!token) throw new AppError(401, 'Refresh authentication required')
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET, { algorithms: ['HS256'], issuer: 'arovix-api', audience: 'arovix-refresh' })
    if (typeof payload === 'string' || !payload.sub) throw new Error('Invalid token')
    const admin = await Admin.findById(payload.sub).select('+refreshTokenHash')
    if (!admin?.refreshTokenHash || admin.refreshTokenHash !== hash(token)) throw new Error('Revoked token')
    const pair = tokens(admin.id, admin.email, admin.role)
    await Admin.updateOne({ _id: admin._id }, { refreshTokenHash: hash(pair.refresh) })
    setAuthCookies(response, pair.access, pair.refresh)
    sendSuccess(response, 200, 'Token refreshed', {})
  } catch { throw new AppError(401, 'Invalid or expired refresh token') }
}))
authRouter.post('/logout', validate(emptyRequest), asyncHandler(async (request, response) => {
  const token = request.cookies?.[refreshCookie]
  if (token) await Admin.updateOne({ refreshTokenHash: hash(token) }, { $unset: { refreshTokenHash: 1 } })
  clearAuthCookies(response)
  sendSuccess(response, 200, 'Logout successful', {})
}))
authRouter.get('/me', authenticate, asyncHandler(async (request, response) => {
  sendSuccess(response, 200, 'Authenticated admin', { admin: request.user })
}))
