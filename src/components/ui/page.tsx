import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Page({
  children,
  className,
}: Props) {
  return (
    <main
      className={cn(
        "min-h-screen bg-slate-50",
        className
      )}
    >
      {children}
    </main>
  );
}