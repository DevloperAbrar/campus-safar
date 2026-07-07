import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

export const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px', amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  return { ref, controls, isInView }
}