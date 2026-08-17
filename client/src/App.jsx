import { Routes, Route, Navigate } from 'react-router-dom'
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
import CampusCMS from './pages/products/CampusCMS'
import CampusSeating from './pages/products/CampusSeating'
import Campus360 from './pages/products/Campus360'
import CampusERP from './pages/products/CampusERP'
import CampusDocs from './pages/products/CampusDocs'

import CustomDev from './pages/CustomDevelopment'
import Pricing from './pages/Pricing'

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
        <Route path="/products/idea-2-software" element={<Navigate to="/products/campus-suite" replace />} />
        <Route path="/products/campus-suite" element={<CampusSuite />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/products/campus-management-system" element={<CampusCMS />} />
        <Route path="/products/exam-seating-arrangement-software" element={<CampusSeating />} />
        <Route path="/products/student-development-tracking-system" element={<Campus360 />} />
        <Route path="/products/school-fee-admission-management-system" element={<CampusERP />} />
        <Route path="/custom-development" element={<CustomDev />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/products/certificate-document-management-system" element={<CampusDocs />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App