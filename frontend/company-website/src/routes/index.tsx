import type { ReactNode } from 'react'
import { HomePage } from '../pages/home/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { contentRoute } from './contentRoutes'
import { systemRoute } from './systemRoutes'

export function Router({ path, navigate }: { path: string; navigate: (path: string) => void }): ReactNode {
  if (path === '/') return <HomePage navigate={navigate} />
  return contentRoute(path, navigate) ?? systemRoute(path, navigate) ?? <NotFoundPage navigate={navigate} />
}
