import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { Reveal, MobileRevealHeading, useIsMobile, SPRING_BOUNCY, EASE_OUT_EXPO } from '../components/home/utils'
import { WaveDivider, CurveDivider } from '../components/home/dividers'

// ─── DATA ────────────────────────────────────────────────────────────────
const softwareIndia = {
  suites: [
    {
      label: 'Operations Suite',
      plans: [
        { name: 'Basic', price: '₹65', suffix: '/student/year', features: ['Campus360', 'CampusSeating'] },
        { name: 'Advanced', price: '₹95', suffix: '/student/year', features: ['Campus360', 'CampusSeating', 'CampusERP'], popular: true },
      ],
    },
    {
      label: 'Academic Suite',
      plans: [
        { name: 'Standard', price: '₹55', suffix: '/student/year', features: ['CampusCMS', 'CampusDocs'] },
        { name: 'Premium', price: '₹70', suffix: '/student/year', features: ['CampusCMS', 'CampusDocs', 'CampusSeating'], popular: true, dark: true },
      ],
    },
  ],
  modules: [
    { icon: '🪑', name: 'CampusSeating', price: '₹15' },
    { icon: '📁', name: 'CampusDocs', price: '₹20' },
    { icon: '🗂️', name: 'CampusERP', price: '₹35' },
    { icon: '📝', name: 'CampusCMS', price: '₹45' },
    { icon: '🎯', name: 'Campus360', price: '₹65' },
  ],
  note: 'Minimum 150 students billed per institute. Website development available as an add-on starting ₹5,000 when bundled with Advanced or Premium plan.',
}

const softwareIntl = {
  plans: [
    { name: 'Starter', monthly: '$49', annual: '$499', features: ['CampusSeating', 'CampusERP'] },
    { name: 'Growth', monthly: '$99', annual: '$999', features: ['CampusSeating', 'CampusERP', 'CampusCMS', 'CampusDocs'] },
    { name: 'Enterprise', monthly: '$199', annual: '$1,999', features: ['CampusSeating', 'CampusERP', 'CampusCMS', 'CampusDocs', 'Campus360'], popular: true, dark: true },
    { name: 'Custom', monthly: 'Contact us', features: ['Tailored modules', 'Advanced integrations', 'Dedicated support'], onRequest: true },
  ],
  modules: [
    { icon: '🪑', name: 'CampusSeating', price: '$19' },
    { icon: '📁', name: 'CampusDocs', price: '$29' },
    { icon: '🗂️', name: 'CampusERP', price: '$39' },
    { icon: '📝', name: 'CampusCMS', price: '$49' },
    { icon: '🎯', name: 'Campus360', price: '$79' },
  ],
  note: '14-day free trial. No credit card required.',
}

const websiteIndia = {
  plans: [
    { name: 'Basic', tag: 'Ideal for Startups & Small Businesses', price: '₹7,999', suffix: 'One-Time Setup', features: ['1–5 Pages Website', 'Domain + Hosting (1 Year)', 'Responsive Design', 'Professional UI/UX', 'SEO-Ready Structure'], footer: 'No Maintenance Included' },
    { name: 'Standard', tag: 'Perfect for Growing Businesses', price: '₹13,999', suffix: 'One-Time Setup', features: ['5–10 Pages Website', 'Domain + Hosting (1 Year)', 'Responsive Design', 'Professional UI/UX', 'SEO-Ready Structure', 'First-Year Maintenance'], footer: 'Maintenance Included for 1st Year' },
    { name: 'Premium', tag: 'Best for Established Businesses', price: '₹19,999', suffix: 'One-Time Setup', features: ['10–15 Pages Website', 'Domain + Hosting (1 Year)', 'Responsive Design', 'Professional UI/UX', 'SEO-Ready Structure', '3 Custom Email Setups', 'First-Year Maintenance'], popular: true, footer: 'Maintenance Included for 1st Year' },
    { name: 'Customized', tag: 'Tailored to Your Business Needs', price: 'On Request', onRequest: true, features: ['Custom Functionality', 'Database / Backend Features', 'Advanced Integrations', 'Unique Business Requirements', 'Scalable & Future-Ready Solutions', 'Dedicated Support'], footer: 'Fully Customized Solutions as per Your Needs' },
  ],
  note: 'Domain and hosting are included for the first year in all standard plans. From the second year onwards, maintenance, hosting renewal, domain renewal, updates, and support are charged separately based on requirements.',
}

