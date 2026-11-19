export interface ServiceDefinition {
  slug: string
  icon: string
  eyebrow: string
  title: string
  tagline: string
  description: string
  overview: string
  points: string[]
  technologies: string[]
  accent: string
}

export const services: ServiceDefinition[] = [
  {
    slug: 'web-development',
    icon: '01',
    eyebrow: 'Build / 01',
    title: 'Web development',
    tagline: 'Websites and platforms that earn attention — then keep it.',
    description: 'High-performance digital experiences that make ambitious products easier to discover, understand, and use.',
    overview: 'We design and build websites, platforms, and web applications that hold up under real traffic and real expectations. Architecture, interface, accessibility, and performance are shaped together — so the product stays clear, fast, and easy to evolve.',
    points: ['Product-focused architecture', 'Accessible responsive interfaces', 'Reliable APIs and integrations'],
    technologies: ['React', 'Next.js', 'Node.js', 'Laravel'],
    accent: '#ff4f5d',
  },
  {
    slug: 'mobile-applications',
    icon: '02',
    eyebrow: 'Build / 02',
    title: 'Mobile applications',
    tagline: 'Apps that feel native from the first tap — and worth returning to.',
    description: 'Native-quality mobile products designed around real user behavior, from the first interaction to the daily habit.',
    overview: 'We create mobile products for iOS and Android that feel considered from the first launch. Native patterns, offline resilience, and secure integrations are part of the foundation, not an afterthought — so the product works wherever your users do.',
    points: ['iOS and Android experiences', 'Offline-ready workflows', 'Secure platform integrations'],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
    accent: '#8d7bff',
  },
  {
    slug: 'iot-hardware',
    icon: '03',
    eyebrow: 'Connect / 03',
    title: 'IoT & hardware',
    tagline: 'From sensor to signal to decision — connected end to end.',
    description: 'Connected systems that turn signals from the physical world into useful, actionable intelligence.',
    overview: 'We bridge hardware and software so the physical world can be measured, understood, and improved. Firmware, connectivity, dashboards, and cloud telemetry are built as one dependable path from the device to the people acting on its data.',
    points: ['Device and sensor connectivity', 'Operational dashboards', 'Secure cloud telemetry'],
    technologies: ['C++', 'Python', 'Arduino', 'AWS IoT'],
    accent: '#42d6b1',
  },
  {
    slug: 'desktop-solutions',
    icon: '04',
    eyebrow: 'Engineer / 04',
    title: 'Desktop solutions',
    tagline: 'Serious software for work that needs speed and control.',
    description: 'Focused software for teams that need speed, control, and dependable performance across their operating environment.',
    overview: 'We build focused desktop software for teams that depend on local performance, deep system access, and reliable operation. The result is software that fits the working day — quick to open, predictable under load, and trusted with important work.',
    points: ['High-performance applications', 'Internal tools and automation', 'Third-party integrations'],
    technologies: ['.NET', 'C#', 'WPF', 'SQL Server'],
    accent: '#ffb657',
  },
  {
    slug: 'enterprise-systems',
    icon: '05',
    eyebrow: 'Scale / 05',
    title: 'Enterprise systems',
    tagline: 'Connected systems without the weight of unnecessary complexity.',
    description: 'Connected business systems that bring people, processes, and data together without adding unnecessary complexity.',
    overview: 'We connect the tools a business already runs on and replace fragile manual processes with clear, secure workflows. Access control, automation, and reporting are designed together — so the system is easier to adopt, easier to trust, and easier to grow.',
    points: ['Role-based access', 'Workflow automation', 'Reporting and analytics'],
    technologies: ['Java', 'Spring Boot', 'Azure', 'Oracle'],
    accent: '#5ca9ff',
  },
  {
    slug: 'ai-machine-learning',
    icon: '06',
    eyebrow: 'Intelligence / 06',
    title: 'AI & machine learning',
    tagline: 'Practical intelligence, built around real workflows.',
    description: 'Practical intelligence that helps teams make better decisions, automate repetitive work, and move with confidence.',
    overview: 'We turn machine learning into product features people actually use, not experiments that stay in a notebook. Models are integrated with clear guardrails, measurable outcomes, and room to improve as the data and the business evolve.',
    points: ['Predictive modeling', 'LLM integrations', 'Computer vision pipelines'],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
    accent: '#d28cff',
  },
]

export const technologyDetails: Record<string, string> = {
  React: 'Component-driven interfaces with a mature, dependable ecosystem.',
  'Next.js': 'Server rendering, routing, and performance handled at the framework level.',
  'Node.js': 'Fast, event-driven APIs that stay light under load.',
  Laravel: 'Structured PHP backends with the essentials already in place.',
  'React Native': 'One codebase for native-feeling iOS and Android products.',
  Swift: 'Native Apple experiences with full platform access.',
  Kotlin: 'Modern Android development with concise, safe code.',
  Flutter: 'Pixel-consistent interfaces across mobile platforms.',
  'C++': 'Deterministic performance for constrained devices.',
  Python: 'Fast iteration for data, automation, and hardware workflows.',
  Arduino: 'Rapid prototyping for sensors, controllers, and connected hardware.',
  'AWS IoT': 'Managed device connectivity and telemetry at production scale.',
  '.NET': 'A dependable runtime for Windows and cross-platform applications.',
  'C#': 'Strongly typed application logic with excellent tooling.',
  WPF: 'Rich, responsive desktop interfaces on Windows.',
  'SQL Server': 'Reliable relational data, reporting, and operational insight.',
  Java: 'Proven, portable foundations for large and long-lived systems.',
  'Spring Boot': 'Production-ready services with less boilerplate.',
  Azure: 'Cloud infrastructure, identity, and managed services.',
  Oracle: 'Enterprise-grade data storage and operational reliability.',
  TensorFlow: 'Production pipelines for training, evaluation, and inference.',
  PyTorch: 'Flexible model development from research to deployment.',
  OpenAI: 'Practical LLM features grounded in your own data.',
}

export const serviceFaqs = [
  ['How do you estimate a project?', 'We start with a focused discovery conversation, define the first valuable release, and then provide a transparent scope and proposal.'],
  ['Can you work with an existing product team?', 'Yes. We can join as a focused design and engineering partner or work alongside your internal team.'],
  ['Do you support products after launch?', 'We can provide ongoing iteration, maintenance, monitoring, and improvement based on the needs of your product.'],
  ['Can we sign an NDA before sharing details?', 'Yes. Tell us what you need protected and we can arrange the appropriate agreement before discovery.'],
]
