import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  motion, useAnimation, useInView, AnimatePresence,
  useMotionValue, useSpring, useTransform, useReducedMotion
} from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import trackEvent from '../utils/trackEvent'
import DhananjayBisen from '../assets/testinomail/dhanjaybansal.png'
import AtulKumaChauhan from '../assets/testinomail/atulchauhan.png'
import PKSinghhal from '../assets/testinomail/pksinghal.png'
import PraveenBansal from '../assets/testinomail/praveenbansal.png'
import AjayRaghuwanshi  from '../assets/testinomail/ajayraguwanshi.JPG'

gsap.registerPlugin(ScrollTrigger)

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
const EASE_IN_OUT = [0.83, 0, 0.17, 1]
const SPRING_BOUNCY = { type: 'spring', stiffness: 400, damping: 22 }
const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 28 }


const homeSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CampusSafar Technologies Private Limited",
  "alternateName": "CampusSafar",
  "url": "https://campussafar.com",
  "logo": "https://campussafar.com/logo.png", // ← replace with real hosted logo URL
  "description": "India's smartest campus platform offering SF StudyBoard for students and Idea2Software for institutes.",
  "founder": {
    "@type": "Person",
    "name": "Mo Abrar Qureshi",
    "jobTitle": "Founder & CEO",
    "sameAs": ["https://www.linkedin.com/in/moabrarqureshi/"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/sfsmartlabs/"
    // add Google Business Profile URL here once claimed — this is the single biggest missing signal
  ],
  "address": { "@type": "PostalAddress", "addressLocality": "Gwalior", "addressRegion": "Madhya Pradesh", "addressCountry": "IN" },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@campussafar.com",
    "telephone": "+91-77709-72867",
    "contactType": "customer support"
  },
  // Tells Google these apps are part of the same organization — helps entity consolidation across subdomains
  "subOrganization": [
    { "@type": "Organization", "name": "Idea2Software", "url": "https://i2s.campussafar.com" },
    { "@type": "Organization", "name": "SF StudyBoard", "url": "https://sfstudybaord.campussafar.com" },
    { "@type": "Organization", "name": "CampusCMS", "url": "https://cms.campussafar.com" },
    { "@type": "Organization", "name": "CampusSeating", "url": "https://seating.campussafar.com" },
    { "@type": "Organization", "name": "CampusDocs", "url": "https://campusdocs.campussafar.com" },
    { "@type": "Organization", "name": "Campus360", "url": "https://campus360.campussafar.com" },
    { "@type": "Organization", "name": "CampusERP", "url": "https://erp.campussafar.com" }
  ]
}
 

const tickerItems = [
  { icon: '⭐', text: '50,000+ Practice Questions' },
  { icon: '🧪', text: '300+ Virtual Labs' },
  { icon: '🤖', text: 'AI Doubt Solver' },
  { icon: '📚', text: 'JEE • NEET • BOARD EXAM • SSC • IBPS • GATE • CLAT • UPSC • CLAT • NDA • WBJEE • MPPSC' },
  { icon: '📄', text: 'Previous Year Papers' },
  { icon: '🏆', text: 'All India Test Series' },
  { icon: '🎯', text: 'Campus360 Student Development' },
  { icon: '🪑', text: 'CampusSeating Exam Management' },
  { icon: '🗂️', text: 'CampusERP for Institutes' },
]
const tickerLoop = [...tickerItems, ...tickerItems]

// ─── SVG Section Dividers ──────────────────────────────────────────────────

const WaveDivider = ({ fromColor, toColor, flip = false, height = 72 }) => (
  <div style={{ position: 'relative', lineHeight: 0, margin: 0, padding: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height, transform: flip ? 'scaleY(-1)' : 'none' }}>
      <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill={toColor} />
    </svg>
  </div>
)

const ZigzagDivider = ({ fromColor, toColor, height = 40 }) => {
  const teeth = 24, w = 1440, h = height * 2, step = w / teeth
  let d = `M0,0 L0,${h / 2}`
  for (let i = 0; i <= teeth; i++) { const x = i * step; const y = i % 2 === 0 ? h : 0; d += ` L${x},${y}` }
  d += ` L${w},0 Z`
  return (
    <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
      <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height }}>
        <path d={d} fill={toColor} />
      </svg>
    </div>
  )
}

const CurveDivider = ({ fromColor, toColor, height = 80, invert = false }) => (
  <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height, transform: invert ? 'scaleY(-1)' : 'none' }}>
      <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill={toColor} />
    </svg>
  </div>
)

const DiagonalDivider = ({ fromColor, toColor, height = 60, direction = 'right' }) => {
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

const StadiumDivider = ({ fromColor, toColor, height = 72 }) => (
  <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height }}>
      <path d="M0,72 Q720,-20 1440,72 L1440,72 L0,72 Z" fill={toColor} />
    </svg>
  </div>
)

// ─── Feature data ─────────────────────────────────────────────────────────
const studyboardFeatures = [
  { id: 'pyq', icon: '📄', title: '50,000+', subtitle: 'Previous Year Questions', desc: 'Solve 50,000+ questions from JEE, NEET, Board and different exams. Fully categorised by chapter, difficulty, and year.', accent: '#FF5500', bg: 'linear-gradient(135deg,#FFF5F0,#FFF0E8)', border: 'rgba(255,85,0,0.25)', tag: 'JEE · NEET · Boards' },
  { id: 'labs', icon: '🧪', title: '300+ Virtual Labs', subtitle: 'Interactive Simulations', desc: 'Hands-on experiments for Physics, Chemistry & Mathematics - no real lab required. Perfect for Class 6–12.', accent: '#7C3AED', bg: 'linear-gradient(135deg,#F5F3FF,#EDE9FE)', border: 'rgba(124,58,237,0.25)', tag: 'Science Practicals' },
  { id: 'Books', icon: '📄', title: '10+ Ebooks', subtitle: 'For Practice & E-learning', desc: 'Curated digital ebooks covering science practicals and key concepts, designed for self-paced learning and exam preparation.', accent: '#7C3AED', bg: 'linear-gradient(135deg,#F5F3FF,#EDE9FE)', border: 'rgba(124,58,237,0.25)', tag: 'Science Practicals' },
  { id: 'ai', icon: '🤖', title: 'AI Doubt Solver', subtitle: 'Instant Answers', desc: 'Upload any question - get step-by-step solutions, concept breakdowns, and related PYQs in seconds.', accent: '#059669', bg: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)', border: 'rgba(5,150,105,0.25)', tag: 'Always Available' },
  { id: 'exam', icon: '📝', title: 'Custom Exam Builder', subtitle: 'Create & Attempt Tests', desc: 'Students create custom papers from PYQs. Faculty build class tests. Institutes run All India Test Series.', accent: '#D97706', bg: 'linear-gradient(135deg,#FFFBEB,#FEF3C7)', border: 'rgba(217,119,6,0.25)', tag: 'For Everyone' },
  { id: 'progress', icon: '📊', title: 'Progress Tracking', subtitle: 'Student · Parent · Faculty', desc: 'Students see their growth, parents monitor their child, and faculty track the full class - all in real time.', accent: '#0EA5E9', bg: 'linear-gradient(135deg,#F0F9FF,#E0F2FE)', border: 'rgba(14,165,233,0.25)', tag: 'Live Dashboard' },
  { id: 'books', icon: '📚', title: 'Books & Formula Sheets', subtitle: 'Reference Material', desc: 'Curated books, formula sheets, and PYQs embedded directly in chapters so you never leave the platform.', accent: '#EC4899', bg: 'linear-gradient(135deg,#FDF2F8,#FCE7F3)', border: 'rgba(236,72,153,0.25)', tag: 'All Subjects' },
  { id: 'testSeries', icon: '🏆', title: 'All India Test Series', subtitle: 'Compete Nationwide', desc: 'Join All India Mock Tests, see your national rank, and benchmark yourself against thousands of students.', accent: '#FF5500', bg: 'linear-gradient(135deg,#FFF5F0,#FFF0E8)', border: 'rgba(255,85,0,0.25)', tag: 'National Rankings' },
]

