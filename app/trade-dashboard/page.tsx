"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Trade = {
    id: number;
    symbol: string;
    profit: number;
    balance: number;
    timestamp: string;
};

export default function TradeDashboard() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [challenge, setChallenge] = useState<any>(null);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [symbol, setSymbol] = useState("EURUSD");
    const [profit, setProfit] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetchData(email);
    }, [router]);

    const fetchData = async (email: string) => {
        try {
            const challengeRes = await fetch(
                `https://websitepro-d5cu.onrender.com/active-challenge?email=${email}`
            );
            const challengeData = await challengeRes.json();
            setChallenge(challengeData);

            const tradesRes = await fetch(
                `https://websitepro-d5cu.onrender.com/trades?email=${email}`
            );
            const tradesData = await tradesRes.json();
            setTrades(Array.isArray(tradesData) ? tradesData : []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const addTrade = async () => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            setMessage("Please login first");
            return;
        }

        if (!profit) {
            setMessage("Please enter profit/loss");
            return;
        }

        const profitNum = parseFloat(profit);
        const newBalance = (challenge?.current_balance || 10000) + profitNum;

        const res = await fetch("https://websitepro-d5cu.onrender.com/add-trade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                symbol,
                profit: profitNum,
                newBalance,
            }),
        });

        const data = await res.json();

        if (data.success) {
            setMessage("Trade added successfully!");
            setProfit("");
            fetchData(email);
        } else {
            setMessage(data.message || "Failed to add trade");
        }

        setTimeout(() => setMessage(""), 3000);
    };

    if (loading) {
        return (
            <DashboardShell>
                <div className="flex min-h-[300px] items-center justify-center">
                    <p className="text-gray-400">Loading trade dashboard...</p>
                </div>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <h1 className="mb-3 text-2xl font-bold text-white">Trade Dashboard</h1>

            {message && (
                <div className="mb-4 rounded-lg border border-green-500 bg-green-500/20 p-3">
                    <p className="text-green-500">{message}</p>
                </div>
            )}

            {challenge && (
                <Card className="mb-4 border-gray-800 bg-[#1A1A1A]">
                    <CardHeader>
                        <CardTitle className="text-white">Active Challenge</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            <Info label="Step" value={challenge.step} />
                            <Info
                                label="Current Balance"
                                value={`$${challenge.current_balance?.toLocaleString() || 10000}`}
                                green
                            />
                            <Info
                                label="Current Profit"
                                value={`${(challenge.current_profit || 0).toFixed(2)}%`}
                                green={(challenge.current_profit || 0) >= 0}
                                red={(challenge.current_profit || 0) < 0}
                            />
                            <Info label="Target Profit" value={`${challenge.target_profit}%`} purple />
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="mb-4 border-gray-800 bg-[#1A1A1A]">
                <CardHeader>
                    <CardTitle className="text-white">Add Trade</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <Label className="text-gray-300">Symbol</Label>
                            <Input
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                                placeholder="EURUSD"
                                className="border-gray-700 bg-black text-white"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-300">Profit/Loss ($)</Label>
                            <Input
                                type="number"
                                value={profit}
                                onChange={(e) => setProfit(e.target.value)}
                                placeholder="50"
                                className="border-gray-700 bg-black text-white"
                            />
                        </div>

                        <div className="flex items-end">
                            <Button
                                onClick={addTrade}
                                className="w-full bg-purple-500 text-white hover:bg-purple-600"
                            >
                                Add Trade
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-gray-800 bg-[#1A1A1A]">
                <CardHeader>
                    <CardTitle className="text-white">Trade History</CardTitle>
                </CardHeader>
                <CardContent>
                    {trades.length === 0 ? (
                        <p className="text-center text-gray-400">
                            No trades yet. Add your first trade above.
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {trades.map((trade) => (
                                <div
                                    key={trade.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-800 bg-black/50 p-3"
                                >
                                    <div>
                                        <p className="font-medium text-white">{trade.symbol}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(trade.timestamp).toLocaleString()}
                                        </p>
                                    </div>

                                    <div
                                        className={`font-bold ${trade.profit >= 0 ? "text-green-500" : "text-red-500"
                                            }`}
                                    >
                                        {trade.profit >= 0 ? "+" : ""}
                                        {trade.profit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </DashboardShell>
    );
}

function Info({ label, value, green, red, purple }: any) {
    return (
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p
                className={`text-xl font-bold ${green
                        ? "text-green-500"
                        : red
                            ? "text-red-500"
                            : purple
                                ? "text-purple-400"
                                : "text-white"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}