// Single source of truth for SEO. Used by:
//   1. src/components/SEO.jsx  (client side, react-helmet-async)
//   2. scripts/prerender.mjs   (build time: static HTML per route, sitemap, robots)
// Keep this file pure JS: no JSX, no asset imports.

import { LANDING_PAGES } from './landingPages.js'

export const SITE = {
  url: 'https://campussafar.com',
  name: 'CampusSafar',
  legalName: 'CampusSafar Technologies Private Limited',
  email: 'info@campussafar.com',
  phone: '+91-77709-72867',
  locality: 'Khargone',
  region: 'Madhya Pradesh',
  country: 'IN',
  // Fill these when you have them. Empty values are skipped automatically.
  streetAddress: '',
  postalCode: '',
  ogImage: 'https://campussafar.com/og-image.png', // create a 1200x630 PNG at client/public/og-image.png
  logo: 'https://campussafar.com/favicon.png',
  founder: { name: 'Mo Abrar Qureshi', linkedin: 'https://www.linkedin.com/in/moabrarqureshi/' },
  sameAs: [
    'https://www.linkedin.com/company/sfsmartlabs/',
    'https://www.linkedin.com/in/moabrarqureshi/',
    '', // Google Business Profile / Maps URL
    '', // Instagram
    '', // Facebook
  ],
  areaServed: ['Khargone', 'Barwani', 'Khandwa', 'Burhanpur', 'Dhar', 'Indore', 'Madhya Pradesh', 'India'],
}

const LASTMOD = '2026-10-19'

const abs = (path) => (path === '/' ? SITE.url : SITE.url + path)

// ── Core routes (existing pages) ─────────────────────────────────────────────
const BASE_ROUTES = [
  {
    path: '/',
    name: 'Home',
    type: 'home',
    title: 'School Management Software & Website Development | CampusSafar',
    description:
      'CampusSafar builds school and college management software and custom websites for institutes and businesses across India. Attendance, marks, fees, report cards. Free demo.',
    h1: 'Software and websites that run your school, college and business',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/custom-development',
    name: 'Custom Development',
    type: 'page',
    title: 'Custom Software & Portal Development for Institutes | CampusSafar',
    description:
      'Custom web portals, admin dashboards, student portals and business tools built around your exact workflow. Free discovery call.',
    h1: 'Custom software development for institutes and businesses',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/pricing',
    name: 'Pricing',
    type: 'page',
    title: 'Pricing: School Software & Website Development | CampusSafar',
    description:
      'Transparent pricing for CampusSafar school software, website development and custom web portals for institutes and businesses in India.',
    h1: 'Pricing for every institute and business',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/products/campus-suite',
    name: 'Idea2Software',
    type: 'product',
    title: 'Idea2Software: Modular School & College Software | CampusSafar',
    description:
      'Idea2Software by CampusSafar: pick only the modules you need. Campus360, CampusCMS, CampusSeating, CampusDocs and CampusERP. Free demo.',
    h1: 'Idea2Software: modular software for schools and colleges',
    changefreq: 'weekly',
    priority: '0.9',
    app: { category: 'BusinessApplication' },
  },
  {
    path: '/products/studyboard',
    name: 'SF StudyBoard',
    type: 'product',
    title: 'SF StudyBoard: JEE, NEET & Board PYQs, Virtual Labs | CampusSafar',
    description:
      'Practice JEE, NEET and Board PYQs with 50,000+ questions, virtual labs and an AI doubt solver. Free to start, no app download needed.',
    h1: 'SF StudyBoard: India’s complete student learning platform',
    changefreq: 'weekly',
    priority: '0.9',
    app: { category: 'EducationalApplication' },
  },
  {
    path: '/products/campus-management-system',
    name: 'CampusCMS',
    type: 'product',
    title: 'Campus Management System: Attendance, Quiz & Marks | CampusCMS',
    description:
      'CampusCMS by CampusSafar: campus management system with attendance, online quizzes and marks and result management for colleges. Free demo.',
    h1: 'CampusCMS: campus management system',
    changefreq: 'weekly',
    priority: '0.8',
    app: { category: 'EducationalApplication' },
  },
  {
    path: '/products/exam-seating-arrangement-software',
    name: 'CampusSeating',
    type: 'product',
    title: 'Exam Seating Arrangement Software | CampusSeating',
    description:
      'CampusSeating auto-generates exam seating arrangements by room, roll number and section for schools and colleges. No manual charts, no clashes. Free demo.',
    h1: 'Exam seating arrangement software for schools and colleges',
    changefreq: 'weekly',
    priority: '0.8',
    app: { category: 'EducationalApplication' },
  },
  {
    path: '/products/student-development-tracking-system',
    name: 'Campus360',
    type: 'product',
    title: 'Student Development Tracking System | Campus360',
    description:
      'Campus360 tracks student growth beyond marks: academics, sports, leadership, olympiad and arts in one rubric engine, with parent dashboards. Free demo.',
    h1: 'Campus360: student development tracking system',
    changefreq: 'weekly',
    priority: '0.8',
    app: { category: 'EducationalApplication' },
  },
  {
    path: '/products/school-fee-admission-management-system',
    name: 'CampusERP',
    type: 'product',
    title: 'School Fee & Admission Management System | CampusERP',
    description:
      'CampusERP unifies admissions, fee collection, marksheet generation and faculty records for schools and coaching institutes. Free demo.',
    h1: 'CampusERP: school fee and admission management system',
    changefreq: 'weekly',
    priority: '0.8',
    app: { category: 'BusinessApplication' },
  },
  {
    path: '/products/certificate-document-management-system',
    name: 'CampusDocs',
    type: 'product',
    title: 'College Certificate & Document Management System | CampusDocs',
    description:
      'CampusDocs: certificate and document management for colleges. Request workflows, PDF generation and QR-based verification. Free demo.',
    h1: 'CampusDocs: certificate and document management system',
    changefreq: 'weekly',
    priority: '0.8',
    app: { category: 'BusinessApplication' },
  },
  {
    path: '/about',
    name: 'About',
    type: 'page',
    title: 'About CampusSafar | Software Company in Madhya Pradesh',
    description:
      'CampusSafar was founded by Mo Abrar Qureshi to solve real campus problems. Meet the team building software for schools, colleges and businesses.',
    h1: 'About CampusSafar',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/contact',
    name: 'Contact',
    type: 'page',
    title: 'Contact CampusSafar | Book a Free Demo',
    description:
      'Get in touch with CampusSafar. Book an institute demo, ask for a website quote or reach us on WhatsApp.',
    h1: 'Contact CampusSafar',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    type: 'legal',
    title: 'Privacy Policy | CampusSafar',
    description: 'How CampusSafar collects, uses and protects data across SF StudyBoard and Idea2Software.',
    h1: 'Privacy Policy',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/terms-of-service',
    name: 'Terms of Service',
    type: 'legal',
    title: 'Terms of Service | CampusSafar',
    description: 'Terms governing use of CampusSafar’s website and products, including SF StudyBoard and Idea2Software.',
    h1: 'Terms of Service',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    // HTML sitemap page: useful for users, not listed in the XML sitemap
    path: '/sitemap',
    name: 'Sitemap',
    type: 'legal',
    title: 'Sitemap | CampusSafar',
    description: 'All CampusSafar products and pages.',
    h1: 'Sitemap',
    robots: 'noindex, follow',
    inSitemap: false,
  },
]

