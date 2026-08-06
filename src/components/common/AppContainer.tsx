import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppContainerProps {
  children: ReactNode;
  className?: string;
}

export default function AppContainer({
  children,
  className,
}: AppContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}