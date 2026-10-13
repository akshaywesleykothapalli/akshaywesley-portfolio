'use client'
import { ArrowUpRight } from '@/components/icons/ArrowUpRight'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useMotionPreferences } from '@/components/motion/MotionSystem'
const sections = [{ id: 'about', label: 'About' }, { id: 'work', label: 'Work' }, { id: 'experience', label: 'Experience' }, { id: 'contact', label: 'Contact' }]
export function Navigation() {
 const [active, setActive] = useState('hero'), [open, setOpen] = useState(false)
 const [scrolled, setScrolled] = useState(false)
 const nav = useRef<HTMLElement>(null)
 const toggle = useRef<HTMLButtonElement>(null), panel = useRef<HTMLDivElement>(null)
 const { reduced } = useMotionPreferences()
 useEffect(() => {
  let frame = 0, settle = 0, lastY = window.scrollY, lastTime = performance.now()
  const update = () => { frame = 0; let current = 'hero'; sections.forEach(s => { if ((document.getElementById(s.id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .35) current = s.id }); setActive(current); setScrolled(window.scrollY > 24); const now = performance.now(); const speed = Math.abs(window.scrollY - lastY) / Math.max(16, now - lastTime); lastY = window.scrollY; lastTime = now; nav.current?.style.setProperty('--header-motion', `${reduced ? 0 : Math.min(5, speed * 2)}px`); clearTimeout(settle); settle = window.setTimeout(() => nav.current?.style.setProperty('--header-motion', '0px'), 120) }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
  const observer = new ResizeObserver(schedule); const main = document.querySelector('main'); if (main) observer.observe(main)
  addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); update()
  return () => { removeEventListener('scroll', schedule); removeEventListener('resize', schedule); observer.disconnect(); cancelAnimationFrame(frame); clearTimeout(settle) }
 }, [reduced])
 useEffect(() => {
  if (!open) return
  panel.current?.querySelector<HTMLAnchorElement>('a')?.focus()
  const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus() } }
  const outside = (e: PointerEvent) => { if (!panel.current?.contains(e.target as Node) && !toggle.current?.contains(e.target as Node)) setOpen(false) }
  document.addEventListener('keydown', key); document.addEventListener('pointerdown', outside)
  return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside) }
 }, [open])
 const label = sections.find(s => s.id === active)?.label ?? 'Menu'
 return <nav ref={nav} className="floating-navigation" data-scrolled={scrolled} aria-label="Main navigation">
  <div className="header-atmosphere" aria-hidden="true"><i /><i /><i /></div>
  <a className="nav-brand" href="#hero" onClick={() => setOpen(false)} aria-label="Akshay Wesley, home">AW<span>_</span></a>
  <m.div layout={!reduced} className="glass-dock" data-open={open} transition={{ type: 'spring', stiffness: 320, damping: 32, mass: .8 }}>
   <button ref={toggle} className="glass-toggle" aria-label={open ? 'Close navigation' : `Open navigation, current section: ${label}`} aria-expanded={open} aria-controls="glass-navigation" onClick={() => setOpen(!open)}>
    <AnimatePresence initial={false} mode="wait"><m.span key={open ? 'navigation' : label} className="dock-word" initial={{ opacity: 0, y: reduced ? 0 : 4, filter: reduced ? 'none' : 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: reduced ? 0 : -4, filter: reduced ? 'none' : 'blur(4px)' }} transition={{ duration: reduced ? 0 : .18 }}>{open ? 'Navigation' : label}</m.span></AnimatePresence>
    <span className="dock-icon" aria-hidden="true"><i /><i /></span>
   </button>
   <AnimatePresence initial={false}>{open && <m.div ref={panel} id="glass-navigation" className="glass-panel" initial={{ height: 0, opacity: 0, filter: reduced ? 'none' : 'blur(6px)' }} animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }} exit={{ height: 0, opacity: 0, filter: reduced ? 'none' : 'blur(6px)' }} transition={{ height: { duration: reduced ? 0 : .32, ease: [.22, 1, .36, 1] }, opacity: { duration: reduced ? 0 : .2 }, filter: { duration: reduced ? 0 : .25 } }}>
    <div className="glass-panel-inner">{sections.map(s => <a key={s.id} href={`#${s.id}`} tabIndex={open ? 0 : -1} aria-current={active === s.id ? 'location' : undefined} onClick={() => { setOpen(false); document.getElementById(s.id)?.focus({ preventScroll: true }) }}>{s.label}<ArrowUpRight /></a>)}</div>
   </m.div>}</AnimatePresence>
  </m.div>
 </nav>
}
