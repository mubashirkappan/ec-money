import { ReactNode } from "react";
import AppLayout from "./AppLayout";
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/common/AppSidebar"

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <AppLayout>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full min-w-0 p-4">
            {children}
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </AppLayout>
  );
}