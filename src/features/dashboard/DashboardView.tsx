"use client";

import PageContainer from "@/components/layout/PageContainer";



import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import WalletBalanceCard from "@/features/dashboard/components/WalletBalanceCard";
import QuickActions from "@/features/dashboard/components/QuickActions";
import RecentTransactions from "@/features/dashboard/components/RecentTransactions";
import FinancialOverview from "@/features/dashboard/components/FinancialOverview";

export default function DashboardView() {

  return (
    <PageContainer>
      <div className="space-y-4">
      
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* <div className="space-y-4">
            <WalletBalanceCard />
            <QuickActions />
          </div> */}

          <FinancialOverview/>

          <div className="flex items-center justify-center rounded-xl border border-slate-200/700 dark:border-0 text-6xl">
            Coming Soon...
          </div>

        </div>
  
      </div>
    </PageContainer>
  );
}