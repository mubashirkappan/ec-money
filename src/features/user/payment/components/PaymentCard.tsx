"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  CreditCard,
  Loader2,
  IndianRupee,
  KeyRound,
} from "lucide-react";

import {
  IndianRupeeIcon,
  type IndianRupeeIconHandle,
} from "lucide-animated";

import { confirmPayment } from "../lib/confirmPayment";

import SecureInput from "@/components/common/SecureInput";
import AppInput from "@/components/common/AppInput";

import { accountDetails } from "@/dummy_db/bank.mock";
import { beneficiaries } from "@/dummy_db/beneficiary.mock";

interface PaymentCardProps {
  onPaymentSuccess: (data: number) => void;
}

export default function PaymentCard({
  onPaymentSuccess,
}: PaymentCardProps) {
  const searchParams = useSearchParams();

  const beneficiaryId = searchParams.get("beneficiaryId");

  const selectedBeneficiary = beneficiaryId
  ? beneficiaries.find(
      (item) => item.id === Number(beneficiaryId)
    )
  : undefined;

  const [accountNumber, setAccountNumber] = useState(
    selectedBeneficiary?.accountNumber ?? ""
  );

  const [confirmAccountNumber, setConfirmAccountNumber] = useState(
    selectedBeneficiary?.accountNumber ?? ""
  );

  const [ifscCode, setIfscCode] = useState(
    selectedBeneficiary?.ifscCode ?? ""
  );

  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [transactionId, setTransactionId] = useState("2100325333625");

  const [isVerifying, setIsVerifying] = useState(false);
  const [isDataFound, setIsDataFound] = useState(true);
  const [isBeneficiary, setIsBeneficiary] = useState(false);
  const [showAmountDiv, setShowAmountDiv] = useState(false);
  const [toEnterPin, setToEnterPin] = useState(false);
  const [pinConfirmBtn, setPinConfirmBtn] = useState(false);

  const iconRef = useRef<IndianRupeeIconHandle>(null);

  /*
   * ---------------------------------------------------------
   * Rupee icon animation
   * ---------------------------------------------------------
   */
  useEffect(() => {
    iconRef.current?.startAnimation();

    const interval = setInterval(() => {
      iconRef.current?.startAnimation();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * Verify Account
   *
   * This is the common verification function used by:
   * 1. Manual account verification
   * 2. Beneficiary automatic verification
   * ---------------------------------------------------------
   */
  const verifyAccount = (
    accountNumberValue: string,
    ifscCodeValue: string
  ) => {
    if (!accountNumberValue || !ifscCodeValue) {
      return;
    }

    setIsVerifying(true);

    // Simulate API request
    setTimeout(() => {
      const account = accountDetails.find(
        (item) =>
          item.accountNumber === accountNumberValue &&
          item.ifscCode.toLowerCase() ===
            ifscCodeValue.trim().toLowerCase()
      );

      if (account) {
        /*
         * Account exists
         */
        setBankName(account.bankName);
        setHolderName(account.accountHolderName);

        setIsDataFound(true);
        setShowAmountDiv(true);

        /*
         * Check whether this account is already
         * present in beneficiaries.
         */
        const isBeneficiaryExists = beneficiaries.some(
          (beneficiary) =>
            beneficiary.accountNumber ===
              account.accountNumber &&
            beneficiary.accountHolderName
              .trim()
              .toLowerCase() ===
              account.accountHolderName
                .trim()
                .toLowerCase()
        );

        setIsBeneficiary(isBeneficiaryExists);
      } else {
        /*
         * Account does not exist / was removed / closed
         */
        setBankName("");
        setHolderName("");

        setIsDataFound(false);
        setIsBeneficiary(false);
        setShowAmountDiv(false);
      }

      setIsVerifying(false);
    }, 1500);
  };

  /*
   * ---------------------------------------------------------
   * Manual Verify Button
   * ---------------------------------------------------------
   */
  const handleVerify = () => {
    if (
      !accountNumber ||
      !confirmAccountNumber ||
      !ifscCode ||
      accountNumber !== confirmAccountNumber
    ) {
      return;
    }

    verifyAccount(accountNumber, ifscCode);
  };

  /*
   * ---------------------------------------------------------
   * Load Beneficiary
   *
   * If beneficiaryId exists in the URL:
   *
   * /payment?beneficiaryId=5
   *
   * Fill account number + confirm account number + IFSC
   * and automatically verify the account.
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!selectedBeneficiary) return;

    const timer = setTimeout(() => {
      verifyAccount(
        selectedBeneficiary.accountNumber,
        selectedBeneficiary.ifscCode
      );
    }, 0);

    return () => clearTimeout(timer);
  }, [beneficiaryId, selectedBeneficiary]);

  /*
   * ---------------------------------------------------------
   * Amount Change
   * ---------------------------------------------------------
   */
  const handleAmountChange = (value: string) => {
    const rawValue = value.replace(/,/g, "");

    // Only numbers, one ".", max 2 decimal places
    if (!/^\d*\.?\d{0,2}$/.test(rawValue)) {
      return;
    }

    // Don't allow multiple leading zeros
    if (/^00+/.test(rawValue)) {
      return;
    }

    // Don't allow a number like 01, 02, 012, etc.
    if (/^0\d/.test(rawValue)) {
      return;
    }

    setAmount(rawValue);
  };

  /*
   * ---------------------------------------------------------
   * Formatted Amount
   * ---------------------------------------------------------
   */
  const formattedAmount = amount
    ? amount.includes(".")
      ? `${Number(
          amount.split(".")[0]
        ).toLocaleString("en-IN")}.${amount.split(".")[1]}`
      : Number(amount).toLocaleString("en-IN")
    : "";

  /*
   * ---------------------------------------------------------
   * Confirm Payment
   * ---------------------------------------------------------
   */
  const handleConfirmPayment = () => {
    if (!pin) {
      console.log("Invalid Pin");
      return;
    }

    setTransactionId(String(Date.now()));

    const paymentData = {
      transactionId: transactionId,
      accountNumber: accountNumber,
      confirmAccountNumber: confirmAccountNumber,
      ifscCode: ifscCode,
      bankName: bankName,
      holderName: holderName,
      amount: Number(amount),
      pin: pin,
    };

    const PaymentConfirming = confirmPayment(paymentData);

    if (PaymentConfirming) {
      console.log("Payment Success");
      onPaymentSuccess(PaymentConfirming);
    } else {
      console.log("Payment Failed");
    }
  };

  return (
    <Card className="border-.5 border-slate-200/70 p-5">
      {!toEnterPin ? (
        <CardContent className="p-0 space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {/* Account Number */}
            <SecureInput
              id="accountNumber"
              label="Account Number"
              placeholder="Enter Account Number"
              icon={CreditCard}
              focusTextView
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value)
              }
            />

            {/* Confirm Account Number */}
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

            {/* IFSC */}
            <AppInput
              id="ifscCode"
              label="IFSC Code"
              placeholder="Enter IFSC Code"
              value={ifscCode}
              onChange={(e) =>
                setIfscCode(e.target.value)
              }
            />

            {/* Verify */}
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
                    accountNumber !==
                      confirmAccountNumber
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

            {/* Bank Name */}
            <AppInput
              id="bankName"
              label="Bank Name"
              value={bankName}
              readOnly
              placeholder="Bank name will appear here"
            />

            {/* Holder Name */}
            <AppInput
              id="holderName"
              label="Holder Name"
              value={holderName}
              readOnly
              placeholder="Account holder name will appear here"
            />
          </div>

          {/* Amount */}
          {showAmountDiv && (
            <div>
              <AppInput
                id="amount"
                label="Amount to pay"
                icon={IndianRupee}
                value={formattedAmount}
                placeholder="0"
                className="h-14 font-bold! text-xl!"
                onChange={(e) =>
                  handleAmountChange(e.target.value)
                }
              />
            </div>
          )}

          {/* Send Money */}
          <div>
            <Button
              className="w-full bg-blue-600 h-12 font-bold! text-lg!"
              onClick={() => setToEnterPin(true)}
              disabled={
                !showAmountDiv ||
                !amount ||
                Number(amount) <= 0 ||
                isVerifying
              }
            >
              <IndianRupeeIcon
                ref={iconRef}
                animateOnHover={false}
              />
              Send Money
            </Button>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <div className="grid justify-center w-full gap-2">

            {/* PIN */}
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
                const value =
                  e.target.value.replace(/\D/g, "");

                setPin(value);

                if (
                  value.length >= 4 &&
                  value.length <= 6
                ) {
                  setPinConfirmBtn(true);
                } else {
                  setPinConfirmBtn(false);
                }
              }}
            />

            {/* Confirm */}
            <Button
              disabled={!pinConfirmBtn}
              className="max-w-100 bg-blue-600 h-12 font-bold!"
              onClick={handleConfirmPayment}
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}