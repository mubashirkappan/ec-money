import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { TransactionTypes } from "../types/transaction.types"

import Image from "next/image";
import logo from "@/assets/images/logo.png"

type TransactionsReceiptViewProps = {
  transaction: TransactionTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TransactionReceiptView({
  transaction,
  open,
  onOpenChange,
}: TransactionsReceiptViewProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <div className="bg-blue-500 p-2">

          <div>
            <Image
              src={logo}
              alt="World Trade Transfer"
              className="size-18"
            />
          </div>

          <div className="text-center">
            <span className="text-xl font-bold text-white">Transaction Receipt</span>
          </div>

          <div className="bg-white divide-y rounded-md">
            <div className="p-2">
              <div className="flex justify-between">
                <span>Status</span>
                <span>Success</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction Amount</span>
                <span>100000</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time</span>
                <span>03 Jul 2026, 09:40 PM IST</span>
              </div>
            </div>
            <div className="flex justify-between p-2">
              <span>Transaction ID</span>
              <span>213256236</span>
            </div>
            <div className="p-2">
              <div className="flex justify-between">
                <span>Status</span>
                <span>Success</span>
              </div>
              <div className="flex justify-between">
                <span>Banking Name</span>
                <span>Alex John</span>
              </div>
              <div className="flex justify-between">
                <span>Account Number</span>
                <span>xxxxxxxxxxxx6325</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
