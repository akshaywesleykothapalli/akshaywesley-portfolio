'use client'
import { useEffect, useRef, useState, PointerEvent } from 'react'
import { m, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useMotionPreferences } from '@/components/motion/MotionSystem'

/** A kinetic studio collage: actual projects, a custom graphic, no simulated data. */
export function HeroStudio() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: .1 })
  const { reduced, compact } = useMotionPreferences()
  const [paused, setPaused] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 90, damping: 22 })
  const rotateY = useSpring(y, { stiffness: 90, damping: 22 })
  const moving = visible && pageVisible && !reduced && !compact && !paused
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  const reset = () => { x.set(0); y.set(0) }
  const pointer = (event: PointerEvent<HTMLDivElement>) => {
    if (!moving || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set(-((event.clientY - bounds.top) / bounds.height - .5) * 10)
    y.set(((event.clientX - bounds.left) / bounds.width - .5) * 12)
  }
  return <div ref={ref} className="hero-studio" data-running={moving}>
    <div className="studio-heading"><span>A few things I&apos;ve made</span><button type="button" className="studio-motion-toggle" onClick={() => { setPaused(!paused); reset() }} aria-pressed={paused} disabled={reduced || compact}>{reduced || compact ? 'Still view' : paused ? 'Play motion ↗' : 'Pause motion Ⅱ'}</button></div>
    <div className="studio-perspective" onPointerMove={pointer} onPointerLeave={reset}>
      <m.div className="studio-composition" style={{ rotateX: moving ? rotateX : 0, rotateY: moving ? rotateY : 0 }}>
        <div className="studio-orbit" aria-hidden="true" />
        <svg className="studio-flower" viewBox="0 0 320 320" aria-hidden="true"><g>{Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="160" cy="91" rx="24" ry="76" transform={`rotate(${i * 30} 160 160)`} />)}<circle cx="160" cy="160" r="43" /></g></svg>
        <div className="studio-card-wrap studio-card-one"><a href="#ringside" className="studio-card"><span className="studio-card-label">01 / VOICE AI <span aria-hidden="true">↗</span></span><strong>Ringside</strong><div className="studio-wave" aria-hidden="true">{[18,30,46,26,58,42,65,30,48,24,38,18].map((height, i) => <i key={i} style={{ height }} />)}</div><small>Intelligence in the conversation.</small></a></div>
        <div className="studio-card-wrap studio-card-two"><a href="#exoplanet" className="studio-card"><span className="studio-card-label">02 / SCIENCE <span aria-hidden="true">↗</span></span><strong>ExoPlanet</strong><svg className="studio-transit" viewBox="0 0 180 50" aria-hidden="true"><path d="M0 13 L30 14 L45 12 L60 14 L70 13 L78 35 L90 39 L103 36 L111 13 L130 12 L150 14 L180 13" /></svg><small>Best Use of Science · NASA Space Apps 2025</small></a></div>
        <span className="studio-stamp" aria-hidden="true">Ideas.<br />Made real.</span>
      </m.div>
    </div>
    <p className="studio-caption">A little research. A lot of building.</p>
  </div>
}
