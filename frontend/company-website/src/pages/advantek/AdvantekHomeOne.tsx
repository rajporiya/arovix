import { useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AdvantekHomeOne.css'

gsap.registerPlugin(ScrollTrigger)

interface HomeProps {
  navigate: (path: string) => void
}

export function AdvantekHomeOne({ navigate }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

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
      gsap.from('.adv-hero-clients', {
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

      // About section
      gsap.from('.adv-about-content > *', {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
      gsap.from('.adv-about-image', {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
      })

      // Services
      gsap.from('.adv-service-card', {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }, heroRef)

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
        <div className="adv-hero-bg">
          <div className="adv-hero-grid"></div>
          <div className="adv-hero-glow adv-hero-glow-1"></div>
          <div className="adv-hero-glow adv-hero-glow-2"></div>
        </div>
        <div className="adv-hero-container">
          <div className="adv-hero-content">
            <div className="adv-hero-badge">
              <span className="adv-badge-dot"></span>
              IT Company
            </div>
            <h1 className="adv-hero-title">
              Innovate, integrate, elevate solution for success
            </h1>
            <p className="adv-hero-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
            </p>
            <div className="adv-hero-cta">
              <button className="adv-btn adv-btn-primary" onClick={(e) => handleNavClick(e, '/contact')}>
                Get in touch
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="adv-hero-clients">
              <div className="adv-clients-avatars">
                <div className="adv-client-avatar"></div>
                <div className="adv-client-avatar"></div>
                <div className="adv-client-avatar"></div>
              </div>
              <span className="adv-clients-text">200+ Happy clients</span>
            </div>
          </div>
          <div className="adv-hero-image-wrapper">
            <div className="adv-hero-image">
              <img src="https://cdn.prod.website-files.com/66e941ecfdc808e4ad48ba70/66e941ecfdc808e4ad48bd5c_Banner%20Girl.webp" alt="IT Solutions" />
            </div>
            <div className="adv-hero-floating-card adv-floating-card-1">
              <div className="adv-floating-icon">✓</div>
              <div>
                <div className="adv-floating-title">IT Solution</div>
                <div className="adv-floating-sub">Best Solution</div>
              </div>
            </div>
            <div className="adv-hero-floating-card adv-floating-card-2">
              <div className="adv-floating-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <div className="adv-floating-review">4.9/5 Client Review</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="adv-partners">
        <div className="adv-partners-container">
          <span className="adv-partners-label">Trusted partners :</span>
          <div className="adv-partners-logos">
            {['Logo 1', 'Logo 2', 'Logo 3', 'Logo 4'].map((logo, i) => (
              <div key={i} className="adv-partner-logo">
                <div className="adv-partner-placeholder">{logo}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="adv-about" ref={aboutRef}>
        <div className="adv-about-container">
          <div className="adv-about-image">
            <img src="https://cdn.prod.website-files.com/66e941ecfdc808e4ad48ba70/66e941ecfdc808e4ad48bb0c_home%201%20about%20image.webp" alt="About" />
            <div className="adv-about-floating">
              <div className="adv-about-chart">📊</div>
              <div>
                <div className="adv-about-chart-text">Growth Analytics</div>
                <div className="adv-about-chart-sub">+85% Revenue</div>
              </div>
            </div>
          </div>
          <div className="adv-about-content">
            <div className="adv-section-badge">
              <span className="adv-badge-dot"></span>
              IT company
            </div>
            <h2 className="adv-section-title">
              We're the world's best IT solutions company
            </h2>
            <p className="adv-section-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem mauris, congue in elit sit amet, lobortis tempus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <ul className="adv-about-list">
              <li>
                <CheckCircle size={20} className="adv-about-check" />
                <span>We design and develop bespoke software solutions tailored.</span>
              </li>
              <li>
                <CheckCircle size={20} className="adv-about-check" />
                <span>We help businesses leverage emerging technologies such as artificial intelligence.</span>
              </li>
              <li>
                <CheckCircle size={20} className="adv-about-check" />
                <span>Organize your media files safe in the cloud</span>
              </li>
            </ul>
            <button className="adv-btn adv-btn-outline" onClick={(e) => handleNavClick(e, '/about')}>
              View more
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
                Services
              </div>
              <h2 className="adv-section-title">
                Our excellent dedicated service for customer
              </h2>
            </div>
          </div>
          <div className="adv-services-grid">
            {[
              { title: 'Managed IT services', icon: '🔧', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.' },
              { title: 'Cloud & hosting', icon: '☁️', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.' },
              { title: 'Managed cyber security', icon: '🛡️', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.' },
              { title: 'Website developer', icon: '💻', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.' },
            ].map((service, i) => (
              <button
                key={i}
                className="adv-service-card"
                onClick={(e) => handleNavClick(e, '/services')}
                type="button"
              >
                <div className="adv-service-icon">{service.icon}</div>
                <h3 className="adv-service-title">{service.title}</h3>
                <p className="adv-service-desc">{service.desc}</p>
                <div className="adv-service-arrow">
                  <ArrowRight size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="adv-cta-section">
        <div className="adv-cta-container">
          <div className="adv-cta-content">
            <div className="adv-section-badge adv-section-badge-light">
              <span className="adv-badge-dot"></span>
              Get in touch with us
            </div>
            <h2 className="adv-cta-title">Ready to get started ?</h2>
            <p className="adv-cta-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
            </p>
            <button className="adv-btn adv-btn-white" onClick={(e) => handleNavClick(e, '/contact')}>
              Schedule a call
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
