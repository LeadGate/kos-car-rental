import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumb" className="container py-3">
    <ol className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
      <li>
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
      </li>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1">
          <ChevronRight size={14} />
          {item.path ? (
            <Link to={item.path} className="hover:text-primary transition-colors">{item.label}</Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
