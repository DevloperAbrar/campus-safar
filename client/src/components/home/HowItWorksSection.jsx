import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Reveal, SPRING_BOUNCY, EASE_OUT_EXPO, useIsMobile } from './utils'

const steps = [
  { n: '01', icon: '💬', title: 'Tell Us What You Need', desc: 'Student prepping for exams, an institute running a campus, or a business with a custom idea -start with a quick conversation.', tag: 'Free Consultation', from: 'left' },
  { n: '02', icon: '⚙️', title: 'We Design & Set It Up', desc: 'Our team configures the right product -StudyBoard, Idea2Software, or a fully custom build -tailored to your workflow.', tag: 'Done For You', from: 'right' },
  { n: '03', icon: '🚀', title: 'Go Live', desc: 'Your students start learning, your institute starts running smoother, or your business goes live -usually within 24 hours.', tag: 'Fast Launch', from: 'left' },
  { n: '04', icon: '🤝', title: 'We Support You', desc: 'Ongoing updates, training, and support -we stay with you as your campus or business grows.', tag: 'Always Here', from: 'right' },
]

const StepCard = ({ step, index, onActive }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  if (inView) onActive(index)
  const fromLeft = step.from === 'left'

  return (
    <div ref={ref} style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '40px 0', justifyContent: fromLeft ? 'flex-start' : 'flex-end' }}>
      <motion.div
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (fromLeft ? -80 : 80), scale: inView ? 1 : 0.94 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        style={{
          background: 'rgba(10,22,40,0.72)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 20, padding: 'clamp(24px,3vw,40px)', width: 'min(440px, 46%)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -30, left: fromLeft ? -30 : 'auto', right: fromLeft ? 'auto' : -30, width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,85,0,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <motion.div animate={{ scale: inView ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #FF5500, #FF8C42)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, boxShadow: '0 8px 22px rgba(255,85,0,0.45)' }}>
            {step.icon}
          </motion.div>
          <div>
            <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, display: 'block' }}>STEP {step.n} / 04</span>
            <motion.div animate={{ width: inView ? '100%' : '0%' }} transition={{ duration: 0.7, delay: 0.25 }}
              style={{ height: 1.5, background: 'linear-gradient(90deg, #FF5500, transparent)', borderRadius: 99, marginTop: 3 }} />
          </div>
        </div>
        <h3 style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 900, color: '#fff', marginBottom: 10, letterSpacing: '-0.3px' }}>{step.title}</h3>
        <p style={{ fontSize: 14, color: 'rgba(196,205,222,0.85)', lineHeight: 1.7, marginBottom: 16 }}>{step.desc}</p>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: '#FF8C42', background: 'rgba(255,85,0,0.12)', border: '1px solid rgba(255,85,0,0.28)', padding: '5px 13px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF5500', display: 'inline-block' }} />
          {step.tag}
        </span>
      </motion.div>
    </div>
  )
}

const MobileStepCard = ({ step }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const fromLeft = step.from === 'left'

  return (
    <motion.div ref={ref}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (fromLeft ? -40 : 40), y: inView ? 0 : 20 }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.05 }}
      style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 20px', marginBottom: 12, position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: fromLeft ? 0 : 'auto', right: fromLeft ? 'auto' : 0, width: 3, height: '100%', background: inView ? 'linear-gradient(180deg, #FF5500, transparent)' : 'transparent', borderRadius: 99 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#FF5500,#FF8C42)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, boxShadow: '0 5px 14px rgba(255,85,0,0.38)', flexShrink: 0 }}>{step.icon}</span>
        <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.38)', letterSpacing: 2 }}>STEP {step.n} / 04</span>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{step.title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(196,205,222,0.8)', lineHeight: 1.65, marginBottom: 10 }}>{step.desc}</p>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: '#FF8C42', background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.22)', padding: '4px 11px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF5500', display: 'inline-block' }} />
        {step.tag}
      </span>
    </motion.div>
  )
}

