export interface ServiceDefinition {
  icon: string
  eyebrow: string
  title: string
  description: string
  points: string[]
  technologies: string[]
  accent: string
}

export const services: ServiceDefinition[] = [
  {
    icon: '01',
    eyebrow: 'Build / 01',
    title: 'Web development',
    description: 'High-performance digital experiences that make ambitious products easier to discover, understand, and use.',
    points: ['Product-focused architecture', 'Accessible responsive interfaces', 'Reliable APIs and integrations'],
    technologies: ['React', 'Next.js', 'Node.js', 'Laravel'],
    accent: '#ff4f5d',
  },
  {
    icon: '02',
    eyebrow: 'Build / 02',
    title: 'Mobile applications',
    description: 'Native-quality mobile products designed around real user behavior, from the first interaction to the daily habit.',
    points: ['iOS and Android experiences', 'Offline-ready workflows', 'Secure platform integrations'],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
    accent: '#8d7bff',
  },
  {
    icon: '03',
    eyebrow: 'Connect / 03',
    title: 'IoT & hardware',
    description: 'Connected systems that turn signals from the physical world into useful, actionable intelligence.',
    points: ['Device and sensor connectivity', 'Operational dashboards', 'Secure cloud telemetry'],
    technologies: ['C++', 'Python', 'Arduino', 'AWS IoT'],
    accent: '#42d6b1',
  },
  {
    icon: '04',
    eyebrow: 'Engineer / 04',
    title: 'Desktop solutions',
    description: 'Focused software for teams that need speed, control, and dependable performance across their operating environment.',
    points: ['High-performance applications', 'Internal tools and automation', 'Third-party integrations'],
    technologies: ['.NET', 'C#', 'WPF', 'SQL Server'],
    accent: '#ffb657',
  },
  {
    icon: '05',
    eyebrow: 'Scale / 05',
    title: 'Enterprise systems',
    description: 'Connected business systems that bring people, processes, and data together without adding unnecessary complexity.',
    points: ['Role-based access', 'Workflow automation', 'Reporting and analytics'],
    technologies: ['Java', 'Spring Boot', 'Azure', 'Oracle'],
    accent: '#5ca9ff',
  },
  {
    icon: '06',
    eyebrow: 'Intelligence / 06',
    title: 'AI & machine learning',
    description: 'Practical intelligence that helps teams make better decisions, automate repetitive work, and move with confidence.',
    points: ['Predictive modeling', 'LLM integrations', 'Computer vision pipelines'],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
    accent: '#d28cff',
  },
]

export const serviceFaqs = [
  ['How do you estimate a project?', 'We start with a focused discovery conversation, define the first valuable release, and then provide a transparent scope and proposal.'],
  ['Can you work with an existing product team?', 'Yes. We can join as a focused design and engineering partner or work alongside your internal team.'],
  ['Do you support products after launch?', 'We can provide ongoing iteration, maintenance, monitoring, and improvement based on the needs of your product.'],
  ['Can we sign an NDA before sharing details?', 'Yes. Tell us what you need protected and we can arrange the appropriate agreement before discovery.'],
]
