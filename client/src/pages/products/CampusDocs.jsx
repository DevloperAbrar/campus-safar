import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { Link } from 'react-router-dom'

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CampusDocs, College Certificate and Document Management System",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "CampusDocs by CampusSafar is a self-hosted certificate and document management system for colleges, covering student requests, approval workflows, PDF generation and QR-based verification.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "description": "Free demo available" },
  "provider": { "@type": "Organization", "name": "CampusSafar", "url": "https://campussafar.com" }
}

const faqs = [
  { q: 'What is CampusDocs?', a: 'CampusDocs is CampusSafar\'s certificate and document management system for colleges. It digitizes the entire issuance workflow, from student request to PDF generation and QR-based verification.' },
  { q: 'How does certificate verification work?', a: 'Every issued certificate gets a unique QR code linked to a public verification page. Anyone scanning it sees the student name, document type, issue date and a verified status, with no sensitive data exposed.' },
  { q: 'Can departments create their own certificate templates?', a: 'Yes, admins upload an HTML certificate template and the system automatically detects placeholder fields, which are then configured as student form fields.' },
  { q: 'How do students apply for a certificate?', a: 'Students log in, choose a document type from the list configured by the college, fill in the required fields, and submit. They can track status and download the certificate once approved.' },
  { q: 'Can a certificate be revoked after issue?', a: 'Yes, admins can revoke a certificate at any time. The verification page then shows a revoked status along with the revocation date.' },
  { q: 'Is CampusDocs hosted on CampusSafar servers or the college\'s own server?', a: 'CampusDocs is self-hosted, deployed directly on the college\'s own server, so each institution runs its own independent instance.' },
  { q: 'Is CampusDocs part of a bigger suite?', a: 'Yes, CampusDocs is one of the core modules in CampusSafar\'s Idea2Software suite, alongside Campus360, CampusCMS, CampusSeating and CampusERP.' },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
}

const features = [
  { title: 'HTML Template Builder', desc: 'Admins upload a certificate template and the system auto-detects placeholder fields, so no coding is needed to configure a new document type.' },
  { title: 'Request, Approve, Issue Workflow', desc: 'Students apply, admins review and approve or reject with a reason, and approved certificates are generated automatically.' },
  { title: 'QR-Based Verification', desc: 'Every certificate carries a unique QR code linking to a public page that confirms it is valid, without exposing sensitive student data.' },
  { title: 'Bulk Student Upload', desc: 'Import students in bulk through CSV, with validation and a downloadable error report for any rows that fail.' },
  { title: 'Achievement Certificates', desc: 'Issue certificates to many students at once for events and achievements, each personalized and emailed automatically.' },
  { title: 'Full Audit Trail', desc: 'Every action across the system is logged, so admins always know who approved, rejected, or revoked a document, and when.' },
]

const CampusDocs = () => (
  <>
    <SEO
      title="College Certificate and Document Management System | CampusDocs"
      description="CampusDocs by CampusSafar: self-hosted certificate and document management system for colleges. Request workflows, PDF generation, and QR-based verification. Free demo."
      canonical="https://campussafar.com/products/certificate-document-management-system"
      schema={[schema, faqSchema]}
    />
    <Navbar />

    <section style={{ background: '#0A1628', padding: '64px 0', color: '#fff' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#94A3B8' }}>Home</Link><span>/</span>
          <Link to="/products/campus-suite" style={{ color: '#94A3B8' }}>Idea2Software</Link><span>/</span>
          <span style={{ color: '#FF5500' }}>CampusDocs</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, marginBottom: 16, maxWidth: 700 }}>
          Certificate and Document Management System for Colleges
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 560, lineHeight: 1.7, marginBottom: 28 }}>
          Digitize certificate requests, approvals, PDF generation and QR-based verification, self-hosted on your own college server.
        </p>
        <Link to="/contact" style={{ display: 'inline-block', padding: '13px 26px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700 }}>
          Book a Free Demo →
        </Link>
      </div>
    </section>

    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>What's Inside CampusDocs</h2>
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

export default CampusDocs