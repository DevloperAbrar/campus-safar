import { useState } from 'react'
import api from '../services/api'
import trackEvent from '../utils/trackEvent'

const LeadForm = ({ source = 'contact_form', compact = false }) => {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', type: 'student', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const handleSubmit = async () => {
    if (!form.fullName || !form.email) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      await api.post('/api/contact', { ...form, source })
      trackEvent('form_submit', { source, type: form.type })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Message Sent!</h3>
      <p style={{ color: '#6B7280' }}>We'll get back to you within 24 hours.</p>
    </div>
  )

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB',
    borderRadius: 10, fontSize: 15, color: '#0A1628', background: '#fff',
    outline: 'none', transition: 'border-color 0.2s', fontFamily: 'Inter, sans-serif'
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Full Name</label>
          <input style={inputStyle} placeholder="Rahul Sharma" value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
            onFocus={e => e.target.style.borderColor = '#FF5500'}
            onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email Address</label>
          <input style={inputStyle} type="email" placeholder="rahul@email.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            onFocus={e => e.target.style.borderColor = '#FF5500'}
            onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Phone Number</label>
        <input style={inputStyle} placeholder="+91 XXXXX XXXXX" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          onFocus={e => e.target.style.borderColor = '#FF5500'}
          onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>I am a...</label>
        <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="student">Student / Parent</option>
          <option value="institute">Institute / College</option>
          <option value="other">Other</option>
        </select>
      </div>

      {!compact && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Your Message</label>
          <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
            placeholder="Tell us how we can help..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            onFocus={e => e.target.style.borderColor = '#FF5500'}
            onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
        </div>
      )}

      {status === 'error' && (
        <p style={{ color: '#EF4444', fontSize: 14, marginBottom: 12 }}>
          Please fill in your name and email.
        </p>
      )}

      <button onClick={handleSubmit} disabled={status === 'loading'}
        style={{
          width: '100%', padding: '14px', background: '#FF5500',
          color: '#fff', border: 'none', borderRadius: 10,
          fontWeight: 700, fontSize: 16, cursor: 'pointer',
          opacity: status === 'loading' ? 0.7 : 1
        }}>
        {status === 'loading' ? 'Sending...' : 'Send Message →'}
      </button>
    </div>
  )
}

export default LeadForm