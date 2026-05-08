import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

// Mobile-resilience pattern (memory: feedback_widget_mobile_resilience.md, 2026-05-08)
// - requestIdleCallback defer (LCP/CLS budget)
// - omit `&city=` when target city is not in Localrent widget API catalog
//   (empty value → mobile picker; affiliate dashboard sample omits the key)
// - visible fallback link to www.localrent.com for Telegram WebView / Safari ITP
//   environments that block tpembd.com
// - 8s descendant-count failure detector (widget renders via <div>+<a> only,
//   so iframe/input/button/form selectors do NOT work)
const WIDGET_SRC =
  "https://tpembd.com/content?trs=517071&shmarker=713621.kos-car-rental&country=18&city=334621&lang=en&width=100&background=transparent&logo=false&header=false&gearbox=false&cars=false&border=false&footer=false&campaign_id=87&promo_id=4322";

const FALLBACK_URL = "https://www.localrent.com/en/greece/kos/?marker=713621.kos";
const FALLBACK_LABEL = "Or browse all Kos rentals on Localrent →";

const AffiliateWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = containerRef.current;
    if (!node) return;
    if (node.querySelector("script")) return;

    const load = () => {
      if (!containerRef.current) return;
      const script = document.createElement("script");
      script.async = true;
      script.src = WIDGET_SRC;
      script.charset = "utf-8";
      script.onerror = () => setScriptFailed(true);
      containerRef.current.appendChild(script);
      window.setTimeout(() => {
        if (!containerRef.current) return;
        if (containerRef.current.querySelectorAll("*").length < 6) {
          setScriptFailed(true);
        }
      }, 8000);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(load, { timeout: 2000 });
    } else {
      window.setTimeout(load, 1500);
    }
  }, []);

  return (
    <section className="py-8" id="compare-cars">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-background rounded-lg p-6 text-center border border-border shadow-sm">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Search className="text-primary" size={24} />
            <h3 className="text-lg font-bold m-0">Search &amp; Compare Kos Car Rentals</h3>
          </div>
          <div
            ref={containerRef}
            className="my-4 rounded-lg max-w-3xl mx-auto overflow-visible"
          />
          {scriptFailed && (
            <p className="text-muted-foreground text-sm mb-2">
              Widget couldn't load. Use the direct link below.
            </p>
          )}
          <p className="text-muted-foreground text-xs italic mt-3">
            Free cancellation on most vehicles
          </p>
          <p className="text-sm mt-3">
            <a
              href={FALLBACK_URL}
              target="_blank"
              rel="noopener nofollow sponsored"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              {FALLBACK_LABEL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AffiliateWidget;
