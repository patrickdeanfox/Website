'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
}

export default function CountUp({ end = 0, suffix = '', duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated?.current) {
      hasAnimated.current = true
      const startTime = Date.now()
      const safeEnd = end ?? 0
      const safeDuration = duration ?? 2000

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / safeDuration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOut * safeEnd))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {count?.toLocaleString?.() ?? '0'}{suffix ?? ''}
    </span>
  )
}
