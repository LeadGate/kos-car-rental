import { ReactNode } from "react";

export const InfoBox = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border-l-4 border-info-border bg-info-bg p-4 my-4">
    {children}
  </div>
);

export const WarningBox = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border-l-4 border-warning-border bg-warning-bg p-4 my-4">
    {children}
  </div>
);
