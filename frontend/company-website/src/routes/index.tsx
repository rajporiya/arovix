import type { ReactNode } from 'react'
import { HomePage } from '../pages/home/HomePage'
import { AboutPage } from '../pages/about/AboutPage'
import { ServicesPage } from '../pages/services/ServicesPage'
import { ProjectsPage } from '../pages/projects/ProjectsPage'
import { TeamPage } from '../pages/team/TeamPage'
import { CareersPage } from '../pages/careers/CareersPage'
import { ContactPage } from '../pages/contact/ContactPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Listing } from '../components/shared/Listing'
import { PageShell } from '../components/shared/PageShell'

export function Router({ path, navigate }: { path: string; navigate: (path: string) => void }): ReactNode {
  if (path === '/') return <HomePage navigate={navigate} />
  if (path === '/about') return <AboutPage />
  if (path === '/services') return <ServicesPage navigate={navigate} />
  if (path === '/projects') return <ProjectsPage navigate={navigate} />
  if (path === '/team') return <TeamPage navigate={navigate} />
  if (path === '/careers') return <CareersPage navigate={navigate} />
  if (path === '/contact') return <ContactPage />
  if (path === '/login') return <LoginPage navigate={navigate} />
  if (path === '/admin') return <PageShell title={<>Control<br /><i>the detail.</i></>} intro="The admin workspace connects to the existing protected backend." />
  if (path === '/pricing') return <PageShell title={<>A clear path<br /><i>forward.</i></>} intro="Every engagement is shaped around the problem, the team, and the outcome. Talk to us for a considered proposal." />
  if (path === '/blog') return <PageShell title={<>Thinking out<br /><i>loud.</i></>} intro="Insights publishing is not available in the current backend yet." />
  if (path === '/faq') return <PageShell title={<>Questions,<br /><i>answered.</i></>} intro="The studio FAQ is being prepared. Send us your question directly." />
  if (path === '/privacy' || path === '/terms') return <PageShell title={path === '/privacy' ? <>Privacy<br /><i>policy.</i></> : <>Terms and<br /><i>conditions.</i></>} intro="Legal content must be reviewed and supplied by the company before publication." />
  if (path.startsWith('/services/')) return <Listing endpoint="services" navigate={navigate} title={<>Service<br /><i>details.</i></>} intro="Published service details from the Arovix content system." empty="This service is not published." />
  if (path.startsWith('/projects/')) return <Listing endpoint="projects" navigate={navigate} title={<>Project<br /><i>details.</i></>} intro="Published project details from the Arovix content system." empty="This project is not published." />
  if (path.startsWith('/careers/')) return <Listing endpoint="careers" navigate={navigate} title={<>Role<br /><i>details.</i></>} intro="Published career details from the Arovix content system." empty="This role is not published." />
  return <NotFoundPage navigate={navigate} />
}
