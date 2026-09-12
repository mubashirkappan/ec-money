import { CustomerTypes } from "../../customers/types/customer.types";

type WalletCreditStatus = "Pending" | "Completed" | "Cancelled"

export interface WalletCreditTypes {
  id: number;
  customer: CustomerTypes;
  amount: number;
  date: string;
  time: string;
  status: WalletCreditStatus;
  note?: string;
}