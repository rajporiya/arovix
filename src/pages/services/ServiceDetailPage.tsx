import type { CSSProperties } from 'react'
import { ContactForm } from '../../components/shared/ContactForm'
import { services, technologyDetails } from './services.data'
import './ServiceDetailPage.css'

export function ServiceDetailPage({ slug, navigate }: { slug: string; navigate: (path: string) => void }) {
  const service = services.find((entry) => entry.slug === slug)
  if (!service) return null

  const otherServices = services.filter((entry) => entry.slug !== slug)
  const accent = { '--service-accent': service.accent } as CSSProperties

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="service-detail" style={accent}>
      <section className="service-detail-hero">
        <div className="service-detail-grid" aria-hidden="true" />
        <div className="service-detail-orb" aria-hidden="true" />
        <div className="service-detail-shell">
          <div className="service-detail-topline">
            <button className="service-detail-back" type="button" onClick={() => navigate('/services')}>
              <span aria-hidden="true">←</span> All services
            </button>
            <span className="service-detail-index">Service {service.icon} / 06</span>
          </div>

          <div className="service-detail-hero-layout">
            <div className="service-detail-hero-copy">
              <p className="service-detail-eyebrow"><span /> {service.eyebrow}</p>
              <h1>{service.title}</h1>
              <p className="service-detail-tagline">{service.tagline}</p>
              <div className="service-detail-actions">
                <button className="service-detail-primary" type="button" onClick={() => scrollTo('service-contact')}>
                  Start a project <span aria-hidden="true">↗</span>
                </button>
                <button className="service-detail-secondary" type="button" onClick={() => scrollTo('service-technologies')}>
                  View technologies
                </button>
              </div>
            </div>

            <div className="service-detail-visual" aria-hidden="true">
              <div className="service-detail-visual-card">
                <div className="service-detail-visual-top"><span>{service.icon}</span><em>{service.eyebrow}</em></div>
                <strong>{service.title}</strong>
                <p>{service.description}</p>
                <div className="service-detail-visual-chips">{service.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              </div>
              <div className="service-detail-visual-ring" />
              <span className="service-detail-visual-note">Arovix / Capabilities / 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail-overview">
        <div className="service-detail-shell service-detail-overview-layout">
          <p className="service-detail-label">01 / Overview</p>
          <div>
            <h2>What we build,<br /><em>and why it works.</em></h2>
            <p className="service-detail-overview-copy">{service.overview}</p>
            <ul className="service-detail-points">
              {service.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, '0')}</span>{point}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="service-detail-technologies" id="service-technologies">
        <div className="service-detail-shell">
          <div className="service-detail-section-heading">
            <div>
              <p className="service-detail-label">02 / Related technologies</p>
              <h2>The tools behind<br /><em>the outcome.</em></h2>
            </div>
            <p>{service.title} engagements use a focused stack, chosen for fit, longevity, and the way your team already works.</p>
          </div>
          <div className="service-detail-tech-grid">
            {service.technologies.map((technology, index) => (
              <article className="service-detail-tech-card" key={technology}>
                <span className="service-detail-tech-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{technology}</h3>
                <p>{technologyDetails[technology]}</p>
              </article>
            ))}
          </div>
          <p className="service-detail-tech-note">Every stack is shaped around the problem. We can also work inside your existing tools and conventions.</p>
        </div>
      </section>

      <section className="service-detail-approach">
        <div className="service-detail-shell">
          <p className="service-detail-label">03 / How we work</p>
          <div className="service-detail-approach-layout">
            <h2>Clear from<br /><em>the first step.</em></h2>
            <div className="service-detail-steps">
              <div><span>01</span><h3>Understand</h3><p>We learn the users, constraints, and the outcome worth reaching before choosing the build.</p></div>
              <div><span>02</span><h3>Make</h3><p>We work in visible increments, turning the clearest next step into something real and testable.</p></div>
              <div><span>03</span><h3>Improve</h3><p>We measure what shipped, learn from real use, and keep the product moving in the right direction.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail-more">
        <div className="service-detail-shell">
          <p className="service-detail-label">04 / Keep exploring</p>
          <div className="service-detail-more-layout">
            <h2>More ways we<br /><em>move you forward.</em></h2>
            <div className="service-detail-more-list">
              {otherServices.map((other) => (
                <button
                  className="service-detail-more-item"
                  key={other.slug}
                  type="button"
                  onClick={() => navigate(`/services/${other.slug}`)}
                  style={{ '--other-accent': other.accent } as CSSProperties}
                >
                  <span className="service-detail-more-icon">{other.icon}</span>
                  <span className="service-detail-more-copy"><strong>{other.title}</strong><em>{other.tagline}</em></span>
                  <b aria-hidden="true">↗</b>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail-contact" id="service-contact">
        <div className="service-detail-shell service-detail-contact-layout">
          <div className="service-detail-contact-copy">
            <p className="service-detail-label">05 / Start here</p>
            <h2>Let&apos;s build<br /><em>what&apos;s next.</em></h2>
            <p>Tell us about your {service.title} project. We&apos;ll reply within one business day with a clear, thoughtful next step.</p>
            <ul>
              <li>A reply within one business day</li>
              <li>A focused conversation, not a sales pitch</li>
              <li>NDA-friendly from the first call</li>
            </ul>
          </div>
          <div className="service-detail-contact-form">
            <ContactForm key={service.slug} subject={`Project inquiry — ${service.title}`} />
          </div>
        </div>
      </section>
    </div>
  )
}
