import type { ReactNode } from 'react'
import { AboutPage } from '../pages/about/AboutPage'
import { CareersPage } from '../pages/careers/CareersPage'
import { ProjectsPage } from '../pages/projects/ProjectsPage'
import { ServicesPage } from '../pages/services/ServicesPage'
import { ServiceDetailPage } from '../pages/services/ServiceDetailPage'
import { services } from '../pages/services/services.data'
import { TeamPage } from '../pages/team/TeamPage'
import { PricingPage } from '../pages/pricing/PricingPage'
import { Listing } from '../components/shared/Listing'

export function contentRoute(path: string, navigate: (path: string) => void): ReactNode | undefined {
  if (path === '/about') return <AboutPage navigate={navigate} />
  if (path === '/services') return <ServicesPage navigate={navigate} />
  if (path === '/projects') return <ProjectsPage navigate={navigate} />
  if (path === '/team') return <TeamPage navigate={navigate} />
  if (path === '/careers') return <CareersPage navigate={navigate} />
  if (path === '/pricing') return <PricingPage navigate={navigate} />
  if (path.startsWith('/services/')) {
    const slug = path.slice('/services/'.length).replace(/\/+$/, '')
    if (services.some((service) => service.slug === slug)) return <ServiceDetailPage slug={slug} navigate={navigate} />
    return <Listing endpoint="services" navigate={navigate} title={<>Service<br /><i>details.</i></>} intro="Published service details from the Arovix content system." empty="This service is not published." />
  }
  if (path.startsWith('/projects/')) return <Listing endpoint="projects" navigate={navigate} title={<>Project<br /><i>details.</i></>} intro="Published project details from the Arovix content system." empty="This project is not published." />
  if (path.startsWith('/careers/')) return <Listing endpoint="careers" navigate={navigate} title={<>Role<br /><i>details.</i></>} intro="Published career details from the Arovix content system." empty="This role is not published." />
  return undefined
}
