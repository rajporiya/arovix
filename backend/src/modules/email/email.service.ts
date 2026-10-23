import nodemailer from 'nodemailer'
import { env } from '../../config/env.js'
import { EmailProviderError, type CareerEmailData, type ContactEmailData } from './email.types.js'

const REQUEST_TIMEOUT_MS = 8000

type MailContent = { subject: string; text: string; html: string }
type MailRow = [label: string, value: string]

function configured(): boolean {
  return Boolean(env.SMTP_USER && env.SMTP_PASSWORD)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r?\n/g, '<br>')
}

function rowsText(rows: MailRow[]): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join('\n')
}

function rowsHtml(rows: MailRow[]): string {
  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:9px 16px 9px 0;color:#6b7280;vertical-align:top;white-space:nowrap;font-size:13px">${escapeHtml(label)}</td><td style="padding:9px 0;color:#111827;vertical-align:top;font-size:13px">${escapeHtml(value)}</td></tr>`,
    )
    .join('')
  return `<table role="presentation" style="border-collapse:collapse;width:100%;line-height:1.5">${cells}</table>`
}

function layout(title: string, rows: MailRow[], footer: string): MailContent {
  const logoUrl = `${env.FRONTEND_URL}/favicon.svg`
  const text = `${title}\n\n${rowsText(rows)}\n\n${footer}`
  return {
    subject: '',
    text,
    html: `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head><body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#17203a"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(title)} — Arovix</div><table role="presentation" style="width:100%;border-collapse:collapse;background:#f4f6fb"><tr><td style="padding:32px 16px"><table role="presentation" style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;background:#ffffff;border:1px solid #e5e8f0;border-radius:16px;overflow:hidden"><tr><td style="padding:26px 32px;background:#151a2d"><table role="presentation" style="border-collapse:collapse"><tr><td style="width:40px;height:40px;background:#635bff;border-radius:10px;text-align:center;vertical-align:middle"><img src="${escapeHtml(logoUrl)}" width="40" height="40" alt="Arovix" style="display:block;border:0;border-radius:10px"></td><td style="padding-left:12px;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-.4px">Arovix</td></tr></table></td></tr><tr><td style="padding:36px 32px 12px"><h1 style="margin:0;color:#17203a;font-size:26px;line-height:1.2;letter-spacing:-.5px">${escapeHtml(title)}</h1></td></tr><tr><td style="padding:8px 32px 24px;color:#59627a;font-size:15px;line-height:1.7">Thank you for reaching out to us. We have received your message and our team will review it carefully.</td></tr><tr><td style="padding:0 32px 24px"><div style="padding:18px 20px;background:#f7f8fc;border:1px solid #e8ebf3;border-radius:10px">${rowsHtml(rows)}</div></td></tr><tr><td style="padding:4px 32px 32px;color:#59627a;font-size:14px;line-height:1.7">${escapeHtml(footer)}</td></tr><tr><td style="padding:20px 32px;background:#f7f8fc;border-top:1px solid #e8ebf3;color:#8a92a6;font-size:12px;line-height:1.6">Arovix · Digital products, thoughtfully built.<br><a href="${escapeHtml(env.FRONTEND_URL)}" style="color:#635bff;text-decoration:none">Visit our website</a></td></tr></table></td></tr></table></body></html>`,
  }
}

async function sendEmail(to: string, content: MailContent): Promise<void> {
  if (!configured()) throw new EmailProviderError('Email provider is not configured')
  try {
    const transport = nodemailer.createTransport({
      service: env.SMTP_SERVICE ?? 'gmail',
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
      connectionTimeout: REQUEST_TIMEOUT_MS,
      greetingTimeout: REQUEST_TIMEOUT_MS,
      socketTimeout: REQUEST_TIMEOUT_MS,
    })
    await transport.sendMail({
      from: `"Arovix" <${env.SMTP_USER}>`,
      to,
      subject: content.subject,
      text: content.text,
      html: content.html,
    })
  } catch (error) {
    if (error instanceof EmailProviderError) throw error
    const providerCode = typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code).slice(0, 32)
      : undefined
    const responseCode = typeof error === 'object' && error !== null && 'responseCode' in error && typeof (error as { responseCode?: unknown }).responseCode === 'number'
      ? (error as { responseCode: number }).responseCode
      : undefined
    const code = providerCode ?? ''
    if (code === 'ETIMEDOUT' || code === 'ESOCKET') throw new EmailProviderError('Email provider request timed out', providerCode, responseCode)
    throw new EmailProviderError('Email provider request failed', providerCode, responseCode)
  }
}

export async function notifyContact(data: ContactEmailData): Promise<void> {
  if (!env.ADMIN_NOTIFICATION_EMAIL) throw new EmailProviderError('Administrator notification email is not configured')
  const content = layout(
    'New contact inquiry',
    [
      ['Name', data.name],
      ['Email', data.email],
      ['Subject', data.subject],
      ['Message', data.message],
      ['Submitted at', data.submittedAt],
    ],
    'Sent from the Arovix website contact form.',
  )
  await sendEmail(env.ADMIN_NOTIFICATION_EMAIL, { ...content, subject: `New contact inquiry: ${data.subject}` })
}

export async function confirmContact(data: ContactEmailData): Promise<void> {
  const content = layout(
    `Thanks for reaching out, ${data.name}`,
    [
      ['Subject', data.subject],
      ['Message', data.message],
      ['Submitted at', data.submittedAt],
    ],
    'We will get back to you soon with a thoughtful next step. — The Arovix team',
  )
  await sendEmail(data.email, { ...content, subject: `We received your message: ${data.subject}` })
}

export async function notifyCareer(data: CareerEmailData): Promise<void> {
  if (!env.ADMIN_NOTIFICATION_EMAIL) throw new EmailProviderError('Administrator notification email is not configured')
  const content = layout(
    'New career application',
    [
      ['Applicant', data.applicantName],
      ['Email', data.applicantEmail],
      ['Position', data.jobTitle],
      ['Application ID', data.applicationId],
      ['Submitted at', data.submittedAt],
    ],
    'Sent from the Arovix website careers page.',
  )
  await sendEmail(env.ADMIN_NOTIFICATION_EMAIL, { ...content, subject: `New application for ${data.jobTitle}` })
}

export async function confirmCareer(data: CareerEmailData): Promise<void> {
  const content = layout(
    `Application received, ${data.applicantName}`,
    [
      ['Position', data.jobTitle],
      ['Application ID', data.applicationId],
      ['Submitted at', data.submittedAt],
    ],
    'Thank you for your interest in Arovix. We will review your application soon.',
  )
  await sendEmail(data.applicantEmail, { ...content, subject: `We received your application for ${data.jobTitle}` })
}

export { REQUEST_TIMEOUT_MS, sendEmail }
