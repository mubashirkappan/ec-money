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

export type WalletCreditFilters = {
  search: string;
  fromDate: string;
  toDate: string;
  status: "all" | "Pending" | "Completed" | "Cancelled";
};

type WalletCreditHeaderProps = {
  filters: WalletCreditFilters;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onApplyFilters: (filters: WalletCreditFilters) => void;
  onClearFilters: () => void;
};

export default function WalletCreditHeader({
  filters,
  resultCount,
  onSearchChange,
  onApplyFilters,
  onClearFilters,
}: WalletCreditHeaderProps) {
  const [open, setOpen] = useState(false);

  const [fromDate, setFromDate] = useState(filters.fromDate);
  const [toDate, setToDate] = useState(filters.toDate);

  const [status, setStatus] =
    useState<"all" | "Pending" | "Completed" | "Cancelled">(
      filters.status
    );

  function handleReset() {
    setFromDate("");
    setToDate("");
    setStatus("all");

    onApplyFilters({
      search: filters.search,
      fromDate: "",
      toDate: "",
      status: "all",
    });

    setOpen(false);
  }

  function handleApply() {
    onApplyFilters({
      search: filters.search,
      fromDate,
      toDate,
      status,
    });

    setOpen(false);
  }

  return (
    <Card className="border-.5 border-slate-200/70 p-5">
      <CardTitle>
        All Wallet Credits
      </CardTitle>

      <CardContent className="p-0">
        <div className="grid md:flex items-end justify-between gap-2">
          <AppSearchInput
            id="searchWalletCredits"
            placeholder="Search..."
            className="w-60"
            value={filters.search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
          />

          <div className="flex gap-2 items-end">
            <span className="text-sm text-muted-foreground">
              {resultCount}{" "}
              {resultCount === 1
                ? "record"
                : "records"}
            </span>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // Clear values inside dialog
                setFromDate("");
                setToDate("");
                setStatus("all");

                // Clear applied filters
                onClearFilters();
              }}
              disabled={
                filters.fromDate === "" &&
                filters.toDate === "" &&
                filters.status === "all" &&
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
                    Filter Wallet Credits
                  </DialogTitle>

                  <DialogDescription>
                    Filter your Wallet Credits by date and status.
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

                  {/* Status */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">
                      Status
                    </h3>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={
                          status === "all"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setStatus("all")
                        }
                      >
                        All
                      </Button>

                      <Button
                        type="button"
                        variant={
                          status === "Pending"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setStatus("Pending")
                        }
                      >
                        Pending
                      </Button>

                      <Button
                        type="button"
                        variant={
                          status === "Completed"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setStatus("Completed")
                        }
                      >
                        Completed
                      </Button>

                      <Button
                        type="button"
                        variant={
                          status === "Cancelled"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setStatus("Cancelled")
                        }
                      >
                        Cancelled
                      </Button>
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