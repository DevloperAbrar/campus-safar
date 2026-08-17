import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useAnimation, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT = [0.83, 0, 0.17, 1]
export const SPRING_BOUNCY = { type: 'spring', stiffness: 400, damping: 22 }
export const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 28 }

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return isMobile
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────
export const Reveal = ({ children, variants, delay = 0, style, className, once = true }) => {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once, margin: '0px 0px -80px 0px' })
  useEffect(() => { if (inView) controls.start('visible') }, [inView, controls])
  const v = variants || {
    hidden: { opacity: 0, y: 28, filter: 'blur(2px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay } }
  }
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={v} style={style} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Magnetic button ──────────────────────────────────────────────────────
export const MagneticBtn = ({ children, style, strength = 0.25 }) => {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 350, damping: 25 })
  const sy = useSpring(y, { stiffness: 350, damping: 25 })
  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block', ...style }}
      onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────
export const Counter = ({ value }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')
  const hasPlus = value.includes('+')
  const num = parseInt(value.replace(/[^0-9]/g, ''))
  useEffect(() => {
    if (!inView || isNaN(num)) { if (isNaN(num)) setDisplay(value); return }
    const duration = 1600, start = performance.now()
    const raf = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setDisplay(Math.round(eased * num).toLocaleString() + (hasPlus ? '+' : ''))
      if (t < 1) requestAnimationFrame(raf)
      else setDisplay(value)
    }
    requestAnimationFrame(raf)
  }, [inView, num, value, hasPlus])
  return <span ref={ref}>{display}</span>
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────
export const TiltCard = ({ children, style, className, intensity = 8 }) => {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 })
  const handleMouse = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [x, y])
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000, ...style }} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Mobile primitives ─────────────────────────────────────────────────────
export const MobileOrb = ({ color, size, top, right, left, delay = 0, duration = 8 }) => (
  <motion.div
    animate={{ x: [0, 18, -12, 0], y: [0, -14, 8, 0], scale: [1, 1.08, 0.95, 1] }}
    transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
    style={{ position: 'absolute', top, right, left, width: size, height: size, background: color, borderRadius: '50%', filter: 'blur(32px)', pointerEvents: 'none', zIndex: 0 }}
  />
)

export const MobileCTA = ({ to, primary, children, onClick }) => (
  <motion.div whileTap={{ scale: 0.94 }} transition={SPRING_BOUNCY} style={{ flex: 1 }}>
    <a href={to} onClick={onClick} style={{ minWidth: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px 16px', background: primary ? '#FF5500' : '#fff', color: primary ? '#fff' : '#0A1628', borderRadius: 11, fontWeight: 700, fontSize: 14, boxShadow: primary ? '0 6px 20px rgba(255,85,0,0.35)' : 'none', border: primary ? 'none' : '1.5px solid #E5E7EB', position: 'relative', overflow: 'hidden', textDecoration: 'none' }}>
      {primary && (
        <motion.span animate={{ x: ['-110%', '210%'] }} transition={{ repeat: Infinity, duration: 2.4, delay: 1.5, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)', transform: 'skewX(-20deg)' }} />
      )}
      {children}
    </a>
  </motion.div>
)

export const MobileStatPill = ({ icon, value, label, delay, dark = false }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ ...SPRING_BOUNCY, delay }}
    whileTap={{ scale: 0.96 }}
    style={{ display: 'flex', alignItems: 'center', gap: 8, background: dark ? 'rgba(255,255,255,0.06)' : '#fff', border: dark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #E5E7EB', borderRadius: 12, padding: '8px 12px', boxShadow: dark ? 'none' : '0 2px 8px rgba(10,22,40,0.06)' }}>
    <span style={{ fontSize: 16 }}>{icon}</span>
    <div>
      <div style={{ fontSize: 13, fontWeight: 800, color: dark ? '#fff' : '#0A1628', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 10, color: dark ? '#94A3B8' : '#9CA3AF', lineHeight: 1.2 }}>{label}</div>
    </div>
  </motion.div>
)

export const MobileRevealHeading = ({ badge, title, subtitle, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}
      style={{ marginBottom: 28, textAlign: 'center' }}>
      {badge && (
        <motion.div variants={{ hidden: { opacity: 0, y: -12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } } }}>
          <span className="badge">{badge}</span>
        </motion.div>
      )}
      {title && (
        <motion.h2 variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(3px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE_OUT_EXPO } } }}
          className="section-title" style={{ marginTop: 8 }}>{title}</motion.h2>
      )}
      {subtitle && (
        <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } } }}
          className="section-sub">{subtitle}</motion.p>
      )}
    </motion.div>
  )
}