export type Transaction = {
  id: number;
  party: string;
  amount: number;
  date: string;
  time: string;
  type: "debited" | "credited";
  status: "completed" | "pending" | "cancelled";
  note: string;
};