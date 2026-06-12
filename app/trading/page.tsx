"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function TradingPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [symbol, setSymbol] = useState("EURUSD");
    const [profit, setProfit] = useState("");
    const [balance, setBalance] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);
        setLoading(false);
    }, [router]);

    const updateTrade = async () => {
        setMessage("Updating...");

        const res = await fetch("https://websitepro-d5cu.onrender.com/webhook/trade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: userEmail,
                symbol: symbol,
                profit: parseFloat(profit) || 0,
                balance: parseFloat(balance) || 0
            })
        });
        const data = await res.json();

        if (data.success) {
            setMessage("✅ Trade updated successfully!");
            setProfit("");
        } else {
            setMessage("❌ Update failed");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Manual Trading Update</h1>

                    {message && (
                        <div className={`mb-4 p-3 rounded-lg ${message.includes("✅") ? "bg-green-500/20 border border-green-500" : "bg-red-500/20 border border-red-500"}`}>
                            <p className={message.includes("✅") ? "text-green-500" : "text-red-500"}>{message}</p>
                        </div>
                    )}

                    <Card className="bg-darkcard max-w-md">
                        <CardHeader>
                            <CardTitle className="text-white">Update Trade Profit/Loss</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-gray-300">Symbol</Label>
                                <Input
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                    placeholder="EURUSD"
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300">Profit/Loss ($)</Label>
                                <Input
                                    type="number"
                                    value={profit}
                                    onChange={(e) => setProfit(e.target.value)}
                                    placeholder="50"
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300">New Balance ($)</Label>
                                <Input
                                    type="number"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    placeholder="10050"
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>

                            <Button onClick={updateTrade} className="w-full bg-orange-500 hover:bg-orange-600">
                                Update Trade
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-darkcard max-w-md mt-6">
                        <CardHeader>
                            <CardTitle className="text-white">How to Use</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                                <li>Close trade di MT5</li>
                                <li>Masukkan symbol (contoh: EURUSD)</li>
                                <li>Masukkan profit/loss dari trade</li>
                                <li>Masukkan balance baru selepas trade</li>
                                <li>Klik "Update Trade"</li>
                                <li>Dashboard akan update challenge progress</li>
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}