const HowItWorksSection = () => {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.28])
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '3%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0.25, 0.5, 0.68, 0.88])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0])
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const headingY = useTransform(scrollYProgress, [0, 0.15], [0, -28])
  const headingSubOp = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // ── MOBILE ──
  if (isMobile) {
    return (
      <section style={{ background: '#0A1628', padding: '52px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/slides/slides.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,85,0,0.06) 0%, transparent 60%)' }} />

        <div style={{ padding: '0 18px', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE_OUT_EXPO }} style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={{ display: 'inline-block', marginBottom: 12, background: 'rgba(255,85,0,0.12)', color: '#FF8C42', border: '1px solid rgba(255,85,0,0.25)', padding: '5px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>HOW IT WORKS</span>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.5px', lineHeight: 1.2 }}>From Idea to Live —<br /><span style={{ color: '#FF5500' }}>Simply.</span></h2>
            <p style={{ fontSize: 13.5, color: 'rgba(196,205,222,0.75)', lineHeight: 1.6, maxWidth: 300, marginInline: 'auto' }}>One clear process for students, institutes, and businesses.</p>
          </motion.div>

          {steps.map((step) => <MobileStepCard key={step.n} step={step} />)}

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 0 }}>
            <Link to="/products/studyboard" style={{ flex: 1, minWidth: 140, padding: '13px 16px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700, fontSize: 14, textAlign: 'center', boxShadow: '0 4px 18px rgba(255,85,0,0.38)' }}>Get Started Free →</Link>
            <Link to="/contact" style={{ flex: 1, minWidth: 140, padding: '13px 16px', border: '1.5px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 11, fontWeight: 600, fontSize: 14, textAlign: 'center' }}>Book a Demo →</Link>
          </motion.div>
        </div>

        {/* ✅ SINGLE bottom curve -dark to light */}
        <div style={{ height: 48 }} />
      </section>
    )
  }

  // ── DESKTOP ──
  return (
    <section ref={containerRef} style={{ position: 'relative' }}>

      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', zIndex: 0 }}>
        <motion.img src="/slides/slides.png" alt="CampusSafar dashboard"
          style={{ width: '100%', height: '100%', objectFit: 'cover', scale: bgScale, x: bgX, y: bgY, transformOrigin: 'center center' }}
          onError={() => console.warn('[HowItWorksSection] /slides/slides.png not found')} />
        <motion.div style={{ position: 'absolute', inset: 0, background: '#0A1628', opacity: overlayOpacity }} />
        <motion.div style={{ position: 'absolute', inset: 0, opacity: glowOpacity, background: 'radial-gradient(ellipse 55% 45% at 25% 65%, rgba(255,85,0,0.55) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ textAlign: 'center', padding: '0 20px' }}>
            <motion.div style={{ opacity: headingSubOp, marginBottom: 16 }}>
              <span style={{ background: 'rgba(255,255,255,0.07)', color: '#FF8C42', border: '1px solid rgba(255,85,0,0.3)', padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, display: 'inline-block' }}>HOW IT WORKS</span>
            </motion.div>
            <motion.h2 style={{ opacity: headingOpacity, y: headingY, fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              From Idea to Live —<br /><span style={{ color: '#FF5500' }}>Simply.</span>
            </motion.h2>
            <motion.p style={{ opacity: headingSubOp, fontSize: 15, color: 'rgba(196,205,222,0.8)', marginTop: 14, maxWidth: 400, marginInline: 'auto' }}>
              One clear process for students, institutes, and businesses.
            </motion.p>
          </div>
        </div>

        <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 2 }}>
          {steps.map((s, i) => (
            <motion.div key={s.n} animate={{ scale: activeIndex === i ? 1.4 : 0.8, background: activeIndex === i ? '#FF5500' : 'rgba(255,255,255,0.2)' }} transition={{ duration: 0.3 }} style={{ width: 8, height: 8, borderRadius: '50%' }} />
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: 36, zIndex: 2 }}>
          <motion.div key={activeIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 1.5, background: '#FF5500', borderRadius: 99 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5 }}>{steps[activeIndex]?.title?.toUpperCase()}</span>
          </motion.div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: '-100vh' }}>
        <div style={{ height: '50vh' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,5vw,80px)' }}>
          {steps.map((step, i) => <StepCard key={step.n} step={step} index={i} onActive={setActiveIndex} />)}
        </div>
      </div>

      {/* CTA only -divider handled by Home.jsx */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ background: '#0A1628', padding: '48px 0 56px' }}>
          <Reveal style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
              <Link to="/products/studyboard" style={{ padding: '13px 28px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700, fontSize: 15, display: 'inline-block', boxShadow: '0 5px 22px rgba(255,85,0,0.42)' }}>
                Get Started Free →
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
              <Link to="/contact" style={{ padding: '13px 28px', border: '1.5px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 11, fontWeight: 600, fontSize: 15, display: 'inline-block' }}>
                Book a Free Demo →
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </div>

    </section>
  )
}

export default HowItWorksSection