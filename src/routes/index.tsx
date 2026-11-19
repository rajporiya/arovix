import type { ReactNode } from 'react'
import { AdvantekHomeOne } from '../pages/advantek/AdvantekHomeOne'
import { NotFoundPage } from '../pages/NotFoundPage'
import { contentRoute } from './contentRoutes'
import { systemRoute } from './systemRoutes'

export function Router({ path, navigate }: { path: string; navigate: (path: string) => void }): ReactNode {
  if (path === '/' || path === '/home' || path === '/home-one') return <AdvantekHomeOne navigate={navigate} />
  return contentRoute(path, navigate) ?? systemRoute(path, navigate) ?? <NotFoundPage navigate={navigate} />
}
