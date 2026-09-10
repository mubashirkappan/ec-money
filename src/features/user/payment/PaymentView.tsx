"use client";

import { useState } from "react";

import PageContainer from "@/components/layout/PageContainer";
import PaymentHeader from "./components/PaymentHeader";
import PaymentCard from "./components/PaymentCard";
import PaymentSuccess from "./components/PaymentSuccess";

export default function PaymentView() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [dbUpdatedId, setDbUpdatedId] = useState<number | null>(null);

  return (
    <PageContainer>
      <div className="space-y-4">
        <PaymentHeader />

        {!paymentSuccess && (
          <PaymentCard onPaymentSuccess={(dbUpdateId: number) => {
            setDbUpdatedId(dbUpdateId);
            setPaymentSuccess(true);
          }} />
        )}

        {paymentSuccess && <PaymentSuccess dbUpdatedId={dbUpdatedId} />}
      </div>
    </PageContainer>
  );
}