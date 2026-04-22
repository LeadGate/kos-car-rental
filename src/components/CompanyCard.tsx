import { ReactNode } from "react";

interface CompanyCardProps {
  children: ReactNode;
}

const CompanyCard = ({ children }: CompanyCardProps) => (
  <div className="rounded-lg border-l-4 border-primary bg-card shadow-sm p-5 my-3">
    {children}
  </div>
);

export default CompanyCard;
