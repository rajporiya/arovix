import { PageShell } from '../components/shared/PageShell'
export function NotFoundPage({ navigate }: { navigate: (path: string) => void }) { return <PageShell title={<>Page not<br /><i>found.</i></>} intro="The page you requested does not exist or has moved."><button className="button button-dark" type="button" onClick={() => navigate('/')}>Return home ↗</button></PageShell> }
