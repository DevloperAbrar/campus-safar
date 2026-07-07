import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import CampusSafarLogo from '../../assets/logo_CampusSafar.png'

// ── Responsive hook ────────────────────────────────────────────────────────
const useIsMobile = (bp = 768) => {
  const [v, setV] = useState(typeof window !== 'undefined' ? window.innerWidth < bp : false)
  useEffect(() => {
    const h = () => setV(window.innerWidth < bp)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [bp])
  return v
}

// ── Animated counter ───────────────────────────────────────────────────────
const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!value || isNaN(value)) return
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setDisplay(Math.floor(p * value))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, duration])
  return <>{display}</>
}

// ── SVG Donut Chart ────────────────────────────────────────────────────────
const DonutChart = ({ segments, size = 140, thickness = 28 }) => {
  const r = (size - thickness) / 2
  const circ = 2 * Math.PI * r
  const cx = size / 2, cy = size / 2
  let offset = 0
  const total = segments.reduce((a, s) => a + s.value, 0)
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {segments.map((seg, i) => {
        const pct = total > 0 ? seg.value / total : 0
        const dash = pct * circ
        const gap = circ - dash
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={seg.color} strokeWidth={thickness}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circ / 1}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.8s ease' }} />
        )
        offset += pct * circ
        return el
      })}
      <circle cx={cx} cy={cy} r={r - thickness / 2} fill="white" />
    </svg>
  )
}

// ── SVG Sparkline ──────────────────────────────────────────────────────────
const Sparkline = ({ data, color = '#FF5500', height = 48, width = 120 }) => {
  if (!data || data.length < 2) return null
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 8) - 4
    return `${x},${y}`
  }).join(' ')
  const fillPts = `0,${height} ${pts} ${width},${height}`
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#sg-${color.replace('#', '')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

// ── SVG Bar Chart ──────────────────────────────────────────────────────────
const BarChart = ({ data, labels, color = '#FF5500', height = 140 }) => {
  const max = Math.max(...data) || 1
  return (
    <svg viewBox={`0 0 ${data.length * 32} ${height + 24}`} width="100%" height={height + 24} style={{ overflow: 'visible' }}>
      {data.map((v, i) => {
        const bh = (v / max) * height
        const x = i * 32 + 4
        const y = height - bh
        const isLast = i === data.length - 1
        return (
          <g key={i}>
            <rect x={x} y={y} width={24} height={bh} fill={isLast ? '#FF5500' : 'url(#barGrad)'} rx={4}
              style={{ transition: 'height 0.6s ease, y 0.6s ease' }} />
            {labels && <text x={x + 12} y={height + 16} textAnchor="middle" fontSize={9} fill="#9CA3AF">{labels[i]}</text>}
          </g>
        )
      })}
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF5500" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF5500" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── SVG Line Chart ─────────────────────────────────────────────────────────
const LineChart = ({ datasets, labels, height = 160 }) => {
  const allVals = datasets.flatMap(d => d.data)
  const max = Math.max(...allVals) || 1
  const W = 360, H = height
  const pts = (data) => data.map((v, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - (v / max) * (H - 16) - 8
    return [x, y]
  })
  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} width="100%" height={H + 24} style={{ overflow: 'visible' }}>
      {[0.25, 0.5, 0.75, 1].map(p => (
        <line key={p} x1={0} y1={H - p * (H - 16) - 8} x2={W} y2={H - p * (H - 16) - 8} stroke="#F3F4F6" strokeWidth={1} />
      ))}
      {datasets.map((ds, di) => {
        const points = pts(ds.data)
        const polyline = points.map(p => p.join(',')).join(' ')
        const fill = `${points[0].join(',')} ${polyline} ${points[points.length - 1][0]},${H}`
        return (
          <g key={di}>
            <defs>
              <linearGradient id={`lg${di}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ds.color} stopOpacity="0.18" />
                <stop offset="100%" stopColor={ds.color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={fill} fill={`url(#lg${di})`} />
            <polyline points={polyline} fill="none" stroke={ds.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {points.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={ds.color} />)}
          </g>
        )
      })}
      {labels && labels.map((l, i) => {
        const x = (i / (labels.length - 1)) * W
        return <text key={i} x={x} y={H + 18} textAnchor="middle" fontSize={9} fill="#9CA3AF">{l}</text>
      })}
    </svg>
  )
}

// ── Horizontal Progress Bar ────────────────────────────────────────────────
const ProgressBar = ({ label, value, max, color, icon }) => {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
          {icon && <span>{icon}</span>}{label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 800, color }}>{value} <span style={{ color: '#9CA3AF', fontWeight: 400, fontSize: 11 }}>/ {max}</span></span>
      </div>
      <div style={{ height: 8, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999, transition: 'width 0.8s ease' }} />
      </div>
    </div>
  )
}

