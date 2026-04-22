"""Post-generate_site.py fixes for kos-build.
Applies 20+ golden rules in one pass.
Run: python post_build_fixes.py   (from kos-build/)
"""
import json, re
from pathlib import Path

BUILD = Path(__file__).resolve().parent
PAGES = BUILD / "src" / "pages"
PUBLIC = BUILD / "public"
INDEX_HTML = BUILD / "index.html"
FOOTER = BUILD / "src" / "components" / "Footer.tsx"

DOMAIN = "kos-car-rental.com"
BRAND = "Kos Car Rental"
CITY = "Kos"
PRIMARY_HEX = "#203B5E"  # Aegean navy
EMAIL = f"info@{DOMAIN}"

# Hero image semantic map (rule #138)
PAGE_HERO = {
    "Index.tsx": "/1.webp",
    "AirportPage.tsx": "/4.webp",
    "DrivingGuide.tsx": "/7.webp",
    "BeachGuide.tsx": "/10.webp",
    "FerryGuide.tsx": "/13.webp",
    "FAQ.tsx": "/16.webp",
    "About.tsx": "/17.webp",
    "Contact.tsx": "/2.webp",
    "PrivacyPolicy.tsx": "/18.webp",
}

# Per-route SEO titles (≤60 chars, rule #122) and descriptions
ROUTES = {
    "/": {
        "title": "Kos Car Rental: Honest Prices, No Airport Surprises",
        "desc": "Compare Kos car rental from €9/day off-peak to €45 peak. KGS pickup, 4x4 for Cavo Paradiso, CDW/FDW breakdown.",
        "hero_h1": "Renting a Car in Kos Without the Hidden-Fee Trap",
    },
    "/kos-airport-car-rental": {
        "title": "Kos Airport Car Rental (KGS) Pickup Guide",
        "desc": "Walk-through for KGS pickup: arrivals hall desks, 60-min grace-period trap, out-of-hours fees, deposit rules.",
        "hero_h1": "Kos Airport Pickup: From Luggage Belt to Driving",
    },
    "/driving-in-kos": {
        "title": "Driving in Kos: 2026 Rules, Fines & IDP Law",
        "desc": "Greek 2026 KOK updates, 30km/h urban limit, AI cameras, Law 4850/2021 on IDP, parking zones, enforcement hotspots.",
        "hero_h1": "Driving on Kos: 2026 Fine Schedule & Camera Zones",
    },
    "/kos-beaches-by-car": {
        "title": "Kos Beaches by Car: 10-Beach Access Matrix",
        "desc": "Which Kos beaches need a 4x4 vs compact? Cavo Paradiso, Agios Theologos, Camel Beach, Paradise Beach — road conditions and insurance liability.",
        "hero_h1": "Which Beach Can Your Rental Reach? A Liability Matrix",
    },
    "/ferry-to-kos": {
        "title": "Kos Ferry Ports: Mastichari & Mandraki Car Rules",
        "desc": "Mastichari drop-off fees, Bodrum ferry prohibition, Kalymnos logistics, Kos Port Mandraki realities for rental cars.",
        "hero_h1": "Ferry-Port Rentals: Mastichari, Bodrum & Kalymnos",
    },
    "/kos-car-rental-faq": {
        "title": "Kos Car Rental FAQ: 10 Questions Answered",
        "desc": "Answers to the 10 most common Kos car rental questions: pricing, IDP, deposits, insurance, Bodrum ferry, parking fines.",
        "hero_h1": "Your Kos Car Rental Questions, Answered Straight",
    },
    "/about": {
        "title": "About kos-car-rental.com: Methodology & Sources",
        "desc": "How we research Kos car rental: 11 operator scrape + Government Gazette sources. Affiliate disclosure, consumer protection links.",
        "hero_h1": "Who We Are and How We Research Kos Rentals",
    },
    "/contact": {
        "title": "Contact Kos Car Rental",
        "desc": "Get in touch with the Kos Car Rental editorial team. Questions about bookings, content corrections, or local information.",
        "hero_h1": "Contact the Kos Car Rental Team",
    },
    "/privacy": {
        "title": "Privacy Policy — Kos Car Rental",
        "desc": "Privacy Policy for kos-car-rental.com — what data we collect, cookies, affiliate tracking, and GDPR rights.",
        "hero_h1": "Privacy Policy",
    },
}