const websiteIntl = {
  plans: [
    { name: 'Starter', tag: 'Perfect for Small Businesses', price: '$299', suffix: 'One-Time Setup', features: ['1–5 Pages Website', 'Basic Business Website', 'Contact Form', 'Mobile Responsive Design', '1 Round of Revisions'], footer: 'Domain & Hosting Included for 1 Year' },
    { name: 'Business', tag: 'Ideal for Growing Businesses', price: '$599', suffix: 'One-Time Setup', features: ['5–10 Pages Website', 'Better Design & User Experience', 'SEO Basics Setup', 'Mobile Optimization', 'Professional Email Setup', '2 Rounds of Revisions'], footer: 'Domain & Hosting Included for 1 Year' },
    { name: 'Premium', tag: 'For Established Brands', price: '$999', suffix: 'One-Time Setup', features: ['10–15 Pages Website', 'Custom Design & Strong Branding', 'SEO Setup (On-Page & Technical)', 'Performance Optimization', '3 Custom Email Setups', 'Priority Support', '2 Rounds of Revisions'], popular: true, footer: 'Domain & Hosting Included for 1 Year' },
    { name: 'Customized', tag: 'Tailored to Your Requirements', price: 'On Request', onRequest: true, features: ['Custom Functionality', 'Database / Backend Features', 'Portals & Dashboards', 'Workflow & Automation Systems', 'Client-Specific Requirements', 'Dedicated Project Support'], footer: 'Fully Customized Solution as per Your Needs' },
  ],
  note: 'Domain and hosting are included for the first year in all standard plans. Maintenance, support, updates, and content changes after launch are charged separately based on your requirements.',
}

const portalIndia = {
  plans: [
    { name: 'Basic', tag: 'Ideal for Startups & Small Businesses', price: '₹24,999', suffix: 'One-Time Setup', features: ['1 Core Module', 'Single User Login', 'Basic Dashboard', 'Responsive Design', '3 Months Support'], footer: 'Support Included for 3 Months' },
    { name: 'Standard', tag: 'Perfect for Growing Businesses', price: '₹44,999', suffix: 'One-Time Setup', features: ['2–3 Modules', 'Multi-Role Login', 'Custom Workflow', 'Responsive Design', 'First-Year Support'], footer: 'Support Included for 1st Year' },
    { name: 'Advanced', tag: 'Best for Established Businesses', price: '₹89,999', suffix: 'One-Time Setup', features: ['Multiple Modules', 'Advanced Dashboard', 'Reports & Analytics', 'Multi-Role Login', 'First-Year Support'], footer: 'Support Included for 1st Year' },
    { name: 'Premium', tag: 'For Full-Scale Business Operations', price: '₹1,49,999', suffix: 'One-Time Setup', features: ['Full Multi-Role System', 'Scalable Architecture', 'Priority Support', 'Custom Integrations', 'First-Year Support'], popular: true, footer: 'Priority Support for 1st Year' },
    { name: 'Enterprise', tag: 'Tailored to Your Business Needs', price: 'Up to ₹2,00,000+', onRequest: true, features: ['Fully Custom Development', 'Advanced Integrations', 'Unique Business Requirements', 'Scalable & Future-Ready Solutions', 'Dedicated Support'], footer: 'Fully Customized Solutions as per Your Needs' },
  ],
  note: 'Maintenance, hosting and support are included for the first year in all standard plans. From the second year onwards, these are charged separately based on project scope.',
}

const whyChoose = [
  { icon: '💻', label: 'Professional & Modern Design' },
  { icon: '📱', label: 'Mobile-Friendly & Responsive' },
  { icon: '📈', label: 'SEO-Ready Structure' },
  { icon: '🎧', label: 'Reliable Technical Support' },
  { icon: '⚡', label: 'Fast Project Delivery' },
  { icon: '🛠', label: 'Custom Development Solutions' },
]

