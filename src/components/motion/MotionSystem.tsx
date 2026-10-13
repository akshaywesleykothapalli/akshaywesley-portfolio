'use client'
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { AnimatePresence, LazyMotion, MotionConfig, m, useReducedMotion, useScroll, useSpring, useTransform, HTMLMotionProps } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const
const loadFeatures = () => import('./features').then(module => module.default)
const Preferences = createContext({ reduced: false, compact: true })
export const useMotionPreferences = () => useContext(Preferences)
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = !!useReducedMotion()
  const [compact, setCompact] = useState(true)
  useEffect(() => {
    const query = matchMedia('(max-width: 760px), (hover: none)')
    const update = () => setCompact(query.matches)
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return <Preferences.Provider value={{ reduced, compact }}><LazyMotion features={loadFeatures} strict><MotionConfig reducedMotion="user" transition={{ duration: .18, ease }}>{children}<ScrollProgress /></MotionConfig></LazyMotion></Preferences.Provider>
}
// Server markup and first render stay visible. In-view keyframes provide a small
// emphasis rather than hiding content until JavaScript or the observer runs.
type RevealProps = HTMLMotionProps<'div'> & { as?: 'div' | 'span' | 'p' | 'h2' | 'h3' | 'header' | 'figure' | 'article' | 'li'; delay?: number; kind?: 'rise' | 'fade' | 'visual' | 'major' }
export function Reveal({ as = 'div', delay = 0, kind = 'rise', children, ...props }: RevealProps) {
  const { reduced, compact } = useMotionPreferences()
  const Tag = m[as] as typeof m.div
  return <Tag {...props} data-motion="reveal" initial={false}
    animate={reduced ? { opacity: 1, y: 0, scale: 1 } : undefined}
    whileInView={reduced ? undefined : { opacity: [.82, 1], y: kind === 'fade' ? [0, 0] : [compact ? 8 : 18, 0], scale: kind === 'visual' ? [.985, 1] : [1, 1] }}
    viewport={{ once: true, amount: .12 }}
    transition={{ duration: reduced ? 0 : compact ? .4 : kind === 'major' ? .78 : .58, delay: reduced ? 0 : compact ? Math.min(delay, .06) : Math.min(delay, .24), ease }}>{children}</Tag>
}
export function InteractiveLink(props: HTMLMotionProps<'a'>) {
  const { reduced, compact } = useMotionPreferences()
  return <m.a {...props} data-motion="interaction" whileHover={reduced || compact ? undefined : { scale: 1.015 }} whileTap={reduced ? undefined : { scale: .985 }} />
}
export function MicroButton(props: HTMLMotionProps<'button'>) {
  const { reduced, compact } = useMotionPreferences()
  return <m.button {...props} data-motion="interaction" whileHover={reduced || compact ? undefined : { scale: 1.015 }} whileTap={reduced ? undefined : { scale: .985 }} />
}
export function TransitionContent({ identity, children }: { identity: string; children: ReactNode }) {
  const { reduced, compact } = useMotionPreferences()
  if (reduced) return <div>{children}</div>
  return <AnimatePresence initial={false} mode="wait"><m.div key={identity} initial={{ opacity: .85, y: compact ? 3 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: .8, y: -3 }} transition={{ duration: compact ? .18 : .28, ease }}>{children}</m.div></AnimatePresence>
}
export function MotionCurve({ points }: { points: string }) {
  const { reduced, compact } = useMotionPreferences()
  return <m.polyline points={points} fill="none" stroke="#bacfe2" strokeWidth="2" initial={false} animate={reduced ? { pathLength: 1, opacity: 1 } : undefined} whileInView={reduced ? undefined : { pathLength: [.15, 1], opacity: [.65, 1] }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : compact ? .45 : .75, ease }} />
}
export function ParallaxDecoration({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { reduced, compact } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [8, -8])
  return <m.div ref={ref} className={className} aria-hidden="true" data-motion="decoration" style={{ y: reduced || compact ? 0 : y }}>{children}</m.div>
}
function ScrollProgress() {
  const { reduced } = useMotionPreferences()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 35, mass: .2 })
  return <m.div className="global-scroll-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : smooth }} />
}
