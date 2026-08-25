import {
  Landmark, UsersRound
} from "lucide-react";

import {
  QuickActionTypes,
} from "../features/user/user_dashboard/types/dashboard.types";

export const quickActions: QuickActionTypes[] = [
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