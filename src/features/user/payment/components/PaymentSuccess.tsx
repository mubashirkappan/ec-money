"use client";

import { useRef, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  CircleCheckBigIcon,
  type CircleCheckBigIconHandle,
} from "lucide-animated";

import { TransactionReceiptView } from "@/features/user/transactions/components/TransactionReceipt";
import { transactions } from "@/dummy_db/transaction.mock";

interface PaymentSuccessProps {
  dbUpdatedId: number | null;
}

export default function PaymentSuccess({
  dbUpdatedId,
}: PaymentSuccessProps) {
  const iconRef = useRef<CircleCheckBigIconHandle>(null);

  const [receiptOpen, setReceiptOpen] = useState(false);

  useEffect(() => {
    iconRef.current?.startAnimation();
  }, []);

  const selectedTransaction =
    dbUpdatedId !== null
      ? transactions.find(
          (transaction) => transaction.id === dbUpdatedId
        ) ?? null
      : null;

  return (
    <Card className="border-.5 border-slate-200/70 p-5">
      <CardContent className="grid justify-center space-y-4">
        <h1 className="text-3xl font-medium">Payment Success</h1>

        <CircleCheckBigIcon
          size={80}
          ref={iconRef}
          animateOnHover={false}
          className="text-green-600 justify-self-center"
        />

        {selectedTransaction && (
          <>
            <Button
              type="button"
              onClick={() => setReceiptOpen(true)}
            >
              Download Receipt
            </Button>

            <TransactionReceiptView
              transaction={selectedTransaction}
              open={receiptOpen}
              onOpenChange={setReceiptOpen}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}