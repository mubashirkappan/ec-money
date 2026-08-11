import { Card, CardContent } from "@/components/ui/card";
import { transactions } from "@/dummy_db/transaction.mock";
import {
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import TransactionsHeader from "./TransactionsHeader";

import { cn } from "@/lib/utils";

export default function TransactionsCard() {
  /*
   * Sort transactions by date + time
   * from newest → oldest.
   */
  const recentTransactions = [...transactions].sort(
    (a, b) =>
      new Date(`${b.date} ${b.time}`).getTime() -
      new Date(`${a.date} ${a.time}`).getTime()
  );

  /*
   * Group transactions by calendar date.
   *
   * Map preserves insertion order, so the
   * groups remain in the same descending
   * order as recentTransactions.
   */
  const groupedTransactions = new Map<
    string,
    typeof recentTransactions
  >();

  recentTransactions.forEach((transaction) => {
    if (!groupedTransactions.has(transaction.date)) {
      groupedTransactions.set(transaction.date, []);
    }

    groupedTransactions.get(transaction.date)!.push(transaction);
  });

  /*
   * Format:
   *
   * 10 Aug 2026
   * ↓
   * 10 August 2026 · Monday
   */
  function formatGroupDate(dateString: string) {
    const date = new Date(dateString);

    return {
      date: date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      day: date.toLocaleDateString("en-IN", {
        weekday: "long",
      }),
    };
  }

  return (
    <>
      <TransactionsHeader />

      <Card className="border-.5 border-slate-200/70 p-5">
        <CardContent className="p-0">
          <div>
            {Array.from(groupedTransactions.entries()).map(
              ([date, dayTransactions]) => {
                const formattedDate =
                  formatGroupDate(date);

                return (
                  <section key={date}>
                    {/* Date Header */}
                    <div className="border-y border-border py-3 px-3 bg-slate-300">
                      <p className="text-sm font-semibold text-slate-700 space-x-2">
                        {formattedDate.date}
                        <span className="text-slate-300">
                          ·
                        </span>
                        <span className="text-slate-500">
                          {formattedDate.day}
                        </span>
                      </p>
                    </div>

                    {/* Transactions for this date */}
                    <ul className="divide-y divide-border">
                      {dayTransactions.map((t) => {
                        const transType = t.type;

                        const amount =
                          t.amount.toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          );

                        return (
                          <li
                            key={t.id}
                            className="flex justify-between py-3 px-3"
                          >
                            {/* Left */}
                            <div className="flex max-w-1/2 items-center gap-2">
                              {transType === "credited" ? (
                                <p className="flex size-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                                  <ArrowDownLeft className="size-6" />
                                </p>
                              ) : (
                                <p className="flex size-10 items-center justify-center rounded-md bg-red-50 text-red-500">
                                  <ArrowUpRight className="size-6" />
                                </p>
                              )}

                              <div className="grid min-w-0">
                                <span className="truncate font-semibold">
                                  {t.party}
                                </span>

                                {t.note && (
                                  <span className="truncate text-xs text-slate-400">
                                    {t.note}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Right */}
                            <div className="grid max-w-1/2">
                              <span
                                className={cn(
                                  "text-end font-semibold",
                                  transType === "credited"
                                    ? "text-green-700"
                                    : "text-red-500"
                                )}
                              >
                                {transType === "credited"
                                  ? "+"
                                  : "-"}
                                ₹{amount}
                              </span>

                              <span className="text-end text-xs text-slate-400">
                                {t.time}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}