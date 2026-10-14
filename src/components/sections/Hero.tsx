import { ArrowUpRight } from '@/components/icons/ArrowUpRight'
import BlurText from '@/components/text/BlurText'
import { GlassLink } from '@/components/ui/glass-button'
export function Hero() {
  return <section tabIndex={-1} id="hero" className="developer-hero hero-no-previews hero-focused"><div className="hero-composition"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> DEVELOPER / AI · SYSTEMS · NATIVE</p><h1><BlurText as="span" text="AKSHAY" animateBy="words" direction="top" delay={150} className="motion-line blur-line" /><span className="motion-line outlined-name"><BlurText as="span" text="WESLEY" animateBy="words" direction="top" delay={150} className="blur-line name-word" /><span className="name-period">.</span></span></h1><BlurText text="I turn complex ideas into software you can use." delay={150} animateBy="words" direction="top" className="hero-intro" /><div className="hero-actions"><GlassLink href="#work" className="action-link primary-action">View projects <ArrowUpRight /></GlassLink><GlassLink href="#contact" className="action-link secondary-action">Contact me <ArrowUpRight /></GlassLink></div></div></div></section>
}
