import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE, getRouteMeta, buildSchemas, normalizePath } from '../seo/seoConfig'

// Route metadata lives in src/seo/seoConfig.js (single source of truth, shared with the
// build-time prerender script). Existing <SEO title=... /> props still work as a fallback
// for routes that are not in the config.
const SEO = ({ title, description, canonical, schema, noindex = false }) => {
  const { pathname } = useLocation()
  const route = getRouteMeta(pathname)

  const fallbackTitle = title
    ? (title.includes(SITE.name) ? title : `${title} | ${SITE.name}`)
    : `${SITE.name} | School & College Software, Website Development`

  const fullTitle = route ? route.title : fallbackTitle
  const desc = route ? route.description : (description || 'CampusSafar builds school and college software and custom websites for institutes and businesses across India.')
  const url = route ? route.canonical : (canonical || SITE.url + normalizePath(pathname))
  const robots = noindex ? 'noindex, nofollow' : (route ? route.robots : 'index, follow')

  const schemas = route ? buildSchemas(route) : (schema ? [schema] : [])

  // The prerender script ships static head tags marked data-seo-static. Once React and Helmet
  // take over, remove them so there are no duplicates.
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll('[data-seo-static]').forEach((n) => n.remove())
    }, 300)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={SITE.ogImage} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  )
}

export default SEO