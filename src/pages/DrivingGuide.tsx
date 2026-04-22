import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import AffiliateWidget from "@/components/AffiliateWidget";
import HeroSection from "@/components/HeroSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import ImageDivider from "@/components/ImageDivider";
import DataTable from "@/components/DataTable";
import { InfoBox, WarningBox } from "@/components/InfoBox";
import { Car, Shield } from "lucide-react";

const DrivingGuide = () => {
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
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Driving Tips",
        "item": "https://kos-car-rental.com/driving-in-kos"
      }
    ]
  };

  const articleSchema =
  {
    "@context": "https://schema.org",
    "@type": "Article",
        "author": {"@type": "Organization", "name": "Kos Car Rental", "url": "https://kos-car-rental.com"},
    "headline": "Driving in Kos: Your 2026 Guide to Greek Road Rules & Fines",
    "description": "Driving in Kos gives visitors freedom to reach Kos Town, Kefalos, Tigaki, Marmari, and Zia without relying on schedules, and the island follows the Greek",
    "url": "https://kos-car-rental.com/driving-in-kos",
    "datePublished": "2026-04-22",
    "dateModified": "2026-04-22",
    "publisher": {
      "@type": "Organization",
      "name": "Kos Car Rental",
      "url": "https://kos-car-rental.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kos-car-rental.com/favicon-512x512.png"
      }
    },
    "mainEntityOfPage": "https://kos-car-rental.com/driving-in-kos",
    "inLanguage": "en"
  };

  return (
    <Layout>
      <SEOHead title="Driving in Kos: 2026 Rules, Fines & IDP Law"
        description="Driving in Kos gives visitors freedom to reach Kos Town, Kefalos, Tigaki, Marmari, and Zia without relying on schedules, and the island follows the Greek"
        canonical="https://kos-car-rental.com/driving-in-kos"
        jsonLd={[breadcrumbSchema, articleSchema]}
      />

      <Breadcrumbs items={[{ label: "Driving Tips" }]} />

      <HeroSection
        title="Driving on Kos: 2026 Fine Schedule & Camera Zones"
        subtitle={<><p className="text-white drop-shadow-md">Driving in Kos gives visitors freedom to reach Kos Town, Kefalos, Tigaki, Marmari, and Zia without relying on schedules, and the island follows the Greek rule of driving on the right-hand side. This guide focuses on the 2026 Greek Road Traffic Code (KOK), the rules that matter at Kos International Airport (KGS / Ippokratis / Hippocrates), and the fines that can affect a rental from Autoway Kos, Geo Rent A Car, or Costas Car Rental.</p></>}
        image="/4.webp"
        imageAlt="Car rental in Kos"
        ctaText="Compare Car Rental Deals"
        ctaHref="#compare"
      />
      <AffiliateWidget />

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Do You Need an International Driving Permit on Kos?"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">For most visitors from the UK, US, Canada, Australia, Gibraltar, and EU/EEA countries, an International Driving Permit is not legally required on Kos under Law 4850/2021, Article 25 §3, published in FEK A 208 on 05/11/2021. That law recognises valid national licences from those countries, so a driver can legally rent from King of Rent a Car, Trust Kos, or Rentacar-Kos with a national licence only.</p>
          <p className="text-gray-700 mb-4 leading-relaxed">The law is published in the Government Gazette and reflected in Greek tax-law references such as Taxheaven.gr, which makes it the clearest legal basis for licence checks in 2026. If a licence is issued outside the recognised list or is not printed in the Latin alphabet, an IDP is still required and must be shown with the original licence.</p>
          <WarningBox><p>💡 <strong>Tip:</strong> Keep a screenshot or PDF of Law 4850/2021 on your phone if an agent at Kos International Airport asks for an IDP despite the law.  ⚠️ <strong>Warning:</strong> An IDP is not a replacement for the original licence, and a rental company can still refuse the car if the names do not match the booking.</p></WarningBox>
      </Section>

      <Section
        icon={<Car className="w-6 h-6" />}
        title="2026 Speed Limits and AI Cameras in Kos and the Dodecanese"
        alt
      >
          <p className="text-gray-700 mb-4 leading-relaxed">The 2026 KOK reduced the default urban limit to 30 km/h in towns and villages, while rural roads remain 90 km/h and motorway limits remain 130 km/h, although Kos has no motorway network. The Greek Ministry of Digital Governance has been rolling out AI-powered traffic cameras across the South Aegean, and enforcement is relevant on routes around Kos Town, Antimachia, and the airport road to KGS.</p>
          <p className="text-gray-700 mb-4 leading-relaxed">The strongest practical examples for island drivers are the main corridor between Kos Town and Kos Airport, the approach to Kefalos, and other higher-speed sections where seatbelts and phone use can also be monitored. In many cases, the fine is sent to the rental company first, and agencies such as Eco Rentals, Ilias Rentals, or Exer may then charge an administrative fee of €20-€30 to the card on file.</p>
          <InfoBox><p>💡 <strong>Tip:</strong> On Kos, treat every built-up road as a 30 km/h zone unless signs clearly show otherwise, because camera enforcement is designed around the KOK update.  💡 <strong>Tip:</strong> If your booking with Avis, Hertz, or Sixt includes GPS tracking or telematics, driving behaviour can also be visible to the fleet team after a violation notice.</p></InfoBox>
      </Section>

      <ImageDivider image="/2.webp" alt="Kos car rental" />

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Traffic Fines Schedule in Greece for 2026"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Greek fines are fixed by offence category, and the KOK links many violations to temporary licence suspension, which is why the exact amount matters for visitors driving between Mandraki, Lambi, Psalidi, and Marmari. The table below summarises the 2026 penalties that are most relevant to rental-car users in Kos and the wider Dodecanese.</p>
          <DataTable headers={["Violation", "Fine (EUR)", "Additional Penalty"]} rows={[["Speeding up to 20 km/h over the limit", "\u20ac40", "-"], ["Speeding 20-30 km/h over the limit", "\u20ac50", "-"], ["Speeding more than 30 km/h over the limit", "\u20ac175", "60-day licence suspension"], ["Driving without a seatbelt", "\u20ac350", "30-day licence suspension"], ["Using a mobile phone without hands-free kit", "\u20ac350", "30-day licence suspension"], ["Parking on a yellow line", "\u20ac80", "-"], ["Running a red light or STOP sign", "\u20ac700", "60-day licence suspension"], ["Drunk driving, BAC-dependent", "\u20ac200-\u20ac1,200", "2-6 month licence suspension"]]} />
          <p className="text-gray-700 mb-4 leading-relaxed">The table matters for rental customers because companies such as Goldcar, Alma, and Europcar may receive the notice first and then pass the charge to the renter with an added admin fee. The KOK fine structure also makes a strong case for choosing full coverage or FDW where available, because a separate traffic fine does not remove the renter’s duty to pay the authority.</p>
      </Section>

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Alcohol Limit for Driving in Greece"
        alt
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Greece applies a low alcohol limit for drivers, and the standard legal threshold is 0.05% BAC or 0.25 milligrams per litre of exhaled air. Novice drivers with less than two years of licence age, motorcyclists, and commercial drivers face a stricter 0.02% BAC limit, so the law can be tighter than visitors expect after dinner in Kos Town or drinks near Kardamena.</p>
          <p className="text-gray-700 mb-4 leading-relaxed">Police breathalyser checks are common on weekend nights, especially on the roads linking Kos Town, Psalidi, and Tigaki, and the safest rule is not to drive after drinking at all. A small beer can be enough to create risk for an 80 kg adult, so a taxi or prebooked transfer is the safer option after a night out.</p>
          <WarningBox><p>⚠️ <strong>Warning:</strong> Insurance from CDW, SCDW, or FDW does not protect a driver from an alcohol offence, and a rental agency can still report the incident even if no crash occurs.</p></WarningBox>
      </Section>

      <ImageDivider image="/3.webp" alt="Kos car rental" />

      <Section
        icon={<Shield className="w-6 h-6" />}
        title="Kos Town Parking Zones and the Mandraki Harbour Rules"
      >
          <InfoBox><p>Kos Town uses colour-coded parking zones, and the system is the simplest way to avoid an €80 fine while visiting the port, shopping streets, or the beachfront near Lambi and Psalidi. Blue lines mean paid parking, white lines mean free spaces, and yellow lines mean no parking because they are reserved for loading, taxis, or emergency access.</p></InfoBox>
          <p className="text-gray-700 mb-4 leading-relaxed">Mandraki Harbour and the fenced Kos Port area are especially sensitive, because the Port Authority can fine or tow cars parked without a valid ferry departure. A parking ticket is usually a pink slip under the wiper, and the official payment route is the Municipality of Kos cashier’s office or any Hellenic Post (ELTA) branch within 15 days.</p>
          <DataTable headers={["Zone", "Rule", "Typical Cost / Penalty"]} rows={[["Blue lines", "Paid parking", "\u20ac1-\u20ac2 per hour"], ["White lines", "Free parking", "Usually limited and quickly occupied"], ["Yellow lines", "No parking", "\u20ac80 fine"], ["Port fenced area", "No unauthorised parking", "Fine or towing"]]} />
          <p className="text-gray-700 mb-4 leading-relaxed">For drivers visiting Kos Town from Agios Stefanos, Alikes salt lake, or the airport road, a short walk from legal parking is usually cheaper than risking a ticket near the waterfront. If you are collecting a rental from AutoBank or IdealRentals, ask whether the car includes a local parking guide or app recommendation for central Kos.</p>
      </Section>

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Where Rental Insurance Becomes Void on Kos"
        alt
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Rental coverage on Kos usually starts with CDW and often upgrades to SCDW, FDW, or zero excess/full coverage, but every contract still contains exclusions. Standard insurers and brokers such as DiscoverCars, Booking, or Kayak typically note the same core exclusions: unpaved roads, ferry transport, and cross-border use outside Greece.</p>
          <DataTable headers={["Risk Area", "Coverage Impact", "Example on Kos"]} rows={[["Unpaved roads", "Insurance voided", "Cavo Paradiso, Agios Theologos, Limnionas access tracks"], ["Ferry transport", "Insurance voided during sea transit", "Kalymnos, Nisyros, or Rhodes by ferry"], ["Cross-border travel", "Contract breach", "Driving to Turkey via Bodrum"]]} />
          <p className="text-gray-700 mb-4 leading-relaxed">Unpaved access tracks are the most common mistake for beach trips, because routes to places such as Camel Beach, Paradise Beach, Therma Beach, Exotic Beach, and Lagada Beach can include gravel or dirt sections near the final approach. A Fiat Panda, Hyundai i10, Toyota Aygo, Citroen C1, or Kia Picanto can handle normal paved island roads, but rental companies still treat off-road use as a contract breach regardless of the model.</p>
          <WarningBox><p>💡 <strong>Tip:</strong> Ask the counter whether your quote is CDW, SCDW, or FDW, and confirm the deductible in euros before leaving KGS.  ⚠️ <strong>Warning:</strong> If a rental contract forbids gravel roads, the insurer can refuse a claim even when the damage is small and the car is otherwise drivable.</p></WarningBox>
      </Section>

      <ImageDivider image="/4.webp" alt="Kos car rental" />

      <Section
        icon={<Car className="w-6 h-6" />}
        title="What to Do If You Are Pulled Over in Kos"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">The Hellenic Police patrol roads between Kos Town, Antimachia, Kefalos, and the airport corridor, and a calm response usually keeps the stop short. If flashing blue lights appear behind you, slow down safely, stop where instructed, and keep your documents ready: licence, passport, rental agreement, and vehicle paperwork.</p>
          <p className="text-gray-700 mb-4 leading-relaxed">Police may issue a digital ticket that goes to the rental company later, while some checks can accept card payment at the roadside. If a dispute arises, the Hellenic Tourist Police can be reached by dialling 1571, and the Ministry of Tourism also accepts complaints by email at touristcomplaints@mintour.gr.</p>
          <p className="text-gray-700 mb-4 leading-relaxed">For a smoother handover, companies such as Autoway Kos, Trust Kos, and Ilias Rentals often provide the key pack with registration details and emergency contacts together, which helps if a stop happens near Zia, Mount Dikaios, or the road to Agios Theologos. If you need a wider rental comparison before booking, see our <a href="/kos-airport-car-rental" className="text-primary underline hover:text-accent">Kos airport car rental comparison</a> and our <a href="/kos-car-rental-faq" className="text-primary underline hover:text-accent">Kos car rental FAQ</a> for licence and deposit details.</p>
          <InfoBox><p>💡 <strong>Tip:</strong> Keep the rental agreement in the glove compartment, because roadside checks are faster when the officer can immediately see the vehicle registration and contract number.  💡 <strong>Tip:</strong> If you are collecting a Toyota Proace, Fiat Talento, Suzuki Jimny, Dacia Duster, Seat León, VW Taigo, Kia Stonic, Opel Corsa, Renault Clio, or Citroen C3, confirm the fuel policy and tyre cover at pickup so the stop does not become a later billing dispute.</p></InfoBox>
      </Section>

      <div className="flex justify-center pb-12">
        <a href="/#compare" className="cta-button">Compare Car Rental Deals</a>
      </div>
    </Layout>
  );
};

export default DrivingGuide;
