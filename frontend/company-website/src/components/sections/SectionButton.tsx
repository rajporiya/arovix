import type { ReactNode } from 'react'

export function Button({ navigate, path, children, dark = false }: { navigate: (path: string) => void; path: string; children: ReactNode; dark?: boolean }) {
  return <button className={`button ${dark ? 'button-dark' : ''}`} type="button" onClick={() => navigate(path)}>{children}</button>
}
