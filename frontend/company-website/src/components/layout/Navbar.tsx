import { useEffect, useState } from 'react'

const links = [['About', '/about'], ['Services', '/services'], ['Projects', '/projects'], ['Team', '/team'], ['Careers', '/careers'], ['Insights', '/blog']]

export function Navbar({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.classList.toggle('locked', open); return () => document.body.classList.remove('locked') }, [open])
  const go = (path: string) => { setOpen(false); navigate(path) }
  return <header className="header"><a className="brand" href="/" onClick={(event) => { event.preventDefault(); go('/') }}><b>↗</b> AROVIX</a><button className="menu" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Menu'} <span>☰</span></button><nav className={open ? 'nav nav-open' : 'nav'}>{links.map(([label, href]) => <a className={path === href ? 'current' : ''} href={href} key={href} onClick={(event) => { event.preventDefault(); go(href) }}>{label}</a>)}<a className="nav-cta" href="/contact" onClick={(event) => { event.preventDefault(); go('/contact') }}>Start a project ↗</a></nav></header>
}
