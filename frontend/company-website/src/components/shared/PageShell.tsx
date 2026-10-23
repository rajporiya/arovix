import type { ReactNode } from 'react'

export function PageShell({ title, intro, image, children }: { title: ReactNode; intro: string; image?: string; children?: ReactNode }) {
  const head = (
    <>
      <p className="eyebrow">Arovix / Studio</p>
      <h1>{title}</h1>
      <p className="page-lead">{intro}</p>
    </>
  )

  return (
    <section className="page paper">
      {image ? (
        <div className="page-hero">
          <div>{head}</div>
          <img className="page-hero-image" src={image} alt="" />
        </div>
      ) : head}
      {children}
    </section>
  )
}
