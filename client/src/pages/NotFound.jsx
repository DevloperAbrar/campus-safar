import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const NotFound = () => (
  <>
    <SEO title="Page not found" noindex />
    <Navbar />
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ maxWidth: 520 }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: '#FF5500', lineHeight: 1 }}>404</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: '16px 0 12px' }}>This page does not exist</h1>
        <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: 24 }}>
          The link may be broken or the page may have moved. Try one of these instead.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ background: '#FF5500', color: '#fff', padding: '12px 22px', borderRadius: 10, fontWeight: 700, textDecoration: 'none' }}>Go home</Link>
          <Link to="/school-management-software" style={{ border: '1.5px solid #E5E7EB', color: '#0A1628', padding: '12px 22px', borderRadius: 10, fontWeight: 700, textDecoration: 'none' }}>School software</Link>
          <Link to="/contact" style={{ border: '1.5px solid #E5E7EB', color: '#0A1628', padding: '12px 22px', borderRadius: 10, fontWeight: 700, textDecoration: 'none' }}>Contact us</Link>
        </div>
      </div>
    </main>
    <Footer />
  </>
)

export default NotFound