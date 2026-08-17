import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Reveal, TiltCard, MobileRevealHeading, SPRING_BOUNCY, EASE_OUT_EXPO, useIsMobile } from './utils'

const products = [
  {
    id: 'studyboard',
    n: '01',
    icon: '🎓',
    badge: 'For Students & Parents',
    badgeColor: '#FF5500',
    badgeBg: '#FFF0EB',
    iconBg: 'linear-gradient(135deg,#FF5500,#FF8C00)',
    title: 'SF StudyBoard',
    desc: 'Practice PYQs, attempt mock tests, explore virtual labs, solve doubts with AI -everything a student needs in one place.',
    apps: [
      { icon: '🧪', label: 'Virtual Labs' },
      { icon: '📝', label: 'Paper Generator' },
      { icon: '📄', label: 'PYQs + Solutions' },
      { icon: '📐', label: 'Formula Book' },
      { icon: '🎓', label: 'Result & Certificate' },
      { icon: '🎒', label: 'Student Portal' },
    ],
    cta: 'Explore StudyBoard',
    to: '/products/studyboard',
    dark: false,
    accent: '#FF5500',
  },
  {
    id: 'idea2software',
    n: '02',
    icon: '🏛',
    badge: 'For Institutes & Businesses',
    badgeColor: '#9CA3AF',
    badgeBg: '#112240',
    iconBg: 'linear-gradient(135deg,#112240,#1E3A6E)',
    title: 'Idea2Software',
    desc: '5+ powerful web applications for institutes and businesses -manage everything from one unified dashboard.',
    apps: [
      { icon: '🎯', label: 'Campus360' },
      { icon: '📝', label: 'CampusCMS' },
      { icon: '🪑', label: 'CampusSeating' },
      { icon: '📁', label: 'CampusDocs' },
      { icon: '🗂️', label: 'CampusERP' },
      { icon: '⚡', label: '24h Setup' },
    ],
    cta: 'Explore Idea2Software',
    to: '/products/idea-2-software',
    dark: true,
    accent: '#4F46E5',
  },
  {
    id: 'custom-dev',
    n: '03',
    icon: '⚙️',
    badge: 'For Any Business',
    badgeColor: '#059669',
    badgeBg: '#F0FDF4',
    iconBg: 'linear-gradient(135deg,#059669,#0EA5E9)',
    title: 'Custom Development',
    desc: "Have something specific in mind? We design and build custom web apps, dashboards, and systems for hospitals, events, defence units, and more.",
    apps: [
      { icon: '🌐', label: 'Custom Website' },
      { icon: '📱', label: 'Custom App' },
      { icon: '📊', label: 'Admin Dashboards' },
      { icon: '🏥', label: 'Hospital Systems' },
      { icon: '🎪', label: 'Event Platforms' },
      { icon: '🔧', label: 'Built Your Way' },
    ],
    cta: 'Start a Custom Project',
    to: '/custom-development',
    dark: false,
    accent: '#059669',
  },
]

