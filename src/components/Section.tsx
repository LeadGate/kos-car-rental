import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  icon?: ReactNode;
  alt?: boolean;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, icon, alt, children, className = "" }: SectionProps) => (
  <section className={`py-12 md:py-16 ${alt ? "bg-section-alt" : "bg-background"} ${className}`}>
    <div className="container">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);

export default Section;
