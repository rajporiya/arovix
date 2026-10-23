import nodemailer from 'nodemailer'
import { env } from '../../config/env.js'
import { EmailProviderError, type CareerEmailData, type ContactEmailData, type SubscriberEmailData } from './email.types.js'
import { renderEmail, type EmailTemplate } from './email.template.js'

const REQUEST_TIMEOUT_MS = 8000

type MailContent = { subject: string; text: string; html: string; replyTo?: string }
export type SendEmailResult = { messageId: string; accepted: string[] }

function configured(): boolean {
  return Boolean(env.SMTP_USER && env.SMTP_PASSWORD)
}

export function emailConfigured(): boolean {
  return configured()
}

/** Admin notifications fall back to the SMTP mailbox, so a single account is enough to get started. */
export function adminRecipient(): string | undefined {
  return env.ADMIN_NOTIFICATION_EMAIL ?? env.SMTP_USER
}

function fromName(): string {
  const name = (env.MAIL_FROM_NAME || 'Arovix').replace(/["\r\n]/g, '').trim().slice(0, 80)
  return name || 'Arovix'
}

function createTransport() {
  if (!configured()) throw new EmailProviderError('Email provider is not configured')
  const auth = { user: env.SMTP_USER, pass: env.SMTP_PASSWORD }
  const timeouts = {
    connectionTimeout: REQUEST_TIMEOUT_MS,
    greetingTimeout: REQUEST_TIMEOUT_MS,
    socketTimeout: REQUEST_TIMEOUT_MS,
  }
  if (env.SMTP_HOST) {
    const port = env.SMTP_PORT ?? 587
    return nodemailer.createTransport({
      host: env.SMTP_HOST,
      port,
      secure: env.SMTP_SECURE ?? port === 465,
      requireTLS: port === 587,
      auth,
      ...timeouts,
    })
  }
  return nodemailer.createTransport({
    service: env.SMTP_SERVICE,
    auth,
    ...timeouts,
  })
}

function providerCodeOf(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) return undefined
  return String((error as { code?: unknown }).code).slice(0, 32)
}

function responseCodeOf(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null || !('responseCode' in error)) return undefined
  const code = (error as { responseCode?: unknown }).responseCode
  return typeof code === 'number' ? code : undefined
}

function normalizeError(error: unknown): EmailProviderError {
  if (error instanceof EmailProviderError) return error
  const providerCode = providerCodeOf(error)
  const responseCode = responseCodeOf(error)
  if (providerCode === 'ETIMEDOUT' || providerCode === 'ESOCKET') {
    return new EmailProviderError('Email provider request timed out', providerCode, responseCode)
  }
  if (responseCode === 535 || providerCode === 'EAUTH') {
    return new EmailProviderError('Email provider rejected the credentials', providerCode, responseCode)
  }
  return new EmailProviderError('Email provider request failed', providerCode, responseCode)
}

/** Opens a real connection to the SMTP server so misconfiguration is caught before a user submits a form. */
export async function verifyEmailConnection(): Promise<void> {
  const transport = createTransport()
  try {
    await transport.verify()
  } catch (error) {
    throw normalizeError(error)
  } finally {
    transport.close()
  }
}

export async function sendEmail(to: string, content: MailContent): Promise<SendEmailResult> {
  const transport = createTransport()
  try {
    const info = await transport.sendMail({
      from: `"${fromName()}" <${env.SMTP_USER}>`,
      to,
      replyTo: content.replyTo ?? env.MAIL_REPLY_TO ?? undefined,
      subject: content.subject,
      text: content.text,
      html: content.html,
      headers: { 'X-Auto-Response-Suppress': 'OOF, AutoReply' },
    })
    const accepted = (info.accepted ?? []).map(String)
    if (accepted.length === 0) {
      throw new EmailProviderError('Email provider rejected every recipient', 'EENVELOPE')
    }
    return { messageId: info.messageId ?? '', accepted }
  } catch (error) {
    throw normalizeError(error)
  }
}

