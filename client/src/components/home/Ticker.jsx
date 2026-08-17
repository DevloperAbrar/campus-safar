import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion, useInView } from 'framer-motion'
import { tickerRow1Loop, tickerRow2Loop } from './data'

const TickerRow = ({ items, direction = 'left', speed = 32 }) => {
  const rowRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const distance = direction === 'left' ? '-50%' : '0%'
    const from = direction === 'left' ? '0%' : '-50%'
    gsap.set(el, { x: from })
    tweenRef.current = gsap.to(el, { x: distance, duration: speed, ease: 'none', repeat: -1 })
    return () => tweenRef.current?.kill()
  }, [direction, speed])

  useEffect(() => {
    let lastY = window.scrollY
    let resetTimeout
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastY)
      lastY = window.scrollY
      if (delta > 12 && tweenRef.current) {
        tweenRef.current.timeScale(2)
        clearTimeout(resetTimeout)
        resetTimeout = setTimeout(() => tweenRef.current?.timeScale(1), 500)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(resetTimeout) }
  }, [])

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
      style={{ display: 'flex', gap: 10, whiteSpace: 'nowrap', width: 'max-content' }}
    >
      {items.map((item, i) => (
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 8,
          padding: '7px 12px',
          fontSize: 12.5,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.92)',
          letterSpacing: '0.1px',
        }}>
          <span style={{ fontSize: 13, lineHeight: 1, flexShrink: 0, opacity: 0.9 }}>{item.icon}</span>
          <span>{item.text}</span>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.85)',
            background: 'rgba(0,0,0,0.22)',
            padding: '2.5px 7px',
            borderRadius: 5,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}>{item.tag}</span>
        </span>
      ))}
    </div>
  )
}

const Ticker = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '16px 0',
        background: 'linear-gradient(90deg, #E64A00 0%, #FF5500 50%, #E64A00 100%)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 70, background: 'linear-gradient(90deg,#E64A00,transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 70, background: 'linear-gradient(270deg,#E64A00,transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <TickerRow items={tickerRow1Loop} direction="left" speed={38} />
        <TickerRow items={tickerRow2Loop} direction="right" speed={42} />
      </div>
    </motion.section>
  )
}

export default Ticker