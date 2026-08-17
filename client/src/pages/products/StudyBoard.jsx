import { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { Link } from 'react-router-dom'
import trackEvent from '../../utils/trackEvent'

const studyBoardSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SF StudyBoard",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "description": "SF StudyBoard -India's most complete student learning platform. 50,000+ PYQs for JEE, NEET, Boards. Virtual labs, AI doubt solver, test series. Free forever.",
  "provider": { "@type": "Organization", "name": "CampusSafar", "url": "https://campussafar.com" }
}

const exams = [
  { icon: '⚛️', name: 'JEE Main & Advanced', tags: ['Physics', 'Chemistry', 'Maths'], count: '5,000+ Questions', active: true },
  { icon: '🩺', name: 'NEET UG', tags: ['Biology', 'Physics', 'Chemistry'], count: '4,000+ Questions', active: true },
  { icon: '🎓', name: 'Class 10 & 12 Boards', tags: ['CBSE', 'State Boards', 'ICSE'], count: '6,000+ Questions', active: true },
  { icon: '➕', name: 'More Coming Soon', tags: ['CET', 'CUET', 'and more exams being added.'], count: null, soon: true }
]

const tools = [
  { icon: '📚', title: 'PYQ Practice', desc: '50,000+ questions across all subjects', dark: false },
  { icon: '🧪', title: 'Virtual Labs', desc: '600+ simulations for science practicals', dark: true },
  { icon: '🤖', title: 'AI Doubt Solver', desc: 'Instant answers, 24/7 available', dark: false },
  { icon: '🏆', title: 'SF Test Series', desc: 'Full mock tests with national rank', dark: false },
  { icon: '√x', title: 'Formula Books', desc: 'Physics, Chemistry, Maths sheets', dark: false },
  { icon: '📖', title: 'eBooks Library', desc: 'NCERT + Reference books included', dark: false }
]

// ── Global animation styles ─────────────────────────────────────────────
const AnimStyles = () => (
  <style>{`
    @keyframes fadeInUp { from { opacity:0; transform: translateY(26px); } to { opacity:1; transform: translateY(0); } }
    @keyframes slideInRight { from { opacity:0; transform: translateX(50px); } to { opacity:1; transform: translateX(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes floatBlob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(18px,-18px) scale(1.08); } }
    @keyframes pulseBlob { 0%,100% { opacity:.18; } 50% { opacity:.32; } }
    @keyframes popIn { from { opacity:0; transform: scale(0.85); } to { opacity:1; transform: scale(1); } }
    @keyframes gentleSway { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(4deg); } }

    .reveal { opacity:0; transform: translateY(28px); transition: opacity .7s cubic-bezier(.16,.84,.44,1), transform .7s cubic-bezier(.16,.84,.44,1); }
    .reveal.visible { opacity:1; transform: translateY(0); }

    .hero-anim { opacity:0; animation: fadeInUp .8s cubic-bezier(.16,.84,.44,1) forwards; }
    .mockup-anim { opacity:0; animation: slideInRight .9s cubic-bezier(.16,.84,.44,1) forwards; }
    .stat-anim { opacity:0; animation: popIn .5s cubic-bezier(.34,1.56,.64,1) forwards; }

    .card-anim { transition: transform .35s cubic-bezier(.16,.84,.44,1), box-shadow .35s ease, border-color .35s ease; }
    .card-anim:hover { transform: translateY(-8px); box-shadow: 0 20px 44px rgba(10,22,40,0.14); }
    .card-anim .icon-bounce { display:inline-block; transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
    .card-anim:hover .icon-bounce { transform: scale(1.18) rotate(-6deg); }

    .btn-anim { transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, opacity .25s ease; display:inline-block; }
    .btn-anim:hover { transform: translateY(-3px) scale(1.03); }
    .btn-anim:active { transform: translateY(-1px) scale(0.99); }

    .orb-float { animation: floatBlob 9s ease-in-out infinite; }
    .orb-pulse { animation: pulseBlob 6s ease-in-out infinite; }

    .badge-sway { display:inline-block; animation: gentleSway 3.5s ease-in-out infinite; transform-origin: 60% 90%; }

    @media (prefers-reduced-motion: reduce) {
      .reveal, .hero-anim, .mockup-anim, .stat-anim, .card-anim, .card-anim .icon-bounce,
      .btn-anim, .orb-float, .orb-pulse, .badge-sway {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `}</style>
)

// ── Reveal-on-scroll wrapper ────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '', style = {} }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}

// ── SVG Dividers (matching Home.jsx exactly) ─────────────────────────────



// const CurveDivider = ({ fromColor, toColor, height = 80, invert = false }) => (
//   <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
//     <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
//       style={{ display: 'block', width: '100%', height, transform: invert ? 'scaleY(-1)' : 'none' }}>
//       <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill={toColor} />
//     </svg>
//   </div>
// )

const StadiumDivider = ({ fromColor, toColor, height = 72 }) => (
  <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
    <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height }}>
      <path d="M0,72 Q720,-20 1440,72 L1440,72 L0,72 Z" fill={toColor} />
    </svg>
  </div>
)

