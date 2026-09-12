"use client";

import PageContainer from "@/components/layout/PageContainer";



import DashboardHeader from "@/features/admin/admin_dashboard/components/DashboardHeader";
import WalletOverviewCard from "@/features/admin/admin_dashboard/components/WalletOverviewCard";
import QuickActions from "@/features/admin/admin_dashboard/components/QuickActions";
import RecentTransactions from "@/features/admin/admin_dashboard/components/RecentTransactions";
import FinancialOverview from "@/features/admin/admin_dashboard/components/FinancialOverview";

export default function AdminDashboardView() {

  return (
    <PageContainer>
      <div className="space-y-4">
      
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <WalletOverviewCard />

            <QuickActions />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <RecentTransactions />

          <FinancialOverview />

        </div>
  
      </div>
    </PageContainer>
  );
}