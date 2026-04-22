interface CardItem {
  icon?: string;
  title: string;
  subtitle?: string;
  description: string;
}

interface CardGridProps {
  items: CardItem[];
  columns?: 2 | 3;
}

const CardGrid = ({ items, columns = 3 }: CardGridProps) => (
  <div className={`grid gap-4 my-6 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
    {items.map((item, i) => (
      <div key={i} className="rounded-xl bg-card shadow-sm border border-border p-6">
        {item.icon && <span className="text-3xl mb-3 block">{item.icon}</span>}
        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
        {item.subtitle && (
          <p className="text-sm font-semibold text-muted-foreground mb-2">{item.subtitle}</p>
        )}
        <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
      </div>
    ))}
  </div>
);

export default CardGrid;
