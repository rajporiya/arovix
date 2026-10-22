import { Schema, model, type InferSchemaType } from 'mongoose'

const contentSchema = new Schema({
  kind: { type: String, enum: ['service', 'employee', 'project', 'career', 'about'], required: true, index: true },
  title: { type: String, trim: true, required: true, maxlength: 160 },
  slug: { type: String, trim: true, required: true },
  summary: { type: String, trim: true, maxlength: 1000 },
  description: { type: String, trim: true, maxlength: 10000 },
  imageUrl: { type: String, trim: true, maxlength: 1000 },
  category: { type: String, trim: true, maxlength: 100 },
  location: { type: String, trim: true, maxlength: 160 },
  skills: { type: [String], default: [] },
  published: { type: Boolean, default: false, index: true },
  archived: { type: Boolean, default: false, index: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true })
contentSchema.index({ kind: 1, slug: 1 }, { unique: true })
contentSchema.index({ kind: 1, published: 1, archived: 1, createdAt: -1 })
export type ContentDocument = InferSchemaType<typeof contentSchema>
export const Content = model('Content', contentSchema)

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
  refreshTokenHash: { type: String, select: false },
}, { timestamps: true })
export const Admin = model('Admin', adminSchema)

const contactSchema = new Schema({
  name: { type: String, trim: true, required: true, maxlength: 120 },
  email: { type: String, trim: true, lowercase: true, required: true, maxlength: 254 },
  subject: { type: String, trim: true, required: true, maxlength: 200 },
  message: { type: String, trim: true, required: true, maxlength: 5000 },
  status: { type: String, enum: ['new', 'in_progress', 'resolved'], default: 'new', index: true },
}, { timestamps: true })
contactSchema.index({ createdAt: -1 })
export const Contact = model('Contact', contactSchema)

const applicationSchema = new Schema({
  careerId: { type: Schema.Types.ObjectId, ref: 'Content', required: true, index: true },
  name: { type: String, trim: true, required: true, maxlength: 120 },
  email: { type: String, trim: true, lowercase: true, required: true, maxlength: 254 },
  phone: { type: String, trim: true, maxlength: 40 },
  resumeUrl: { type: String, trim: true, maxlength: 1000 },
  coverLetter: { type: String, trim: true, maxlength: 10000 },
  status: { type: String, enum: ['pending', 'reviewing', 'accepted', 'rejected'], default: 'pending', index: true },
}, { timestamps: true })
applicationSchema.index({ createdAt: -1 })
export const Application = model('Application', applicationSchema)
