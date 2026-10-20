import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import LeadForm from '../components/LeadForm'
import { getLandingPage } from '../seo/landingPages'
import NotFound from './NotFound'

const NAVY = '#0A1628'
const ORANGE = '#FF5500'

const LandingPage = ({ path }) => {
  const page = getLandingPage(path)
  if (!page) return <NotFound />

  return (
    <>
      <SEO />
      <Navbar />

      <style>{`
        .lp-wrap { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
        .lp-hero { background: linear-gradient(135deg, #040D1E 0%, ${NAVY} 100%); padding: clamp(56px, 8vw, 104px) 0; color: #fff; }
        .lp-eyebrow { display: inline-block; font-size: 12.5px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; color: ${ORANGE}; background: rgba(255,85,0,.12); padding: 6px 12px; border-radius: 999px; margin-bottom: 18px; }
        .lp-h1 { font-size: clamp(30px, 4.6vw, 52px); font-weight: 900; line-height: 1.12; letter-spacing: -1px; margin: 0 0 18px; max-width: 880px; }
        .lp-intro { font-size: clamp(15px, 1.6vw, 18px); line-height: 1.75; color: #CBD5E1; max-width: 780px; margin: 0 0 28px; }
        .lp-btn { display: inline-block; background: ${ORANGE}; color: #fff; font-weight: 800; padding: 14px 26px; border-radius: 12px; text-decoration: none; }
        .lp-btn-ghost { display: inline-block; margin-left: 12px; border: 1.5px solid rgba(255,255,255,.3); color: #fff; font-weight: 700; padding: 13px 22px; border-radius: 12px; text-decoration: none; }
        .lp-section { padding: clamp(44px, 6vw, 76px) 0; }
        .lp-section.alt { background: #F8FAFC; }
        .lp-h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 900; color: ${NAVY}; letter-spacing: -.5px; margin: 0 0 10px; }
        .lp-sub { color: #6B7280; line-height: 1.7; margin: 0 0 28px; max-width: 720px; }
        .lp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 24px; }
        .lp-card { background: #fff; border: 1.5px solid #E5E7EB; border-radius: 16px; padding: 22px; }
        .lp-card h3 { font-size: 16.5px; font-weight: 800; color: ${NAVY}; margin: 0 0 8px; }
        .lp-card p { font-size: 14.5px; line-height: 1.7; color: #4B5563; margin: 0; }
        .lp-steps { counter-reset: s; display: grid; gap: 14px; margin-top: 24px; }
        .lp-step { display: flex; gap: 16px; align-items: flex-start; background: #fff; border: 1.5px solid #E5E7EB; border-radius: 16px; padding: 18px 20px; }
        .lp-step:before { counter-increment: s; content: counter(s); flex: 0 0 34px; height: 34px; border-radius: 50%; background: ${ORANGE}; color: #fff; font-weight: 800; display: flex; align-items: center; justify-content: center; }
        .lp-step h3 { font-size: 16px; font-weight: 800; color: ${NAVY}; margin: 0 0 4px; }
        .lp-step p { font-size: 14.5px; line-height: 1.65; color: #4B5563; margin: 0; }
        .lp-faq details { background: #fff; border: 1.5px solid #E5E7EB; border-radius: 14px; padding: 16px 20px; margin-bottom: 12px; }
        .lp-faq summary { cursor: pointer; font-weight: 700; color: ${NAVY}; font-size: 16px; }
        .lp-faq p { margin: 12px 0 0; color: #4B5563; line-height: 1.7; font-size: 14.5px; }
        .lp-cta { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .lp-related a { display: inline-block; margin: 0 10px 10px 0; padding: 9px 16px; border: 1.5px solid #E5E7EB; border-radius: 999px; color: ${NAVY}; font-weight: 600; font-size: 14px; text-decoration: none; background: #fff; }
        @media (max-width: 900px) { .lp-grid { grid-template-columns: 1fr 1fr; } .lp-cta { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .lp-grid { grid-template-columns: 1fr; } .lp-btn-ghost { margin: 12px 0 0; } }
      `}</style>

      <main>
        <section className="lp-hero">
          <div className="lp-wrap">
            <span className="lp-eyebrow">{page.eyebrow}</span>
            <h1 className="lp-h1">{page.h1}</h1>
            <p className="lp-intro">{page.intro}</p>
            <Link to="/contact" className="lp-btn">Book a free demo</Link>
            <a href="https://wa.me/917770972867" className="lp-btn-ghost" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </div>
        </section>

        {page.sections.map((s, i) => (
          <section key={s.id} id={s.id} className={`lp-section${i % 2 ? ' alt' : ''}`}>
            <div className="lp-wrap">
              <h2 className="lp-h2">{s.heading}</h2>
              {s.intro && <p className="lp-sub">{s.intro}</p>}
              <div className="lp-grid">
                {s.items.map((it) => (
                  <div className="lp-card" key={it.title}>
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="lp-section alt">
          <div className="lp-wrap">
            <h2 className="lp-h2">How it works</h2>
            <div className="lp-steps">
              {page.steps.map((st) => (
                <div className="lp-step" key={st.title}>
                  <div>
                    <h3>{st.title}</h3>
                    <p>{st.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-wrap lp-faq">
            <h2 className="lp-h2">Frequently asked questions</h2>
            <div style={{ marginTop: 24 }}>
              {page.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section alt">
          <div className="lp-wrap lp-cta">
            <div>
              <h2 className="lp-h2">{page.cta.heading}</h2>
              <p className="lp-sub">{page.cta.text}</p>
              <div className="lp-related">
                {page.related.map((r) => (
                  <Link key={r.to} to={r.to}>{r.label}</Link>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 18, padding: 22 }}>
              <LeadForm source={page.cta.source} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default LandingPage