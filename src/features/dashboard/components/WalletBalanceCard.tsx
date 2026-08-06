import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ArrowUpRight } from "lucide-react";

export default function WalletBalanceCard() {
    return (
        <Card className="rounded-3xl shadow-sm">

            <CardHeader>

                <CardTitle>
                    Wallet Balance
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

                <div>

                    <h2 className="text-5xl font-bold">

                        ₹125,450

                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-green-600">

                        <ArrowUpRight
                            className="h-4 w-4"
                        />

                        +2.5%

                    </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Income
                        </p>

                        <h3 className="text-xl font-semibold">

                            ₹15,200

                        </h3>

                    </div>

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Expense
                        </p>

                        <h3 className="text-xl font-semibold">

                            ₹8,400

                        </h3>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}