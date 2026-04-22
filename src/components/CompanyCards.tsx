import * as LucideIcons from "lucide-react";

interface CompanyCardsProps {
  title?: string;
  icon?: string;
  companies: Array<{ name: string; description: string }>;
  alt?: boolean;
}

const CompanyCards = ({ title, icon, companies, alt }: CompanyCardsProps) => {
  const IconComponent = icon
    ? (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[icon]
    : null;

  return (
    <div className={alt ? "mt-10" : "mt-8"}>
      {title && (
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          {IconComponent && <IconComponent size={20} className="text-primary" />}
          {title}
        </h3>
      )}
      <ul className="mt-4 space-y-3">
        {companies.map((c) => (
          <li key={c.name} className="rounded-lg bg-card p-4 shadow-card">
            <strong className="text-primary">{c.name}:</strong>{" "}
            <span className="text-foreground">{c.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyCards;
