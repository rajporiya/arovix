import { useCollection } from '../../hooks/useCollection'
import { HomeHero } from '../../components/sections/HomeHero'
import { Button } from '../../components/sections/SectionButton'
import type { ContentItem } from '../../types/content'

const fallback: ContentItem[] = [{ title: 'Digital products', summary: 'Web and mobile products that make complex ideas feel simple.' }, { title: 'Brand experience', summary: 'Identity, interface, and storytelling for teams ready to stand apart.' }, { title: 'Intelligent systems', summary: 'Practical automation and AI workflows designed around your people.' }]

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const services = useCollection('services')
  const items = services.items.length ? services.items.slice(0, 3) : fallback
  return <><HomeHero navigate={navigate} /><section className="paper intro"><p className="eyebrow">01 / About</p><div><h2>Technology should feel <i>human.</i></h2><p>We are a design and technology studio for people building the next version of things. Our work lives where strategy, design, and engineering meet.</p><Button navigate={navigate} path="/about" dark>More about Arovix ↗</Button></div></section><section className="dark capabilities"><div className="section-top"><p className="eyebrow">02 / Capabilities</p><small>{services.loading ? 'Loading published services…' : services.items.length ? 'Live services' : 'Editable preview'}</small></div><h2>Make something<br /><i>meaningful.</i></h2><div className="service-grid">{items.map((service, index) => <article className="service-card" key={service._id ?? service.title}><span>0{index + 1}</span><h3>{service.title}</h3><p>{service.summary}</p><b>↗</b></article>)}</div></section><section className="statement"><p className="eyebrow">A different kind of partner</p><h2>Small enough to care.<br /><i>Sharp enough to deliver.</i></h2></section><section className="paper closing"><p className="eyebrow">03 / Next step</p><h2>Have a good <i>idea?</i></h2><Button navigate={navigate} path="/contact" dark>Let's talk ↗</Button></section></>
}
