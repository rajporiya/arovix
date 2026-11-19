import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import landingPageImage from '../../assets/hero-laptop.jpg'
import teamImage from '../../assets/team-photo.jpg'
import CursorGrid from '../../components/shared/CursorGrid'
import { services } from '../services/services.data'
import './AdvantekHomeOne.css'

gsap.registerPlugin(ScrollTrigger)

interface HomeProps {
  navigate: (path: string) => void
}

export function AdvantekHomeOne({ navigate }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const technologies = [
    { name: 'React', category: 'Frontend', logo: 'react', color: '61DAFB' },
    { name: 'Angular', category: 'Frontend', logo: 'angular', color: 'DD0031' },
    { name: 'Vue.js', category: 'Frontend', logo: 'vuedotjs', color: '4FC08D' },
    { name: 'Next.js', category: 'Web', logo: 'nextdotjs', color: '111111' },
    { name: 'TypeScript', category: 'Frontend', logo: 'typescript', color: '3178C6' },
    { name: 'Tailwind CSS', category: 'Frontend', logo: 'tailwindcss', color: '06B6D4' },
    { name: 'Node.js', category: 'Backend', logo: 'nodedotjs', color: '5FA04E' },
    { name: 'Express.js', category: 'Backend', logo: 'express', color: '111111' },
    { name: 'Django', category: 'Backend', logo: 'django', color: '092E20' },
    { name: 'Java', category: 'Backend', logo: 'openjdk', color: '437291' },
    { name: 'Python', category: 'Data Science', logo: 'python', color: '3776AB' },
    { name: 'TensorFlow', category: 'Data Science', logo: 'tensorflow', color: 'FF6F00' },
    { name: 'Power BI', category: 'Data Science', logo: 'powerbi', color: 'F2C811' },
    { name: 'PostgreSQL', category: 'Backend', logo: 'postgresql', color: '4169E1' },
    { name: 'MongoDB', category: 'Backend', logo: 'mongodb', color: '47A248' },
    { name: 'AWS', category: 'Cloud', logo: 'amazonaws', color: '232F3E' },
    { name: 'Docker', category: 'Cloud', logo: 'docker', color: '2496ED' },
    { name: 'React Native', category: 'Mobile', logo: 'react', color: '61DAFB' },
    { name: 'Flutter', category: 'Mobile', logo: 'flutter', color: '02569B' },
    { name: 'Kotlin', category: 'Mobile', logo: 'kotlin', color: '7F52FF' },
    { name: 'Swift', category: 'Mobile', logo: 'swift', color: 'F05138' },
    { name: 'HTML & CSS', category: 'Web', logo: 'html5', color: 'E34F26' },
    { name: 'Figma', category: 'Design', logo: 'figma', color: 'F24E1E' },
    { name: 'Analytics', category: 'Data Science', logo: 'googleanalytics', color: 'E37400' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.adv-hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      })
      gsap.from('.adv-hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      })
      gsap.from('.adv-hero-desc', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      })
      gsap.from('.adv-hero-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
      })
      gsap.from('.adv-hero-proof', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.7,
        ease: 'power3.out'
      })
      gsap.from('.adv-hero-image', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
      })

      const scrollRevealSections = [
        { trigger: aboutRef.current, target: '.adv-about-container' },
        { trigger: servicesRef.current, target: '.adv-services-container' },
        { trigger: '.adv-work', target: '.adv-work-container' },
        { trigger: '.adv-cta-section', target: '.adv-cta-container' },
      ]

      scrollRevealSections.forEach(({ trigger, target }) => {
        if (!trigger) return

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: 'top 90%',
            end: 'bottom 10%',
            scrub: true,
          },
        })

        timeline
          .fromTo(
            target,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          )
          .to(target, { opacity: 1, y: 0, duration: 0.4 })
          .to(target, { opacity: 0, y: -80, duration: 0.3, ease: 'power2.in' })
      })
    })

    return () => ctx.revert()
  }, [])

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <div className="adv-home">
      {/* Hero Section */}
      <section className="adv-hero" ref={heroRef}>
        <CursorGrid
          className="adv-hero-bg"
          cellSize={60}
          color="#6366f1"
          gridColor="rgba(99, 102, 241, 0.1)"
          highlight="area"
          gridStyle="lines"
          radius={140}
          holdTime={400}
          fadeDuration={800}
          fillOpacity={0.06}
          gridOpacity={0.08}
          spotlight={0.6}
          clickPulse
        >
          <div className="adv-hero-grid"></div>
          <div className="adv-hero-glow adv-hero-glow-1"></div>
          <div className="adv-hero-glow adv-hero-glow-2"></div>
        </CursorGrid>
        <div className="adv-hero-container">
          <div className="adv-hero-content">
            <div className="adv-hero-badge">
              <span className="adv-badge-dot"></span>
              Digital product studio
            </div>
            <h1 className="adv-hero-title">
              Software that moves your business forward
            </h1>
            <p className="adv-hero-desc">
              Arovix designs and builds web platforms, mobile apps, connected systems, and practical AI for teams with somewhere meaningful to go.
            </p>
            <div className="adv-hero-cta">
              <button className="adv-btn adv-btn-primary" onClick={(e) => handleNavClick(e, '/contact')}>
                Start a project
                <ArrowRight size={18} />
              </button>
              <button className="adv-btn adv-btn-outline" onClick={(e) => handleNavClick(e, '/services')}>
                Explore services
              </button>
            </div>
            <div className="adv-hero-proof">
              <span>Strategy</span>
              <span>Design</span>
              <span>Engineering</span>
              <span>AI &amp; data</span>
            </div>
          </div>
          <div className="adv-hero-image-wrapper">
            <div className="adv-hero-image">
              <div className="adv-hero-fallback" aria-hidden="true">
                <div className="adv-hero-fallback-bar"><i /><i /><i /><span>arovix / build</span></div>
                <div className="adv-hero-fallback-body">
                  <div className="adv-hero-fallback-code"><i /><i /><i /><i /><i /><i /><i /></div>
                  <div className="adv-hero-fallback-panel">
                    <span>Product overview</span>
                    <strong>Built to move.</strong>
                    <div className="adv-hero-fallback-chart"><i /><i /><i /><i /><i /></div>
                    <div className="adv-hero-fallback-stat"><span>Release velocity</span><b>+38%</b></div>
                  </div>
                </div>
              </div>
              <img
                src={landingPageImage}
                alt="Modern laptop displaying software development technology"
                width={1000}
                height={667}
                loading="eager"
                decoding="async"
                onError={(event) => { event.currentTarget.hidden = true }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="adv-partners">
        <div className="adv-partners-container">
          <div className="adv-partners-marquee" aria-label="Technologies we work with">
            <div className="adv-partners-track">
              {[...technologies, ...technologies].map((technology, i) => {
                return (
                  <div
                    key={`${technology.name}-${i}`}
                    className="adv-partner-logo"
                    aria-hidden={i >= technologies.length}
                  >
                    <span className="adv-partner-icon">
                      {technology.logo === 'powerbi' || technology.logo === 'amazonaws' ? (
                        <span className="adv-partner-monogram" aria-hidden="true">
                          {technology.logo === 'powerbi' ? 'BI' : 'AWS'}
                        </span>
                      ) : (
                        <img
                          src={`https://cdn.simpleicons.org/${technology.logo}/${technology.color}`}
                          alt=""
                          loading="lazy"
                        />
                      )}
                    </span>
                    <span className="adv-partner-info">
                      <span className="adv-partner-name">{technology.name}</span>
                      <span className="adv-partner-category">{technology.category}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="adv-about" ref={aboutRef}>
        <div className="adv-about-container">
          <div className="adv-about-image">
            <img src={teamImage} alt="The Arovix team collaborating on a digital product" />
            <div className="adv-about-floating">
              <div className="adv-about-chart">✦</div>
              <div>
                <div className="adv-about-chart-text">Senior, partner-led team</div>
                <div className="adv-about-chart-sub">Direct access to the makers</div>
              </div>
            </div>
          </div>
          <div className="adv-about-content">
            <div className="adv-section-badge">
              <span className="adv-badge-dot"></span>
              About Arovix
            </div>
            <h2 className="adv-section-title">
              Technology with a clear point of view
            </h2>
            <p className="adv-section-desc">
              We are an independent IT company turning complex ideas into products people can use. Small senior teams, direct communication, and a bias for shipping useful work.
            </p>
            <ul className="adv-about-list">
              <li>
                <CheckCircle size={20} className="adv-about-check" />
                <span>Senior engineers and designers work directly with your team — no layers in between.</span>
              </li>
              <li>
                <CheckCircle size={20} className="adv-about-check" />
                <span>Product-focused architecture built for the next release, not just launch day.</span>
              </li>
              <li>
                <CheckCircle size={20} className="adv-about-check" />
                <span>Practical cloud, platform, and AI choices tied to measurable business outcomes.</span>
              </li>
            </ul>
            <button className="adv-btn adv-btn-outline" onClick={(e) => handleNavClick(e, '/about')}>
              More about us
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="adv-services" ref={servicesRef}>
        <div className="adv-services-container">
          <div className="adv-services-header">
            <div>
              <div className="adv-section-badge">
                <span className="adv-badge-dot"></span>
                What we do
              </div>
              <h2 className="adv-section-title">
                Six capabilities. One accountable team.
              </h2>
            </div>
            <div className="adv-services-intro">
              <p>From the first architecture decision to launch and beyond, we bring the right specialists into one focused team.</p>
              <button className="adv-link-btn" onClick={(e) => handleNavClick(e, '/services')} type="button">
                View all services
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="adv-services-grid">
            {services.map((service) => (
              <button
                key={service.slug}
                className="adv-service-card"
                onClick={(e) => handleNavClick(e, `/services/${service.slug}`)}
                style={{ '--card-accent': service.accent } as CSSProperties}
                type="button"
              >
                <div className="adv-service-icon">{service.icon}</div>
                <h3 className="adv-service-title">{service.title}</h3>
                <p className="adv-service-desc">{service.description}</p>
                <div className="adv-service-tags">
                  {service.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <div className="adv-service-arrow">
                  <ArrowRight size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="adv-work">
        <div className="adv-work-container">
          <div className="adv-work-header">
            <div>
              <div className="adv-section-badge">
                <span className="adv-badge-dot"></span>
                Selected work
              </div>
              <h2 className="adv-section-title">Products built to be used.</h2>
            </div>
            <button className="adv-link-btn" onClick={(e) => handleNavClick(e, '/projects')} type="button">
              View all work
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="adv-work-grid">
            <a className="adv-work-card adv-work-card-botbuzz" href="https://botbuz.com/" target="_blank" rel="noopener noreferrer">
              <span className="adv-work-tag">Digital platform</span>
              <h3>Botbuzz</h3>
              <p>A focused digital experience built to help teams connect, engage, and grow.</p>
              <b>Visit live site <span aria-hidden="true">↗</span></b>
            </a>
            <a className="adv-work-card adv-work-card-zippix" href="https://dev.app.zippix.in/" target="_blank" rel="noopener noreferrer">
              <span className="adv-work-tag">CRM platform</span>
              <h3>Zippix CRM</h3>
              <p>A streamlined customer relationship platform for managing sales and daily operations.</p>
              <b>Visit live site <span aria-hidden="true">↗</span></b>
            </a>
            <button className="adv-work-card adv-work-card-cta" onClick={(e) => handleNavClick(e, '/contact')} type="button">
              <span className="adv-work-tag">Your product next</span>
              <h3>Have something in mind?</h3>
              <p>Tell us where you want to go. We will help you find the clearest path to a useful release.</p>
              <b>Start a conversation <span aria-hidden="true">↗</span></b>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="adv-cta-section">
        <div className="adv-cta-container">
          <div className="adv-cta-content">
            <div className="adv-section-badge adv-section-badge-light">
              <span className="adv-badge-dot"></span>
              Next step
            </div>
            <h2 className="adv-cta-title">Have a project in mind?</h2>
            <p className="adv-cta-desc">
              Tell us what you&apos;re building. We&apos;ll reply within one business day with a clear, thoughtful next step.
            </p>
            <button className="adv-btn adv-btn-white" onClick={(e) => handleNavClick(e, '/contact')}>
              Start a conversation
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
