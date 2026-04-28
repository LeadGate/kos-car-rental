// @ts-nocheck
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
const sitemapPath = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.log('[prerender] no sitemap.xml, skipping');
  process.exit(0);
}
const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

// Derive origin from first <loc> in sitemap.xml (no longer rely on static canonical in index.html)
const firstLoc = (sitemap.match(/<loc>([^<]+)<\/loc>/) || [])[1] || '';
const origin = (firstLoc.match(/^(https?:\/\/[^/]+)/) || [])[1] || '';
if (!origin) {
  console.error('[prerender] FATAL: cannot determine origin from sitemap <loc>');
  process.exit(1);
}
const fullTitle = (indexHtml.match(/<title>([^<]+)<\/title>/) || [])[1] || '';
// Brand = part before first em-dash / en-dash / pipe / hyphen separator
const brand = fullTitle.split(/\s+[—–|-]\s+/)[0].trim() || fullTitle;
const origDesc = (indexHtml.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';

function buildDesc(slugTitle) {
  const prefix = `${slugTitle} — ${brand}. `;
  const budget = Math.max(40, 158 - prefix.length);
  return (prefix + origDesc).slice(0, prefix.length + budget).replace(/\s+\S*$/, '').trim();
}

function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// Extract <loc> URLs from sitemap
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const ACRONYMS = new Set(['faq', 'seo', 'geo', 'api', 'gps', 'atv', 'suv', 'id', 'ev']);

function slugToTitle(slug) {
  // '/taormina-airport-car-rental' -> 'Taormina Airport Car Rental'
  const clean = slug.replace(/^\//, '').replace(/\/$/, '');
  if (!clean) return 'Home';
  return clean
    .split('/')
    .pop()
    .split('-')
    .map((w) => {
      if (ACRONYMS.has(w.toLowerCase())) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

function replaceOrInsert(html, regex, insertValue, headInsert) {
  if (regex.test(html)) {
    return html.replace(regex, insertValue);
  }
  // Not found → insert just before </head>
  return html.replace(/<\/head>/, `${headInsert}\n  </head>`);
}

function patchHead(html, { slug, canonical, title, description }) {
  const descAttr = escAttr(description);
  // Canonical — replace or insert
  html = replaceOrInsert(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
    `    <link rel="canonical" href="${canonical}" />`,
  );
  // Title — replace or insert
  html = replaceOrInsert(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
    `    <title>${title}</title>`,
  );
  // meta description — replace or insert (per-route)
  html = replaceOrInsert(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${descAttr}" />`,
    `    <meta name="description" content="${descAttr}" />`,
  );
  // og:url — replace or insert
  html = replaceOrInsert(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
  );
  // og:title — replace or insert
  html = replaceOrInsert(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
    `    <meta property="og:title" content="${title}" />`,
  );
  // og:description — replace or insert (per-route)
  html = replaceOrInsert(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${descAttr}" />`,
    `    <meta property="og:description" content="${descAttr}" />`,
  );
  // Inject BreadcrumbList JSON-LD before </head>
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: slugToTitle(slug), item: canonical },
    ],
  };
  const crumbBlock = `    <script type="application/ld+json">\n${JSON.stringify(crumbs, null, 2)}\n    </script>\n  </head>`;
  html = html.replace(/<\/head>/, crumbBlock);
  return html;
}

let count = 0;
for (const loc of locs) {
  let url;
  try {
    url = new URL(loc);
  } catch {
    continue;
  }
  const slug = url.pathname;
  if (slug === '/' || slug === '') continue; // Home stays as dist/index.html

  const outDir = path.join(DIST, slug.replace(/^\//, '').replace(/\/$/, ''));
  fs.mkdirSync(outDir, { recursive: true });

  const slugTitle = slugToTitle(slug);
  const title = `${slugTitle} | ${brand}`;
  const description = buildDesc(slugTitle);
  const patched = patchHead(indexHtml, { slug, canonical: loc, title, description });
  fs.writeFileSync(path.join(outDir, 'index.html'), patched);
  count += 1;
}

console.log(`[prerender] generated ${count} per-route index.html files`);
