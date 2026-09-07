"use client";

import { securityPin } from "@/dummy_db/settings.mock";
import { transactions } from "@/dummy_db/transaction.mock";
import { PaymentData } from "../types/payment.types"
import { authCookies } from "@/lib/cookies";
import {users} from "@/dummy_db/users.mock";


function updateTransactionsDb(data: PaymentData) {
  const newTransaction = {
    id: transactions.length + 1,
    user: users[Number(authCookies.getUserId())],
    transactionId: String(Date.now()),
    party: data.holderName,
    amount: data.amount,
    toAccountNumber: data.accountNumber,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    type: "debited" as const,
    status: "Success" as const,
    note: "Money transfer",
  };

  transactions.push(newTransaction);
}

function verifyPaymentPin(pin: string) {
  return pin === String(securityPin.pin);
}

export function confirmPayment(data: PaymentData) {
  const isPinVerified = verifyPaymentPin(data.pin);

  if (isPinVerified) {
    updateTransactionsDb(data);
    return true;
  }

  return false;
}