import { useCollection } from '../../hooks/useCollection'
import { HomeHero } from '../../components/sections/HomeHero'
import { Button } from '../../components/sections/SectionButton'
import { ScrollReveal } from '../../components/shared/ScrollReveal'
import type { ContentItem } from '../../types/content'
import './home.css'

const fallback: ContentItem[] = [
  { title: 'Digital products', summary: 'Web and mobile experiences that make complex ideas feel simple.' },
  { title: 'Brand experience', summary: 'Identity and interfaces that help ambitious teams stand apart.' },
  { title: 'Intelligent systems', summary: 'Practical automation designed around the way your people work.' },
]

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const services = useCollection('services')
  const items = services.items.length ? services.items.slice(0, 3) : fallback

  return <div className="landing-page">
    <HomeHero navigate={navigate} />
    <ScrollReveal>
      <section className="landing-intro">
        <p className="landing-label">01 / What we do</p>
        <div>
          <h2>Ideas that move<br /><em>people forward.</em></h2>
          <p>We combine strategy, design, and technology to create digital experiences that feel clear, useful, and unmistakably yours.</p>
          <Button navigate={navigate} path="/about" dark>More about Arovix <span>→</span></Button>
        </div>
      </section>
    </ScrollReveal>
    <ScrollReveal>
      <section className="landing-showcase">
        <div className="landing-showcase-heading"><p className="landing-label">02 / Capabilities</p><span>Selected disciplines</span></div>
        <h2>Make something<br /><em>meaningful.</em></h2>
        <div className="landing-service-grid">{items.map((service, index) => <article key={service._id ?? service.title}><small>0{index + 1}</small><h3>{service.title}</h3><p>{service.summary}</p><b>↗</b></article>)}</div>
      </section>
    </ScrollReveal>
    <ScrollReveal>
      <section className="landing-gallery">
        <p className="landing-label">03 / Built with intention</p>
        <h2>From first thought<br />to <em>finished world.</em></h2>
        <div className="landing-gallery-grid"><div className="gallery-tile gallery-tile-purple"><span>BRAND / DIGITAL</span><strong>Make it<br />memorable.</strong></div><div className="gallery-tile gallery-tile-green"><span>PRODUCT / EXPERIENCE</span><strong>Simple is<br />powerful.</strong></div><div className="gallery-tile gallery-tile-dark"><span>STRATEGY / SYSTEMS</span><strong>Built for<br />what's next.</strong></div></div>
      </section>
    </ScrollReveal>
    <ScrollReveal>
      <section className="landing-closing"><p className="landing-label">04 / Next step</p><h2>Have a good<br /><em>idea?</em></h2><Button navigate={navigate} path="/contact">Let's talk <span>→</span></Button></section>
    </ScrollReveal>
  </div>
}
