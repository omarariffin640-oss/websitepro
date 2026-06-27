"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/Sidebar";

type Trade = {
    id: number;
    symbol: string;
    profit: number;
    balance: number;
    timestamp: string;
};

export default function TradeDashboard() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
            const challengeRes = await fetch(`https://websitepro-d5cu.onrender.com/active-challenge?email=${email}`);
            const challengeData = await challengeRes.json();
            setChallenge(challengeData);

            const tradesRes = await fetch(`https://websitepro-d5cu.onrender.com/trades?email=${email}`);
            const tradesData = await tradesRes.json();
            setTrades(tradesData || []);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
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
                newBalance
            })
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
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading trade dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />
            <main className="pt-8 lg:ml-72">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Trade Dashboard</h1>

                    {message && (
                        <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500">
                            <p className="text-green-500">{message}</p>
                        </div>
                    )}

                    {challenge && (
                        <Card className="bg-[#1A1A1A] border-gray-800 mb-4">
                            <CardHeader>
                                <CardTitle className="text-white">Active Challenge</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div>
                                        <p className="text-gray-400 text-sm">Step</p>
                                        <p className="text-white font-bold text-xl">{challenge.step}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Current Balance</p>
                                        <p className="text-green-500 font-bold text-xl">${challenge.current_balance?.toLocaleString() || 10000}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Current Profit</p>
                                        <p className={`font-bold text-xl ${(challenge.current_profit || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                                            {(challenge.current_profit || 0).toFixed(2)}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Target Profit</p>
                                        <p className="text-purple-400 font-bold text-xl">{challenge.target_profit}%</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="bg-[#1A1A1A] border-gray-800 mb-4">
                        <CardHeader>
                            <CardTitle className="text-white">Add Trade</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label className="text-gray-300">Symbol</Label>
                                    <Input
                                        value={symbol}
                                        onChange={(e) => setSymbol(e.target.value)}
                                        placeholder="EURUSD"
                                        className="bg-black border-gray-700 text-white"
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-300">Profit/Loss ($)</Label>
                                    <Input
                                        type="number"
                                        value={profit}
                                        onChange={(e) => setProfit(e.target.value)}
                                        placeholder="50"
                                        className="bg-black border-gray-700 text-white"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        onClick={addTrade}
                                        className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                                    >
                                        Add Trade
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">Trade History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {trades.length === 0 ? (
                                <p className="text-gray-400 text-center">No trades yet. Add your first trade above.</p>
                            ) : (
                                <div className="space-y-2">
                                    {trades.map((trade) => (
                                        <div key={trade.id} className="flex justify-between items-center p-3 rounded-lg bg-black/50 border border-gray-800">
                                            <div>
                                                <p className="text-white font-medium">{trade.symbol}</p>
                                                <p className="text-gray-500 text-xs">{new Date(trade.timestamp).toLocaleString()}</p>
                                            </div>
                                            <div className={`font-bold ${trade.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                {trade.profit >= 0 ? "+" : ""}{trade.profit}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}