"use client";

import { securityPin } from "@/dummy_db/settings.mock";
import { transactions } from "@/dummy_db/transaction.mock";
import { TransactionData } from "../types/payment.types"
import { authCookies } from "@/lib/cookies";
import {users} from "@/dummy_db/users.mock";


function updateTransactionsDb(data: TransactionData) {
  const newTransaction = {
    id: transactions.length + 1,
    user: users[Number(authCookies.getUserId())],
    transactionId: data.transactionId,
    party: data.holderName,
    amount: data.amount,
    toAccountNumber: data.accountNumber,
    bankName: data.bankName,
    ifscCode: data.ifscCode,
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

  return newTransaction.id;
}

function verifyPaymentPin(pin: string) {
  return pin === String(securityPin.pin);
}

export function confirmPayment(data: TransactionData) {
  const isPinVerified = verifyPaymentPin(data.pin);

  if (isPinVerified) {
    const dbUpdateId = updateTransactionsDb(data);
    return dbUpdateId;
  }

  return false;
}