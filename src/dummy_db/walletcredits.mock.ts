import { WalletCreditTypes } from "@/features/admin/wallet_credit/types/walletcredit.types";

import { customers } from "./customers.mock";

export const walletCredits: WalletCreditTypes[] = [
  {
    id: 1,
    customer: customers[0],
    amount: 1000,
    date: "13 Aug 2026",
    time: "2:32 PM",
    status: "Pending",
    note: "Wallet Credit",
  },

  {
    id: 2,
    customer: customers[1],
    amount: 2500,
    date: "14 Jun 2026",
    time: "9:18 AM",
    status: "Completed",
    note: "Wallet Credit",
  },

  {
    id: 3,
    customer: customers[2],
    amount: 750,
    date: "15 Aug 2026",
    time: "4:45 PM",
    status: "Completed",
    note: "Wallet Credit",
  },

  {
    id: 4,
    customer: customers[0],
    amount: 5000,
    date: "18 Aug 2026",
    time: "11:24 AM",
    status: "Completed",
    note: "Wallet Credit",
  },

  {
    id: 5,
    customer: customers[1],
    amount: 1500,
    date: "20 Aug 2026",
    time: "1:56 PM",
    status: "Pending",
    note: "Wallet Credit",
  },

  {
    id: 6,
    customer: customers[2],
    amount: 3200,
    date: "22 Aug 2026",
    time: "10:12 AM",
    status: "Cancelled",
    note: "Wallet Credit",
  },

  {
    id: 7,
    customer: customers[0],
    amount: 1800,
    date: "25 Jan 2026",
    time: "3:38 PM",
    status: "Completed",
    note: "Wallet Credit",
  },

  {
    id: 8,
    customer: customers[1],
    amount: 4500,
    date: "28 Aug 2026",
    time: "12:07 PM",
    status: "Completed",
    note: "Wallet Credit",
  },

  {
    id: 9,
    customer: customers[2],
    amount: 900,
    date: "02 Sep 2026",
    time: "5:21 PM",
    status: "Pending",
    note: "Wallet Credit",
  },

  {
    id: 10,
    customer: customers[0],
    amount: 2750,
    date: "05 Sep 2026",
    time: "10:30 PM",
    status: "Completed",
    note: "Wallet Credit",
  },
];