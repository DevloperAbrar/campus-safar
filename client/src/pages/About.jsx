import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import api from '../services/api'
import Founderimage from '../assets/team member/AbrarImage.png'
gsap.registerPlugin(ScrollTrigger)

// ─── Founder (hardcoded -edit imageUrl below) ──────────────────────────────
const FOUNDER = {
  name: 'Mo Abrar Qureshi',
  title: 'Founder & CEO',
  subtitle: 'Founder, CampusSafar',
  quote: '"I saw students struggling with outdated tools and institutes drowning in paperwork. CampusSafar is my answer to both."',
  imageUrl: Founderimage, // ← paste your image URL here, e.g. 'https://example.com/abrar.jpg'
  tags: ['🎓 Former Student', '💡 EdTech Builder'],
  initials: 'MA',
}

// ─── Dept accent colours ─────────────────────────────────────────────────────
const deptColors = {
  Leadership: '#FF5500', Business: '#3B82F6', Operations: '#8B5CF6',
  Research: '#10B981', Content: '#F59E0B', Marketing: '#EF4444', Design: '#EC4899'
}

// ─── Values (static) ─────────────────────────────────────────────────────────
const values = [
  { icon: '🎓', title: 'Student First', desc: 'Every feature we build asks one question, does this help a student learn better?', highlight: false },
  { icon: '⚡', title: 'Radical Simplicity', desc: 'Complex problems, simple solutions. No bloat. No confusion. Just clarity.', highlight: false },
  { icon: '🚩', title: 'Made for India 🇮🇳', desc: 'Built understanding Indian students, Indian institutes, Indian challenges.', highlight: true },
  { icon: '🚀', title: 'Always Growing', desc: 'We ship fast, learn fast, and improve with every piece of feedback we get.', highlight: false },
]

// ─── SEO schema (static founder data is fine here) ──────────────────────────

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About CampusSafar',
  description: 'Learn about CampusSafar -built by students for students. Meet Founder Mo Abrar Qureshi and the team building India\'s smartest campus platform.',
  mainEntity: {
    '@type': 'Organization',
    name: 'CampusSafar Technologies Private Limited',
    url: 'https://campussafar.com',
    logo: 'https://campussafar.com/logo.png', // ← replace with your real hosted logo URL
    sameAs: [
      'https://www.linkedin.com/company/sfsmartlabs/', // rename this page to CampusSafar Technologies -see note above
      // add here once created: Instagram, X/Twitter, Crunchbase, Google Business Profile URL
    ],
    founder: {
      '@type': 'Person',
      name: 'Mo Abrar Qureshi',
      jobTitle: 'Founder & CEO',
      image: Founderimage, // ← replace with your real hosted founder photo URL
      description: 'B.Tech Software Engineer, Platform Architect, Entrepreneur. Founder of CampusSafar.',
      sameAs: [
        'https://www.linkedin.com/in/moabrarqureshi/'
      ]
    },
  },
}
 

// ─── Helpers ─────────────────────────────────────────────────────────────────
const WaveDivider = ({ fromColor, toColor, flip = false, height = 64 }) => (
  <div style={{ position: 'relative', lineHeight: 0, margin: 0, padding: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height, transform: flip ? 'scaleY(-1)' : 'none' }}>
      <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill={toColor} />
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

const CurveDivider = ({ fromColor, toColor, height = 56 }) => (
  <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height }}>
      <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill={toColor} />
    </svg>
  </div>
)

