'use client'
import { useMemo } from 'react'
export function Trace({ points, color = '#8fa6d6', opacity = 0.5 }: { points: [number, number, number][]; color?: string; opacity?: number }) {
  const positions = useMemo(() => new Float32Array(points.slice(1).flatMap((point, i) => [...points[i], ...point])), [points])
  return <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><lineBasicMaterial color={color} transparent opacity={opacity} /></lineSegments>
}
