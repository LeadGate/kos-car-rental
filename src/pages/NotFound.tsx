import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEOHead from "../components/SEOHead";

const NotFound = () => (
  <Layout>
    <SEOHead
      title="Page Not Found — Kos Car Rental"
      description="The page you are looking for does not exist."
      canonical="https://kos-car-rental.com/404"
      noindex={true}
    />
    <div className="container py-24 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  </Layout>
);

export default NotFound;
