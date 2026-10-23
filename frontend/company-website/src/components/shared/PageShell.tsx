import type { ReactNode } from 'react'

export function PageShell({ title, intro, children }: { title: ReactNode; intro: string; children?: ReactNode }) {
  return <section className="page paper"><p className="eyebrow">BrainyBeam / Studio</p><h1>{title}</h1><p className="page-lead">{intro}</p>{children}</section>
}