const LANDING_ROUTES = LANDING_PAGES.map((p) => ({
  path: p.path,
  name: p.name,
  type: 'landing',
  title: p.title,
  description: p.description,
  h1: p.h1,
  changefreq: 'weekly',
  priority: p.path === '/school-management-software' ? '0.95' : '0.9',
  landing: p,
}))

export const ROUTES = [...BASE_ROUTES, ...LANDING_ROUTES].map((r) => ({
  robots: 'index, follow',
  inSitemap: true,
  lastmod: LASTMOD,
  ...r,
  canonical: abs(r.path),
}))

// Routes that must never be indexed (still need an HTML file so the SPA can boot)
export const NOINDEX_PATHS = ['/admin/login', '/admin/dashboard']

export const normalizePath = (p) => {
  if (!p) return '/'
  const clean = p.split('?')[0].split('#')[0]
  return clean.length > 1 ? clean.replace(/\/+$/, '') : clean
}

export const getRouteMeta = (pathname) => {
  const path = normalizePath(pathname)
  return ROUTES.find((r) => r.path === path) || null
}

// ── JSON-LD builders ─────────────────────────────────────────────────────────
const compact = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v != null && !(Array.isArray(v) && v.length === 0)))

const orgId = `${SITE.url}/#organization`

export const organizationSchema = () =>
  compact({
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': orgId,
    name: SITE.legalName,
    alternateName: ['CampusSafar', 'Campus Safar', 'Campussafar'],
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.ogImage,
    description:
      'CampusSafar builds school and college management software and custom websites for institutes and businesses across India.',
    email: SITE.email,
    telephone: SITE.phone,
    address: compact({
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    }),
    areaServed: SITE.areaServed,
    founder: { '@type': 'Person', name: SITE.founder.name, jobTitle: 'Founder & CEO', sameAs: [SITE.founder.linkedin] },
    sameAs: SITE.sameAs.filter(Boolean),
  })

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  alternateName: 'Campus Safar',
  publisher: { '@id': orgId },
  inLanguage: 'en-IN',
})

export const breadcrumbSchema = (route) => {
  if (route.path === '/') return null
  const crumbs = [{ name: 'Home', url: SITE.url }]
  if (route.path.startsWith('/products/') && route.path !== '/products/campus-suite') {
    crumbs.push({ name: 'Idea2Software', url: abs('/products/campus-suite') })
  }
  crumbs.push({ name: route.name, url: route.canonical })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
  }
}

export const faqSchema = (faqs) =>
  faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

export const buildSchemas = (route) => {
  if (!route || route.robots?.startsWith('noindex')) return []
  const out = []
  if (route.type === 'home') out.push(organizationSchema(), websiteSchema())
  const bc = breadcrumbSchema(route)
  if (bc) out.push(bc)

  if (route.type === 'product' && route.app) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: route.name,
      url: route.canonical,
      description: route.description,
      applicationCategory: route.app.category,
      operatingSystem: 'Web',
      publisher: { '@id': orgId },
    })
  }

  if (route.landing) {
    const l = route.landing
    if (l.schema?.kind === 'SoftwareApplication') {
      out.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: l.path === '/school-management-software' ? 'CampusSafar AMMS' : 'CampusSafar AMMS for coaching institutes',
        url: route.canonical,
        description: route.description,
        applicationCategory: l.schema.category,
        operatingSystem: 'Web',
        publisher: { '@id': orgId },
      })
    } else if (l.schema?.kind === 'Service') {
      out.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: l.name,
        serviceType: l.schema.serviceType,
        url: route.canonical,
        description: route.description,
        provider: { '@id': orgId },
        areaServed: l.schema.local ? SITE.areaServed : 'India',
      })
    }
    const faq = faqSchema(l.faqs)
    if (faq) out.push(faq)
  }
  return out
}