export interface BlogSection {
  heading: string
  paragraphs: string[]
}

export interface BlogArticle {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  accent: string
  sections: BlogSection[]
}

export const articles: BlogArticle[] = [
  {
    slug: 'before-writing-a-line-of-code',
    category: 'Strategy',
    title: 'What we look for before writing a line of code',
    excerpt: 'A good build starts with better questions. Here is the discovery lens we use before choosing a stack, a scope, or a release date.',
    date: 'Oct 14, 2026',
    readTime: '6 min read',
    accent: '#ff4f5d',
    sections: [
      {
        heading: 'Start with the decision',
        paragraphs: [
          'The most useful question at the beginning of a project is not "what should we build?" It is "what decision are we trying to make easier?" A product can be technically correct and still fail if it does not change how someone decides, acts, or works.',
          'We begin by naming the decision in plain language. Who makes it, what information do they need, and what happens today when they do not have it? That single lens usually exposes more value than a long feature list.',
        ],
      },
      {
        heading: 'Make the constraints visible',
        paragraphs: [
          'Every project has real constraints: a launch date, a legacy system, a small team, a compliance requirement, or a budget that cannot move. Pretending those constraints do not exist leads to elegant plans that collapse in delivery.',
          'We put them on the table early and design around them. Sometimes the best first release is smaller than the client expected. That is usually a sign of clarity, not a lack of ambition.',
        ],
      },
      {
        heading: 'Define the first useful release',
        paragraphs: [
          'A first release should be useful before it is complete. We look for the smallest version that a real person can use to complete a real task — not a demo, not a prototype that needs a guided tour.',
          'Once that version is clear, architecture and design decisions become easier. The stack serves the release, the release serves the decision, and the team has a shared definition of progress.',
        ],
      },
    ],
  },
  {
    slug: 'mobile-products-between-sessions',
    category: 'Product',
    title: 'Designing mobile products for the moments between sessions',
    excerpt: 'The best mobile experiences are not only what happens inside the app. They are also what the app makes possible when it is closed.',
    date: 'Sep 30, 2026',
    readTime: '5 min read',
    accent: '#8d7bff',
    sections: [
      {
        heading: 'The session is not the product',
        paragraphs: [
          'When teams design a mobile app, they often focus on the screen flow: onboarding, home, search, profile. Those screens matter, but they are only one part of the experience. The rest of the product happens in the gaps between sessions.',
          'A reminder that arrives at the right moment, a download that finishes while the phone is in a pocket, or a draft that is still there after a commute can matter more than a polished animation on the home screen.',
        ],
      },
      {
        heading: 'Design for interruption',
        paragraphs: [
          'Mobile use is fragmented. People start a task while waiting for coffee and finish it hours later. A product that assumes uninterrupted attention will feel fragile.',
          'We design state to be resumable: save early, make progress visible, and never punish someone for leaving. Offline behavior is part of the same conversation. If the product can do useful work without a signal, say so clearly.',
        ],
      },
      {
        heading: 'Notifications are a product decision',
        paragraphs: [
          'A notification is an interruption with real cost. Before adding one, we ask what decision or action it enables. If the answer is "engagement", it is probably not specific enough.',
          'The strongest mobile products treat attention as a limited resource. They earn the next visit by being useful, not by being loud.',
        ],
      },
    ],
  },
  {
    slug: 'practical-ai-where-to-start',
    category: 'AI',
    title: 'Practical AI: where to start, and where not to',
    excerpt: 'AI becomes useful when it is attached to a workflow, measured against a baseline, and given a clear job to do.',
    date: 'Sep 12, 2026',
    readTime: '7 min read',
    accent: '#d28cff',
    sections: [
      {
        heading: 'Pick a workflow, not a model',
        paragraphs: [
          'The most common AI mistake is starting with a model and looking for a place to put it. A better starting point is a workflow that already costs time, creates errors, or slows a decision.',
          'We look for tasks with a clear input, a recognizable output, and a person who can judge the result. Those are the conditions where a model can be tested honestly.',
        ],
      },
      {
        heading: 'Measure against what happens today',
        paragraphs: [
          'A demo can make almost anything look intelligent. A product has to beat the current process on a metric that matters: time to complete, error rate, response time, or cost per action.',
          'We establish a baseline before building. If the AI feature cannot improve the baseline in a controlled test, it is not ready to ship — no matter how impressive the demo looked.',
        ],
      },
      {
        heading: 'Add guardrails before scale',
        paragraphs: [
          'Guardrails are not an afterthought. They are part of the product: human review for high-stakes decisions, clear labeling of generated content, logging, and a fallback when the model is uncertain.',
          'Start with a narrow job, real users, and a measurable outcome. Expand only when the evidence is clear. That is slower than a launch announcement and much faster than recovering from a feature nobody trusts.',
        ],
      },
    ],
  },
  {
    slug: 'smaller-releases-are-a-strategy',
    category: 'Engineering',
    title: 'Smaller releases are a strategy, not a compromise',
    excerpt: 'Shipping in smaller increments is not a lack of ambition. It is how teams learn faster and reduce the cost of being wrong.',
    date: 'Aug 26, 2026',
    readTime: '4 min read',
    accent: '#42d6b1',
    sections: [
      {
        heading: 'The cost of a big reveal',
        paragraphs: [
          'Large releases concentrate risk. More code, more assumptions, and more time pass before anyone outside the team can react. When something is wrong, the feedback arrives late and the fix is expensive.',
          'Smaller releases spread that risk across time. Each increment is easier to test, easier to explain, and easier to reverse.',
        ],
      },
      {
        heading: 'Progress should be visible',
        paragraphs: [
          'A weekly demo changes the conversation. Instead of reporting percentages, the team can show a working flow and ask a better question: does this solve the problem?',
          'That rhythm also keeps decisions close to the people doing the work. Feedback becomes part of delivery rather than a separate phase that happens after everything is already built.',
        ],
      },
      {
        heading: 'Ambition is not the same as batch size',
        paragraphs: [
          'A team can be deeply ambitious and still ship in small pieces. In fact, the most ambitious products usually need more learning, not less.',
          'The goal is not to avoid the big vision. It is to reach it through a sequence of useful, observable steps that keep the product and the team moving in the right direction.',
        ],
      },
    ],
  },
]

export function findArticle(slug: string): BlogArticle | undefined {
  return articles.find((article) => article.slug === slug)
}
