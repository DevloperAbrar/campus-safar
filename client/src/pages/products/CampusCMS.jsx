import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { Link } from 'react-router-dom'

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CampusCMS - Campus Management System",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "CampusCMS by CampusSafar - complete campus management system with attendance tracking, quiz management, marks and annual result management for schools and colleges.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "description": "Free demo available" },
  "provider": { "@type": "Organization", "name": "CampusSafar", "url": "https://campussafar.com" }
}

const faqs = [
  { q: 'What is CampusCMS?', a: 'CampusCMS is CampusSafar\'s campus management system covering attendance, quizzes, marks, and annual result management in one role-based dashboard for admin, faculty, and students.' },
  { q: 'Does CampusCMS handle subject-wise attendance?', a: 'Yes - faculty mark attendance per subject and period, with real-time sync to student and parent dashboards.' },
  { q: 'Can I conduct quizzes and exams through CampusCMS?', a: 'Yes, CampusCMS includes an online quiz module for faculty to create tests and auto-grade objective questions.' },
  { q: 'How are marks and annual results managed?', a: 'CampusCMS lets faculty enter term-wise and annual marks, with automatic result compilation and report card generation.' },
  { q: 'Who can access CampusCMS?', a: 'Superadmin, Exam Controller, HOD, Faculty, Parent and Student - each with role-based access to relevant data only.' },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
}

const features = [
  { title: 'Attendance Management', desc: 'Subject-wise digital attendance with real-time parent dashboards - replaces manual registers completely.' },
  { title: 'Quiz & Online Exams', desc: 'Create quizzes and objective tests with auto-grading, saving faculty hours of manual checking.' },
  { title: 'Marks & Result Management', desc: 'Term-wise and annual marks entry with automatic report card and result compilation.' },
  { title: 'Role-Based Dashboards', desc: 'Superadmin, Exam Controller, HOD, Faculty, Parent and Student each see exactly what they need.' },
]

const CampusCMS = () => (
  <>
    <SEO
      title="Campus Management System - Attendance, Quiz & Marks | CampusCMS"
      description="CampusCMS by CampusSafar: complete campus management system with attendance tracking, online quizzes, and marks/result management for schools and colleges. Free demo."
      canonical="https://campussafar.com/products/campus-management-system"
      schema={[schema, faqSchema]}
    />
    <Navbar />

    <section style={{ background: '#0A1628', padding: '64px 0', color: '#fff' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#94A3B8' }}>Home</Link><span>/</span>
          <Link to="/products/campus-suite" style={{ color: '#94A3B8' }}>Idea2Software</Link><span>/</span>
          <span style={{ color: '#FF5500' }}>CampusCMS</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, marginBottom: 16, maxWidth: 700 }}>
          Campus Management System - Attendance, Quiz & Marks
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 560, lineHeight: 1.7, marginBottom: 28 }}>
          One dashboard for attendance, quizzes, exams, and annual result management - built for schools and colleges.
        </p>
        <Link to="/contact" style={{ display: 'inline-block', padding: '13px 26px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700 }}>
          Book a Free Demo →
        </Link>
      </div>
    </section>

    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>What's Inside CampusCMS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 48 }}>
          {features.map(f => (
            <div key={f.title} style={{ border: '1.5px solid #E5E7EB', borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Frequently Asked Questions</h2>
        {faqs.map(f => (
          <div key={f.q} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{f.q}</h3>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{f.a}</p>
          </div>
        ))}
      </div>
    </section>

    <Footer />
  </>
)

export default CampusCMS