import * as LucideIcons from "lucide-react";

interface DocsListProps {
  title?: string;
  items: Array<{ icon?: string; label: string; text: string }>;
  alt?: boolean;
}

const DocsList = ({ title, items, alt }: DocsListProps) => {
  return (
    <section className={`py-12 md:py-16 ${alt ? "bg-section-alt" : "bg-background"}`}>
      <div className="container">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        )}
        <ul className="mt-6 space-y-4">
          {items.map((item) => {
            const IconComponent = item.icon
              ? (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[item.icon]
              : null;

            return (
              <li key={item.label} className="flex gap-4 items-start rounded-lg bg-secondary p-4">
                {IconComponent && (
                  <span className="text-primary mt-0.5">
                    <IconComponent size={20} />
                  </span>
                )}
                <div>
                  <strong className="text-foreground">{item.label}:</strong>{" "}
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default DocsList;
