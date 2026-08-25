"use client";

import { useState } from "react";

import PageContainer from "@/components/layout/PageContainer";
import PaymentHeader from "./components/PaymentHeader";
import PaymentCard from "./components/PaymentCard";
import PaymentSuccess from "./components/PaymentSuccess";

export default function PaymentView() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <PageContainer>
      <div className="space-y-4">
        <PaymentHeader />

        {!paymentSuccess && (
          <PaymentCard onPaymentSuccess={() => setPaymentSuccess(true)} />
        )}

        {paymentSuccess && <PaymentSuccess />}
      </div>
    </PageContainer>
  );
}