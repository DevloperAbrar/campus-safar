import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import LeadForm from '../components/LeadForm'

// ── Responsive hook ────────────────────────────────────────────────────────
// ─── Section Dividers ──────────────────────────────────────────────────
const WaveDivider = ({ fromColor, toColor, flip = false, height = 64 }) => (
  <div style={{ position: 'relative', lineHeight: 0, margin: 0, padding: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height, transform: flip ? 'scaleY(-1)' : 'none' }}>
      <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill={toColor} />
    </svg>
  </div>
)

const CurveDivider = ({ fromColor, toColor, height = 56, invert = false }) => (
  <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height, transform: invert ? 'scaleY(-1)' : 'none' }}>
      <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill={toColor} />
    </svg>
  </div>
)

const StadiumDivider = ({ fromColor, toColor, height = 56 }) => (
  <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height }}>
      <path d="M0,72 Q720,-20 1440,72 L1440,72 L0,72 Z" fill={toColor} />
    </svg>
  </div>
)

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

// ── Scroll Reveal ──────────────────────────────────────────────────────────
const Reveal = ({ children, variants, delay = 0, style, className }) => {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  useEffect(() => { if (inView) controls.start('visible') }, [inView, controls])
  const defaultVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } }
  }
  return (
    <motion.div ref={ref} initial="hidden" animate={controls}
      variants={variants || defaultVariants} style={style} className={className}>
      {children}
    </motion.div>
  )
}

// ── FAQ Data -easy to extend ──────────────────────────────────────────────
// To add more FAQs: just push a new { q, a } object into either array below.
const studentFaqs = [
  {
    q: 'Is SF StudyBoard really free?',
    a: 'Yes -our base plan is free forever. Students get access to PYQs, AI Doubt Solver, and basic test series at zero cost.'
  },
  {
    q: 'Which exams does StudyBoard cover?',
    a: 'We currently support JEE Main & Advanced, NEET UG, and Class 10 & 12 Boards (CBSE, ICSE, and major State Boards including MP Board, UP Board). More exams like CET and CUET are coming soon.'
  },
  {
    q: 'Do I need to download an app?',
    a: 'No app download needed! SF StudyBoard is fully web-based. Open it on any device -mobile, tablet, or desktop -and start practising instantly.'
  },
  {
    q: 'What is the AI Doubt Solver?',
    a: 'The AI Doubt Solver gives you instant, step-by-step explanations for any question -24/7. Just type or paste your doubt and get a clear answer in seconds.'
  },
  {
    q: 'How many virtual labs are available?',
    a: 'StudyBoard includes 600+ interactive virtual labs covering Physics, Chemistry, and Biology experiments, so you can simulate practicals anytime.'
  },
]

const instituteFaqs = [
  {
    q: 'How long does Idea2Software setup take?',
    a: 'Our team sets everything up within 24 hours of your demo call. No IT team needed on your side -we handle the full configuration.'
  },
  {
    q: 'What modules does Idea2Software include?',
    a: 'Idea2Software comes with four core modules: Admission Management System (AMS), Notice Board (NBN), CP-Track Complaint System, and SF StudyBoard integration for your students.'
  },
  {
    q: 'Can we white-label StudyBoard for our students?',
    a: 'Yes - Idea2Software includes a white-label version of SF StudyBoard that your institute can offer under its own brand. Students access it as part of your institute platform.'
  },
  {
    q: 'How do I book a demo for my college?',
    a: "Fill the form on this page or WhatsApp us directly. We'll schedule a free 30-min walkthrough of Idea2Software at your convenience -no obligation."
  },
  {
    q: 'Is there a cost to get started?',
    a: 'A free demo is always available with zero commitment. Our team will walk you through pricing options that suit your institute size after the demo call.'
  },
]

// ── Contact card with hover glow ──────────────────────────────────────────
const ContactCard = ({ icon, label, value, sub, color, delay, href }) => (
  <Reveal delay={delay}>
    <motion.a
      href={href}
      whileHover={{ y: -4, borderColor: '#FF5500', boxShadow: '0 12px 32px rgba(255,85,0,0.1)' }}
      transition={{ duration: 0.25 }}
      style={{
        display: 'flex', gap: 16, padding: 20,
        border: '1.5px solid #E5E7EB', borderRadius: 14, marginBottom: 16,
        background: '#fff', transition: 'border-color 0.25s',
        textDecoration: 'none', cursor: 'pointer'
      }}>
      <motion.div
        whileHover={{ scale: 1.1, rotate: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
          width: 52, height: 52, background: color, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0
        }}>{icon}</motion.div>
      <div>
        <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0A1628', wordBreak: 'break-word' }}>{value}</div>
        {sub && <div style={{ fontSize: 13, color: '#FF5500', fontWeight: 500, marginTop: 2 }}>{sub}</div>}
      </div>
    </motion.a>
  </Reveal>
)

