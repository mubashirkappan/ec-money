import {
  CreditCard,
  History,
  LayoutDashboard,
  Settings,
  UserRoundPlus,
} from "lucide-react";
import { ROUTES } from '@/constants/routes'

export const userNavigation = [
  {
    name: ROUTES.DASHBAORD.displayName,
    href: ROUTES.DASHBAORD.path,
    icon: LayoutDashboard,
  },
  {
    name: ROUTES.SEND_MONEY.displayName,
    href: ROUTES.SEND_MONEY.path,
    icon: CreditCard,
  },
  {
    name: ROUTES.TRANSACTIONS.displayName,
    href: ROUTES.TRANSACTIONS.path,
    icon: History,
  },
  {
    name: ROUTES.BENEFICIARY.displayName,
    href: ROUTES.BENEFICIARY.path,
    icon: UserRoundPlus,
  },
];

export const adminNavigation = [
  {
    name: ROUTES.DASHBAORD.displayName,
    href: ROUTES.DASHBAORD.path,
    icon: LayoutDashboard,
  },
  {
    name: ROUTES.CUSTOMERS.displayName,
    href: ROUTES.CUSTOMERS.path,
    icon: LayoutDashboard,
  },
  {
    name: ROUTES.WALLET_CREDIT.displayName,
    href: ROUTES.WALLET_CREDIT.path,
    icon: CreditCard,
  },
];

export const settingsNavigation = [
  {
    name: ROUTES.SETTINGS.displayName,
    href: ROUTES.SETTINGS.path,
    icon: Settings,
  }
];

export const profileNavigation = [
  {
    name: ROUTES.PROFILE.displayName,
    href: ROUTES.PROFILE.path,
    icon: Settings,
  }
];