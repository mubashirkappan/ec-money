"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CreditCard, Loader2 } from "lucide-react";

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

  const [isVerifying, setIsVerifying] = useState(false);
  const [isBeneficiary, setIsBeneficiary] = useState(false);

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
        setIsBeneficiary(false);
      }

      setIsVerifying(false);
    }, 1500);
  };

  return (
    <>
      <PaymentHeader />

      <Card className="border-.5 border-slate-200/70 p-5">
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
              <div className="flex items-center gap-2">
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
                  Verify
                </Button>

                {isVerifying && (
                  <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
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

            {isBeneficiary && (
              <p className="text-xs font-medium text-emerald-600">
                Already in beneficiaries
              </p>
            )}

          </div>
          <div>
            <Button size="lg" className="w-full bg-blue-600">Continue</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}