const DiagonalDivider = ({ fromColor, toColor, height = 64, direction = 'right' }) => {
  const path = direction === 'right'
    ? `M0,0 L1440,${height * 2} L1440,${height * 2} L0,${height * 2} Z`
    : `M0,${height * 2} L1440,0 L1440,${height * 2} Z`
  return (
    <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
      <svg viewBox={`0 0 1440 ${height * 2}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height }}>
        <rect width="1440" height={height * 2} fill={fromColor} />
        <path d={path} fill={toColor} />
      </svg>
    </div>
  )
}

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

const HeroWords = () => {
  const line1 = ['Built', 'by', 'Students.']
  const line2 = ['Built', 'for']
  return (
    <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
      <span style={{ display: 'block' }}>
        {line1.map((w, i) => (
          <motion.span key={w + i}
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block', marginRight: 10 }}>{w}</motion.span>
        ))}
      </span>
      <span style={{ display: 'block' }}>
        {line2.map((w, i) => (
          <motion.span key={w + i}
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block', marginRight: 10 }}>{w}</motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.82, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', color: '#FF5500' }}>Students.</motion.span>
      </span>
    </h1>
  )
}

// ─── Team card (image-aware) ─────────────────────────────────────────────────
const TiltCard = ({ member, index }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8
    gsap.to(card, { rotateX, rotateY, scale: 1.03, duration: 0.3, ease: 'power2.out', transformPerspective: 800 })
  }
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  }

  // derive initials from name if not stored
  const initials = member.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <Reveal delay={index * 0.07}>
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        style={{ border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 24, textAlign: 'center', cursor: 'default', transformStyle: 'preserve-3d', willChange: 'transform', height: '100%', boxSizing: 'border-box' }}>

        {/* dept colour bar */}
        <div style={{ height: 3, background: deptColors[member.dept] || '#FF5500', borderRadius: '999px 999px 0 0', margin: '-24px -24px 20px', opacity: 0.7 }} />

        {/* avatar */}
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name}
            style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 14px', display: 'block', border: '2px solid #E5E7EB' }} />
        ) : (
          <div style={{
            width: 56, height: 56, borderRadius: '50%', margin: '0 auto 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: index % 2 === 0 ? '#0A1628' : '#FF5500',
            color: '#fff', fontWeight: 800, fontSize: 18
          }}>{initials}</div>
        )}

        <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 6, fontSize: 14 }}>{member.name}</div>

        <span style={{
          display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '3px 10px',
          background: '#FFF0EB', color: '#FF5500', borderRadius: 999, marginBottom: 10
        }}>{member.dept}</span>

        <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.5, marginBottom: 14 }}>{member.bio}</p>

        {member.linkedin && member.linkedin !== '#' ? (
          <motion.a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, borderColor: '#3B82F6', color: '#3B82F6' }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#3B82F6', fontWeight: 600, border: '1px solid #E5E7EB', borderRadius: 8, padding: '6px 14px', transition: 'all 0.2s', textDecoration: 'none' }}>
            in LinkedIn
          </motion.a>
        ) : (
          <span style={{ fontSize: 12, color: '#D1D5DB' }}>—</span>
        )}
      </div>
    </Reveal>
  )
}

// ─── Team skeleton loader ─────────────────────────────────────────────────────
const TeamSkeleton = () => (
  <div className="about-team-grid">
    {[...Array(8)].map((_, i) => (
      <div key={i} style={{ border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 24, textAlign: 'center' }}>
        <div style={{ height: 3, background: '#F3F4F6', borderRadius: '999px 999px 0 0', margin: '-24px -24px 20px' }} />
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F3F4F6', margin: '0 auto 14px', animation: 'shimmer 1.4s ease infinite' }} />
        <div style={{ height: 12, background: '#F3F4F6', borderRadius: 6, margin: '0 auto 8px', width: '70%', animation: 'shimmer 1.4s ease infinite' }} />
        <div style={{ height: 10, background: '#F3F4F6', borderRadius: 6, margin: '0 auto 10px', width: '40%', animation: 'shimmer 1.4s ease infinite' }} />
        <div style={{ height: 10, background: '#F3F4F6', borderRadius: 6, margin: '0 auto', width: '85%', animation: 'shimmer 1.4s ease infinite' }} />
      </div>
    ))}
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────
const About = () => {
  const lineRef = useRef(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [teamLoading, setTeamLoading] = useState(true)

  // Fetch team from API
  useEffect(() => {
    api.get('/api/team')
      .then(res => setTeamMembers(res.data.members || []))
      .catch(() => setTeamMembers([]))
      .finally(() => setTeamLoading(false))
  }, [])

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    gsap.fromTo(el, { scaleY: 0, transformOrigin: 'top center' }, {
      scaleY: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true }
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <SEO
        title="About Us -Built by Students, for Students"
        description="CampusSafar was founded by Mo Abrar Qureshi to solve real campus problems. Meet our team building India's smartest campus platform."
        canonical="https://campussafar.com/about"
        schema={aboutSchema}
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #040D1E 0%, #0A1628 50%, #1A0528 100%)', padding: 'clamp(80px, 12vw, 120px) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(600px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle, #FF5500 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 20px' }}>
          <motion.span
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{ display: 'inline-flex', padding: '6px 16px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, fontSize: 13, color: '#94A3B8', marginBottom: 32 }}>Our Story</motion.span>

          <HeroWords />

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            style={{ color: '#94A3B8', fontSize: 'clamp(15px, 2.5vw, 18px)', marginTop: 24, maxWidth: 500, margin: '24px auto 0', padding: '0 16px' }}>
            CampusSafar was born from one simple frustration, campus life deserved better tools.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={{ marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,85,0,0.6), transparent)' }} />
          </motion.div>
        </div>
      </section>

      <div className="section-divider"><WaveDivider fromColor="#0A1628" toColor="#ffffff" height={64} /></div>

      {/* ── FOUNDER + MISSION ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ padding: '0 20px' }}>
          <div className="about-founder-grid">

            {/* ── Founder card (hardcoded) ── */}
            <Reveal variants={{
              hidden: { opacity: 0, x: -48 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}>
              <motion.div
                whileHover={{ boxShadow: '0 24px 64px rgba(255,85,0,0.1)', borderColor: '#FF5500' }}
                transition={{ duration: 0.3 }}
                style={{ border: '1.5px solid #E5E7EB', borderRadius: 20, padding: 'clamp(20px, 4vw, 36px)', transition: 'border-color 0.3s' }}>

                <span style={{ display: 'inline-block', border: '1px solid #E5E7EB', borderRadius: 999, padding: '4px 14px', fontSize: 13, fontWeight: 500, color: '#6B7280', marginBottom: 20 }}>{FOUNDER.title}</span>

                {/* Founder avatar -image if URL set, else initials */}
                <div style={{ position: 'relative', width: 110, height: 110, marginBottom: 20 }}>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid #FF5500' }} />
                  {FOUNDER.imageUrl ? (
                    <img src={FOUNDER.imageUrl} alt={FOUNDER.name}
                      style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '3px solid #fff', boxShadow: '0 8px 24px rgba(255,85,0,0.25)' }} />
                  ) : (
                    <div style={{ width: 110, height: 110, background: '#0A1628', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5500', fontWeight: 800, fontSize: 32 }}>
                      {FOUNDER.initials}
                    </div>
                  )}
                </div>

                <h3 style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>{FOUNDER.name}</h3>
                <p style={{ color: '#FF5500', fontWeight: 600, fontSize: 14, marginBottom: 16 }}>{FOUNDER.subtitle}</p>

                <div style={{ borderLeft: '3px solid #FF5500', paddingLeft: 16, marginBottom: 24 }}>
                  <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.7, fontStyle: 'italic' }}>{FOUNDER.quote}</p>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {FOUNDER.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 13, padding: '4px 12px', background: tag.startsWith('🎓') ? '#F0F4FF' : '#FFF0EB', color: tag.startsWith('🎓') ? '#3B82F6' : '#FF5500', borderRadius: 999, fontWeight: 500 }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </Reveal>

            {/* ── Mission ── */}
            <Reveal delay={0.1} variants={{
              hidden: { opacity: 0, x: 48 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }
            }}>
              <span className="badge">Our Mission</span>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#0A1628', marginBottom: 28 }}>Why We Built CampusSafar</h2>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 19, top: 40, bottom: 40, width: 2, background: '#F3F4F6', zIndex: 0 }}>
                  <div ref={lineRef} style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #FF5500, #FF5500aa)', borderRadius: 999 }} />
                </div>
                {[
                  { n: '01', title: 'The Problem We Saw', desc: 'Students lacked quality practice tools. Institutes were buried in manual work.' },
                  { n: '02', title: 'What We Built', desc: 'A unified platform - SF StudyBoard for students/schools/coaching, Campus Suite for institutes.' },
                  { n: '03', title: "Where We're Going", desc: 'Every campus in India, connected, smart, and future-ready.' }
                ].map((item, i) => (
                  <Reveal key={item.n} delay={0.2 + i * 0.15}>
                    <motion.div whileHover={{ x: 6, borderColor: '#FF5500' }} transition={{ duration: 0.25 }}
                      style={{ display: 'flex', gap: 20, padding: '20px', border: '1.5px solid #E5E7EB', borderRadius: 14, marginBottom: 12, background: '#fff', position: 'relative', zIndex: 1, transition: 'border-color 0.25s' }}>
                      <div style={{ width: 40, height: 40, background: '#FF5500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{item.n}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{item.title}</div>
                        <div style={{ fontSize: 14, color: '#6B7280' }}>{item.desc}</div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider"><CurveDivider fromColor="#ffffff" toColor="#F8FAFF" height={56} /></div>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: '#F8FAFF' }}>
        <div className="container" style={{ padding: '0 20px' }}>
          <Reveal style={{ marginBottom: 56, textAlign: 'center' }}>
            <span className="badge">What We Stand For</span>
            <h2 className="section-title">Our Values</h2>
            <p className="section-sub">Everything we build is guided by these principles.</p>
          </Reveal>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6, boxShadow: v.highlight ? '0 24px 64px rgba(10,22,40,0.4)' : '0 16px 40px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: 'clamp(20px, 4vw, 32px)', borderRadius: 20, height: '100%', background: v.highlight ? '#0A1628' : '#fff', border: v.highlight ? 'none' : '1.5px solid #E5E7EB', boxSizing: 'border-box' }}>
                  <motion.div initial={{ scale: 0, rotate: -15 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 260, damping: 18 }}
                    style={{ fontSize: 36, marginBottom: 16, display: 'inline-block' }}>{v.icon}</motion.div>
                  <h3 style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', fontWeight: 700, color: v.highlight ? '#fff' : '#0A1628', marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: v.highlight ? '#94A3B8' : '#6B7280', lineHeight: 1.7 }}>{v.desc}</p>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    style={{ height: 2, background: '#FF5500', borderRadius: 999, marginTop: 20 }} />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><StadiumDivider fromColor="#F8FAFF" toColor="#ffffff" height={56} /></div>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ padding: '0 20px' }}>
          <Reveal style={{ marginBottom: 56, textAlign: 'center' }}>
            <span className="badge">The Team</span>
            <h2 className="section-title">People Behind CampusSafar.</h2>
            <p className="section-sub">A small but mighty team on a big mission</p>
          </Reveal>

          {teamLoading ? (
            <TeamSkeleton />
          ) : teamMembers.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 15, padding: '40px 0' }}>Team info coming soon!</p>
          ) : (
            <div className="about-team-grid">
              {teamMembers.map((m, i) => (
                <TiltCard key={m._id} member={m} index={i} />
              ))}
            </div>
          )}

          <Reveal style={{ textAlign: 'center', marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, color: '#6B7280' }}>🚀 We're Hiring!</span>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontWeight: 600, fontSize: 14, color: '#0A1628', textDecoration: 'none' }}>
                Join our team →
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider"><DiagonalDivider fromColor="#ffffff" toColor="#0A1628" height={64} direction="right" /></div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #040D1E 0%, #0A1628 100%)', padding: 'clamp(60px, 10vw, 80px) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '-30%', right: '-10%', width: 400, height: 400, border: '1px solid rgba(255,85,0,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '-20%', left: '-8%', width: 300, height: 300, border: '1px solid rgba(255,85,0,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 20px' }}>
          <Reveal variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, color: '#fff', marginBottom: 20 }}>
              Ready to <span style={{ color: '#FF5500' }}>Transform</span> Your Campus Journey?
            </h2>
            <p style={{ color: '#94A3B8', marginBottom: 36, fontSize: 'clamp(14px, 2vw, 16px)' }}>Join students and institutes already building smarter with CampusSafar.</p>
          </Reveal>
          <Reveal delay={0.15} style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', padding: '0 16px' }}>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/products/studyboard" style={{ padding: 'clamp(12px, 2vw, 14px) clamp(20px, 3vw, 28px)', background: '#FF5500', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 'clamp(14px, 2vw, 16px)', display: 'inline-block', boxShadow: '0 8px 24px rgba(255,85,0,0.35)', textDecoration: 'none' }}>Get Started Free →</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" style={{ padding: 'clamp(12px, 2vw, 14px) clamp(20px, 3vw, 28px)', border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 'clamp(14px, 2vw, 16px)', display: 'inline-block', textDecoration: 'none' }}>Book a Demo</Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .about-founder-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-founder-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        .about-values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .about-values-grid { grid-template-columns: 1fr; }
        }

        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) { .about-team-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .about-team-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .about-team-grid { grid-template-columns: 1fr; } }

        @media (max-width: 768px) { .section { padding: 60px 0 !important; } }
        @media (max-width: 480px) { .section { padding: 48px 0 !important; } }

        .section-divider { display: block; margin: 0; padding: 0; line-height: 0; }
      `}</style>
    </>
  )
}

export default About