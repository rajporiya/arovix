import { PageShell } from '../../components/shared/PageShell'
import { ProjectsShowcase } from '../../components/sections/ProjectsShowcase'
import servicesImage from '../../assets/services.webp'
import './blog.css'

export function BlogPage() {
  return (
    <>
      <PageShell
        title={<>Thinking out<br /><i>loud.</i></>}
        image={servicesImage}
        className="blog-page"
        intro="Insights publishing is not available in the current backend yet."
      />
      <ProjectsShowcase />
    </>
  )
}
