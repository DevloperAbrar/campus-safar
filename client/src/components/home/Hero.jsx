import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import trackEvent from '../../utils/trackEvent'
import { useIsMobile, EASE_OUT_EXPO, SPRING_BOUNCY } from './utils'

const stats = [
  { icon: '⚡', v: '5+', l: 'SaaS Apps' },
  { icon: '📄', v: '50,000+', l: 'PYQs' },
  { icon: '🧪', v: '300+', l: 'Virtual Labs' },
  { icon: '✅', v: '100%', l: 'Managed Setup' },
]

const previewApps = [
  { icon: '🎓', name: 'SF StudyBoard', tag: 'Students', color: '#FF5500' },
  { icon: '🎯', name: 'Campus360', tag: 'Institutes', color: '#4F46E5' },
  { icon: '🗂️', name: 'CampusERP', tag: 'Institutes', color: '#DC2626' },
  { icon: '📁', name: 'CampusDocs', tag: 'Institutes', color: '#65A30D' },
]

// IMPORTANT: these strings must match your actual filenames EXACTLY (case-sensitive on
// Linux hosting like Vercel/Netlify). Check /public/hero/ and confirm the real casing.
const HERO_DESKTOP = '/hero/hero_Laptop.png'
const HERO_MOBILE = '/hero/hero_mobile.png'

