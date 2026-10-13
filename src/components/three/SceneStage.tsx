'use client'

import { Component, ReactNode, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function ContextWatcher({ onLoss }: { onLoss: () => void }) {
  const gl = useThree(state => state.gl)
  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('webglcontextlost', onLoss)
    return () => canvas.removeEventListener('webglcontextlost', onLoss)
  }, [gl, onLoss])
  return null
}

/** The Hero renders on demand; reduced motion and unavailable WebGL use a static visual. */
export function SceneStage({ children, label, fallback }: { children: ReactNode; label: string; fallback: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [compact, setCompact] = useState(true)
  const [supported, setSupported] = useState(true)
  const { prefersReducedMotion } = useReducedMotion()
  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)')
    const resize = () => setCompact(query.matches || ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) < 4)
    resize(); query.addEventListener('change', resize)
    const element = ref.current!
    const nearby = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '180px' })
    nearby.observe(element)
    const probe = document.createElement('canvas')
    const context = probe.getContext('webgl2') || probe.getContext('webgl')
    setSupported(!!context)
    context?.getExtension('WEBGL_lose_context')?.loseContext()
    return () => { nearby.disconnect(); query.removeEventListener('change', resize) }
  }, [])
  const staticScene = <div className="scene-fallback">{fallback}</div>
  return <div ref={ref} className="scene-stage" role="img" aria-label={label}>
    {(!near || !supported || prefersReducedMotion) ? staticScene : <SceneBoundary fallback={staticScene}>
      <Canvas camera={{ position: [0, 0, 8], fov: 38 }} dpr={compact ? 1 : [1, 1.5]}
        frameloop="demand"
        gl={{ alpha: true, antialias: !compact, powerPreference: 'low-power', stencil: false }}
>
        <ContextWatcher onLoss={() => setSupported(false)} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 6]} intensity={3} color="#cad8ff" />
        <directionalLight position={[-4, -1, 2]} intensity={1.3} color="#7a77b0" />
        {children}
      </Canvas>
    </SceneBoundary>}
  </div>
}
