import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Airport", path: "/kos-airport-car-rental" },
  { label: "Driving Tips", path: "/driving-in-kos" },
  { label: "Beaches", path: "/kos-beaches-by-car" },
  { label: "Ferry", path: "/ferry-to-kos" },
  { label: "FAQ", path: "/kos-car-rental-faq" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  // Auto-focus close button when panel opens
  useEffect(() => {
    if (open) {
      const close = panelRef.current?.querySelector<HTMLElement>("button");
      close?.focus();
    }
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary" onClick={() => setOpen(false)}>
          Kos Car Rental
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                location.pathname === item.path ? "text-primary bg-secondary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          ref={triggerRef}
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>

      {/* Mobile slide-in menu — outside header to avoid stacking context issues */}
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={handleKeyDown}
        className={`md:hidden fixed inset-y-0 right-0 z-[70] w-72 max-w-[80vw] bg-background shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button
            onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
            className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col px-4 gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
