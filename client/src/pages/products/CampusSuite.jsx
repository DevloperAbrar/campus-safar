import { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { Link } from 'react-router-dom'
import trackEvent from '../../utils/trackEvent'

const idea2softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Idea2Software",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://i2s.campussafar.com",
  "description": "Idea2Software by CampusSafar -complete institute management suite. Campus360, CampusCMS, CampusSeating, CampusDocs and CampusERP, all in one dashboard.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "description": "Free demo available" },
  "provider": { "@type": "Organization", "name": "CampusSafar", "url": "https://campussafar.com" }
}

const modules = [
  {
    icon: '🎯', title: 'Campus360', badge: 'Core Module', badgeColor: '#4F46E5',
    desc: '360° student growth tracking, beyond just marks -Academics, Life Skills, Olympiad & Leadership in one engine.',
    features: ['Fully configurable rubric engine, admin builds any assessment', 'Faculty & student attendance, subject-wise', 'Parent dashboard with radar charts & growth trends'],
    dark: false, href: '/products/student-development-tracking-system'
  },
  {
    icon: '📝', title: 'CampusCMS', badge: 'Core Module', badgeColor: '#0891B2',
    desc: 'Complete college management, one dashboard -Superadmin, Exam Controller, HOD, Faculty, Parent & Student roles.',
    features: ['Attendance, conduct, quiz, marks & result management', 'Recharts-based analytics for every department', 'Role-based access control'],
    dark: false, href: '/products/campus-management-system'
  },
  {
    icon: '🪑', title: 'CampusSeating', badge: 'Core Module', badgeColor: '#EA580C',
    desc: 'Exam seating, arranged automatically -no more manual charts or last-minute clashes.',
    features: ['Auto-generated seating charts', 'Room & capacity management', 'Conflict-free roll number distribution', 'Printable seating plans'],
    dark: false, href: '/products/exam-seating-arrangement-software'
  },
  {
    icon: '📁', title: 'CampusDocs', badge: 'Core Module', badgeColor: '#0A1628',
    desc: 'Certificates and documents, self-hosted -streamlined certification, authenticity ensured.',
    features: ['Canva-style visual template builder', 'Bulk certificate generation', 'Student field mapping', 'PDF export, no third-party storage'],
    dark: false, href: '/products/certificate-document-management-system'
  },
  {
    icon: '💳', title: 'CampusERP', badge: 'Core Module', badgeColor: '#7C3AED',
    desc: 'Fees, admissions and records, unified -one dashboard for everything back-office.',
    features: ['Admission & fee tracking', 'Marksheet generation', 'Faculty chain management', 'Audit-friendly record keeping'],
    dark: false, href: '/products/school-fee-admission-management-system'
  },
  {
    icon: '💻', title: 'Custom Software Development', badge: 'Bespoke', badgeColor: '#FF5500',
    desc: 'Your idea, engineered end-to-end -beyond the suite, built entirely around you.',
    features: ['Full-stack web & mobile apps', 'API design & third-party integrations', 'Cloud infrastructure & deployment', 'Ongoing support after launch'],
    dark: true, cta: true
  },

]

const testimonials = [
  {
    org: 'MITS-DU',
    quote: 'We got two fully customized applications built for us by CampusSafar, tailored exactly to how our university runs.',
    name: 'Atul Kumar Chauhan',
    role: 'Programmer, MITS-DU'
  },
  {
    org: 'Shri Sahaj Institute of Pharmacy',
    quote: 'We run CampusCMS and CampusSeating from CampusSafar, alongside our own custom application built by their team on top of it.',
    name: 'Ajay Raghuwanshi',
    role: 'Director, Shri Sahaj Institute of Pharmacy'
  },
  {
    org: 'The Menta',
    quote: 'CampusSafar built us a fully custom application, designed from the ground up around exactly how we work.',
    name: 'Lucky Singh',
    role: 'Founder, The Menta'
  },
  {
    org: 'IETEB',
    quote: 'CampusSafar delivered two custom applications for us, built precisely around our editorial workflow.',
    name: 'P.K. Singhal',
    role: 'Chief Editor, IETEB'
  }
]

