import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { connectDatabase, disconnectDatabase } from '../src/config/database.js'
import { Admin } from '../src/models/content.model.js'

const prompt = createInterface({ input, output })
try {
  const email = (process.env.ADMIN_EMAIL ?? await prompt.question('Admin email: ')).trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD ?? await prompt.question('Admin password: ')
  if (!email || password.length < 8) throw new Error('A valid email and an 8+ character password are required')
  await connectDatabase()
  await Admin.create({ email, passwordHash: await bcrypt.hash(password, 12), role: 'admin' })
  console.log('Administrator created')
} finally {
  prompt.close()
  await disconnectDatabase().catch(() => undefined)
  await mongoose.disconnect().catch(() => undefined)
}
