import { ExternalLink } from 'lucide-react'
import './ProjectsShowcase.css'

const projects = [
  {
    name: 'Botbuzz',
    type: 'Digital platform',
    description: 'A focused digital experience built to help teams connect, engage, and grow.',
    href: 'https://botbuz.com/',
    accent: 'adv-project-card-blue',
  },
  {
    name: 'Zippix CRM',
    type: 'CRM platform',
    description: 'A streamlined customer relationship platform for managing sales and operations.',
    href: 'https://dev.app.zippix.in/',
    accent: 'adv-project-card-violet',
  },
  {
    name: 'Spotify',
    type: 'Music experience',
    description: 'A polished streaming experience designed around discovery, playlists, and listening.',
    href: 'https://open.spotify.com/',
    accent: 'adv-project-card-green',
  },
]

export function ProjectsShowcase() {
  return (
    <section className="adv-projects">
      <div className="adv-projects-container">
        <div className="adv-projects-header">
          <div>
            <div className="adv-section-badge">
              <span className="adv-badge-dot"></span>
              Selected work
            </div>
            <h2 className="adv-section-title">Projects built for real-world impact</h2>
          </div>
          <p className="adv-projects-intro">
            Explore a few digital products and platforms we have designed and developed.
          </p>
        </div>
        <div className="adv-projects-grid">
          {projects.map((project) => (
            <a
              key={project.name}
              className={`adv-project-card ${project.accent}`}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="adv-project-browser">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="adv-project-preview">
                <div className="adv-project-preview-top">
                  <span className="adv-project-preview-logo">A</span>
                  <span className="adv-project-preview-lines"></span>
                </div>
                <div className="adv-project-preview-content">
                  <span className="adv-project-preview-label">{project.type}</span>
                  <strong>{project.name}</strong>
                  <span className="adv-project-preview-bar"></span>
                  <span className="adv-project-preview-bar short"></span>
                </div>
              </div>
              <div className="adv-project-card-footer">
                <div>
                  <h3>{project.name}</h3>
                  <span className="adv-project-link">{project.href.replace(/^https?:\/\//, '')}</span>
                  <p>{project.description}</p>
                </div>
                <ExternalLink size={18} aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
