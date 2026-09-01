import { UserDetailsTypes } from "@/types/user.types";

type TransactionType = "debited" | "credited"
type TransactionStatus = "pending" | "completed" | "cancelled"

export interface TransactionTypes {
  id: number
  user: UserDetailsTypes
  transactionId: string
  party: string
  amount: number
  date: string
  time: string
  type: TransactionType
  status: TransactionStatus
  note?: string
}