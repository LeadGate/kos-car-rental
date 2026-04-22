import type { ReactNode } from "react";

interface HeroDiagonalProps {
  title: string;
  backgroundImage: string;
  backgroundAlt?: string;
  children?: ReactNode;
}

/**
 * HeroDiagonal — full-width hero with background image and dark overlay.
 * NO CTA button inside the hero — CTAs belong at the bottom of the page.
 */
const HeroDiagonal = ({
  title,
  backgroundImage,
  backgroundAlt,
  children,
}: HeroDiagonalProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <img
        src={backgroundImage}
        alt={backgroundAlt || ""}
        width={1600}
        height={900}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="container max-w-4xl text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold hero-text mb-6">
          {title}
        </h1>
        {children && (
          <div className="mt-6 text-white/90 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroDiagonal;
