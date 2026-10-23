import { Mail } from 'lucide-react'
import appLogo from '../../assets/app-logo.png'
import './AdvantekFooter.css'

interface FooterProps {
  navigate: (path: string) => void
}

export function AdvantekFooter({ navigate }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <footer className="adv-footer">
      <div className="adv-footer-container">
        <div className="adv-footer-top">
          <div className="adv-footer-brand">
            <div className="adv-footer-brand-header">
              <div className="adv-brand-logo">
                <img src={appLogo} alt="BrainyBeam logo" />
              </div>
              <span className="adv-footer-brand-name">Advantek</span>
            </div>
            <p className="adv-footer-desc">
              Empowering businesses with innovative IT solutions and digital transformation services.
            </p>
            <div className="adv-footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="adv-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="adv-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="adv-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="adv-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m11 1.5a1 1 0 0 1 1 1 1 1 0 0 1-1 1 1 1 0 0 1-1-1 1 1 0 0 1 1-1M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
              </a>
            </div>
          </div>

          <div className="adv-footer-links">
            <div className="adv-footer-column">
              <h4 className="adv-footer-title">Quick Links</h4>
              <ul className="adv-footer-list">
                <li><button onClick={(e) => handleNavClick(e, '/')} type="button">Home</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/about')} type="button">About</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/services')} type="button">Services</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/blog')} type="button">Blog</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/contact')} type="button">Contact</button></li>
              </ul>
            </div>

            <div className="adv-footer-column">
              <h4 className="adv-footer-title">Services</h4>
              <ul className="adv-footer-list">
                <li><button onClick={(e) => handleNavClick(e, '/services')} type="button">Managed IT Services</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/services')} type="button">Cloud & Hosting</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/services')} type="button">Cyber Security</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/services')} type="button">Web Development</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/services')} type="button">IT Consulting</button></li>
              </ul>
            </div>

            <div className="adv-footer-column">
              <h4 className="adv-footer-title">Company</h4>
              <ul className="adv-footer-list">
                <li><button onClick={(e) => handleNavClick(e, '/team')} type="button">Our Team</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/portfolio')} type="button">Portfolio</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/pricing')} type="button">Pricing</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/careers')} type="button">Careers</button></li>
                <li><button onClick={(e) => handleNavClick(e, '/contact')} type="button">Get Quote</button></li>
              </ul>
            </div>

            <div className="adv-footer-column">
              <h4 className="adv-footer-title">Newsletter</h4>
              <p className="adv-footer-newsletter-text">Get every single update to join our newsletter</p>
              <div className="adv-newsletter-form">
                <div className="adv-newsletter-input-group">
                  <Mail size={18} className="adv-newsletter-icon" />
                  <input type="email" placeholder="Enter your email" className="adv-newsletter-input" />
                </div>
                <button className="adv-newsletter-btn" type="button">
                  Sign up
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="adv-footer-bottom">
          <p className="adv-footer-copyright">
            © 2026 Advantek. Designed by <a href="https://www.radianttemplates.com/" target="_blank" rel="noopener noreferrer">Radiant Templates</a>, Powered by <a href="https://webflow.com" target="_blank" rel="noopener noreferrer">Webflow</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
