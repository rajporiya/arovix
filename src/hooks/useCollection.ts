import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api'
import type { ContentItem } from '../types/content'

export function useCollection(endpoint: string) {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let active = true
    setLoading(true)
    fetchCollection(endpoint).then((data) => { if (active) setItems(data) }).catch(() => { if (active) setItems([]) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [endpoint])
  return { items, loading }
}
