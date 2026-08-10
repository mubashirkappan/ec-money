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

export type Transaction = {
  id: number;
  party: string;
  amount: float;
  date: string;
  type: "debited" | "credited";
  status: "completed" | "pending" | "cancelled";
  note: string;
};