"use client";

import PageContainer from "@/components/layout/PageContainer";
import CustomersCard from "./components/CustomersCard";

export default function CustomersView() {

  return (
    <PageContainer>
      <div className="space-y-4">
      
        <CustomersCard />
  
      </div>
    </PageContainer>
  );
}