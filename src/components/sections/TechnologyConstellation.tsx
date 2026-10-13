'use client'
import { TransitionContent, MicroButton } from '@/components/motion/MotionSystem'
import { useState } from 'react'
import { TECHNOLOGIES } from '@/lib/constants'
const clusters = [
  { name: 'AI / ML', ids: ['python', 'pytorch', 'tensorflow', 'transformers', 'rag', 'nlp', 'cv'] },
  { name: 'BACKEND', ids: ['go', 'fastapi', 'postgresql', 'redis', 'kafka'] },
  { name: 'FRONTEND', ids: ['typescript', 'react', 'nextjs', 'threejs', 'r3f', 'gsap'] },
  { name: 'NATIVE', ids: ['swift', 'swiftui'] },
  { name: 'INFRASTRUCTURE', ids: ['docker', 'kubernetes'] },
  { name: 'WEB3', ids: ['solidity', 'foundry', 'typescript'] },
]
export function TechnologyConstellation({ technologies = TECHNOLOGIES }: { technologies?: typeof TECHNOLOGIES }) {
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState('python')
  const cluster = clusters[active]
  const tech = technologies.find(t => t.id === selected)
  const related = clusters.filter(c => c.ids.includes(selected))
  return <div className="technology-explorer"><div className="cluster-tabs" aria-label="Technology clusters">{clusters.map((c, i) => <MicroButton key={c.name} aria-pressed={active === i} onClick={() => { setActive(i); setSelected(c.ids[0]) }}>{c.name}</MicroButton>)}</div><div className="constellation-layout"><div className="constellation-map"><svg viewBox="0 0 600 440" preserveAspectRatio="none" aria-hidden="true"><circle cx="300" cy="220" r="155" /><circle cx="300" cy="220" r="75" />{cluster.ids.map((id, i) => { const angle = i / cluster.ids.length * Math.PI * 2 - Math.PI / 2; return <line key={id} x1="300" y1="220" x2={300 + Math.cos(angle) * 155} y2={220 + Math.sin(angle) * 155} className={selected === id ? 'selected-edge' : ''} /> })}</svg><span className="cluster-center">{cluster.name}<small>{cluster.ids.length} TOOLS</small></span>{cluster.ids.map((id, i) => { const angle = i / cluster.ids.length * Math.PI * 2 - Math.PI / 2; const t = technologies.find(t => t.id === id)!; return <button key={id} className={`technology-node ${selected === id ? 'selected-node' : ''}`} style={{ left: `${50 + Math.cos(angle) * 25.8}%`, top: `${50 + Math.sin(angle) * 35.2}%` }} aria-pressed={selected === id} onClick={() => setSelected(id)}>{t.name}</button> })}</div><div className="technology-detail" aria-live="polite"><TransitionContent identity={selected}><span className="eyebrow">CONNECTED TOOLSET</span><h3>{tech?.name}</h3><p>{tech?.description}</p><span className="eyebrow">RELATED CLUSTERS</span><div className="relationship-list">{related.map(c => <MicroButton key={c.name} type="button" onClick={() => setActive(clusters.indexOf(c))}>{c.name}<span aria-hidden="true"> ↗</span></MicroButton>)}</div><p className="interaction-hint">Choose a cluster, then a node to explore its connections.</p></TransitionContent></div></div></div>
}
