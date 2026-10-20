// Runs after `vite build`. No extra dependencies.
// For every route it writes dist/<route>/index.html with that route's own <title>, description,
// canonical, Open Graph, JSON-LD and a plain-HTML content shell inside #root (React replaces it
// on load). It also writes sitemap.xml, robots.txt and 404.html.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, ROUTES, NOINDEX_PATHS, buildSchemas } from '../src/seo/seoConfig.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

const headFor = ({ title, description, canonical, robots, schemas }) => `<!--seo:start-->
    <title>${esc(title)}</title>
    <meta data-seo-static name="description" content="${esc(description)}" />
    <meta data-seo-static name="robots" content="${esc(robots)}" />
    <link data-seo-static rel="canonical" href="${esc(canonical)}" />
    <meta data-seo-static property="og:type" content="website" />
    <meta data-seo-static property="og:site_name" content="${esc(SITE.name)}" />
    <meta data-seo-static property="og:locale" content="en_IN" />
    <meta data-seo-static property="og:title" content="${esc(title)}" />
    <meta data-seo-static property="og:description" content="${esc(description)}" />
    <meta data-seo-static property="og:url" content="${esc(canonical)}" />
    <meta data-seo-static property="og:image" content="${esc(SITE.ogImage)}" />
    <meta data-seo-static name="twitter:card" content="summary_large_image" />
    <meta data-seo-static name="twitter:title" content="${esc(title)}" />
    <meta data-seo-static name="twitter:description" content="${esc(description)}" />
    <meta data-seo-static name="twitter:image" content="${esc(SITE.ogImage)}" />
${schemas.map((s) => `    <script data-seo-static type="application/ld+json">${jsonLd(s)}</script>`).join('\n')}
    <!--seo:end-->`

const shellFor = (route) => {
  const l = route.landing
  let html = `<main data-prerender><h1>${esc(route.h1 || route.title)}</h1><p>${esc(l ? l.intro : route.description)}</p>`
  if (l) {
    for (const s of l.sections) {
      html += `<section><h2>${esc(s.heading)}</h2>`
      html += s.items.map((i) => `<h3>${esc(i.title)}</h3><p>${esc(i.text)}</p>`).join('')
      html += `</section>`
    }
    html += `<section><h2>Frequently asked questions</h2>`
    html += l.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')
    html += `</section>`
    html += `<nav>${l.related.map((r) => `<a href="${esc(r.to)}">${esc(r.label)}</a>`).join(' ')}</nav>`
  }
  html += `</main>`
  return html
}

const render = (meta, shell = '') =>
  template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headFor(meta))
    .replace('<!--seo:root-->', shell)

const write = (urlPath, html) => {
  const dir = urlPath === '/' ? DIST : join(DIST, urlPath)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// 1. Indexable routes
for (const r of ROUTES) {
  write(r.path, render({ title: r.title, description: r.description, canonical: r.canonical, robots: r.robots, schemas: buildSchemas(r) }, shellFor(r)))
}

// 2. Admin routes: must boot the SPA, never be indexed
for (const p of NOINDEX_PATHS) {
  write(p, render({ title: 'Admin | CampusSafar', description: 'Admin area', canonical: SITE.url + p, robots: 'noindex, nofollow', schemas: [] }))
}

// 3. 404.html (configure your host to serve this for unknown URLs)
writeFileSync(
  join(DIST, '404.html'),
  render({ title: 'Page not found | CampusSafar', description: 'This page does not exist.', canonical: SITE.url, robots: 'noindex, nofollow', schemas: [] },
    '<main data-prerender><h1>404: page not found</h1><p><a href="/">Go to the CampusSafar homepage</a></p></main>')
)

// 4. sitemap.xml
const urls = ROUTES.filter((r) => r.inSitemap)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((r) => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

// 5. robots.txt
writeFileSync(
  join(DIST, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${SITE.url}/sitemap.xml
`
)

console.log(`Prerendered ${ROUTES.length} routes + ${NOINDEX_PATHS.length} noindex routes, sitemap (${urls.length} URLs), robots.txt, 404.html`)