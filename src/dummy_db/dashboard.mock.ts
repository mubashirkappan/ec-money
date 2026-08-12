import {
  Landmark, HandCoins, UsersRound
} from "lucide-react";

import {
  DashboardSummary,
  QuickAction,
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
    icon: Landmark,
    href: "/payments",
  },
  {
    id: 2,
    title: "Beneficiaries",
    description: "View Beneficiaries",
    icon: UsersRound,
    href: "/beneficiary",
  },
];