// ─── UI PIECES ───────────────────────────────────────────────────────────
const CheckItem = ({ text, dark }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9, fontSize: 13 }}>
    <span style={{ width: 17, height: 17, borderRadius: '50%', background: '#FF5500', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>✓</span>
    <span style={{ color: dark ? '#94A3B8' : '#374151', fontWeight: 500 }}>{text}</span>
  </div>
)

const PlanCard = ({ plan, delay = 0 }) => {
  const dark = plan.dark
  return (
    <Reveal delay={delay} style={{ height: '100%' }}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
          background: dark ? '#0A1628' : '#fff',
          border: plan.popular ? '2px solid #FF5500' : '1.5px solid #E5E7EB',
          borderRadius: 20, padding: 'clamp(20px,2.2vw,28px)',
          boxShadow: plan.popular ? '0 16px 48px rgba(255,85,0,0.18)' : '0 4px 16px rgba(10,22,40,0.04)',
        }}
      >
        {plan.popular && (
          <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#FF5500', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>
            MOST POPULAR
          </span>
        )}
        {plan.tag && (
          <div style={{ fontSize: 12, color: dark ? '#94A3B8' : '#9CA3AF', fontWeight: 600, marginBottom: 10 }}>{plan.tag}</div>
        )}
        <h3 style={{ fontSize: 18, fontWeight: 800, color: dark ? '#fff' : '#0A1628', marginBottom: 12 }}>{plan.name}</h3>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: plan.onRequest ? 22 : 30, fontWeight: 900, color: plan.popular ? '#FF5500' : (dark ? '#fff' : '#0A1628'), lineHeight: 1.1 }}>
            {plan.price}
          </div>
          {plan.suffix && <div style={{ fontSize: 12, color: dark ? '#64748B' : '#9CA3AF', marginTop: 4 }}>{plan.suffix}</div>}
        </div>

        <div style={{ flex: 1, marginBottom: 18 }}>
          {plan.features.map(f => <CheckItem key={f} text={f} dark={dark} />)}
        </div>

        {plan.footer && (
          <div style={{
            fontSize: 12, fontWeight: 600, textAlign: 'center', padding: '10px 12px', borderRadius: 10, marginBottom: 14,
            background: plan.popular ? '#FF5500' : (dark ? 'rgba(255,255,255,0.06)' : '#F3F4F6'),
            color: plan.popular ? '#fff' : (dark ? '#94A3B8' : '#6B7280'),
          }}>{plan.footer}</div>
        )}

        <motion.div whileTap={{ scale: 0.97 }} transition={SPRING_BOUNCY}>
          <Link to="/contact" style={{
            display: 'block', textAlign: 'center', padding: '12px', borderRadius: 11, fontWeight: 700, fontSize: 14,
            background: plan.popular ? '#FF5500' : (dark ? '#fff' : '#0A1628'),
            color: plan.popular ? '#fff' : (dark ? '#0A1628' : '#fff'),
          }}>
            {plan.onRequest ? 'Get a Quote →' : 'Book a Demo →'}
          </Link>
        </motion.div>
      </motion.div>
    </Reveal>
  )
}

const ModuleChip = ({ mod, delay = 0 }) => (
  <Reveal delay={delay}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '14px 16px', background: '#fff' }}>
      <span style={{ fontSize: 22 }}>{mod.icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>{mod.name}</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#FF5500' }}>{mod.price}<span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}> /student/{mod.price.startsWith('$') ? 'mo' : 'year'}</span></div>
      </div>
    </div>
  </Reveal>
)

