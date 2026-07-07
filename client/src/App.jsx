import { Routes, Route } from 'react-router-dom'
import useAnalytics from './hooks/useAnalytics'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import StudyBoard from './pages/products/StudyBoard'
import CampusSuite from './pages/products/CampusSuite'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Sitemap from './pages/Sitemap'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'

const AnalyticsTracker = () => { useAnalytics(); return null; }

function App() {
  return (
    <>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/studyboard" element={<StudyBoard />} />
        <Route path="/products/idea-2-software" element={<CampusSuite />} />
        <Route path="/products/campus-suite" element={<CampusSuite />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App