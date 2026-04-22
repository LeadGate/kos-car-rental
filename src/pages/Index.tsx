import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import AffiliateWidget from "@/components/AffiliateWidget";
import Section from "@/components/Section";
import ImageDivider from "@/components/ImageDivider";
import DataTable from "@/components/DataTable";
import { InfoBox, WarningBox } from "@/components/InfoBox";
import CompanyCard from "@/components/CompanyCard";
import { Car, DollarSign, Shield } from "lucide-react";

const Index = () => {
  const breadcrumbSchema =
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kos-car-rental.com"
      }
    ]
  };

  // Organization + WebSite schemas live in index.html (rule #100) — not duplicated here

  return (
    <Layout>
      <SEOHead title="Kos Car Rental: Honest Prices, No Airport Surprises"
        description="Compare Kos car rental from €9/day off-peak to €45 peak. KGS pickup, 4x4 for Cavo Paradiso, CDW/FDW breakdown."
        canonical="https://kos-car-rental.com/"
        jsonLd={[breadcrumbSchema]}
      />

      <HeroSection
        title="Renting a Car in Kos Without the Hidden-Fee Trap"
        subtitle={<><p className="text-white drop-shadow-md">Compare Kos car rental from €9/day in February to €45 in August. Skip the 60-minute airport cancellation trap, the zero-excess contract gap, and the €150 off-road recovery fee — we name the operators and cite the Greek Gazette.</p></>}
        image="/1.webp"
        imageAlt="Car rental in Kos"
        ctaText="Compare Car Rental Deals"
        ctaHref="#compare"
      />

      <AffiliateWidget id="compare" />

      <Section
        icon={<DollarSign className="w-6 h-6" />}
        title="How Much Does Car Rental in Kos Cost in 2026?"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Kos car rental prices in 2026 vary by season, vehicle category, and transmission, with economy models often costing €9-€12 per day in February to April and €35-€45 per day in July and August. The Greek island’s price gap is large enough that the same Fiat Panda, Hyundai i10, Nissan Micra, Toyota Aygo, Renault Clio, Kia Picanto, Citroen C1, Citroen C3, Opel Corsa, or Seat León can cost more than three times as much in peak weeks as in winter.</p>
          <DataTable headers={["Car Category", "Example Models", "Low Season (Feb-Apr, Oct-Nov)", "Shoulder Season (May, Sep)", "Peak Season (July-Aug)"]} rows={[["Economy", "Fiat Panda, Hyundai i10, Toyota Aygo, Kia Picanto", "\u20ac9 \u2013 \u20ac12", "\u20ac18 \u2013 \u20ac22", "\u20ac35 \u2013 \u20ac45"], ["Compact", "Renault Clio, Citroen C3, Opel Corsa, Seat Le\u00f3n", "\u20ac12 \u2013 \u20ac15", "\u20ac22 \u2013 \u20ac28", "\u20ac40 \u2013 \u20ac55"], ["SUV / Crossover", "VW Taigo, Kia Stonic, Dacia Duster", "\u20ac30 \u2013 \u20ac38", "\u20ac40 \u2013 \u20ac50", "\u20ac65 \u2013 \u20ac85"]]} />
          <InfoBox><p>💡 <strong>Tip:</strong> Kos prices usually improve outside the July 20 to August 25 peak, and a shoulder-season booking in May, June, or late September often saves 30% to 50% compared with August.</p></InfoBox>
          <h3 className="text-xl font-bold mt-6 mb-3">Special Vehicle Types</h3>
          <p className="text-gray-700 mb-4 leading-relaxed"><strong>Automatic cars:</strong> Autoway Kos, Geo Rent A Car, and Costas Car Rental usually keep a smaller automatic fleet than manuals, and the premium is often €5-€10 per day. During the peak period, automatic cars can sell out 4 or more weeks in advance, so an early prepaid reservation is safer than waiting for the arrivals hall.</p>
          <p className="text-gray-700 mb-4 leading-relaxed"><strong>7- to 9-seater vans:</strong> Toyota Proace and Fiat Talento are the most useful larger-vehicle options for families and groups, and August rates can rise above €130 per day. Kos agencies typically release only a few vans per season, so a multi-day booking is better than a same-day request.</p>
      </Section>

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Where to Pick Up Your Rental on Kos"
        alt
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Kos pickup points are spread across the island, and the right choice depends on whether you arrive by air at KGS, by ferry at Mastichari, or by hotel transfer to resort areas such as Kardamena, Tigaki, Marmari, Kefalos, Psalidi, or Lambi. Fraport Greece operates Kos International Airport, and the airport’s arrivals hall is the main handover point for meet-and-greet collections and shuttle bus transfers.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">Kos International Airport (KGS)</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Kos International Airport „Ippokratis" (KGS) is the busiest pickup point, and Autoway Kos, Trust Kos, and Exer often meet customers in the arrivals hall instead of using a fixed desk. KGS is the natural choice for flight arrivals, and some firms, including Rentacar-Kos and IdealRentals, offer shuttle bus transfers from the terminal to an off-airport office. Under Greek Law 4850/2021, Article 25 §3, visitors with licences from the US, UK, Canada, Australia, and Gibraltar do not need an International Driving Permit if their licence is valid and readable.</p>
          <WarningBox><p>⚠️ <strong>Warning:</strong> The new EES (Entry/Exit System) biometric border checks can add time at arrival, so late evening flights may leave less margin for a same-night pickup at Kos airport.</p></WarningBox>
          <h3 className="text-xl font-bold mt-6 mb-3">Kos Town, Lambi, Mandraki, and Psalidi</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Kos Town is the most convenient urban pickup base for travelers staying near the Old Town, while Lambi and Psalidi suit visitors on the north-eastern coast. Local offices in these areas make sense for mid-trip rentals, and agencies such as King of Rent a Car and Eco Rentals commonly serve city and hotel clients with fixed opening hours rather than airport-style shuttle operations.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">Mastichari Port and Antimachia</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Mastichari is the most practical pickup point for ferry passengers traveling to or from Kalymnos, and it also works well for visitors staying near Antimachia or the airport road. One-way rentals between KGS, Mastichari, and resort hotels often carry a drop-off fee, so asking for the exact surcharge before preauthorisation is the safer choice. For more route-specific pickup details, see <a href="/ferry-to-kos" className="text-primary underline hover:text-accent">Mastichari Port car rental options</a>.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">Resort Delivery in Kardamena, Tigaki, Marmari, Kefalos, and Zia</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Many local firms deliver to resort hotels in Kardamena, Tigaki, Marmari, Kefalos, and sometimes even Zia for rentals of 3 days or more. This is often the most convenient option for families, and it can reduce airport queues if your pickup time is outside the main arrival wave.</p>
      </Section>

      <ImageDivider image="/2.webp" alt="Kos car rental" />

      <Section
        icon={<Car className="w-6 h-6" />}
        title="The Three Hidden Fees Every Kos Tourist Pays"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Kos rental contracts often include extra charges that are not obvious on the first quote, especially when booking through aggregators such as DiscoverCars, Booking, or Kayak. The key is to match the headline rate with the actual contract terms from the local supplier, whether that supplier is Autoway Kos, Kosmos, AutoBank, or another island operator.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">1. Out-of-Hours Surcharge: €20-€25</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Most Kos rental desks close around 21:00, and pickups after that time often trigger a flat late-arrival fee of €20-€25. Autoway Kos, for example, lists a €25 after-hours pickup charge, which is common at KGS and in Kos Town. A late flight into Kos International Airport can therefore turn a cheap booking into a more expensive one unless the arrival time is matched to the desk schedule.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">2. Young and Senior Driver Surcharge: €9-€10 per day</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Drivers aged 21-24 and drivers over 70 frequently pay an extra €9-€10 per day in Kos. On a 10-day rental, that can add €90-€100 to the final bill, and some agencies apply the fee without a cap. Costas Car Rental, Geo Rent A Car, and King of Rent a Car usually publish age limits in the rental terms, so checking the exact birthday cut-off before payment is essential.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">3. “Zero Excess” Deductible Trap: €500-€750</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Kosmos, AutoBank, and some online sellers advertise “zero excess” or “full coverage,” but the contract may still show a deductible or franchise of €500-€750. In Greek rental terms, that means the driver can still be charged if the claim falls outside the policy wording, so reading the insurance section before the preauthorisation is critical. A genuine zero excess policy should state the liability figure clearly and name the covered items, especially glass, mirrors, and tyres.</p>
      </Section>

      <Section
        icon={<Shield className="w-6 h-6" />}
        title="Which Insurance Tier Actually Protects You?"
        alt
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Kos car insurance terms can look simple online but become stricter at the desk, especially when a contract separates CDW, SCDW, FDW, excess, and Third-Party Liability. Greek rental agreements often require a card preauthorisation, and that hold can stay on the card until the vehicle is returned and inspected.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">Standard CDW</h3>
          <InfoBox><p>CDW, or Collision Damage Waiver, is the basic cover included in most Kos rentals, and it usually limits the driver’s liability to an excess or deductible of roughly €750-€1,100. This tier normally excludes undercarriage, tyres, wheels, glass, windows, and mirrors, so a stone chip, flat tyre, or mirror scrape can still be billed to the renter.</p></InfoBox>
          <h3 className="text-xl font-bold mt-6 mb-3">SCDW and FDW</h3>
          <InfoBox><p>SCDW and FDW are the common upgrade tiers on Kos, and they are usually priced at about €10-€15 per day above the base rate. These policies often reduce the deductible to zero or near zero and may expand coverage to include the windshield, tyres, mirrors, and sometimes underbody damage, depending on the supplier’s wording. Autoway Kos, Geo Rent A Car, and Eco Rentals may describe the package differently, but the contract should say whether the cover is true zero excess or only a reduced franchise.</p></InfoBox>
          <h3 className="text-xl font-bold mt-6 mb-3">Full Coverage, Zero Excess, and What Still Excludes You</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">“Full coverage” is only meaningful if the written policy names the covered damage, the deductible amount, and any exclusions for unpaved roads. On Kos, damage on gravel tracks to beaches such as Limnionas, Agios Stefanos, Exotic Beach, Lagada Beach, Therma Beach, or parts of Agios Theologos can void insurance even when the contract says full coverage. For route planning, read <a href="/kos-beaches-by-car" className="text-primary underline hover:text-accent">which beaches need a 4x4</a> before you commit to a small hatchback.</p>
          <WarningBox><p>⚠️ <strong>Warning:</strong> Third-Party Liability protects you against damage to other people and property, but it does not cover your own rental car if you leave the paved road or ignore the contract’s off-road restriction.</p></WarningBox>
      </Section>

      <ImageDivider image="/3.webp" alt="Kos car rental" />

      <Section
        icon={<Car className="w-6 h-6" />}
        title="When to Book Your Car Rental in Kos"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">The best time to book a rental in Kos is usually 6-10 weeks before travel for shoulder season and 10-14 weeks before travel for July and August. Price and availability in the Dodecanese are heavily seasonal, and the strongest demand comes through Kos Town, KGS, Mastichari, Kardamena, and the main beach resorts.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Best value months:</strong> May, June, and late September usually offer the widest choice of cars and the lowest risk of automatic sell-outs.</li>
            <li><strong>Peak-season pressure:</strong> July 20 to August 25 is the most constrained period, and an automatic Kia Picanto, Hyundai i10, or VW Taigo can disappear weeks in advance.</li>
            <li><strong>Lowest price window:</strong> Early February often brings the cheapest economy rates, with Fiat Panda and Toyota Aygo quotes near €11 per day.</li>
          </ul>
          <p className="text-gray-700 mb-4 leading-relaxed">Kos roads are mostly straightforward, but <a href="/driving-in-kos" className="text-primary underline hover:text-accent">the Kos driving rules guide</a> is useful for speed limits, parking, and police fines, especially in urban areas and around the Alikes salt lake. A seatbelt violation can cost €350, while illegal parking is often fined at €80, and fuel prices in Kos Town commonly move around €1.90-€2.10 per litre.</p>
          <InfoBox><p>💡 <strong>Tip:</strong> If you need a larger car for Mount Dikaios, the Asklepieion, or a day trip to Cavo Paradiso, book early enough to secure a Dacia Duster, Toyota Proace, or Fiat Talento before peak inventory runs out.</p></InfoBox>
          <h3 className="text-xl font-bold mt-6 mb-3">Recommended Suppliers</h3>
          <CompanyCard><p><strong>Autoway Kos:</strong> Autoway Kos is a strong fit for airport pickup at KGS, with meet-and-greet collections in the arrivals hall and a reputation for clear airport logistics.</p></CompanyCard>
          <CompanyCard><p><strong>Costas Car Rental:</strong> Costas Car Rental is often useful for town-based rentals in Kos Town and Lambi, and it is a practical choice for travelers staying central rather than at the airport.</p></CompanyCard>
          <CompanyCard><p><strong>Geo Rent A Car:</strong> Geo Rent A Car holds an EOT licence number 0206Ε81000479800, and its fleet is commonly quoted for economy and compact cars such as the Fiat Panda, Hyundai i10, and Renault Clio.</p></CompanyCard>
          <CompanyCard><p><strong>King of Rent a Car:</strong> King of Rent a Car is a resort-friendly supplier that can work well for Kardamena, Tigaki, and Marmari deliveries when the pickup is arranged in advance.</p></CompanyCard>
          <CompanyCard><p><strong>Eco Rentals:</strong> Eco Rentals is a fit for travelers comparing lower-emission or smaller cars, and its island coverage can suit short hops between Kos Town, Psalidi, and nearby beaches.</p></CompanyCard>
          <CompanyCard><p><strong>Exer:</strong> Exer has been reported by some travelers to enforce strict lateness rules, including cancellation after long delays, so confirming the grace period in writing is important.</p></CompanyCard>
          <CompanyCard><p><strong>AutoBank:</strong> AutoBank has been associated in customer feedback with undercarriage damage disputes, which makes photo documentation at pickup and return especially important.</p></CompanyCard>
          <CompanyCard><p><strong>Kosmos:</strong> Kosmos is frequently mentioned in relation to “zero excess” wording, so checking the deductible figure and all exclusions before payment is essential.</p></CompanyCard>
      </Section>
    </Layout>
  );
};

export default Index;
