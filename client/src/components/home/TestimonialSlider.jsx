import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TestimonialCard = ({ item, kind, isActive, width }) => {
  const isFaculty = kind === 'faculty'
  return (
    <motion.div
      animate={{ scale: isActive ? 1.02 : 0.95, y: isActive ? -4 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ width, flexShrink: 0, background: isActive ? '#fff' : '#FAFAFB', border: `2px solid ${isActive ? '#FF5500' : '#E9EAEE'}`, borderRadius: 18, padding: 'clamp(18px,2.5vw,26px)', position: 'relative', height: '100%', boxShadow: isActive ? '0 20px 48px rgba(255,85,0,0.22), 0 0 0 4px rgba(255,85,0,0.07)' : '0 4px 14px rgba(10,22,40,0.05)', userSelect: 'none', overflow: 'hidden' }}>
      <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#FF5500,#FF8C42)' }} />
      {isFaculty && (
        <span style={{ position: 'absolute', top: 5, left: 20, background: isActive ? '#0A1628' : '#475569', color: '#fff', padding: '4px 12px', borderRadius: 999, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.3 }}>⭐ Featured Faculty</span>
      )}
      <div style={{ fontSize: 36, color: isActive ? 'rgba(255,85,0,0.22)' : 'rgba(10,22,40,0.08)', lineHeight: 1, marginBottom: 4, fontFamily: 'Georgia,serif', marginTop: isFaculty ? 10 : 0 }}>"</div>
      {isFaculty ? (
        <p style={{ fontSize: 13, color: isActive ? '#374151' : '#6B7280', lineHeight: 1.8, marginBottom: 16, fontWeight: isActive ? 500 : 400 }}>{item.interest}</p>
      ) : (
        <p style={{ fontSize: 13, color: isActive ? '#374151' : '#6B7280', lineHeight: 1.8, marginBottom: 18, fontWeight: isActive ? 500 : 400 }}>{item.text}</p>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${isActive ? '#FFE4D6' : '#F0F1F4'}` }}>
        {isFaculty ? (
          <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${isActive ? '#FF5500' : '#E9EAEE'}` }} />
        ) : (
          <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, background: isActive ? 'linear-gradient(135deg,#FF5500,#FF8C42)' : '#9CA3AF' }}>{item.initials}</div>
        )}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.role}</div>
        </div>
        {!isFaculty && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 1, flexShrink: 0 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: isActive ? '#FF5500' : '#D1D5DB', fontSize: 11 }}>★</span>)}
          </div>
        )}
      </div>
      {isFaculty ? (
        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 10, lineHeight: 1.6 }}>{item.qualification}</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 9px', borderRadius: 5, background: isActive ? '#FFF0EB' : '#F0F9FF', color: isActive ? '#FF5500' : '#0A1628' }}>{item.tag}</span>
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>{item.date}</span>
        </div>
      )}
    </motion.div>
  )
}

const TestimonialSlider = ({ items, kind }) => {
  const [activeCard, setActiveCard] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 90, damping: 20 })
  const isJumping = useRef(false)

  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 640); setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024) }
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])

  const CARD_W = isMobile ? 280 : isTablet ? 320 : 360, CARD_GAP = 18, STEP = (isMobile ? 280 : isTablet ? 320 : 360) + 18, count = items.length
  const CLONES = Math.min(count, 4)
  const loopItems = [
    ...items.slice(count - CLONES).map((it, i) => ({ ...it, _key: `clone-start-${i}` })),
    ...items.map((it, i) => ({ ...it, _key: `real-${i}` })),
    ...items.slice(0, CLONES).map((it, i) => ({ ...it, _key: `clone-end-${i}` })),
  ]
  const FIRST_REAL = CLONES, LAST_REAL = CLONES + count - 1
  const idxToX = useCallback((idx) => -(idx - FIRST_REAL) * STEP, [FIRST_REAL, STEP])
  const [loopIndex, setLoopIndex] = useState(FIRST_REAL)

  useEffect(() => { x.set(idxToX(FIRST_REAL)); setLoopIndex(FIRST_REAL); setActiveCard(0) }, [count, CARD_W])
  useEffect(() => {
    const unsub = springX.on('change', (val) => {
      const idx = Math.round(FIRST_REAL - val / STEP)
      setLoopIndex(idx)
      setActiveCard(((idx - FIRST_REAL) % count + count) % count)
    })
    return unsub
  }, [springX, STEP, FIRST_REAL, count])

  const settleIfNeeded = useCallback((idx) => {
    if (isJumping.current) return
    if (idx < FIRST_REAL) { isJumping.current = true; const c = idx + count; x.set(idxToX(c)); setLoopIndex(c); requestAnimationFrame(() => { isJumping.current = false }) }
    else if (idx > LAST_REAL) { isJumping.current = true; const c = idx - count; x.set(idxToX(c)); setLoopIndex(c); requestAnimationFrame(() => { isJumping.current = false }) }
  }, [FIRST_REAL, LAST_REAL, count, idxToX, x])

  const goTo = (idx) => { x.set(idxToX(idx)); requestAnimationFrame(() => settleIfNeeded(idx)) }
  const goToLogical = (li) => goTo(FIRST_REAL + li)
  const next = () => goTo(loopIndex + 1)
  const prev = () => goTo(loopIndex - 1)
  const handleDragEnd = (_, info) => {
    setIsDragging(false)
    const target = x.get() + info.velocity.x * 0.15
    goTo(Math.round(FIRST_REAL - target / STEP))
  }

  return (
    <div style={{ position: 'relative' }}>
      {!isMobile && (
        <>
          <motion.button onClick={prev} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} aria-label="Previous testimonial"
            style={{ position: 'absolute', left: -22, top: '40%', zIndex: 5, width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#0A1628', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>←</motion.button>
          <motion.button onClick={next} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} aria-label="Next testimonial"
            style={{ position: 'absolute', right: -22, top: '40%', zIndex: 5, width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E5E7EB', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#0A1628', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>→</motion.button>
        </>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
        <motion.span animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ fontSize: 12, color: '#FF5500', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span>👆</span> Drag or use arrows to explore
        </motion.span>
      </motion.div>
      <div style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y', padding: '4px 0' }}>
        <motion.div drag="x" dragConstraints={{ left: -(loopItems.length - 1) * STEP, right: STEP * CLONES }} dragElastic={0.05}
          onDragStart={() => setIsDragging(true)} onDragEnd={handleDragEnd}
          style={{ x: springX, display: 'flex', gap: CARD_GAP, width: 'max-content' }}>
          {loopItems.map((item, i) => (
            <div key={item._key} onClick={() => !isDragging && goTo(i)} style={{ cursor: 'pointer' }}>
              <TestimonialCard item={item} kind={kind} isActive={i === loopIndex} width={CARD_W} />
            </div>
          ))}
        </motion.div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20, flexWrap: 'wrap' }}>
        {items.map((_, i) => (
          <motion.button key={i} onClick={() => goToLogical(i)}
            animate={{ width: i === activeCard ? 24 : 7, background: i === activeCard ? '#FF5500' : '#D1D5DB' }}
            transition={{ duration: 0.3 }}
            style={{ height: 7, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }} />
        ))}
      </div>
    </div>
  )
}

export default TestimonialSlider