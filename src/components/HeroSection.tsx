import type { ReactNode } from "react";
import HeroDiagonal from "./HeroDiagonal";

interface HeroSectionProps {
  title: string;
  subtitle?: ReactNode;
  image?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  children?: ReactNode;
}

/**
 * HeroSection — universal hero wrapper.
 *
 * IMPORTANT: ctaText/ctaHref are accepted for backward compatibility but
 * intentionally NOT rendered inside the hero. Page-level CTAs must live
 * at the bottom of the page (after content), so the hero stays clean and
 * readable on top of the background photo.
 */
const HeroSection = ({ title, subtitle, image, imageAlt, children }: HeroSectionProps) => {
  return (
    <HeroDiagonal
      title={title}
      backgroundImage={image || "/1.webp"}
      backgroundAlt={imageAlt || title}
    >
      {subtitle || children}
    </HeroDiagonal>
  );
};

export default HeroSection;
