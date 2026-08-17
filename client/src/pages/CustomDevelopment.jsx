import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { Reveal, TiltCard, MobileRevealHeading, useIsMobile, SPRING_BOUNCY, EASE_OUT_EXPO } from '../components/home/utils'
import { WaveDivider, CurveDivider, StadiumDivider } from '../components/home/dividers'

// ─── Data ────────────────────────────────────────────────────────────────
const buildFeatures = [
  { icon: '🖥', title: 'Custom Web Portals', desc: 'Institute websites, client portals, internal tools - built to your exact workflow, not a generic template.' },
  { icon: '🔐', title: 'Admin Dashboards', desc: 'Role-based dashboards to manage students, staff, fees, content - everything from one screen.' },
  { icon: '🎓', title: 'Student & Parent Portals', desc: 'Attendance, results, notices, fee status - all accessible to students and parents in real time.' },
  { icon: '📱', title: 'Mobile Apps', desc: 'Android & iOS apps for your institute or business, connected to the same backend as your web platform.' },
  { icon: '🔗', title: 'API & Integrations', desc: 'Connect your existing tools - payment gateways, SMS/WhatsApp, biometric devices, third-party software.' },
  { icon: '🤖', title: 'Workflow Automation', desc: 'Automate repetitive admin work - admissions, certificates, reminders, reports - save hours every week.' },
  { icon: '📊', title: 'Custom Dashboards & Reports', desc: 'Live analytics and reports built around the metrics that actually matter to you.' },
  { icon: '🗂', title: 'Document & Certificate Systems', desc: 'Auto-generate bonafide letters, ID cards, transfer certificates - on demand, error-free.' },
]

const processSteps = [
  { n: '01', icon: '💬', title: 'Discovery Call', desc: 'We understand your exact requirement - free, no-obligation consultation.' },
  { n: '02', icon: '🎨', title: 'Design & Planning', desc: 'Wireframes and a clear project scope, shared with you before a single line of code.' },
  { n: '03', icon: '⚙️', title: 'Development', desc: 'Our team builds in sprints with regular progress updates - no black-box waiting.' },
  { n: '04', icon: '🧪', title: 'Testing', desc: 'Rigorous QA across devices before anything goes live.' },
  { n: '05', icon: '🚀', title: 'Deployment', desc: 'Your platform goes live, fully set up and ready to use from day one.' },
  { n: '06', icon: '🛠', title: 'Ongoing Support', desc: 'We stay involved post-launch - updates, fixes, and new features as you grow.' },
]

const provenWork = [
  { name: 'Campus360', desc: 'Full student development tracking system - academics, sports, leadership, arts, in one rubric engine.', img: '/custom-dev/case-campus360.png', link: '/products/student-development-tracking-system' },
  { name: 'CampusCMS', desc: 'Centralized content & records management with role-based access for admins, faculty and students.', img: '/custom-dev/case-campuscms.png', link: '/products/campus-management-system' },
  { name: 'CampusERP', desc: 'Admissions, fees, timetables, payroll - a full ERP built for schools and coaching institutes.', img: '/custom-dev/case-campuserp.png', link: '/products/school-fee-admission-management-system' },
  { name: 'CampusSeating', desc: 'Auto-generates exam seating plans by room, roll number and section - zero manual charts.', img: '/custom-dev/case-campusseating.png', link: '/products/exam-seating-arrangement-software' },
  { name: 'CampusDocs', desc: 'Automated generation of bonafide letters, ID cards and transfer certificates on demand.', img: '/custom-dev/case-campusdocs.png', link: '/products/certificate-document-management-system' },
]

const engagementModels = [
  { title: 'Fixed Price', tag: 'Best for defined scope', points: ['Clear cost upfront', 'Fixed timeline', 'Milestone-based delivery'], accent: '#FF5500' },
  { title: 'Dedicated Team', tag: 'Best for long-term products', points: ['Your own dev team', 'Full-time focus on your project', 'Scale up or down anytime'], accent: '#0A1628', dark: true },
  { title: 'Hourly / Retainer', tag: 'Best for ongoing support', points: ['Pay for actual work done', 'Great for small iterations', 'No long-term lock-in'], accent: '#FF5500' },
]

