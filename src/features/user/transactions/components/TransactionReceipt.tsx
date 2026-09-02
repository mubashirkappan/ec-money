"use client"

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import { BadgeCheck, Download } from "lucide-react"
import { LoaderIcon, type LoaderIconHandle } from "lucide-animated";

import { toJpeg } from "html-to-image";

import { TransactionTypes } from "../types/transaction.types"

import Image from "next/image";
import logo from "@/assets/images/logo.png"
import receiptBackground from "@/assets/images/receipt-background.png"
import { formatCurrency } from "@/utils/formatCurrency";
import { env } from "@/lib/env";


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

  const [isDownloading, setIsDownloading] = useState(false);

  const iconRef = useRef<LoaderIconHandle>(null);

  useEffect(() => {
    if (!isDownloading) return;

    const timer = setTimeout(() => {
      iconRef.current?.startAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, [isDownloading]);

  const handleDownloadReceipt = async () => {
    const receipt = document.getElementById("transactionReceipt");

    if (!receipt) return;

    setIsDownloading(true);

    try {
      const dataUrl = await toJpeg(receipt, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `WTTPL-${transaction.transactionId}.jpeg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download receipt:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-sm p-0">
        <div className="mt-10 border-t">
          <div
            id="transactionReceipt"
            className="bg-cover bg-center bg-no-repeat pb-4"
            style={{
              backgroundImage: `url(${receiptBackground.src})`,
            }}
          >

            <div className="relative w-72 h-20">
              <svg
                className="absolute top-0 left-0 w-full h-24"
                viewBox="0 0 288 128"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="
                    M 0 0
                    H 285
                    V 0
                    C 295 -2, 285 0, 273 18
                    L 230 78
                    C 220 90, 210 96, 190 96
                    H 0
                    Z
                  "
                  fill="white"
                />
              </svg>

              <div className="relative flex items-center gap-1 py-2 px-2 h-full">
                <Image
                  src={logo}
                  alt="WTT"
                  className="size-16"
                />
                <span className="font-medium">{env.appName}</span>
              </div>
            </div>

            <div className="text-center py-4">
              <span className="text-xl font-bold text-white">Transaction Receipt</span>
            </div>

            <div className="bg-white divide-y rounded-md text-md mx-4">
              
              <div className="p-2 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Status</span>
                  <span className="text-green-600 flex items-center gap-1">{transaction.status.toUpperCase()} <BadgeCheck className="size-5" /></span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Transaction Amount</span>
                  <span className="text-slate-500">₹ {formatCurrency(transaction.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date & Time</span>
                  <span className="text-slate-500">{transaction.date} {transaction.time} IST</span>
                </div>
              </div>

              <div className="flex justify-between p-2">
                <span className="font-medium">Transaction ID</span>
                <span className="text-slate-500">{transaction.transactionId}</span>
              </div>

              <div className="p-2 space-y-2">
                <div><span className="font-bold">Send To</span></div>
                <div className="flex justify-between">
                  <span className="font-medium">Banking Name</span>
                  <span className="text-slate-500">{transaction.party?.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Account Number</span>
                  <span className="text-slate-500">{transaction.toAccountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Bank</span>
                  <span className="text-slate-500 whitespace-normal text-end">State Bank Of India, Vengara Kerala</span>
                </div>
              </div>

            </div>
          </div>
          <div className="flex justify-end p-4">
            <Button size="lg" disabled={isDownloading} id="downloadReceipt" className="bg-blue-600 flex items-center" onClick={handleDownloadReceipt}>
              {isDownloading ? (
                <LoaderIcon
                  ref={iconRef}
                  animateOnHover={false}
                  className="size-4"
                />
              ) : (
                <Download className="size-5" />
              )}
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
