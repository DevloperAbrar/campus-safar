import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sitemap -CampusSafar",
  "url": "https://campussafar.com/sitemap",
}

const groups = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Sitemap', to: '/sitemap' },
    ]
  },
  {
    title: 'Products',
    links: [
      { label: 'SF StudyBoard', to: '/products/studyboard' },
      { label: 'Idea2Software (Campus Suite)', to: '/products/campus-suite' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms-of-service' },
    ]
  },
]

const subdomains = [
  { label: 'Idea2Software App', url: 'https://i2s.campussafar.com' },
  { label: 'SF StudyBoard (StudyBoard subdomain)', url: 'https://sfstudyboard.campussafar.com' },
  { label: 'SF SmartLabs', url: 'https://sfsmartlabs.in' },
  { label: 'CampusDocs', url: 'https://campusdocs.campussafar.com' },
  { label: 'CampusSeating', url: 'https://seating.campussafar.com' },
  { label: 'CampusCMS', url: 'https://cms.campussafar.com' },
  { label: 'Campus360', url: 'https://campus360.campussafar.com' },
  { label: 'CampusERP', url: 'https://erp.campussafar.com' },
]

const LinkCard = ({ label, to, external }) => {
  const content = (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px', border: '1.5px solid #E5E7EB', borderRadius: 12,
      fontSize: 14.5, color: '#0A1628', fontWeight: 500, textDecoration: 'none',
      background: '#fff'
    }}>
      <span>{label}</span>
      <span style={{ color: '#FF5500' }}>→</span>
    </div>
  )
  return external
    ? <a href={to} target="_blank" rel="noopener noreferrer">{content}</a>
    : <Link to={to}>{content}</Link>
}

const Sitemap = () => (
  <>
    <SEO
      title="Sitemap -CampusSafar"
      description="Full sitemap of CampusSafar -SF StudyBoard, Idea2Software, and all CampusSafar products and pages."
      canonical="https://campussafar.com/sitemap"
      schema={schema}
    />
    <Navbar />
    <section style={{ background: '#F8FAFF', padding: '64px 0 40px' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#6B7280' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#FF5500', fontWeight: 600 }}>Sitemap</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: '#0A1628', marginBottom: 12 }}>Sitemap</h1>
        <p style={{ fontSize: 15, color: '#6B7280', maxWidth: 560 }}>A complete map of every page and product across the CampusSafar ecosystem.</p>
      </div>
    </section>

    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: 820, margin: '0 auto' }}>
        {groups.map(g => (
          <div key={g.title} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>{g.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {g.links.map(l => <LinkCard key={l.label} {...l} />)}
            </div>
          </div>
        ))}

        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>CampusSafar Product Apps</h2>
          <p style={{ fontSize: 13.5, color: '#9CA3AF', marginBottom: 16 }}>These are live application subdomains -sign in requires an institute or student account.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {subdomains.map(s => <LinkCard key={s.label} label={s.label} to={s.url} external />)}
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
)

export default Sitemap