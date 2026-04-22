"""Prerender patcher — fix static HTML titles/descriptions/schemas per route.
Runs AFTER `npm run build` and BEFORE deploy. Rule #179 mandatory step.
"""
import json, re, sys, io
from pathlib import Path
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BUILD = Path(__file__).resolve().parent
DIST = BUILD / "dist"
PAGES = BUILD / "src" / "pages"

DOMAIN = "kos-car-rental.com"
BRAND = "Kos Car Rental"
ORIGIN = f"https://{DOMAIN}"

ROUTES = {
    "/": ("Index.tsx", "Kos Car Rental: Honest Prices, No Airport Surprises",
          "Compare Kos car rental from €9/day off-peak to €45 peak. KGS pickup, 4x4 for Cavo Paradiso, CDW/FDW breakdown."),
    "/kos-airport-car-rental": ("AirportPage.tsx", "Kos Airport Car Rental (KGS) Pickup Guide",
          "Walk-through for KGS pickup: arrivals hall desks, 60-min grace-period trap, out-of-hours fees, deposit rules."),
    "/driving-in-kos": ("DrivingGuide.tsx", "Driving in Kos: 2026 Rules, Fines & IDP Law",
          "Greek 2026 KOK updates, 30km/h urban limit, AI cameras, Law 4850/2021 on IDP, parking zones, enforcement hotspots."),
    "/kos-beaches-by-car": ("BeachGuide.tsx", "Kos Beaches by Car: 10-Beach Access Matrix",
          "Which Kos beaches need a 4x4 vs compact? Cavo Paradiso, Agios Theologos, Camel Beach, Paradise Beach — road conditions and insurance liability."),
    "/ferry-to-kos": ("FerryGuide.tsx", "Kos Ferry Ports: Mastichari & Mandraki Car Rules",
          "Mastichari drop-off fees, Bodrum ferry prohibition, Kalymnos logistics, Kos Port Mandraki realities for rental cars."),
    "/kos-car-rental-faq": ("FAQ.tsx", "Kos Car Rental FAQ: 10 Questions Answered",
          "Answers to the 10 most common Kos car rental questions: pricing, IDP, deposits, insurance, Bodrum ferry, parking fines."),
    "/about": ("About.tsx", "About kos-car-rental.com: Methodology & Sources",
          "How we research Kos car rental: 11-operator competitor scrape + Government Gazette sources. Affiliate disclosure, consumer protection."),
    "/contact": ("Contact.tsx", "Contact Kos Car Rental",
          "Contact the Kos Car Rental editorial team. Questions about bookings, content corrections, or local information."),
    "/privacy": ("PrivacyPolicy.tsx", "Privacy Policy — Kos Car Rental",
          "Privacy Policy for kos-car-rental.com — what data we collect, cookies, affiliate tracking, and GDPR rights."),
}


def route_to_file(slug: str) -> Path:
    if slug == "/":
        return DIST / "index.html"
    return DIST / slug.lstrip("/") / "index.html"


def upsert_meta(html: str, tag: str, attr: str, value: str, content: str) -> str:
    """Insert or replace <meta {attr}="{value}" content="..."> in <head>."""
    pattern = rf'<{tag}\s+{attr}="{re.escape(value)}"\s+content="[^"]*"\s*/?>'
    replacement = f'<{tag} {attr}="{value}" content="{content}" />'
    if re.search(pattern, html):
        return re.sub(pattern, replacement, html)
    return html.replace("</head>", f"    {replacement}\n  </head>", 1)


def upsert_title(html: str, title: str) -> str:
    return re.sub(r'<title>[^<]*</title>', f'<title>{title}</title>', html, count=1)


def upsert_canonical(html: str, url: str) -> str:
    pattern = r'<link\s+rel="canonical"\s+href="[^"]*"\s*/?>'
    replacement = f'<link rel="canonical" href="{url}" />'
    if re.search(pattern, html):
        return re.sub(pattern, replacement, html)
    return html.replace("</head>", f"    {replacement}\n  </head>", 1)


