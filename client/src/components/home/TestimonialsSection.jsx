import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom' 
import { useIsMobile } from './utils'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

const testimonials = [
  // ── Clients ──
  {
    name: 'Ajay Raghuwanshi',
    role: 'Principal',
    company: 'Shri Sahaj Institute of Pharmacy',
    quote: 'CampusSafar built us a custom web portal along with their CampusCMS and CampusSeating products. Our admissions, records, and exam seating are now fully organized and easy to manage.',
    photo: '/testinomial/ajay-raghuwanshi.png',
    rating: 5,
    tag: 'Client',
  },
  {
    name: 'Anil Raghuvanshi',
    role: 'Director',
    company: 'Khushi Hospital',
    quote: 'They designed our hospital website along with a complete appointment management portal. Patients can now book appointments smoothly and our front desk workload has dropped significantly.',
    photo: '/testinomial/anil-raghuvanshi.png',
    rating: 5,
    tag: 'Client',
  },
  {
    name: 'Ankur Pandey',
    role: 'Director',
    company: 'NextGen',
    quote: 'CampusSafar built our website along with a dedicated portal for fee management and reception management. It has made our day-to-day front office operations far more efficient.',
    photo: '/testinomial/ankur-pandey.png',
    rating: 5,
    tag: 'Client',
  },
  {
    name: 'P.K. Singhal',
    role: 'Chief Editor',
    company: 'IETE Bhopal',
    quote: 'They developed two custom web portals for us -one for journal publication and another for research management. Both have streamlined how we handle submissions and reviews.',
    photo: '/testinomial/pk-singhal.png',
    rating: 5,
    tag: 'Client',
  },
  {
    name: 'Lucky Singh',
    role: 'Founder',
    company: 'The Menta',
    quote: 'CampusSafar built our website covering counselling services, college details, and much more. The end result reflects exactly what we envisioned for our platform.',
    photo: '/testinomial/lucky-singh.png',
    rating: 5,
    tag: 'Client',
  },
  // ── Mentors & Dignitaries ──
  {
    name: 'Dr. Dhananjay Bisen',
    role: 'Associate Professor',
    company: 'MITS-DU',
    quote: 'What CampusSafar is building is genuinely valuable -they are solving a very real, manual process gap that most institutes struggle with every day.',
    photo: '/testinomial/dhananjay-bisen.png',
    rating: 5,
    tag: 'Mentor & Advisor',
  },
  {
    name: 'Dr. Praveen Bansal',
    role: 'Associate Dean',
    company: 'MITS-DU',
    quote: 'CampusSafar shows strong potential and a clear understanding of what institutes actually need. It has been encouraging to see their steady progress.',
    photo: '/testinomial/praveen-bansal.png',
    rating: 5,
    tag: 'Mentor & Advisor',
  },
  {
    name: 'Atul Kumar Chauhan',
    role: 'Programmer',
    company: 'MITS-DU',
    quote: 'The technical execution behind CampusSafar\'s products is solid, and the team clearly puts real thought into solving practical campus problems.',
    photo: '/testinomial/atul-chauhan.png',
    rating: 5,
    tag: 'Mentor & Advisor',
  },
  {
    name: 'Dr. Sourabh Rajput',
    role: 'Associate Dean',
    company: 'MITS-DU',
    quote: 'CampusSafar is addressing gaps that institutes have lived with for years. Their work reflects a genuine understanding of academic administration.',
    photo: '/testinomial/sourabh-rajput.png',
    rating: 5,
    tag: 'Mentor & Advisor',
  },
  {
    name: 'Dr. Aftab Ahmed Ansari',
    role: 'Associate',
    company: 'MITS-DU',
    quote: 'It\'s great to see a homegrown team building software that directly addresses the operational challenges institutes face on a daily basis.',
    photo: '/testinomial/aftab-ansari.png',
    rating: 5,
    tag: 'Mentor & Advisor',
  },
]

const CARD_WIDTH = 340
const CARD_GAP = 18

const tagStyle = (tag) => tag === 'Client'
  ? { color: '#FF8C42', background: 'rgba(255,85,0,0.12)', border: '1px solid rgba(255,85,0,0.3)' }
  : { color: '#7DD3FC', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.28)' }

