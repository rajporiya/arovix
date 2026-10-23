import type { CSSProperties } from 'react'
import { PageShell } from '../../components/shared/PageShell'
import { ScrollReveal } from '../../components/shared/ScrollReveal'
import { Button } from '../../components/sections/SectionButton'
import bannerImage from '../../assets/banner.webp'
import './team.css'

interface Member {
  name: string
  role: string
  bio: string
  skills: string[]
  years: number
  location: string
}

interface TeamGroup {
  label: string
  title: string
  intro: string
  accent: string
  members: Member[]
}

const stats = [
  { value: '16', label: 'Specialists' },
  { value: '04', label: 'Disciplines' },
  { value: '08', label: 'Cities' },
  { value: '7+', label: 'Avg. years' },
]

const groups: TeamGroup[] = [
  {
    label: 'Frontend Engineering',
    title: 'Interfaces people\nlove to use.',
    intro: 'Our frontend engineers turn ideas into fast, accessible, and pixel-precise product experiences across web and mobile.',
    accent: '#6366f1',
    members: [
      { name: 'Aarav Sharma', role: 'Senior Frontend Engineer', bio: 'Builds fast, accessible interfaces and owns our component architecture end to end.', skills: ['React', 'TypeScript', 'Next.js'], years: 8, location: 'Bengaluru, India' },
      { name: 'Rohan Verma', role: 'Frontend Engineer', bio: 'Obsessive about load times, clean markup, and shipping polished UI on schedule.', skills: ['React', 'Tailwind', 'Vite'], years: 5, location: 'Pune, India' },
      { name: 'Priya Nair', role: 'UI Engineer', bio: 'Bridges design and code, bringing motion and micro-interactions to life.', skills: ['React', 'Framer Motion', 'Storybook'], years: 6, location: 'Kochi, India' },
      { name: 'Aditya Joshi', role: 'Frontend Architect', bio: 'Designs scalable frontends and leads performance budgeting for large apps.', skills: ['Next.js', 'TypeScript', 'Perf'], years: 10, location: 'Hyderabad, India' },
    ],
  },
  {
    label: 'Backend Engineering',
    title: 'Systems that scale\nwith confidence.',
    intro: 'Backend engineers who design resilient APIs, model data cleanly, and keep services fast under real-world load.',
    accent: '#0ea5e9',
    members: [
      { name: 'Rohan Mehta', role: 'Lead Backend Engineer', bio: 'Owns service architecture and mentoring; ships reliable, well-tested APIs.', skills: ['Node.js', 'NestJS', 'PostgreSQL'], years: 9, location: 'Mumbai, India' },
      { name: 'Kavya Reddy', role: 'Backend Engineer', bio: 'Writes low-latency services and cares deeply about observability.', skills: ['Go', 'gRPC', 'Redis'], years: 7, location: 'Bengaluru, India' },
      { name: 'Arjun Iyer', role: 'API Engineer', bio: 'Designs clean GraphQL schemas and keeps integrations painless.', skills: ['Node.js', 'GraphQL', 'MongoDB'], years: 6, location: 'Chennai, India' },
      { name: 'Sneha Kulkarni', role: 'Software Engineer', bio: 'Builds data-heavy backends and automation for complex workflows.', skills: ['Python', 'FastAPI', 'MySQL'], years: 5, location: 'Pune, India' },
    ],
  },
  {
    label: 'Design & Product',
    title: 'Clarity, craft,\nand intent.',
    intro: 'Designers and product thinkers who shape strategy, systems, and interfaces that feel effortless.',
    accent: '#8b5cf6',
    members: [
      { name: 'Ananya Ghosh', role: 'Design Lead', bio: 'Sets the product vision and keeps every touchpoint on-brand and coherent.', skills: ['Branding', 'Strategy', 'Figma'], years: 11, location: 'Kolkata, India' },
      { name: 'Meera Pillai', role: 'Product Designer', bio: 'Turns research into flows and prototypes the team can validate quickly.', skills: ['Figma', 'Design Systems', 'UX Research'], years: 8, location: 'Bengaluru, India' },
      { name: 'Vikram Singh', role: 'UI/UX Designer', bio: 'Crafts refined interfaces with a strong eye for typography and motion.', skills: ['Figma', 'Prototyping', 'Motion'], years: 6, location: 'Jaipur, India' },
      { name: 'Riya Chatterjee', role: 'Interaction Designer', bio: 'Builds delightful, performant interactions directly in the browser.', skills: ['Framer', 'Motion', 'CSS'], years: 7, location: 'Delhi, India' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    title: 'Infrastructure\nthat never sleeps.',
    intro: 'Platform and DevOps engineers who automate delivery, harden security, and keep deployments boring — in a good way.',
    accent: '#16a34a',
    members: [
      { name: 'Karthik Rao', role: 'DevOps Engineer', bio: 'Owns CI/CD and cloud cost efficiency across every environment.', skills: ['AWS', 'Docker', 'Kubernetes'], years: 8, location: 'Bengaluru, India' },
      { name: 'Divya Menon', role: 'Site Reliability Engineer', bio: 'Keeps uptime high with sane alerting, IaC, and load testing.', skills: ['Terraform', 'AWS', 'CI/CD'], years: 7, location: 'Kochi, India' },
      { name: 'Nikhil Gupta', role: 'Cloud Engineer', bio: 'Migrates workloads cleanly and automates the boring parts away.', skills: ['Azure', 'Docker', 'Python'], years: 6, location: 'Noida, India' },
      { name: 'Shreya Deshpande', role: 'Platform Engineer', bio: 'Builds internal platforms and tooling that make developers faster.', skills: ['Kubernetes', 'Go', 'Observability'], years: 9, location: 'Hyderabad, India' },
    ],
  },
]

const initials = (name: string) =>
  name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()

export function TeamPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <PageShell
      title={<>People make<br /><i>the difference.</i></>}
      image={bannerImage}
      intro="A close-knit, cross-functional team of engineers, designers, and strategists — grouped by craft, spread across the globe. Real people, thoughtful work."
    >
      <ScrollReveal>
        <div className="team-stats">
          {stats.map((stat) => (
            <div className="team-stat" key={stat.label}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {groups.map((group, index) => (
        <ScrollReveal key={group.label}>
          <section
            className="team-group"
            style={{ '--group-accent': group.accent } as CSSProperties}
          >
            <div className="team-group-head">
              <p className="team-group-eyebrow">
                {String(index + 1).padStart(2, '0')} / {group.label}
              </p>
              <div>
                <h2>{group.title.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h2>
                <p>{group.intro}</p>
              </div>
            </div>

            <div className="team-grid">
              {group.members.map((member) => (
                <article className="team-card" key={member.name}>
                  <div className="team-avatar">
                    <span>{initials(member.name)}</span>
                    <small>{member.location.split(',')[1]?.trim() ?? member.location}</small>
                  </div>
                  <div className="team-card-body">
                    <p className="team-card-role">{member.role}</p>
                    <h3>{member.name}</h3>
                    <p className="team-card-bio">{member.bio}</p>
                    <ul className="team-skills">
                      {member.skills.map((skill) => <li key={skill}>{skill}</li>)}
                    </ul>
                  </div>
                  <div className="team-card-meta">
                    <span>{member.years} yrs exp</span>
                    <span>{member.location}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <section className="team-cta">
          <p className="team-group-eyebrow" style={{ '--group-accent': '#a59dff' } as CSSProperties}>05 / Join us</p>
          <h2>Want to build<br /><i>with us?</i></h2>
          <p>We're always looking for thoughtful engineers and designers. See open roles or say hello.</p>
          <div className="team-cta-actions">
            <Button navigate={navigate} path="/careers" dark>View open roles <span>→</span></Button>
            <Button navigate={navigate} path="/contact">Get in touch <span>↗</span></Button>
          </div>
        </section>
      </ScrollReveal>
    </PageShell>
  )
}
