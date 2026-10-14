import { GlassLink } from '@/components/ui/glass-button'
import { ArrowUpRight } from '@/components/icons/ArrowUpRight'
import BlurText from '@/components/text/BlurText'
import { Project } from '@/types'
import { presentations, projectDetails, PresentationId } from '@/lib/projectPresentation'
export function ProjectCard({ project, index }: { project: Project; index: number; isFeatured?: boolean }) {
 const id = project.id as PresentationId, p = presentations[id], detail = projectDetails[id]
 if (!p) return null
 return <article id={id} aria-labelledby={`${id}-title`} className="project-chapter project-link-card" data-number={`0${index+1}`}><span className="project-watermark" aria-hidden="true">{String(index+1).padStart(2, '0')}</span><div className="project-story"><div className="project-summary"><div className="project-heading"><BlurText as="span" text={`0${index+1} / ${p.category}`} delay={80} animateBy="words" direction="top" className="eyebrow project-category" /></div><div className="project-identity"><h3 id={`${id}-title`}><BlurText as="span" text={p.name} delay={150} animateBy="words" direction="top" className="blur-line" /></h3></div><p className="project-description">{p.description}</p></div><div className="project-detail"><span className="eyebrow">INSIDE THE BUILD</span><h4>{detail.heading}</h4><p>{detail.body}</p><ul className="project-detail-points">{detail.points.map(point => <li key={point}>{point}</li>)}</ul><div className="project-detail-footer"><div className="tech-list">{p.tags.map(t => <span key={t}>{t}</span>)}</div><GlassLink className="action-link" href={p.source} target="_blank" rel="noopener noreferrer">View on GitHub <ArrowUpRight /></GlassLink></div></div></div></article>
}
