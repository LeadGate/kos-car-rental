import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Airport", path: "/kos-airport-car-rental" },
  { label: "Driving Tips", path: "/driving-in-kos" },
  { label: "Beaches", path: "/kos-beaches-by-car" },
  { label: "Ferry", path: "/ferry-to-kos" },
  { label: "FAQ", path: "/kos-car-rental-faq" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy" },
];

const outboundLinks = [
  { label: "Kos International Airport (KGS)", url: "https://www.kgs-airport.gr/" },
  { label: "Visit Greece", url: "https://www.visitgreece.gr/" },
  { label: "Consumer Protection (INKA Dodecanese)", url: "https://inka12.gr/" },
];

const Footer = () => (
  <footer className="border-t border-border bg-secondary py-12">
    <div className="container">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="text-lg font-bold text-primary">Kos Car Rental</Link>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Independent comparison of Kos car rental deals. We publish methodology-driven reviews and warnings about predatory practices at Kos International Airport (KGS).
          </p>
          <a href="mailto:info@kos-car-rental.com" className="mt-3 inline-block text-sm text-primary hover:underline">
            info@kos-car-rental.com
          </a>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">Pages</h4>
          <nav className="flex flex-col gap-2">
            {footerLinks.map(link => (
              <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">Official Resources</h4>
          <nav className="flex flex-col gap-2">
            {outboundLinks.map(link => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-3">Editorial</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Legal references: Greek Law 4850/2021 (FEK A 208, 5 Nov 2021). Traffic rules: 2026 KOK update.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Tourist Police: <strong>1571</strong> (24/7)
          </p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground space-y-2">
        <p className="text-xs opacity-70">
          <strong>Affiliate disclosure:</strong> This site contains affiliate links to car rental partners. We may earn a commission when you book through these links at no extra cost to you. Partner relationships do not dictate which operators we recommend or warn against.
        </p>
        <p className="text-xs opacity-70">Last updated: April 2026</p>
        <p>&copy; {new Date().getFullYear()} kos-car-rental.com</p>
      </div>
    </div>
  </footer>
);

export default Footer;
