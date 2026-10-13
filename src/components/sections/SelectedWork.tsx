import { SectionLabel } from '@/components/text/SectionLabel'
import BlurText from '@/components/text/BlurText'
import { PROJECTS } from '@/lib/constants'
import { ProjectCard } from './ProjectCard'
import { HorizontalWork } from './HorizontalWork'
export function SelectedWork() {
 return <section tabIndex={-1} id="work" className="editorial-section work-section"><header className="editorial-header"><SectionLabel text="02 / SELECTED WORK" /><h2><BlurText as="span" text="IDEAS INTO" delay={150} animateBy="words" direction="top" className="blur-line" /><BlurText as="span" text="INTERFACES." delay={150} animateBy="words" direction="top" className="blur-line" /></h2><p>Four projects. A closer look.</p></header><HorizontalWork>{PROJECTS.filter(p => p.featured).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</HorizontalWork></section>
}
