"use client";

import PageContainer from "@/components/layout/PageContainer";
import TransactionsCard from "./components/TransactionsCard";

export default function TransactionsView() {

  return (
    <PageContainer>
      <div className="space-y-4">
      
        <TransactionsCard />
  
      </div>
    </PageContainer>
  );
}