def upsert_description(html: str, desc: str) -> str:
    pattern = r'<meta\s+name="description"\s+content="[^"]*"\s*/?>'
    replacement = f'<meta name="description" content="{desc}" />'
    if re.search(pattern, html):
        return re.sub(pattern, replacement, html)
    return html.replace("</head>", f"    {replacement}\n  </head>", 1)


def inject_jsonld(html: str, obj: dict) -> str:
    script = f'<script type="application/ld+json">\n{json.dumps(obj, ensure_ascii=False, indent=2)}\n    </script>'
    return html.replace("</head>", f"    {script}\n  </head>", 1)


def parse_faq_items(tsx_path: Path):
    """Parse question:/answer: pairs from FAQ.tsx, handling escaped quotes."""
    src = tsx_path.read_text(encoding="utf-8")
    items = []
    # match question: "..." (no escaped quotes in question), then answer: "(possibly with \" escapes)"
    # use non-greedy answer with escaped-quote support
    pattern = r'\{\s*question:\s*"((?:[^"\\]|\\.)*)",\s*answer:\s*"((?:[^"\\]|\\.)*)"\s*\}'
    for m in re.finditer(pattern, src):
        q = m.group(1).replace('\\"', '"')
        a_raw = m.group(2).replace('\\"', '"')
        # strip any HTML tags for schema plain-text
        a_plain = re.sub(r'<[^>]+>', '', a_raw)
        items.append((q, a_plain[:500]))
    return items


def main():
    # Iterate routes, patch static HTML
    for slug, (tsx_name, title, desc) in ROUTES.items():
        html_file = route_to_file(slug)
        if not html_file.exists():
            print(f"  [skip] {slug} — no file")
            continue
        html = html_file.read_text(encoding="utf-8")

        html = upsert_title(html, title)
        html = upsert_description(html, desc)
        canonical = ORIGIN if slug == "/" else f"{ORIGIN}{slug}"
        html = upsert_canonical(html, canonical)

        # OG + Twitter
        for tag_attr, content in [
            (('meta', 'property', 'og:title'), title),
            (('meta', 'property', 'og:description'), desc),
            (('meta', 'property', 'og:url'), canonical),
            (('meta', 'name', 'twitter:title'), title),
            (('meta', 'name', 'twitter:description'), desc),
        ]:
            tag, attr, value = tag_attr
            pattern = rf'<{tag}\s+{attr}="{re.escape(value)}"\s+content="[^"]*"\s*/?>'
            replacement = f'<{tag} {attr}="{value}" content="{content}" />'
            if re.search(pattern, html):
                html = re.sub(pattern, replacement, html)
            else:
                html = html.replace("</head>", f"    {replacement}\n  </head>", 1)

        # FAQPage schema injection (rule #136/176)
        if slug == "/kos-car-rental-faq":
            items = parse_faq_items(PAGES / "FAQ.tsx")
            if items:
                faqpage = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": q,
                            "acceptedAnswer": {"@type": "Answer", "text": a},
                        }
                        for q, a in items
                    ],
                }
                html = inject_jsonld(html, faqpage)
                print(f"  [schema] FAQPage injected ({len(items)} Q&A)")

        # Article schema on guide pages (rule #112/176)
        if slug in ("/driving-in-kos", "/kos-beaches-by-car", "/ferry-to-kos", "/kos-airport-car-rental", "/about"):
            article = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": title,
                "description": desc,
                "url": canonical,
                "mainEntityOfPage": canonical,
                "author": {"@type": "Organization", "name": BRAND, "url": ORIGIN},
                "publisher": {
                    "@type": "Organization",
                    "name": BRAND,
                    "logo": {"@type": "ImageObject", "url": f"{ORIGIN}/favicon-512.png"},
                },
                "datePublished": "2026-04-22",
                "dateModified": "2026-04-22",
                "inLanguage": "en",
            }
            html = inject_jsonld(html, article)
            print(f"  [schema] Article injected {slug}")

        html_file.write_text(html, encoding="utf-8")
        print(f"  [patch] {slug} → title='{title}' ({len(title)} chars)")

    print("== prerender_patch done ==")


if __name__ == "__main__":
    main()
