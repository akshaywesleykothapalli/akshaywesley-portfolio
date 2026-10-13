'use client'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Trace } from '@/components/three/ScenePrimitives'
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider'

export function ComputationalCore({ quality = 'high' }: { quality?: 'high' | 'low' }) {
  const group = useRef<THREE.Group>(null)
  const layerCount = quality === 'high' ? 7 : 5
  const extent = (layerCount - 1) * 0.16
  const { prefersReducedMotion } = useReducedMotion()
  const { gl, invalidate } = useThree()
  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = gl.domElement
    const update = () => invalidate()
    canvas.addEventListener('pointermove', update, { passive: true })
    return () => canvas.removeEventListener('pointermove', update)
  }, [gl, invalidate, prefersReducedMotion])
  useFrame(({ pointer }, delta) => {
    if (!group.current || prefersReducedMotion) return
    const targetX = 0.3 + pointer.y * 0.13
    const targetY = -0.45 + pointer.x * 0.22
    const smooth = 1 - Math.exp(-Math.min(delta, 0.05) * 6)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, smooth)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, smooth)
    if (Math.abs(group.current.rotation.x - targetX) + Math.abs(group.current.rotation.y - targetY) > 0.001) invalidate()
  })
  return <group ref={group} rotation={[0.3, -0.45, 0.1]}>
    <group>
      <mesh><boxGeometry args={[1.35, 1.35, 1.35]} /><meshStandardMaterial color="#101621" metalness={0.8} roughness={0.32} /></mesh>
      <mesh scale={1.02}><boxGeometry args={[1.35, 1.35, 1.35]} /><meshBasicMaterial color="#9aaee0" wireframe transparent opacity={0.5} /></mesh>
    </group>
    {Array.from({ length: layerCount }, (_, i) => <group key={i} position={[0, (i - (layerCount - 1) / 2) * 0.32, 0]}>
      <mesh><boxGeometry args={[2.5, 0.045, 2.5]} /><meshStandardMaterial color="#303a4b" metalness={0.85} roughness={0.3} /></mesh>
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[2.3, 2.3, 4, 4]} /><meshBasicMaterial color="#a1b8fb" wireframe transparent opacity={0.2} /></mesh>
      {[0, 1, 2, 3].map(j => <mesh key={j} position={[j % 2 ? 1.12 : -1.12, 0.06, j < 2 ? -1.12 : 1.12]}><boxGeometry args={[0.055, 0.09, 0.055]} /><meshBasicMaterial color="#b6c9ff" /></mesh>)}
    </group>)}
    <Trace points={[[-1.28, -extent, 1.12], [-1.28, extent, 1.12]]} color="#a1b8dd" opacity={0.55} />
    <mesh position={[-1.28, -extent, 1.12]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshBasicMaterial color="#d3e0f4" /></mesh>
    {[0, 1].map(i => <mesh key={i} rotation={[Math.PI / 2, i * Math.PI / 2, 0]}><torusGeometry args={[2.25, 0.008, 4, 96]} /><meshBasicMaterial color="#7e91b3" transparent opacity={0.4} /></mesh>)}
  </group>
}
