"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Zap,
    Wallet,
    CheckCircle,
    CalendarDays,
    Shield,
    TrendingUp,
    Clock,
} from "lucide-react";

type InstantAccount = {
    id: number;
    account_id: string;
    balance: number;
    status: string;
    created_at: string;
};

export default function InstantAccountPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [account, setAccount] = useState<InstantAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetch(`https://websitepro-d5cu.onrender.com/instant-account?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.id) setAccount(data);
            })
            .catch(() => setMessage("Failed to load instant account."))
            .finally(() => setLoading(false));
    }, [router]);

    const createAccount = async () => {
        setCreating(true);
        setMessage("");

        const email = localStorage.getItem("userEmail");

        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/create-instant-account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_email: email }),
            });

            const data = await res.json();

            if (data.success) {
                setAccount({
                    id: Date.now(),
                    account_id: data.account_id,
                    balance: data.balance,
                    status: "active",
                    created_at: new Date().toISOString(),
                });

                setMessage("Instant account created successfully!");
            } else {
                setMessage(data.error || "Failed to create account.");
            }
        } catch {
            setMessage("Server error. Please try again.");
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading instant account...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                    <Zap className="h-4 w-4" />
                                    Instant Funding
                                </div>

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    Get Funded Instantly
                                </h1>

                                <p className="mt-3 max-w-2xl text-gray-400">
                                    Skip the evaluation process and create your instant trading account with fast access, clear rules, and dashboard tracking.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm">
                                <p className="text-gray-400">Account Status</p>
                                <p className="mt-1 flex items-center gap-2 font-semibold text-green-400">
                                    <CheckCircle className="h-4 w-4" />
                                    {account ? "Instant Account Active" : "Ready To Create"}
                                </p>
                            </div>
                        </div>
                    </section>

                    {message && (
                        <div
                            className={`mb-6 rounded-xl border p-4 ${message.toLowerCase().includes("success")
                                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                                    : "border-red-500/30 bg-red-500/10 text-red-300"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    {account ? (
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                            <Card className="xl:col-span-2 border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <Wallet className="h-5 w-5 text-purple-400" />
                                        Your Instant Account
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <InfoBox label="Account ID" value={account.account_id} mono />
                                        <InfoBox
                                            label="Balance"
                                            value={`$${account.balance.toLocaleString()}`}
                                            highlight="green"
                                        />
                                        <InfoBox label="Status" value={account.status} highlight="green" />
                                        <InfoBox
                                            label="Created"
                                            value={new Date(account.created_at).toLocaleDateString()}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/10 bg-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Account Includes</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-3 text-sm text-gray-300">
                                    <Benefit icon={TrendingUp} text="Instant Trading Access" />
                                    <Benefit icon={Shield} text="Clear Risk Rules" />
                                    <Benefit icon={Clock} text="Fast Payout Review" />
                                    <Benefit icon={CheckCircle} text="Up To 80% Profit Split" />
                                    <Benefit icon={CalendarDays} text="Unlimited Trading Period" />
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                            <Card className="xl:col-span-2 border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                                <CardContent className="p-8 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20">
                                        <Zap className="h-8 w-8 text-purple-400" />
                                    </div>

                                    <h2 className="text-2xl font-bold text-white">
                                        No Instant Account Yet
                                    </h2>

                                    <p className="mx-auto mt-3 max-w-xl text-gray-400">
                                        Create your instant account and start tracking your funded trading progress inside your Noor Funding dashboard.
                                    </p>

                                    <Button
                                        onClick={createAccount}
                                        disabled={creating}
                                        className="mt-6 rounded-xl bg-purple-500 px-8 py-6 text-white hover:bg-purple-600 disabled:opacity-60"
                                    >
                                        {creating ? "Creating Account..." : "Get Instant Account"}
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-white/10 bg-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white">Why Instant?</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-3 text-sm text-gray-300">
                                    <Benefit icon={Zap} text="No Evaluation Required" />
                                    <Benefit icon={Shield} text="Controlled Drawdown Rules" />
                                    <Benefit icon={TrendingUp} text="Start Trading Faster" />
                                    <Benefit icon={Clock} text="Fast Account Setup" />
                                    <Benefit icon={CheckCircle} text="Dashboard Tracking" />
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function InfoBox({
    label,
    value,
    mono,
    highlight,
}: {
    label: string;
    value: string;
    mono?: boolean;
    highlight?: "green";
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-gray-400">{label}</p>
            <p
                className={`mt-1 text-xl font-bold capitalize ${highlight === "green" ? "text-green-400" : "text-white"
                    } ${mono ? "font-mono text-base" : ""}`}
            >
                {value}
            </p>
        </div>
    );
}

function Benefit({
    icon: Icon,
    text,
}: {
    icon: any;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-3">
            <Icon className="h-4 w-4 text-purple-400" />
            <span>{text}</span>
        </div>
    );
}