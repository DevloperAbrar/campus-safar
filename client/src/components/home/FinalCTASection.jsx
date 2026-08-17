import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Reveal, SPRING_BOUNCY } from './utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

// ── Animated diagonal slope divider -draws itself in left-to-right ──
const SlopeDivider = ({ fromColor = '#F8FAFC', toColor = '#040D1E' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const d = 'M0,18 L1440,82'

  return (
    <div
      ref={ref}
      style={{ position: 'relative', lineHeight: 0, background: fromColor, overflow: 'hidden' }}
    >
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 100 }}
      >
        <defs>
          <linearGradient id="slope-stroke-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF5500" />
            <stop offset="50%" stopColor="#FF8C42" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>
        </defs>

        {/* sloped fill -left low, right high, matches toColor (CTA bg) */}
        <motion.path
          d={`${d} L1440,100 L0,100 Z`}
          fill={toColor}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
        />

        {/* animated stroke line drawing left → right */}
        <motion.path
          d={d}
          fill="none"
          stroke="url(#slope-stroke-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />

        {/* traveling glow dot */}
        <motion.circle
          r="4.5"
          fill="#FFAB70"
          initial={{ opacity: 0 }}
          animate={inView ? {
            opacity: [0, 1, 1, 0],
            offsetDistance: ['0%', '0%', '100%', '100%'],
          } : {}}
          transition={{ duration: 1.2, ease: 'easeInOut', times: [0, 0.05, 0.9, 1] }}
          style={{ offsetPath: `path('${d}')` }}
        />
      </svg>
    </div>
  )
}

const FinalCTASection = ({ topFrom = '#F8FAFC' }) => (
  <>
    <SlopeDivider fromColor={topFrom} toColor="#040D1E" />

    <section style={{ background: '#040D1E', padding: 'clamp(64px,8vw,112px) 0', position: 'relative', overflow: 'hidden' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        style={{ position: 'absolute', top: '-30%', left: '-10%', width: '70%', height: '160%', background: 'conic-gradient(from 0deg at 50% 50%,rgba(255,85,0,0.05) 0deg,transparent 60deg,rgba(255,85,0,0.03) 180deg,transparent 240deg,rgba(255,85,0,0.05) 360deg)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 clamp(16px,4vw,40px)' }}>
        <Reveal>
          <motion.span animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,85,0,0.4)', 'rgba(255,255,255,0.1)'] }} transition={{ repeat: Infinity, duration: 3 }}
            style={{ display: 'inline-flex', padding: '5px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, fontSize: 12, color: '#94A3B8', marginBottom: 24 }}>
            Start Today -It's Free
          </motion.span>
          <h2 style={{ fontSize: 'clamp(28px,5vw,54px)', fontWeight: 900, color: '#fff', marginBottom: 18, lineHeight: 1.08, letterSpacing: '-1.5px' }}>
            Ready to{' '}
            <motion.span animate={{ color: ['#FF5500', '#FF8C00', '#FF5500'] }} transition={{ repeat: Infinity, duration: 3 }}>Transform</motion.span>
            <br />Your Campus Journey?
          </h2>
          <p style={{ color: '#6B7280', fontSize: 'clamp(14px,2vw,17px)', marginBottom: 36, lineHeight: 1.7 }}>
            Join students, institutes and businesses already<br />building smarter with CampusSafar.
          </p>
        </Reveal>
        <Reveal delay={0.15} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
          <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
            <Link to="/products/studyboard" style={{ padding: '15px 32px', background: '#FF5500', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 7, boxShadow: '0 8px 40px rgba(255,85,0,0.45)', position: 'relative', overflow: 'hidden' }}>Get Started Free →</Link>
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
            <Link to="/contact" style={{ padding: '15px 32px', border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, display: 'inline-block' }}>Book a Demo</Link>
          </motion.div>
        </Reveal>
        <Reveal delay={0.25} style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 28 }}>
          {[{ icon: '🔒', label: 'No credit card' }, { icon: '✓', label: 'Free to start' }, { icon: '⚡', label: 'Setup in 24 hours' }].map(t => (
            <span key={t.label} style={{ fontSize: 13, color: '#4B5563', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
              <span style={{ color: '#FF5500' }}>{t.icon}</span> {t.label}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.35} style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          {['50,000+ Questions', '300+ Virtual Labs', 'AI Doubt Solver', '5+ Campus Apps'].map((t, i) => (
            <motion.span key={t} whileHover={{ borderColor: 'rgba(255,85,0,0.4)', background: 'rgba(255,85,0,0.08)' }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, fontSize: 12, color: '#94A3B8', cursor: 'default', transition: 'all 0.2s' }}>
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                style={{ width: 5, height: 5, background: '#FF5500', borderRadius: '50%', display: 'inline-block' }} />
              {t}
            </motion.span>
          ))}
        </Reveal>
      </div>
    </section>
  </>
)

export default FinalCTASection