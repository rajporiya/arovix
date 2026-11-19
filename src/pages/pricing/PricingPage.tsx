import './pricing.css'

interface Plan {
  name: string
  tag: string
  duration: string
  intro: string
  features: string[]
  cta: string
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: 'Discovery sprint',
    tag: 'Start here',
    duration: '2 weeks',
    intro: 'For teams that need clarity before committing to a build.',
    features: [
      'Stakeholder and user interviews',
      'Product and technical audit',
      'Scope, risks, and delivery roadmap',
      'Clickable direction for the first release',
      'A clear proposal for what comes next',
    ],
    cta: 'Book a discovery call',
  },
  {
    name: 'Product build',
    tag: 'Most common',
    duration: '6–16 weeks',
    intro: 'For launching or rebuilding a core digital product.',
    features: [
      'A dedicated senior product squad',
      'Weekly demos and visible progress',
      'Design, engineering, and QA together',
      'Launch support and documentation',
      '30 days of post-launch care',
    ],
    cta: 'Request a proposal',
    featured: true,
  },
  {
    name: 'Ongoing partnership',
    tag: 'Keep moving',
    duration: 'Monthly',
    intro: 'For teams that want a reliable product partner over time.',
    features: [
      'Shared roadmap and priorities',
      'Continuous design and delivery',
      'Monitoring, support, and improvements',
      'Flexible capacity as priorities change',
      'Direct access to the people doing the work',
    ],
    cta: 'Talk about a partnership',
  },
]

const included = [
  ['Senior team', 'The people in the proposal are the people doing the work.'],
  ['Weekly visibility', 'Working software, short demos, and written updates.'],
  ['Clear ownership', 'Code, designs, and infrastructure stay in your accounts.'],
  ['No surprises', 'Scope and commercial changes are agreed before they happen.'],
]

export function PricingPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-shell">
          <p className="pricing-eyebrow"><span /> Arovix / Engagement</p>
          <div className="pricing-hero-layout">
            <h1>A clear path<br /><em>forward.</em></h1>
            <div>
              <p>Every engagement is shaped around the problem, the team, and the outcome. No rigid packages — just a scope you can understand and a plan you can trust.</p>
              <p className="pricing-note">Pricing is provided in a written proposal after a short discovery conversation. You will always know what is included before work begins.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-plans">
        <div className="pricing-shell pricing-grid">
          {plans.map((plan) => (
            <article className={`pricing-card${plan.featured ? ' pricing-card-featured' : ''}`} key={plan.name}>
              <div className="pricing-card-top">
                <span className="pricing-tag">{plan.tag}</span>
                <span className="pricing-duration">{plan.duration}</span>
              </div>
              <h2>{plan.name}</h2>
              <p className="pricing-intro">{plan.intro}</p>
              <ul>
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <button type="button" onClick={() => navigate('/contact')}>{plan.cta} <span aria-hidden="true">↗</span></button>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-included">
        <div className="pricing-shell">
          <div className="pricing-included-head">
            <p className="pricing-index">02 / Every engagement</p>
            <h2>Included as<br /><em>standard.</em></h2>
          </div>
          <div className="pricing-included-grid">
            {included.map(([title, copy], index) => (
              <div key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-process">
        <div className="pricing-shell pricing-process-layout">
          <div>
            <p className="pricing-index">03 / How it works</p>
            <h2>Simple to start.<br /><em>Clear to continue.</em></h2>
          </div>
          <div className="pricing-steps">
            <div><span>01</span><h3>Conversation</h3><p>Tell us what you are building, what is in the way, and what a useful next step looks like.</p></div>
            <div><span>02</span><h3>Proposal</h3><p>We send a focused scope with timeline, team, assumptions, and a transparent cost.</p></div>
            <div><span>03</span><h3>Delivery</h3><p>We start with the highest-value work and keep progress visible from the first week.</p></div>
          </div>
        </div>
      </section>

      <section className="pricing-cta">
        <div className="pricing-shell pricing-cta-layout">
          <div>
            <p className="pricing-eyebrow"><span /> Not sure where you fit?</p>
            <h2>Tell us the problem.<br /><em>We will shape the engagement.</em></h2>
          </div>
          <button type="button" onClick={() => navigate('/contact')}>Start a conversation <span aria-hidden="true">↗</span></button>
        </div>
      </section>
    </div>
  )
}
