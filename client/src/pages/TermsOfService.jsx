import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service -CampusSafar",
  "url": "https://campussafar.com/terms-of-service",
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using CampusSafar's website or products -SF StudyBoard, Campus360, CampusCMS, CampusSeating, CampusDocs, and CampusERP -you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.`
  },
  {
    title: '2. Description of Services',
    body: `CampusSafar Technologies Pvt. Ltd. provides an exam-prep platform (SF StudyBoard) and a suite of institute-management SaaS products (Idea2Software) offered on a demo, subscription, or custom-development basis to schools, colleges, and coaching institutes.`
  },
  {
    title: '3. Accounts & Eligibility',
    body: `You must provide accurate information when creating an account or requesting a demo. Institute administrators are responsible for managing access for their staff and students within their own organization's account.`
  },
  {
    title: '4. Institute Data Ownership',
    body: `All academic, administrative, and student data entered into Idea2Software modules by an institute remains the property of that institute. CampusSafar processes this data solely to provide the contracted services and does not claim ownership over customer data.`
  },
  {
    title: '5. Acceptable Use',
    body: `You agree not to misuse our services, including attempting unauthorized access to systems, uploading malicious content, reverse-engineering our software, or using the platform for any unlawful purpose.`
  },
  {
    title: '6. Fees & Payment',
    body: `Pricing for Idea2Software modules is agreed per institute (typically per-student/year) or per custom-development engagement, and communicated separately during onboarding. SF StudyBoard offers free access to core features with optional paid upgrades where applicable.`
  },
  {
    title: '7. Intellectual Property',
    body: `All software, design, branding, and content on CampusSafar's platforms -excluding institute-owned data -remain the intellectual property of CampusSafar Technologies Pvt. Ltd. and may not be copied or redistributed without permission.`
  },
  {
    title: '8. Service Availability',
    body: `We aim to keep our platforms available and performant but do not guarantee uninterrupted access. Scheduled maintenance, third-party outages, or unforeseen issues may occasionally affect availability.`
  },
  {
    title: '9. Limitation of Liability',
    body: `To the maximum extent permitted by law, CampusSafar is not liable for indirect, incidental, or consequential damages arising from use of our services. Our total liability for any claim is limited to the fees paid by the customer in the preceding 12 months.`
  },
  {
    title: '10. Termination',
    body: `We may suspend or terminate access for accounts that violate these Terms. Institute customers may terminate their subscription per the terms agreed in their service contract.`
  },
  {
    title: '11. Governing Law',
    body: `These Terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Gwalior, Madhya Pradesh.`
  },
  {
    title: '12. Changes to These Terms',
    body: `We may revise these Terms periodically. Continued use of our services after an update constitutes acceptance of the revised Terms.`
  },
  {
    title: '13. Contact',
    body: `Questions about these Terms can be sent to hello@campussafar.com.`
  },
]

const TermsOfService = () => (
  <>
    <SEO
      title="Terms of Service -CampusSafar"
      description="Read the Terms of Service governing use of CampusSafar's website and products, including SF StudyBoard and Idea2Software."
      canonical="https://campussafar.com/terms-of-service"
      schema={schema}
    />
    <Navbar />
    <section style={{ background: '#F8FAFF', padding: '64px 0 40px' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#6B7280' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#FF5500', fontWeight: 600 }}>Terms of Service</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: '#0A1628', marginBottom: 12 }}>Terms of Service</h1>
        <p style={{ fontSize: 14, color: '#9CA3AF' }}>Last revised: July 2026</p>
      </div>
    </section>
    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: 820, margin: '0 auto' }}>
        <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 36 }}>
          These Terms of Service govern your use of CampusSafar Technologies Pvt. Ltd.'s website and products, including SF StudyBoard and Idea2Software (Campus360, CampusCMS, CampusSeating, CampusDocs, CampusERP).
        </p>
        {sections.map(s => (
          <div key={s.title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>{s.title}</h2>
            <p style={{ fontSize: 14.5, color: '#6B7280', lineHeight: 1.8 }}>{s.body}</p>
          </div>
        ))}
        <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 40, fontStyle: 'italic' }}>
          This document is a general template and does not constitute legal advice. We recommend having it reviewed by a qualified lawyer before relying on it for your institute contracts.
        </p>
      </div>
    </section>
    <Footer />
  </>
)

export default TermsOfService