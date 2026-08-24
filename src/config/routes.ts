import {
  CreditCard,
  History,
  LayoutDashboard,
  Settings,
  UserRoundPlus,
} from "lucide-react";

export const mainNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Send Money",
    href: "/payment",
    icon: CreditCard,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: History,
  },
  {
    name: "Beneficiary",
    href: "/beneficiaries",
    icon: UserRoundPlus,
  },
];

export const settingsNavigation = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  }
];