// ── Global animation styles ─────────────────────────────────────────────
const AnimStyles = () => (
  <style>{`
    @keyframes fadeInUp { from { opacity:0; transform: translateY(26px); } to { opacity:1; transform: translateY(0); } }
    @keyframes slideInRight { from { opacity:0; transform: translateX(50px); } to { opacity:1; transform: translateX(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes floatBlob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(18px,-18px) scale(1.08); } }
    @keyframes pulseBlob { 0%,100% { opacity:.18; } 50% { opacity:.32; } }
    @keyframes fillBar { from { width:0%; } to { width:100%; } }
    @keyframes popIn { from { opacity:0; transform: scale(0.85); } to { opacity:1; transform: scale(1); } }
    @keyframes gentleSway { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(4deg); } }

    .reveal { opacity:0; transform: translateY(28px); transition: opacity .7s cubic-bezier(.16,.84,.44,1), transform .7s cubic-bezier(.16,.84,.44,1); }
    .reveal.visible { opacity:1; transform: translateY(0); }

    .hero-anim { opacity:0; animation: fadeInUp .8s cubic-bezier(.16,.84,.44,1) forwards; }
    .mockup-anim { opacity:0; animation: slideInRight .9s cubic-bezier(.16,.84,.44,1) forwards; }
    .row-anim { opacity:0; animation: fadeIn .5s ease forwards; }
    .stat-anim { opacity:0; animation: popIn .5s cubic-bezier(.34,1.56,.64,1) forwards; }

    .card-anim { transition: transform .35s cubic-bezier(.16,.84,.44,1), box-shadow .35s ease, border-color .35s ease; }
    .card-anim:hover { transform: translateY(-8px); box-shadow: 0 20px 44px rgba(10,22,40,0.14); border-color: rgba(255,85,0,0.35) !important; }
    .card-anim .icon-bounce { display:inline-block; transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
    .card-anim:hover .icon-bounce { transform: scale(1.18) rotate(-6deg); }

    .step-anim { transition: transform .35s cubic-bezier(.16,.84,.44,1), box-shadow .35s ease; }
    .step-anim:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(10,22,40,0.12); }
    .step-num { transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
    .step-anim:hover .step-num { transform: scale(1.12); }

    .btn-anim { transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, opacity .25s ease; display:inline-block; }
    .btn-anim:hover { transform: translateY(-3px) scale(1.03); }
    .btn-anim:active { transform: translateY(-1px) scale(0.99); }

    .arrow-btn { transition: transform .25s ease, background .25s ease, box-shadow .25s ease; }
    .arrow-btn:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(10,22,40,0.16); }

    .dot-btn { transition: width .3s ease, background .3s ease; }

    .orb-float { animation: floatBlob 9s ease-in-out infinite; }
    .orb-pulse { animation: pulseBlob 6s ease-in-out infinite; }

    .badge-sway { display:inline-block; animation: gentleSway 3.5s ease-in-out infinite; transform-origin: 60% 90%; }

    .testimonial-fade { animation: fadeInUp .5s cubic-bezier(.16,.84,.44,1); }

    .progress-track { width:120px; height:4px; background:#E5E7EB; border-radius:999px; overflow:hidden; margin:0 auto; }
    .progress-fill { height:100%; background:#FF5500; width:0%; animation: fillBar 5.5s linear forwards; }

    .link-anim { position:relative; transition: color .2s ease, gap .2s ease; }
    .link-anim:hover { gap: 10px; }

    @media (prefers-reduced-motion: reduce) {
      .reveal, .hero-anim, .mockup-anim, .row-anim, .stat-anim, .card-anim, .card-anim .icon-bounce,
      .step-anim, .step-num, .btn-anim, .arrow-btn, .dot-btn, .orb-float, .orb-pulse, .badge-sway,
      .testimonial-fade, .progress-fill {
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

// ── Section dividers (same family as StudyBoard.jsx) ──────────────────────
const StadiumDivider = ({ fromColor, toColor, height = 64 }) => (
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

// ── Testimonial slider ─────────────────────────────────────────────────
const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(id)
  }, [paused, current])

  const goTo = (i) => setCurrent(((i % testimonials.length) + testimonials.length) % testimonials.length)
  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)
  const t = testimonials[current]

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative' }}
    >
      <div style={{ border: '1.5px solid #E5E7EB', borderRadius: 24, padding: '48px 56px', textAlign: 'center', minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div key={current} className="testimonial-fade">
          <div style={{ fontSize: 40, color: '#FF5500', marginBottom: 20 }}>"</div>
          <div style={{ width: 64, height: 64, background: '#F0F4FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 24px' }}>🏛</div>

          <p style={{ fontSize: 18, color: '#0A1628', fontWeight: 600, lineHeight: 1.7, marginBottom: 24, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            {t.quote}
          </p>

          <div style={{ width: 40, height: 3, background: '#FF5500', margin: '0 auto 18px', borderRadius: 999 }} />

          <div style={{ fontWeight: 700, color: '#0A1628' }}>{t.name}</div>
          <div style={{ fontSize: 14, color: '#6B7280' }}>{t.role}</div>
          <div style={{ fontSize: 13, color: '#FF5500', fontWeight: 600, marginTop: 4 }}>{t.org}</div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous testimonial"
        className="arrow-btn"
        style={{
          position: 'absolute', top: '50%', left: -18, transform: 'translateY(-50%)',
          width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #E5E7EB',
          background: '#fff', color: '#0A1628', fontSize: 18, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
        }}>
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next testimonial"
        className="arrow-btn"
        style={{
          position: 'absolute', top: '50%', right: -18, transform: 'translateY(-50%)',
          width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #E5E7EB',
          background: '#fff', color: '#0A1628', fontSize: 18, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
        }}>
        ›
      </button>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24, marginBottom: 14 }}>
        {testimonials.map((tm, i) => (
          <button
            key={tm.org}
            onClick={() => goTo(i)}
            aria-label={`Show testimonial from ${tm.org}`}
            className="dot-btn"
            style={{
              width: i === current ? 22 : 8, height: 8, borderRadius: 999,
              border: 'none', cursor: 'pointer',
              background: i === current ? '#FF5500' : '#E5E7EB'
            }}
          />
        ))}
      </div>

      {/* Autoplay progress */}
      <div className="progress-track">
        <div key={current} className="progress-fill" style={{ animationPlayState: paused ? 'paused' : 'running' }} />
      </div>

      <p style={{ textAlign: 'center', fontSize: 14, color: '#6B7280', marginTop: 24 }}>
        &amp; many more institutes trust CampusSafar every day.
      </p>
    </div>
  )
}

const CampusSuite = () => (
  <>
    <SEO
      title="Idea2Software -One Dashboard for Your Entire Institute"
      description="Idea2Software by CampusSafar. Campus360, CampusCMS, CampusSeating, CampusDocs and CampusERP -all in one institute dashboard. Free demo available."
      canonical="https://campussafar.com/products/campus-suite"
      schema={idea2softwareSchema}
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
        position: 'absolute', top: -80, left: -80, width: 320, height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,85,0,0.18), transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div className="orb-float orb-pulse" style={{
        position: 'absolute', bottom: 40, right: -60, width: 280, height: 280,
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
          <span style={{ color: '#FF5500', fontWeight: 600 }}>Idea2Software</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56,
          alignItems: 'center', paddingBottom: 64
        }}>
          {/* Left: copy */}
          <div>
            <div className="hero-anim" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, animationDelay: '0.08s' }}>
              <div className="badge-sway" style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'linear-gradient(135deg,#FF5500,#FF7A33)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
                boxShadow: '0 8px 24px rgba(255,85,0,0.35)'
              }}>🏛</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#FF5500', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                For Institutes · Setup in 24hrs
              </div>
            </div>

            <h1 className="hero-anim" style={{
              fontSize: 'clamp(32px, 4.2vw, 50px)', fontWeight: 900, color: '#fff',
              lineHeight: 1.12, marginBottom: 20, letterSpacing: '-1px', animationDelay: '0.16s'
            }}>
              One Dashboard.<br />Your <span style={{ color: '#FF5500' }}>Entire Institute.</span>
            </h1>

            <p className="hero-anim" style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7, marginBottom: 28, maxWidth: 480, animationDelay: '0.24s' }}>
              Manage student development, notices, exam seating and documents,
              all from one Idea2Software dashboard your team can run without an IT team.
            </p>

            <div className="hero-anim" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24, animationDelay: '0.32s' }}>
              <Link to="/contact"
                onClick={() => trackEvent('cta_click', { button: 'book_demo', location: 'idea2software_hero' })}
                className="btn-anim"
                style={{
                  padding: '13px 26px', background: '#FF5500', color: '#fff',
                  borderRadius: 12, fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap',
                  boxShadow: '0 6px 24px rgba(255,85,0,0.4)'
                }}>
                Book a Free Demo →
              </Link>
              <a href="#modules" className="btn-anim" style={{
                padding: '13px 26px', border: '1.5px solid rgba(255,255,255,0.16)',
                color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap'
              }}>
                See All Features
              </a>
            </div>

            <div className="hero-anim" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24, animationDelay: '0.4s' }}>
              {[
                { icon: '✓', label: 'Free Demo' },
                { icon: '⚙️', label: 'Setup in 24hrs' },
                { icon: '🤝', label: 'Dedicated Support' }
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

            <a href="https://i2s.campussafar.com" target="_blank" rel="noopener noreferrer"
              className="hero-anim link-anim"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#FF5500', textDecoration: 'none', animationDelay: '0.48s' }}>
              🌐 i2s.campussafar.com <span>→</span>
            </a>
          </div>

          {/* Right: live dashboard mockup */}
          <div className="mockup-anim" style={{
            background: '#fff', borderRadius: 16,
            boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden',
            animationDelay: '0.3s'
          }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#0A1628' }}>Idea2Software -Dashboard</span>
              <div style={{ width: 32, height: 32, background: '#FF5500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>AD</div>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                {[['Total Students', '1,240', '↑ 8% this term', '#6B7280'], ['Notices Sent', '86', '↑ 14% this month', '#6B7280'], ['Docs Issued', '312', '↑ 20% this month', '#FF5500'], ['Seating Plans', '24', 'This exam cycle', '#6B7280']].map(([l, v, s, c], i) => (
                  <div key={l} className="stat-anim" style={{ padding: 12, background: '#F8FAFF', borderRadius: 10, animationDelay: `${0.7 + i * 0.1}s` }}>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>{l}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>{s}</div>
                  </div>
                ))}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                    {['Module', 'Action', 'Status', 'Date'].map(h => (
                      <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#6B7280', fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[['Campus360', 'Term report generated', 'Completed', 'May 12'], ['CampusCMS', 'Notice published', 'Live', 'May 14'], ['CampusSeating', 'Exam Hall A-3 plan', 'Generated', 'May 15']].map(([m, a, s, d], i) => (
                    <tr key={m} className="row-anim" style={{ borderBottom: '1px solid #F9FAFB', animationDelay: `${1.1 + i * 0.12}s` }}>
                      <td style={{ padding: '10px 10px', fontWeight: 500 }}>{m}</td>
                      <td style={{ padding: '10px 10px', color: '#6B7280' }}>{a}</td>
                      <td style={{ padding: '10px 10px' }}>
                        <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, border: `1px solid ${s === 'Completed' || s === 'Live' ? '#22C55E' : '#F59E0B'}`, color: s === 'Completed' || s === 'Live' ? '#22C55E' : '#F59E0B' }}>{s} {s === 'Completed' || s === 'Live' ? '✓' : ''}</span>
                      </td>
                      <td style={{ padding: '10px 10px', color: '#9CA3AF' }}>{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* dark → white stadium curve */}
    <div style={{ lineHeight: 0 }}>
      <StadiumDivider fromColor="#0A1628" toColor="#ffffff" height={64} />
    </div>

    {/* ── TRUST STRIP ──────────────────────────────────────────────── */}
    <section style={{ background: '#ffffff', padding: '0 0 8px' }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
          gap: '10px 36px', padding: '4px 0 40px'
        }}>
          {[
            ['1+', 'College Partner'],
            ['5', 'Core Modules'],
            ['24hrs', 'Setup Time'],
            ['Free', 'Demo Available']
          ].map(([v, l], i) => (
            <Reveal key={l} delay={i * 90} style={{
              display: 'flex', alignItems: 'baseline', gap: 8,
              paddingRight: i < 3 ? 36 : 0,
              borderRight: i < 3 ? '1px solid #E5E7EB' : 'none'
            }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#FF5500' }}>{v}</span>
              <span style={{ fontSize: 13, color: '#6B7280' }}>{l}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── MODULES ──────────────────────────────────────────────────── */}
    <section className="section" id="modules" style={{ background: '#ffffff', paddingTop: 8 }}>
      <div className="container">
        <Reveal className="text-center" style={{ marginBottom: 56 }}>
          <span className="badge">🎓 What's Inside Idea2Software</span>
          <h2 className="section-title">Five Modules. One Unified Platform.</h2>
          <p className="section-sub">Everything your institute needs -student development to documents, all connected.</p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={i * 90}>
              <div className="card-anim" style={{
                border: m.dark ? '1.5px solid rgba(255,255,255,0.08)' : '1.5px solid #E5E7EB',
                borderRadius: 20, padding: 32,
                background: m.dark ? '#0A1628' : '#fff', position: 'relative', height: '100%'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div className="icon-bounce" style={{ fontSize: 32 }}>{m.icon}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', background: m.badgeColor, color: '#fff', borderRadius: 999 }}>{m.badge}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: m.dark ? '#fff' : '#0A1628', marginBottom: 10 }}>{m.title}</h3>
                <p style={{ fontSize: 14, color: m.dark ? '#94A3B8' : '#6B7280', marginBottom: 20, lineHeight: 1.7 }}>{m.desc}</p>
                {m.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 14 }}>
                    <span style={{ color: '#FF5500', fontWeight: 700 }}>✓</span>
                    <span style={{ color: m.dark ? '#94A3B8' : '#374151' }}>{f}</span>
                  </div>
                ))}
                {m.href ? (
                  <Link to={m.href} className="link-anim" style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, color: m.dark ? '#FF7A33' : '#FF5500', fontSize: 13, fontWeight: 700 }}>
                    Learn More →
                  </Link>
                ) : (
                  <a href={m.cta ? '/contact' : '#modules'} className="link-anim" style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, color: m.dark ? '#FF7A33' : '#FF5500', fontSize: 13, fontWeight: 700 }}>
                    Learn More →
                  </a>
                )}
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

    {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
    <section className="section" style={{ background: '#F8FAFF' }}>
      <div className="container">
        <Reveal className="text-center" style={{ marginBottom: 56 }}>
          <span className="badge">🚀 How It Works</span>
          <h2 className="section-title">Up and Running in 24 Hours.</h2>
          <p className="section-sub">No long setup. No IT team needed. We handle everything.</p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {[
            { n: '01', icon: '📅', title: 'Book a Free Demo', desc: 'Schedule a 30-min call. We walk you through everything live.', tag: '✓ Free, No Obligation', highlight: false },
            { n: '02', icon: '⚙️', title: 'We Setup Everything', desc: 'Our team configures your account, adds your institute details in 24hrs.', tag: '✓ Done For You', highlight: true },
            { n: '03', icon: '🚀', title: 'Go Live Instantly', desc: 'Start managing student development, notices, seating and documents from Day 1.', tag: '✓ Full Training Included', highlight: false }
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 120}>
              <div className="step-anim" style={{
                background: step.highlight ? '#0A1628' : '#fff',
                border: step.highlight ? 'none' : '1.5px solid #E5E7EB',
                borderRadius: 20, padding: 32, height: '100%'
              }}>
                <div className="step-num" style={{ width: 48, height: 48, background: '#FF5500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 20 }}>{step.n}</div>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: step.highlight ? '#fff' : '#0A1628', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: step.highlight ? '#94A3B8' : '#6B7280', lineHeight: 1.7, marginBottom: 16 }}>{step.desc}</p>
                <span style={{ fontSize: 13, fontWeight: 600, padding: '4px 12px', background: step.highlight ? '#112240' : '#F3F4F6', color: step.highlight ? '#9CA3AF' : '#6B7280', borderRadius: 999 }}>{step.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* #F8FAFF → white stadium curve */}
    <div style={{ lineHeight: 0 }}>
      <StadiumDivider fromColor="#F8FAFF" toColor="#ffffff" height={64} />
    </div>

    {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
    <section className="section" style={{ background: '#fff', paddingTop: 8 }}>
      <div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
        <Reveal className="text-center" style={{ marginBottom: 40 }}>
          <span className="badge">💬 Trusted By Institutes</span>
          <h2 className="section-title">What Our Clients Say.</h2>
        </Reveal>
        <Reveal delay={100}>
          <TestimonialSlider />
        </Reveal>
      </div>
    </section>

    {/* ── FINAL CTA ────────────────────────────────────────────────── */}
    <section style={{ background: '#ffffff', padding: 0 }}>
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
              More Institute Partners Being Onboarded
            </span>

            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff',
              marginBottom: 18, lineHeight: 1.1, letterSpacing: '-1px'
            }}>
              Ready to Run Your <span style={{ color: '#FF5500' }}>Entire Institute?</span>
            </h2>

            <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
              Book a free demo and see Campus360, CampusCMS, CampusSeating, CampusDocs and CampusERP<br />
              running on one dashboard, set up for your institute in 24 hours.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
              <Link to="/contact"
                onClick={() => trackEvent('cta_click', { button: 'book_demo', location: 'idea2software_cta' })}
                className="btn-anim"
                style={{
                  padding: '15px 32px', background: '#FF5500', color: '#fff',
                  borderRadius: 12, fontWeight: 700, fontSize: 15,
                  display: 'inline-block', boxShadow: '0 8px 40px rgba(255,85,0,0.45)'
                }}>
                Book a Free Demo →
              </Link>
              <a href="https://i2s.campussafar.com" target="_blank" rel="noopener noreferrer" className="btn-anim" style={{
                padding: '15px 32px',
                border: '1.5px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: 12,
                fontWeight: 600, fontSize: 15, display: 'inline-block'
              }}>
                Visit i2s.campussafar.com →
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              {[
                { icon: '🔒', label: 'No credit card' },
                { icon: '✓', label: 'Free demo' },
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

export default CampusSuite