# ------------------------------------------------------------------------
# PASS 1 — per-page TSX transforms
# ------------------------------------------------------------------------
def transform_page(tsx_file: Path):
    src = tsx_file.read_text(encoding="utf-8")
    orig = src
    name = tsx_file.name

    slug = next(
        (r for r, meta in ROUTES.items() if {
            "Index.tsx": "/", "AirportPage.tsx": "/kos-airport-car-rental",
            "DrivingGuide.tsx": "/driving-in-kos", "BeachGuide.tsx": "/kos-beaches-by-car",
            "FerryGuide.tsx": "/ferry-to-kos", "FAQ.tsx": "/kos-car-rental-faq",
            "About.tsx": "/about", "Contact.tsx": "/contact", "PrivacyPolicy.tsx": "/privacy",
        }.get(name) == r),
        None,
    )
    meta = ROUTES.get(slug, {})

    # Rule #48: ImageDivider src= -> image=
    src = re.sub(r'(<ImageDivider\s+[^>]*?)\bsrc=', r'\1image=', src)

    # Rule #165: strip **bold** from schema name/headline
    src = re.sub(r'"(headline|name)"(\s*:\s*)"\*\*([^"]+?)\*\*"', r'"\1"\2"\3"', src)
    # Rule #87/165: also strip **bold** markers from Section title= / HeroSection title=
    src = re.sub(r'(\s)title="\*\*([^"]+?)\*\*"', r'\1title="\2"', src)

    # Rule #170: *italic* → curly quotes (U+201C/201D), avoid **bold** matches
    src = re.sub(
        r"(?<![*\w])\*([a-zA-Z][a-zA-Z\s'\-]{1,40}?)\*(?![*\w])",
        lambda m: "\u201C" + m.group(1) + "\u201D",
        src,
    )

    # Rule #138: assign semantic hero image
    hero = PAGE_HERO.get(name)
    if hero:
        # HeroSection image="..." or backgroundImage="..."
        src = re.sub(r'(<HeroSection\s+[^>]*?\bimage=)"[^"]+"', rf'\1"{hero}"', src)
        src = re.sub(r'(<HeroSection\s+[^>]*?\bbackgroundImage=)"[^"]+"', rf'\1"{hero}"', src)

    # Rule #158: hero subtitle text-white wrap (for plain <p>)
    src = re.sub(
        r'subtitle=\{<><p(?!\s+className)',
        'subtitle={<><p className="text-white drop-shadow-md"',
        src,
    )
    # For <p className="..."> already styled — inject text-white if missing
    def _ensure_white(m):
        classes = m.group(1)
        if "text-white" in classes:
            return m.group(0)
        return f'subtitle={{<><p className="text-white drop-shadow-md {classes}"'
    src = re.sub(
        r'subtitle=\{<><p\s+className="((?!text-white)[^"]+)"',
        _ensure_white,
        src,
    )

    # Rule #159: strip <a> from hero subtitles (inside subtitle={<>...</>})
    def _strip_a(block):
        return re.sub(
            r'<a\s+href="[^"]*"[^>]*>([^<]+)</a>',
            r'\1',
            block,
        )
    src = re.sub(
        r'subtitle=\{<>([\s\S]*?)</>\}',
        lambda m: 'subtitle={<>' + _strip_a(m.group(1)) + '</>}',
        src,
    )

    # Rule #96/161: wrap bare <FAQSection /> in <section container max-w-4xl>
    if name == "FAQ.tsx":
        # only wrap if not already wrapped
        if "<FAQSection" in src and "max-w-4xl" not in src.split("<FAQSection", 1)[0][-200:]:
            src = re.sub(
                r'(<FAQSection\s+items=\{[^}]*?\}\s*/>)',
                r'<section className="container mx-auto max-w-4xl px-4 py-10">\n        \1\n      </section>',
                src,
                count=1,
            )

    # Rule #110: FAQ meta description (if empty)
    if name == "FAQ.tsx":
        src = re.sub(
            r'<SEOHead\s+title="([^"]*)"\s+description=""',
            rf'<SEOHead title="\1" description="{meta["desc"]}"',
            src,
        )

    # Rule #122: truncate >60 char titles (replace with our canonical)
    if meta.get("title"):
        src = re.sub(
            r'<SEOHead\s+title="[^"]*"',
            f'<SEOHead title="{meta["title"]}"',
            src,
            count=1,
        )

    # Rule #163: ensure Hero H1 differs from SEO title
    if meta.get("hero_h1"):
        src = re.sub(
            r'(<HeroSection\s+[^>]*?\btitle=)"[^"]*"',
            rf'\1"{meta["hero_h1"]}"',
            src,
            count=1,
        )

    # Rule #121/74: strip "Related guides" standalone section
    # Look for <section ...>Related guides</...></section> block
    src = re.sub(
        r'<section\s+className="[^"]*"\s*>\s*<h2[^>]*>\s*Related guides\s*</h2>[\s\S]*?</section>\s*',
        '',
        src,
    )

    # Rule #75: replace affiliate placeholder text with <AffiliateWidget />
    # Plain <p> containing "WIDGET" / "PLACEHOLDER" / "COMPARE CAR RENTAL ... AFFILIATE"
    src = re.sub(
        r'<p[^>]*>\s*\[?(?:COMPARE CAR RENTAL[^<\]]*|CAR RENTAL COMPARISON[^<\]]*|Affiliate widget[^<\]]*|Your affiliate widget[^<\]]*)\]?\s*</p>',
        '<AffiliateWidget />',
        src,
        flags=re.IGNORECASE,
    )

    # Rule #112: ensure Article schema has author
    if '"@type": "Article"' in src and '"author"' not in src:
        src = re.sub(
            r'("@type":\s*"Article",)',
            rf'\1\n        "author": {{"@type": "Organization", "name": "{BRAND}", "url": "https://{DOMAIN}"}},',
            src,
        )

    # Rule #100: remove duplicate Organization/WebSite schemas from Index.tsx
    if name == "Index.tsx":
        src = re.sub(
            r',?\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*"Organization"[\s\S]*?\}(?=\s*[,\]])',
            '',
            src,
            count=1,
        )
        src = re.sub(
            r',?\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*"WebSite"[\s\S]*?\}(?=\s*[,\]])',
            '',
            src,
            count=1,
        )

    if src != orig:
        tsx_file.write_text(src, encoding="utf-8")
        return True
    return False


