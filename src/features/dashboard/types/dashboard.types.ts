import { LucideIcon } from "lucide-react";

export interface DashboardSummary {
  balance: number;
  income: number;
  expense: number;
  pending: number;
  transactions: number;
  monthlyGrowth: number;
}

export interface QuickAction {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}