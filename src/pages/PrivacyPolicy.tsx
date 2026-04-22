import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEOHead title="Privacy Policy — Kos Car Rental"
        description="Privacy policy for Kos Car Rental. Learn how we handle your data and protect your privacy."
        canonical="https://kos-car-rental.com/privacy"
        noindex
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy | Kos Car Rental",
          "url": "https://kos-car-rental.com/privacy"
        }]}
      />

      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <Section
        icon={<Shield className="w-6 h-6" />}
        title="Privacy Policy"
      >
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Your privacy matters to us. This page outlines how Kos Car Rental collects, uses, and protects your information.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Information We Collect</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We do not collect personal data directly. When you use our comparison widget to search for or book a rental car, your data is processed by our affiliate partners according to their own privacy policies.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Cookies</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          This website may use cookies for analytics and to improve your browsing experience. Third-party services embedded on this site (such as booking widgets) may also set cookies. You can manage cookie preferences in your browser settings.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Analytics</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We may use privacy-focused analytics tools to understand how visitors use our website. This data is aggregated and does not identify individual users.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Third-Party Links</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Our website contains links to external sites. We are not responsible for the privacy practices or content of these third-party sites.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Contact</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          If you have questions about this privacy policy, please contact us at <a href="mailto:info@kos-car-rental.com" className="text-primary hover:underline">info@kos-car-rental.com</a>.
        </p>
      </Section>
    </Layout>
  );
};

export default PrivacyPolicy;
