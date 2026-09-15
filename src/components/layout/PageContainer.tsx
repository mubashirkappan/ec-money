import { ReactNode } from "react";
import AppLayout from "./AppLayout";
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/common/AppSidebar"
import AppNavbar from "@/components/common/AppNavbar"

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
          {/* <AppSidebar /> */}
          <AppNavbar />
          {/* <div className="w-full min-w-0 px-4 py-2 mt-16"> */}
          <div className="w-full min-w-0 px-4 py-2 mt-16 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </AppLayout>
  );
}