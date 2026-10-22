import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import pinoHttp from 'pino-http'
import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { router } from './routes/index.js'
import { authRouter } from './modules/auth.js'
import { errorHandler } from './middleware/error-handler.js'

export const app = express()
app.use(helmet())
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser(env.COOKIE_SECRET))
app.use(pinoHttp({ logger }))
app.get('/api/v1/health/live', (_request, response) => response.json({ success: true, message: 'Live', data: { status: 'ok' } }))
app.get('/api/v1/health/ready', (_request, response) => response.json({ success: true, message: 'Ready', data: { status: 'ok' } }))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1', router)
app.use((_request, response) => response.status(404).json({ success: false, message: 'Route not found' }))
app.use(errorHandler)