const TestimonialCard = ({ item, isActive }) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.94,
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      style={{
        width: CARD_WIDTH,
        flexShrink: 0,
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isActive
          ? '1px solid rgba(255,85,0,0.35)'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 18,
        padding: '22px 22px 20px',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        boxShadow: isActive
          ? '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,85,0,0.15)'
          : '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute', top: -40, left: -40,
            width: 140, height: 140, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,85,0,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Tag badge */}
      <span style={{
        position: 'absolute', top: 18, right: 18,
        fontSize: 9.5, fontWeight: 800, letterSpacing: 0.8,
        textTransform: 'uppercase',
        padding: '4px 10px', borderRadius: 999,
        ...tagStyle(item.tag),
      }}>
        {item.tag}
      </span>

      <div style={{
        fontSize: 48, lineHeight: 0.8,
        color: '#FF5500',
        fontFamily: 'Georgia, serif',
        opacity: isActive ? 0.9 : 0.4,
        marginBottom: 10,
        display: 'block',
      }}>
        "
      </div>

      <p style={{
        fontSize: 13.5,
        color: isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
        lineHeight: 1.6,
        marginBottom: 16,
        fontStyle: 'italic',
        minHeight: 84,
        display: '-webkit-box',
        WebkitLineClamp: 5,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {item.quote}
      </p>

      <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
        {[...Array(item.rating)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, type: 'spring', bounce: 0.5 }}
            style={{ color: '#FF5500', fontSize: 13 }}
          >
            ★
          </motion.span>
        ))}
      </div>

      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, rgba(255,85,0,0.4), transparent)',
        marginBottom: 14,
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: isActive ? '2px solid #FF5500' : '2px solid rgba(255,255,255,0.15)',
          overflow: 'hidden', flexShrink: 0,
          boxShadow: isActive ? '0 0 0 3px rgba(255,85,0,0.2)' : 'none',
          background: 'rgba(255,255,255,0.1)',
        }}>
          <img
            src={item.photo}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#FF5500,#FF8C42);color:#fff;font-weight:800;font-size:15px">${item.name[0]}</div>`
            }}
          />
        </div>
        <div>
          <div style={{
            fontSize: 13, fontWeight: 800,
            color: isActive ? '#FF8C42' : 'rgba(255,255,255,0.6)',
            letterSpacing: '-0.2px',
          }}>
            {item.name}
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(196,205,222,0.55)', marginTop: 2 }}>
            {item.role} · {item.company}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Closing summary card -"15+ Happy Clients & Growing"
const SummaryCard = ({ isActive }) => (
  <motion.div
    animate={{ scale: isActive ? 1 : 0.94, opacity: isActive ? 1 : 0.55 }}
    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    style={{
      width: CARD_WIDTH,
      flexShrink: 0,
      background: 'linear-gradient(150deg, rgba(255,85,0,0.16), rgba(255,140,66,0.05))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: isActive ? '1px solid rgba(255,85,0,0.45)' : '1px solid rgba(255,255,255,0.1)',
      borderRadius: 18,
      padding: '32px 26px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxShadow: isActive
        ? '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,85,0,0.15)'
        : '0 8px 32px rgba(0,0,0,0.3)',
    }}
  >
    <div style={{
      fontSize: 46, fontWeight: 900,
      background: 'linear-gradient(90deg, #FF5500, #FF8C42)',
      WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
      letterSpacing: '-1.5px', marginBottom: 6,
    }}>
      15+
    </div>
    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
      Happy Clients & Growing
    </div>
    <p style={{ fontSize: 12.5, color: 'rgba(196,205,222,0.7)', lineHeight: 1.7, marginBottom: 22 }}>
      Institutes, hospitals, businesses and founders across India trust
      CampusSafar to build the software that runs behind the scenes.
    </p>
    <Link
      to="/contact"
      style={{
        padding: '10px 22px', background: '#FF5500', color: '#fff',
        borderRadius: 10, fontWeight: 700, fontSize: 13,
        textDecoration: 'none',
        boxShadow: '0 6px 20px rgba(255,85,0,0.35)',
      }}
    >
      Become Our Next Success Story →
    </Link>
  </motion.div>
)

