export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  technologies: string[]
  highlights: string[]
  links: {
    live?: string
    github?: string
    caseStudy?: string
  }
  featured: boolean
  category: 'ai' | 'fullstack' | 'backend' | 'mobile' | 'web3'
  year: string
  award?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
  highlights: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  year: string
  category: 'award' | 'hackathon' | 'selection' | 'recognition'
  icon: string
}

export interface Technology {
  id: string
  name: string
  category: 'language' | 'framework' | 'ai' | 'tool' | 'platform'
  description: string
  color: string
  position: [number, number, number]
}

export interface ScrollSection {
  id: string
  name: string
  progress: number
  isActive: boolean
}