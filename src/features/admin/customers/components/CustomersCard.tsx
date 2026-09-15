"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { customers } from "@/dummy_db/customers.mock";

import CustomersHeader, {
  CustomersFilters,
} from "./CustomersHeader";

import { cn } from "@/lib/utils";

export default function CustomersCard() {
  const router = useRouter();

  const [filters, setFilters] =
    useState<CustomersFilters>({
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
   * Convert customers datetime into
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
  function parseCustomersDate(
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
   * Filter customers
   */
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      /*
       * Search
       */
      const search =
        filters.search.trim().toLowerCase();

      const matchesSearch =
      search === "" ||
        customer.customerId
          .toLowerCase()
          .includes(search) ||
        customer.customerName
          .toLowerCase()
          .includes(search) ||
        customer.contact1
          .toString()
          .includes(filters.search.trim());

      /*
       * Status
       */
      const matchesStatus =
        filters.status === "all" ||
        customer.isActive === filters.status;

      /*
       * Customers added date
       */
      const CustomersAddedDate =
        parseCustomersDate(
          customer.addedAt
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
        CustomersAddedDate >= fromDate;

      const matchesToDate =
        toDate === null ||
        CustomersAddedDate <= toDate;

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
  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort(
      (a, b) =>
        new Date(b.addedAt).getTime() -
        new Date(a.addedAt).getTime()
    );
  }, [filteredCustomers]);

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
      <CustomersHeader
        filters={filters}
        resultCount={filteredCustomers.length}
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
                    Contact
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
                {sortedCustomers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  sortedCustomers.map(
                    (customer) => {
                      const addedAt =
                        formatAddedAt(
                          customer.addedAt
                        );

                      return (
                        <tr
                          key={customer.id}
                          className="transition-colors hover:bg-slate-50 cursor-pointer"
                          onClick={() => router.push(`/customer/${customer.customerId}`)}
                        >
                          {/* Customer Contact */}
                          <td className="px-3 py-4">
                            <span className="font-semibold">
                              {
                                customer.customerId
                              }
                            </span>
                          </td>

                          {/* Customer Name */}
                          <td className="px-3 py-4">
                            <span className="font-semibold">
                              {
                                customer.customerName
                              }
                            </span>
                          </td>

                          {/* Account Holder */}
                          <td className="px-3 py-4">
                            <span className="font-semibold">
                              {
                                customer.contact1
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
                                customer.isActive
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-500"
                              )}
                            >
                              {customer.isActive
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