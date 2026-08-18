"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CreditCard, Loader2, IndianRupee, KeyRound } from "lucide-react";
import {
  IndianRupeeIcon,
  type IndianRupeeIconHandle,
} from "lucide-animated";

import PaymentHeader from "./PaymentHeader";

import SecureInput from "@/components/common/SecureInput";
import AppInput from "@/components/common/AppInput";

import { accountDetails } from "@/dummy_db/bank.mock";
import { beneficiaries } from "@/dummy_db/beneficiary.mock";

export default function PaymentCard() {
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");

  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDataFound, setIsDataFound] = useState(true);
  const [isBeneficiary, setIsBeneficiary] = useState(false);
  const [showAmountDiv, setShowAmountDiv] = useState(false);
  const [toEnterPin, setToEnterPin] = useState(false);
  const [pinConfirmBtn, setPinConfirmBtn] = useState(false);

  const iconRef = useRef<IndianRupeeIconHandle>(null);

  useEffect(() => {
    // Start immediately
    iconRef.current?.startAnimation();

    // Restart animation periodically
    const interval = setInterval(() => {
      iconRef.current?.startAnimation();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleVerify = () => {
    if (
      !accountNumber ||
      !confirmAccountNumber ||
      !ifscCode ||
      accountNumber !== confirmAccountNumber
    ) {
      return;
    }

    setIsVerifying(true);

    // Simulate API request
    setTimeout(() => {
      const account = accountDetails.find(
        (item) =>
          item.accountNumber === accountNumber &&
          item.ifscCode.toLowerCase() === ifscCode.trim().toLowerCase()
      );

      if (account) {
        setBankName(account.bankName);
        setHolderName(account.accountHolderName);

        setIsDataFound(true);
        setShowAmountDiv(true);

        const isBeneficiaryExists = beneficiaries.some(
          (beneficiary) =>
            beneficiary.accountNumber === account.accountNumber &&
            beneficiary.accountHolderName.trim().toLowerCase() ===
              account.accountHolderName.trim().toLowerCase()
        );

        setIsBeneficiary(isBeneficiaryExists);
      } else {
        setBankName("");
        setHolderName("");
        setIsDataFound(false);
        setIsBeneficiary(false);
        setShowAmountDiv(false);
      }

      setIsVerifying(false);
    }, 1500);
  };

  const handleAmountChange = (value: string) => {
    const rawValue = value.replace(/,/g, "");

    // Only numbers, one ".", max 2 decimal places
    if (!/^\d*\.?\d{0,2}$/.test(rawValue)) {
      return;
    }

    setAmount(rawValue);
  };

  const formattedAmount = amount
    ? amount.includes(".")
      ? `${Number(amount.split(".")[0]).toLocaleString("en-IN")}.${amount.split(".")[1]}`
      : Number(amount).toLocaleString("en-IN")
    : "";

  return (
    <>
      <PaymentHeader />

      <Card className="border-.5 border-slate-200/70 p-5">
        {!toEnterPin ? (
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

              <SecureInput
                id="accountNumber"
                label="Account Number"
                placeholder="Enter Account Number"
                icon={CreditCard}
                focusTextView
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />

              <SecureInput
                id="confirmAccountNumber"
                label="Re-enter Account Number"
                placeholder="Re-enter Account Number"
                icon={CreditCard}
                focusTextView
                value={confirmAccountNumber}
                onChange={(e) =>
                  setConfirmAccountNumber(e.target.value)
                }
                error={
                  confirmAccountNumber &&
                  accountNumber !== confirmAccountNumber
                    ? "Account numbers do not match"
                    : undefined
                }
              />

              <AppInput
                id="ifscCode"
                label="IFSC Code"
                placeholder="Enter IFSC Code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />

              <div className="flex items-end">
                <div className="flex items-center gap-1">
                  <Button
                    variant="link"
                    className="p-0 text-blue-700"
                    onClick={handleVerify}
                    disabled={
                      isVerifying ||
                      !accountNumber ||
                      !confirmAccountNumber ||
                      !ifscCode ||
                      accountNumber !== confirmAccountNumber
                    }
                  >
                    Verify?
                  </Button>

                  {isVerifying && (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-700" />
                  )}

                  {!isDataFound && !isVerifying && (
                    <p className="text-xs font-medium text-red-600">
                      Data not found
                    </p>
                  )}

                  {isBeneficiary && !isVerifying && (
                    <p className="text-xs font-medium text-emerald-600">
                      Already in beneficiaries
                    </p>
                  )}
                </div>
              </div>

              <AppInput
                id="bankName"
                label="Bank Name"
                value={bankName}
                readOnly
                placeholder="Bank name will appear here"
              />

              <AppInput
                id="holderName"
                label="Holder Name"
                value={holderName}
                readOnly
                placeholder="Account holder name will appear here"
              />

            </div>
            { showAmountDiv && (
              <div>
                <AppInput
                  id="amount"
                  label="Amount to pay"
                  icon={IndianRupee}
                  value={formattedAmount}
                  placeholder="0"
                  className="h-14 font-bold! text-xl!"
                  onChange={(e) => handleAmountChange(e.target.value)}
                />
              </div>
            )}
            <div>
              <Button className="w-full bg-blue-600 h-12 font-bold! text-lg!" onClick={() => setToEnterPin(true)}><IndianRupeeIcon ref={iconRef} animateOnHover={false} /> Send Money</Button>
            </div>
          </CardContent>
        )
        : (
          <CardContent>
            <div className="grid justify-center w-full gap-2">
              <SecureInput
                id="pin"
                label="Enter Pin"
                icon={KeyRound}
                placeholder="Enter Pin"
                className="min-w-80! max-w-100!"
                value={pin}
                inputMode="numeric"
                maxLength={6}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPin(value);
                  if (value.length >= 4 && value.length <= 6) {
                    setPinConfirmBtn(true);
                  } else {
                    setPinConfirmBtn(false);
                  }
                }}
              />
              <Button disabled={!pinConfirmBtn} className="max-w-100 bg-blue-600 h-12 font-bold!">Confirm</Button>
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
}