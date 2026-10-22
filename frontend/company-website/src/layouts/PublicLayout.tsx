import type { ReactNode } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

export function PublicLayout({ path, navigate, children }: { path: string; navigate: (path: string) => void; children: ReactNode }) {
  return <><Navbar path={path} navigate={navigate} /><main>{children}</main><Footer navigate={navigate} /></>
}
