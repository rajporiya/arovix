import type { CSSProperties } from 'react'
import { articles, type BlogArticle } from './blog.data'
import './blog.css'

export function BlogArticlePage({ article, navigate }: { article: BlogArticle; navigate: (path: string) => void }) {
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2)

  return (
    <div className="article-page">
      <article>
        <header className="article-hero">
          <div className="article-hero-grid" aria-hidden="true" />
          <div className="article-shell">
            <button className="article-back" type="button" onClick={() => navigate('/blog')}><span aria-hidden="true">←</span> All insights</button>
            <p className="article-eyebrow">{article.category} / {article.date}</p>
            <h1>{article.title}</h1>
            <p className="article-lead">{article.excerpt}</p>
            <div className="article-meta"><span>{article.readTime}</span><span>By Arovix Studio</span></div>
          </div>
        </header>

        <div className="article-body">
          <div className="article-shell article-layout">
            <div className="article-content">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}
            </div>
            <aside className="article-aside">
              <div className="article-aside-card">
                <span>Written by</span>
                <strong>Arovix Studio</strong>
                <p>Strategy, design, and engineering notes from the people building the work.</p>
                <button type="button" onClick={() => navigate('/contact')}>Start a conversation <span aria-hidden="true">↗</span></button>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="article-related">
        <div className="article-shell">
          <p className="article-eyebrow">Keep reading</p>
          <div className="article-related-grid">
            {related.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => navigate(`/blog/${item.slug}`)}
                style={{ '--article-accent': item.accent } as CSSProperties}
              >
                <span>{item.category}</span>
                <strong>{item.title}</strong>
                <p>{item.excerpt}</p>
                <b>Read article <span aria-hidden="true">↗</span></b>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
