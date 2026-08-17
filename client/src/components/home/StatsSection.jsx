import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from './utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

const stats = [
  {
    numericValue: 15,
    suffix: '+',
    label: 'Happy Clients',
    sub: 'Institutes, businesses & students across India',
  },
  {
    numericValue: 5,
    suffix: '+',
    label: 'Live Applications',
    sub: 'Campus360 · StudyBoard · CampusERP · Docs',
  },
  {
    numericValue: 50,
    suffix: 'K+',
    label: 'Practice Questions',
    sub: 'JEE · NEET · Boards · Competitive exams',
  },
  {
    numericValue: 300,
    suffix: '+',
    label: 'Virtual Labs',
    sub: 'Interactive simulations for Class 6–12',
  },
  {
    numericValue: 24,
    suffix: 'h',
    label: 'Go-Live Time',
    sub: 'From onboarding call to going live',
  },
  {
    numericValue: 100,
    suffix: '%',
    label: 'Support Included',
    sub: 'Ongoing updates, training & dedicated help',
  },
]

const AnimatedNumber = ({ value, suffix, inView }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const duration = 1800
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      el.textContent = Math.round(value * eased) + suffix
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const StatCard = ({ stat, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
      whileHover={{
        y: -4,
        boxShadow: '0 16px 40px rgba(255,85,0,0.1), 0 0 0 1.5px rgba(255,85,0,0.2)',
        transition: { duration: 0.2 },
      }}
      style={{
        background: '#fff',
        border: '1px solid #E8EDF5',
        borderRadius: 12,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
      }}
    >
      {/* Top orange accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.65, delay: index * 0.08 + 0.18, ease: EASE_OUT_EXPO }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, #FF5500, #FF8C42)',
          transformOrigin: 'left',
        }}
      />

      {/* Subtle bg glow */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 100, height: 100, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,85,0,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Big number */}
      <div style={{
        fontSize: 'clamp(34px, 4vw, 52px)',
        fontWeight: 900,
        color: '#FF5500',
        letterSpacing: '-2px',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        <AnimatedNumber value={stat.numericValue} suffix={stat.suffix} inView={inView} />
      </div>

      {/* Label */}
      <div style={{
        fontSize: 11,
        fontWeight: 800,
        color: '#0A1628',
        letterSpacing: '1.2px',
        textTransform: 'uppercase',
        marginBottom: 5,
      }}>
        {stat.label}
      </div>

      {/* Sub */}
      <div style={{
        fontSize: 11.5,
        color: '#94A3B8',
        lineHeight: 1.55,
      }}>
        {stat.sub}
      </div>

      {/* Bottom progress line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: '#F1F5F9', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: EASE_OUT_EXPO }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #FF5500, #FF8C42)' }}
        />
      </div>
    </motion.div>
  )
}

const StatsSection = () => {
  const isMobile = useIsMobile()
  const leftRef = useRef(null)
  const leftInView = useInView(leftRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section style={{
      background: '#F8FAFC',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '56px 0 64px' : '88px 0 96px',
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(10,22,40,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* Orange corner blobs */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 320, height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,85,0,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 240, height: 240,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,85,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1160,
        margin: '0 auto',
        padding: `0 ${isMobile ? '20px' : 'clamp(24px,5vw,60px)'}`,
        position: 'relative', zIndex: 1,
      }}>

        {isMobile ? (
          // ── MOBILE ──
          <>
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, y: 24 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              style={{ marginBottom: 36, textAlign: 'center' }}
            >
              <span style={{
                display: 'inline-block', marginBottom: 12,
                fontSize: 10, fontWeight: 800, letterSpacing: 2,
                color: '#FF5500', textTransform: 'uppercase',
                background: '#FFF0EB',
                border: '1px solid rgba(255,85,0,0.2)',
                padding: '4px 12px', borderRadius: 999,
              }}>
                By The Numbers
              </span>
              <h2 style={{
                fontSize: 24, fontWeight: 900, color: '#0A1628',
                lineHeight: 1.2, letterSpacing: '-0.8px', marginBottom: 12,
              }}>
                We've helped campuses & businesses{' '}
                <span style={{ color: '#FF5500' }}>grow faster.</span>
              </h2>
              <p style={{
                fontSize: 13.5, color: '#64748B',
                lineHeight: 1.7, maxWidth: 320, marginInline: 'auto',
              }}>
                From student portals to custom business apps - CampusSafar builds the software that runs behind the scenes.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
            </div>
          </>
        ) : (
          // ── DESKTOP: left text + right 2×3 grid ──
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.45fr',
            gap: 'clamp(48px,7vw,100px)',
            alignItems: 'center',
          }}>

            {/* LEFT */}
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, x: -32 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            >
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                style={{
                  display: 'inline-block', marginBottom: 18,
                  fontSize: 10, fontWeight: 800, letterSpacing: 2,
                  color: '#FF5500', textTransform: 'uppercase',
                  background: '#FFF0EB',
                  border: '1px solid rgba(255,85,0,0.2)',
                  padding: '4px 12px', borderRadius: 999,
                }}
              >
                By The Numbers
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT_EXPO }}
                style={{
                  fontSize: 'clamp(26px,3vw,40px)',
                  fontWeight: 900, color: '#0A1628',
                  lineHeight: 1.18, letterSpacing: '-1px', marginBottom: 18,
                }}
              >
                We've helped campuses & businesses{' '}
                <span style={{ color: '#FF5500' }}>grow faster.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={leftInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.26 }}
                style={{
                  fontSize: 15, color: '#64748B',
                  lineHeight: 1.78, marginBottom: 32, maxWidth: 400,
                }}
              >
                From student portals to custom business apps - CampusSafar builds the software that runs behind the scenes so you can focus on what matters.
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={leftInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.32, ease: EASE_OUT_EXPO }}
                style={{
                  height: 1.5,
                  background: 'linear-gradient(90deg, #FF5500 0%, rgba(255,85,0,0.1) 60%, transparent 100%)',
                  marginBottom: 28, transformOrigin: 'left',
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={leftInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.38 }}
                style={{
                  fontSize: 13, color: '#94A3B8', lineHeight: 1.7,
                }}
              >
                Real numbers from real clients - students, institutes & businesses across India.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.44 }}
                style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}
              >
                <motion.a
                  href="/products/studyboard"
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(255,85,0,0.38)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '12px 26px', background: '#FF5500',
                    color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 14,
                    display: 'inline-block', boxShadow: '0 4px 18px rgba(255,85,0,0.3)',
                    textDecoration: 'none',
                  }}
                >
                  Get Started Free →
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ borderColor: '#0A1628', color: '#0A1628' }}
                  style={{
                    padding: '12px 26px',
                    border: '1.5px solid #CBD5E1',
                    color: '#64748B', borderRadius: 10,
                    fontWeight: 600, fontSize: 14, display: 'inline-block',
                    textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  Book a Demo
                </motion.a>
              </motion.div>
            </motion.div>

            {/* RIGHT - 2×3 grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}>
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: isMobile ? 44 : 64,
            paddingTop: 20,
            borderTop: '1px solid #E8EDF5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, flexWrap: 'wrap',
            fontSize: 12, color: '#94A3B8',
          }}
        >
          <span>Made with ❤️ in India 🇮🇳</span>
          <span style={{ color: '#CBD5E1' }}>·</span>
          <span>Building the future of campus & business software</span>
          <span style={{ color: '#CBD5E1' }}>·</span>
          <span style={{ color: '#FF5500', fontWeight: 700 }}>CampusSafar</span>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection