import { Reveal, InteractiveLink, ParallaxDecoration } from '@/components/motion/MotionSystem'
import { ACHIEVEMENTS } from '@/lib/constants'
export function Achievements() {
  return <section tabIndex={-1} id="achievements" className="editorial-section achievements-section">
    <span className="eyebrow">04 / RECOGNITION</span>
    <div className="science-award"><ParallaxDecoration className="award-orbit"><i /><i /><i /><span>2025</span></ParallaxDecoration><div className="science-copy"><Reveal as="p" className="eyebrow" kind="fade">NASA SPACE APPS CHALLENGE 2025</Reveal><Reveal as="h2" delay={0.08} kind="major">BEST USE<br />OF SCIENCE<span className="blue-period">.</span></Reveal><Reveal as="p" className="award-project" delay={0.14} kind="rise">ExoPlanet AI Observatory</Reveal><Reveal as="div" className="award-evidence" delay={0.2} kind="fade"><span><strong>94.8%</strong> precision</span><span><strong>150,000+</strong> records</span><span>RF Ensemble</span><span>Kepler / TESS</span></Reveal><InteractiveLink href="#exoplanet" className="action-link">Explore the observatory <span aria-hidden="true">↗</span></InteractiveLink></div></div>
    <div className="recognition-ledger">{ACHIEVEMENTS.filter(a => a.id !== 'nasa-award').map(a => <article key={a.id}><span className="eyebrow">{a.year} / {a.category}</span><h3>{a.title}</h3><p>{a.description}</p></article>)}</div>
  </section>
}
