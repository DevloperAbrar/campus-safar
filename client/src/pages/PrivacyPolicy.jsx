import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy -CampusSafar",
  "url": "https://campussafar.com/privacy-policy",
}

const sections = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly (name, email, phone number, institute name, message content) when you fill out a contact form, book a demo, or sign up on SF StudyBoard or Idea2Software. We also automatically collect usage data such as pages visited, device/browser type, IP address, and referring URLs through standard analytics tools.`
  },
  {
    title: '2. How We Use Your Information',
    body: `We use collected information to: respond to inquiries and demo requests; provide, operate, and improve our products (SF StudyBoard, Campus360, CampusCMS, CampusSeating, CampusDocs, CampusERP); send service-related communications; and analyze usage trends to improve platform performance and security.`
  },
  {
    title: '3. Student & Institute Data',
    body: `For institute customers, academic data (attendance, marks, notices, seating plans, documents) entered into our platforms is owned by the respective institute. CampusSafar acts as a data processor for this information and does not sell or share it with third parties for marketing purposes.`
  },
  {
    title: '4. Cookies & Analytics',
    body: `Our website uses cookies and similar technologies to remember preferences and understand aggregate traffic patterns. You can disable cookies in your browser settings, though some site features may not function as intended.`
  },
  {
    title: '5. Data Sharing',
    body: `We do not sell personal information. We may share data with trusted service providers (e.g. hosting, email delivery) strictly to operate our services, and when required by law or to protect our legal rights.`
  },
  {
    title: '6. Data Security',
    body: `We use reasonable technical and organizational measures -including encrypted connections, access controls, and secure hosting -to protect information against unauthorized access, alteration, or disclosure. No method of transmission over the internet is 100% secure.`
  },
  {
    title: '7. Data Retention',
    body: `We retain personal information only as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, or as agreed with an institute customer under a service contract.`
  },
  {
    title: '8. Your Rights',
    body: `You may request access to, correction of, or deletion of your personal information by contacting us at hello@campussafar.com. Institute administrators can manage student data directly within the relevant CampusSafar product.`
  },
  {
    title: '9. Children\u2019s Data',
    body: `SF StudyBoard and Idea2Software may be used by students under 18 through their school, coaching institute, or with parental involvement. We rely on institutes and parents/guardians to provide any consent required under applicable law before a minor's data is entered into our systems.`
  },
  {
    title: '10. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Material changes will be reflected by an updated "Last revised" date below. Continued use of our services after changes constitutes acceptance of the revised policy.`
  },
  {
    title: '11. Contact Us',
    body: `For any privacy-related questions, reach us at hello@campussafar.com or through our Contact page.`
  },
]

const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy -CampusSafar"
      description="Read CampusSafar's Privacy Policy covering how we collect, use, and protect data across SF StudyBoard and Idea2Software."
      canonical="https://campussafar.com/privacy-policy"
      schema={schema}
    />
    <Navbar />
    <section style={{ background: '#F8FAFF', padding: '64px 0 40px' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#6B7280' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#FF5500', fontWeight: 600 }}>Privacy Policy</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: '#0A1628', marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: '#9CA3AF' }}>Last revised: July 2026</p>
      </div>
    </section>
    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: 820, margin: '0 auto' }}>
        <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 36 }}>
          This Privacy Policy explains how CampusSafar Technologies Pvt. Ltd. ("CampusSafar", "we", "us") collects, uses, and protects information across our website and products, including SF StudyBoard and Idea2Software (Campus360, CampusCMS, CampusSeating, CampusDocs, CampusERP).
        </p>
        {sections.map(s => (
          <div key={s.title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>{s.title}</h2>
            <p style={{ fontSize: 14.5, color: '#6B7280', lineHeight: 1.8 }}>{s.body}</p>
          </div>
        ))}
        <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 40, fontStyle: 'italic' }}>
          This document is a general template and does not constitute legal advice. We recommend having it reviewed by a qualified lawyer to ensure full compliance with applicable Indian data protection law (including the Digital Personal Data Protection Act) for your specific use case.
        </p>
      </div>
    </section>
    <Footer />
  </>
)

export default PrivacyPolicy