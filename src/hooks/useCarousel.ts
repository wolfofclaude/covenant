'use client'

import { useState, useCallback } from 'react'

export function useCarousel(total: number, visible: number) {
  const [start, setStart] = useState(0)
  const max = total - visible

  const prev = useCallback(() => setStart((s) => Math.max(0, s - 1)), [])
  const next = useCallback(() => setStart((s) => Math.min(max, s + 1)), [max])
  const goTo = useCallback((i: number) => setStart(Math.min(Math.max(0, i), max)), [max])

  return { start, prev, next, goTo, canPrev: start > 0, canNext: start < max }
}
