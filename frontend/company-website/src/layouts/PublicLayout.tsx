import type { ReactNode } from 'react'
import { AdvantekNavbar } from '../components/layout/AdvantekNavbar'
import { AdvantekFooter } from '../components/layout/AdvantekFooter'

export function PublicLayout({ path, navigate, children }: { path: string; navigate: (path: string) => void; children: ReactNode }) {
  return <><AdvantekNavbar path={path} navigate={navigate} /><main style={{ paddingTop: '70px' }}>{children}</main><AdvantekFooter navigate={navigate} /></>
}
