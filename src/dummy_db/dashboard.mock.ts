import {
  Landmark, UsersRound, Wallet
} from "lucide-react";

import {
  QuickActionTypes,
} from "../features/user/user_dashboard/types/dashboard.types";

export const userQuickActions: QuickActionTypes[] = [
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

export const adminQuickActions: QuickActionTypes[] = [
  {
    id: 1,
    title: "Customers",
    description: "Manage customers",
    icon: UsersRound,
    href: "/customers",
  },
  {
    id: 2,
    title: "Wallet Credit",
    description: "View wallet credit",
    icon: Wallet,
    href: "/wallet-credit",
  },
];