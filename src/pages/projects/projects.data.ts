export interface ProjectCaseStudy {
  name: string
  type: string
  year: string
  description: string
  href: string
  accent: string
  tags: string[]
}

export const projects: ProjectCaseStudy[] = [
  {
    name: 'Botbuzz',
    type: 'Digital platform',
    year: '2025',
    description: 'A focused digital experience built to help teams connect, engage, and grow. We shaped the product direction, interface, and front-end experience around the way real teams work.',
    href: 'https://botbuz.com/',
    accent: '#6366f1',
    tags: ['Product direction', 'Web platform', 'Frontend'],
  },
  {
    name: 'Zippix CRM',
    type: 'CRM platform',
    year: '2026',
    description: 'A streamlined customer relationship platform for managing sales and daily operations. The work focused on clear workflows, fast access to customer context, and dependable day-to-day use.',
    href: 'https://dev.app.zippix.in/',
    accent: '#8d7bff',
    tags: ['Web application', 'Workflows', 'Operations'],
  },
]

export const projectPrinciples = [
  ['Start with the real workflow', 'We map how the work happens today before deciding what the product should look like.'],
  ['Design for the daily user', 'The interface is shaped around repeatable tasks, not a one-time demo.'],
  ['Build for the next release', 'The architecture and design system stay clear enough to extend after launch.'],
]
