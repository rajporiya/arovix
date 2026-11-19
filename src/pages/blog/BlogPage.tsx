import { useState } from 'react'
import type { CSSProperties } from 'react'
import { PageShell } from '../../components/shared/PageShell'
import servicesImage from '../../assets/services.webp'
import { articles } from './blog.data'
import './blog.css'

export function BlogPage({ navigate }: { navigate: (path: string) => void }) {
  const categories = ['All', ...new Set(articles.map((article) => article.category))]
  const [category, setCategory] = useState('All')
  const visible = category === 'All' ? articles : articles.filter((article) => article.category === category)

  return (
    <PageShell
      title={<>Insights for<br /><i>better builds.</i></>}
      image={servicesImage}
      className="blog-page"
      intro="Notes on strategy, product, engineering, and the practical decisions behind useful software."
    >
      <div className="insights-toolbar">
        <p>{String(visible.length).padStart(2, '0')} / Articles</p>
        <div className="insight-filters">
          {categories.map((item) => (
            <button
              className={category === item ? 'is-active' : ''}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="insights-grid">
        {visible.map((article, index) => (
          <article
            className={`insight-card${index === 0 && category === 'All' ? ' insight-card-featured' : ''}`}
            key={article.slug}
            style={{ '--article-accent': article.accent } as CSSProperties}
          >
            <div className="insight-art">
              <div className="insight-art-bar"><i /><i /><i /></div>
              <div className="insight-art-content">
                <span>{article.category}</span>
                <b>{String(articles.indexOf(article) + 1).padStart(2, '0')}</b>
                <div className="insight-art-lines"><i /><i /><i /></div>
              </div>
            </div>
            <div className="insight-body">
              <div className="insight-meta"><span>{article.date}</span><span>{article.readTime}</span></div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <button type="button" onClick={() => navigate(`/blog/${article.slug}`)}>Read article <span aria-hidden="true">↗</span></button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
