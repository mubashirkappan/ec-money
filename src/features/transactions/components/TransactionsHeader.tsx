"use client";

import { useState } from "react";

import AppSearchInput from "@/components/common/AppSearchInput";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { FunnelPlus } from "lucide-react";

export type TransactionFilters = {
  search: string;
  fromDate: string;
  toDate: string;
  transactionType: "all" | "credited" | "debited";
  fromAmount: string;
  toAmount: string;
};

type TransactionsHeaderProps = {
  filters: TransactionFilters;
  onSearchChange: (value: string) => void;
  onApplyFilters: (filters: TransactionFilters) => void;
  onClearFilters: () => void;
};

export default function TransactionsHeader({
  filters,
  onSearchChange,
  onApplyFilters,
  onClearFilters,
}: TransactionsHeaderProps) {
  const [open, setOpen] = useState(false);

  const [fromDate, setFromDate] = useState(filters.fromDate);
  const [toDate, setToDate] = useState(filters.toDate);

  const [transactionType, setTransactionType] =
    useState<"all" | "credited" | "debited">(
      filters.transactionType
    );

  const [fromAmount, setFromAmount] = useState(
    filters.fromAmount
  );

  const [toAmount, setToAmount] = useState(
    filters.toAmount
  );

  function handleReset() {
    setFromDate("");
    setToDate("");
    setTransactionType("all");
    setFromAmount("");
    setToAmount("");

    onApplyFilters({
      search: filters.search,
      fromDate: "",
      toDate: "",
      transactionType: "all",
      fromAmount: "",
      toAmount: "",
    });

    setOpen(false);
  }

  function handleApply() {
    onApplyFilters({
      search: filters.search,
      fromDate,
      toDate,
      transactionType,
      fromAmount,
      toAmount,
    });

    setOpen(false);
  }

  return (
    <Card className="border-.5 border-slate-200/70 p-5">
      <CardTitle>
        All Transactions
      </CardTitle>

      <CardContent className="p-0">
        <div className="flex items-end justify-between gap-1">
          <AppSearchInput
            id="searchTransactions"
            placeholder="Search..."
            className="w-60"
            value={filters.search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // Clear values inside dialog
                setFromDate("");
                setToDate("");
                setTransactionType("all");
                setFromAmount("");
                setToAmount("");

                // Clear applied filters
                onClearFilters();
              }}
              disabled={
                filters.fromDate === "" &&
                filters.toDate === "" &&
                filters.transactionType === "all" &&
                filters.fromAmount === "" &&
                filters.toAmount === "" &&
                filters.search === ""
              }
            >
              Clear Filters
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <span>Filter</span>
                  <FunnelPlus className="size-5" />
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    Filter Transactions
                  </DialogTitle>

                  <DialogDescription>
                    Filter your transactions by date, type, and amount.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Date Range */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">
                      Date Range
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label
                          htmlFor="from-date"
                          className="text-sm text-muted-foreground"
                        >
                          From
                        </label>

                        <Input
                          id="from-date"
                          type="date"
                          value={fromDate}
                          onChange={(e) =>
                            setFromDate(e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="to-date"
                          className="text-sm text-muted-foreground"
                        >
                          To
                        </label>

                        <Input
                          id="to-date"
                          type="date"
                          value={toDate}
                          onChange={(e) =>
                            setToDate(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Transaction Type */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">
                      Transaction Type
                    </h3>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={
                          transactionType === "all"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setTransactionType("all")
                        }
                      >
                        All
                      </Button>

                      <Button
                        type="button"
                        variant={
                          transactionType === "credited"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setTransactionType("credited")
                        }
                      >
                        Credit
                      </Button>

                      <Button
                        type="button"
                        variant={
                          transactionType === "debited"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setTransactionType("debited")
                        }
                      >
                        Debit
                      </Button>
                    </div>
                  </div>

                  {/* Amount Range */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">
                      Amount Range
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label
                          htmlFor="from-amount"
                          className="text-sm text-muted-foreground"
                        >
                          From
                        </label>

                        <Input
                          id="from-amount"
                          type="number"
                          min="0"
                          placeholder="₹ 0.00"
                          value={fromAmount}
                          onChange={(e) =>
                            setFromAmount(e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="to-amount"
                          className="text-sm text-muted-foreground"
                        >
                          To
                        </label>

                        <Input
                          id="to-amount"
                          type="number"
                          min="0"
                          placeholder="₹ 0.00"
                          value={toAmount}
                          onChange={(e) =>
                            setToAmount(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>

                  <Button
                    type="button"
                    onClick={handleApply}
                  >
                    Apply Filters
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}