const whyUs = [
  { icon: '⚡', title: 'Fast Delivery', desc: 'Working prototypes in days, not months.' },
  { icon: '🇮🇳', title: 'Built for Indian Institutes', desc: 'We understand Indian campus & business workflows first-hand.' },
  { icon: '🛠', title: 'Post-Launch Support', desc: "We don't disappear after go-live - ongoing help included." },
  { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden costs, no surprise invoices.' },
]

// ─── Inline Timeline Item ──────────────────────────────────────────────────
const TimelineItem = ({ step, isLeft, isMobile }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  const cardVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : (isLeft ? -50 : 50), y: isMobile ? 30 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
  }

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : (isLeft ? 'flex-start' : 'flex-end'),
        position: 'relative',
        marginBottom: isMobile ? 36 : 64,
      }}
    >
      {/* Dot on the spine */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 300, damping: 18 }}
        style={{
          position: 'absolute',
          left: isMobile ? 14 : '50%',
          top: 6,
          transform: isMobile ? 'translateX(-50%)' : 'translate(-50%,0)',
          zIndex: 3,
        }}
      >
        <motion.div
          animate={inView ? { boxShadow: ['0 0 0 0 rgba(255,85,0,0.5)', '0 0 0 10px rgba(255,85,0,0)'] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
          style={{
            width: 18, height: 18, borderRadius: '50%',
            background: '#FF5500', border: '3px solid #fff',
          }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          width: isMobile ? 'calc(100% - 44px)' : 'calc(50% - 44px)',
          marginLeft: isMobile ? 44 : 0,
        }}
      >
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(255,85,0,0.4)' }}
          transition={{ duration: 0.25 }}
          style={{
            background: '#fff',
            border: '1.5px solid #E5E7EB',
            borderRadius: 18,
            padding: 'clamp(20px,2.5vw,28px)',
            boxShadow: '0 4px 20px rgba(10,22,40,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: '#FFF0EB', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 20, flexShrink: 0,
            }}>{step.icon}</div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#FF5500', letterSpacing: 0.5 }}>STEP {step.n}</span>
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>{step.title}</h3>
          <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────
const CustomDevelopment = () => {
  const isMobile = useIsMobile()
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.6'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      <SEO
        title="Custom Software Development for Campuses & Businesses"
        description="CampusSafar builds custom web portals, admin dashboards, student portals, mobile apps and business tools - tailored to your exact workflow."
        canonical="https://campussafar.com/custom-development"
      />
      <Navbar />

      <style>{`
        .build-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .work-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
        .models-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .why-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        @media (max-width: 1024px) {
          .build-grid { grid-template-columns: repeat(2,1fr) !important; }
          .work-grid { grid-template-columns: 1fr !important; }
          .models-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .build-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(150deg, #0A1628 0%, #0D1B33 60%, #1a2842 100%)',
        padding: isMobile ? '64px 0 56px' : '110px 0 90px',
      }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 680 }}>
            <Reveal>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,85,0,0.4)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 500, color: '#FF8C42', marginBottom: 22, background: 'rgba(255,85,0,0.1)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5500' }} />
                Custom Development
              </span>
              <h1 style={{ fontSize: isMobile ? 34 : 'clamp(34px,4.5vw,56px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1.5px' }}>
                Your Idea. Our Code.<br /><span style={{ color: '#FF5500' }}>Built Around You.</span>
              </h1>
              <p style={{ fontSize: isMobile ? 15 : 17, color: '#B8C2D4', lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
                Web portals, admin dashboards, student portals, mobile apps - whatever your campus or business needs, we build it from scratch, tailored to your exact workflow.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
                  <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 26px', background: '#FF5500', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 15, boxShadow: '0 8px 32px rgba(255,85,0,0.4)' }}>
                    Start Your Custom Project →
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
                  <a href="#proven-work" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 26px', border: '1.5px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, background: 'rgba(255,255,255,0.04)' }}>
                    See What We've Built
                  </a>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider"><WaveDivider fromColor="#0A1628" toColor="#ffffff" height={56} /></div>

      {/* ── WHAT WE BUILD ── */}
      <section className="section" style={{ background: '#fff', padding: 'clamp(48px,6vw,96px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading badge="What We Build" title="One Platform. Every Feature You Need." subtitle="Tell us what you're picturing - chances are, we've already built something like it." />
          ) : (
            <Reveal style={{ marginBottom: 48, textAlign: 'center' }}>
              <span className="badge">What We Build</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>One Platform. Every Feature You Need.</h2>
              <p className="section-sub">Tell us what you're picturing - chances are, we've already built something like it.</p>
            </Reveal>
          )}
          <div className="build-grid">
            {buildFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <TiltCard intensity={4} style={{ border: '1.5px solid #E5E7EB', borderRadius: 18, padding: 'clamp(18px,2vw,26px)', height: '100%', background: '#fff' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><CurveDivider fromColor="#ffffff" toColor="#F8FAFF" height={64} /></div>

      {/* ── PROCESS (animated left-right timeline) ── */}
      <section className="section" style={{ background: '#F8FAFF', padding: 'clamp(48px,6vw,96px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading badge="Our Process" title="From Idea to Live - Simply." subtitle="One clear process for students, institutes, and businesses." />
          ) : (
            <Reveal style={{ marginBottom: 48, textAlign: 'center' }}>
              <span className="badge">Our Process</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>From Idea to Live - Simply.</h2>
              <p className="section-sub">A transparent process, start to finish.</p>
            </Reveal>
          )}

          <div ref={timelineRef} style={{ position: 'relative', paddingTop: 8, maxWidth: 900, margin: '0 auto' }}>
            {/* Static track */}
            <div style={{
              position: 'absolute',
              left: isMobile ? 14 : '50%',
              top: 0, bottom: 0,
              width: 2,
              background: '#E5E7EB',
              transform: isMobile ? 'none' : 'translateX(-50%)',
            }} />
            {/* Animated fill line */}
            <motion.div style={{
              position: 'absolute',
              left: isMobile ? 14 : '50%',
              top: 0,
              width: 2,
              height: lineHeight,
              background: 'linear-gradient(180deg,#FF5500,#FF8C42)',
              transform: isMobile ? 'none' : 'translateX(-50%)',
              zIndex: 1,
            }} />

            {processSteps.map((step, i) => (
              <TimelineItem key={step.n} step={step} isLeft={i % 2 === 0} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><StadiumDivider fromColor="#F8FAFF" toColor="#ffffff" height={64} /></div>

      {/* ── PROVEN WORK ── */}
      <section id="proven-work" className="section" style={{ background: '#fff', padding: 'clamp(48px,6vw,96px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading badge="Proven Work" title="We've Already Built This." subtitle="Real products, live today, used by institutes across India." />
          ) : (
            <Reveal style={{ marginBottom: 48, textAlign: 'center' }}>
              <span className="badge">Proven Work</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>We've Already Built This.</h2>
              <p className="section-sub">Real products, live today, used by institutes across India.</p>
            </Reveal>
          )}
          <div className="work-grid">
            {provenWork.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <Link to={item.link} style={{ textDecoration: 'none' }}>
                  <div style={{ border: '1.5px solid #E5E7EB', borderRadius: 18, overflow: 'hidden', height: '100%', background: '#fff' }}>
                    <div style={{ width: '100%', aspectRatio: '16/10', background: '#F3F4F6', backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div style={{ padding: 20 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>{item.name}</h3>
                      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><CurveDivider fromColor="#ffffff" toColor="#0A1628" height={64} /></div>

      {/* ── ENGAGEMENT MODELS ── */}
      <section className="section" style={{ background: '#0A1628', padding: 'clamp(48px,6vw,96px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading badge="Engagement Models" title="Work With Us, Your Way." />
          ) : (
            <Reveal style={{ marginBottom: 48, textAlign: 'center' }}>
              <span style={{ display: 'inline-flex', padding: '5px 14px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, fontSize: 12, color: '#94A3B8', marginBottom: 14 }}>Engagement Models</span>
              <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#fff', marginTop: 8 }}>Work With Us, Your Way.</h2>
            </Reveal>
          )}
          <div className="models-grid">
            {engagementModels.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.08}>
                <div style={{ background: m.dark ? 'rgba(255,255,255,0.04)' : '#fff', border: m.dark ? '1px solid rgba(255,255,255,0.1)' : 'none', borderRadius: 18, padding: 'clamp(20px,2.5vw,28px)', height: '100%' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: m.accent, background: m.dark ? 'rgba(255,85,0,0.15)' : '#FFF0EB', padding: '4px 11px', borderRadius: 999 }}>{m.tag}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: m.dark ? '#fff' : '#0A1628', margin: '14px 0 14px' }}>{m.title}</h3>
                  {m.points.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9, fontSize: 13 }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#FF5500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ color: m.dark ? '#94A3B8' : '#374151', fontWeight: 500 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CAMPUSSAFAR ── */}
      <section className="section" style={{ background: '#fff', padding: 'clamp(48px,6vw,96px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          <Reveal style={{ marginBottom: 40, textAlign: 'center' }}>
            <span className="badge">Why CampusSafar</span>
          </Reveal>
          <div className="why-grid">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{w.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>{w.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: '#040D1E', padding: 'clamp(64px,8vw,112px) 0', textAlign: 'center' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 18, lineHeight: 1.15 }}>
              Have an Idea? <span style={{ color: '#FF5500' }}>Let's Build It.</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: 16, marginBottom: 32 }}>Tell us what you need - we'll get back to you within 24 hours.</p>
            <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY} style={{ display: 'inline-block' }}>
              <Link to="/contact" style={{ padding: '15px 32px', background: '#FF5500', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 15, display: 'inline-block', boxShadow: '0 8px 40px rgba(255,85,0,0.45)' }}>
                Book a Free Consultation →
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default CustomDevelopment