const Hero = () => {
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const targetImage = isMobile ? HERO_MOBILE : HERO_DESKTOP
  const [resolvedImage, setResolvedImage] = useState(HERO_DESKTOP)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Preload + verify the image actually exists/loads before using it as a background.
  // If the mobile image 404s (bad path/case/missing file), fall back to desktop image
  // instead of showing a blank hero, and log a clear warning to the console.
  useEffect(() => {
    let cancelled = false
    setImageLoaded(false)
    const img = new Image()
    img.src = targetImage
    img.onload = () => {
      if (cancelled) return
      setResolvedImage(targetImage)
      setImageLoaded(true)
    }
    img.onerror = () => {
      if (cancelled) return
      console.warn(
        `[Hero] Failed to load "${targetImage}". Check that the file exists in ` +
        `public/hero/ with EXACT matching case, then hard-refresh. Falling back to desktop image.`
      )
      if (targetImage !== HERO_DESKTOP) {
        const fallback = new Image()
        fallback.src = HERO_DESKTOP
        fallback.onload = () => { if (!cancelled) { setResolvedImage(HERO_DESKTOP); setImageLoaded(true) } }
      } else {
        setImageLoaded(true) // nothing more to fall back to; stop blocking render
      }
    }
    return () => { cancelled = true }
  }, [targetImage])

  return (
    <section ref={ref} style={{ position: 'relative', height: isMobile ? '94svh' : '100vh', overflow: 'hidden', background: '#0A1628' }}>

      {/* Background image with scroll parallax */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${resolvedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center 25%' : 'center center',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          scale: bgScale,
          y: bgY,
        }}
      />

      {/* Lighter gradient overlay -image stays visible, text still readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isMobile
          ? 'linear-gradient(180deg, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.55) 40%, rgba(10,22,40,0.88) 100%)'
          : 'linear-gradient(115deg, rgba(10,22,40,0.82) 0%, rgba(10,22,40,0.5) 38%, rgba(10,22,40,0.12) 70%, rgba(10,22,40,0.05) 100%)',
      }} />

      {/* Subtle top vignette so navbar text stays crisp */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(180deg, rgba(0,0,0,0.35), transparent)', pointerEvents: 'none' }} />

      {/* Ambient glow accents */}
      {!isMobile && (
        <>
          <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '20%', right: '18%', width: 3, height: 3, borderRadius: '50%', background: '#FF8C42', boxShadow: '0 0 12px 4px rgba(255,140,66,0.5)' }} />
          <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            style={{ position: 'absolute', top: '55%', right: '30%', width: 2, height: 2, borderRadius: '50%', background: '#FF8C42', boxShadow: '0 0 10px 3px rgba(255,140,66,0.45)' }} />
        </>
      )}

      {/* Content */}
      <motion.div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', opacity: textOpacity, y: textY }}>
        <div className="container" style={{ padding: isMobile ? '0 20px' : '0 clamp(16px,4vw,40px)', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,600px) 1fr', gap: isMobile ? 0 : 48, alignItems: 'center' }}>

            {/* LEFT -main copy */}
            <div>
              <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,85,0,0.4)', borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 500, color: '#FF8C42', marginBottom: 24, background: 'rgba(255,85,0,0.12)', backdropFilter: 'blur(6px)' }}>
                <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5500', display: 'inline-block' }} />
                Software for Campuses & Businesses
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
                style={{ fontSize: isMobile ? 38 : 'clamp(36px,4.4vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.06, marginBottom: 22, letterSpacing: '-1.5px', textShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
                Software That Runs<br />
                Your{' '}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{ background: 'linear-gradient(90deg,#FF5500,#FF8C42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Campus & Business.
                  </span>
                  <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT_EXPO }}
                    style={{ position: 'absolute', bottom: -6, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#FF5500,#FF8C42)', borderRadius: 999, transformOrigin: 'left', boxShadow: '0 0 12px rgba(255,85,0,0.6)' }} />
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.25 }}
                style={{ fontSize: isMobile ? 15.5 : 18, color: '#C4CDDE', lineHeight: 1.75, marginBottom: 34, maxWidth: 480, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                From student portals to custom business applications, CampusSafar builds the software that runs behind the scenes.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.35 }}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
                  <Link to="/contact" onClick={() => trackEvent('cta_click', { button: 'book_a_demo', location: 'hero' })}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 28px', background: '#FF5500', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 15.5, boxShadow: '0 10px 36px rgba(255,85,0,0.45)', position: 'relative', overflow: 'hidden' }}>
                    <motion.span animate={{ x: ['-110%', '210%'] }} transition={{ repeat: Infinity, duration: 2.6, delay: 1.6, ease: 'linear' }}
                      style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)', transform: 'skewX(-20deg)' }} />
                    Book a Demo <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.96 }} transition={SPRING_BOUNCY}>
                  <Link to="/custom-development" style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 28px', border: '1.5px solid rgba(255,255,255,0.28)', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15.5, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
                    Explore Products
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats row */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.45 }}
                style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,auto)', gap: 10, marginBottom: 8 }}>
                {stats.map((s, i) => (
                  <motion.div key={s.l}
                    initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ ...SPRING_BOUNCY, delay: 0.5 + i * 0.07 }}
                    whileHover={{ y: -3, borderColor: 'rgba(255,85,0,0.4)' }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '9px 13px', backdropFilter: 'blur(10px)' }}>
                    <span style={{ fontSize: 16 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{s.v}</div>
                      <div style={{ fontSize: 10, color: '#94A3B8', lineHeight: 1.2 }}>{s.l}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT -floating glass product-preview card (desktop only) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.5 }}
                style={{ justifySelf: 'end', width: '100%', maxWidth: 340 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.16)',
                    borderRadius: 20,
                    padding: 22,
                    boxShadow: '0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: '#fff' }}>Our Ecosystem</span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#4ADE80', background: 'rgba(74,222,128,0.15)', padding: '3px 9px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
                        style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                      Live
                    </span>
                  </div>

                  {previewApps.map((app, i) => (
                    <motion.div key={app.name}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
                      whileHover={{ x: 4, background: 'rgba(255,255,255,0.06)' }}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px', borderRadius: 11, marginBottom: 4, cursor: 'default' }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${app.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                        {app.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{app.name}</div>
                        <div style={{ fontSize: 10.5, color: '#94A3B8' }}>{app.tag}</div>
                      </div>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: app.color }} />
                    </motion.div>
                  ))}

                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 8 }}>
                    <Link to="/products/studyboard" style={{ flex: 1, textAlign: 'center', padding: '9px', fontSize: 11.5, fontWeight: 600, color: '#FF8C42', border: '1px solid rgba(255,85,0,0.3)', borderRadius: 8, textDecoration: 'none' }}>
                      🎓 StudyBoard
                    </Link>
                    <Link to="/products/idea-2-software" style={{ flex: 1, textAlign: 'center', padding: '9px', fontSize: 11.5, fontWeight: 600, color: '#94A3B8', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, textDecoration: 'none' }}>
                      🏛 Idea2Software
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Product chips -mobile only, since right card is desktop-only */}
          {isMobile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
              <Link to="/products/studyboard" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#C4CDDE', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 999, padding: '7px 15px', textDecoration: 'none', background: 'rgba(255,255,255,0.05)' }}>
                🎓 SF StudyBoard
              </Link>
              <Link to="/products/idea-2-software" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#C4CDDE', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 999, padding: '7px 15px', textDecoration: 'none', background: 'rgba(255,255,255,0.05)' }}>
                🏛 Idea2Software
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {!isMobile && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }}
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
            style={{ width: 16, height: 16, borderLeft: '2px solid rgba(255,255,255,0.55)', borderBottom: '2px solid rgba(255,255,255,0.55)', transform: 'rotate(-45deg)', borderRadius: 2 }} />
        </motion.div>
      )}
    </section>
  )
}

export default Hero