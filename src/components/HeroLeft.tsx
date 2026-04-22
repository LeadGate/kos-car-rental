import { ShieldCheck } from "lucide-react";

interface HeroLeftProps {
  title: string;
  badges?: Array<{ icon: string; text: string }>;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage: string;
  backgroundAlt?: string;
}

const HeroLeft = ({
  title,
  badges = [],
  ctaText,
  ctaHref = "#compare",
  backgroundImage,
  backgroundAlt = "",
}: HeroLeftProps) => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={backgroundImage}
        alt={backgroundAlt}
        width={1920}
        height={1088}
        loading="eager"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />
    </div>
    <div className="container relative py-20 md:py-28">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
          {title}
        </h1>
        {badges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {badges.map((badge) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm"
              >
                <ShieldCheck size={16} /> {badge.text}
              </span>
            ))}
          </div>
        )}
        {ctaText && (
          <a
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-bold text-accent-foreground shadow-lg hover:opacity-90 transition-opacity"
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  </section>
);

export default HeroLeft;
