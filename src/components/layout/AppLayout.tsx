import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    // <div className="min-h-screen bg-background">
    <div className="h-screen overflow-y-auto bg-background">
      {children}
    </div>
  );
}