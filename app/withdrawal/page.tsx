"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function WithdrawalPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [accountDetails, setAccountDetails] = useState("");
    const [message, setMessage] = useState("");
    const [withdrawals, setWithdrawals] = useState<any[]>([]);
    const [availableBalance, setAvailableBalance] = useState(0);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);
        fetchData(email);
    }, [router]);

    const fetchData = async (email: string) => {
        try {
            // Get available balance from challenge
            const challengeRes = await fetch(`https://websitepro-d5cu.onrender.com/active-challenge?email=${email}`);
            const challengeData = await challengeRes.json();
            if (challengeData) {
                setAvailableBalance(challengeData.current_balance || 0);
            }

            // Get withdrawal history
            const withdrawalRes = await fetch(`https://websitepro-d5cu.onrender.com/withdrawals?email=${email}`);
            const withdrawalData = await withdrawalRes.json();
            setWithdrawals(withdrawalData || []);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const submitWithdrawal = async () => {
        if (!amount || !paymentMethod || !accountDetails) {
            setMessage("Please fill all fields");
            return;
        }

        if (parseFloat(amount) > availableBalance) {
            setMessage("Insufficient balance");
            return;
        }

        const res = await fetch("https://websitepro-d5cu.onrender.com/request-withdrawal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: userEmail,
                amount: parseFloat(amount),
                payment_method: paymentMethod,
                account_details: accountDetails
            })
        });
        const data = await res.json();

        if (data.success) {
            setMessage("Withdrawal request submitted!");
            setAmount("");
            setPaymentMethod("");
            setAccountDetails("");
            fetchData(userEmail);
        } else {
            setMessage(data.message || "Failed to submit");
        }
        setTimeout(() => setMessage(""), 3000);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved": return "text-green-500 bg-green-500/10";
            case "pending": return "text-yellow-500 bg-yellow-500/10";
            case "rejected": return "text-red-500 bg-red-500/10";
            default: return "text-gray-500 bg-gray-500/10";
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
            <main className="lg:ml-64 pt-2">
                <div className="p-3 max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-white mb-3">Withdrawal</h1>

                    {message && (
                        <div className={`mb-4 p-3 rounded-lg ${message.includes("submitted") ? "bg-green-500/20 border border-green-500" : "bg-red-500/20 border border-red-500"}`}>
                            <p className={message.includes("submitted") ? "text-green-500" : "text-red-500"}>{message}</p>
                        </div>
                    )}

                    {/* Available Balance */}
                    <Card className="bg-darkcard mb-6">
                        <CardHeader>
                            <CardTitle className="text-white">Available Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-green-500">${availableBalance.toLocaleString()}</p>
                        </CardContent>
                    </Card>

                    {/* Withdrawal Form */}
                    <Card className="bg-darkcard mb-6">
                        <CardHeader>
                            <CardTitle className="text-white">Request Withdrawal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-gray-300">Amount ($)</Label>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300">Payment Method</Label>
                                <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                                    <SelectTrigger className="bg-darknavy border-gray-700 text-white">
                                        <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-darknavy border-gray-700 text-white">
                                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                        <SelectItem value="paypal">PayPal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300">Account Details</Label>
                                <Input
                                    value={accountDetails}
                                    onChange={(e) => setAccountDetails(e.target.value)}
                                    placeholder="Bank account / Wallet address"
                                    className="bg-darknavy border-gray-700 text-white"
                                />
                            </div>

                            <Button onClick={submitWithdrawal} className="w-full bg-orange-500 hover:bg-orange-600">
                                Submit Request
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Withdrawal History */}
                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">Withdrawal History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {withdrawals.length === 0 ? (
                                <p className="text-gray-400 text-center">No withdrawal requests yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {withdrawals.map((w) => (
                                        <div key={w.id} className="flex justify-between items-center p-3 rounded-lg bg-darknavy/50">
                                            <div>
                                                <p className="text-white font-medium">${w.amount}</p>
                                                <p className="text-gray-400 text-sm">{w.payment_method}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(w.status)}`}>
                                                    {w.status.toUpperCase()}
                                                </span>
                                                <p className="text-gray-500 text-xs mt-1">{new Date(w.created_at).toLocaleDateString()}</p>
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