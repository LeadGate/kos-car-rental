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

const Footer = () => (
  <footer className="border-t border-border bg-secondary py-12">
    <div className="container">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="text-lg font-bold text-primary">Kos Car Rental</Link>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            This site contains affiliate links. We may earn a commission at no extra cost to you. This site provides information only and does not operate a car rental fleet.
          </p>
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
          <h4 className="font-bold text-foreground mb-3">Contact</h4>
          <a href="mailto:info@kos-car-rental.com" className="text-sm text-primary hover:underline">
            info@kos-car-rental.com
          </a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} kos-car-rental.com</p>
        <p className="mt-1 text-xs opacity-70">Last updated: April 2026</p>
      </div>
    </div>
  </footer>
);

export default Footer;
