import { Button } from './SectionButton'

export function HomeHero({ navigate }: { navigate: (path: string) => void }) {
  return <section className="hero"><div className="hero-copy"><p className="eyebrow">Independent digital studio</p><h1>Ideas into<br /><i>impact.</i></h1><p className="lead">We design and build digital products for ambitious teams ready to move what matters forward.</p><div className="actions"><Button navigate={navigate} path="/contact">Let's talk ↗</Button><button className="underlink" type="button" onClick={() => navigate('/services')}>Explore capabilities ↓</button></div></div><div className="orb" aria-hidden="true"><div className="orb-core" /><div className="orb-ring ring-one" /><div className="orb-ring ring-two" /><span>BUILD / 2026</span></div><small className="scroll">↓ Scroll to explore</small></section>
}
