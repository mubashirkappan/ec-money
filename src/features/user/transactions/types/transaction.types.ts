import { UserDetailsTypes } from "@/types/user.types";

type TransactionType = "debited" | "credited"
type TransactionStatus = "Pending" | "Success" | "Cancelled"

export interface TransactionTypes {
  id: number
  user: UserDetailsTypes
  transactionId: string
  party: string
  amount: number
  toAccountNumber?: string
  bankName?: string
  ifscCode?: string
  date: string
  time: string
  type: TransactionType
  status: TransactionStatus
  note?: string
}