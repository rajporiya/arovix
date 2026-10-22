import { env } from '../../config/env.js'
import { EmailProviderError, type CareerEmailData, type ContactEmailData } from './email.types.js'

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'
const REQUEST_TIMEOUT_MS = 8000

type TemplateParams = Record<string, string>

function configured(): boolean {
  return Boolean(
    env.EMAILJS_SERVICE_ID &&
    env.EMAILJS_API_KEY &&
    env.EMAILJS_PRIVATE_KEY &&
    env.ADMIN_NOTIFICATION_EMAIL,
  )
}

async function sendTemplate(templateId: string, templateParams: TemplateParams): Promise<void> {
  if (!configured()) throw new EmailProviderError('Email provider is not configured')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: env.EMAILJS_SERVICE_ID,
        template_id: templateId,
        user_id: env.EMAILJS_API_KEY,
        accessToken: env.EMAILJS_PRIVATE_KEY,
        template_params: templateParams,
      }),
      signal: controller.signal,
    })
    if (!response.ok) throw new EmailProviderError(`Email provider rejected the request (${response.status})`)
  } catch (error) {
    if (error instanceof EmailProviderError) throw error
    if (error instanceof Error && error.name === 'AbortError') throw new EmailProviderError('Email provider request timed out')
    throw new EmailProviderError('Email provider request failed')
  } finally {
    clearTimeout(timeout)
  }
}

export async function notifyContact(data: ContactEmailData): Promise<void> {
  if (!env.EMAILJS_CONTACT_TEMPLATE_ID) throw new EmailProviderError('Contact email template is not configured')
  await sendTemplate(env.EMAILJS_CONTACT_TEMPLATE_ID, { ...data, adminEmail: env.ADMIN_NOTIFICATION_EMAIL ?? '' })
}

export async function confirmContact(data: ContactEmailData): Promise<void> {
  if (!env.EMAILJS_CONTACT_CONFIRMATION_TEMPLATE_ID) return
  await sendTemplate(env.EMAILJS_CONTACT_CONFIRMATION_TEMPLATE_ID, data)
}

export async function notifyCareer(data: CareerEmailData): Promise<void> {
  if (!env.EMAILJS_CAREER_TEMPLATE_ID) throw new EmailProviderError('Career email template is not configured')
  await sendTemplate(env.EMAILJS_CAREER_TEMPLATE_ID, { ...data, adminEmail: env.ADMIN_NOTIFICATION_EMAIL ?? '' })
}

export async function confirmCareer(data: CareerEmailData): Promise<void> {
  if (!env.EMAILJS_CAREER_CONFIRMATION_TEMPLATE_ID) return
  await sendTemplate(env.EMAILJS_CAREER_CONFIRMATION_TEMPLATE_ID, data)
}

export { EMAILJS_ENDPOINT, REQUEST_TIMEOUT_MS, sendTemplate }