const DiagonalDivider = ({ fromColor, toColor, height = 56, direction = 'left' }) => {
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

const StudyBoard = () => {
  return (
    <>
      <SEO
        title="SF StudyBoard -India's Most Complete Student Learning Platform"
        description="Practice JEE, NEET, Board PYQs with 50,000+ questions. 600+ virtual labs, AI doubt solver, mock tests, formula books. Free to start. No app download needed."
        canonical="https://campussafar.com/products/studyboard"
        schema={studyBoardSchema}
      />
      <AnimStyles />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: '#0A1628',
        padding: '48px 0 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient glow */}
        <div className="orb-float orb-pulse" style={{
          position: 'absolute', top: -80, right: -80, width: 320, height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,85,0,0.18), transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div className="orb-float orb-pulse" style={{
          position: 'absolute', bottom: 60, left: -60, width: 260, height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)',
          pointerEvents: 'none',
          animationDelay: '2s'
        }} />

        <div className="container" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <div className="hero-anim" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B', marginBottom: 28, animationDelay: '0s' }}>
            <Link to="/" style={{ color: '#94A3B8' }}>Home</Link>
            <span>/</span>
            <Link to="/#products" style={{ color: '#94A3B8' }}>Products</Link>
            <span>/</span>
            <span style={{ color: '#FF5500', fontWeight: 600 }}>SF StudyBoard</span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 40,
            paddingBottom: 56
          }}>
            {/* Left: copy */}
            <div style={{ maxWidth: 640, flex: '1 1 420px' }}>
              <div className="hero-anim" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, animationDelay: '0.08s' }}>
                <div className="badge-sway" style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'linear-gradient(135deg,#FF5500,#FF7A33)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                  boxShadow: '0 8px 24px rgba(255,85,0,0.35)'
                }}>📚</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#FF5500', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    For Students · Free Forever
                  </div>
                  <h1 style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: 0 }}>
                    SF StudyBoard
                  </h1>
                </div>
              </div>

              <p className="hero-anim" style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7, marginBottom: 28, maxWidth: 520, animationDelay: '0.16s' }}>
                India's most complete student learning platform -practice PYQs, attempt mock tests,
                explore virtual labs and solve doubts with AI. Free to start, no app download needed.
              </p>

              <div className="hero-anim" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24, animationDelay: '0.24s' }}>
                <Link
                  to="/contact"
                  onClick={() => trackEvent('cta_click', { button: 'get_started_free', location: 'studyboard_hero' })}
                  className="btn-anim"
                  style={{
                    padding: '13px 26px', background: '#FF5500', color: '#fff',
                    borderRadius: 12, fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap',
                    boxShadow: '0 6px 24px rgba(255,85,0,0.4)'
                  }}>
                  Get Started Free →
                </Link>
                <a href="#features" className="btn-anim" style={{
                  padding: '13px 26px', border: '1.5px solid rgba(255,255,255,0.16)',
                  color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap'
                }}>
                  See All Features
                </a>
              </div>

              {/* Pill badges */}
              <div className="hero-anim" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', animationDelay: '0.32s' }}>
                {[
                  { icon: '✓', label: 'Free Forever' },
                  { icon: '🎯', label: 'JEE • NEET • Boards' },
                  { icon: '📱', label: 'No App Download Needed' }
                ].map(t => (
                  <span key={t.label} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 999, padding: '7px 14px',
                    fontSize: 13, color: '#CBD5E1', fontWeight: 500, whiteSpace: 'nowrap'
                  }}>
                    <span style={{ color: '#22C55E' }}>{t.icon}</span> {t.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: stat grid */}
            <div className="mockup-anim" style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 14, flex: '0 1 320px', width: '100%', maxWidth: 320,
              animationDelay: '0.3s'
            }}>
              {[
                ['50,000+', 'Practice Questions'],
                ['600+', 'Virtual Labs'],
                ['4+', 'Exam Categories'],
                ['24/7', 'AI Doubt Solver']
              ].map(([v, l], i) => (
                <div key={l} className="stat-anim" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '18px 20px',
                  animationDelay: `${0.7 + i * 0.1}s`
                }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#FF5500', marginBottom: 4 }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero bottom → wave into white */}
        {/* <div style={{ lineHeight: 0 }}>
          <WaveDivider fromColor="#0A1628" toColor="#ffffff" height={64} />
        </div> */}
      </section>

      {/* ── SUPPORTED EXAMS ──────────────────────────────────────────── */}
      <section className="section" id="features" style={{ background: '#ffffff' }}>
        <div className="container">
          <Reveal className="text-center" style={{ marginBottom: 56 }}>
            <span className="badge">🎓 Supported Exams</span>
            <h2 className="section-title">Built for Every Indian Student.</h2>
            <p className="section-sub">One platform covering all major competitive and board exams in India.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {exams.map((exam, i) => (
              <Reveal key={exam.name} delay={i * 90}>
                <div className="card-anim" style={{
                  border: exam.soon ? '1.5px dashed #E5E7EB' : `2px solid ${exam.active ? '#FF5500' : '#E5E7EB'}`,
                  borderRadius: 16, padding: 24,
                  background: exam.soon ? '#FAFAFA' : '#fff',
                  display: 'flex', flexDirection: 'column', height: '100%'
                }}>
                  <div className="icon-bounce" style={{ fontSize: 32, marginBottom: 12 }}>{exam.icon}</div>
                  <h3 style={{
                    fontSize: 16, fontWeight: 700,
                    color: exam.soon ? '#9CA3AF' : '#0A1628',
                    marginBottom: 12, lineHeight: 1.3
                  }}>{exam.name}</h3>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16, flex: 1 }}>
                    {exam.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 11, padding: '3px 8px',
                        background: exam.soon ? '#F3F4F6' : '#F0F4FF',
                        color: exam.soon ? '#9CA3AF' : '#3B82F6',
                        borderRadius: 6, lineHeight: 1.5
                      }}>{t}</span>
                    ))}
                  </div>
                  {exam.count
                    ? <div style={{ fontSize: 14, fontWeight: 700, color: '#FF5500' }}>{exam.count}</div>
                    : <span style={{
                      fontSize: 12, padding: '4px 10px',
                      background: '#FFF0EB', color: '#FF5500',
                      borderRadius: 999, fontWeight: 500, alignSelf: 'flex-start'
                    }}>🚀 Stay Tuned</span>
                  }
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* white → #F8FAFF stadium curve */}
      <div style={{ lineHeight: 0 }}>
        <StadiumDivider fromColor="#ffffff" toColor="#F8FAFF" height={64} />
      </div>

      {/* ── SIX TOOLS ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: '#F8FAFF' }}>
        <div className="container">
          <Reveal className="text-center" style={{ marginBottom: 56 }}>
            <span className="badge">⭐ Everything Inside StudyBoard</span>
            <h2 className="section-title">Six Powerful Tools. One Platform.</h2>
            <p className="section-sub">Everything a serious student needs -nothing they don't.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {tools.map((tool, i) => (
              <Reveal key={tool.title} delay={i * 80}>
                <div className="card-anim" style={{
                  borderRadius: 16, padding: 28,
                  border: tool.dark ? '1.5px solid rgba(255,255,255,0.08)' : '1.5px solid #E5E7EB',
                  background: tool.dark ? '#0A1628' : '#fff', height: '100%'
                }}>
                  <div className="icon-bounce" style={{ fontSize: 32, marginBottom: 12 }}>{tool.icon}</div>
                  <h3 style={{
                    fontSize: 18, fontWeight: 700,
                    color: tool.dark ? '#fff' : '#0A1628',
                    marginBottom: 6, lineHeight: 1.3
                  }}>{tool.title}</h3>
                  <p style={{
                    fontSize: 14, color: tool.dark ? '#94A3B8' : '#6B7280',
                    lineHeight: 1.6, margin: 0
                  }}>{tool.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#ffffff', padding: '0 0 0' }}>
        {/* white → dark diagonal */}
        <div style={{ lineHeight: 0 }}>
          <DiagonalDivider fromColor="#ffffff" toColor="#040D1E" height={56} direction="left" />
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #040D1E 0%, #0A1628 100%)',
          padding: '80px 0 96px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* background grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
            backgroundSize: '48px 48px', pointerEvents: 'none'
          }} />
          {/* ambient orb */}
          <div className="orb-pulse" style={{
            position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
            width: 480, height: 480,
            background: 'radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none'
          }} />

          <Reveal>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
              <span style={{
                display: 'inline-flex', padding: '5px 16px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 999, fontSize: 12, color: '#94A3B8', marginBottom: 24
              }}>
                Start Today -It's Free
              </span>

              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff',
                marginBottom: 18, lineHeight: 1.1, letterSpacing: '-1px'
              }}>
                Ready to <span style={{ color: '#FF5500' }}>Crack Your Exam?</span>
              </h2>

              <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
                Join thousands of students already using SF StudyBoard.<br />
                Free forever. No app download needed.
              </p>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
                <Link
                  to="/contact"
                  onClick={() => trackEvent('cta_click', { button: 'get_started_free', location: 'studyboard_cta' })}
                  className="btn-anim"
                  style={{
                    padding: '15px 32px', background: '#FF5500', color: '#fff',
                    borderRadius: 12, fontWeight: 700, fontSize: 15,
                    display: 'inline-block', boxShadow: '0 8px 40px rgba(255,85,0,0.45)'
                  }}>
                  Get Started Free →
                </Link>
                <Link to="/products/campus-suite" className="btn-anim" style={{
                  padding: '15px 32px',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  color: '#fff', borderRadius: 12,
                  fontWeight: 600, fontSize: 15, display: 'inline-block'
                }}>
                  Explore Idea2Software
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { icon: '🔒', label: 'No credit card' },
                  { icon: '✓', label: 'Free to start' },
                  { icon: '🇮🇳', label: 'Made in India' }
                ].map(t => (
                  <span key={t.label} style={{
                    fontSize: 13, color: '#4B5563',
                    display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500
                  }}>
                    <span style={{ color: '#FF5500' }}>{t.icon}</span> {t.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default StudyBoard