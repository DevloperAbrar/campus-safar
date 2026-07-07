import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill all fields'); return }
    setLoading(true); setError('')
    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFF' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 20, border: '1.5px solid #E5E7EB', padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, background: '#FF5500', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18, margin: '0 auto 16px' }}>SF</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628' }}>Admin Login</h1>
          <p style={{ color: '#6B7280', fontSize: 14, marginTop: 6 }}>CampusSafar Dashboard</p>
        </div>

        {['Email', 'Password'].map((label, i) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
            <input
              type={i === 1 ? 'password' : 'email'}
              value={i === 0 ? email : password}
              onChange={e => i === 0 ? setEmail(e.target.value) : setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB',
                borderRadius: 10, fontSize: 15, outline: 'none', fontFamily: 'Inter, sans-serif'
              }}
              placeholder={i === 0 ? 'admin@campussafar.com' : '••••••••'}
            />
          </div>
        ))}

        {error && <p style={{ color: '#EF4444', fontSize: 14, marginBottom: 12 }}>{error}</p>}

        <button onClick={handleLogin} disabled={loading} style={{
          width: '100%', padding: '14px', background: '#FF5500', color: '#fff',
          border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16,
          cursor: 'pointer', opacity: loading ? 0.7 : 1
        }}>
          {loading ? 'Logging in...' : 'Login →'}
        </button>
      </div>
    </div>
  )
}

export default AdminLogin