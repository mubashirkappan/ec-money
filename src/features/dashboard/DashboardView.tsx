"use client";

import PageContainer from "@/components/layout/PageContainer";



import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import WalletBalanceCard from "@/features/dashboard/components/WalletBalanceCard";
import QuickActions from "@/features/dashboard/components/QuickActions";
import RecentTransactions from "@/features/dashboard/components/RecentTransactions";

export default function DashboardView() {

  return (
    <PageContainer>
      <div className="space-y-12">
      
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="space-y-4">
            <WalletBalanceCard />
            <QuickActions />
          </div>

          <div>
            <RecentTransactions/>
          </div>

        </div>
  
      </div>
    </PageContainer>
  );
}