// ── StatCard ───────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, bg, trend, sparkData }) => (
  <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1.5px solid #E5E7EB', position: 'relative', overflow: 'hidden' }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{icon}</div>
      {trend && <span style={{ fontSize: 11, fontWeight: 600, color: trend.startsWith('+') ? '#22C55E' : trend === 'New' ? '#FF5500' : '#6B7280', background: trend.startsWith('+') ? '#F0FDF4' : trend === 'New' ? '#FFF0EB' : '#F3F4F6', padding: '3px 8px', borderRadius: 999 }}>{trend}</span>}
    </div>
    <div style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color, lineHeight: 1, marginBottom: 4 }}>
      <AnimatedNumber value={value} />
    </div>
    <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, marginBottom: sparkData ? 10 : 0 }}>{label}</div>
    {sparkData && <Sparkline data={sparkData} color={color} height={36} width={100} />}
  </div>
)

// ── Dept colour palette (shared with About.jsx) ────────────────────────────
const DEPT_COLORS = {
  Leadership: '#FF5500', Business: '#3B82F6', Operations: '#8B5CF6',
  Research: '#10B981', Content: '#F59E0B', Marketing: '#EF4444', Design: '#EC4899'
}
const DEPT_OPTIONS = ['Leadership', 'Business', 'Operations', 'Research', 'Content', 'Marketing', 'Design', 'Other']

// ── Empty form state ───────────────────────────────────────────────────────
const EMPTY_FORM = { name: '', role: '', dept: 'Leadership', bio: '', linkedin: '', imageUrl: '', order: 0, active: true }

