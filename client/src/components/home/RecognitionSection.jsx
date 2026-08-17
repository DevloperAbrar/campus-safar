import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsMobile } from './utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

const badges = [
  { logo: '/recog/startup.png', title: 'Startup India', sub: 'DPIIT Recognized' },
  { logo: '/recog/udyam.png', title: 'Udyam Registered', sub: 'MSME Certified' },
  { logo: '/recog/mca.png', title: 'MCA Registered', sub: 'Ministry of Corporate Affairs' },
  { logo: '/recog/trademark.png', title: 'Trademark', sub: 'Brand Protected' },
  { logo: '/recog/gem.png', title: 'GeM Seller', sub: 'Govt e-Marketplace' },
]

// ── Animated wave divider -draws itself in with a hand-drawn stroke reveal ──
const AnimatedDivider = ({ fromColor, toColor, flip = false }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative', lineHeight: 0, background: fromColor,
        overflow: 'hidden', transform: flip ? 'scaleY(-1)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 100 }}
      >
        <motion.path
          d="M0,55 C220,10 340,95 560,58 C780,20 900,90 1120,52 C1260,28 1360,60 1440,45 L1440,100 L0,100 Z"
          fill={toColor}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
        />
        <motion.path
          d="M0,55 C220,10 340,95 560,58 C780,20 900,90 1120,52 C1260,28 1360,60 1440,45"
          fill="none"
          stroke="#FF5500"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.85 } : {}}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
        />
        <motion.circle
          r="4"
          fill="#FF8C42"
          initial={{ opacity: 0 }}
          animate={inView ? {
            opacity: [0, 1, 1, 0],
            offsetDistance: ['0%', '0%', '100%', '100%'],
          } : {}}
          transition={{ duration: 1.4, ease: 'easeInOut', times: [0, 0.05, 0.9, 1] }}
          style={{
            offsetPath: "path('M0,55 C220,10 340,95 560,58 C780,20 900,90 1120,52 C1260,28 1360,60 1440,45')",
          }}
        />
      </svg>
    </div>
  )
}

const LogoCard = ({ item, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: index * 0.07 }}
    whileHover={{
      y: -4,
      borderColor: 'rgba(255,85,0,0.35)',
      boxShadow: '0 12px 28px rgba(10,22,40,0.08)',
    }}
    style={{
      background: '#fff',
      border: '1px solid #E5E9F0',
      borderRadius: 14,
      padding: '32px 20px 26px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      transition: 'border-color 0.2s',
      minHeight: 168,
    }}
  >
    <div style={{
      height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: 18,
    }}>
      <img
        src={item.logo}
        alt={item.title}
        style={{ maxWidth: 130, maxHeight: 64, objectFit: 'contain' }}
        onError={(e) => { e.target.style.opacity = 0.15 }}
      />
    </div>
    <div style={{ fontSize: 14, fontWeight: 800, color: '#0A1628', letterSpacing: '-0.1px' }}>
      {item.title}
    </div>
    <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 4, lineHeight: 1.4 }}>
      {item.sub}
    </div>
  </motion.div>
)

const RecognitionSection = ({ topFrom = '#04080F', bottomTo = '#040D1E' }) => {
  const isMobile = useIsMobile()
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '0px 0px -60px 0px' })
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '0px 0px -60px 0px' })

  const bg = '#F8FAFC'

  return (
    <div>
      <AnimatedDivider fromColor={topFrom} toColor={bg} />

      <section style={{
        background: bg,
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '56px 0 64px' : '80px 0 88px',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(10,22,40,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1080, margin: '0 auto',
          padding: `0 ${isMobile ? '20px' : 'clamp(24px,5vw,60px)'}`,
          position: 'relative', zIndex: 1,
        }}>

          {/* Heading */}
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 48 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={headingInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              style={{
                display: 'inline-block', marginBottom: 14,
                fontSize: 10, fontWeight: 800, letterSpacing: 2.5,
                color: '#FF5500', textTransform: 'uppercase',
                background: '#FFF0EB',
                border: '1px solid rgba(255,85,0,0.2)',
                padding: '5px 14px', borderRadius: 999,
              }}
            >
              Recognized & Registered
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.14, ease: EASE_OUT_EXPO }}
              style={{
                fontSize: isMobile ? 24 : 'clamp(26px,3.2vw,38px)',
                fontWeight: 900, color: '#0A1628',
                letterSpacing: '-0.9px', lineHeight: 1.2, marginBottom: 12,
              }}
            >
              Trusted, Verified &{' '}
              <span style={{ color: '#FF5500' }}>Government Recognized.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.26 }}
              style={{
                fontSize: 14, color: '#64748B', lineHeight: 1.7,
                maxWidth: 500, marginInline: 'auto',
              }}
            >
              CampusSafar operates as a fully registered and compliant company —
              recognized across India's official startup and government platforms.
            </motion.p>
          </motion.div>

          {/* Logo grid -simple bordered cards, matching a classic awards/clients grid */}
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? 'repeat(2, 1fr)'
                : `repeat(${badges.length}, 1fr)`,
              gap: 16,
            }}
          >
            {badges.map((item, i) => (
              <LogoCard key={item.title} item={item} index={i} inView={gridInView} />
            ))}
          </div>
        </div>
      </section>

      <AnimatedDivider fromColor={bg} toColor={bottomTo} flip />
    </div>
  )
}

export default RecognitionSection