import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import trackEvent from '../utils/trackEvent'
import CampusSafarLogo from '../assets/logo_CampusSafar.png'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.85)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #E5E7EB',
        height: 68,
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
      }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '100%'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <img
              src={CampusSafarLogo}
              alt="CampusSafar Logo"
              style={{
                height: 42,
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">

          {/* Products Dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '8px 14px', background: 'none', border: 'none',
              fontWeight: 600, fontSize: 15, color: '#0A1628', cursor: 'pointer'
            }}>
              Products
              <motion.svg
                animate={{ rotate: productsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                    background: '#fff', border: '1px solid #E5E7EB',
                    borderRadius: 14, boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                    padding: 8, minWidth: 240, zIndex: 100,
                    transformOrigin: 'top left'
                  }}>
                  {[
                    { to: '/products/studyboard', title: 'SF StudyBoard', sub: 'For Students & Parents', icon: '🎓' },
                    { to: '/products/idea-2-software', title: 'Idea2Software', sub: 'For Colleges & Schools', icon: '🏛' }
                  ].map((item, i) => (
                    <motion.div key={item.to}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}>
                      <Link to={item.to} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                        <span style={{ fontSize: 22 }}>{item.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0A1628', fontSize: 14 }}>{item.title}</div>
                          <div style={{ color: '#6B7280', fontSize: 13 }}>{item.sub}</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
          ].map(item => (
            <Link key={item.label} to={item.path} style={{
              padding: '8px 14px', fontSize: 15, fontWeight: 500,
              color: isActive(item.path) ? '#FF5500' : '#6B7280',
              transition: 'color 0.2s', position: 'relative'
            }}
              onMouseEnter={e => { if (!isActive(item.path)) e.currentTarget.style.color = '#0A1628' }}
              onMouseLeave={e => { if (!isActive(item.path)) e.currentTarget.style.color = '#6B7280' }}>
              {item.label}
              {isActive(item.path) && (
                <motion.div layoutId="navUnderline"
                  style={{ position: 'absolute', bottom: 2, left: 14, right: 14, height: 2, background: '#FF5500', borderRadius: 999 }} />
              )}
            </Link>
          ))}


          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact"
              onClick={() => trackEvent('cta_click', { button: 'get_started_free', location: 'navbar' })}
              style={{
                marginLeft: 8, padding: '10px 20px',
                background: '#FF5500', color: '#fff',
                borderRadius: 10, fontWeight: 600, fontSize: 15,
                display: 'inline-block', textDecoration: 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#E04A00'}
              onMouseLeave={e => e.currentTarget.style.background = '#FF5500'}>
              Get Started Free
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}>
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></motion.svg>
            ) : (
              <motion.svg key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#fff', borderTop: '1px solid #E5E7EB', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px 24px' }}>
              {[
                { to: '/products/studyboard', label: 'SF StudyBoard' },
                { to: '/products/idea-2-software', label: 'Idea2Software' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((item, i) => (
                <motion.div key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  <Link to={item.to} style={{ display: 'block', padding: '12px 0', fontWeight: 600, color: '#0A1628', borderBottom: '1px solid #F3F4F6', textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Link to="/products/studyboard" style={{
                  display: 'block', marginTop: 16, padding: '14px',
                  background: '#FF5500', color: '#fff', borderRadius: 10,
                  fontWeight: 600, textAlign: 'center', textDecoration: 'none'
                }}>Get Started Free</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  )
}

export default Navbar