# ------------------------------------------------------------------------
# PASS 2 — inject <AffiliateWidget /> right after <HeroSection /> on content pages (rule #160/#151 line parser)
# ------------------------------------------------------------------------
CONTENT_PAGES_FOR_WIDGET = {"Index.tsx", "AirportPage.tsx", "DrivingGuide.tsx", "BeachGuide.tsx", "FerryGuide.tsx", "FAQ.tsx"}

def inject_widget(tsx_file: Path):
    if tsx_file.name not in CONTENT_PAGES_FOR_WIDGET:
        return False
    src = tsx_file.read_text(encoding="utf-8")
    if "<AffiliateWidget" in src:
        return False  # already there
    # ensure import present
    if "import AffiliateWidget" not in src:
        src = src.replace(
            'import SEOHead from "@/components/SEOHead";',
            'import SEOHead from "@/components/SEOHead";\nimport AffiliateWidget from "@/components/AffiliateWidget";',
            1,
        )
    lines = src.split("\n")
    out = []
    in_hero = False
    injected = False
    for line in lines:
        out.append(line)
        if not injected:
            stripped = line.strip()
            if stripped.startswith("<HeroSection"):
                in_hero = True
            elif in_hero and stripped == "/>":
                out.append("      <AffiliateWidget />")
                in_hero = False
                injected = True
    tsx_file.write_text("\n".join(out), encoding="utf-8")
    return injected


