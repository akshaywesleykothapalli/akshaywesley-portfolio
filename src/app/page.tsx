import { MotionProvider } from '@/components/motion/MotionSystem'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ReducedMotionProvider } from '@/components/providers/ReducedMotionProvider'

export default function Home() {
  return (
    <ReducedMotionProvider><MotionProvider>
        <Navigation />
        <main id="main-content" tabIndex={-1} className="content-layer">
          <Hero />
          <About />
          <SelectedWork />
          <Experience />
          <Contact />
        </main>
        <Footer />
    </MotionProvider></ReducedMotionProvider>
  )
}