function createMomentFormatter(timeZone: string): Intl.DateTimeFormat {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }
  try {
    return new Intl.DateTimeFormat('en-GB', { ...options, timeZone })
  } catch {
    return new Intl.DateTimeFormat('en-GB', { ...options, timeZone: 'UTC' })
  }
}

const momentFormatter = createMomentFormatter(env.MAIL_TIMEZONE)

function formatMoment(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : momentFormatter.format(date)
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name.trim()
}

function deliver(to: string, template: EmailTemplate, replyTo?: string): Promise<SendEmailResult> {
  return sendEmail(to, { ...renderEmail(template), replyTo })
}

export async function notifyContact(data: ContactEmailData): Promise<void> {
  const to = adminRecipient()
  if (!to) throw new EmailProviderError('Administrator notification email is not configured')
  const name = firstName(data.name)
  const received = formatMoment(data.submittedAt)
  const mailto = `mailto:${data.email}?subject=${encodeURIComponent(`Re: ${data.subject}`)}`
  await deliver(
    to,
    {
      subject: `New contact inquiry: ${data.subject}`,
      preheader: `${data.name} (${data.email}) sent a new inquiry about ${data.subject}.`,
      eyebrow: 'New inquiry',
      badge: 'Contact form',
      title: `New message from ${data.name}`,
      intro: `A new inquiry just arrived through the Arovix website. Reply directly to this email to answer ${name} straight away.`,
      details: [
        { label: 'Name', value: data.name },
        { label: 'Email', value: data.email, href: `mailto:${data.email}` },
        { label: 'Subject', value: data.subject },
        { label: 'Received', value: received },
        ...(data.reference ? [{ label: 'Reference', value: data.reference }] : []),
      ],
      message: { label: 'Their message', body: data.message },
      cta: { label: `Reply to ${name}`, href: mailto },
      note: 'Hit reply to answer this inquiry. Your response goes straight to the sender, not to a no-reply address.',
      footerNote: 'Automatic notification from the Arovix website contact form.',
    },
    data.email,
  )
}

export async function confirmContact(data: ContactEmailData): Promise<void> {
  const name = firstName(data.name)
  const received = formatMoment(data.submittedAt)
  await deliver(
    data.email,
    {
      subject: `We received your message: ${data.subject}`,
      preheader: `Thanks ${name} — your message reached the Arovix team.`,
      eyebrow: 'Message received',
      badge: 'Thank you',
      title: `Thanks, ${name} — we've got it.`,
      intro: `Your message reached our team and a real person will read it. Expect a considered reply within one business day.`,
      details: [
        { label: 'Subject', value: data.subject },
        { label: 'Received', value: received },
        ...(data.reference ? [{ label: 'Reference', value: data.reference }] : []),
      ],
      message: { label: 'What you sent us', body: data.message },
      steps: [
        { title: 'We read it properly', body: 'Your message goes to the team that handles this kind of work — not an autoresponder.' },
        { title: 'We come back with substance', body: 'You will hear from us within one business day with a clear next step or a useful question.' },
        { title: 'No pressure, no noise', body: 'We only follow up while there is something worth discussing.' },
      ],
      cta: { label: 'Explore Arovix', href: env.FRONTEND_URL },
      note: 'Need to add something? Just reply to this email and it will reach our team.',
      footerNote: 'You received this email because you contacted Arovix through our website.',
    },
    env.MAIL_REPLY_TO ?? adminRecipient(),
  )
}

/**
 * Newsletter welcome: confirms the subscription and sets the expectation that
 * fresh announcements will follow. No admin copy — the user is the recipient.
 */
