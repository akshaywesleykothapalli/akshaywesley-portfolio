import { Reveal } from '@/components/motion/MotionSystem'
import { TechnologyConstellation } from './TechnologyConstellation'
export function TechnologyPlayground() {
  return <section tabIndex={-1} id="technology" className="editorial-section technology-section"><Reveal as="header" className="editorial-header" delay={0} kind="rise"><span className="eyebrow">05 / TECHNOLOGY PLAYGROUND</span><h2>A connected<br /><span>way of building.</span></h2><p>Explore the tools across disciplines and the connections between them.</p></Reveal><TechnologyConstellation /></section>
}
