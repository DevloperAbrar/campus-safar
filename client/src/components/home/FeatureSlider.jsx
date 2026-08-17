import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { EASE_OUT_EXPO } from './utils'

const FeatureSlider = ({ features, accentColor = '#FF5500' }) => {
  const [activeCard, setActiveCard] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 80, damping: 18 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])

  const CARD_W = isMobile ? 260 : 300, CARD_GAP = 16, STEP = (isMobile ? 260 : 300) + 16

  const clampX = useCallback((val) => {
    const min = -(features.length - 1) * STEP
    return Math.max(min, Math.min(0, val))
  }, [features.length, STEP])

  useEffect(() => {
    const unsub = springX.on('change', (val) => {
      const idx = Math.round(-val / STEP)
      setActiveCard(Math.max(0, Math.min(features.length - 1, idx)))
    })
    return unsub
  }, [springX, STEP, features.length])

  const goTo = (idx) => x.set(clampX(-idx * STEP))
  const handleDragEnd = (_, info) => {
    setIsDragging(false)
    const current = x.get(), velocity = info.velocity.x
    const idx = Math.round(-(current + velocity * 0.15) / STEP)
    goTo(Math.max(0, Math.min(features.length - 1, idx)))
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {features.map((f, i) => (
          <motion.button key={i} onClick={() => goTo(i)}
            animate={{ width: i === activeCard ? 22 : 7, background: i === activeCard ? (features[activeCard].accent || accentColor) : '#D1D5DB' }}
            transition={{ duration: 0.3 }}
            style={{ height: 7, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }} />
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <motion.span animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ fontSize: 11, color: accentColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>👆</span> Drag to explore
        </motion.span>
      </motion.div>
      <div ref={trackRef} style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}>
        <motion.div drag="x" dragConstraints={{ left: -(features.length - 1) * STEP, right: 0 }} dragElastic={0.08}
          onDragStart={() => setIsDragging(true)} onDragEnd={handleDragEnd}
          style={{ x: springX, display: 'flex', gap: CARD_GAP, paddingBottom: 8, width: 'max-content', userSelect: 'none' }}>
          {features.map((card, i) => {
            const isActive = i === activeCard
            return (
              <motion.div key={card.id} onClick={() => !isDragging && goTo(i)}
                animate={{ scale: isActive ? 1 : 0.93, opacity: isActive ? 1 : 0.6 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                style={{ width: CARD_W, flexShrink: 0, background: card.bg, borderRadius: 18, border: `1.5px solid ${isActive ? card.accent : card.border}`, padding: isMobile ? 16 : 20, boxShadow: isActive ? `0 16px 48px ${card.accent}22` : '0 4px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${card.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{card.icon}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: card.dark ? '#94A3B8' : card.accent, background: card.dark ? 'rgba(255,255,255,0.06)' : `${card.accent}12`, padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>{card.tag}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: isMobile ? 15 : 17, color: card.dark ? '#fff' : '#0A1628', marginBottom: 3 }}>{card.title}</div>
                <div style={{ fontSize: 11, color: card.dark ? '#64748B' : '#9CA3AF', marginBottom: 10, fontWeight: 500 }}>{card.subtitle}</div>
                <p style={{ fontSize: isMobile ? 12 : 13, color: card.dark ? '#94A3B8' : '#4B5563', lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
                {isActive && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ marginTop: 14, height: 2, borderRadius: 999, background: card.accent }} />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default FeatureSlider