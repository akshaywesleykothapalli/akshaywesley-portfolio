import { SectionLabel } from '@/components/text/SectionLabel'
import BlurText from '@/components/text/BlurText'
import { Reveal } from '@/components/motion/MotionSystem'
import { EXPERIENCE } from '@/lib/constants'
export function Experience() {
  return <section tabIndex={-1} id="experience" className="editorial-section experience-section">
    <Reveal as="header" className="editorial-header" delay={0} kind="rise"><SectionLabel text="03 / EXPERIENCE" /><h2><BlurText as="span" text="IN PRACTICE." delay={150} animateBy="words" direction="top" className="blur-line" /></h2></Reveal>
    <div className="experience-ledger">{EXPERIENCE.map((exp, i) => <article key={exp.id} className="experience-entry"><Reveal as="div" className="experience-date" delay={0} kind="fade"><span className="eyebrow">{String(i + 1).padStart(2, '0')} / {exp.period}</span></Reveal><div><Reveal as="h3" delay={0.06} kind="rise">{exp.role}</Reveal><p className="experience-organization">{exp.company}</p><Reveal className="tech-list" delay={.18}>{exp.technologies.slice(0, 3).map(t => <span key={t}>{t}</span>)}</Reveal></div></article>)}</div>
  </section>
}