# ------------------------------------------------------------------------
# PASS 3 — fix public/_redirects (rule #129/181): strip Netlify line for Vercel/CF
# ------------------------------------------------------------------------
def fix_redirects():
    p = PUBLIC / "_redirects"
    if not p.exists():
        return
    lines = p.read_text(encoding="utf-8").splitlines()
    kept = [ln for ln in lines if ".netlify.app" not in ln]
    p.write_text("\n".join(kept) + "\n", encoding="utf-8")


# ------------------------------------------------------------------------
# PASS 4 — robots.txt AI crawlers (rule #63/144)
# ------------------------------------------------------------------------
def fix_robots():
    p = PUBLIC / "robots.txt"
    ai_bots = [
        "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai",
        "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot",
        "cohere-ai", "Bytespider", "Diffbot",
    ]
    content = "# Allow all standard crawlers\nUser-agent: *\nAllow: /\n\n# Explicit AI crawler allow (rule #63/144)\n"
    for bot in ai_bots:
        content += f"User-agent: {bot}\nAllow: /\n\n"
    content += f"Sitemap: https://{DOMAIN}/sitemap.xml\n"
    p.write_text(content, encoding="utf-8")


# ------------------------------------------------------------------------
# PASS 5 — index.html rich static meta + JSON-LD (rules #54/64/65/66/71/80/81/83/94)
# ------------------------------------------------------------------------
def fix_index_html():
    root_meta = ROUTES["/"]
    title = root_meta["title"]
    desc = root_meta["desc"]
    canonical = f"https://{DOMAIN}/"

    org_ld = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": BRAND,
        "url": canonical,
        "logo": f"https://{DOMAIN}/favicon-512.png",
        "email": EMAIL,
        "description": desc,
        "areaServed": {"@type": "Place", "name": f"{CITY}, Greece"},
        "availableLanguage": ["en"],
        "foundingDate": "2026",
        "sameAs": [],
    }
    website_ld = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": BRAND,
        "url": canonical,
        "description": desc,
        "inLanguage": "en",
    }

    content = f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="{PRIMARY_HEX}" />
    <title>{title}</title>
    <meta name="description" content="{desc}" />
    <link rel="canonical" href="{canonical}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{desc}" />
    <meta property="og:url" content="{canonical}" />
    <meta property="og:image" content="https://{DOMAIN}/og-image.png" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="{BRAND}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{title}" />
    <meta name="twitter:description" content="{desc}" />
    <meta name="twitter:image" content="https://{DOMAIN}/og-image.png" />

    <script type="application/ld+json">
{json.dumps(org_ld, ensure_ascii=False, indent=2)}
    </script>
    <script type="application/ld+json">
{json.dumps(website_ld, ensure_ascii=False, indent=2)}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
"""
    INDEX_HTML.write_text(content, encoding="utf-8")


# ------------------------------------------------------------------------
# Run all passes
# ------------------------------------------------------------------------
def main():
    print("== post_build_fixes.py ==")
    # PASS 1: transform each page
    for tsx in sorted(PAGES.glob("*.tsx")):
        if transform_page(tsx):
            print(f"  [fix]   {tsx.name}")
    # PASS 2: inject AffiliateWidget on content pages
    for tsx in sorted(PAGES.glob("*.tsx")):
        if inject_widget(tsx):
            print(f"  [widget] {tsx.name}")
    # PASS 3: _redirects
    fix_redirects()
    print("  [_redirects] stripped netlify line")
    # PASS 4: robots.txt
    fix_robots()
    print("  [robots.txt] AI crawler allow rules")
    # PASS 5: index.html static meta + JSON-LD
    fix_index_html()
    print("  [index.html] rich static meta + Org/WebSite JSON-LD")
    print("== done ==")


if __name__ == "__main__":
    main()
