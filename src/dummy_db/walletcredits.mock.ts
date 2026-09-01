import { WalletCreditTypes } from "@/features/admin/wallet_credit/types/walletcredit.types";
import { customers } from "./customers.mock";

export const walletCredits: WalletCreditTypes[] = [
  {
    id: 1,
    customer: customers[0],
    amount: 1000,
    date: "2026-08-13",
    time: "14:32:00",
    status: "pending",
    note: "Wallet Credit"
  },
]