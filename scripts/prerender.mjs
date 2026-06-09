// @ts-nocheck
// BOSS canonical prerender.mjs — bundled in the generator so it can't be deleted
// out from under boss_routes_rollout.py (the old LESVOS_CANONICAL repo was removed).
// Emits per-route: title/desc, canonical, og:*, BreadcrumbList, Article (with
// articleBody mirror + speakable), FAQPage, and an LCP hero preload.
// HERO_BY_SLUG is injected per-site by boss_routes_rollout.py.
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

// Optional per-route JSON-LD config (Article + FAQPage). Absent file = legacy head-patch only.
const ROUTES_CFG_PATH = path.join('scripts', 'prerender.routes.json');
let routesCfg = {};
let routesDefaults = {};
if (fs.existsSync(ROUTES_CFG_PATH)) {
  try {
    const raw = JSON.parse(fs.readFileSync(ROUTES_CFG_PATH, 'utf-8'));
    routesDefaults = raw._defaults || {};
    for (const k of Object.keys(raw)) {
      if (!k.startsWith('_')) routesCfg[k] = raw[k];
    }
  } catch (e) {
    console.warn('[prerender] routes config malformed, skipping JSON-LD enrichment:', e.message);
  }
}

const firstLoc = (sitemap.match(/<loc>(https?:\/\/[^/<"]+)/) || [])[1] || '';
const canonicalOrigin = (indexHtml.match(/<link rel="canonical" href="(https?:\/\/[^/"]+)/) || [])[1] || '';
const origin = firstLoc || canonicalOrigin;
if (!origin) {
  console.error('[prerender] FATAL: cannot determine origin (no sitemap <loc> and no canonical)');
  process.exit(1);
}
const fullTitle = (indexHtml.match(/<title>([^<]+)<\/title>/) || [])[1] || '';
// Brand = part before first em-dash / en-dash / pipe / hyphen separator
const brand = fullTitle.split(/\s+[—–|-]\s+/)[0].trim() || fullTitle;

// Extract <loc> URLs from sitemap
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const ACRONYMS = new Set(['faq', 'seo', 'geo', 'api', 'gps', 'atv', 'suv', 'id', 'ev']);

// LCP preload: per-route hero <img> is rendered by React (inside the JS bundle) so the
// browser's preload scanner never sees it until hydration. Inject <link rel="preload"
// as="image"> for each route's hero so it is fetched in parallel with the bundle.
// HERO_BY_SLUG is injected per-site by boss_routes_rollout.py from each page's hero image.
const HERO_BY_SLUG = {
  "/": "/1.webp",
  "/kos-airport-car-rental": "/3.webp",
  "/driving-in-kos": "/4.webp",
  "/kos-beaches-by-car": "/5.webp",
  "/ferry-to-kos": "/13.webp",
  "/island-hopping-from-kos": "/12.webp",
  "/kos-car-rental-faq": "/16.webp",
};
function resolveHero(slug) {
  return HERO_BY_SLUG[slug.replace(/\/$/, '') || '/'] || null;
}
function preloadLink(href) {
  const ext = href.split('?')[0].split('.').pop().toLowerCase();
  const type = ext === 'webp' ? 'image/webp' : /jpe?g/.test(ext) ? 'image/jpeg' : 'image/png';
  return `    <link rel="preload" as="image" href="${href}" type="${type}" fetchpriority="high" />`;
}

function slugToTitle(slug) {
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

function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function replaceOrInsert(html, regex, insertValue, headInsert) {
  if (regex.test(html)) {
    return html.replace(regex, insertValue);
  }
  return html.replace(/<\/head>/, `${headInsert}\n  </head>`);
}

function lookupCfg(slug) {
  const cfgKey = slug.endsWith('/') ? slug : `${slug}/`;
  return routesCfg[cfgKey] || routesCfg[slug] || null;
}

function patchHead(html, { slug, canonical, title, description, cfg, heroHref }) {
  // LCP hero preload — insert right after viewport meta. The base index.html ships the
  // HOMEPAGE hero preload; strip any inherited image preload on content routes so each
  // page preloads ITS OWN hero, not the homepage's.
  if (heroHref) {
    html = html.replace(/\s*<link rel="preload" as="image"[^>]*>/g, '');
    html = html.replace(
      /(<meta name="viewport"[^>]*>)/,
      `$1\n${preloadLink(heroHref)}`,
    );
  }
  html = replaceOrInsert(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
    `    <link rel="canonical" href="${canonical}" />`,
  );
  html = replaceOrInsert(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
    `    <title>${title}</title>`,
  );
  if (description) {
    const descAttr = escAttr(description);
    html = replaceOrInsert(
      html,
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${descAttr}" />`,
      `    <meta name="description" content="${descAttr}" />`,
    );
    html = replaceOrInsert(
      html,
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${descAttr}" />`,
      `    <meta property="og:description" content="${descAttr}" />`,
    );
    // twitter:description — keep in sync with page description (avoid stale site-default)
    html = replaceOrInsert(
      html,
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${descAttr}" />`,
      `    <meta name="twitter:description" content="${descAttr}" />`,
    );
  }
  html = replaceOrInsert(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
  );
  html = replaceOrInsert(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
    `    <meta property="og:title" content="${title}" />`,
  );
  // twitter:title — sync to page title unconditionally (not only when og:image present)
  html = replaceOrInsert(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escAttr(title)}" />`,
    `    <meta name="twitter:title" content="${escAttr(title)}" />`,
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

  // Optional Article + FAQPage JSON-LD from routes config
  if (cfg) {
    const blocks = [];
    if (cfg.article) {
      const article = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: cfg.article.headline,
        description: cfg.article.description,
        image: cfg.article.image,
        datePublished: cfg.article.datePublished || routesDefaults.datePublished,
        dateModified: cfg.article.dateModified || routesDefaults.dateModified,
        author: cfg.article.author || routesDefaults.author,
        publisher: cfg.article.publisher || routesDefaults.publisher,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        inLanguage: 'en',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.intro-section', 'p'],
        },
      };
      if (cfg.article.wordCount) article.wordCount = cfg.article.wordCount;
      if (cfg.article.about) article.about = cfg.article.about;
      if (cfg.article.keywords) article.keywords = cfg.article.keywords;
      // GEO mitigation: embed article body prose so no-JS AI crawlers can read content.
      if (cfg.article.body) article.articleBody = cfg.article.body;
      blocks.push(`    <script type="application/ld+json">\n${JSON.stringify(article, null, 2)}\n    </script>`);
    }
    if (Array.isArray(cfg.faqs) && cfg.faqs.length > 0) {
      const faqPage = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: cfg.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      };
      blocks.push(`    <script type="application/ld+json">\n${JSON.stringify(faqPage, null, 2)}\n    </script>`);
    }
    if (blocks.length) {
      html = html.replace(/<\/head>/, `${blocks.join('\n')}\n  </head>`);
    }
  }
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

  const cfg = lookupCfg(slug);
  const title = (cfg && cfg.article && cfg.article.headline) || `${slugToTitle(slug)} | ${brand}`;
  const description = cfg && cfg.article && cfg.article.description ? cfg.article.description : null;
  const heroHref = resolveHero(slug);
  const patched = patchHead(indexHtml, { slug, canonical: loc, title, description, cfg, heroHref });
  fs.writeFileSync(path.join(outDir, 'index.html'), patched);
  count += 1;
}

// Homepage (dist/index.html) is not regenerated by the route loop — patch its hero preload in place.
const homeHero = resolveHero('/');
if (homeHero) {
  const homePath = path.join(DIST, 'index.html');
  let homeHtml = fs.readFileSync(homePath, 'utf-8');
  if (!/rel="preload"\s+as="image"/.test(homeHtml)) {
    homeHtml = homeHtml.replace(/(<meta name="viewport"[^>]*>)/, `$1\n${preloadLink(homeHero)}`);
    fs.writeFileSync(homePath, homeHtml);
    console.log(`[prerender] injected hero preload into homepage: ${homeHero}`);
  }
}

console.log(`[prerender] generated ${count} per-route index.html files`);
