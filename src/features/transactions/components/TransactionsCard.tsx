"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { transactions } from "@/dummy_db/transaction.mock";

import {
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import TransactionsHeader, {
  TransactionFilters,
} from "./TransactionsHeader";

import { cn } from "@/lib/utils";

export default function TransactionsCard() {
  const [filters, setFilters] =
    useState<TransactionFilters>({
      search: "",
      fromDate: "",
      toDate: "",
      transactionType: "all",
      fromAmount: "",
      toAmount: "",
    });


  function handleClearFilters() {
    setFilters({
      search: "",
      fromDate: "",
      toDate: "",
      transactionType: "all",
      fromAmount: "",
      toAmount: "",
    });
  }

  function parseTransactionDate(dateString: string) {
    const date = new Date(dateString);

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
  }

  /*
   * Filter transactions
   */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      /*
       * Search by party
       */
      const matchesSearch =
        filters.search.trim() === "" ||
        transaction.party
          .toLowerCase()
          .includes(filters.search.toLowerCase().trim()) ||
        transaction.amount
          .toString()
          .includes(filters.search.trim());

      /*
       * Transaction type
       */
      const matchesType =
        filters.transactionType === "all" ||
        transaction.type === filters.transactionType;

      /*
       * Amount
       */
      const matchesFromAmount =
        filters.fromAmount === "" ||
        transaction.amount >= Number(filters.fromAmount);

      const matchesToAmount =
        filters.toAmount === "" ||
        transaction.amount <= Number(filters.toAmount);

      /*
       * Date
       *
       * Convert:
       * "7 Jul 2026"
       *
       * into a Date object for comparison.
       */
      const transactionDate = parseTransactionDate(
        transaction.date
      );

      const fromDate =
        filters.fromDate === ""
          ? null
          : new Date(
              `${filters.fromDate}T00:00:00`
            ).getTime();

      const toDate =
        filters.toDate === ""
          ? null
          : new Date(
              `${filters.toDate}T23:59:59`
            ).getTime();

      const matchesFromDate =
        fromDate === null ||
        transactionDate >= fromDate;

      const matchesToDate =
        toDate === null ||
        transactionDate <= toDate;

      return (
        matchesSearch &&
        matchesType &&
        matchesFromAmount &&
        matchesToAmount &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [filters]);

  /*
   * Sort transactions:
   * newest → oldest
   */
  const recentTransactions = useMemo(() => {
    return [...filteredTransactions].sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`).getTime() -
        new Date(`${a.date} ${a.time}`).getTime()
    );
  }, [filteredTransactions]);

  /*
   * Group transactions by date
   */
  const groupedTransactions = useMemo(() => {
    const grouped = new Map<
      string,
      typeof recentTransactions
    >();

    recentTransactions.forEach((transaction) => {
      if (!grouped.has(transaction.date)) {
        grouped.set(transaction.date, []);
      }

      grouped.get(transaction.date)!.push(transaction);
    });

    return grouped;
  }, [recentTransactions]);

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
      <TransactionsHeader
        filters={filters}
        onSearchChange={(value) =>
          setFilters((current) => ({
            ...current,
            search: value,
          }))
        }
        onApplyFilters={setFilters}
        onClearFilters={handleClearFilters}
      />

      <Card className="border-.5 border-slate-200/70 p-5">
        <CardContent className="p-0">
          {groupedTransactions.size === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No transactions found.
            </div>
          ) : (
            <div>
              {Array.from(
                groupedTransactions.entries()
              ).map(
                ([date, dayTransactions]) => {
                  const formattedDate =
                    formatGroupDate(date);

                  return (
                    <section key={date}>
                      {/* Date Header */}
                      <div className="border-y border-border bg-slate-300 px-3 py-3">
                        <p className="space-x-2 text-sm font-semibold text-slate-700">
                          {formattedDate.date}

                          <span className="text-slate-300">
                            ·
                          </span>

                          <span className="text-slate-500">
                            {formattedDate.day}
                          </span>
                        </p>
                      </div>

                      {/* Transactions */}
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
                              className="flex justify-between px-3 py-3"
                            >
                              {/* Left */}
                              <div className="flex max-w-1/2 items-center gap-2">
                                {transType ===
                                "credited" ? (
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
                                    transType ===
                                      "credited"
                                      ? "text-green-700"
                                      : "text-red-500"
                                  )}
                                >
                                  {transType ===
                                  "credited"
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
          )}
        </CardContent>
      </Card>
    </>
  );
}

function setFilters(arg0: { search: string; fromDate: string; toDate: string; transactionType: string; fromAmount: string; toAmount: string; }) {
  throw new Error("Function not implemented.");
}
