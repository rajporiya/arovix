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
        `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(label)}:</td><td style="padding:6px 0;color:#111827">${escapeHtml(value)}</td></tr>`,
    )
    .join('')
  return `<table style="border-collapse:collapse;font-size:14px;line-height:1.5">${cells}</table>`
}

function layout(title: string, rows: MailRow[], footer: string): MailContent {
  return {
    subject: '',
    text: `${title}\n\n${rowsText(rows)}\n\n${footer}`,
    html: `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif"><div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;padding:24px"><h2 style="margin:0 0 16px;font-size:18px;color:#18181b">${escapeHtml(title)}</h2>${rowsHtml(rows)}<p style="margin:20px 0 0;font-size:12px;color:#71717a">${escapeHtml(footer)}</p></div></body></html>`,
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
      from: `"BrainyBeam" <${env.SMTP_USER}>`,
      to,
      subject: content.subject,
      text: content.text,
      html: content.html,
    })
  } catch (error) {
    if (error instanceof EmailProviderError) throw error
    const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code?: unknown }).code) : ''
    if (code === 'ETIMEDOUT' || code === 'ESOCKET') throw new EmailProviderError('Email provider request timed out')
    throw new EmailProviderError('Email provider request failed')
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
    'Sent from the BrainyBeam website contact form.',
  )
  await sendEmail(env.ADMIN_NOTIFICATION_EMAIL, { ...content, subject: `New contact inquiry: ${data.subject}` })
}

export async function confirmContact(data: ContactEmailData): Promise<void> {
  const content = layout(
    `Thank you, ${data.name}`,
    [
      ['Subject', data.subject],
      ['Message', data.message],
      ['Submitted at', data.submittedAt],
    ],
    'We will get back to you shortly. — The BrainyBeam team',
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
    'Sent from the BrainyBeam website careers page.',
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
    'Thank you for your interest in BrainyBeam. We will review your application soon.',
  )
  await sendEmail(data.applicantEmail, { ...content, subject: `We received your application for ${data.jobTitle}` })
}

export { REQUEST_TIMEOUT_MS, sendEmail }
