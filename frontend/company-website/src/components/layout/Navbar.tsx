import { useEffect, useState } from 'react'

const links = [['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Pricing', '/pricing'], ['Solution', '/services'], ['Blog', '/blog']]

export function Navbar({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.classList.toggle('locked', open); return () => document.body.classList.remove('locked') }, [open])
  const go = (path: string) => { setOpen(false); navigate(path) }
  return <header className="header"><a className="brand" href="/" onClick={(event) => { event.preventDefault(); go('/') }}><b className="brand-mark">N</b><span>Nova<span className="brand-accent">Craft</span></span></a><button className="menu" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Menu'} <span>☰</span></button><nav className={open ? 'nav nav-open' : 'nav'}>{links.map(([label, href]) => <a className={path === href ? 'current' : ''} href={href} key={`${label}-${href}`} onClick={(event) => { event.preventDefault(); go(href) }}>{label}{label === 'Services' && <span className="nav-chevron">⌄</span>}</a>)}<button className="language" type="button">◎ English</button></nav><button className="register" type="button" onClick={() => go('/contact')}>Register</button></header>
}
