import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { Link } from 'react-router-dom'

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CampusSeating - Exam Seating Arrangement Software",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "CampusSeating by CampusSafar - automated exam seating arrangement software for schools and colleges. Auto-generate seating charts by room, roll number, and section.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "description": "Free demo available" },
  "provider": { "@type": "Organization", "name": "CampusSafar", "url": "https://campussafar.com" }
}

const faqs = [
  { q: 'What is CampusSeating?', a: 'CampusSeating is CampusSafar\'s exam seating arrangement software that auto-generates conflict-free seating charts for schools and colleges, replacing manual planning.' },
  { q: 'How does automatic seating arrangement work?', a: 'You input room capacity, sections, and student lists - CampusSeating instantly generates roll-number-wise seating charts that avoid same-class clashes.' },
  { q: 'Can I print the seating plans?', a: 'Yes, CampusSeating generates printable, room-wise seating charts ready for exam day.' },
  { q: 'Does it handle multiple exam halls at once?', a: 'Yes - CampusSeating manages seating across multiple rooms and exam sessions simultaneously, all from one dashboard.' },
  { q: 'Is CampusSeating part of a bigger suite?', a: 'Yes, CampusSeating is one of five core modules in CampusSafar\'s Idea2Software suite for institutes, alongside CampusCMS, Campus360, CampusDocs, and CampusERP.' },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
}

const features = [
  { title: 'Auto-Generated Seating Charts', desc: 'Instantly create room-wise seating plans by roll number and section - no manual charting.' },
  { title: 'Conflict-Free Distribution', desc: 'Automatically avoids seating same-class or same-section students next to each other.' },
  { title: 'Room & Capacity Management', desc: 'Configure room layouts and capacities once, reuse across every exam cycle.' },
  { title: 'Printable Plans', desc: 'Export ready-to-print seating charts for exam day, room by room.' },
]

const CampusSeating = () => (
  <>
    <SEO
      title="Exam Seating Arrangement Software for Schools & Colleges | CampusSeating"
      description="CampusSeating by CampusSafar: auto-generate exam seating arrangements by room, roll number and section. No more manual charts or clashes. Free demo available."
      canonical="https://campussafar.com/products/exam-seating-arrangement-software"
      schema={[schema, faqSchema]}
    />
    <Navbar />

    <section style={{ background: '#0A1628', padding: '64px 0', color: '#fff' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#94A3B8' }}>Home</Link><span>/</span>
          <Link to="/products/campus-suite" style={{ color: '#94A3B8' }}>Idea2Software</Link><span>/</span>
          <span style={{ color: '#FF5500' }}>CampusSeating</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, marginBottom: 16, maxWidth: 700 }}>
          Exam Seating Arrangement Software for Schools & Colleges
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 560, lineHeight: 1.7, marginBottom: 28 }}>
          Auto-generate conflict-free exam seating charts by room, roll number and section - no more manual planning or last-minute clashes.
        </p>
        <Link to="/contact" style={{ display: 'inline-block', padding: '13px 26px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700 }}>
          Book a Free Demo →
        </Link>
      </div>
    </section>

    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>What's Inside CampusSeating</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 48 }}>
          {features.map(f => (
            <div key={f.title} style={{ border: '1.5px solid #E5E7EB', borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Frequently Asked Questions</h2>
        {faqs.map(f => (
          <div key={f.q} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{f.q}</h3>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{f.a}</p>
          </div>
        ))}
      </div>
    </section>

    <Footer />
  </>
)

export default CampusSeating