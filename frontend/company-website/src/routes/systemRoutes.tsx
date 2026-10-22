import type { ReactNode } from 'react'
import { ContactPage } from '../pages/contact/ContactPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { PageShell } from '../components/shared/PageShell'

export function systemRoute(path: string, navigate: (path: string) => void): ReactNode | undefined {
  if (path === '/contact') return <ContactPage />
  if (path === '/login') return <LoginPage navigate={navigate} />
  if (path === '/admin') return <PageShell title={<>Control<br /><i>the detail.</i></>} intro="The admin workspace connects to the existing protected backend." />
  if (path === '/blog') return <PageShell title={<>Thinking out<br /><i>loud.</i></>} intro="Insights publishing is not available in the current backend yet." />
  if (path === '/faq') return <PageShell title={<>Questions,<br /><i>answered.</i></>} intro="The studio FAQ is being prepared. Send us your question directly." />
  if (path === '/privacy' || path === '/terms') return <PageShell title={path === '/privacy' ? <>Privacy<br /><i>policy.</i></> : <>Terms and<br /><i>conditions.</i></>} intro="Legal content must be reviewed and supplied by the company before publication." />
  return undefined
}
