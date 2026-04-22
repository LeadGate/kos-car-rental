interface CardGrid3ColProps {
  title?: string;
  items: Array<{ icon?: string; title: string; description: string }>;
  alt?: boolean;
}

const CardGrid3Col = ({ title, items, alt }: CardGrid3ColProps) => (
  <section className={`py-12 md:py-16 ${alt ? "bg-section-alt" : "bg-background"}`}>
    <div className="container">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      )}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-lg bg-card p-6 shadow-card">
            {item.icon && <div className="text-3xl mb-3">{item.icon}</div>}
            <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CardGrid3Col;
