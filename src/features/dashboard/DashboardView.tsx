"use client";

import PageContainer from "@/components/layout/PageContainer";



import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import WalletBalanceCard from "@/features/dashboard/components/WalletBalanceCard";
import QuickActions from "@/features/dashboard/components/QuickActions";
import Statistics from "@/features/dashboard/components/Statistics";

export default function DashboardView() {

  return (
    <PageContainer>
      <div className="space-y-8">
      
        <DashboardHeader />
  
        <div className="grid gap-6 xl:grid-cols-3">
  
          <div className="xl:col-span-2">
            <WalletBalanceCard />
          </div>
  
          <QuickActions />
  
        </div>
  
        <Statistics />
  
      </div>
    </PageContainer>
  );
}