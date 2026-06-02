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
    "/island-hopping-from-kos": ("IslandHopping.tsx", "Day Trips & Island Hopping from Kos by Car: 2026 Guide",
          "Which Kos day trips suit a hire car and which need a ferry: paved drives to Asklepion, Zia, Antimachia and Kefalos, plus same-day hops to Kalymnos, Nisyros and Bodrum."),
    "/kos-car-rental-faq": ("FAQ.tsx", "Kos Car Rental FAQ: 10 Questions Answered",
          "Answers to the 10 most common Kos car rental questions: pricing, IDP, deposits, insurance, Bodrum ferry, parking fines."),
    "/about": ("About.tsx", "About kos-car-rental.com: Methodology & Sources",
          "How we research Kos car rental: 11-operator competitor scrape + Government Gazette sources. Affiliate disclosure, consumer protection."),
    "/contact": ("Contact.tsx", "Contact Kos Car Rental",
          "Contact the Kos Car Rental editorial team. Questions about bookings, content corrections, or local information."),
    "/privacy": ("PrivacyPolicy.tsx", "Privacy Policy — Kos Car Rental",
          "Privacy Policy for kos-car-rental.com — what data we collect, cookies, affiliate tracking, and GDPR rights."),
}

# Per-route Article dates (default = site launch). New content pages set their own.
DATES = {
    "/island-hopping-from-kos": ("2026-06-02", "2026-06-02"),
}
DEFAULT_DATES = ("2026-04-22", "2026-04-22")

# Per-route articleBody (>=200 chars plain text) — GEO compensation for head-only
# prerender so no-JS AI crawlers see page body text inside Article JSON-LD (rule: articleBody mandatory).
ARTICLE_BODY = {
    "/island-hopping-from-kos": (
        "A hire car is the right tool for inland Kos and the wrong tool for island hopping. "
        "The Asklepion (about 3.4 km from Kos Town, free paved parking), the sunset villages of Zia and Asfendiou, "
        "the 14th-century Antimachia Castle, the Byzantine acropolis of Paleo Pyli, and the hilltop village of Kefalos "
        "are all reached on paved roads suitable for an economy car. Gravel approaches void rental insurance: the "
        "Therma hot-springs descent, the roughly 5 km dirt road to Agios Theologos, the tracks to Camel Beach and "
        "Cavo Paradiso, and the Mount Dikaios track above Zia. For neighbouring islands, travel as a foot passenger. "
        "Kalymnos from Mastichari (30-45 minutes, EUR 8-10) and the Nisyros volcano from Kardamena (out about 09:30, "
        "back about 15:30, around EUR 5 crater entry) work as same-day trips, while Symi and Patmos do not allow a "
        "same-day return from Kos. Greek rental contracts void all insurance during ferry transport and ban "
        "cross-border travel, so taking a car to Kalymnos needs written supplier permission and the Kos-Bodrum "
        "crossing to Turkey is passenger-only with no rental-car option."
    ),
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
        # Trailing slash required — site serves /route/ as 200 and 308's /route → /route/
        canonical = ORIGIN + "/" if slug == "/" else f"{ORIGIN}{slug.rstrip('/')}/"
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
        if slug in ("/kos-car-rental-faq", "/island-hopping-from-kos"):
            items = parse_faq_items(PAGES / tsx_name)
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
        if slug in ("/driving-in-kos", "/kos-beaches-by-car", "/ferry-to-kos", "/kos-airport-car-rental", "/about", "/island-hopping-from-kos"):
            pub, mod = DATES.get(slug, DEFAULT_DATES)
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
                "datePublished": pub,
                "dateModified": mod,
                "inLanguage": "en",
            }
            if slug in ARTICLE_BODY:
                article["articleBody"] = ARTICLE_BODY[slug]
            html = inject_jsonld(html, article)
            print(f"  [schema] Article injected {slug}" + (" +articleBody" if slug in ARTICLE_BODY else ""))

        html_file.write_text(html, encoding="utf-8")
        print(f"  [patch] {slug} → title='{title}' ({len(title)} chars)")

    print("== prerender_patch done ==")


if __name__ == "__main__":
    main()