const TestimonialsSection = () => {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '0px 0px -60px 0px' })

  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  const slideCount = testimonials.length + 1 // + summary card

  useEffect(() => {
    if (isDragging) return
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % slideCount)
    }, 4000)
    return () => clearInterval(timer)
  }, [isDragging, slideCount])

  const totalWidth = slideCount * (CARD_WIDTH + CARD_GAP) - CARD_GAP

  const getX = (index) => {
    if (typeof window === 'undefined') return 0
    const vw = window.innerWidth
    return -(index * (CARD_WIDTH + CARD_GAP)) + vw / 2 - CARD_WIDTH / 2
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#04080F',
        padding: isMobile ? '40px 0 44px' : '56px 0 60px',
        marginTop: isMobile ? -40 : -70,
        clipPath: isMobile
          ? 'polygon(0 0, 100% 40px, 100% 100%, 0 100%)'
          : 'polygon(0 0, 100% 70px, 100% 100%, 0 100%)',
        paddingTop: isMobile ? 40 + 40 : 70 + 56,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10% 0',
          y: bgY,
          scale: bgScale,
          backgroundImage: 'url(/products/testinomial.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transformOrigin: 'center',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg,
          rgba(4,8,15,0.92) 0%,
          rgba(4,8,15,0.72) 40%,
          rgba(4,8,15,0.82) 70%,
          rgba(4,8,15,0.97) 100%
        )`,
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 30% at 50% 38%, rgba(255,85,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 32, padding: '0 20px' }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={headingInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              display: 'inline-block', marginBottom: 10,
              fontSize: 10, fontWeight: 800, letterSpacing: 2.5,
              color: '#FF5500', textTransform: 'uppercase',
              background: 'rgba(255,85,0,0.1)',
              border: '1px solid rgba(255,85,0,0.25)',
              padding: '5px 14px', borderRadius: 999,
            }}
          >
            What Our Clients Say
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT_EXPO }}
            style={{
              fontSize: isMobile ? 22 : 'clamp(24px,3vw,36px)',
              fontWeight: 900, color: '#fff',
              letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 10,
            }}
          >
            Trusted by Institutes &{' '}
            <span style={{ color: '#FF5500' }}>Businesses.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.28 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={headingInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06, type: 'spring', bounce: 0.5 }}
                style={{ color: '#FF5500', fontSize: 16 }}
              >★</motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              style={{ fontSize: 12, color: 'rgba(196,205,222,0.5)', marginLeft: 8 }}
            >
              5.0 · Loved by every client
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{
            textAlign: 'center', marginBottom: 16,
            fontSize: 10.5, color: 'rgba(196,205,222,0.3)',
            letterSpacing: 1, textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <motion.span animate={{ x: [-4, 4, -4] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>←</motion.span>
          Drag to explore
          <motion.span animate={{ x: [4, -4, 4] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
        </motion.div>

        <div style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}>
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{
              left: -(totalWidth - (typeof window !== 'undefined' ? window.innerWidth : 1200) + CARD_WIDTH / 2),
              right: (typeof window !== 'undefined' ? window.innerWidth : 1200) / 2 - CARD_WIDTH / 2,
            }}
            dragElastic={0.08}
            onDragStart={() => { setIsDragging(true) }}
            onDragEnd={(_, info) => {
              setIsDragging(false)
              const threshold = 60
              if (info.offset.x < -threshold) {
                setActiveIndex(i => Math.min(i + 1, slideCount - 1))
              } else if (info.offset.x > threshold) {
                setActiveIndex(i => Math.max(i - 1, 0))
              }
            }}
            animate={{ x: getX(activeIndex) }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            style={{
              display: 'flex',
              gap: CARD_GAP,
              width: totalWidth,
              willChange: 'transform',
            }}
          >
            {testimonials.map((item, i) => (
              <TestimonialCard key={item.name} item={item} isActive={i === activeIndex} />
            ))}
            <SummaryCard isActive={testimonials.length === activeIndex} />
          </motion.div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {Array.from({ length: slideCount }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIndex(i)}
              animate={{
                width: i === activeIndex ? 26 : 6,
                background: i === activeIndex ? '#FF5500' : 'rgba(255,255,255,0.2)',
              }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              style={{ height: 6, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 18 }}>
          {[{ dir: -1, label: '←' }, { dir: 1, label: '→' }].map(({ dir, label }) => (
            <motion.button
              key={dir}
              onClick={() => setActiveIndex(i => Math.max(0, Math.min(slideCount - 1, i + dir)))}
              whileHover={{ scale: 1.1, background: '#FF5500', borderColor: '#FF5500', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: 'center', marginTop: 24,
            fontSize: 11, color: 'rgba(196,205,222,0.25)',
            maxWidth: 480, marginInline: 'auto', lineHeight: 1.6,
            padding: '0 20px',
          }}
        >
          Testimonials are from real clients and mentors -institutes, businesses,
          and dignitaries who have worked directly with CampusSafar.
        </motion.p>
      </div>
    </section>
  )
}

export default TestimonialsSection