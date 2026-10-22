import type { ReactNode } from 'react'
import { Footer } from '../components/layout/Footer'

export function AuthLayout({ navigate, children }: { navigate: (path: string) => void; children: ReactNode }) {
  return <><main>{children}</main><Footer navigate={navigate} /></>
}
