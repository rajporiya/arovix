import type { CSSProperties } from 'react'
import { PageShell } from '../../components/shared/PageShell'
import { projectPrinciples, projects } from './projects.data'
import './projects.css'

export function ProjectsPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <PageShell
      title={<>Work with<br /><i>purpose.</i></>}
      className="projects-page"
      intro="Selected products and platforms we have designed and built for teams with a real problem to solve."
    >
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.name} style={{ '--project-accent': project.accent } as CSSProperties}>
            <div className="project-preview">
              <div className="project-browser"><i /><i /><i /><span>{project.href.replace(/^https?:\/\//, '')}</span></div>
              <div className="project-preview-body">
                <span>{project.type}</span>
                <strong>{project.name}</strong>
                <div className="project-preview-lines"><i /><i /><i /></div>
              </div>
            </div>
            <div className="project-card-body">
              <div className="project-meta"><span>0{index + 1} / Selected work</span><span>{project.year}</span></div>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <a href={project.href} target="_blank" rel="noopener noreferrer">Visit live site <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>

      <section className="projects-principles">
        <div className="projects-principles-head">
          <p className="projects-label">02 / How we approach the work</p>
          <h2>Built around the<br /><em>real world.</em></h2>
        </div>
        <div className="projects-principles-grid">
          {projectPrinciples.map(([title, copy], index) => (
            <div key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="projects-cta">
        <div>
          <p className="projects-label">03 / Your project next</p>
          <h2>Have a product<br /><em>worth building?</em></h2>
        </div>
        <button type="button" onClick={() => navigate('/contact')}>Start a conversation <span aria-hidden="true">↗</span></button>
      </section>
    </PageShell>
  )
}
