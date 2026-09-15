"use client";

import PageContainer from "@/components/layout/PageContainer";
import CustomerDetailsCard from "./components/CustomerDetailsCard";

interface CustomerDetailsViewProps {
  customerId: string;
}

export default function CustomerDetailsView({
  customerId,
}: CustomerDetailsViewProps) {
  return (
    <PageContainer>
      <div className="h-full space-y-4">
        <CustomerDetailsCard customerCode={customerId} />
      </div>
    </PageContainer>
  );
}