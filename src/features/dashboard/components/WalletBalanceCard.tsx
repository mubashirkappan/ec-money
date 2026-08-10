import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function WalletBalanceCard() {
    return (
        <Card className="bg-linear-to-br from-emerald-400/20 to-indigo-500/30 bg-black p-5">

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

                    <div>
                        <h2 className="text-4xl font-semibold text-white">
                            ₹125,450.00
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="bg-slate-300/10 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-1 text-green-500 text-md font-semibold">
                                <TrendingUp className="size-4"/>
                                <p className="flex">
                                    Income
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                ₹15,200.00
                            </h3>
                        </div>

                        <div className="bg-slate-300/10 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-1 text-red-400 text-md font-semibold">
                                <TrendingDown className="size-4"/>
                                <p className="flex">
                                    Spending
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                ₹8,400.00
                            </h3>
                        </div>

                    </div>

                </CardContent>

            </div>

        </Card>
    );
}