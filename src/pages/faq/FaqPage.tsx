import { useState } from 'react'
import './faq.css'

interface FaqGroup {
  title: string
  intro: string
  items: [string, string][]
}

const faqGroups: FaqGroup[] = [
  {
    title: 'Working with us',
    intro: 'How we start, how we collaborate, and what it is like to have Arovix on your side.',
    items: [
      ['How do you estimate a project?', 'We start with a focused discovery conversation, define the first valuable release, and then provide a transparent scope and proposal. You will see the assumptions, team, and timeline before any work begins.'],
      ['Can you work with an existing product team?', 'Yes. We can join as a focused design and engineering partner, embed with your internal team, or take ownership of a specific workstream. The goal is always to make the whole team more effective.'],
      ['Do you support products after launch?', 'Yes. We offer ongoing iteration, maintenance, monitoring, and improvement. Many clients keep a monthly partnership so there is always a reliable team close to the product.'],
      ['Can we sign an NDA before sharing details?', 'Absolutely. Tell us what you need protected and we can arrange the appropriate agreement before the first discovery conversation.'],
      ['Who owns the code and designs?', 'You do. Code, designs, infrastructure, and documentation live in your accounts and are handed over with clear ownership.'],
    ],
  },
  {
    title: 'Services & technology',
    intro: 'The way we choose tools, shape delivery, and keep the work useful long after launch.',
    items: [
      ['How long does a typical project take?', 'Most engagements start with a short discovery, followed by releases sized in weeks rather than months. After the first conversation we will give you a realistic timeline based on scope and complexity.'],
      ['Do you choose the technology, or do we?', 'Both. If you have a stack, we work inside it. If not, we recommend the simplest tools that fit the product, the team, and the long-term maintenance plan.'],
      ['Can you modernise an existing system?', 'Yes. We begin by understanding what already works, then improve the riskiest parts in stages so the business keeps running while the product gets stronger.'],
      ['How do you approach AI features?', 'We start with a measurable workflow, prove value on real data, and add guardrails before expanding. The goal is practical intelligence, not an experiment that stays in a notebook.'],
      ['Do you build for both iOS and Android?', 'Yes. Depending on the product, we use native Swift and Kotlin or a shared React Native or Flutter codebase, choosing the approach that best fits the experience and budget.'],
    ],
  },
  {
    title: 'Engagement & pricing',
    intro: 'Clear commercial expectations, without the theatre.',
    items: [
      ['How is pricing structured?', 'We use fixed-scope discovery, milestone-based delivery, or a monthly partnership. You will always see the scope, team, and assumptions before work begins.'],
      ['What is the minimum engagement?', 'Most build engagements begin around four to six weeks. Smaller advisory work, audits, and discovery sprints can be arranged separately.'],
      ['Do you work with clients outside India?', 'Yes. We work remotely with teams across time zones and keep communication async-friendly, with regular demos and written updates.'],
      ['What happens if the scope changes?', 'Scope changes are normal. We make the impact visible, agree on the trade-off together, and adjust the plan without surprising invoices.'],
    ],
  },
]

export function FaqPage({ navigate }: { navigate: (path: string) => void }) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero-grid" aria-hidden="true" />
        <div className="faq-shell faq-hero-inner">
          <p className="faq-eyebrow"><span /> Arovix / FAQ</p>
          <h1>Questions,<br /><em>answered.</em></h1>
          <p className="faq-hero-copy">Everything you might want to know before starting a conversation. If your question is not here, we are one message away.</p>
          <div className="faq-hero-actions">
            <button className="faq-primary" type="button" onClick={() => navigate('/contact')}>Ask us directly <span aria-hidden="true">↗</span></button>
            <button className="faq-secondary" type="button" onClick={() => navigate('/pricing')}>See how we work</button>
          </div>
        </div>
      </section>

      <section className="faq-body">
        <div className="faq-shell">
          {faqGroups.map((group, groupIndex) => (
            <div className="faq-group" key={group.title}>
              <div className="faq-group-head">
                <p className="faq-index">0{groupIndex + 1} / Questions</p>
                <h2>{group.title}</h2>
                <p>{group.intro}</p>
              </div>
              <div className="faq-list">
                {group.items.map(([question, answer]) => {
                  const isOpen = openQuestion === question
                  return (
                    <div className={`faq-row${isOpen ? ' is-open' : ''}`} key={question}>
                      <button type="button" onClick={() => setOpenQuestion(isOpen ? null : question)} aria-expanded={isOpen}>
                        <span>{question}</span>
                        <b aria-hidden="true">{isOpen ? '−' : '+'}</b>
                      </button>
                      {isOpen && <p>{answer}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-cta">
        <div className="faq-shell faq-cta-inner">
          <div>
            <p className="faq-index">Still curious?</p>
            <h2>Let&apos;s talk about<br /><em>your next move.</em></h2>
          </div>
          <button className="faq-primary" type="button" onClick={() => navigate('/contact')}>Start a conversation <span aria-hidden="true">↗</span></button>
        </div>
      </section>
    </div>
  )
}