// ── FAQ item with animated expand ─────────────────────────────────────────
const FaqItem = ({ item, index, isOpen, onToggle, accentColor = '#FF5500' }) => (
  <Reveal delay={index * 0.07}>
    <motion.div
      animate={{ borderColor: isOpen ? accentColor : '#E5E7EB' }}
      transition={{ duration: 0.2 }}
      style={{
        border: '1.5px solid',
        borderColor: isOpen ? accentColor : '#E5E7EB',
        borderRadius: 14, marginBottom: 12, overflow: 'hidden',
        borderLeft: isOpen ? `4px solid ${accentColor}` : '1.5px solid #E5E7EB'
      }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
        fontWeight: 600, fontSize: 15, color: '#0A1628', textAlign: 'left', gap: 12
      }}>
        <span style={{ flex: 1 }}>{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? accentColor : '#9CA3AF' }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: 18, flexShrink: 0, display: 'inline-block' }}>▾</motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 20px 20px', color: '#6B7280', fontSize: 14, lineHeight: 1.7 }}>
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </Reveal>
)

// ── FAQ Column ─────────────────────────────────────────────────────────────
const FaqColumn = ({ title, icon, badge, badgeColor, faqs, accentColor }) => {
  const [openFaq, setOpenFaq] = useState(0)
  return (
    <div>
      {/* Column header */}
      <Reveal style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{
            fontSize: 13, fontWeight: 700,
            padding: '4px 12px',
            background: badgeColor,
            color: '#fff',
            borderRadius: 999
          }}>{badge}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{icon}</span>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', margin: 0 }}>{title}</h3>
        </div>
        <div style={{ width: 40, height: 3, background: accentColor, borderRadius: 999, marginTop: 12 }} />
      </Reveal>

      {/* FAQ items */}
      {faqs.map((item, i) => (
        <FaqItem
          key={i}
          item={item}
          index={i}
          isOpen={openFaq === i}
          onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
          accentColor={accentColor}
        />
      ))}
    </div>
  )
}

