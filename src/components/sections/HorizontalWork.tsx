'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { clamp, createWorkPlan, WorkPlan, workPosition } from '@/lib/workScroll'

/** Native page scrolling owns the journey. No wheel interception or nested scrolling. */
export function HorizontalWork({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current!
    const section = root.closest<HTMLElement>('.work-section')!
    const stage = root.querySelector<HTMLElement>('.work-pin')!
    const viewport = root.querySelector<HTMLElement>('.work-window')!
    const track = root.querySelector<HTMLElement>('.work-track')!
    const cards = Array.from(track.querySelectorAll<HTMLElement>(':scope > .project-chapter'))
    const counter = root.querySelector<HTMLElement>('.work-current')!
    const indicator = root.querySelector<HTMLElement>('.work-progress-fill')!
    const wide = window.matchMedia('(min-height: 500px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let plan: WorkPlan | null = null
    let start = 0
    let enabled = false
    let scrollFrame = 0
    let measureFrame = 0
    let disposed = false
    let activeIndex = -1

    const render = () => {
      scrollFrame = 0
      if (!enabled || !plan) return
      const position = workPosition(plan, window.scrollY - start)
      if (activeIndex !== position.active) {
        activeIndex = position.active
        cards.forEach((card, i) => { card.dataset.active = String(i === activeIndex) })
      }
      track.style.transform = `translate3d(${-position.x}px, 0, 0)`
      cards.forEach((card, i) => { card.style.transform = 'translate3d(0, 0, 0)'; card.querySelector<HTMLElement>('.project-story')!.style.transform = `translate3d(0, ${-position.pans[i]}px, 0)`; card.style.setProperty('--project-reveal', String(position.reveals[i])); card.style.setProperty('--project-detail-reveal', String(position.detailReveals[i])); const open = String(position.detailReveals[i] > .9); if (card.dataset.detailOpen !== open) card.dataset.detailOpen = open })
      counter.textContent = String(position.active + 1).padStart(2, '0')
      indicator.style.transform = `scaleX(${position.fraction})`
    }
    const scheduleRender = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(render) }
    const jumpTo = (index: number, pan = 0, expanded = false) => {
      if (!plan || !enabled) return
      const segment = plan.segments[index]
      window.scrollTo({ top: start + (expanded ? segment.revealEnd : segment.panStart) + clamp(pan, 0, segment.overflow), behavior: 'instant' })
      render()
    }
    const projectHash = () => {
      const index = cards.findIndex(card => `#${card.id}` === window.location.hash)
      if (index >= 0 && enabled) jumpTo(index)
    }
    const measure = () => {
      measureFrame = 0
      if (disposed) return
      const previous = plan
      const previousProgress = window.scrollY - start
      const wasEnabled = enabled
      const wasInside = wasEnabled && previous && previousProgress >= 0 && previousProgress <= previous.duration
      const oldPosition = wasInside && previous ? workPosition(previous, previousProgress) : null
      const verticalCard = !wasEnabled ? cards.findIndex(card => {
        const bounds = card.getBoundingClientRect()
        return bounds.top <= window.innerHeight * 0.5 && bounds.bottom >= 100
      }) : -1
      const verticalPan = verticalCard >= 0 ? Math.max(0, 148 - cards[verticalCard].getBoundingClientRect().top) : 0
      enabled = wide.matches && !reduced.matches
      root.dataset.horizontal = String(enabled)
      section.classList.toggle('has-horizontal-work', enabled)
      if (enabled) {
        cards.forEach(card => {
          const summary = card.querySelector<HTMLElement>('.project-summary')!
          const detail = card.querySelector<HTMLElement>('.project-detail')!
          const story = card.querySelector<HTMLElement>('.project-story')!
          const style = getComputedStyle(card)
          const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
          const available = Math.max(0, viewport.clientHeight - padding)
          const content = Math.max(available, summary.offsetHeight + detail.offsetHeight + 28)
          story.style.height = `${content}px`
          card.dataset.contentHeight = String(content + padding)
          card.style.setProperty('--summary-rest', `${Math.max(0, (available - summary.offsetHeight) / 2)}px`)
          card.style.setProperty('--summary-height', `${summary.offsetHeight}px`)

        })
        root.dataset.horizontal = String(enabled)
        section.classList.toggle('has-horizontal-work', enabled)
      }
      if (!enabled) {
        root.style.removeProperty('height')
        track.style.removeProperty('transform')
        cards.forEach(card => { card.style.removeProperty('transform'); card.style.removeProperty('--project-reveal'); card.style.removeProperty('--project-detail-reveal'); delete card.dataset.detailOpen; delete card.dataset.active; const story = card.querySelector<HTMLElement>('.project-story')!; story.style.removeProperty('height'); story.style.removeProperty('transform'); delete card.dataset.contentHeight })
        activeIndex = -1
        plan = null
        if (oldPosition) {
          const card = cards[oldPosition.active]
          window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - 100 + oldPosition.pans[oldPosition.active], behavior: 'instant' })
        }
        return
      }
      plan = createWorkPlan(cards.map(card => card.offsetLeft), cards.map(card => Number(card.dataset.contentHeight)), viewport.clientWidth, viewport.clientHeight, track.scrollWidth)
      root.style.height = `${stage.offsetHeight + plan.duration}px`
      const stickyTop = parseFloat(getComputedStyle(stage).top)
      start = root.getBoundingClientRect().top + window.scrollY - stickyTop
      if (oldPosition && previous) {
        // Preserve the current reading/transition position through resize or expanded details.
        const oldSegmentIndex = previous.segments.findIndex(segment => previousProgress <= segment.end)
        const index = Math.max(0, oldSegmentIndex)
        const oldSegment = previous.segments[index]
        const newSegment = plan.segments[index]
        const inTransition = previousProgress > oldSegment.readEnd && index < cards.length - 1
        const position = inTransition
          ? newSegment.readEnd + (previousProgress - oldSegment.readEnd) / (oldSegment.end - oldSegment.readEnd) * (newSegment.end - newSegment.readEnd)
          : newSegment.start + clamp(previousProgress - oldSegment.start, 0, newSegment.readEnd - newSegment.start)
        window.scrollTo({ top: start + position, behavior: 'instant' })
      } else if (verticalCard >= 0) jumpTo(verticalCard, verticalPan)
      render()
    }
    const scheduleMeasure = () => { if (!measureFrame) measureFrame = requestAnimationFrame(measure) }
    const focus = (event: FocusEvent) => {
      if (!enabled || !plan) return
      const element = event.target as HTMLElement
      const card = element.closest<HTMLElement>('.project-chapter')
      const index = cards.indexOf(card!)
      if (index < 0) return
      if (element.closest('.project-detail') && workPosition(plan, window.scrollY - start).detailReveals[index] < .99) { jumpTo(index, plan.segments[index].overflow, true); return }
      const bounds = element.getBoundingClientRect()
      const viewBounds = viewport.getBoundingClientRect()
      // The default browser focus scroll cannot follow transformed off-screen panels.
      if (bounds.left < viewBounds.left || bounds.right > viewBounds.right || bounds.top < viewBounds.top || bounds.bottom > viewBounds.bottom) {
        const offset = bounds.top - card!.getBoundingClientRect().top
        jumpTo(index, offset - viewport.clientHeight * 0.35, !!element.closest('.project-detail'))
      }
    }
    const anchor = (event: MouseEvent) => {
      if (!enabled || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const index = cards.findIndex(card => link?.getAttribute('href') === `#${card.id}`)
      if (index < 0) return
      event.preventDefault()
      history.pushState(null, '', `#${cards[index].id}`)
      jumpTo(index)
    }
    const resize = () => { scheduleMeasure() }
    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(viewport)
    cards.forEach(card => { observer.observe(card); const summary = card.querySelector('.project-summary'); const detail = card.querySelector('.project-detail'); if (summary) observer.observe(summary); if (detail) observer.observe(detail) })
    // Font loading and preceding sections can shift the absolute pin start.
    const about = document.getElementById('about')
    const hero = document.getElementById('hero')
    if (about) observer.observe(about)
    if (hero) observer.observe(hero)
    measure()
    projectHash()
    document.fonts.ready.then(() => { if (!disposed) resize() })
    window.addEventListener('scroll', scheduleRender, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('hashchange', projectHash)
    window.addEventListener('popstate', projectHash)
    wide.addEventListener('change', resize)
    reduced.addEventListener('change', resize)
    root.addEventListener('focusin', focus)
    document.addEventListener('click', anchor)
    return () => {
      disposed = true
      cancelAnimationFrame(scrollFrame)
      cancelAnimationFrame(measureFrame)
      observer.disconnect()
      window.removeEventListener('scroll', scheduleRender)
      window.removeEventListener('resize', resize)
      window.removeEventListener('hashchange', projectHash)
      window.removeEventListener('popstate', projectHash)
      wide.removeEventListener('change', resize)
      reduced.removeEventListener('change', resize)
      root.removeEventListener('focusin', focus)
      document.removeEventListener('click', anchor)
      delete root.dataset.horizontal
      section.classList.remove('has-horizontal-work')
      root.style.removeProperty('height')
      track.style.removeProperty('transform')
      cards.forEach(card => { card.style.removeProperty('transform'); card.style.removeProperty('--project-reveal'); card.style.removeProperty('--project-detail-reveal'); delete card.dataset.detailOpen; delete card.dataset.active; const story = card.querySelector<HTMLElement>('.project-story')!; story.style.removeProperty('height'); story.style.removeProperty('transform'); delete card.dataset.contentHeight })
    }
  }, [])
  return <div ref={rootRef} className="work-journey">
    <div className="work-pin">
      <div className="work-scroll-context"><span className="eyebrow">02 / SELECTED WORK <span className="work-context-title">PROJECTS</span></span><span className="work-count"><span className="work-current">01</span> / 04</span><div className="work-progress" aria-hidden="true"><span className="work-progress-fill" /></div></div>
      <div className="work-window"><div className="work-track">{children}</div></div>
    </div>
  </div>
}
