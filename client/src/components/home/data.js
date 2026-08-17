import DhananjayBisen from '../../assets/testinomail/dhananjay-bisen.png'
import AtulKumaChauhan from '../../assets/testinomail/atulchauhan.png'
import PKSinghhal from '../../assets/testinomail/pksinghal.png'
import PraveenBansal from '../../assets/testinomail/praveenbansal.png'
import AjayRaghuwanshi from '../../assets/testinomail/ajayraguwanshi.JPG'
import Logo from '../../assets/campussafar_logo.png'

export const homeSchema = {
  "logo": Logo,
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CampusSafar Technologies Private Limited",
  "alternateName": "CampusSafar",
  "url": "https://campussafar.com",
  "description": "India's smartest campus platform offering SF StudyBoard for students and Idea2Software for institutes and businesses.",
  "founder": {
    "@type": "Person",
    "name": "Mo Abrar Qureshi",
    "jobTitle": "Founder & CEO",
    "sameAs": ["https://www.linkedin.com/in/moabrarqureshi/"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/sfsmartlabs/",
    "https://www.google.com/maps/place/..."
  ],
  "address": { "@type": "PostalAddress", "addressLocality": "Khargone", "addressRegion": "Madhya Pradesh", "addressCountry": "IN" },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@campussafar.com",
    "telephone": "+91-77709-72867",
    "contactType": "customer support"
  },
  "subOrganization": [
    { "@type": "Organization", "name": "Idea2Software", "url": "https://i2s.campussafar.com" },
    { "@type": "Organization", "name": "SF StudyBoard", "url": "https://sfstudyboard.campussafar.com" },
    { "@type": "Organization", "name": "CampusCMS", "url": "https://cms.campussafar.com" },
    { "@type": "Organization", "name": "CampusSeating", "url": "https://seating.campussafar.com" },
    { "@type": "Organization", "name": "CampusDocs", "url": "https://campusdocs.campussafar.com" },
    { "@type": "Organization", "name": "Campus360", "url": "https://campus360.campussafar.com" },
    { "@type": "Organization", "name": "CampusERP", "url": "https://erp.campussafar.com" }
  ]
}

export const tickerRow1 = [
  { icon: '⭐', text: '50,000+ Practice Questions', tag: 'StudyBoard' },
  { icon: '🧪', text: '300+ Virtual Labs', tag: 'StudyBoard' },
  { icon: '🤖', text: 'AI Doubt Solver', tag: 'StudyBoard' },
  { icon: '📄', text: 'Previous Year Papers with Solutions', tag: 'StudyBoard' },
  { icon: '📐', text: 'Formula Book · Class 6–12 NCERT', tag: 'StudyBoard' },
  { icon: '📝', text: 'Automatic Paper Generator', tag: 'StudyBoard' },
  { icon: '🏆', text: 'All India Test Series', tag: 'StudyBoard' },
]

export const tickerRow2 = [
  { icon: '🎯', text: 'Campus360 Student Development', tag: 'Idea2Software' },
  { icon: '🪑', text: 'CampusSeating Exam Management', tag: 'Idea2Software' },
  { icon: '🗂️', text: 'CampusERP for Institutes', tag: 'Idea2Software' },
  { icon: '📁', text: 'CampusDocs Document Automation', tag: 'Idea2Software' },
  { icon: '🎓', text: 'Result & Certificate Generation with QR', tag: 'Idea2Software' },
  { icon: '💻', text: 'Custom Web & Application Development', tag: 'Custom Dev' },
  { icon: '🏛', text: 'Built for Institutes, Hospitals & Businesses', tag: 'Custom Dev' },
]

export const tickerRow1Loop = [...tickerRow1, ...tickerRow1]
export const tickerRow2Loop = [...tickerRow2, ...tickerRow2]

