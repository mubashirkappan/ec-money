"use client";

import PageContainer from "@/components/layout/PageContainer";
import PaymentCard from "./components/PaymentCard";

export default function PaymentView() {

  return (
    <PageContainer>
      <div className="space-y-4">
      
        <PaymentCard />
  
      </div>
    </PageContainer>
  );
}