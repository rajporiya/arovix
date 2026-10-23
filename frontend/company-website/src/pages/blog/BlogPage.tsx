import { PageShell } from '../../components/shared/PageShell'
import { ProjectsShowcase } from '../../components/sections/ProjectsShowcase'
import servicesImage from '../../assets/services.webp'

export function BlogPage() {
  return (
    <>
      <PageShell
        title={<>Thinking out<br /><i>loud.</i></>}
        image={servicesImage}
        intro="Insights publishing is not available in the current backend yet."
      />
      <ProjectsShowcase />
    </>
  )
}
