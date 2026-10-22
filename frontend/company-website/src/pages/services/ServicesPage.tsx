import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Button } from '../../components/sections/SectionButton'
import { serviceFaqs, services } from './services.data'
import './services.css'

export function ServicesPage({ navigate }: { navigate: (path: string) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero-grid" />
        <div className="services-hero-copy">
          <p className="services-eyebrow"><span /> What we do</p>
          <h1>Digital craft for<br /><em>real momentum.</em></h1>
          <p className="services-hero-lede">Strategy, design, and engineering for teams building products people choose to use.</p>
          <Button navigate={navigate} path="/contact">Start a conversation <span>↗</span></Button>
        </div>
        <div className="services-hero-orbit" aria-hidden="true"><div /><div /><div /></div>
        <p className="services-hero-meta">Arovix / Capabilities / 2026</p>
      </section>

      <section className="services-introduction">
        <p className="services-index">01 / Capabilities</p>
        <div>
          <h2>Good technology is<br /><em>felt, not explained.</em></h2>
          <p>We bring clarity to complex challenges and turn ideas into reliable digital products. Every engagement is shaped around your team, your users, and the next meaningful step.</p>
        </div>
      </section>

      <section className="services-catalog">
        <div className="services-catalog-heading">
          <div><p className="services-index">02 / Expertise</p><h2>Built to move<br /><em>with you.</em></h2></div>
          <p>Explore the capabilities we bring together to take a product from possibility to progress.</p>
        </div>
        <div className="service-catalog-grid">
          {services.map((service) => (
            <article className="service-tile" key={service.title} style={{ '--service-accent': service.accent } as CSSProperties}>
              <div className="service-tile-top"><span className="service-tile-icon">{service.icon}</span><span className="service-tile-eyebrow">{service.eyebrow}</span></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <div className="service-tile-bottom"><div>{service.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><button type="button" onClick={() => navigate(`/services/${service.title.replaceAll(' ', '-')}`)} aria-label={`View ${service.title} details`}>↗</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-process">
        <p className="services-index">03 / How we work</p>
        <div className="services-process-layout"><h2>Less theatre.<br /><em>More progress.</em></h2><div className="process-steps"><div><span>01</span><h3>Understand</h3><p>We learn the context before suggesting the answer.</p></div><div><span>02</span><h3>Make</h3><p>We move from a clear direction to useful, testable work.</p></div><div><span>03</span><h3>Improve</h3><p>We keep learning, refining, and making the product stronger.</p></div></div></div>
      </section>

      <section className="services-faq-new">
        <div><p className="services-index">04 / FAQ</p><h2>Questions worth<br /><em>asking.</em></h2></div>
        <div className="faq-stack">{serviceFaqs.map(([question, answer], index) => <div className={`faq-card ${openFaq === index ? 'faq-card-open' : ''}`} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div>
      </section>

      <section className="services-cta"><p className="services-eyebrow"><span /> Have a challenge?</p><h2>Let&apos;s make the<br /><em>next move.</em></h2><Button navigate={navigate} path="/contact" dark>Talk to our team <span>↗</span></Button></section>
    </div>
  )
}
