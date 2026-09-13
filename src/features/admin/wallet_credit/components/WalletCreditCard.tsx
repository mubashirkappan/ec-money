"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { walletCredits } from "@/dummy_db/walletcredits.mock";

import WalletCreditHeader, {
  WalletCreditFilters,
} from "./WalletCreditHeader";

import { cn } from "@/lib/utils";

export default function WalletCreditCard() {
  const router = useRouter();

  const [filters, setFilters] =
    useState<WalletCreditFilters>({
      search: "",
      fromDate: "",
      toDate: "",
      status: "all",
    });

  function handleClearFilters() {
    setFilters({
      search: "",
      fromDate: "",
      toDate: "",
      status: "all",
    });
  }

  /*
   * Convert wallet credit datetime into
   * the start of that date.
   *
   * Example:
   *
   * "2026-08-13T14:32:00"
   *
   * becomes:
   *
   * 13 Aug 2026 00:00:00
   */
  function parseWalletCreditDate(
    dateString: string
  ) {
    const date = new Date(dateString);

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
  }

  /*
   * Filter Wallet Credit based on search, status, and date range.
   */
  const filteredWalletCredits = useMemo(() => {
    return walletCredits.filter((credit) => {
      /*
       * Search
       */
      const search =
        filters.search.trim().toLowerCase();

      const matchesSearch =
      search === "" ||
        credit.customer.customerId
          .toLowerCase()
          .includes(search) ||
        credit.customer.customerName
          .toLowerCase()
          .includes(search);

      /*
       * Status
       */
      const matchesStatus =
        filters.status === "all" ||
        credit.status === filters.status;

      /*
       * Wallet Credit added date
       */
      const WalletCreditAddedDate =
        parseWalletCreditDate(
          credit.date
        );

      /*
       * From date
       */
      const fromDate =
        filters.fromDate === ""
          ? null
          : new Date(
              `${filters.fromDate}T00:00:00`
            ).getTime();

      /*
       * To date
       *
       * Include the complete selected day.
       */
      const toDate =
        filters.toDate === ""
          ? null
          : new Date(
              `${filters.toDate}T23:59:59`
            ).getTime();

      /*
       * Date range matching
       */
      const matchesFromDate =
        fromDate === null ||
        WalletCreditAddedDate >= fromDate;

      const matchesToDate =
        toDate === null ||
        WalletCreditAddedDate <= toDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [filters]);

  /*
   * Sort:
   * newest → oldest
   *
   * addedAt already contains both
   * date and time.
   */
  const sortedWalletCredits = useMemo(() => {
    return [...filteredWalletCredits].sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
  }, [filteredWalletCredits]);

  /*
   * Format addedAt for display
   */
  function formatAddedAt(
    dateString: string
  ) {
    const date = new Date(dateString);

    return {
      date: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  }

  return (
    <>
      <WalletCreditHeader
        filters={filters}
        resultCount={filteredWalletCredits.length}
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
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-3 text-left text-sm font-semibold text-slate-600">
                    Customer ID
                  </th>

                  <th className="px-3 py-3 text-left text-sm font-semibold text-slate-600">
                    Customer Name
                  </th>

                  <th className="px-3 py-3 text-left text-sm font-semibold text-slate-600">
                    Amount
                  </th>

                  <th className="px-3 py-3 text-left text-sm font-semibold text-slate-600">
                    Added At
                  </th>

                  <th className="px-3 py-3 text-center text-sm font-semibold text-slate-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {sortedWalletCredits.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No wallet credits found.
                    </td>
                  </tr>
                ) : (
                  sortedWalletCredits.map(
                    (credit) => {
                      const addedAt =
                        formatAddedAt(
                          credit.date
                        );

                      return (
                        <tr
                          key={credit.id}
                          className="transition-colors hover:bg-slate-50 cursor-pointer"
                          onClick={() => router.push(`/wallet-credit/${credit.id}`)}
                        >
                          {/* Contact */}
                          <td className="px-3 py-4">
                            <span className="font-semibold">
                              {
                                credit.customer.customerId
                              }
                            </span>
                          </td>

                          {/* Name */}
                          <td className="px-3 py-4">
                            <span className="font-semibold">
                              {
                                credit.customer.customerName
                              }
                            </span>
                          </td>

                          {/* Contact */}
                          <td className="px-3 py-4">
                            <span className="font-semibold">
                              {
                                credit.amount
                              }
                            </span>
                          </td>

                          {/* Added At */}
                          <td className="px-3 py-4">
                            <div className="grid">
                              <span className="text-sm font-medium">
                                {addedAt.date}
                              </span>

                              <span className="text-xs text-slate-500">
                                {addedAt.time}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-3 py-4 text-center">
                            <span
                              className={cn(
                                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                credit.status === "Pending"
                                  ? "bg-yellow-50 text-yellow-700"
                                  : credit.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-500"
                              )}
                            >
                              {credit.status}
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}