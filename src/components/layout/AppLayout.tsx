import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PageContainer from "./PageContainer";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}