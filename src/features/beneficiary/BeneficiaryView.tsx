"use client";

import PageContainer from "@/components/layout/PageContainer";
import BeneficiaryCard from "./components/BeneficiaryCard";

export default function BeneficiaryView() {

  return (
    <PageContainer>
      <div className="space-y-4">
      
        <BeneficiaryCard />
  
      </div>
    </PageContainer>
  );
}