const Contact = () => {
  const isMobile = useIsMobile(768)
  const isTablet = useIsMobile(1024)

  // Build combined FAQ list for schema
  const allFaqs = [...studentFaqs, ...instituteFaqs]
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }

  // Responsive grid: 1 col on mobile, 2 col on desktop
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1.2fr' : '1fr 1.4fr',
    gap: isMobile ? 40 : 64,
    alignItems: 'start'
  }

  // Slide-in variant: no x-shift on mobile (avoids overflow)
  const formRevealVariants = isMobile
    ? {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }
    }
    : {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }
    }

  return (
    <>
      <SEO
        title="Contact Us -Let's Talk"
        description="Get in touch with CampusSafar. Student support, institute demo booking, WhatsApp -we're here to help."
        canonical="https://campussafar.com/contact"
        schema={contactSchema}
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #040D1E 0%, #0A1628 100%)',
        padding: isMobile ? '80px 20px 72px' : '100px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated grid lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
          {[...Array(8)].map((_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 12.5}%`} y1="0" x2={`${(i + 1) * 12.5}%`} y2="100%" stroke="white" strokeWidth="1" />
          ))}
          {[...Array(5)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 20}%`} x2="100%" y2={`${(i + 1) * 20}%`} stroke="white" strokeWidth="1" />
          ))}
        </svg>

        {/* Orange glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: isMobile ? 260 : 400, height: isMobile ? 260 : 400,
          background: 'radial-gradient(circle, rgba(255,85,0,0.1) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: isMobile ? '0' : undefined }}>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              display: 'inline-flex', padding: '6px 16px',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999,
              fontSize: 13, color: '#94A3B8', marginBottom: 24
            }}>Get In Touch</motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: isMobile ? '42px' : 'clamp(40px, 6vw, 72px)',
              fontWeight: 900, color: '#fff', lineHeight: 1
            }}>
            Let's Talk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              color: '#94A3B8',
              fontSize: isMobile ? 16 : 18,
              marginTop: 20,
              maxWidth: 500,
              margin: '20px auto 0',
              padding: isMobile ? '0 8px' : 0
            }}>
            Whether you're a student with a question or an institute ready to get started, we're here.
          </motion.p>
        </div>
      </section>

      <div className="section-divider">
        <WaveDivider fromColor="#0A1628" toColor="#ffffff" height={64} />
      </div>

      {/* ── CONTACT + FORM ───────────────────────────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={gridStyle}>

            {/* Left -contact info */}
            <div>
              <Reveal>
                <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>
                  Reach Us Directly
                </h2>
                <p style={{ color: '#6B7280', marginBottom: 32 }}>Pick the fastest way to connect.</p>
              </Reveal>

              <ContactCard icon="✉" label="Email Us" value="contact@campussafar.com" sub="Reply within 24hrs" color="#FFF0EB" delay={0.1} href="mailto:contact@campussafar.com" />
              <ContactCard icon="💬" label="WhatsApp" value="+91 77709 72867" sub="Fastest response" color="#F0FFF4" delay={0.2} href="https://wa.me/917770972867" />

              {/* Book Demo card */}
              <Reveal delay={0.3}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  style={{ background: '#0A1628', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
                  {/* Subtle shimmer overlay */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                    style={{
                      position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                      transform: 'skewX(-15deg)'
                    }} />
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
                    <div style={{
                      width: 52, height: 52, background: '#112240', borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0
                    }}>📅</div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>Book a Demo</div>
                      <div style={{ fontSize: 13, color: '#6B7280' }}>30-min walkthrough of Idea2Software</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>

              <Reveal delay={0.35} style={{ marginTop: 16 }}>
                <span style={{
                  border: '1px solid #E5E7EB', borderRadius: 999,
                  padding: '6px 14px', fontSize: 13, color: '#6B7280',
                  display: 'inline-block'
                }}>Based in India 🇮🇳</span>
              </Reveal>
            </div>

            {/* Right -form card */}
            <Reveal delay={0.15} variants={formRevealVariants}>
              <motion.div
                whileHover={{ boxShadow: '0 24px 64px rgba(0,0,0,0.07)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#fff',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: 20,
                  padding: isMobile ? 24 : 36
                }}>
                <h2 style={{ fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>
                  Send Us a Message
                </h2>
                <p style={{ color: '#FF5500', fontWeight: 500, fontSize: 14, marginBottom: 28 }}>
                  We'll get back to you within 24 hours.
                </p>
                <LeadForm source="contact_form" />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <CurveDivider fromColor="#ffffff" toColor="#F8FAFF" height={56} />
      </div>

      {/* ── FAQ -Two Column ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: '#F8FAFF' }}>
        <div className="container" style={{ padding: isMobile ? '0 16px' : undefined }}>

          {/* Section header */}
          <Reveal style={{ marginBottom: 56, textAlign: 'center' }}>
            <span className="badge">FAQ</span>
            <h2 className="section-title">Common Questions.</h2>
            <p className="section-sub" style={{ maxWidth: 500, margin: '0 auto' }}>
              Find answers for students and institutes -two separate sections, one place.
            </p>
          </Reveal>

          {/* Two-column FAQ grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 48 : 40,
            alignItems: 'start'
          }}>
            {/* Student FAQs */}
            <FaqColumn
              title="For Students"
              icon="📚"
              badge="SF StudyBoard"
              badgeColor="#FF5500"
              faqs={studentFaqs}
              accentColor="#FF5500"
            />

            {/* Divider -vertical on desktop, horizontal on mobile */}
            {!isMobile && (
              <div style={{ display: 'none' }} />
            )}
            {isMobile && (
              <div style={{ height: 1, background: '#E5E7EB', margin: '-24px 0' }} />
            )}

            {/* Institute FAQs */}
            <FaqColumn
              title="For Institutes"
              icon="🏛"
              badge="Idea2Software"
              badgeColor="#0A1628"
              faqs={instituteFaqs}
              accentColor="#0A1628"
            />
          </div>

          {/* Bottom CTA nudge */}
          <Reveal delay={0.2} style={{ textAlign: 'center', marginTop: 56 }}>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 8 }}>
              Still have questions? We're just a message away.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:contact@campussafar.com" style={{
                padding: '10px 22px', background: '#FF5500', color: '#fff',
                borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none'
              }}>Email Us →</a>
              <a href="https://wa.me/917770972867" target="_blank" rel="noreferrer" style={{
                padding: '10px 22px', border: '1.5px solid #E5E7EB', background: '#fff',
                color: '#0A1628', borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none'
              }}>WhatsApp →</a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider">
        <StadiumDivider fromColor="#F8FAFF" toColor="#ffffff" height={48} />
      </div>

      <Footer />
      <style>{`
        .section-divider { display: block; margin: 0; padding: 0; line-height: 0; }
      `}</style>
    </>
  )
}

export default Contact