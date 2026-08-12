export type TransactionType = "debited" | "credited"
export type TransactionStatus = "completed" | "cancelled"

export interface Transaction {
  id: number
  party: string
  amount: number
  date: string
  time: string
  type: TransactionType
  status: TransactionStatus
  note: string
}