const saasFeatures = [
  { id: 'campus360', icon: '🎯', title: 'Campus360', subtitle: '360° Student Development', desc: 'Track Academics, Sports, Leadership, Olympiad & Arts through one configurable rubric engine. Radar-chart parent dashboards, term-over-term growth trends.', accent: '#4F46E5', bg: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', border: 'rgba(79,70,229,0.25)', tag: 'Beyond Just Marks' },
  { id: 'campuscms', icon: '📝', title: 'CampusCMS', subtitle: 'Content & Records Management', desc: 'Centralized content, notices and student records system. One backend, role-based access for admin, faculty and students.', accent: '#0891B2', bg: 'linear-gradient(135deg,#ECFEFF,#CFFAFE)', border: 'rgba(8,145,178,0.25)', tag: 'One Source of Truth' },
  { id: 'campusseating', icon: '🪑', title: 'CampusSeating', subtitle: 'Exam Seating Arrangement', desc: 'Auto-generate exam seating plans by room, roll number and section — no more manual charts or last-minute clashes.', accent: '#EA580C', bg: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', border: 'rgba(234,88,12,0.25)', tag: 'Zero Manual Charts' },
  { id: 'campusdocs', icon: '📁', title: 'CampusDocs', subtitle: 'Document Automation', desc: 'Auto-generate and manage bonafide letters, ID cards, transfer certificates and other institute documents on demand.', accent: '#65A30D', bg: 'linear-gradient(135deg,#F7FEE7,#ECFCCB)', border: 'rgba(101,163,13,0.25)', tag: 'Docs On Demand' },
  { id: 'campuserp', icon: '🗂️', title: 'CampusERP', subtitle: 'School & Coaching Management', desc: 'Admissions, fee collection, timetables, exams & staff payroll — one ERP built for schools and coaching institutes to run daily operations end-to-end.', accent: '#DC2626', bg: 'linear-gradient(135deg,#FEF2F2,#FEE2E2)', border: 'rgba(220,38,38,0.25)', tag: 'Run Your Institute' },
]

const facultyAdvisors = [
  { id: 'praveen-bansal', name: 'Dr. Praveen Bansal', role: 'Associate Professor, Dean & Head — Centre for IoT', qualification: 'M.Tech (MANIT, Bhopal), Ph.D. (DTU, Delhi)', interest: 'Power Quality, Grid Connected Systems, Multilevel Inverters, IoT', image: PraveenBansal },
  { id: 'atul-chauhan', name: 'Atul Kumar Chauhan', role: 'Programmer', qualification: 'Researcher — Machine Learning & Network Security', interest: 'Machine Learning, Network Security, Routing Protocols', image: AtulKumaChauhan },
  { id: 'dhananjay-bisen', name: 'Dr. Dhananjay Bisen', role: 'Assistant Professor', qualification: 'B.E., M.Tech., Ph.D. (IT)', interest: 'Computer Programming, Data Science, Machine Learning, IoT', image: DhananjayBisen },
  { id: 'pk-singhal', name: 'Dr. P. K. Singhal', role: 'Professor and Dean', qualification: 'Ph.D.', interest: 'Microwave Engineering', image: PKSinghhal },
  { id: 'ajay-raghuwanshi', name: 'Dr. Ajay Raghuwanshi', role: 'Principal, Shri Sahaj Institute of Pharmacy', qualification: '', interest: '', image: AjayRaghuwanshi },
]

const studentTestimonials = [
  { id: 'student-1', initials: 'AS', name: 'Aarav Sharma', role: 'JEE Aspirant, Class 12', text: 'SF StudyBoard changed how I prepare for JEE. The PYQ practice and virtual labs are genuinely helpful - feels like a premium app at zero cost.', tag: '✓ Verified Student', date: 'May 2025' },
  { id: 'student-2', initials: 'PM', name: 'Priya Mehta', role: 'NEET Aspirant, Class 11', text: 'The AI Doubt Solver is honestly incredible. I used to wait hours for answers - now I get them instantly. The formula sheets are a bonus!', tag: '✓ Verified Student', date: 'May 2025' },
  { id: 'student-3', initials: 'KR', name: 'Kabir Rana', role: 'Board Exam Student, Class 10', text: 'I love how the practice questions are organised by chapter and difficulty. It made my revision so much faster before exams.', tag: '✓ Verified Student', date: 'April 2025' },
  { id: 'student-4', initials: 'SN', name: 'Sneha Nair', role: 'JEE Aspirant, Class 12', text: 'The All India Test Series gave me a real sense of where I stand nationally. Seeing my rank improve every month kept me motivated.', tag: '✓ Verified Student', date: 'June 2025' },
  { id: 'student-5', initials: 'RV', name: 'Rohan Verma', role: 'NEET Aspirant, Class 12', text: 'Virtual labs helped me actually understand practicals I never got to try in school. Big difference for my biology and chemistry prep.', tag: '✓ Verified Student', date: 'March 2025' },
]

// ─── Scroll Reveal ────────────────────────────────────────────────────────
const Reveal = ({ children, variants, delay = 0, style, className, once = true }) => {
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
const MagneticBtn = ({ children, style, strength = 0.25 }) => {
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
const Counter = ({ value }) => {
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

// ─── Feature Drag Slider ──────────────────────────────────────────────────
const FeatureSlider = ({ features, accentColor = '#FF5500' }) => {
  const [activeCard, setActiveCard] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 80, damping: 18 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])

  const CARD_W = isMobile ? 260 : 300, CARD_GAP = 16, STEP = (isMobile ? 260 : 300) + 16

  const clampX = useCallback((val) => {
    const min = -(features.length - 1) * STEP
    return Math.max(min, Math.min(0, val))
  }, [features.length, STEP])

  useEffect(() => {
    const unsub = springX.on('change', (val) => {
      const idx = Math.round(-val / STEP)
      setActiveCard(Math.max(0, Math.min(features.length - 1, idx)))
    })
    return unsub
  }, [springX, STEP, features.length])

  const goTo = (idx) => x.set(clampX(-idx * STEP))
  const handleDragEnd = (_, info) => {
    setIsDragging(false)
    const current = x.get(), velocity = info.velocity.x
    const idx = Math.round(-(current + velocity * 0.15) / STEP)
    goTo(Math.max(0, Math.min(features.length - 1, idx)))
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {features.map((f, i) => (
          <motion.button key={i} onClick={() => goTo(i)}
            animate={{ width: i === activeCard ? 22 : 7, background: i === activeCard ? (features[activeCard].accent || accentColor) : '#D1D5DB' }}
            transition={{ duration: 0.3 }}
            style={{ height: 7, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }} />
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <motion.span animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ fontSize: 11, color: accentColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>👆</span> Drag to explore
        </motion.span>
      </motion.div>
      <div ref={trackRef} style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}>
        <motion.div drag="x" dragConstraints={{ left: -(features.length - 1) * STEP, right: 0 }} dragElastic={0.08}
          onDragStart={() => setIsDragging(true)} onDragEnd={handleDragEnd}
          style={{ x: springX, display: 'flex', gap: CARD_GAP, paddingBottom: 8, width: 'max-content', userSelect: 'none' }}>
          {features.map((card, i) => {
            const isActive = i === activeCard
            return (
              <motion.div key={card.id} onClick={() => !isDragging && goTo(i)}
                animate={{ scale: isActive ? 1 : 0.93, opacity: isActive ? 1 : 0.6 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                style={{ width: CARD_W, flexShrink: 0, background: card.bg, borderRadius: 18, border: `1.5px solid ${isActive ? card.accent : card.border}`, padding: isMobile ? 16 : 20, boxShadow: isActive ? `0 16px 48px ${card.accent}22` : '0 4px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${card.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{card.icon}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: card.dark ? '#94A3B8' : card.accent, background: card.dark ? 'rgba(255,255,255,0.06)' : `${card.accent}12`, padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>{card.tag}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: isMobile ? 15 : 17, color: card.dark ? '#fff' : '#0A1628', marginBottom: 3 }}>{card.title}</div>
                <div style={{ fontSize: 11, color: card.dark ? '#64748B' : '#9CA3AF', marginBottom: 10, fontWeight: 500 }}>{card.subtitle}</div>
                <p style={{ fontSize: isMobile ? 12 : 13, color: card.dark ? '#94A3B8' : '#4B5563', lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
                {isActive && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ marginTop: 14, height: 2, borderRadius: 999, background: card.accent }} />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Testimonial Card ─────────────────────────────────────────────────────
const TestimonialCard = ({ item, kind, isActive, width }) => {
  const isFaculty = kind === 'faculty'
  return (
    <motion.div
      animate={{ scale: isActive ? 1.02 : 0.95, y: isActive ? -4 : 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      style={{ width, flexShrink: 0, background: isActive ? '#fff' : '#FAFAFB', border: `2px solid ${isActive ? '#FF5500' : '#E9EAEE'}`, borderRadius: 18, padding: 'clamp(18px,2.5vw,26px)', position: 'relative', height: '100%', boxShadow: isActive ? '0 20px 48px rgba(255,85,0,0.22), 0 0 0 4px rgba(255,85,0,0.07)' : '0 4px 14px rgba(10,22,40,0.05)', userSelect: 'none', overflow: 'hidden' }}>
      <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#FF5500,#FF8C42)' }} />
      {isFaculty && (
        <span style={{ position: 'absolute', top: 5, left: 20, background: isActive ? '#0A1628' : '#475569', color: '#fff', padding: '4px 12px', borderRadius: 999, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.3 }}>⭐ Featured Faculty</span>
      )}
      <div style={{ fontSize: 36, color: isActive ? 'rgba(255,85,0,0.22)' : 'rgba(10,22,40,0.08)', lineHeight: 1, marginBottom: 4, fontFamily: 'Georgia,serif', marginTop: isFaculty ? 10 : 0 }}>"</div>
      {isFaculty ? (
        <p style={{ fontSize: 13, color: isActive ? '#374151' : '#6B7280', lineHeight: 1.8, marginBottom: 16, minHeight: 0, fontWeight: isActive ? 500 : 400 }}>{item.interest}</p>
      ) : (
        <p style={{ fontSize: 13, color: isActive ? '#374151' : '#6B7280', lineHeight: 1.8, marginBottom: 18, fontWeight: isActive ? 500 : 400 }}>{item.text}</p>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${isActive ? '#FFE4D6' : '#F0F1F4'}` }}>
        {isFaculty ? (
          <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${isActive ? '#FF5500' : '#E9EAEE'}` }} />
        ) : (
          <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, background: isActive ? 'linear-gradient(135deg,#FF5500,#FF8C42)' : '#9CA3AF' }}>{item.initials}</div>
        )}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.role}</div>
        </div>
        {!isFaculty && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 1, flexShrink: 0 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: isActive ? '#FF5500' : '#D1D5DB', fontSize: 11 }}>★</span>)}
          </div>
        )}
      </div>
      {isFaculty ? (
        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 10, lineHeight: 1.6 }}>{item.qualification}</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 9px', borderRadius: 5, background: isActive ? '#FFF0EB' : '#F0F9FF', color: isActive ? '#FF5500' : '#0A1628' }}>{item.tag}</span>
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>{item.date}</span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Testimonials Slider ──────────────────────────────────────────────────
const TestimonialSlider = ({ items, kind }) => {
  const [activeCard, setActiveCard] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 90, damping: 20 })
  const isJumping = useRef(false)

  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 640); setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024) }
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])

  const CARD_W = isMobile ? 280 : isTablet ? 320 : 360, CARD_GAP = 18, STEP = (isMobile ? 280 : isTablet ? 320 : 360) + 18, count = items.length
  const CLONES = Math.min(count, 4)
  const loopItems = [
    ...items.slice(count - CLONES).map((it, i) => ({ ...it, _key: `clone-start-${i}` })),
    ...items.map((it, i) => ({ ...it, _key: `real-${i}` })),
    ...items.slice(0, CLONES).map((it, i) => ({ ...it, _key: `clone-end-${i}` })),
  ]
  const FIRST_REAL = CLONES, LAST_REAL = CLONES + count - 1
  const idxToX = useCallback((idx) => -(idx - FIRST_REAL) * STEP, [FIRST_REAL, STEP])
  const [loopIndex, setLoopIndex] = useState(FIRST_REAL)

  useEffect(() => { x.set(idxToX(FIRST_REAL)); setLoopIndex(FIRST_REAL); setActiveCard(0) }, [count, CARD_W])
  useEffect(() => {
    const unsub = springX.on('change', (val) => {
      const idx = Math.round(FIRST_REAL - val / STEP)
      setLoopIndex(idx)
      setActiveCard(((idx - FIRST_REAL) % count + count) % count)
    })
    return unsub
  }, [springX, STEP, FIRST_REAL, count])

  const settleIfNeeded = useCallback((idx) => {
    if (isJumping.current) return
    if (idx < FIRST_REAL) { isJumping.current = true; const c = idx + count; x.set(idxToX(c)); setLoopIndex(c); requestAnimationFrame(() => { isJumping.current = false }) }
    else if (idx > LAST_REAL) { isJumping.current = true; const c = idx - count; x.set(idxToX(c)); setLoopIndex(c); requestAnimationFrame(() => { isJumping.current = false }) }
  }, [FIRST_REAL, LAST_REAL, count, idxToX, x])

  const goTo = (idx) => { x.set(idxToX(idx)); requestAnimationFrame(() => settleIfNeeded(idx)) }
  const goToLogical = (li) => goTo(FIRST_REAL + li)
  const next = () => goTo(loopIndex + 1)
  const prev = () => goTo(loopIndex - 1)
  const handleDragEnd = (_, info) => {
    setIsDragging(false)
    const target = x.get() + info.velocity.x * 0.15
    goTo(Math.round(FIRST_REAL - target / STEP))
  }

  return (
    <div style={{ position: 'relative' }}>
      {!isMobile && (
        <>
          <motion.button onClick={prev} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} aria-label="Previous testimonial"
            style={{ position: 'absolute', left: -22, top: '40%', zIndex: 5, width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#0A1628', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>←</motion.button>
          <motion.button onClick={next} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} aria-label="Next testimonial"
            style={{ position: 'absolute', right: -22, top: '40%', zIndex: 5, width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#0A1628', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>→</motion.button>
        </>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
        <motion.span animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ fontSize: 12, color: '#FF5500', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span>👆</span> Drag or use arrows to explore
        </motion.span>
      </motion.div>
      <div style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y', padding: '4px 0' }}>
        <motion.div drag="x" dragConstraints={{ left: -(loopItems.length - 1) * STEP, right: STEP * CLONES }} dragElastic={0.05}
          onDragStart={() => setIsDragging(true)} onDragEnd={handleDragEnd}
          style={{ x: springX, display: 'flex', gap: CARD_GAP, width: 'max-content' }}>
          {loopItems.map((item, i) => (
            <div key={item._key} onClick={() => !isDragging && goTo(i)} style={{ cursor: 'pointer' }}>
              <TestimonialCard item={item} kind={kind} isActive={i === loopIndex} width={CARD_W} />
            </div>
          ))}
        </motion.div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20, flexWrap: 'wrap' }}>
        {items.map((_, i) => (
          <motion.button key={i} onClick={() => goToLogical(i)}
            animate={{ width: i === activeCard ? 24 : 7, background: i === activeCard ? '#FF5500' : '#D1D5DB' }}
            transition={{ duration: 0.3 }}
            style={{ height: 7, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }} />
        ))}
      </div>
    </div>
  )
}

// ─── Hero Dot Indicators ──────────────────────────────────────────────────
const HeroDots = ({ active }) => (
  <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
    {[0, 1].map(i => (
      <motion.div key={i}
        animate={{ width: i === active ? 28 : 8, background: i === active ? '#FF5500' : 'rgba(10,22,40,0.2)' }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        style={{ height: 8, borderRadius: 999 }} />
    ))}
  </div>
)

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────
const TiltCard = ({ children, style, className, intensity = 8 }) => {
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

// ─── Mobile-only animation primitives ────────────────────────────────────

const MobileOrb = ({ color, size, top, right, left, delay = 0, duration = 8 }) => (
  <motion.div
    animate={{ x: [0, 18, -12, 0], y: [0, -14, 8, 0], scale: [1, 1.08, 0.95, 1] }}
    transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
    style={{ position: 'absolute', top, right, left, width: size, height: size, background: color, borderRadius: '50%', filter: 'blur(32px)', pointerEvents: 'none', zIndex: 0 }}
  />
)

const MobileCTA = ({ to, primary, children, onClick }) => (
  <motion.div whileTap={{ scale: 0.94 }} transition={SPRING_BOUNCY} style={{ flex: 1 }}>
    <Link to={to} onClick={onClick} style={{ minWidth: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px 16px', background: primary ? '#FF5500' : '#fff', color: primary ? '#fff' : '#0A1628', borderRadius: 11, fontWeight: 700, fontSize: 14, boxShadow: primary ? '0 6px 20px rgba(255,85,0,0.35)' : 'none', border: primary ? 'none' : '1.5px solid #E5E7EB', position: 'relative', overflow: 'hidden' }}>
      {primary && (
        <motion.span animate={{ x: ['-110%', '210%'] }} transition={{ repeat: Infinity, duration: 2.4, delay: 1.5, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)', transform: 'skewX(-20deg)' }} />
      )}
      {children}
    </Link>
  </motion.div>
)

const MobileViewToggle = ({ heroView, setHeroView }) => (
  <div style={{ background: '#F0F2F5', borderRadius: 14, padding: 4, display: 'flex', position: 'relative', marginBottom: 22 }}>
    {['student', 'institute'].map(v => (
      <button key={v} onClick={() => setHeroView(v)}
        style={{ flex: 1, padding: '11px 0', borderRadius: 11, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: 'transparent', color: heroView === v ? '#fff' : '#6B7280', position: 'relative', zIndex: 1, transition: 'color 0.2s' }}>
        {heroView === v && (
          <motion.div layoutId="mobileTabPill"
            style={{ position: 'absolute', inset: 0, borderRadius: 11, background: '#FF5500', boxShadow: '0 4px 14px rgba(255,85,0,0.4)', zIndex: -1 }}
            transition={SPRING_SOFT} />
        )}
        {v === 'student' ? '🎓 StudyBoard' : '🏛 Idea2Software'}
      </button>
    ))}
  </div>
)

const MobileStatPill = ({ icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ ...SPRING_BOUNCY, delay }}
    whileTap={{ scale: 0.96 }}
    style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 12, padding: '8px 12px', boxShadow: '0 2px 8px rgba(10,22,40,0.06)' }}>
    <span style={{ fontSize: 16 }}>{icon}</span>
    <div>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#0A1628', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 10, color: '#9CA3AF', lineHeight: 1.2 }}>{label}</div>
    </div>
  </motion.div>
)

// Scroll-triggered heading for mobile sections
const MobileRevealHeading = ({ badge, title, subtitle, delay = 0 }) => {
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

// ─── Main component ────────────────────────────────────────────────────────
const Home = () => {
  const [activeTab, setActiveTab] = useState('students')
  const [heroView, setHeroView] = useState('student')
  const [testimonialTab, setTestimonialTab] = useState('students')
  const [isMobile, setIsMobile] = useState(false)
  const tickerRef = useRef(null)
  const heroScrollRef = useRef(null)
  const isTransitioning = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const el = tickerRef.current; if (!el) return
    const tween = gsap.to(el, { x: '-50%', duration: 28, ease: 'none', repeat: -1 })
    return () => tween.kill()
  }, [])

  useEffect(() => {
    const lines = document.querySelectorAll('.stat-line')
    lines.forEach((line, i) => {
      gsap.fromTo(line, { width: 0 }, { width: '100%', duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: line, start: 'top 85%', once: true }, delay: i * 0.1 })
    })
  }, [])

  useEffect(() => {
    if (isMobile) return
    const wrapper = heroScrollRef.current; if (!wrapper) return
    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (wrapper.offsetHeight - window.innerHeight)))
      if (progress >= 0.5 && heroView === 'student' && !isTransitioning.current) {
        isTransitioning.current = true; setHeroView('institute'); setTimeout(() => { isTransitioning.current = false }, 600)
      } else if (progress < 0.5 && heroView === 'institute' && !isTransitioning.current) {
        isTransitioning.current = true; setHeroView('student'); setTimeout(() => { isTransitioning.current = false }, 600)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [heroView, isMobile])

  const isStudent = heroView === 'student'
  const heroFlatBg = '#F8FAFF'

  // Mobile hero stagger config
  const mobileHeroVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } }
  }
  const mobileItemUp = {
    hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: EASE_OUT_EXPO } }
  }

  return (
    <>
      <SEO
        title="One Platform. Everything Campus."
        description="CampusSafar — India's smartest campus platform. SF StudyBoard for JEE, NEET, Board prep with 50,000+ PYQs, virtual labs, AI doubt solver. Idea2Software for institutes."
        canonical="https://campussafar.com"
        schema={homeSchema}
      />
      <Navbar />

      <style>{`
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-sticky { position: relative !important; top: auto !important; height: auto !important; }
          .hero-scroll-wrapper { height: auto !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .hero-view-toggle { display: flex; gap: 8px; margin-bottom: 20px; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr 1fr !important; }
        }
        * { box-sizing: border-box; }
        .section-divider { display: block; margin: 0; padding: 0; line-height: 0; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE HERO — animated entrance + ambient orbs
      ═══════════════════════════════════════════════════════════════ */}
      {isMobile && (
        <section style={{ background: 'linear-gradient(150deg,#F8FAFF 0%,#FFF8F5 50%,#F0F4FF 100%)', padding: '88px 16px 52px', position: 'relative', overflow: 'hidden', minHeight: '100svh' }}>

          {/* Animated grid */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
            style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(10,22,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.04) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

          {/* Ambient orbs */}
          {!prefersReducedMotion && (
            <>
              <MobileOrb color="radial-gradient(circle, rgba(255,85,0,0.18) 0%, transparent 70%)" size={260} top="-40px" right="-60px" delay={0} duration={9} />
              <MobileOrb color="radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)" size={200} top="40%" left="-50px" delay={2} duration={11} />
              <MobileOrb color="radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)" size={180} top="70%" right="-40px" delay={1} duration={10} />
            </>
          )}

          <motion.div initial="hidden" animate="visible" variants={mobileHeroVariants} style={{ position: 'relative', zIndex: 1 }}>

            {/* Badge */}
            <motion.div variants={mobileItemUp}>
              <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(255,85,0,0.25)', borderRadius: 999, padding: '5px 12px', fontSize: 12, fontWeight: 500, color: '#FF5500', marginBottom: 20, background: 'rgba(255,85,0,0.06)' }}>
                <motion.span animate={{ scale: [1, 1.6, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF5500', display: 'inline-block' }} />
                India's Smartest Campus Platform
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div variants={mobileItemUp}>
              <AnimatePresence mode="wait">
                <motion.h1 key={heroView + '-mob-title'}
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                  style={{ fontSize: 38, fontWeight: 900, color: '#0A1628', lineHeight: 1.06, marginBottom: 14, letterSpacing: '-1.5px' }}>
                  {isStudent ? (<>One Platform.<br /><span style={{ color: '#FF5500' }}>Everything</span><br />Campus.</>) : (<>Run Your<br /><span style={{ color: '#FF5500' }}>Institute.</span><br />Smarter.</>)}
                </motion.h1>
              </AnimatePresence>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={mobileItemUp}>
              <AnimatePresence mode="wait">
                <motion.p key={heroView + '-mob-sub'}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.75, marginBottom: 22 }}>
                 {isStudent ? 'SF StudyBoard for students. Idea2Software with 5+ apps for institutes.' : 'Campus360, CampusCMS, CampusSeating, CampusDocs and CampusERP — all in one dashboard.'}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Tab toggle */}
            <motion.div variants={mobileItemUp}>
              <MobileViewToggle heroView={heroView} setHeroView={setHeroView} />
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={mobileItemUp}>
              <AnimatePresence mode="wait">
                <motion.div key={heroView + '-mob-stats'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
                  {(isStudent
                    ? [{ v: '50,000+', l: 'PYQs', icon: '📄' }, { v: '300+', l: 'Virtual Labs', icon: '🧪' }, { v: 'AI', l: 'Doubt Solver', icon: '🤖' }, { v: 'All India', l: 'Test Series', icon: '🏆' }]
                    : [{ v: '5+', l: 'SaaS Apps', icon: '⚡' }, { v: '24 hrs', l: 'Setup Time', icon: '🚀' }, { v: 'AMS·NBN', l: '& More', icon: '📋' }, { v: '100%', l: 'Managed', icon: '✅' }]
                  ).map((s, i) => <MobileStatPill key={s.l} icon={s.icon} value={s.v} label={s.l} delay={0.05 + i * 0.07} />)}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={mobileItemUp}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                <MobileCTA to="/products/studyboard" primary onClick={() => trackEvent('cta_click', { button: 'get_started_free', location: 'mobile_hero' })}>
                  Get Started Free →
                </MobileCTA>
                <MobileCTA to="/contact">Book Demo</MobileCTA>
              </div>
            </motion.div>

            {/* Feature slider */}
            <motion.div variants={mobileItemUp}>
              <AnimatePresence mode="wait">
                <motion.div key={heroView + '-mob-slider'}
                  initial={{ opacity: 0, x: 30, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{isStudent ? '🎓 SF StudyBoard Features' : '🏛 Idea2Software Apps'}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>Drag to explore →</div>
                  </div>
                  <FeatureSlider features={isStudent ? studyboardFeatures : saasFeatures} accentColor={isStudent ? '#FF5500' : '#7C3AED'} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={mobileItemUp}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(10,22,40,0.07)' }}>
                {[{ icon: '🔒', text: 'Free to start' }, { icon: '⭐', text: '5.0 rated' }, { icon: '🇮🇳', text: 'Made in India' }].map((t, i) => (
                  <motion.span key={t.text}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#9CA3AF', fontWeight: 500 }}>
                    {t.icon} {t.text}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP HERO — scroll hijack (unchanged)
      ═══════════════════════════════════════════════════════════════ */}
      {!isMobile && (
        <div ref={heroScrollRef} className="hero-scroll-wrapper" style={{ height: '200vh', position: 'relative' }}>
          <div className="hero-sticky" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
            <motion.div animate={{ background: isStudent ? 'linear-gradient(150deg,#F8FAFF 0%,#FFF8F5 50%,#F0F4FF 100%)' : 'linear-gradient(150deg,#F0F4FF 0%,#F8FAFF 50%,#FFF8F5 100%)' }} transition={{ duration: 0.8, ease: EASE_IN_OUT }} style={{ position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(10,22,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.04) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 }} />
            <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: '5%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(255,85,0,0.07) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
            <AnimatePresence>
              {isStudent && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.8, duration: 0.5 }}
                  style={{ position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Scroll to see Idea2Software</span>
                  <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
                    style={{ width: 18, height: 18, borderLeft: '2px solid #9CA3AF', borderBottom: '2px solid #9CA3AF', transform: 'rotate(-45deg)', borderRadius: 2 }} />
                </motion.div>
              )}
            </AnimatePresence>
            <HeroDots active={isStudent ? 0 : 1} />
            <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
              <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 64, alignItems: 'center', width: '100%' }}>
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div key={heroView + '-badge'} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,85,0,0.25)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 500, color: '#FF5500', marginBottom: 24, background: 'rgba(255,85,0,0.06)' }}>
                      <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5500', display: 'inline-block' }} />
                      {isStudent ? "India's Smartest Study Platform" : "Campus Management Made Simple"}
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.h1 key={heroView + '-title'} initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                      style={{ fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 900, color: '#0A1628', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-1.2px' }}>
                      {isStudent ? <><span style={{ color: '#FF5500' }}>SF StudyBoard</span><br />One Platform.<br />Everything Campus.</> : <><span style={{ color: '#FF5500' }}>Idea2Software</span><br />Run Your Institute.<br />Smarter & Faster.</>}
                    </motion.h1>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p key={heroView + '-sub'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.05 }}
                      style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.8, marginBottom: 28, maxWidth: 380 }}>
                     {isStudent ? 'Practice 50,000+ PYQs, explore 300+ virtual labs, solve doubts with AI,compete in All India test series and connect with institute.' : 'Campus360, CampusCMS, CampusSeating, CampusDocs, CampusERP and more - 5+ powerful apps for colleges and schools.'}
                    </motion.p>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div key={heroView + '-stats'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
                      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                      {(isStudent
                        ? [{ v: '50,000+', l: 'PYQs', icon: '📄' }, { v: '300+', l: 'Virtual Labs', icon: '🧪' }, { v: 'AI', l: 'Doubt Solver', icon: '🤖' }, { v: 'All India', l: 'Test Series', icon: '🏆' }]
                        : [{ v: '5+', l: 'SaaS Apps', icon: '⚡' }, { v: '24 hrs', l: 'Setup Time', icon: '🚀' }, { v: 'AMS·NBN', l: '& More', icon: '📋' }, { v: '100%', l: 'Managed', icon: '✅' }]
                      ).map((s, i) => (
                        <motion.div key={s.l} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 300 }}
                          style={{ padding: '10px 12px', background: '#fff', borderRadius: 10, border: '1.5px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 16 }}>{s.icon}</span>
                          <div><div style={{ fontSize: 13, fontWeight: 800, color: '#0A1628' }}>{s.v}</div><div style={{ fontSize: 10, color: '#9CA3AF' }}>{s.l}</div></div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div key={heroView + '-cta'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.12 }}
                      style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                      {isStudent ? (
                        <>
                          <MagneticBtn>
                            <Link to="/products/studyboard" onClick={() => trackEvent('cta_click', { button: 'get_started_free', location: 'hero' })}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700, fontSize: 15, boxShadow: '0 6px 24px rgba(255,85,0,0.4)', position: 'relative', overflow: 'hidden' }}>
                              <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, delay: 2, ease: 'linear' }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)', transform: 'skewX(-20deg)' }} />
                              Get Started Free <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                            </Link>
                          </MagneticBtn>
                          <MagneticBtn><Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 24px', border: '1.5px solid #E5E7EB', color: '#0A1628', borderRadius: 11, fontWeight: 600, fontSize: 15, background: '#fff' }}>Book Demo</Link></MagneticBtn>
                        </>
                      ) : (
                        <>
                          <MagneticBtn>
                            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700, fontSize: 15, boxShadow: '0 6px 24px rgba(255,85,0,0.4)', position: 'relative', overflow: 'hidden' }}>
                              <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, delay: 2, ease: 'linear' }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)', transform: 'skewX(-20deg)' }} />
                              Book a Free Demo <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                            </Link>
                          </MagneticBtn>
                          <MagneticBtn><Link to="/products/campus-suite" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 24px', border: '1.5px solid #E5E7EB', color: '#0A1628', borderRadius: 11, fontWeight: 600, fontSize: 15, background: '#fff' }}>Explore Idea2Software</Link></MagneticBtn>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                    {[{ icon: '🔒', text: 'Free to start' }, { icon: '⭐', text: '5.0 rated' }, { icon: '🇮🇳', text: 'Made in India' }].map(t => (
                      <span key={t.text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#9CA3AF', fontWeight: 500 }}>{t.icon} {t.text}</span>
                    ))}
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={heroView + '-slider'} initial={{ opacity: 0, x: 40, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -40, scale: 0.97 }} transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 10, padding: '7px 14px', marginBottom: 8 }}>
                        <span style={{ fontSize: 16 }}>{isStudent ? '🎓' : '🏛'}</span>
                        <span style={{ fontWeight: 700, fontSize: 14, color: '#0A1628' }}>{isStudent ? 'SF StudyBoard — Features' : 'Idea2Software - Apps'}</span>
                        <span style={{ fontSize: 11, color: '#9CA3AF' }}>drag →</span>
                      </div>
                    </div>
                    <FeatureSlider features={isStudent ? studyboardFeatures : saasFeatures} accentColor={isStudent ? '#FF5500' : '#7C3AED'} />
                    <motion.div style={{ marginTop: 16 }}>
                      <Link to={isStudent ? '/products/studyboard' : '/products/campus-suite'}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#FF5500', textDecoration: 'none' }}>
                        View all {isStudent ? 'StudyBoard' : 'Idea2Software'} features
                        <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dividers + all remaining sections unchanged from original ─────── */}

      <div className="section-divider"><WaveDivider fromColor={heroFlatBg} toColor="#FF5500" height={56} /></div>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', background: '#FF5500', padding: '13px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(90deg,#FF5500,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(270deg,#FF5500,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div ref={tickerRef} style={{ display: 'flex', gap: 14, whiteSpace: 'nowrap', width: 'max-content' }}>
          {tickerLoop.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 999, padding: '7px 16px', fontSize: 13, fontWeight: 600, color: '#fff' }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>{item.text}
            </span>
          ))}
        </div>
      </div>

      <div className="section-divider"><CurveDivider fromColor="#FF5500" toColor="#ffffff" height={64} /></div>

      {/* PRODUCTS */}
      <section className="section" style={{ background: '#fff', overflow: 'hidden', padding: 'clamp(48px,6vw,96px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading badge="Our Products" title={<>Built for Students.<br />Designed for Institutes.</>} subtitle="Choose your path - we have a platform for everyone." />
          ) : (
            <Reveal style={{ marginBottom: 48, textAlign: 'center' }}>
              <span className="badge">Our Products</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>Built for Students.<br />Designed for Institutes.</h2>
              <p className="section-sub">Choose your path - we have a platform for everyone.</p>
            </Reveal>
          )}
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Reveal delay={0.05}>
              <TiltCard intensity={5} style={{ border: '2px solid #FF5500', borderRadius: 20, padding: 'clamp(24px,3vw,40px)', position: 'relative', overflow: 'hidden', height: '100%', background: '#fff' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle,rgba(255,85,0,0.08) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, fontWeight: 600, color: '#FF5500', background: '#FFF0EB', padding: '3px 10px', borderRadius: 999 }}>For Students & Parents</span>
                <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#FF5500,#FF8C00)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16, boxShadow: '0 8px 24px rgba(255,85,0,0.3)' }}>🎓</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 10 }}>SF StudyBoard</h3>
                <p style={{ color: '#6B7280', marginBottom: 20, lineHeight: 1.75, fontSize: 14 }}>Practice PYQs, attempt mock tests, explore virtual labs, solve doubts with AI, everything a student needs in one place.</p>
                {['50,000+ Practice Questions (PYQs)', '300+ Virtual Labs', 'AI Doubt Solver', 'JEE • NEET • Board Prep', 'All India Test Series', 'Custom Exam Builder'].map((f, i) => (
                  <motion.div key={f} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: EASE_OUT_EXPO }}
                    style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9, fontSize: 13 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#FF5500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#374151', fontWeight: 500 }}>{f}</span>
                  </motion.div>
                ))}
                <div style={{ marginTop: 24 }}>
                  <motion.div whileTap={{ scale: 0.97 }} transition={SPRING_BOUNCY}>
                    <Link to="/products/studyboard" style={{ display: 'block', textAlign: 'center', padding: '13px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700, fontSize: 14, boxShadow: '0 4px 16px rgba(255,85,0,0.35)' }}>Explore StudyBoard →</Link>
                  </motion.div>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.12}>
              <TiltCard intensity={5} style={{ border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 'clamp(24px,3vw,40px)', background: '#0A1628', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', top: -40, left: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(255,85,0,0.1) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, fontWeight: 600, color: '#9CA3AF', background: '#112240', padding: '3px 10px', borderRadius: 999 }}>For Colleges & Schools</span>
                <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#112240,#1E3A6E)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>🏛</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Idea2Software</h3>
                <p style={{ color: '#94A3B8', marginBottom: 20, lineHeight: 1.75, fontSize: 14 }}>5+ powerful web applications for institutes, manage everything from one unified dashboard.</p>
                {['Campus360: Student Development Tracking', 'CampusCMS: Content & Records Management', 'CampusSeating: Exam Seating Arrangement', 'CampusDocs: Document Automation', 'CampusERP: School & Coaching Management', 'Setup in 24 Hours: We Do It For You'].map((f, i) => (
                  <motion.div key={f} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: EASE_OUT_EXPO }}
                    style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9, fontSize: 13 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#FF5500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#94A3B8', fontWeight: 500 }}>{f}</span>
                  </motion.div>
                ))}
                <div style={{ marginTop: 24 }}>
                  <motion.div whileTap={{ scale: 0.97 }} transition={SPRING_BOUNCY}>
                    <Link to="/products/campus-suite" style={{ display: 'block', textAlign: 'center', padding: '13px', background: '#fff', color: '#0A1628', borderRadius: 11, fontWeight: 700, fontSize: 14 }}>Explore Idea2Software →</Link>
                  </motion.div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider"><StadiumDivider fromColor="#ffffff" toColor="#F8FAFF" height={64} /></div>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: '#F8FAFF', overflow: 'hidden', padding: 'clamp(48px,6vw,96px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading badge="How It Works" title="Get Started in Minutes." subtitle="Whether you're a student or an institute - setup is simple, fast, and free to try." />
          ) : (
            <Reveal style={{ marginBottom: 48, textAlign: 'center' }}>
              <span className="badge">How It Works</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>Get Started in Minutes.</h2>
              <p className="section-sub">Whether you're a student or an institute - setup is simple, fast, and free to try.</p>
            </Reveal>
          )}
          <Reveal style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{ background: '#E9EEF8', borderRadius: 999, padding: 5, display: 'inline-flex', position: 'relative' }}>
              {['students', 'institutes'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px clamp(16px,2.5vw,28px)', borderRadius: 999, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', background: 'transparent', color: activeTab === tab ? '#fff' : '#6B7280', position: 'relative', zIndex: 1, transition: 'color 0.25s' }}>
                  {activeTab === tab && <motion.div layoutId="tabPill" style={{ position: 'absolute', inset: 0, background: '#FF5500', borderRadius: 999, zIndex: -1, boxShadow: '0 4px 16px rgba(255,85,0,0.35)' }} transition={{ type: 'spring', stiffness: 450, damping: 32 }} />}
                  For {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }} transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}>
              <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {(activeTab === 'students' ? [
                  { n: '01', icon: '👤', title: 'Create Your Account', desc: 'Sign up free with Google or email. No credit card needed. Takes 30 seconds.', tag: 'Free Forever' },
                  { n: '02', icon: '🎯', title: 'Pick Your Goal', desc: 'Choose JEE, NEET, Boards or your exam. We personalize your entire experience.', tag: 'Personalized', highlight: true },
                  { n: '03', icon: '🚀', title: 'Start Learning', desc: 'Practice PYQs, attempt tests, explore labs and solve doubts with AI - instantly.', tag: 'All Tools Unlocked' }
                ] : [
                  { n: '01', icon: '📅', title: 'Book a Free Demo', desc: 'Schedule a 30-min call. We walk you through everything live.', tag: 'Free, No Obligation' },
                  { n: '02', icon: '⚙️', title: 'We Setup Everything', desc: 'Our team configures Campus360, CampusCMS, CampusERP and more in 24 hours.', tag: 'Done For You', highlight: true },
                  { n: '03', icon: '🚀', title: 'Go Live Instantly', desc: 'Start managing attendance, notices, certificates and more from Day 1.', tag: 'Full Training Included' }
                ]).map((step, i) => (
                  <motion.div key={step.n} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.55, ease: EASE_OUT_EXPO }}
                    whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}
                    style={{ background: step.highlight ? '#0A1628' : '#fff', border: step.highlight ? '1px solid rgba(255,255,255,0.08)' : '1.5px solid #E5E7EB', borderRadius: 18, padding: 'clamp(20px,2.5vw,32px)' }}>
                    <div style={{ position: 'relative', width: 48, height: 48, marginBottom: 16 }}>
                      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }} transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
                        style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1.5px solid #FF5500' }} />
                      <div style={{ width: 48, height: 48, background: '#FF5500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>{step.n}</div>
                    </div>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: step.highlight ? '#fff' : '#0A1628', marginBottom: 8 }}>{step.title}</h3>
                    <p style={{ fontSize: 13, color: step.highlight ? '#94A3B8' : '#6B7280', lineHeight: 1.75, marginBottom: 14 }}>{step.desc}</p>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#FF5500', background: step.highlight ? 'rgba(255,85,0,0.15)' : '#FFF0EB', padding: '4px 11px', borderRadius: 999 }}>✓ {step.tag}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <Reveal delay={0.2} style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
              <Link to="/products/studyboard" style={{ padding: '13px 24px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700, fontSize: 15, display: 'inline-block', boxShadow: '0 4px 16px rgba(255,85,0,0.35)' }}>Get Started Free →</Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
              <Link to="/contact" style={{ padding: '13px 24px', border: '1.5px solid #E5E7EB', color: '#0A1628', borderRadius: 11, fontWeight: 600, fontSize: 15, display: 'inline-block', background: '#fff' }}>
                {activeTab === 'students' ? 'See Institute Journey →' : 'Book a Free Demo →'}
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider"><CurveDivider fromColor="#F8FAFF" toColor="#040D1E" height={72} /></div>

      {/* STATS */}
      <section style={{ background: '#040D1E', padding: 'clamp(64px,8vw,96px) 0', position: 'relative', overflow: 'hidden' }}>
        <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(255,85,0,0.08) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading title="Trusted. Tested. Growing." />
          ) : (
            <Reveal style={{ marginBottom: 48, textAlign: 'center' }}>
              <span style={{ display: 'inline-flex', padding: '5px 14px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, fontSize: 12, color: '#94A3B8', marginBottom: 14 }}>By The Numbers</span>
              <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#fff', marginTop: 8 }}>Trusted. Tested. Growing.</h2>
            </Reveal>
          )}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[
              { icon: '📄', value: '50,000+', label: 'Practice Questions', sub: 'JEE · NEET · Boards · Different Exams' },
              { icon: '🧪', value: '300+', label: 'Virtual Labs', sub: 'Interactive simulations Class 6–12' },
              { icon: '⚡', value: '5+', label: 'SaaS Apps', sub: 'AMS, NBN, DCS, CP Track & more', tag: 'Idea2Software' },
              { icon: '🏛', value: '2', label: 'College Partner', sub: 'Onboarding more institutes now', tag: 'Early Access' }
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6, borderColor: 'rgba(255,85,0,0.5)' }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.25 }}
                  style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: 'clamp(16px,2vw,28px)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: 24, marginBottom: 14 }}>{s.icon}</div>
                  <div style={{ fontSize: 'clamp(28px,3vw,38px)', fontWeight: 900, color: '#FF5500', marginBottom: 4, letterSpacing: '-1px', lineHeight: 1 }}>
                    <Counter value={s.value} />
                    {s.tag && <span style={{ fontSize: 9, background: '#FF5500', color: '#fff', padding: '2px 7px', borderRadius: 999, verticalAlign: 'middle', marginLeft: 6 }}>{s.tag}</span>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: '#4B5563', lineHeight: 1.6, marginBottom: 16 }}>{s.sub}</div>
                  <div style={{ height: 2, background: 'rgba(255,85,0,0.2)', borderRadius: 999, overflow: 'hidden' }}>
                    <div className="stat-line" style={{ height: '100%', background: '#FF5500', borderRadius: 999, width: 0 }} />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: '#374151' }}>Made with ❤️ in India 🇮🇳 &nbsp;·&nbsp; Building the future of campus learning</p>
        </div>
      </section>

      <div className="section-divider"><DiagonalDivider fromColor="#040D1E" toColor="#ffffff" height={56} direction="left" /></div>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: '#fff', overflow: 'hidden', padding: 'clamp(48px,6vw,96px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading badge="What People Say" title="Loved by Students & Faculty." />
          ) : (
            <Reveal style={{ marginBottom: 36, textAlign: 'center' }}>
              <span className="badge">What People Say</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>Loved by Students & Faculty.</h2>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FF5500', fontSize: 18 }}>★</span>)}
                <span style={{ fontSize: 13, color: '#6B7280', marginLeft: 6 }}>5.0 from early users</span>
              </div>
            </Reveal>
          )}

          {/* Mobile star reveal */}
          {isMobile && (
            <Reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 24, marginTop: -8 }}>
              {[...Array(5)].map((_, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0.5, rotate: -30 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07, ...SPRING_BOUNCY }} style={{ color: '#FF5500', fontSize: 20 }}>★</motion.span>
              ))}
              <motion.span initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.4 }}
                style={{ fontSize: 13, color: '#6B7280', marginLeft: 6 }}>5.0 from early users</motion.span>
            </Reveal>
          )}

          <Reveal style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
            <div style={{ background: '#F3F4F6', borderRadius: 999, padding: 5, display: 'inline-flex', position: 'relative' }}>
              {[{ id: 'students', label: '🎓 Students' }, { id: 'faculty', label: '⭐ Featured Faculty' }].map(tab => (
                <button key={tab.id} onClick={() => setTestimonialTab(tab.id)} style={{ padding: '10px clamp(16px,2.5vw,26px)', borderRadius: 999, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', background: 'transparent', color: testimonialTab === tab.id ? '#fff' : '#6B7280', position: 'relative', zIndex: 1, transition: 'color 0.25s', whiteSpace: 'nowrap' }}>
                  {testimonialTab === tab.id && <motion.div layoutId="testimonialPill" style={{ position: 'absolute', inset: 0, background: '#FF5500', borderRadius: 999, zIndex: -1, boxShadow: '0 4px 16px rgba(255,85,0,0.35)' }} transition={{ type: 'spring', stiffness: 450, damping: 32 }} />}
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={testimonialTab} initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }} transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              style={{ padding: isMobile ? '0' : '0 28px' }}>
              {testimonialTab === 'students' ? (
                <TestimonialSlider items={studentTestimonials} kind="student" />
              ) : (
                <TestimonialSlider items={facultyAdvisors} kind="faculty" />
              )}
            </motion.div>
          </AnimatePresence>
          {testimonialTab === 'faculty' && (
            <p style={{ textAlign: 'center', marginTop: 28, fontSize: 11.5, color: '#9CA3AF', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              Profiles shown are for academic credential reference and do not represent product endorsements.
            </p>
          )}
        </div>
      </section>

      <div className="section-divider"><WaveDivider fromColor="#ffffff" toColor="#040D1E" height={64} flip={false} /></div>

      {/* CTA FINAL */}
      <section style={{ background: '#040D1E', padding: 'clamp(64px,8vw,112px) 0', position: 'relative', overflow: 'hidden' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          style={{ position: 'absolute', top: '-30%', left: '-10%', width: '70%', height: '160%', background: 'conic-gradient(from 0deg at 50% 50%,rgba(255,85,0,0.05) 0deg,transparent 60deg,rgba(255,85,0,0.03) 180deg,transparent 240deg,rgba(255,85,0,0.05) 360deg)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 clamp(16px,4vw,40px)' }}>
          <Reveal>
            <motion.span animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,85,0,0.4)', 'rgba(255,255,255,0.1)'] }} transition={{ repeat: Infinity, duration: 3 }}
              style={{ display: 'inline-flex', padding: '5px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, fontSize: 12, color: '#94A3B8', marginBottom: 24 }}>
              Start Today — It's Free
            </motion.span>
            <h2 style={{ fontSize: 'clamp(28px,5vw,54px)', fontWeight: 900, color: '#fff', marginBottom: 18, lineHeight: 1.08, letterSpacing: '-1.5px' }}>
              Ready to{' '}
              <motion.span animate={{ color: ['#FF5500', '#FF8C00', '#FF5500'] }} transition={{ repeat: Infinity, duration: 3 }}>Transform</motion.span>
              <br />Your Campus Journey?
            </h2>
            <p style={{ color: '#6B7280', fontSize: 'clamp(14px,2vw,17px)', marginBottom: 36, lineHeight: 1.7 }}>
              Join students and institutes already<br />building smarter with CampusSafar.
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

      <Footer />
    </>
  )
}

export default Home