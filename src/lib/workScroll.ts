export interface WorkSegment {
  x: number
  overflow: number
  start: number
  panStart: number
  revealEnd: number
  readEnd: number
  end: number
}
export interface WorkPlan { segments: WorkSegment[]; distance: number; duration: number }
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** Measurements are collected only on layout changes, never during a scroll frame. */
export function createWorkPlan(offsets: number[], heights: number[], viewportWidth: number, viewportHeight: number, trackWidth: number): WorkPlan {
  const distance = Math.max(0, trackWidth - viewportWidth)
  const pause = Math.min(140, viewportHeight * 0.18)
  let cursor = 0
  const segments = offsets.map((offset, i) => {
    const x = clamp(offset - offsets[0], 0, distance)
    const overflow = Math.max(0, heights[i] - viewportHeight)
    const start = cursor
    const panStart = start + pause
    const revealEnd = panStart + clamp(viewportHeight * .85, 320, 650)
    const readEnd = revealEnd + overflow + pause * 1.4
    const nextX = i < offsets.length - 1 ? clamp(offsets[i + 1] - offsets[0], 0, distance) : x
    const end = readEnd + (nextX - x) * 1.15
    cursor = end
    return { x, overflow, start, panStart, revealEnd, readEnd, end }
  })
  return { segments, distance, duration: cursor }
}
export function workPosition(plan: WorkPlan, progress: number) {
  const position = clamp(progress, 0, plan.duration)
  let index = plan.segments.findIndex(segment => position <= segment.end)
  if (index < 0) index = plan.segments.length - 1
  const segment = plan.segments[index]
  const next = plan.segments[index + 1]
  const transition = next && position > segment.readEnd ? (position - segment.readEnd) / (segment.end - segment.readEnd) : 0
  return {
    x: segment.x + (next ? (next.x - segment.x) * transition : 0),
    active: transition > 0.5 ? index + 1 : index,
    pans: plan.segments.map(s => clamp(position - s.revealEnd, 0, s.overflow)),
    reveals: plan.segments.map(s => { const t = clamp((position - s.panStart) / ((s.revealEnd - s.panStart) * .65), 0, 1); return t * t * (3 - 2 * t) }),
    detailReveals: plan.segments.map(s => { const duration = s.revealEnd - s.panStart; const t = clamp((position - s.panStart - duration * .55) / (duration * .45), 0, 1); return t * t * (3 - 2 * t) }),
    fraction: plan.duration ? position / plan.duration : 0,
  }
}
