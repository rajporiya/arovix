import { PageShell } from '../../components/shared/PageShell'
import { useCollection } from '../../hooks/useCollection'
import type { ContentItem } from '../../types/content'
import './careers.css'

const values = [
  ['Craft', 'We care about the details because the details are the product.'],
  ['Curiosity', 'We ask better questions before reaching for a familiar answer.'],
  ['Ownership', 'Small teams, direct communication, and responsibility for the outcome.'],
]

export function CareersPage({ navigate }: { navigate: (path: string) => void }) {
  const { items, loading } = useCollection('careers')

  return (
    <PageShell
      title={<>Come build<br /><i>with us.</i></>}
      className="careers-page"
      intro="We look for curious people who care about the details and the bigger picture. Small teams, real ownership, useful work."
    >
      <div className="careers-toolbar">
        <p>Open roles</p>
        <span>{loading ? 'Loading…' : items.length ? `${items.length} position${items.length === 1 ? '' : 's'}` : 'No active openings'}</span>
      </div>

      {loading ? (
        <p className="careers-status">Loading roles…</p>
      ) : items.length ? (
        <div className="careers-list">
          {items.map((role: ContentItem, index) => (
            <article className="career-row" key={role._id ?? role.slug ?? role.title}>
              <span className="career-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="career-copy">
                <p className="career-type">{role.category ?? 'Arovix'}{role.location ? ` / ${role.location}` : ''}</p>
                <h2>{role.title ?? 'Open role'}</h2>
                <p>{role.summary ?? role.description ?? 'Details are available in the full role description.'}</p>
              </div>
              <button type="button" onClick={() => navigate(`/careers/${role.slug ?? role._id}`)}>View role <span aria-hidden="true">↗</span></button>
            </article>
          ))}
        </div>
      ) : (
        <div className="careers-empty">
          <div className="careers-empty-card">
            <p className="careers-label">No open roles right now</p>
            <h2>Good people are always<br /><em>worth meeting.</em></h2>
            <p>We do not have an active opening at this moment, but we are always interested in thoughtful engineers, designers, and product people. Tell us what you would like to build.</p>
            <button type="button" onClick={() => navigate('/contact')}>Introduce yourself <span aria-hidden="true">↗</span></button>
          </div>
          <div className="careers-values">
            {values.map(([title, copy], index) => (
              <div key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="careers-cta">
        <div>
          <p className="careers-label">Join the team</p>
          <h2>Want to build<br /><em>something useful?</em></h2>
        </div>
        <button type="button" onClick={() => navigate('/contact')}>Start a conversation <span aria-hidden="true">↗</span></button>
      </section>
    </PageShell>
  )
}
