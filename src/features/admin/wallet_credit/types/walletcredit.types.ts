import { CustomerTypes } from "../../customers/types/customer.types";

type WalletCreditStatus = "pending" | "completed" | "cancelled"

export interface WalletCreditTypes {
  id: number;
  customer: CustomerTypes;
  amount: number;
  date: string;
  time: string;
  status: WalletCreditStatus;
  note?: string;
}