const AppTile = ({ app, accent, dark, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4, ease: EASE_OUT_EXPO }}
    whileHover={{ y: -3, scale: 1.04 }}
    style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: dark ? 'rgba(255,255,255,0.05)' : '#FAFBFC',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#EEF0F3'}`,
      borderRadius: 10, padding: '9px 10px', cursor: 'default',
      transition: 'background 0.25s, border-color 0.25s',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}12`; e.currentTarget.style.borderColor = `${accent}55` }}
    onMouseLeave={(e) => { e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.05)' : '#FAFBFC'; e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.08)' : '#EEF0F3' }}
  >
    <span style={{
      width: 26, height: 26, borderRadius: 7, background: `${accent}1A`, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: 13, flexShrink: 0,
    }}>{app.icon}</span>
    <span style={{ fontSize: 11.5, fontWeight: 600, color: dark ? '#CBD5E1' : '#374151', lineHeight: 1.2 }}>{app.label}</span>
  </motion.div>
)

const ProductCard = ({ product, index, isMobile }) => {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '0px 0px -100px 0px' })
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isMobile ? 0 : (fromLeft ? -50 : 50), y: isMobile ? 40 : 0 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
      style={{ position: 'relative', height: '100%' }}
    >
      <motion.div whileHover={{ y: -8 }} transition={SPRING_BOUNCY} style={{ height: '100%' }}>
        <TiltCard intensity={4} style={{
          border: product.dark ? '1.5px solid rgba(255,255,255,0.1)' : `2px solid ${product.accent}22`,
          borderRadius: 20, padding: 'clamp(24px,3vw,36px)', position: 'relative', overflow: 'hidden',
          height: '100%', background: product.dark ? '#0A1628' : '#fff',
          boxShadow: product.dark ? 'none' : '0 2px 12px rgba(10,22,40,0.04)',
        }}>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 4, delay: index * 0.5 }}
            style={{ position: 'absolute', top: -50, right: fromLeft ? -50 : 'auto', left: fromLeft ? 'auto' : -50, width: 240, height: 240, background: `radial-gradient(circle,${product.accent}16 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: product.accent, letterSpacing: 1 }}>{product.n}</span>
            <div style={{ flex: 1, height: 2, background: product.dark ? 'rgba(255,255,255,0.08)' : '#F0F1F4', borderRadius: 999, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : {}}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: index * 0.08 + 0.3 }}
                style={{ height: '100%', background: product.accent, borderRadius: 999 }}
              />
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 600, color: product.badgeColor, background: product.badgeBg, padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{product.badge}</span>
          </div>

          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ ...SPRING_BOUNCY, delay: index * 0.08 + 0.15 }}
            style={{ width: 52, height: 52, background: product.iconBg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16, boxShadow: `0 8px 24px ${product.accent}4D`, cursor: 'default' }}
          >
            {product.icon}
          </motion.div>

          <h3 style={{ fontSize: 21, fontWeight: 800, color: product.dark ? '#fff' : '#0A1628', marginBottom: 9 }}>{product.title}</h3>
          <p style={{ color: product.dark ? '#94A3B8' : '#6B7280', marginBottom: 20, lineHeight: 1.7, fontSize: 13.5 }}>{product.desc}</p>

          {/* Mini app-tile grid -the individual applications inside this product */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
            {product.apps.map((app, i) => (
              <AppTile key={app.label} app={app} accent={product.accent} dark={product.dark} delay={index * 0.08 + 0.35 + i * 0.05} />
            ))}
          </div>

          <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }} transition={SPRING_BOUNCY}>
            <Link to={product.to} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '13px', borderRadius: 11, fontWeight: 700, fontSize: 14,
              background: product.dark ? '#fff' : product.accent,
              color: product.dark ? '#0A1628' : '#fff',
              boxShadow: product.dark ? 'none' : `0 4px 16px ${product.accent}59`,
            }}>
              {product.cta}
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </Link>
          </motion.div>
        </TiltCard>
      </motion.div>
    </motion.div>
  )
}

const ProductsSection = () => {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)

  // Whole-section scroll-linked enter/exit motion -fades & lifts in as it enters
  // the viewport, and gently recedes as the user scrolls past it into the next section.
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const sectionOpacity = useTransform(sectionProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0.4])
  const sectionY = useTransform(sectionProgress, [0, 0.12, 0.85, 1], [60, 0, 0, -40])

  // Connecting timeline above the 3 cards, draws in as user scrolls through
  const { scrollYProgress: lineProgress } = useScroll({ target: sectionRef, offset: ['start 80%', 'end 60%'] })
  const lineScale = useTransform(lineProgress, [0, 1], [0, 1])

  return (
    <motion.section
      ref={sectionRef}
      className="section"
      style={{ background: '#fff', overflow: 'hidden', padding: 'clamp(48px,6vw,96px) 0', position: 'relative', opacity: sectionOpacity, y: sectionY }}
    >
      {/* Ambient floating orbs */}
      <motion.div animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }} transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '5%', left: '-5%', width: 320, height: 320, background: 'radial-gradient(circle,rgba(255,85,0,0.06) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <motion.div animate={{ x: [0, -25, 15, 0], y: [0, 18, -12, 0] }} transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 280, height: 280, background: 'radial-gradient(circle,rgba(79,70,229,0.06) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)', position: 'relative', zIndex: 1 }}>
        {isMobile ? (
          <MobileRevealHeading badge="Our Products" title={<>One Startup.<br />Three Ways to Help You.</>} subtitle="Whether you're a student, an institute, or a business with a custom need -there's a product for you." />
        ) : (
          <Reveal style={{ marginBottom: 56, textAlign: 'center' }}>
            <span className="badge">Our Products</span>
            <h2 className="section-title" style={{ marginTop: 8 }}>One Startup.<br />Three Ways to Help You.</h2>
            <p className="section-sub">Whether you're a student, an institute, or a business with a custom need -there's a product for you.</p>
          </Reveal>
        )}

        <div style={{ position: 'relative' }}>
          {!isMobile && (
            <div style={{ position: 'absolute', top: 30, left: '16.5%', right: '16.5%', height: 2, background: '#F0F1F4', zIndex: 0 }}>
              <motion.div style={{ height: '100%', background: 'linear-gradient(90deg,#FF5500,#4F46E5,#059669)', scaleX: lineScale, transformOrigin: 'left' }} />
            </div>
          )}

          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 20, position: 'relative', zIndex: 1, alignItems: 'stretch' }}>
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default ProductsSection