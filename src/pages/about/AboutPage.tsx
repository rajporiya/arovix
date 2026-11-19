import { PageShell } from '../../components/shared/PageShell'
import { services } from '../services/services.data'
import servicesImage from '../../assets/services.webp'
import './about.css'

const values = [
  ['Clarity over noise', 'We make the problem, the scope, and the next decision easier to see. Good work rarely starts with more complexity.'],
  ['Craft over shortcuts', 'We care about the parts users feel: speed, clarity, accessibility, and the small details that make a product trustworthy.'],
  ['Partnership over handoffs', 'We work in close conversation with your team. The best outcomes come from shared context, not a throw-it-over-the-wall process.'],
]

export function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <PageShell
      title={<>We build the<br /><i>next version.</i></>}
      image={servicesImage}
      className="about-page"
      intro="Arovix is an independent digital studio combining strategy, design, and engineering to make technology more useful, expressive, and human."
    >
      <div className="about-facts">
        <div><span>01</span><strong>Independent</strong><p>Direct access to the people doing the work.</p></div>
        <div><span>02</span><strong>Senior-led</strong><p>Experienced makers close to every decision.</p></div>
        <div><span>03</span><strong>End to end</strong><p>Strategy, design, engineering, and launch.</p></div>
        <div><span>04</span><strong>Remote-first</strong><p>Focused collaboration across time zones.</p></div>
      </div>

      <section className="about-values">
        <div className="about-values-head">
          <p className="about-label">02 / What we believe</p>
          <h2>Clarity over noise.<br />Craft over shortcuts.<br /><em>Partnership over handoffs.</em></h2>
        </div>
        <div className="about-values-grid">
          {values.map(([title, copy]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-services">
        <div>
          <p className="about-label">03 / What we do</p>
          <h2>One team across<br /><em>six capabilities.</em></h2>
        </div>
        <div className="about-service-list">
          {services.map((service) => (
            <button type="button" key={service.slug} onClick={() => navigate(`/services/${service.slug}`)}>
              <span>{service.icon}</span>
              <strong>{service.title}</strong>
              <b aria-hidden="true">↗</b>
            </button>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <div>
          <p className="about-label">04 / Next step</p>
          <h2>Let&apos;s build<br /><em>something useful.</em></h2>
        </div>
        <button type="button" onClick={() => navigate('/contact')}>Start a conversation <span aria-hidden="true">↗</span></button>
      </section>
    </PageShell>
  )
}
