import { useCollection } from '../../hooks/useCollection'
import type { ContentItem } from '../../types/content'
import { PageShell } from './PageShell'
import type { ReactNode } from 'react'

export function Listing({ endpoint, title, intro, empty, navigate }: { endpoint: string; title: ReactNode; intro: string; empty: string; navigate: (path: string) => void }) {
  const { items, loading } = useCollection(endpoint)
  return <PageShell title={title} intro={intro}><div className="listing">{loading ? <p className="empty">Loading…</p> : items.length ? items.map((item: ContentItem) => <article className="listing-card" key={item._id ?? item.slug}><div className="listing-art"><span>{item.category ?? endpoint.toUpperCase()}</span></div><div><p className="eyebrow">{item.category ?? 'BrainyBeam'}</p><h3>{item.title ?? 'Untitled'}</h3><p>{item.summary ?? item.description ?? empty}</p>{item.location && <small>{item.location}</small>}{(item.slug || item._id) && <button className="button button-dark" type="button" onClick={() => navigate(`/${endpoint}/${item.slug ?? item._id}`)}>View details ↗</button>}</div></article>) : <p className="empty">{empty}</p>}</div></PageShell>
}
