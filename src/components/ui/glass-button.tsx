'use client'
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

export function useMagnetic<T extends HTMLElement>(lift = false) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const media = gsap.matchMedia()
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const xTo = gsap.quickTo(element, 'x', { duration: .4, ease: 'power3.out' })
      const yTo = gsap.quickTo(element, 'y', { duration: .4, ease: 'power3.out' })
      const scaleXTo = lift ? gsap.quickTo(element, 'scaleX', { duration: .4, ease: 'power3.out' }) : undefined
      const scaleYTo = lift ? gsap.quickTo(element, 'scaleY', { duration: .4, ease: 'power3.out' }) : undefined
      const scaleTo = (value: number) => { scaleXTo?.(value); scaleYTo?.(value) }
      const enter = () => { if (lift) { scaleTo?.(1.025); yTo(-2) } }
      const move = (event: MouseEvent) => {
        const box = element.getBoundingClientRect()
        xTo(gsap.utils.clamp(-12, 12, (event.clientX - box.left - box.width / 2) * .18))
        yTo(gsap.utils.clamp(-8, 8, (event.clientY - box.top - box.height / 2) * .18) - (lift ? 2 : 0))
      }
      const leave = () => { xTo(0); yTo(0); scaleTo?.(1) }
      element.addEventListener('mouseenter', enter)
      element.addEventListener('mousemove', move)
      element.addEventListener('mouseleave', leave)
      element.addEventListener('blur', leave)
      return () => {
        element.removeEventListener('mouseenter', enter)
        element.removeEventListener('mousemove', move)
        element.removeEventListener('mouseleave', leave)
        element.removeEventListener('blur', leave)
      }
    })
    return () => media.revert()
  }, [lift])
  return ref
}

export function GlassLink({ className, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const ref = useMagnetic<HTMLAnchorElement>()
  return <a ref={ref} className={cn('footer-glass-pill glass-button', className)} {...props}>{children}</a>
}

