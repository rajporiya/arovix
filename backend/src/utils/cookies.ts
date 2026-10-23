import type { Response } from 'express'
import { env } from '../config/env.js'

export const accessCookie = 'brainybeam_access'
export const refreshCookie = 'brainybeam_refresh'
const options = { httpOnly: true, secure: env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/' }

export function setAuthCookies(response: Response, accessToken: string, refreshToken: string): void {
  response.cookie(accessCookie, accessToken, { ...options, maxAge: 15 * 60 * 1000 })
  response.cookie(refreshCookie, refreshToken, { ...options, maxAge: 7 * 24 * 60 * 60 * 1000 })
}

export function clearAuthCookies(response: Response): void {
  response.clearCookie(accessCookie, options)
  response.clearCookie(refreshCookie, options)
}
