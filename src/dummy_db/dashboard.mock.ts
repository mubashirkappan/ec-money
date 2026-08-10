import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  History,
} from "lucide-react";

import {
  DashboardSummary,
  QuickAction,
  Transaction,
} from "../features/dashboard/types/dashboard.types";

export const summary: DashboardSummary = {
  balance: 125450,
  income: 15200,
  expense: 8400,
  pending: 4,
  transactions: 183,
  monthlyGrowth: 2.5,
};

export const quickActions: QuickAction[] = [
  {
    id: 1,
    title: "Send Money",
    description: "Transfer instantly",
    icon: ArrowUpRight,
    href: "/payments",
  },
  {
    id: 2,
    title: "Receive",
    description: "Receive funds",
    icon: ArrowDownLeft,
    href: "/wallet",
  },
  {
    id: 3,
    title: "Pay Bills",
    description: "Utility payments",
    icon: CreditCard,
    href: "/payments",
  },
  {
    id: 4,
    title: "History",
    description: "View transactions",
    icon: History,
    href: "/history",
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: 1,
    title: "Netflix",
    amount: -799,
    date: "Today",
    status: "Completed",
  },
  {
    id: 2,
    title: "Salary",
    amount: 45000,
    date: "Yesterday",
    status: "Completed",
  },
  {
    id: 3,
    title: "Electricity Bill",
    amount: -1850,
    date: "2 Jul",
    status: "Pending",
  },
];