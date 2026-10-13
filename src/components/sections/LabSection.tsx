'use client'
import { SectionLabel } from '@/components/text/SectionLabel'
import BlurText from '@/components/text/BlurText'
import { Reveal, MicroButton, TransitionContent } from '@/components/motion/MotionSystem'
import { useState } from 'react'
import { LAB_THEMES } from '@/lib/constants'
const questions: Record<string, string> = {
  'local-llms': 'How much intelligence can run locally?',
  'small-transformers': 'What can a smaller model understand?',
  'voice-ai': 'How can speech become a useful interface?',
  rag: 'How can retrieval keep an answer grounded?',
  agents: 'How should an agent decide its next step?',
  web3: 'What belongs in decentralized infrastructure?',
}
export function LabSection({ themes = LAB_THEMES }: { themes?: typeof LAB_THEMES }) {
  const [active, setActive] = useState(themes[0].id)
  const selected = themes.find(t => t.id === active)!
  const number = String(themes.findIndex(t => t.id === active) + 1).padStart(3, '0')
  return <section tabIndex={-1} id="lab" className="editorial-section lab-section">
    <Reveal as="header" className="editorial-header" delay={0} kind="rise"><SectionLabel text="04 / OPEN EXPLORATIONS" /><h2><BlurText as="span" text="The lab_" delay={150} animateBy="words" direction="top" className="blur-line" /></h2><p>An open notebook of experiments. Questions worth pursuing.</p></Reveal>
    <div className="lab-console">
      <div className="lab-index" aria-label="Experiments">{themes.map((t, i) => <MicroButton key={t.id} aria-pressed={active === t.id} onClick={() => setActive(t.id)}><span>{String(i + 1).padStart(2, '0')}</span>{t.title}<i>Exploring</i></MicroButton>)}</div>
      <div className="lab-detail" aria-live="polite"><TransitionContent identity={active}>
        <div className="lab-state"><span className="eyebrow">EXP / {number}</span><span className="experiment-status">EXPLORING</span></div>
        <h3>{selected.title}</h3><SectionLabel text="THE QUESTION" /><p className="research-question">{questions[selected.id]}</p>

        <p className="lab-footnote">Open experiment · continuously evolving</p>
      </TransitionContent></div>
    </div>
  </section>
}
