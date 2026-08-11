import {
  Landmark, HandCoins, ScrollText, PlusCircle
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
    title: "Top Up",
    description: "Add to wallet",
    icon: PlusCircle,
    href: "/history",
  },
  {
    id: 2,
    title: "Send Money",
    description: "Transfer instantly",
    icon: Landmark,
    href: "/payments",
  },
  {
    id: 3,
    title: "Request Money",
    description: "Request others",
    icon: HandCoins,
    href: "/request",
  },
  {
    id: 4,
    title: "Pay Bills",
    description: "Utility payments",
    icon: ScrollText,
    href: "/payments",
  },
];