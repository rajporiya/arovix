import { Router } from 'express'
import { z } from 'zod'
import { Content, Contact, Application } from '../models/content.model.js'
import { authenticate } from '../middleware/authenticate.js'
import { authorize } from '../middleware/authorize.js'
import { publicRateLimit } from '../middleware/rate-limit.js'
import { validate } from '../middleware/validate.js'
import { asyncHandler } from '../utils/async-handler.js'
import { sendSuccess } from '../utils/api-response.js'
import { AppError } from '../utils/app-error.js'
import { getCache, setCache, deleteCache } from '../utils/cache.js'

const kinds = ['service', 'employee', 'project', 'career', 'about'] as const
const kindSchema = z.enum(kinds)
const idSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid identifier')
const querySchema = z.object({ body: z.object({}), params: z.object({}), query: z.object({
  page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(100).optional(), status: z.string().optional(),
}) })
const contentBody = z.object({
  title: z.string().trim().min(1).max(160), slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/),
  summary: z.string().trim().max(1000).optional(), description: z.string().trim().max(10000).optional(),
  imageUrl: z.string().url().max(1000).optional(), category: z.string().trim().max(100).optional(),
  location: z.string().trim().max(160).optional(), skills: z.array(z.string().trim().max(80)).max(30).optional(),
  published: z.boolean().optional(), archived: z.boolean().optional(), metadata: z.record(z.string(), z.unknown()).optional(),
})
const contentValidation = z.object({ body: contentBody, params: z.object({ kind: kindSchema, id: idSchema.optional() }), query: z.object({}) })
const contactValidation = z.object({ body: z.object({
  name: z.string().trim().min(2).max(120), email: z.string().email().max(254), subject: z.string().trim().min(2).max(200), message: z.string().trim().min(10).max(5000),
}), params: z.object({}), query: z.object({}) })
const applicationValidation = z.object({ body: z.object({
  careerId: idSchema, name: z.string().trim().min(2).max(120), email: z.string().email().max(254),
  phone: z.string().trim().max(40).optional(), resumeUrl: z.string().url().max(1000).optional(), coverLetter: z.string().trim().max(10000).optional(),
}), params: z.object({}), query: z.object({}) })
const statusValidation = z.object({ body: z.object({ status: z.string().min(1).max(30) }), params: z.object({ id: idSchema }), query: z.object({}) })

const router = Router()

