"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { TrendingUp, RotateCwFadingClock, View, Users, ArrowRightLeft } from "lucide-react";

import { walletCredits } from "@/dummy_db/walletcredits.mock";
import { customers } from "@/dummy_db/customers.mock";
import { formatCurrency } from "@/utils/formatCurrency";

export default function WalletOverviewCard() {

    const [showBalance, setShowBalance] = useState(false);

    const completedTransactions = walletCredits.filter(
        (credit) => credit.status === "Completed"
    );

    const pendingTransactions = walletCredits.filter(
        (credit) => credit.status === "Pending"
    );

    const activeCustomers = customers.filter(
        (customer) => customer.isActive === true
    );

    const numOfCompletedTransactions = completedTransactions.length;
    const numOfActiveCustomers = activeCustomers.length;

    const totalCreditsTransfered = completedTransactions
        .filter((credit) => credit.status === "Completed")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalCreditsPending = pendingTransactions
        .filter((credit) => credit.status === "Pending")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const formattedTotalCreditsTransfered = formatCurrency(totalCreditsTransfered);
    const formattedTotalCreditsPending = formatCurrency(totalCreditsPending);

    return (
        <Card className="bg-linear-to-br from-emerald-950 via-slate-900 to-indigo-950 p-5">

            {/* Content */}
            <div className="grid gap-8">

                <CardHeader>
                    <CardTitle className="flex items-center gap-1">
                        
                        <div className="flex size-10 items-center justify-center rounded-md bg-white/25 text-emerald-300">
                            <View className="size-6" />
                        </div>

                        <p className="text-lg text-white">
                            OverView
                        </p>

                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        <div className="bg-slate-300/10 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-1 text-green-500 text-md font-semibold">
                                <TrendingUp className="size-4"/>
                                <p className="flex">
                                    Total Credits Transfered
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                ₹{formattedTotalCreditsTransfered}
                            </h3>
                        </div>

                        <div className="bg-slate-300/10 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-1 text-yellow-300 text-md font-semibold">
                                <RotateCwFadingClock className="size-4"/>
                                <p className="flex">
                                    Total Credits Pending
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                ₹{formattedTotalCreditsPending}
                            </h3>
                        </div>

                    </div>
                    
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                        <div className="bg-slate-300/10 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-1 text-slate-300 text-md font-semibold">
                                <Users className="size-4"/>
                                <p className="flex">
                                    Total Customers
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                {numOfActiveCustomers}
                            </h3>
                        </div>

                        <div className="bg-slate-300/10 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-1 text-slate-300 text-md font-semibold">
                                <ArrowRightLeft className="size-4"/>
                                <p className="flex">
                                    Total Transactions
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                {numOfCompletedTransactions}
                            </h3>
                        </div>

                    </div>

                </CardContent>

            </div>

        </Card>
    );
}