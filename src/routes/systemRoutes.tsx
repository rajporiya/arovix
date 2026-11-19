import type { ReactNode } from 'react'
import { ContactPage } from '../pages/contact/ContactPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { BlogPage } from '../pages/blog/BlogPage'
import { BlogArticlePage } from '../pages/blog/BlogArticlePage'
import { findArticle } from '../pages/blog/blog.data'
import { FaqPage } from '../pages/faq/FaqPage'
import { LegalPage } from '../pages/legal/LegalPage'
import { PageShell } from '../components/shared/PageShell'

export function systemRoute(path: string, navigate: (path: string) => void): ReactNode | undefined {
  if (path === '/contact') return <ContactPage />
  if (path === '/login') return <LoginPage navigate={navigate} />
  if (path === '/admin') return <PageShell title={<>Control<br /><i>the detail.</i></>} intro="The admin workspace connects to the existing protected backend." />
  if (path === '/blog') return <BlogPage navigate={navigate} />
  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length).replace(/\/+$/, '')
    const article = findArticle(slug)
    if (article) return <BlogArticlePage article={article} navigate={navigate} />
  }
  if (path === '/faq') return <FaqPage navigate={navigate} />
  if (path === '/privacy') return <LegalPage kind="privacy" navigate={navigate} />
  if (path === '/terms') return <LegalPage kind="terms" navigate={navigate} />
  return undefined
}
