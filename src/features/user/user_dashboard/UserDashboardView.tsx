"use client";

import PageContainer from "@/components/layout/PageContainer";



import DashboardHeader from "@/features/user/user_dashboard/components/DashboardHeader";
import WalletBalanceCard from "@/features/user/user_dashboard/components/WalletBalanceCard";
import QuickActions from "@/features/user/user_dashboard/components/QuickActions";
import RecentTransactions from "@/features/user/user_dashboard/components/RecentTransactions";
import FinancialOverview from "@/features/user/user_dashboard/components/FinancialOverview";

export default function UserDashboardView() {

  return (
    <PageContainer>
      <div className="space-y-4">
      
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <WalletBalanceCard />

            <QuickActions />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <RecentTransactions/>

          <FinancialOverview/>

        </div>
  
      </div>
    </PageContainer>
  );
}