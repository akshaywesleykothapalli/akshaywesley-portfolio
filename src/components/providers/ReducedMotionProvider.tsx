'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface ReducedMotionContextType {
  prefersReducedMotion: boolean
}

const ReducedMotionContext = createContext<ReducedMotionContextType>({ prefersReducedMotion: false })

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  )
}

export function useReducedMotion() {
  const context = useContext(ReducedMotionContext)
  if (!context) {
    throw new Error('useReducedMotion must be used within a ReducedMotionProvider')
  }
  return context
}