export const studyboardFeatures = [
  { id: 'pyq', icon: '📄', title: '50,000+', subtitle: 'Previous Year Questions', desc: 'Solve 50,000+ questions from JEE, NEET, Board and different exams. Fully categorised by chapter, difficulty, and year.', accent: '#FF5500', bg: 'linear-gradient(135deg,#FFF5F0,#FFF0E8)', border: 'rgba(255,85,0,0.25)', tag: 'JEE · NEET · Boards' },
  { id: 'labs', icon: '🧪', title: '300+ Virtual Labs', subtitle: 'Interactive Simulations', desc: 'Hands-on experiments for Physics, Chemistry & Mathematics - no real lab required. Perfect for Class 6–12.', accent: '#7C3AED', bg: 'linear-gradient(135deg,#F5F3FF,#EDE9FE)', border: 'rgba(124,58,237,0.25)', tag: 'Science Practicals' },
  { id: 'Books', icon: '📄', title: '10+ Ebooks', subtitle: 'For Practice & E-learning', desc: 'Curated digital ebooks covering science practicals and key concepts, designed for self-paced learning and exam preparation.', accent: '#7C3AED', bg: 'linear-gradient(135deg,#F5F3FF,#EDE9FE)', border: 'rgba(124,58,237,0.25)', tag: 'Science Practicals' },
  { id: 'ai', icon: '🤖', title: 'AI Doubt Solver', subtitle: 'Instant Answers', desc: 'Upload any question - get step-by-step solutions, concept breakdowns, and related PYQs in seconds.', accent: '#059669', bg: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)', border: 'rgba(5,150,105,0.25)', tag: 'Always Available' },
  { id: 'exam', icon: '📝', title: 'Custom Exam Builder', subtitle: 'Create & Attempt Tests', desc: 'Students create custom papers from PYQs. Faculty build class tests. Institutes run All India Test Series.', accent: '#D97706', bg: 'linear-gradient(135deg,#FFFBEB,#FEF3C7)', border: 'rgba(217,119,6,0.25)', tag: 'For Everyone' },
  { id: 'progress', icon: '📊', title: 'Progress Tracking', subtitle: 'Student · Parent · Faculty', desc: 'Students see their growth, parents monitor their child, and faculty track the full class - all in real time.', accent: '#0EA5E9', bg: 'linear-gradient(135deg,#F0F9FF,#E0F2FE)', border: 'rgba(14,165,233,0.25)', tag: 'Live Dashboard' },
  { id: 'books', icon: '📚', title: 'Books & Formula Sheets', subtitle: 'Reference Material', desc: 'Curated books, formula sheets, and PYQs embedded directly in chapters so you never leave the platform.', accent: '#EC4899', bg: 'linear-gradient(135deg,#FDF2F8,#FCE7F3)', border: 'rgba(236,72,153,0.25)', tag: 'All Subjects' },
  { id: 'testSeries', icon: '🏆', title: 'All India Test Series', subtitle: 'Compete Nationwide', desc: 'Join All India Mock Tests, see your national rank, and benchmark yourself against thousands of students.', accent: '#FF5500', bg: 'linear-gradient(135deg,#FFF5F0,#FFF0E8)', border: 'rgba(255,85,0,0.25)', tag: 'National Rankings' },
]

