import type { ApiList, ContentItem } from '../types/content'

export const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:4000').replace(/\/$/, '')

export class ApiRequestError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

export async function fetchCollection(endpoint: string): Promise<ContentItem[]> {
  const response = await fetch(`${API_URL}/api/v1/${endpoint}`)
  if (!response.ok) throw new Error('Unable to load content')
  const result = await response.json() as ApiList<ContentItem>
  return result.data ?? []
}

export type EmailDelivery = 'sent' | 'failed'

export type ContactSubmission = {
  id?: string
  email?: { admin?: EmailDelivery; confirmation?: EmailDelivery }
}

export async function submitContact(payload: Record<string, string>): Promise<ContactSubmission> {
  let response: Response
  try {
    response = await fetch(`${API_URL}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ApiRequestError('The contact service could not be reached.')
  }
  if (!response.ok) {
    throw new ApiRequestError('The contact service could not save your inquiry. Please try again later.', response.status)
  }
  try {
    const result = await response.json() as { data?: ContactSubmission }
    return result.data ?? {}
  } catch {
    return {}
  }
}

export async function subscribeNewsletter(email: string): Promise<EmailDelivery> {
  let response: Response
  try {
    response = await fetch(`${API_URL}/api/v1/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
  } catch {
    throw new ApiRequestError('The subscription service could not be reached.')
  }
  if (!response.ok) {
    throw new ApiRequestError('The subscription service could not save your email. Please try again later.', response.status)
  }
  try {
    const result = await response.json() as { data?: { delivery?: EmailDelivery } }
    return result.data?.delivery ?? 'failed'
  } catch {
    return 'failed'
  }
}