const InfoNote = ({ text }) => (
  <Reveal>
    <div style={{ marginTop: 32, background: '#F8FAFF', border: '1px solid #E5E7EB', borderRadius: 14, padding: '16px 20px', fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>
      <strong style={{ color: '#0A1628' }}>Note: </strong>{text}
    </div>
  </Reveal>
)

// ─── PAGE ────────────────────────────────────────────────────────────────
const Pricing = () => {
  const isMobile = useIsMobile()
  const [region, setRegion] = useState('india') // 'india' | 'intl'
  const [tab, setTab] = useState('software') // 'software' | 'website' | 'portal'
  const [billing, setBilling] = useState('annual') // for intl software only

  const tabs = [
    { id: 'software', label: '🎓 Campus Software Suite' },
    { id: 'website', label: '🌐 Website Development' },
    { id: 'portal', label: '🖥 Custom Web Portal & Apps' },
  ]

  return (
    <>
      <SEO
        title="Pricing - Plans for Every Institute & Business"
        description="Transparent pricing for CampusSafar's software suite, website development and custom web portals - for institutes and businesses in India and worldwide."
        canonical="https://campussafar.com/pricing"
      />
      <Navbar />

      <style>{`
        .plans-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; align-items: stretch; }
        .plans-grid-5 { display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; align-items: stretch; }
        .plans-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 18px; align-items: stretch; }
        .modules-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 14px; }
        .suites-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        @media (max-width: 1100px) {
          .plans-grid-4 { grid-template-columns: repeat(2,1fr) !important; }
          .plans-grid-5 { grid-template-columns: repeat(2,1fr) !important; }
          .modules-grid { grid-template-columns: repeat(2,1fr) !important; }
          .suites-wrap { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 640px) {
          .plans-grid-4, .plans-grid-5, .plans-grid-2 { grid-template-columns: 1fr !important; }
          .modules-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(150deg, #0A1628 0%, #0D1B33 60%, #1a2842 100%)', padding: isMobile ? '56px 0 40px' : '90px 0 56px' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)', textAlign: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,85,0,0.4)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 500, color: '#FF8C42', marginBottom: 20, background: 'rgba(255,85,0,0.1)' }}>
              Pricing
            </span>
            <h1 style={{ fontSize: isMobile ? 32 : 'clamp(32px,4.2vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-1px' }}>
              Pricing for Every Kind of<br /><span style={{ color: '#FF5500' }}>Institute & Business.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 14.5 : 16.5, color: '#B8C2D4', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.7 }}>
              From a small coaching center to a nationwide university, in India or abroad - pick the plan that actually fits you.
            </p>
          </Reveal>

          {/* Region toggle */}
          <Reveal delay={0.1}>
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: 5 }}>
              {[{ id: 'india', label: '🇮🇳 India (₹)' }, { id: 'intl', label: '🌍 International ($)' }].map(r => (
                <button key={r.id} onClick={() => setRegion(r.id)} style={{
                  padding: '10px 20px', borderRadius: 999, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  background: 'transparent', color: region === r.id ? '#fff' : '#94A3B8', position: 'relative', zIndex: 1,
                }}>
                  {region === r.id && <motion.div layoutId="regionPill" style={{ position: 'absolute', inset: 0, background: '#FF5500', borderRadius: 999, zIndex: -1 }} transition={{ type: 'spring', stiffness: 450, damping: 32 }} />}
                  {r.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider"><WaveDivider fromColor="#0A1628" toColor="#ffffff" height={56} /></div>

      {/* ── SERVICE TABS ── */}
      <section style={{ background: '#fff', paddingTop: 'clamp(32px,4vw,56px)' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          <Reveal style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, background: '#F3F4F6', borderRadius: 999, padding: 5 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: '10px 18px', borderRadius: 999, border: 'none', fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
                  background: 'transparent', color: tab === t.id ? '#fff' : '#6B7280', position: 'relative', zIndex: 1, whiteSpace: 'nowrap',
                }}>
                  {tab === t.id && <motion.div layoutId="tabPill" style={{ position: 'absolute', inset: 0, background: '#0A1628', borderRadius: 999, zIndex: -1 }} transition={{ type: 'spring', stiffness: 450, damping: 32 }} />}
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div key={tab + region + billing}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              style={{ paddingBottom: 'clamp(48px,6vw,88px)' }}
            >
              {/* ─ SOFTWARE SUITE ─ */}
              {tab === 'software' && region === 'india' && (
                <>
                  <div className="suites-wrap">
                    {softwareIndia.suites.map(suite => (
                      <div key={suite.label}>
                        <h3 style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 }}>{suite.label}</h3>
                        <div className="plans-grid-2">
                          {suite.plans.map((p, i) => <PlanCard key={p.name} plan={p} delay={i * 0.08} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <h3 style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1, textTransform: 'uppercase', margin: '48px 0 20px' }}>Or Choose Individual Modules</h3>
                  <div className="modules-grid">
                    {softwareIndia.modules.map((m, i) => <ModuleChip key={m.name} mod={m} delay={i * 0.05} />)}
                  </div>
                  <InfoNote text={softwareIndia.note} />
                </>
              )}

              {tab === 'software' && region === 'intl' && (
                <>
                  <Reveal style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
                    <div style={{ display: 'inline-flex', background: '#F3F4F6', borderRadius: 999, padding: 5 }}>
                      {['monthly', 'annual'].map(b => (
                        <button key={b} onClick={() => setBilling(b)} style={{
                          padding: '9px 18px', borderRadius: 999, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                          background: billing === b ? '#0A1628' : 'transparent', color: billing === b ? '#fff' : '#6B7280',
                        }}>
                          {b === 'monthly' ? 'Monthly' : 'Annual (save 15%)'}
                        </button>
                      ))}
                    </div>
                  </Reveal>
                  <div className="plans-grid-4">
                    {softwareIntl.plans.map((p, i) => (
                      <PlanCard key={p.name} delay={i * 0.08} plan={{
                        ...p,
                        price: p.onRequest ? p.monthly : (billing === 'annual' ? p.annual : p.monthly),
                        suffix: p.onRequest ? undefined : (billing === 'annual' ? '/year' : '/month'),
                      }} />
                    ))}
                  </div>
                  <h3 style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1, textTransform: 'uppercase', margin: '48px 0 20px' }}>Or Choose Individual Modules</h3>
                  <div className="modules-grid">
                    {softwareIntl.modules.map((m, i) => <ModuleChip key={m.name} mod={m} delay={i * 0.05} />)}
                  </div>
                  <InfoNote text={softwareIntl.note} />
                </>
              )}

              {/* ─ WEBSITE DEV ─ */}
              {tab === 'website' && (
                <>
                  <div className="plans-grid-4">
                    {(region === 'india' ? websiteIndia : websiteIntl).plans.map((p, i) => (
                      <PlanCard key={p.name} plan={p} delay={i * 0.08} />
                    ))}
                  </div>
                  <InfoNote text={(region === 'india' ? websiteIndia : websiteIntl).note} />
                </>
              )}

              {/* ─ CUSTOM PORTAL ─ */}
              {tab === 'portal' && region === 'india' && (
                <>
                  <div className="plans-grid-5">
                    {portalIndia.plans.map((p, i) => <PlanCard key={p.name} plan={p} delay={i * 0.07} />)}
                  </div>
                  <InfoNote text={portalIndia.note} />
                </>
              )}

              {tab === 'portal' && region === 'intl' && (
                <Reveal>
                  <div style={{ textAlign: 'center', background: '#0A1628', borderRadius: 20, padding: 'clamp(40px,6vw,64px)' }}>
                    <div style={{ fontSize: 36, marginBottom: 16 }}>🌍</div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Building for an International Client?</h3>
                    <p style={{ fontSize: 14, color: '#94A3B8', maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.7 }}>
                      Every custom web portal or application project is scoped individually. Tell us what you're building and we'll send a tailored quote.
                    </p>
                    <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY} style={{ display: 'inline-block' }}>
                      <Link to="/contact" style={{ padding: '14px 28px', background: '#FF5500', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 14, display: 'inline-block' }}>
                        Get a Custom Quote →
                      </Link>
                    </motion.div>
                  </div>
                </Reveal>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <div className="section-divider"><CurveDivider fromColor="#ffffff" toColor="#F8FAFF" height={64} /></div>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ background: '#F8FAFF', padding: 'clamp(48px,6vw,80px) 0' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          {isMobile ? (
            <MobileRevealHeading badge="Why Choose CampusSafar" title="Built to Grow With You." />
          ) : (
            <Reveal style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="badge">Why Choose CampusSafar</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>Built to Grow With You.</h2>
            </Reveal>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(6,1fr)', gap: 16 }}>
            {whyChoose.map((w, i) => (
              <Reveal key={w.label} delay={i * 0.06} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{w.icon}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', lineHeight: 1.4 }}>{w.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: '#040D1E', padding: 'clamp(56px,7vw,100px) 0', textAlign: 'center' }}>
        <div className="container" style={{ padding: '0 clamp(16px,4vw,40px)' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 900, color: '#fff', marginBottom: 14 }}>
              Not Sure Which Plan Fits? <span style={{ color: '#FF5500' }}>Let's Talk.</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 28 }}>Book a free call - we'll recommend the right plan for your size and budget.</p>
            <motion.div whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY} style={{ display: 'inline-block' }}>
              <Link to="/contact" style={{ padding: '15px 32px', background: '#FF5500', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 15, display: 'inline-block', boxShadow: '0 8px 40px rgba(255,85,0,0.45)' }}>
                Book a Free Demo →
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Pricing