import BlurText from './BlurText'
export function SectionLabel({ text }: { text: string }) {
 return <BlurText as="span" text={text} delay={70} animateBy="words" direction="top" className="eyebrow section-label blur-line" />
}
