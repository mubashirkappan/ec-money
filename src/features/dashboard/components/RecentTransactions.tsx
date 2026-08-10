import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { transactions } from "@/dummy_db/dashboard.mock"
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import { cn } from "@/lib/utils";

export default function RecentTransactions() {

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 6);

  return (
    <Card className="p-5">

      <div className="flex items-end justify-between">
        <CardTitle>
          Recent Activity
        </CardTitle>

        <CardDescription>
          6 transactions
        </CardDescription>
      </div>

      <CardContent className="p-0">
        <ul className="divide-y divide-border">

          {recentTransactions.map((t) => {
            const transType = t.type;
            const amount = t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2,});
            return(
              <li key={t.id} className="py-2 flex justify-between">

                <div className="flex gap-2 items-center">

                  { transType === "credited"
                      ? <p className="size-10 bg-green-100 flex items-center justify-center rounded-md"><ArrowDownLeft className="size-6 text-green-700"/></p>
                      : <p className="size-10 bg-red-100 flex items-center justify-center rounded-md"><ArrowUpRight className="size-6 text-red-500"/></p>
                  }

                  <div className="grid">
                    <span className="font-semibold">{t.party}</span>
                    <span className="text-slate-400 text-xs">{t.note}</span>
                  </div>

                </div>

                <div className="grid">
                  <span className={cn(
                    "text-end font-semibold",
                    transType === "credited"
                      ? "text-green-700"
                      : "text-red-500"
                  )}>
                    { transType === "credited" ? "+" : "-"}₹{amount}
                  </span>
                  <span className="text-slate-400 text-xs text-end">{t.date}</span>
                </div>
                
              </li>
            )
          })}

        </ul>
      </CardContent>
      
    </Card>
  );
}