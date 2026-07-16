import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { Link } from 'react-router-dom'

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Campus360 - Student Development Tracking System",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "description": "Campus360 by CampusSafar is a configurable student development tracking platform covering academics, sports, life skills, olympiads, leadership and arts through one universal rubric engine, with parent radar-chart dashboards and growth trends.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR", "description": "Free demo available" },
  "provider": { "@type": "Organization", "name": "CampusSafar", "url": "https://campussafar.com" }
}

const faqs = [
  { q: 'What is Campus360?', a: 'Campus360 is CampusSafar\'s student development tracking system built around a configurable rubric engine. It tracks academics, sports, life skills, leadership, olympiads and arts, all through one flexible structure instead of separate tools.' },
  { q: 'How is Campus360 different from a regular gradebook?', a: 'A gradebook only records marks. Campus360 lets admins define any activity, from Physics to Cricket to Confidence, with its own assessment structure, so schools can track all-round growth, not just academic scores.' },
  { q: 'Can each activity have a different assessment structure?', a: 'Yes. Admins can set up as many assessment instances as needed per activity. Academic subjects can have multiple weighted terms, while a co-curricular activity can use a single simple rating, all within the same engine.' },
  { q: 'Does Campus360 handle subject-wise attendance?', a: 'Yes. Faculty mark attendance per subject and section, and it stays connected to the same class-section-activity assignment used for scoring.' },
  { q: 'What do parents see on the dashboard?', a: 'Parents get a radar chart summarizing their child across every tracked category, along with term-over-term growth trends and a plain-language summary of strengths and areas to improve.' },
  { q: 'Who can access Campus360?', a: 'Super Admin, Principal, Faculty, and Parent each get role-based dashboards. Faculty only see the classes, sections and activities assigned to them.' },
  { q: 'Is Campus360 part of a bigger platform?', a: 'Yes, Campus360 is one of the core modules in CampusSafar\'s Idea2Software suite, alongside CampusCMS, CampusSeating, CampusDocs and CampusERP.' },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
}

const features = [
  { title: 'Universal Rubric Engine', desc: 'Admins define any activity, academic or co-curricular, with as many or as few assessment instances as the activity needs. The same engine handles Physics and Cricket equally well.' },
  { title: 'Configurable Categories', desc: 'Academics, Sports, Life Skills, Olympiad, Leadership and Arts, all tracked in one system instead of scattered spreadsheets.' },
  { title: 'Subject-Wise Attendance', desc: 'Faculty mark attendance per subject and section, tied directly to their class assignments, with no separate tool needed.' },
  { title: 'Radar-Chart Parent Dashboards', desc: 'Parents see a visual snapshot of their child across every category, plus term-over-term growth trends in plain language.' },
  { title: 'Role-Based Assignment', desc: 'Faculty are assigned specific classes, sections and activities, so they only see and enter data relevant to them.' },
  { title: 'School-Level Analytics', desc: 'Admins get category-wise comparisons across classes and sections, topper lists, and faculty entry compliance tracking.' },
]

const Campus360 = () => (
  <>
    <SEO
      title="Student Development Tracking System for Schools | Campus360"
      description="Campus360 by CampusSafar tracks student growth beyond marks, academics, sports, leadership, olympiad and arts in one configurable rubric engine, with parent dashboards. Free demo."
      canonical="https://campussafar.com/products/student-development-tracking-system"
      schema={[schema, faqSchema]}
    />
    <Navbar />

    <section style={{ background: '#0A1628', padding: '64px 0', color: '#fff' }}>
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#94A3B8' }}>Home</Link><span>/</span>
          <Link to="/products/campus-suite" style={{ color: '#94A3B8' }}>Idea2Software</Link><span>/</span>
          <span style={{ color: '#FF5500' }}>Campus360</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, marginBottom: 16, maxWidth: 700 }}>
          Student Development Tracking System, Beyond Just Marks
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 560, lineHeight: 1.7, marginBottom: 28 }}>
          Track academics, sports, life skills, leadership, olympiad and arts through one configurable rubric engine, with radar-chart parent dashboards and growth trends.
        </p>
        <Link to="/contact" style={{ display: 'inline-block', padding: '13px 26px', background: '#FF5500', color: '#fff', borderRadius: 11, fontWeight: 700 }}>
          Book a Free Demo →
        </Link>
      </div>
    </section>

    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>What's Inside Campus360</h2>
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

export default Campus360