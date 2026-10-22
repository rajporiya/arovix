import type { ApiList, ContentItem } from '../types/content'

export const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:4000').replace(/\/$/, '')

export async function fetchCollection(endpoint: string): Promise<ContentItem[]> {
  const response = await fetch(`${API_URL}/api/v1/${endpoint}`)
  if (!response.ok) throw new Error('Unable to load content')
  const result = await response.json() as ApiList<ContentItem>
  return result.data ?? []
}

export async function submitContact(payload: Record<string, string>): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('Unable to submit inquiry')
}
