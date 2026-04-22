import { useEffect, useRef } from "react";

// Localrent affiliate widget for Kos car rental (kos-car-rental.com).
// country=18 (Greece), city=334621 (Kos island). Verified via widget API 2026-04-22.
// Kos International Airport id = 549047 (also catalog-confirmed).
const AffiliateWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || injectedRef.current) return;
    injectedRef.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "https://tpembd.com/content?trs=517071&shmarker=713621.kos-car-rental&country=18&city=334621&lang=en&width=100&background=transparent&logo=false&header=false&gearbox=false&cars=false&border=false&footer=false&campaign_id=87&promo_id=4322";
    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="container mx-auto max-w-5xl px-4 py-8" id="compare-cars">
      <div
        ref={containerRef}
        className="rounded-lg bg-card shadow-sm p-2"
        style={{ minHeight: 180 }}
      />
    </section>
  );
};

export default AffiliateWidget;