async function listContent(kind: typeof kinds[number], page: number, limit: number, search?: string, admin = false) {
  const filter: Record<string, unknown> = { kind, ...(admin ? {} : { published: true, archived: false }) }
  if (search) filter.$or = [{ title: { $regex: search, $options: 'i' } }, { summary: { $regex: search, $options: 'i' } }]
  const [items, total] = await Promise.all([
    Content.find(filter).sort({ createdAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Content.countDocuments(filter),
  ])
  return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }
}

for (const kind of kinds) {
  router.get(`/${kind === 'about' ? 'about' : `${kind}s`}`, publicRateLimit, validate(querySchema), asyncHandler(async (request, response) => {
    const { page, limit, search } = request.query as unknown as { page: number; limit: number; search?: string }
    const key = `public:${kind}:${page}:${limit}:${search ?? ''}`
    const cached = await getCache<unknown>(key)
    if (cached) return sendSuccess(response, 200, `${kind} retrieved`, cached)
    const result = await listContent(kind, page, limit, search)
    await setCache(key, result, 60)
    return sendSuccess(response, 200, `${kind} retrieved`, result.items, result.meta)
  }))
}

router.post('/contact', publicRateLimit, validate(contactValidation), asyncHandler(async (request, response) => {
  const record = await Contact.create(request.body)
  sendSuccess(response, 201, 'Contact inquiry submitted', { id: record.id })
}))
router.post('/applications', publicRateLimit, validate(applicationValidation), asyncHandler(async (request, response) => {
  const body = request.body as { careerId: string }
  const career = await Content.findOne({ _id: body.careerId, kind: 'career', published: true, archived: false }).select('_id')
  if (!career) throw new AppError(404, 'Job opening not found')
  const record = await Application.create(body)
  sendSuccess(response, 201, 'Application submitted', { id: record.id })
}))

const admin = Router()
admin.use(authenticate, authorize('admin', 'editor'))
for (const kind of kinds.filter((item) => item !== 'about')) {
  admin.get(`/${kind}s`, validate(querySchema), asyncHandler(async (request, response) => {
    const { page, limit, search } = request.query as unknown as { page: number; limit: number; search?: string }
    const result = await listContent(kind, page, limit, search, true)
    sendSuccess(response, 200, `${kind} records retrieved`, result.items, result.meta)
  }))
  admin.post(`/${kind}s`, validate(z.object({ body: contentBody, params: z.object({}), query: z.object({}) })), asyncHandler(async (request, response) => {
    const record = await Content.create({ ...request.body, kind })
    await deleteCache(`public:${kind}:1:20:`)
    sendSuccess(response, 201, `${kind} created`, record.toObject())
  }))
  admin.patch(`/${kind}s/:id`, validate(contentValidation), asyncHandler(async (request, response) => {
    const record = await Content.findOneAndUpdate({ _id: request.params.id, kind }, { $set: request.body }, { new: true, runValidators: true }).lean()
    if (!record) throw new AppError(404, `${kind} not found`)
    await deleteCache(`public:${kind}:1:20:`)
    sendSuccess(response, 200, `${kind} updated`, record)
  }))
  admin.delete(`/${kind}s/:id`, validate(z.object({ body: z.object({}), params: z.object({ id: idSchema }), query: z.object({}) })), asyncHandler(async (request, response) => {
    const record = await Content.findOneAndUpdate({ _id: request.params.id, kind }, { archived: true, published: false }, { new: true }).lean()
    if (!record) throw new AppError(404, `${kind} not found`)
    await deleteCache(`public:${kind}:1:20:`)
    sendSuccess(response, 200, `${kind} archived`, { id: record._id })
  }))
}
admin.get('/about', validate(querySchema), asyncHandler(async (_request, response) => {
  const record = await Content.findOne({ kind: 'about', archived: false }).sort({ createdAt: -1 }).lean()
  sendSuccess(response, 200, 'About retrieved', record)
}))
admin.put('/about', validate(z.object({ body: contentBody, params: z.object({}), query: z.object({}) })), asyncHandler(async (request, response) => {
  const record = await Content.findOneAndUpdate({ kind: 'about' }, { ...request.body, kind: 'about' }, { upsert: true, new: true, runValidators: true }).lean()
  await deleteCache('public:about:1:20:')
  sendSuccess(response, 200, 'About updated', record)
}))
admin.get('/contact', validate(querySchema), asyncHandler(async (request, response) => {
  const { page, limit } = request.query as unknown as { page: number; limit: number }
  const filter = request.query.status ? { status: request.query.status } : {}
  const [items, total] = await Promise.all([Contact.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Contact.countDocuments(filter)])
  sendSuccess(response, 200, 'Contact inquiries retrieved', items, { page, limit, total, totalPages: Math.ceil(total / limit) })
}))
admin.patch('/contact/:id/status', validate(statusValidation), asyncHandler(async (request, response) => {
  const record = await Contact.findByIdAndUpdate(request.params.id, { status: request.body.status }, { new: true, runValidators: true }).lean()
  if (!record) throw new AppError(404, 'Contact inquiry not found')
  sendSuccess(response, 200, 'Contact status updated', record)
}))
admin.get('/applications', validate(querySchema), asyncHandler(async (request, response) => {
  const { page, limit } = request.query as unknown as { page: number; limit: number }
  const [items, total] = await Promise.all([Application.find().select('-resumeUrl').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Application.countDocuments()])
  sendSuccess(response, 200, 'Applications retrieved', items, { page, limit, total, totalPages: Math.ceil(total / limit) })
}))
admin.patch('/applications/:id/status', validate(statusValidation), asyncHandler(async (request, response) => {
  const record = await Application.findByIdAndUpdate(request.params.id, { status: request.body.status }, { new: true, runValidators: true }).select('-resumeUrl').lean()
  if (!record) throw new AppError(404, 'Application not found')
  sendSuccess(response, 200, 'Application status updated', record)
}))
admin.get('/dashboard', asyncHandler(async (_request, response) => {
  const [employees, services, projects, careers, inquiries, applications] = await Promise.all([
    Content.countDocuments({ kind: 'employee', archived: false }), Content.countDocuments({ kind: 'service', published: true, archived: false }),
    Content.countDocuments({ kind: 'project', published: true, archived: false }), Content.countDocuments({ kind: 'career', published: true, archived: false }),
    Contact.countDocuments(), Application.countDocuments({ status: 'pending' }),
  ])
  sendSuccess(response, 200, 'Dashboard retrieved', { employees, publishedServices: services, publishedProjects: projects, activeJobs: careers, contactInquiries: inquiries, pendingApplications: applications })
}))

router.use('/admin', admin)
export { router }
