import type { ReactNode } from 'react'

export function AdminLayout({ navigate, children }: { navigate: (path: string) => void; children: ReactNode }) {
  return <><header className="admin-header"><button className="brand" type="button" onClick={() => navigate('/')}>↗ BRAINYBEAM / ADMIN</button><button type="button" onClick={() => navigate('/')}>Exit dashboard</button></header><main>{children}</main></>
}
