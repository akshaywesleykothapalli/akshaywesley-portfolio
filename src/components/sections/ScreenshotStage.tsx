'use client'
import Image from 'next/image'
import { m, useMotionValue, useSpring, useScroll, useTransform, useInView } from 'framer-motion'
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { useMotionPreferences } from '@/components/motion/MotionSystem'
import { presentations, PresentationId } from '@/lib/projectPresentation'
export function ScreenshotStage({ id, priority = false }: { id: PresentationId; priority?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef<string | null>(null)
  const title = useId()
  const inView = useInView(ref, { amount: .1 })
  const [pageVisible, setPageVisible] = useState(true)
  useEffect(() => { const update = () => setPageVisible(!document.hidden); update(); document.addEventListener('visibilitychange', update); return () => document.removeEventListener('visibilitychange', update) }, [])
  const { reduced, compact } = useMotionPreferences()
  const px = useMotionValue(0), py = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const mobileX = useTransform(scrollYProgress, [0, 1], [1, -1])
  const mobileY = useTransform(scrollYProgress, [0, 1], [-1, 1])
  const rx = useTransform(() => py.get() + (scrollYProgress.get() - .5) * -3)
  const ry = useTransform(() => -1.5 + px.get() + (scrollYProgress.get() - .5) * 3)
  const rotateX = useSpring(rx, { stiffness: 100, damping: 24 })
  const rotateY = useSpring(ry, { stiffness: 100, damping: 24 })
  const restore = () => { if (previousOverflow.current !== null) { document.body.style.overflow = previousOverflow.current; previousOverflow.current = null } }
  useEffect(() => () => { if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current }, [])
  const project = presentations[id]
  const name = project.name
  const [nativeSize, setNativeSize] = useState(false)
  return <figure ref={ref} className="screenshot-stage" style={{ '--screen-ratio': project.width / project.height } as CSSProperties} onPointerMove={e => { if (reduced || compact || e.pointerType !== 'mouse') return; const b = e.currentTarget.getBoundingClientRect(); px.set(((e.clientX-b.left)/b.width-.5)*6); py.set(-((e.clientY-b.top)/b.height-.5)*5) }} onPointerLeave={() => { px.set(0); py.set(0) }}>
    <div className="screen-echo echo-one" aria-hidden="true" /><div className="screen-echo echo-two" aria-hidden="true" />
    <m.div className="screen-plane" style={{ rotateX: reduced ? 0 : compact ? mobileX : rotateX, rotateY: reduced ? 0 : compact ? mobileY : rotateY, animationPlayState: reduced || compact || !inView || !pageVisible ? 'paused' : 'running' }}>
      <div className="screen-bar"><span className="screen-dots" aria-hidden="true">● ● ●</span><span>{name} / interface</span><span aria-hidden="true">↗</span></div>
      <Image src={project.image} alt={`${name} application interface`} width={project.width} height={project.height} priority={priority} unoptimized draggable={false} style={{ aspectRatio: `${project.width} / ${project.height}` }} />
    </m.div>
    <figcaption><span>ACTUAL PROJECT INTERFACE</span><button ref={trigger} onClick={() => { previousOverflow.current = document.body.style.overflow; document.body.style.overflow = 'hidden'; dialog.current?.showModal() }}>Enlarge screenshot <span aria-hidden="true">↗</span></button></figcaption>
    <dialog ref={dialog} className="screenshot-dialog" aria-labelledby={title} onClose={() => { setNativeSize(false); restore(); trigger.current?.focus({ preventScroll: true }) }} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close() }}><div className="dialog-toolbar"><h2 id={title}>{name} — interface</h2><div className="dialog-actions"><button aria-pressed={nativeSize} onClick={() => setNativeSize(!nativeSize)}>{nativeSize ? 'Fit to window' : 'View at 100%'}</button><button onClick={() => dialog.current?.close()} autoFocus>Close ×</button></div></div><div className="dialog-image-view" data-native={nativeSize}><Image src={project.image} alt={`${name} application interface, full view`} width={project.width} height={project.height} unoptimized style={nativeSize ? { width: project.width, maxWidth: 'none' } : undefined} /></div></dialog>
  </figure>
}
