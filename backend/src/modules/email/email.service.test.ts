import { afterEach, describe, expect, it, vi } from 'vitest'
import { env } from '../../config/env.js'
import { sendTemplate } from './email.service.js'

const originalConfig = {
  service: env.EMAILJS_SERVICE_ID,
  publicKey: env.EMAILJS_API_KEY,
  privateKey: env.EMAILJS_PRIVATE_KEY,
  adminEmail: env.ADMIN_NOTIFICATION_EMAIL,
}

afterEach(() => {
  vi.unstubAllGlobals()
  env.EMAILJS_SERVICE_ID = originalConfig.service
  env.EMAILJS_API_KEY = originalConfig.publicKey
  env.EMAILJS_PRIVATE_KEY = originalConfig.privateKey
  env.ADMIN_NOTIFICATION_EMAIL = originalConfig.adminEmail
})

function configureEmail() {
  env.EMAILJS_SERVICE_ID = 'service_test'
  env.EMAILJS_API_KEY = 'public_test'
  env.EMAILJS_PRIVATE_KEY = 'private_test'
  env.ADMIN_NOTIFICATION_EMAIL = 'admin@example.com'
}

describe('EmailJS service', () => {
  it('sends the documented REST payload without exposing credentials to callers', async () => {
    configureEmail()
    const fetchMock = vi.fn().mockResolvedValue(new Response('OK', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await sendTemplate('template_contact', { name: 'Ada', message: 'Hello' })

    expect(fetchMock).toHaveBeenCalledOnce()
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit
    expect(JSON.parse(String(request.body))).toMatchObject({
      service_id: 'service_test',
      template_id: 'template_contact',
      user_id: 'public_test',
      accessToken: 'private_test',
      template_params: { name: 'Ada', message: 'Hello' },
    })
  })

  it('rejects provider responses without returning provider details', async () => {
    configureEmail()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('private provider detail', { status: 403 })))

    await expect(sendTemplate('template_contact', { name: 'Ada' })).rejects.toThrow('Email provider rejected the request (403)')
  })

  it('normalizes network timeouts', async () => {
    configureEmail()
    const abortError = new DOMException('The operation was aborted', 'AbortError')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abortError))

    await expect(sendTemplate('template_contact', { name: 'Ada' })).rejects.toThrow('Email provider request timed out')
  })

  it('fails closed when required provider configuration is missing', async () => {
    env.EMAILJS_SERVICE_ID = undefined
    env.EMAILJS_API_KEY = undefined
    env.EMAILJS_PRIVATE_KEY = undefined
    env.ADMIN_NOTIFICATION_EMAIL = undefined
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(sendTemplate('template_contact', { name: 'Ada' })).rejects.toThrow('Email provider is not configured')
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
