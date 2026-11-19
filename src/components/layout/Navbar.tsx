import { useEffect, useState } from 'react'

const links = [['Home', '/'], ['About', '/about'], ['Pages', '/services'], ['Blog', '/blog'], ['Contact', '/contact']]

export function Navbar({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.classList.toggle('locked', open); return () => document.body.classList.remove('locked') }, [open])
  const go = (path: string) => { setOpen(false); navigate(path) }
  return <header className="header"><a className="brand" href="/" onClick={(event) => { event.preventDefault(); go('/') }}><b className="brand-mark">A</b><span>Advan<span className="brand-accent">tek</span></span></a><button className="menu" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Menu'} <span>☰</span></button><nav className={open ? 'nav nav-open' : 'nav'}>{links.map(([label, href]) => <a className={path === href ? 'current' : ''} href={href} key={`${label}-${href}`} onClick={(event) => { event.preventDefault(); go(href) }}>{label}</a>)}</nav><button className="register" type="button" onClick={() => go('/contact')}><span>Get in touch</span><b aria-hidden="true">→</b></button></header>
}
