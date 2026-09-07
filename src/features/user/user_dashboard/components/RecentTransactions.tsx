"use client";

import Link from "next/link";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { transactions } from "@/dummy_db/transaction.mock"
import { ArrowDownLeft, ArrowUpRight, ArrowRight } from 'lucide-react'

import { cn } from "@/lib/utils";
import { authCookies } from "@/lib/cookies";
import { formatCurrency } from "@/utils/formatCurrency";

export default function RecentTransactions() {

  const userId = Number(authCookies.getUserId());

  const recentTransactions = [...transactions]
    .filter((transaction) => transaction.user.id === userId)
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
          href="/transactions"
          className="flex items-center gap-1 border-b border-blue-500 text-blue-500! hover:text-blue-800! hover:border-blue-800"
        >
          View all
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <CardContent className="p-0">
        <ul className="divide-y divide-border">

          {recentTransactions.map((transaction) => {
            console.log(
              "transaction user:",
              transaction.user.id,
              "current user:",
              userId,
              "transaction:",
              transaction
            );
            const transType = transaction.type;
            const amount = formatCurrency(transaction.amount);
            return(
              <li key={transaction.id} className="py-2 flex justify-between">

                <div className="flex gap-2 items-center max-w-1/2">

                  { transType === "credited"
                      ? <p className="size-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-md"><ArrowDownLeft className="size-6"/></p>
                      : <p className="size-10 bg-red-50 text-red-500 flex items-center justify-center rounded-md"><ArrowUpRight className="size-6"/></p>
                  }

                  <div className="grid">
                    <span className="font-semibold">{transaction.party}</span>
                    <span className="text-slate-400 text-xs">{transaction.note}</span>
                  </div>

                </div>

                <div className="grid max-w-1/2">
                  <span className={cn(
                    "text-end font-semibold",
                    transType === "credited"
                      ? "text-green-700"
                      : "text-red-500"
                  )}>
                    { transType === "credited" ? "+" : "-"} ₹{amount}
                  </span>
                  <span className="text-slate-400 text-xs text-end">{transaction.date} {transaction.time}</span>
                </div>
                
              </li>
            )
          })}

        </ul>
      </CardContent>
      
    </Card>
  );
}