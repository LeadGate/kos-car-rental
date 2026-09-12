// @ts-nocheck
// home_datenode.mjs — единственный узел с датой на ГЛАВНОЙ странице.
//
// Зачем. Замер 12.09.2026 по 38 живым главным React-флота: dateModified 0 из 38,
// articleBody 0 из 38. Дату роботу объявлял только <lastmod> в sitemap, вписанный
// руками, и он отставал от правки содержимого у 35 из 38 — медиана 113 дней,
// максимум 188. Этот шаг добавляет на главную узел WebPage с датой.
//
// Почему отдельным шагом, а не правкой prerender.mjs: копии prerender.mjs
// разошлись (38 разных файлов, медиана совпадения 78,6 %), но форма C — 36 из
// 38 — одинакова в том, что важно: главная патчится в конце, отдельными блоками.
// Отдельный шаг ни от чего в них не зависит и одинаков у всех.
//
// Источник дат — scripts/home_date.json (в git). 🔴 КОНТРАКТ: dateModified
// правит ЧЕЛОВЕК, когда меняет содержимое главной, и той же датой правит
// <lastmod> главной в public/sitemap.xml. Дата сборки не подставляется: пересборка
// без правки содержимого не должна объявлять страницу обновлённой.
//
// Идемпотентно: если на главной уже есть WebPage, файл не трогается. Это делает
// шаг безопасным на argassi, где узел уже вставлен своим способом (форма A).
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const CFG = path.join('scripts', 'home_date.json');
const HOME = path.join(DIST, 'index.html');

if (!fs.existsSync(CFG)) {
  console.log('[home-date] no scripts/home_date.json, skipping');
  process.exit(0);
}
if (!fs.existsSync(HOME)) {
  console.log('[home-date] no dist/index.html, skipping');
  process.exit(0);
}

const cfg = JSON.parse(fs.readFileSync(CFG, 'utf-8'));
let html = fs.readFileSync(HOME, 'utf-8');

if (/"@type"\s*:\s*"WebPage"/.test(html)) {
  console.log('[home-date] homepage already carries WebPage, left untouched');
  process.exit(0);
}

// origin — из первого <loc> карты сайта, как это делает prerender.mjs
const sitemapPath = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('[home-date] FATAL: no dist/sitemap.xml — cannot determine origin');
  process.exit(1);
}
const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
const firstLoc = (sitemap.match(/<loc>([^<]+)<\/loc>/) || [])[1] || '';
const origin = (firstLoc.match(/^(https?:\/\/[^/]+)/) || [])[1] || '';
if (!origin) {
  console.error('[home-date] FATAL: cannot determine origin from sitemap <loc>');
  process.exit(1);
}

function unesc(s) {
  return String(s)
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

// name и description берём со самой страницы — так они не разойдутся с <head>
const title = unesc((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
const desc = unesc((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');

const node = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': origin + '/#webpage',
  url: origin + '/',
  inLanguage: cfg.inLanguage || 'en',
  isPartOf: { '@id': origin + '/#website' },
  publisher: { '@id': origin + '/#organization' },
};
if (title) node.name = title;
if (desc) node.description = desc;
if (cfg.datePublished) node.datePublished = cfg.datePublished;
if (cfg.dateModified) node.dateModified = cfg.dateModified;

if (!node.dateModified) {
  console.error('[home-date] FATAL: scripts/home_date.json has no dateModified');
  process.exit(1);
}

const block = '    <script type="application/ld+json">\n'
  + JSON.stringify(node, null, 2) + '\n    </script>\n  </head>';
html = html.replace(/<\/head>/, block);
fs.writeFileSync(HOME, html);
console.log('[home-date] WebPage injected: published=' + (node.datePublished || '-')
  + ' modified=' + node.dateModified);
