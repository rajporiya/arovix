import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import appLogo from '../../assets/app-logo.png'
import './AdvantekNavbar.css'

interface NavProps {
  path: string
  navigate: (path: string) => void
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function AdvantekNavbar({ path, navigate }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('locked')
    } else {
      document.body.classList.remove('locked')
    }
    return () => document.body.classList.remove('locked')
  }, [mobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    navigate(href)
  }

  return (
    <header className={`adv-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="adv-nav-container">
        <button
          className="adv-brand"
          onClick={(e) => handleNavClick(e, '/')}
          type="button"
        >
          <div className="adv-brand-logo">
            <img src={appLogo} alt="BrainyBeam logo" />
          </div>
          <span className="adv-brand-text">Advantek</span>
        </button>

        <nav className="adv-nav-desktop">
          {navItems.map((item) => (
            <div key={item.label} className="adv-nav-item">
              <button
                className={`adv-nav-link ${isActive(item.href) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
                type="button"
              >
                {item.label}
              </button>
            </div>
          ))}
        </nav>

        <button
          className="adv-cta-btn"
          onClick={(e) => handleNavClick(e, '/contact')}
          type="button"
        >
          <span className="adv-cta-label">Get in touch</span>
          <b className="adv-cta-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </b>
        </button>

        <button
          className="adv-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="adv-mobile-menu">
          {navItems.map((item) => (
            <div key={item.label} className="adv-mobile-item">
              <button
                className={`adv-mobile-link ${isActive(item.href) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
                type="button"
              >
                {item.label}
              </button>
            </div>
          ))}
          <button
            className="adv-mobile-cta"
            onClick={(e) => handleNavClick(e, '/contact')}
            type="button"
          >
            Get in touch
          </button>
        </div>
      )}
    </header>
  )
}
