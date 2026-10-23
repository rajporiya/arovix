import { Button } from './SectionButton'
import './HomeHero.css'

export function HomeHero({ navigate }: { navigate: (path: string) => void }) {
  return <section className="landing-hero">
    <div className="landing-glow landing-glow-purple" />
    <div className="landing-glow landing-glow-blue" />
    <div className="landing-glow landing-glow-green" />
    <div className="landing-grid" />
    <div className="landing-hero-content">
      <p className="landing-badge">MODERN DIGITAL STUDIO <span>✦</span></p>
      <h1>Modern technology<br />for <em>real impact.</em></h1>
      <p className="landing-hero-description">We design and build thoughtful digital products that help ambitious teams grow with clarity and confidence.</p>
      <div className="landing-actions"><Button navigate={navigate} path="/contact">Get started <span>→</span></Button><button type="button" onClick={() => navigate('/projects')}>See our work <span>↗</span></button></div>
    </div>
    <div className="landing-browser-scene" aria-hidden="true">
      <div className="browser-preview browser-preview-left"><div className="browser-top"><i /><i /><i /></div><div className="preview-lines"><b /><b /><b /></div><div className="preview-pill" /></div>
      <div className="browser-preview browser-preview-main"><div className="browser-top"><i /><i /><i /><span>AROVIX / DIGITAL PRODUCTS</span></div><div className="preview-main-content"><small>01 / INTRODUCTION</small><h2>We build<br /><em>better things.</em></h2><div className="preview-person" /><div className="preview-button" /></div></div>
      <div className="browser-preview browser-preview-right"><div className="browser-top"><i /><i /><i /></div><div className="preview-card"><span>100%</span><b>Useful<br />by design</b></div><div className="preview-mini-grid"><i /><i /><i /></div></div>
    </div>
    <p className="landing-scroll">Scroll to explore <span>↓</span></p>
  </section>
}