export const saasFeatures = [
  { id: 'campus360', icon: '🎯', title: 'Campus360', subtitle: '360° Student Development', desc: 'Track Academics, Sports, Leadership, Olympiad & Arts through one configurable rubric engine. Radar-chart parent dashboards, term-over-term growth trends.', accent: '#4F46E5', bg: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', border: 'rgba(79,70,229,0.25)', tag: 'Beyond Just Marks' },
  { id: 'campuscms', icon: '📝', title: 'CampusCMS', subtitle: 'Content & Records Management', desc: 'Centralized content, notices and student records system. One backend, role-based access for admin, faculty and students.', accent: '#0891B2', bg: 'linear-gradient(135deg,#ECFEFF,#CFFAFE)', border: 'rgba(8,145,178,0.25)', tag: 'One Source of Truth' },
  { id: 'campusseating', icon: '🪑', title: 'CampusSeating', subtitle: 'Exam Seating Arrangement', desc: 'Auto-generate exam seating plans by room, roll number and section -no more manual charts or last-minute clashes.', accent: '#EA580C', bg: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', border: 'rgba(234,88,12,0.25)', tag: 'Zero Manual Charts' },
  { id: 'campusdocs', icon: '📁', title: 'CampusDocs', subtitle: 'Document Automation', desc: 'Auto-generate and manage bonafide letters, ID cards, transfer certificates and other institute documents on demand.', accent: '#65A30D', bg: 'linear-gradient(135deg,#F7FEE7,#ECFCCB)', border: 'rgba(101,163,13,0.25)', tag: 'Docs On Demand' },
  { id: 'campuserp', icon: '🗂️', title: 'CampusERP', subtitle: 'School & Coaching Management', desc: 'Admissions, fee collection, timetables, exams & staff payroll -one ERP built for schools and coaching institutes to run daily operations end-to-end.', accent: '#DC2626', bg: 'linear-gradient(135deg,#FEF2F2,#FEE2E2)', border: 'rgba(220,38,38,0.25)', tag: 'Run Your Institute' },
]

export const facultyAdvisors = [
  { id: 'praveen-bansal', name: 'Dr. Praveen Bansal', role: 'Associate Professor, Dean & Head -Centre for IoT', qualification: 'M.Tech (MANIT, Bhopal), Ph.D. (DTU, Delhi)', interest: 'Power Quality, Grid Connected Systems, Multilevel Inverters, IoT', image: PraveenBansal },
  { id: 'atul-chauhan', name: 'Atul Kumar Chauhan', role: 'Programmer', qualification: 'Researcher -Machine Learning & Network Security', interest: 'Machine Learning, Network Security, Routing Protocols', image: AtulKumaChauhan },
  { id: 'dhananjay-bisen', name: 'Dr. Dhananjay Bisen', role: 'Assistant Professor', qualification: 'B.E., M.Tech., Ph.D. (IT)', interest: 'Computer Programming, Data Science, Machine Learning, IoT', image: DhananjayBisen },
  { id: 'pk-singhal', name: 'Dr. P. K. Singhal', role: 'Professor and Dean', qualification: 'Ph.D.', interest: 'Microwave Engineering', image: PKSinghhal },
  { id: 'ajay-raghuwanshi', name: 'Dr. Ajay Raghuwanshi', role: 'Principal, Shri Sahaj Institute of Pharmacy', qualification: '', interest: '', image: AjayRaghuwanshi },
]

export const studentTestimonials = [
  { id: 'student-1', initials: 'AS', name: 'Aarav Sharma', role: 'JEE Aspirant, Class 12', text: 'SF StudyBoard changed how I prepare for JEE. The PYQ practice and virtual labs are genuinely helpful - feels like a premium app at zero cost.', tag: '✓ Verified Student', date: 'May 2025' },
  { id: 'student-2', initials: 'PM', name: 'Priya Mehta', role: 'NEET Aspirant, Class 11', text: 'The AI Doubt Solver is honestly incredible. I used to wait hours for answers - now I get them instantly. The formula sheets are a bonus!', tag: '✓ Verified Student', date: 'May 2025' },
  { id: 'student-3', initials: 'KR', name: 'Kabir Rana', role: 'Board Exam Student, Class 10', text: 'I love how the practice questions are organised by chapter and difficulty. It made my revision so much faster before exams.', tag: '✓ Verified Student', date: 'April 2025' },
  { id: 'student-4', initials: 'SN', name: 'Sneha Nair', role: 'JEE Aspirant, Class 12', text: 'The All India Test Series gave me a real sense of where I stand nationally. Seeing my rank improve every month kept me motivated.', tag: '✓ Verified Student', date: 'June 2025' },
  { id: 'student-5', initials: 'RV', name: 'Rohan Verma', role: 'NEET Aspirant, Class 12', text: 'Virtual labs helped me actually understand practicals I never got to try in school. Big difference for my biology and chemistry prep.', tag: '✓ Verified Student', date: 'March 2025' },
]