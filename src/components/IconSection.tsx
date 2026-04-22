import { ReactNode } from "react";
import * as LucideIcons from "lucide-react";

interface IconSectionProps {
  icon?: string;
  title: string;
  alt?: boolean;
  children: ReactNode;
}

const IconSection = ({ icon, title, alt, children }: IconSectionProps) => {
  const IconComponent = icon
    ? (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[icon]
    : null;

  return (
    <section className={`py-12 md:py-16 ${alt ? "bg-section-alt" : "bg-background"}`}>
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
          {IconComponent && <IconComponent size={24} className="text-primary" />}
          {title}
        </h2>
        <div className="mt-6 space-y-4 text-foreground leading-relaxed max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
};

export default IconSection;
