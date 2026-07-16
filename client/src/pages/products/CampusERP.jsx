import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { Link } from 'react-router-dom'

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CampusERP, School and Coaching Management System",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "CampusERP by CampusSafar is a school and coaching institute management system covering admissions, fee collection, marksheet generation and faculty records in one dashboard.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "description": "Free demo available" },
  "provider": { "@type": "Organization", "name": "CampusSafar", "url": "https://campussafar.com" }
}

const faqs = [
  { q: 'What is CampusERP?', a: 'CampusERP is CampusSafar\'s school and coaching institute management system that unifies admissions, fee collection, marksheet generation and faculty records in one back-office dashboard.' },
  { q: 'Can CampusERP track fee payments and dues?', a: 'Yes, CampusERP tracks fee collection per student, flags pending dues, and keeps a full payment history for audits.' },
  { q: 'Does it handle admissions?', a: 'Yes, admissions can be recorded and managed directly in CampusERP, from enquiry to enrollment.' },
  { q: 'Can it generate marksheets?', a: 'Yes, CampusERP generates marksheets based on entered results, ready for printing or digital sharing with students.' },
  { q: 'Is CampusERP suitable for coaching institutes too?', a: 'Yes, CampusERP is built for both schools and coaching institutes that need admission, fee and record management without a dedicated IT team.' },
  { q: 'Is CampusERP part of a bigger suite?', a: 'Yes, CampusERP is one of the core modules in CampusSafar\'s Idea2Software suite, alongside Campus360, CampusCMS, CampusSeating and CampusDocs.' },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
}

const features = [
  { title: 'Admission Management', desc: 'Record and track admissions from enquiry to enrollment, all in one place.' },
  { title: 'Fee Collection Tracking', desc: 'Track payments per student, flag pending dues, and keep a full payment history for audits.' },
  { title: 'Marksheet Generation', desc: 'Generate marksheets from entered results, ready for print or digital sharing.' },
  { title: 'Faculty Chain Management', desc: 'Maintain faculty records and reporting chains in a single, audit-friendly system.' },
]

const CampusERP = () => (
  <>
    <SEO
      title="School Fee and Admission Management System | CampusERP"
      description="CampusERP by CampusSafar unifies admissions, fee collection, marksheet generation and faculty records for schools and coaching institutes. Free demo available."
      canonical="https://campussafar.com/products/school-fee-admission-management-system"
      schema={[schema, faqSchema]}
    />
    <Navbar />

    <section style={{ background: '#0A1628', padding: '64px 0', color: '#fff' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#94A3B8' }}>Home</Link><span>/</span>
          <Link to="/products/campus-suite" style={{ color: '#94A3B8' }}>Idea2Software</Link><span>/</span>
          <span style={{ color: '#FF5500' }}>CampusERP</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, marginBottom: 16, maxWidth: 700 }}>
          School Fee and Admission Management System
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 560, lineHeight: 1.7, marginBottom: 28 }}>
          Admissions, fee collection, marksheets and faculty records, unified in one back-office dashboard for schools and coaching institutes.
        </p>
        <Link to="/contact" style={{ display: 'inline-block', padding: '13px 26px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700 }}>
          Book a Free Demo →
        </Link>
      </div>
    </section>

    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>What's Inside CampusERP</h2>
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

export default CampusERP