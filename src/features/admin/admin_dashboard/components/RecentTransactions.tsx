import Link from "next/link";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { walletCredits } from "@/dummy_db/walletcredits.mock"
import { ArrowUpRight, ArrowRight } from 'lucide-react'

import { formatCurrency } from "@/utils/formatCurrency";

import { ROUTES } from "@/constants/routes"

export default function RecentTransactions() {

  const recentTransactions = [...walletCredits]
    .sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`).getTime() -
        new Date(`${a.date} ${a.time}`).getTime()
    )
    .slice(0, 6);

  return (
    <Card className="p-5 border-.5 border-slate-200/70">

      <div className="flex items-end justify-between">
        <CardTitle>
          Recent Activity
        </CardTitle>

        <Link
          href={ROUTES.WALLET_CREDIT.path}
          className="flex items-center gap-1 border-b border-blue-500 text-blue-500! hover:text-blue-800! hover:border-blue-800"
        >
          View all
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <CardContent className="p-0">
        <ul className="divide-y divide-border">

          {recentTransactions.map((t) => {
            const amount = formatCurrency(t.amount);
            return(
              <li key={t.id} className="py-2 flex justify-between">

                <div className="flex gap-2 items-center max-w-1/2">

                  <p className="size-10 bg-red-50 text-red-500 flex items-center justify-center rounded-md"><ArrowUpRight className="size-6"/></p>

                  <div className="grid">
                    <span className="font-semibold">{t.customer.customerName}</span>
                    <span className="text-slate-400 text-xs">{t.note}</span>
                  </div>

                </div>

                <div className="grid max-w-1/2">
                  <span className= "text-end font-semibold text-red-500">
                    - ₹{amount}
                  </span>
                  <span className="text-slate-400 text-xs text-end">{t.date} {t.time}</span>
                </div>
                
              </li>
            )
          })}

        </ul>
      </CardContent>
      
    </Card>
  );
}