"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Wallet, TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";

import { transactions } from "@/dummy_db/transaction.mock";

export default function WalletBalanceCard() {

    const [showBalance, setShowBalance] = useState(false);

    const completedTransactions = transactions.filter(
        (transaction) => transaction.status === "completed"
    );

    const totalFunded = completedTransactions
        .filter((transaction) => transaction.type === "credited")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = completedTransactions
        .filter((transaction) => transaction.type === "debited")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const netBalanceChange = totalFunded - totalExpenses;

    const formattedTotalIncome = totalFunded.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2,});

    const formattedTotalExpenses = totalExpenses.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2,});

    const netBalance = netBalanceChange.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2,});

    return (
        <Card className="bg-linear-to-br from-emerald-950 via-slate-900 to-indigo-950 p-5">

            {/* Content */}
            <div className="grid gap-8">

                <CardHeader>
                    <CardTitle className="flex items-center gap-1">
                        
                        <div className="flex size-10 items-center justify-center rounded-md bg-white/25 text-emerald-300">
                            <Wallet className="size-6" />
                        </div>

                        <p className="text-lg text-white">
                            Wallet Balance
                        </p>

                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    <div className="flex items-center gap-3">
                        <h2 className="text-4xl font-semibold text-white">
                            ₹ {showBalance ? netBalance : "----------"}
                        </h2>

                        <button
                            type="button"
                            onClick={() => setShowBalance((prev) => !prev)}
                            className="text-white/70 transition hover:text-white"
                            aria-label={showBalance ? "Hide balance" : "Show balance"}
                        >
                            {showBalance ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="bg-slate-300/10 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-1 text-green-500 text-md font-semibold">
                                <TrendingUp className="size-4"/>
                                <p className="flex">
                                    Total Funded
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                ₹{formattedTotalIncome}
                            </h3>
                        </div>

                        <div className="bg-slate-300/10 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-1 text-red-400 text-md font-semibold">
                                <TrendingDown className="size-4"/>
                                <p className="flex">
                                    Total Expenses
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                ₹{formattedTotalExpenses}
                            </h3>
                        </div>

                    </div>

                </CardContent>

            </div>

        </Card>
    );
}