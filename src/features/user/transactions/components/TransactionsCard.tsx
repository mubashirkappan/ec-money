"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { transactions } from "@/dummy_db/transaction.mock";
import { TransactionTypes } from "../types/transaction.types"
import { TransactionReceiptView } from "./TransactionReceipt"

import  { authCookies } from "@/lib/cookies"

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

  const loginUserId = Number(authCookies.getUserId());

  const [selectedTransaction, setSelectedTransaction] = useState<TransactionTypes | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

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

      const userId = transaction.user.id;

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
        userId === loginUserId &&
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

  function handleViewTransactionReceipt(transaction: TransactionTypes) {
    console.log(transaction);
    setSelectedTransaction(transaction);
    setReceiptOpen(true);
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

      {selectedTransaction && (
        <TransactionReceiptView
          transaction={selectedTransaction}
          open={receiptOpen}
          onOpenChange={setReceiptOpen}
        />
      )}

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
                      <div className="bg-indigo-900 px-3 py-3">
                        <p className="space-x-2 text-sm font-semibold text-white">
                          <span>
                            {formattedDate.date}
                          </span>

                          <span>
                            {formattedDate.day}
                          </span>
                        </p>
                      </div>

                      {/* Transactions */}
                      <ul className="divide-y divide-border">
                        {dayTransactions.map((transaction) => {
                          const transType = transaction.type;

                          const amount =
                            transaction.amount.toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            );

                          return (
                            <li
                              key={transaction.id}
                              className="flex justify-between px-3 py-3 cursor-pointer bg-white hover:bg-indigo-50"
                              onClick={() => handleViewTransactionReceipt(transaction)}
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
                                    {transaction.party}
                                  </span>

                                  {transaction.note && (
                                    <span className="truncate text-xs text-slate-400">
                                      {transaction.note}
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
                                  {transaction.time}
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
