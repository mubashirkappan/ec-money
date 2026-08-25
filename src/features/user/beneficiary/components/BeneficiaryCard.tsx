"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { beneficiaries } from "@/dummy_db/beneficiary.mock";

import BeneficiaryHeader, {
  BeneficiaryFilters,
} from "./BeneficiaryHeader";

import { cn } from "@/lib/utils";

export default function BeneficiaryCard() {
  const [filters, setFilters] =
    useState<BeneficiaryFilters>({
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
   * Convert beneficiary datetime into
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
  function parseBeneficiaryDate(
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
   * Filter beneficiaries
   */
  const filteredBeneficiaries = useMemo(() => {
    return beneficiaries.filter((beneficiary) => {
      /*
       * Search
       */
      const search =
        filters.search.trim().toLowerCase();

      const matchesSearch =
        search === "" ||
        beneficiary.customerName
          .toLowerCase()
          .includes(search) ||
        beneficiary.accountHolderName
          .toLowerCase()
          .includes(search) ||
        beneficiary.customerContact
          .toString()
          .includes(filters.search.trim());

      /*
       * Status
       */
      const matchesStatus =
        filters.status === "all" ||
        beneficiary.isActive === filters.status;

      /*
       * Beneficiary added date
       */
      const beneficiaryAddedDate =
        parseBeneficiaryDate(
          beneficiary.addedAt
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
        beneficiaryAddedDate >= fromDate;

      const matchesToDate =
        toDate === null ||
        beneficiaryAddedDate <= toDate;

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
  const sortedBeneficiaries = useMemo(() => {
    return [...filteredBeneficiaries].sort(
      (a, b) =>
        new Date(b.addedAt).getTime() -
        new Date(a.addedAt).getTime()
    );
  }, [filteredBeneficiaries]);

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
      <BeneficiaryHeader
        filters={filters}
        resultCount={filteredBeneficiaries.length}
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
                    Customer Contact
                  </th>

                  <th className="px-3 py-3 text-left text-sm font-semibold text-slate-600">
                    Customer Name
                  </th>

                  <th className="px-3 py-3 text-left text-sm font-semibold text-slate-600">
                    Account Holder
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
                {sortedBeneficiaries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No beneficiaries found.
                    </td>
                  </tr>
                ) : (
                  sortedBeneficiaries.map(
                    (beneficiary) => {
                      const addedAt =
                        formatAddedAt(
                          beneficiary.addedAt
                        );

                      return (
                        <tr
                          key={beneficiary.id}
                          className="transition-colors hover:bg-slate-50"
                        >
                          {/* Customer Contact */}
                          <td className="px-3 py-4">
                            <span className="font-medium">
                              {
                                beneficiary.customerContact
                              }
                            </span>
                          </td>

                          {/* Customer Name */}
                          <td className="px-3 py-4">
                            <span className="font-semibold">
                              {
                                beneficiary.customerName
                              }
                            </span>
                          </td>

                          {/* Account Holder */}
                          <td className="px-3 py-4">
                            <span className="text-slate-700">
                              {
                                beneficiary.accountHolderName
                              }
                            </span>
                          </td>

                          {/* Added At */}
                          <td className="px-3 py-4">
                            <div className="grid">
                              <span className="text-sm font-medium">
                                {addedAt.date}
                              </span>

                              <span className="text-xs text-slate-400">
                                {addedAt.time}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-3 py-4 text-center">
                            <span
                              className={cn(
                                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                beneficiary.isActive
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-500"
                              )}
                            >
                              {beneficiary.isActive
                                ? "Active"
                                : "Inactive"}
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