import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import useAnalytics from './hooks/useAnalytics'
import Home from './pages/Home'
import ProtectedRoute from './routes/ProtectedRoute'
import { LANDING_PAGES } from './seo/landingPages'

// Route-level code splitting: each page loads only when visited (better speed / Core Web Vitals)
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const StudyBoard = lazy(() => import('./pages/products/StudyBoard'))
const CampusSuite = lazy(() => import('./pages/products/CampusSuite'))
const CampusCMS = lazy(() => import('./pages/products/CampusCMS'))
const CampusSeating = lazy(() => import('./pages/products/CampusSeating'))
const Campus360 = lazy(() => import('./pages/products/Campus360'))
const CampusERP = lazy(() => import('./pages/products/CampusERP'))
const CampusDocs = lazy(() => import('./pages/products/CampusDocs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const Sitemap = lazy(() => import('./pages/Sitemap'))
const CustomDev = lazy(() => import('./pages/CustomDevelopment'))
const Pricing = lazy(() => import('./pages/Pricing'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))

const AnalyticsTracker = () => { useAnalytics(); return null }

function App() {
  return (
    <>
      <AnalyticsTracker />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom-development" element={<CustomDev />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* SEO landing pages (content lives in src/seo/landingPages.js) */}
          {LANDING_PAGES.map((p) => (
            <Route key={p.path} path={p.path} element={<LandingPage path={p.path} />} />
          ))}

          <Route path="/products/studyboard" element={<StudyBoard />} />
          <Route path="/products/campus-suite" element={<CampusSuite />} />
          <Route path="/products/idea-2-software" element={<Navigate to="/products/campus-suite" replace />} />
          <Route path="/products/campus-management-system" element={<CampusCMS />} />
          <Route path="/products/exam-seating-arrangement-software" element={<CampusSeating />} />
          <Route path="/products/student-development-tracking-system" element={<Campus360 />} />
          <Route path="/products/school-fee-admission-management-system" element={<CampusERP />} />
          <Route path="/products/certificate-document-management-system" element={<CampusDocs />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/sitemap" element={<Sitemap />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App