import { Listing } from '../../components/shared/Listing'
export function ProjectsPage({ navigate }: { navigate: (path: string) => void }) { return <Listing endpoint="projects" navigate={navigate} title={<>Work with<br /><i>purpose.</i></>} intro="Selected projects will appear here when they are published from the studio CMS." empty="No published projects yet. Check back soon." /> }
