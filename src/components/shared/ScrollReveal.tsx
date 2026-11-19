import { useEffect, useRef, useState, type ReactNode } from 'react'
import './ScrollReveal.css'

/**
 * ScrollReveal
 * ------------
 * Wraps any content and animates it based on scroll position:
 *  - When the element scrolls INTO view from the bottom (scrolling down),
 *    it slides UP into place and fades in.
 *  - When the element leaves the viewport (scrolled past / scrolling back up),
 *    it slides DOWN and fades out.
 *
 * Usage:
 *   <ScrollReveal> ...anything... </ScrollReveal>
 *   <ScrollReveal delay={0.15}> ...anything... </ScrollReveal>
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<'hidden' | 'in' | 'out'>('hidden')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // "in" when the element is intersecting the viewport (visible),
        // otherwise "out" (slid down + faded away).
        setState(entry.isIntersecting ? 'in' : 'out')
      },
      {
        // Trigger when the element is roughly 15% inside the viewport,
        // and keep it "hidden" only until its first reveal.
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={`scroll-reveal scroll-reveal--${state} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}
