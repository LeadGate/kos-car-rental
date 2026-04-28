import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import DataTable from "@/components/DataTable";
import { Info } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <SEOHead title="About kos-car-rental.com: Methodology & Sources"
        description="How we research Kos car rental: 11-operator competitor scrape + Government Gazette sources. Affiliate disclosure, consumer protection links."
        canonical="https://kos-car-rental.com/about"
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "About Kos Car Rental",
          "url": "https://kos-car-rental.com/about"
        }]}
      />

      <Breadcrumbs items={[{ label: "About" }]} />

      <Section icon={<Info className="w-6 h-6" />}>
        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>kos-car-rental.com is an independent car rental booking guide</strong> for Kos. <strong>kos-car-rental.com does not own vehicles, operate a rental office, hold deposits, or issue rental contracts.</strong> All bookings, supplier conditions, deposits, insurance terms and final prices are handled by the booking partner or rental supplier shown in the booking widget.
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Who We Are and How We Research Kos Rentals</h1>

        <h2 className="text-2xl font-bold mt-8 mb-3">Who We Are</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          kos-car-rental.com is an independent comparison site for car rental on the island of Kos (Dodecanese, Greece). We are not a rental company — we curate and explain the local market, flag predatory practices at Kos International Airport (KGS) desks, and route travellers to operators whose contracts match their advertised terms. Editorial decisions are made by a small team based outside the Dodecanese to keep judgments on local operators independent.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">How We Research</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          In April 2026 we scraped and cross-checked eleven Kos-based rental operators — kingrentacar.gr, koscarhire.com, autowaykos.gr, kosmos-kos.com, georentacar.com, autobank-kos.com, trust-kos.com, costascars.com, rentacar-kos.gr, ecorentals-kos.gr, and the greece-moments.com editorial coverage. Pricing was cross-referenced with aggregator stubs (DiscoverCars, Kayak, Booking) to catch the gap between the headline "from €7/day" and the real counter price after insurance, age surcharges, and deposit requirements.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Legal references are drawn directly from the Greek Government Gazette (ΦΕΚ) and the Hellenic Ministry of Infrastructure. The most-cited anchors on this site are Greek Law 4850/2021 Article 25 §3 (FEK A 208, 5 Nov 2021) on the IDP exemption, and the 2026 Road Traffic Code (KOK) update that reduced the urban speed limit to 30 km/h and rolled out 1,000 AI-enforced traffic cameras. Full text of Law 4850/2021 is public at <a href="https://www.taxheaven.gr/law/4850/2021" className="text-primary underline hover:text-accent" target="_blank" rel="noopener">taxheaven.gr</a>.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">What We Cover</h2>
        <DataTable
          headers={["Topic", "Source", "Last verified"]}
          rows={[
            ["Pricing ranges", "11 local operators + aggregators (DiscoverCars, Kayak, Booking)", "April 2026"],
            ["Insurance terms", "Published FAQs of Autoway Kos, Costas Car Rental, Eco Rentals, Geo Rent A Car", "April 2026"],
            ["Traffic law + fines", "Greek Government Gazette (ΦΕΚ A 208), 2026 KOK draft, Hellenic Ministry of Transport", "April 2026"],
            ["Airport logistics", "Fraport Greece (kgs-airport.gr), Hellenic Tourist Police", "April 2026"],
            ["Beach access", "Direct route audits + IdealRentals/Autoway off-road exclusion clauses", "April 2026"],
          ]}
        />
        <p className="text-gray-700 mb-4 leading-relaxed mt-4">
          Cross-navigation: our <a href="/driving-in-kos" className="text-primary underline hover:text-accent">driving rules guide</a> is the single source for fine amounts and IDP rules; the <a href="/kos-car-rental-faq" className="text-primary underline hover:text-accent">Kos rental FAQ</a> answers the ten most-asked pre-booking questions.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Affiliate Disclosure</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We earn commission when you book through partner links on this site. This does not change the price you pay, and it does not dictate which operators we recommend or warn against. Where public complaints exist (Exer 60-minute cancellation tactic, AutoBank undercarriage billing disputes, the Kosmos "zero excess" contract gap), we name the operator even though it may be a partner elsewhere in the affiliate network. Independence over inventory.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Consumer Protection & Contact</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          If a Kos rental transaction goes wrong on the ground, Greek consumer protection is active and fast: the Hellenic Tourist Police operate a 24/7 hotline at <strong>1571</strong>; the Ministry of Tourism accepts written complaints at <a href="mailto:touristcomplaints@mintour.gr" className="text-primary underline hover:text-accent">touristcomplaints@mintour.gr</a>; and the Dodecanese-specific consumer authority INKA12 (<a href="https://inka12.gr/" className="text-primary underline hover:text-accent" target="_blank" rel="noopener">inka12.gr</a>) accepts digital complaints about local operators. Editorial queries, corrections, or partnership proposals — <a href="mailto:info@kos-car-rental.com" className="text-primary underline hover:text-accent">info@kos-car-rental.com</a>.
        </p>
      </Section>
    </Layout>
  );
};

export default About;
