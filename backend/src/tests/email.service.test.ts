import { afterEach, describe, expect, it, vi } from 'vitest'
import { env } from '../config/env.js'
import { confirmContact, notifyContact, sendEmail } from '../modules/email/email.service.js'

const { sendMailMock, createTransportMock } = vi.hoisted(() => ({
  sendMailMock: vi.fn(),
  createTransportMock: vi.fn(),
}))

vi.mock('nodemailer', () => ({
  default: {
    createTransport: createTransportMock,
  },
}))

const originalConfig = {
  service: env.SMTP_SERVICE,
  user: env.SMTP_USER,
  password: env.SMTP_PASSWORD,
  adminEmail: env.ADMIN_NOTIFICATION_EMAIL,
}

afterEach(() => {
  vi.clearAllMocks()
  env.SMTP_SERVICE = originalConfig.service
  env.SMTP_USER = originalConfig.user
  env.SMTP_PASSWORD = originalConfig.password
  env.ADMIN_NOTIFICATION_EMAIL = originalConfig.adminEmail
})

function configureSmtp() {
  createTransportMock.mockReturnValue({ sendMail: sendMailMock })
  sendMailMock.mockResolvedValue({ accepted: ['admin@example.com'] })
  env.SMTP_SERVICE = 'gmail'
  env.SMTP_USER = 'sender@example.com'
  env.SMTP_PASSWORD = 'app-password'
  env.ADMIN_NOTIFICATION_EMAIL = 'admin@example.com'
}

describe('SMTP email service', () => {
  it('sends mail through the configured SMTP service without exposing credentials in the message', async () => {
    configureSmtp()

    await sendEmail('admin@example.com', { subject: 'Hello', text: 'Plain body', html: '<p>HTML body</p>' })

    expect(createTransportMock).toHaveBeenCalledOnce()
    expect(createTransportMock).toHaveBeenCalledWith(expect.objectContaining({ service: 'gmail' }))
    expect(sendMailMock).toHaveBeenCalledOnce()
    expect(sendMailMock.mock.calls[0]?.[0]).toMatchObject({
      from: '"Arovix" <sender@example.com>',
      to: 'admin@example.com',
      subject: 'Hello',
      text: 'Plain body',
      html: '<p>HTML body</p>',
    })
    expect(JSON.stringify(sendMailMock.mock.calls[0]?.[0])).not.toContain('app-password')
  })

  it('sends contact notifications to the administrator address', async () => {
    configureSmtp()

    await notifyContact({ name: 'Ada', email: 'ada@example.com', subject: 'Hello', message: 'Hi there', submittedAt: '2026-01-01T00:00:00.000Z' })

    expect(sendMailMock).toHaveBeenCalledOnce()
    expect(sendMailMock.mock.calls[0]?.[0]).toMatchObject({ to: 'admin@example.com', subject: 'New contact inquiry: Hello' })
  })

  it('sends confirmations to the submitter', async () => {
    configureSmtp()

    await confirmContact({ name: 'Ada', email: 'ada@example.com', subject: 'Hello', message: 'Hi there', submittedAt: '2026-01-01T00:00:00.000Z' })

    expect(sendMailMock).toHaveBeenCalledOnce()
    expect(sendMailMock.mock.calls[0]?.[0]).toMatchObject({ to: 'ada@example.com' })
  })

  it('rejects provider errors without returning provider details', async () => {
    configureSmtp()
    sendMailMock.mockRejectedValue(new Error('Authentication failed: secret provider detail'))

    await expect(sendEmail('admin@example.com', { subject: 'Hello', text: 'body', html: '<p>body</p>' })).rejects.toThrow('Email provider request failed')
  })

  it('normalizes SMTP timeouts', async () => {
    configureSmtp()
    sendMailMock.mockRejectedValue(Object.assign(new Error('Greeting never received'), { code: 'ETIMEDOUT' }))

    await expect(sendEmail('admin@example.com', { subject: 'Hello', text: 'body', html: '<p>body</p>' })).rejects.toThrow('Email provider request timed out')
  })

  it('fails closed when required provider configuration is missing', async () => {
    createTransportMock.mockReturnValue({ sendMail: sendMailMock })
    env.SMTP_USER = undefined
    env.SMTP_PASSWORD = undefined

    await expect(sendEmail('admin@example.com', { subject: 'Hello', text: 'body', html: '<p>body</p>' })).rejects.toThrow('Email provider is not configured')
    expect(sendMailMock).not.toHaveBeenCalled()
  })
})