// ── Team Member Form Modal ─────────────────────────────────────────────────
const MemberModal = ({ member, onClose, onSave }) => {
  const [form, setForm] = useState(member ? { ...member } : { ...EMPTY_FORM })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploadingImg, setUploadingImg] = useState(false)

  const handleChange = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.role.trim() || !form.dept.trim()) {
      setError('Name, Role and Department are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      await onSave(form)
      onClose()
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: '1.5px solid #E5E7EB', borderRadius: 8,
    fontSize: 14, color: '#0A1628', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit', background: '#fff', transition: 'border-color 0.2s'
  }
  const labelStyle = { fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5 }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,13,30,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>

        {/* Modal header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 1, borderRadius: '20px 20px 0 0' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0A1628' }}>
              {member ? 'Edit Member' : 'Add Team Member'}
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9CA3AF' }}>
              {member ? `Editing ${member.name}` : 'Fill in the details below'}
            </p>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, border: 'none', background: '#F3F4F6', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#6B7280' }}>✕</button>
        </div>

        {/* Form body */}
        <div style={{ padding: '24px' }}>
          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#DC2626' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Image preview */}
          {form.imageUrl && (
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <img src={form.imageUrl} alt="Preview"
                style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid #E5E7EB', margin: '0 auto' }}
                onError={e => { e.currentTarget.style.display = 'none' }} />
              <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6 }}>Image preview</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Full Name *</label>
              <input style={inputStyle} value={form.name} placeholder="e.g. Harsh Sharma"
                onChange={e => handleChange('name', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#FF5500'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
            </div>

            <div>
              <label style={labelStyle}>Role / Title *</label>
              <input style={inputStyle} value={form.role} placeholder="e.g. Chief Business Dev"
                onChange={e => handleChange('role', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#FF5500'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
            </div>

            <div>
              <label style={labelStyle}>Department *</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.dept}
                onChange={e => handleChange('dept', e.target.value)}>
                {DEPT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Bio / Skills</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }} value={form.bio}
                placeholder="e.g. B.Tech | Android Dev | Sales Management"
                onChange={e => handleChange('bio', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#FF5500'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>LinkedIn URL</label>
              <input style={inputStyle} value={form.linkedin} placeholder="https://linkedin.com/in/username"
                onChange={e => handleChange('linkedin', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#FF5500'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Profile Photo</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <label style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '9px 16px', background: '#F8FAFF', border: '1.5px dashed #CBD5E1',
                  borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#0A1628',
                  fontWeight: 600, transition: 'all 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#FF5500'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#CBD5E1'}>
                  📷 {uploadingImg ? 'Uploading…' : 'Upload Photo'}
                  <input type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }}
                    onChange={async (e) => {
                      const file = e.target.files[0]
                      if (!file) return
                      setUploadingImg(true)
                      try {
                        const fd = new FormData()
                        fd.append('image', file)
                        const res = await api.post('/api/admin/team/upload-image', fd, {
                          headers: { 'Content-Type': 'multipart/form-data' }
                        })
                        handleChange('imageUrl', res.data.imageUrl)
                      } catch {
                        alert('Upload failed. Max 2MB, JPG/PNG/WEBP only.')
                      } finally {
                        setUploadingImg(false)
                      }
                    }} />
                </label>
                <input style={{ ...inputStyle, flex: 1, minWidth: 160 }} value={form.imageUrl}
                  placeholder="or paste URL manually"
                  onChange={e => handleChange('imageUrl', e.target.value)}
                  onFocus={e => e.target.style.borderColor = '#FF5500'}
                  onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
              </div>
              <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6 }}>
                Upload JPG/PNG/WEBP (max 2MB) or paste a URL. Leave blank to show initials.
              </p>
            </div>

            <div>
              <label style={labelStyle}>Display Order</label>
              <input style={inputStyle} type="number" min={0} value={form.order}
                onChange={e => handleChange('order', parseInt(e.target.value) || 0)}
                onFocus={e => e.target.style.borderColor = '#FF5500'}
                onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
              <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Lower = appears first</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
              <div onClick={() => handleChange('active', !form.active)}
                style={{ width: 40, height: 22, borderRadius: 999, background: form.active ? '#22C55E' : '#D1D5DB', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 3, left: form.active ? 20 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: form.active ? '#22C55E' : '#9CA3AF' }}>
                {form.active ? 'Visible on site' : 'Hidden from site'}
              </span>
            </div>
          </div>

          {/* Dept colour preview */}
          <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 10, border: '1.5px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: DEPT_COLORS[form.dept] || '#6B7280', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#6B7280' }}>Card accent colour for <strong style={{ color: '#0A1628' }}>{form.dept}</strong></span>
            <span style={{ marginLeft: 'auto', fontSize: 11, padding: '3px 10px', background: '#FFF0EB', color: '#FF5500', borderRadius: 999, fontWeight: 600 }}>{form.dept}</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', border: '1.5px solid #E5E7EB', borderRadius: 8, background: '#fff', color: '#6B7280', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            style={{ padding: '10px 24px', border: 'none', borderRadius: 8, background: saving ? '#FDA07A' : '#FF5500', color: '#fff', fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.2s' }}>
            {saving ? (
              <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Saving…</>
            ) : (
              member ? '✓ Save Changes' : '+ Add Member'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Delete Confirm Modal ───────────────────────────────────────────────────
const DeleteConfirm = ({ member, onClose, onConfirm }) => {
  const [deleting, setDeleting] = useState(false)
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,13,30,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 16px' }}>🗑</div>
        <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 800, color: '#0A1628' }}>Delete {member.name}?</h3>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>This will permanently remove them from the team section. This cannot be undone.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px 0', border: '1.5px solid #E5E7EB', borderRadius: 8, background: '#fff', color: '#6B7280', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button disabled={deleting} onClick={async () => { setDeleting(true); await onConfirm(); onClose() }}
            style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: 8, background: deleting ? '#FCA5A5' : '#EF4444', color: '#fff', fontWeight: 700, fontSize: 14, cursor: deleting ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
            {deleting ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  // ── Existing state ─────────────────────────────────────────────────────
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({ total: 0, unread: 0, students: 0, institutes: 0 })
  const [analytics, setAnalytics] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')
  const [filterRead, setFilterRead] = useState('all')
  const [timeRange, setTimeRange] = useState('30d')
  const isMobile = useIsMobile(900)

  // ── Team state ─────────────────────────────────────────────────────────
  const [teamMembers, setTeamMembers] = useState([])
  const [teamLoading, setTeamLoading] = useState(false)
  const [teamModal, setTeamModal] = useState(null)   // null | 'add' | member-object (edit)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [teamToast, setTeamToast] = useState('')

  const showToast = (msg) => {
    setTeamToast(msg)
    setTimeout(() => setTeamToast(''), 3000)
  }

  // ── Initial data load ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [leadsRes, statsRes, analyticsRes] = await Promise.all([
          api.get('/api/admin/leads'),
          api.get('/api/admin/leads/stats'),
          api.get('/api/analytics/dashboard')
        ])
        setLeads(leadsRes.data.leads)
        setStats(statsRes.data)
        setAnalytics(analyticsRes.data)
      } catch {
        navigate('/admin/login')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  // Fetch team when Team tab is opened
  useEffect(() => {
    if (activeTab !== 'team') return
    fetchTeam()
  }, [activeTab])

  const fetchTeam = async () => {
    setTeamLoading(true)
    try {
      const res = await api.get('/api/admin/team')
      setTeamMembers(res.data.members || [])
    } catch {
      showToast('Failed to load team.')
    } finally {
      setTeamLoading(false)
    }
  }

  // ── Leads helpers ──────────────────────────────────────────────────────
  const handleLogout = async () => { await logout(); navigate('/admin/login') }
  const markRead = async (id) => {
    await api.patch(`/api/admin/leads/${id}/read`)
    setLeads(leads.map(l => l._id === id ? { ...l, read: true } : l))
    setStats(s => ({ ...s, unread: Math.max(0, s.unread - 1) }))
  }
  const filteredLeads = leads.filter(l => {
    if (filterType !== 'all' && l.type !== filterType) return false
    if (filterRead === 'new' && l.read) return false
    if (filterRead === 'read' && !l.read) return false
    return true
  })

  // ── Team CRUD ──────────────────────────────────────────────────────────
  const handleSaveMember = async (form) => {
    if (teamModal && teamModal._id) {
      // Edit
      const res = await api.put(`/api/admin/team/${teamModal._id}`, form)
      setTeamMembers(prev => prev.map(m => m._id === teamModal._id ? res.data.member : m))
      showToast('✓ Member updated successfully')
    } else {
      // Create
      const res = await api.post('/api/admin/team', form)
      setTeamMembers(prev => [...prev, res.data.member].sort((a, b) => a.order - b.order))
      showToast('✓ Member added successfully')
    }
  }

  const handleDeleteMember = async () => {
    await api.delete(`/api/admin/team/${deleteTarget._id}`)
    setTeamMembers(prev => prev.filter(m => m._id !== deleteTarget._id))
    showToast('Member deleted')
  }

  const toggleActive = async (member) => {
    const res = await api.put(`/api/admin/team/${member._id}`, { ...member, active: !member.active })
    setTeamMembers(prev => prev.map(m => m._id === member._id ? res.data.member : m))
  }

  // ── Mock trend data ────────────────────────────────────────────────────
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const viewsTrend = [30, 55, 40, 80, 60, 95, 70, 85, 50, 75, 90, analytics?.totalViews ? Math.round(analytics.totalViews / 30) : 65]
  const leadsTrend = [2, 5, 3, 8, 6, 10, 7, 9, 4, 8, 11, stats.total || 7]
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weekData = [12, 19, 14, 28, 22, 18, analytics?.weekViews ? Math.round(analytics.weekViews / 7) : 20]

  const navItems = [
    { id: 'overview', icon: '▦', label: 'Overview' },
    { id: 'leads', icon: '📋', label: 'Leads' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'team', icon: '👥', label: 'Team' },
  ]

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F0F2F8' }}>
      <div style={{ textAlign: 'center' }}>
        <img src={CampusSafarLogo} alt="CampusSafar" style={{ height: 48, width: 'auto', objectFit: 'contain', margin: '0 auto 16px', display: 'block' }} />
        <p style={{ color: '#6B7280', fontWeight: 500 }}>Loading dashboard...</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5500', opacity: 0.3, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}`}</style>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F2F8', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* ── SIDEBAR ── */}
      <>
        {sidebarOpen && isMobile && (
          <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} />
        )}
        <aside style={{
          width: 240, background: 'linear-gradient(180deg, #0A1628 0%, #040D1E 100%)',
          display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0,
          height: '100vh', zIndex: 50, transition: 'transform 0.3s ease',
          transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.2)'
        }}>
          <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={CampusSafarLogo} alt="CampusSafar" style={{ height: 32, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              <div style={{ width: '1px', height: 28, background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>Admin</div>
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>

          <nav style={{ flex: 1, padding: '16px 12px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#334155', letterSpacing: 1.5, textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>Menu</div>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                marginBottom: 4, textAlign: 'left', fontWeight: 600, fontSize: 14,
                transition: 'all 0.2s',
                background: activeTab === item.id ? 'rgba(255,85,0,0.15)' : 'transparent',
                color: activeTab === item.id ? '#FF5500' : '#94A3B8',
                borderLeft: activeTab === item.id ? '3px solid #FF5500' : '3px solid transparent',
              }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
                {item.id === 'leads' && stats.unread > 0 && (
                  <span style={{ marginLeft: 'auto', background: '#FF5500', color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '2px 7px' }}>{stats.unread}</span>
                )}
                {item.id === 'team' && teamMembers.length > 0 && (
                  <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', color: '#94A3B8', borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '2px 7px' }}>{teamMembers.length}</span>
                )}
              </button>
            ))}
          </nav>

          <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#94A3B8', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>⬡ Logout</button>
          </div>
        </aside>
      </>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, marginLeft: isMobile ? 0 : 240, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Topbar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {isMobile && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
              </button>
            )}
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', margin: 0 }}>
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'leads' && 'Contact Leads'}
                {activeTab === 'analytics' && 'Analytics'}
                {activeTab === 'team' && 'Team Members'}
              </h1>
              <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {stats.unread > 0 && (
              <div style={{ position: 'relative' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }} onClick={() => setActiveTab('leads')}>🔔</div>
                <span style={{ position: 'absolute', top: -4, right: -4, background: '#FF5500', color: '#fff', borderRadius: 999, fontSize: 9, fontWeight: 700, padding: '1px 5px' }}>{stats.unread}</span>
              </div>
            )}
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #FF5500, #FF8A00)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13 }}>A</div>
          </div>
        </header>

        {/* Body */}
        <main style={{ flex: 1, padding: 'clamp(16px, 3vw, 28px)', overflowX: 'hidden' }}>

          {/* ══ OVERVIEW ══ */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
                <StatCard label="Total Leads" value={stats.total} icon="📋" color="#3B82F6" bg="#EFF6FF" trend="+12%" sparkData={leadsTrend} />
                <StatCard label="Unread" value={stats.unread} icon="🔔" color="#FF5500" bg="#FFF0EB" trend="New" sparkData={[3, 1, 4, 2, 5, 3, stats.unread || 4]} />
                <StatCard label="Students" value={stats.students} icon="🎓" color="#22C55E" bg="#F0FDF4" trend="+8%" sparkData={[1, 3, 2, 5, 4, 6, stats.students || 5]} />
                <StatCard label="Institutes" value={stats.institutes} icon="🏛" color="#8B5CF6" bg="#F5F3FF" trend="+5%" sparkData={[1, 2, 1, 3, 2, 4, stats.institutes || 3]} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)', borderRadius: 16, padding: 24, color: '#fff' }}>
                    <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Page Views · 30 days</div>
                    <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 16 }}><AnimatedNumber value={analytics?.totalViews ?? 0} /></div>
                    <BarChart data={viewsTrend} labels={monthLabels} height={80} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ background: '#fff', borderRadius: 14, padding: 18, border: '1.5px solid #E5E7EB' }}>
                      <div style={{ fontSize: 20, marginBottom: 6 }}>📈</div>
                      <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: '#0A1628' }}><AnimatedNumber value={analytics?.weekViews ?? 0} /></div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>This week</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 14, padding: 18, border: '1.5px solid #E5E7EB' }}>
                      <div style={{ fontSize: 20, marginBottom: 6 }}>⚡</div>
                      <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: '#0A1628' }}><AnimatedNumber value={analytics?.totalEvents ?? 0} /></div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Total events</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E7EB', overflow: 'hidden' }}>
                  <div style={{ padding: '18px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#0A1628' }}>Recent Leads</span>
                    <button onClick={() => setActiveTab('leads')} style={{ fontSize: 12, color: '#FF5500', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
                  </div>
                  {leads.slice(0, 5).map((lead, i) => (
                    <div key={lead._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < 4 ? '1px solid #F9FAFB' : 'none', background: lead.read ? '#fff' : '#FFFBF7' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: lead.type === 'institute' ? '#EFF6FF' : '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                        {lead.type === 'institute' ? '🏛' : '🎓'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: lead.read ? 500 : 700, color: '#0A1628', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.fullName}</div>
                        <div style={{ fontSize: 11, color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.email}</div>
                      </div>
                      {!lead.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5500', flexShrink: 0 }} />}
                      <span style={{ fontSize: 11, color: '#9CA3AF', flexShrink: 0 }}>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  ))}
                  {leads.length === 0 && <div style={{ padding: 32, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>No leads yet</div>}
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E7EB', padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0A1628', marginBottom: 20 }}>Lead Breakdown</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
                  {[
                    { label: 'Students', value: stats.students, total: stats.total, color: '#FF5500', bg: '#FFF0EB' },
                    { label: 'Institutes', value: stats.institutes, total: stats.total, color: '#3B82F6', bg: '#EFF6FF' },
                    { label: 'Unread Rate', value: stats.unread, total: stats.total, color: '#8B5CF6', bg: '#F5F3FF' },
                  ].map(item => {
                    const pct = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0
                    return (
                      <div key={item.label} style={{ padding: 16, background: item.bg, borderRadius: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>{item.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: item.color }}>{pct}%</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.6)', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: item.color, borderRadius: 999, transition: 'width 0.8s ease' }} />
                        </div>
                        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 8 }}>{item.value} of {item.total}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ══ LEADS TAB ══ */}
          {activeTab === 'leads' && (
            <div>
              <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E7EB', padding: '16px 20px', marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>Filter:</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['all', 'student', 'institute'].map(t => (
                    <button key={t} onClick={() => setFilterType(t)} style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', borderColor: filterType === t ? '#FF5500' : '#E5E7EB', background: filterType === t ? '#FF5500' : '#fff', color: filterType === t ? '#fff' : '#6B7280' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[['all', 'All'], ['new', '🔴 New'], ['read', '✓ Read']].map(([v, l]) => (
                    <button key={v} onClick={() => setFilterRead(v)} style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', borderColor: filterRead === v ? '#0A1628' : '#E5E7EB', background: filterRead === v ? '#0A1628' : '#fff', color: filterRead === v ? '#fff' : '#6B7280' }}>{l}</button>
                  ))}
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 13, color: '#9CA3AF' }}>{filteredLeads.length} results</span>
              </div>
              <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E7EB', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 700 }}>
                    <thead>
                      <tr style={{ background: '#F8FAFF' }}>
                        {['Name', 'Email', 'Phone', 'Type', 'Source', 'Date', 'Status', ''].map(h => (
                          <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontWeight: 700, color: '#6B7280', fontSize: 11, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead, i) => (
                        <tr key={lead._id} style={{ borderTop: '1px solid #F3F4F6', background: lead.read ? '#fff' : '#FFFBF7', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = lead.read ? '#F8FAFF' : '#FFF5EE'}
                          onMouseLeave={e => e.currentTarget.style.background = lead.read ? '#fff' : '#FFFBF7'}>
                          <td style={{ padding: '14px 16px', fontWeight: lead.read ? 500 : 700, color: '#0A1628', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 32, height: 32, borderRadius: '50%', background: lead.type === 'institute' ? '#EFF6FF' : '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{lead.fullName?.[0]?.toUpperCase() || '?'}</div>
                              {lead.fullName}
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px', color: '#6B7280' }}>{lead.email}</td>
                          <td style={{ padding: '14px 16px', color: '#6B7280' }}>{lead.phone || '—'}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ fontSize: 11, padding: '4px 10px', background: lead.type === 'institute' ? '#EFF6FF' : '#FFF0EB', color: lead.type === 'institute' ? '#3B82F6' : '#FF5500', borderRadius: 999, fontWeight: 700, textTransform: 'capitalize' }}>{lead.type}</span>
                          </td>
                          <td style={{ padding: '14px 16px', color: '#9CA3AF', fontSize: 12 }}>{lead.source || '—'}</td>
                          <td style={{ padding: '14px 16px', color: '#9CA3AF', fontSize: 12, whiteSpace: 'nowrap' }}>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ fontSize: 11, padding: '4px 10px', background: lead.read ? '#F3F4F6' : '#FFF0EB', color: lead.read ? '#9CA3AF' : '#FF5500', borderRadius: 999, fontWeight: 600 }}>{lead.read ? '✓ Read' : '● New'}</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            {!lead.read && (
                              <button onClick={() => markRead(lead._id)} style={{ fontSize: 12, color: '#FF5500', background: '#FFF0EB', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '6px 12px', borderRadius: 8, whiteSpace: 'nowrap', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#FF5500'; e.currentTarget.style.color = '#fff' }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#FFF0EB'; e.currentTarget.style.color = '#FF5500' }}>
                                Mark read
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr><td colSpan={8} style={{ padding: 48, textAlign: 'center', color: '#9CA3AF', fontSize: 15 }}>
                          <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>No leads match your filters
                        </td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ ANALYTICS TAB ══ */}
          {activeTab === 'analytics' && (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {[['7d', '7 Days'], ['30d', '30 Days'], ['90d', '3 Months'], ['1y', '1 Year']].map(([v, l]) => (
                  <button key={v} onClick={() => setTimeRange(v)} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', border: '1.5px solid', borderColor: timeRange === v ? '#FF5500' : '#E5E7EB', background: timeRange === v ? '#FF5500' : '#fff', color: timeRange === v ? '#fff' : '#6B7280' }}>{l}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
                {[
                  { label: 'Total Views', value: analytics?.totalViews ?? 0, icon: '👁', color: '#3B82F6', bg: '#EFF6FF', trend: '+18%', spark: viewsTrend },
                  { label: 'This Week', value: analytics?.weekViews ?? 0, icon: '📅', color: '#22C55E', bg: '#F0FDF4', trend: '+12%', spark: weekData },
                  { label: 'Total Events', value: analytics?.totalEvents ?? 0, icon: '⚡', color: '#FF5500', bg: '#FFF0EB', trend: '+9%', spark: [20, 35, 28, 42, 38, 50, analytics?.totalEvents ?? 40] },
                  { label: 'Conversion', value: analytics?.totalViews ? parseFloat(((stats.total / analytics.totalViews) * 100).toFixed(1)) : 0, icon: '🎯', color: '#8B5CF6', bg: '#F5F3FF', trend: '+3%', spark: [1, 1.5, 1.2, 2, 1.8, 2.4, 2.1] },
                ].map(card => <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} color={card.color} bg={card.bg} trend={card.trend} sparkData={card.spark} />)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E7EB', padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0A1628', margin: 0 }}>Growth Trends</h3>
                      <p style={{ fontSize: 12, color: '#9CA3AF', margin: '4px 0 0' }}>Views vs Leads over time</p>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6B7280', fontWeight: 500 }}><span style={{ width: 12, height: 3, background: '#3B82F6', borderRadius: 2, display: 'inline-block' }} /> Views</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6B7280', fontWeight: 500 }}><span style={{ width: 12, height: 3, background: '#FF5500', borderRadius: 2, display: 'inline-block' }} /> Leads</span>
                    </div>
                  </div>
                  <LineChart datasets={[{ data: viewsTrend, color: '#3B82F6' }, { data: leadsTrend.map(v => v * 8), color: '#FF5500' }]} labels={monthLabels} height={160} />
                </div>
                <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E7EB', padding: 24, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0A1628', margin: '0 0 4px' }}>Lead Composition</h3>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 20px' }}>By type · all time</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                      <DonutChart size={140} thickness={26} segments={[{ value: stats.students, color: '#FF5500' }, { value: stats.institutes, color: '#3B82F6' }, { value: Math.max(0, stats.unread), color: '#8B5CF6' }]} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628' }}>{stats.total}</div>
                        <div style={{ fontSize: 10, color: '#9CA3AF' }}>total</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {[{ label: 'Students', value: stats.students, color: '#FF5500' }, { label: 'Institutes', value: stats.institutes, color: '#3B82F6' }, { label: 'Unread', value: stats.unread, color: '#8B5CF6' }].map(seg => (
                        <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: '#6B7280', minWidth: 64 }}>{seg.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>{seg.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E7EB', padding: 24 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0A1628', margin: 0 }}>Daily Traffic</h3>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '4px 0 20px' }}>Views per day this week</p>
                  <BarChart data={weekData} labels={weekDays} color="#FF5500" height={120} />
                </div>
                <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E5E7EB', padding: 24 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: '#0A1628', margin: 0 }}>Traffic Sources</h3>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: '4px 0 20px' }}>Where your visitors come from</p>
                  {[
                    { label: 'Direct', value: 42, max: 100, color: '#FF5500', icon: '🔗' },
                    { label: 'Google Search', value: 28, max: 100, color: '#3B82F6', icon: '🔍' },
                    { label: 'WhatsApp', value: 16, max: 100, color: '#22C55E', icon: '💬' },
                    { label: 'Social Media', value: 10, max: 100, color: '#8B5CF6', icon: '📱' },
                    { label: 'Referral', value: 4, max: 100, color: '#F59E0B', icon: '🤝' },
                  ].map(s => <ProgressBar key={s.label} {...s} />)}
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #0A1628, #1E3A5F)', borderRadius: 16, padding: 24, color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>Performance Summary</h3>
                  <span style={{ fontSize: 11, color: '#64748B', background: 'rgba(255,255,255,0.06)', padding: '4px 12px', borderRadius: 999 }}>Last 30 days</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                  {[
                    { label: 'Avg. daily views', value: analytics ? Math.round(analytics.totalViews / 30) : '—', icon: '📊' },
                    { label: 'Conversion rate', value: analytics?.totalViews ? `${((stats.total / analytics.totalViews) * 100).toFixed(1)}%` : '—', icon: '🎯' },
                    { label: 'Most active day', value: 'Tuesday', icon: '📅' },
                    { label: 'Top source', value: 'Direct', icon: '🔗' },
                    { label: 'New leads / week', value: Math.round(stats.total / 4) || '—', icon: '📥' },
                    { label: 'Read rate', value: stats.total > 0 ? `${Math.round(((stats.total - stats.unread) / stats.total) * 100)}%` : '—', icon: '✅' },
                  ].map(item => (
                    <div key={item.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px' }}>
                      <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ TEAM TAB ══ */}
          {activeTab === 'team' && (
            <div>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>
                    {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''} · {teamMembers.filter(m => m.active).length} visible on site
                  </p>
                </div>
                <button onClick={() => setTeamModal('add')} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                  background: '#FF5500', color: '#fff', border: 'none', borderRadius: 10,
                  fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 14px rgba(255,85,0,0.3)', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  + Add Member
                </button>
              </div>

              {/* Info banner */}
              <div style={{ background: '#F0F4FF', border: '1px solid #DBEAFE', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#3B82F6' }}>
                <span style={{ flexShrink: 0, marginTop: 1 }}>ℹ️</span>
                <div>
                  The founder (Mo Abrar Qureshi) is shown separately at the top of the About page and is managed in code.
                  Members added here appear in the Team grid below the founder.
                  Use the <strong>Order</strong> field to control card position (lower = first).
                </div>
              </div>

              {teamLoading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1.5px solid #E5E7EB', display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#F3F4F6', flexShrink: 0, animation: 'shimmer 1.4s ease infinite' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 12, background: '#F3F4F6', borderRadius: 6, marginBottom: 8, width: '60%', animation: 'shimmer 1.4s ease infinite' }} />
                        <div style={{ height: 10, background: '#F3F4F6', borderRadius: 6, width: '40%', animation: 'shimmer 1.4s ease infinite' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : teamMembers.length === 0 ? (
                <div style={{ background: '#fff', borderRadius: 16, border: '1.5px dashed #E5E7EB', padding: '64px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: '#0A1628' }}>No team members yet</h3>
                  <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 24 }}>Add your first team member and they'll appear on the About page.</p>
                  <button onClick={() => setTeamModal('add')} style={{ padding: '10px 24px', background: '#FF5500', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add First Member</button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
                  {teamMembers.map((member, i) => {
                    const initials = member.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
                    const deptColor = DEPT_COLORS[member.dept] || '#6B7280'
                    return (
                      <div key={member._id} style={{ background: '#fff', borderRadius: 14, border: `1.5px solid ${member.active ? '#E5E7EB' : '#F3F4F6'}`, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', opacity: member.active ? 1 : 0.6, transition: 'all 0.2s', position: 'relative' }}>

                        {/* Dept accent bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: deptColor, borderRadius: '14px 14px 0 0', opacity: 0.7 }} />

                        {/* Avatar */}
                        {member.imageUrl ? (
                          <img src={member.imageUrl} alt={member.name}
                            style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #E5E7EB', flexShrink: 0, marginTop: 6 }}
                            onError={e => { e.currentTarget.style.display = 'none' }} />
                        ) : (
                          <div style={{ width: 48, height: 48, borderRadius: '50%', background: i % 2 === 0 ? '#0A1628' : '#FF5500', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, flexShrink: 0, marginTop: 6 }}>{initials}</div>
                        )}

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginTop: 4 }}>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</div>
                              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.role}</div>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', background: '#FFF0EB', color: deptColor, borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0 }}>{member.dept}</span>
                          </div>

                          {member.bio && (
                            <p style={{ fontSize: 11, color: '#9CA3AF', margin: '8px 0 0', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{member.bio}</p>
                          )}

                          {/* Action row */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                            {/* Visibility toggle */}
                            <button onClick={() => toggleActive(member)}
                              title={member.active ? 'Hide from site' : 'Show on site'}
                              style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s', borderColor: member.active ? '#D1FAE5' : '#E5E7EB', background: member.active ? '#F0FDF4' : '#F9FAFB', color: member.active ? '#22C55E' : '#9CA3AF' }}>
                              {member.active ? '● Live' : '○ Hidden'}
                            </button>

                            <span style={{ fontSize: 11, color: '#D1D5DB' }}>·</span>
                            <span style={{ fontSize: 11, color: '#9CA3AF' }}>Order: {member.order}</span>

                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                              <button onClick={() => setTeamModal(member)}
                                style={{ padding: '5px 12px', border: '1px solid #E5E7EB', borderRadius: 6, background: '#fff', color: '#0A1628', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF5500'; e.currentTarget.style.color = '#FF5500' }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#0A1628' }}>
                                Edit
                              </button>
                              <button onClick={() => setDeleteTarget(member)}
                                style={{ padding: '5px 12px', border: '1px solid #FECACA', borderRadius: 6, background: '#FEF2F2', color: '#EF4444', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.color = '#fff' }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#EF4444' }}>
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Dept legend */}
              {teamMembers.length > 0 && (
                <div style={{ marginTop: 24, background: '#fff', borderRadius: 14, border: '1.5px solid #E5E7EB', padding: 18 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Department Colours</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {DEPT_OPTIONS.filter(d => d !== 'Other').map(dept => (
                      <div key={dept} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, border: '1px solid #E5E7EB', fontSize: 12, color: '#374151' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: DEPT_COLORS[dept] || '#6B7280', flexShrink: 0 }} />
                        {dept}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ── Modals ── */}
      {teamModal && (
        <MemberModal
          member={teamModal === 'add' ? null : teamModal}
          onClose={() => setTeamModal(null)}
          onSave={handleSaveMember}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          member={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteMember}
        />
      )}

      {/* ── Toast ── */}
      {teamToast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0A1628', color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, zIndex: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 8, animation: 'slideUp 0.3s ease' }}>
          {teamToast}
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        @keyframes pulse    { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes shimmer  { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  )
}

export default Dashboard