export async function confirmSubscribe(data: SubscriberEmailData): Promise<void> {
  const subscribed = formatMoment(data.subscribedAt)
  await deliver(
    data.email,
    {
      subject: 'Thanks for subscribing — new things are coming',
      preheader: 'You are on the list. New announcements will land in this inbox first.',
      eyebrow: 'Subscription confirmed',
      badge: 'Newsletter',
      title: 'You are on the list.',
      intro: 'Thanks for subscribing to updates from the Arovix website. This inbox is now the first place our new announcements will arrive — new services, launches, and things worth knowing.',
      details: [
        { label: 'Subscribed address', value: data.email },
        { label: 'Subscribed', value: subscribed },
      ],
      steps: [
        { title: 'What you will get', body: 'Only real updates — launches, new services, and useful announcements. No filler and no daily noise.' },
        { title: 'What to expect', body: 'New announcements arrive here first, before they appear anywhere else.' },
        { title: 'Want out later?', body: 'Just reply to any update and ask to unsubscribe — one reply and we remove you.' },
      ],
      cta: { label: 'Explore Arovix', href: env.FRONTEND_URL },
      note: 'Nothing arrived after this? Then the next announcement has not been sent yet — your subscription is confirmed and waiting.',
      footerNote: 'You received this email because you subscribed to updates on our website.',
    },
    adminRecipient(),
  )
}

export async function notifyCareer(data: CareerEmailData): Promise<void> {
  const to = adminRecipient()
  if (!to) throw new EmailProviderError('Administrator notification email is not configured')
  const name = firstName(data.applicantName)
  const received = formatMoment(data.submittedAt)
  await deliver(
    to,
    {
      subject: `New application for ${data.jobTitle}`,
      preheader: `${data.applicantName} applied for ${data.jobTitle}.`,
      eyebrow: 'New application',
      badge: 'Careers',
      title: `${data.applicantName} applied for ${data.jobTitle}`,
      intro: `A new career application just arrived. Review the details below and reply directly to ${name} to start the conversation.`,
      details: [
        { label: 'Applicant', value: data.applicantName },
        { label: 'Email', value: data.applicantEmail, href: `mailto:${data.applicantEmail}` },
        { label: 'Position', value: data.jobTitle },
        { label: 'Application ID', value: data.applicationId },
        { label: 'Received', value: received },
      ],
      cta: { label: `Reply to ${name}`, href: `mailto:${data.applicantEmail}?subject=${encodeURIComponent(`Your application for ${data.jobTitle}`)}` },
      note: 'Applications are stored in the Arovix admin dashboard as well as delivered here.',
      footerNote: 'Automatic notification from the Arovix website careers page.',
    },
    data.applicantEmail,
  )
}

export async function confirmCareer(data: CareerEmailData): Promise<void> {
  const name = firstName(data.applicantName)
  const received = formatMoment(data.submittedAt)
  await deliver(
    data.applicantEmail,
    {
      subject: `We received your application for ${data.jobTitle}`,
      preheader: `Thanks ${name} — your application for ${data.jobTitle} is in.`,
      eyebrow: 'Application received',
      badge: 'Careers',
      title: `Thanks, ${name}. Your application is in.`,
      intro: `We have your application for ${data.jobTitle}. Our team reviews every submission carefully, and we will be in touch if there is a strong fit.`,
      details: [
        { label: 'Position', value: data.jobTitle },
        { label: 'Application ID', value: data.applicationId },
        { label: 'Received', value: received },
      ],
      steps: [
        { title: 'Review', body: 'We read your application alongside the role requirements.' },
        { title: 'Response', body: 'If your experience matches, we will reach out to arrange a conversation.' },
        { title: 'Keep exploring', body: 'You are welcome to apply for other roles that fit your skills.' },
      ],
      cta: { label: 'See open roles', href: `${env.FRONTEND_URL}/careers` },
      note: 'If your details change, reply to this email and let us know.',
      footerNote: 'You received this email because you applied through the Arovix careers page.',
    },
    env.MAIL_REPLY_TO ?? adminRecipient(),
  )
}

export { REQUEST_TIMEOUT_MS }
