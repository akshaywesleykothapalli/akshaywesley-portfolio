'use client'

import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from '@/components/icons/ArrowUpRight'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const media = gsap.matchMedia()
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const xTo = gsap.quickTo(element, 'x', { duration: .4, ease: 'power3.out' })
      const yTo = gsap.quickTo(element, 'y', { duration: .4, ease: 'power3.out' })
      const move = (event: MouseEvent) => {
        const box = element.getBoundingClientRect()
        xTo(gsap.utils.clamp(-12, 12, (event.clientX - box.left - box.width / 2) * .18))
        yTo(gsap.utils.clamp(-8, 8, (event.clientY - box.top - box.height / 2) * .18))
      }
      const leave = () => { xTo(0); yTo(0) }
      element.addEventListener('mousemove', move)
      element.addEventListener('mouseleave', leave)
      element.addEventListener('blur', leave)
      return () => {
        element.removeEventListener('mousemove', move)
        element.removeEventListener('mouseleave', leave)
        element.removeEventListener('blur', leave)
      }
    })
    return () => media.revert()
  }, [])
  return ref
}

function MagneticLink({ className, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const ref = useMagnetic<HTMLAnchorElement>()
  return <a ref={ref} className={cn('footer-glass-pill', className)} {...props}>{children}</a>
}

function TopButton() {
  const ref = useMagnetic<HTMLButtonElement>()
  return <button ref={ref} type="button" className="footer-glass-pill footer-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 10 7-7 7 7M12 3v18" /></svg></button>
}

const disciplines = ['AI systems', 'Web applications', 'Native software', 'Ideas into interfaces']
function MarqueeItem() {
  return <div className="footer-marquee-item">{disciplines.map(text => <span key={text}>{text}<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="m8 0 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" /></svg></span>)}</div>
}

export function CinematicFooter({ year }: { year: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(giantRef.current, { y: 70, scale: .88, opacity: .35 }, { y: 0, scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom bottom', scrub: .45 } })
      gsap.fromTo([headingRef.current, linksRef.current], { y: 35, opacity: .25 }, { y: 0, opacity: 1, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: wrapper, start: 'top 70%', end: 'top 10%', scrub: .45 } })
    })
    const visibility = new IntersectionObserver(([entry]) => { wrapper.dataset.visible = String(entry.isIntersecting) }, { rootMargin: '120px' })
    visibility.observe(wrapper)
    let frame = 0, disposed = false
    const refresh = () => { if (disposed) return; cancelAnimationFrame(frame); frame = requestAnimationFrame(() => ScrollTrigger.refresh()) }
    const observer = new ResizeObserver(refresh)
    const main = document.querySelector('main')
    if (main) observer.observe(main)
    document.fonts.ready.then(refresh)
    return () => { disposed = true; visibility.disconnect(); observer.disconnect(); cancelAnimationFrame(frame); media.revert() }
  }, [])

  return <div ref={wrapperRef} id="contact" tabIndex={-1} className="cinematic-footer-curtain" aria-labelledby="footer-heading">
    <footer className="cinematic-footer-wrapper">
      <div className="footer-aurora" aria-hidden="true" />
      <div className="footer-bg-grid" aria-hidden="true" />
      <div ref={giantRef} className="footer-giant-bg-text" aria-hidden="true">WESLEY</div>
      <div className="footer-marquee" aria-hidden="true"><div className="footer-marquee-track"><MarqueeItem /><MarqueeItem /></div></div>
      <div className="footer-center">
        <span className="footer-kicker">04 / CONTACT</span>
        <h2 ref={headingRef} id="footer-heading" className="footer-text-glow">Let’s build<br />something good.</h2>
        <div ref={linksRef} className="footer-links">
          <MagneticLink className="footer-email" href="mailto:akshaywesleyk@gmail.com">akshaywesleyk@gmail.com <ArrowUpRight /></MagneticLink>
          <div className="footer-socials">
            <MagneticLink href="https://github.com/akshaywesleykothapalli" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight /></MagneticLink>
            <MagneticLink href="https://linkedin.com/in/akshay-wesley-kothapalli-966738378" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight /></MagneticLink>
          </div>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <span className="footer-copyright">© {year} Akshay Wesley</span>
        <TopButton />
      </div>
    </footer>
  </div>
}
