"use client";

import PageContainer from "@/components/layout/PageContainer";
import WalletCreditCard from "./components/WalletCreditCard";

export default function WalletCreditView() {

  return (
    <PageContainer>
      <div className="space-y-4">
      
        <WalletCreditCard />
  
      </div>
    </PageContainer>
  );
}