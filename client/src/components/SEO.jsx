import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, canonical, schema }) => {
  const siteName = 'CampusSafar'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} -India's Smartest Campus Platform`
  const defaultDesc = 'CampusSafar offers SF StudyBoard for JEE, NEET, Board exam prep with 15,000+ PYQs, virtual labs, AI doubt solver -and Campus Suite AMS for institute management. Free to start.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={canonical || 'https://campussafar.com'} />

      {/* OG */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content="https://campussafar.com/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />

      {/* JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO