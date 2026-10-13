'use client'
import { useState } from 'react'
import { presentations, PresentationId } from '@/lib/projectPresentation'
import { ScreenshotStage } from './ScreenshotStage'
export function HeroDeck() {
  const [active, setActive] = useState<PresentationId>('ringside')
  return <div className="hero-deck"><div className="deck-label"><span>SELECTED BUILDS / 01—04</span><span>MOVE TO EXPLORE ↗</span></div><ScreenshotStage id={active} priority /><div className="deck-tabs" aria-label="Preview a project">{(Object.keys(presentations) as PresentationId[]).map((id, i) => <button key={id} aria-pressed={active === id} onClick={() => setActive(id)}><small>0{i+1}</small>{presentations[id].name}</button>)}</div></div>
}
