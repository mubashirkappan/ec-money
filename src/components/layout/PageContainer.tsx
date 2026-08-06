import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main className="flex-1 overflow-auto bg-muted/30 p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        {children}
      </div>
    </main>
  );
}