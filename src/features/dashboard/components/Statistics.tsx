import {
  Wallet,
  ArrowDownCircle,
  Clock3,
  Receipt,
} from "lucide-react";

import StatCard from "./StatCard";
import { summary } from "../../../dummy_db/dashboard.mock";

export default function Statistics() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Income"
        value={`₹${summary.income.toLocaleString()}`}
        icon={Wallet}
      />

      <StatCard
        title="Expense"
        value={`₹${summary.expense.toLocaleString()}`}
        icon={ArrowDownCircle}
      />

      <StatCard
        title="Pending"
        value={summary.pending}
        icon={Clock3}
      />

      <StatCard
        title="Transactions"
        value={summary.transactions}
        icon={Receipt}
      />

    </div>
  );
}