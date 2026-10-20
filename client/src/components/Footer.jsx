import { Link } from 'react-router-dom'
import CampusSafarLogo from '../assets/logo_CampusSafar.png'

const productLinks = [
  { label: 'SF StudyBoard', to: '/products/studyboard' },
  { label: 'School Management Software', to: '/school-management-software' },
  { label: 'Coaching Institute Software', to: '/coaching-institute-software' },
  { label: 'Idea2Software', to: '/products/campus-suite' },
  { label: 'Campus360', to: '/products/campus-suite#modules' },
  { label: 'CampusCMS', to: '/products/campus-suite#modules' },
  { label: 'CampusSeating', to: '/products/campus-suite#modules' },
  { label: 'CampusDocs', to: '/products/campus-suite#modules' },
  { label: 'CampusERP', to: '/products/campus-suite#modules' },
]

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Website Development', to: '/services/website-development' },
  { label: 'Website Development Khargone', to: '/website-development-khargone' },
  { label: 'Custom Development', to: '/custom-development' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
  { label: 'Book a Demo', to: '/contact' },
  { label: 'Sitemap', to: '/sitemap' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #E5E7EB', paddingTop: 64, paddingBottom: 32 }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>

          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, textDecoration: 'none' }}>
              <img src={CampusSafarLogo} alt="CampusSafar" style={{ height: 34, width: 'auto' }} />
              <span style={{ fontWeight: 800, fontSize: 18, color: '#0A1628' }}>CampusSafar</span>
            </Link>
            <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.75, maxWidth: 280, marginBottom: 16 }}>
              India's smartest campus platform, SF StudyBoard for students, Idea2Software for institutes. Built by students, for students.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#9CA3AF' }}>
              <span>🇮🇳</span>
              <span>Made in Khargone, Madhya Pradesh, India</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>Products</div>
            {productLinks.map(l => (
              <Link key={l.label} to={l.to} style={{ display: 'block', fontSize: 14, color: '#6B7280', marginBottom: 12, textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>Company</div>
            {companyLinks.map(l => (
              <Link key={l.label} to={l.to} style={{ display: 'block', fontSize: 14, color: '#6B7280', marginBottom: 12, textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.5 }}>Legal</div>
            {legalLinks.map(l => (
              <Link key={l.label} to={l.to} style={{ display: 'block', fontSize: 14, color: '#6B7280', marginBottom: 12, textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
            <a href="mailto:info@campussafar.com" style={{ display: 'block', fontSize: 14, color: '#6B7280', marginBottom: 12, textDecoration: 'none' }}>
              info@campussafar.com
            </a>
            <a href="tel:+917770972867" style={{ display: 'block', fontSize: 14, color: '#6B7280', marginBottom: 12, textDecoration: 'none' }}>
              +91 77709 72867
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#9CA3AF' }}>© {year} CampusSafar Technologies Pvt. Ltd. All rights reserved.</span>
          <span style={{ fontSize: 13, color: '#9CA3AF' }}>Khargone, Madhya Pradesh, India</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

export default Footer