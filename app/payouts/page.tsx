"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    Clock,
    CheckCircle,
    DollarSign,
    TrendingUp,
    ShieldCheck,
    CalendarDays,
    ArrowUpRight,
} from "lucide-react";

type Payout = {
    id: number;
    amount: number;
    created_at: string;
    method: string;
    note: string;
    status: "pending" | "approved" | "paid" | "rejected";
};

export default function PayoutsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetch(`https://websitepro-d5cu.onrender.com/payouts?email=${email}`)
            .then((res) => res.json())
            .then((data) => {
                setPayouts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const totalPaid = payouts
        .filter((payout) => payout.status === "paid")
        .reduce((sum, payout) => sum + Number(payout.amount || 0), 0);

    const pendingAmount = payouts
        .filter((payout) => payout.status === "pending")
        .reduce((sum, payout) => sum + Number(payout.amount || 0), 0);

    const approvedAmount = payouts
        .filter((payout) => payout.status === "approved")
        .reduce((sum, payout) => sum + Number(payout.amount || 0), 0);

    const getStatusBadge = (status: Payout["status"]) => {
        switch (status) {
            case "pending":
                return (
                    <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
                        Pending
                    </Badge>
                );

            case "approved":
                return (
                    <Badge className="border-purple-500/30 bg-purple-500/20 text-purple-300">
                        Approved
                    </Badge>
                );

            case "paid":
                return (
                    <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                        Paid
                    </Badge>
                );

            case "rejected":
                return (
                    <Badge className="border-red-500/30 bg-red-500/20 text-red-400">
                        Rejected
                    </Badge>
                );

            default:
                return (
                    <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">
                        Unknown
                    </Badge>
                );
        }
    };

    const getStatusIcon = (status: Payout["status"]) => {
        if (status === "paid") return CheckCircle;
        if (status === "approved") return ShieldCheck;
        return Clock;
    };

    const requestPayout = async () => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        const amount = prompt("Enter payout amount:");

        if (!amount) return;

        const res = await fetch("https://websitepro-d5cu.onrender.com/request-payout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: Number(amount),
                method: "bank",
                note: "User payout request",
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Payout request submitted.");
            location.reload();
        } else {
            alert(data.message || "Failed to request payout.");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading payouts...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050509] text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-8 lg:ml-72">
                <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                    <Wallet className="h-4 w-4" />
                                    Payout Center
                                </div>

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    Manage Your Payouts
                                </h1>

                                <p className="mt-3 max-w-2xl text-gray-400">
                                    Track payout requests, approval status, and paid rewards from your Noor Funding account.
                                </p>
                            </div>

                            <Button
                                onClick={requestPayout}
                                className="rounded-xl bg-purple-500 px-6 py-6 text-white hover:bg-purple-600"
                            >
                                Request Payout
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </section>

                    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <SummaryCard
                            icon={DollarSign}
                            title="Total Paid"
                            value={`$${totalPaid.toLocaleString()}`}
                            tone="green"
                        />
                        <SummaryCard
                            icon={Clock}
                            title="Pending"
                            value={`$${pendingAmount.toLocaleString()}`}
                            tone="yellow"
                        />
                        <SummaryCard
                            icon={ShieldCheck}
                            title="Approved"
                            value={`$${approvedAmount.toLocaleString()}`}
                            tone="purple"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <Card className="xl:col-span-2 border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <TrendingUp className="h-5 w-5 text-purple-400" />
                                    Payout History
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                {payouts.length === 0 ? (
                                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-gray-400">
                                        No payouts yet.
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {payouts.map((payout) => {
                                            const StatusIcon = getStatusIcon(payout.status);

                                            return (
                                                <div
                                                    key={payout.id}
                                                    className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-500/30 hover:bg-violet-500/5 sm:flex-row sm:items-center sm:justify-between"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/20">
                                                            <StatusIcon className="h-5 w-5 text-purple-400" />
                                                        </div>

                                                        <div>
                                                            <p className="text-xl font-bold text-white">
                                                                ${payout.amount.toLocaleString()}
                                                            </p>
                                                            <p className="flex items-center gap-1 text-sm text-gray-400">
                                                                <CalendarDays className="h-3.5 w-3.5" />
                                                                {payout.created_at ? new Date(payout.created_at).toLocaleDateString() : "-"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                                                        {getStatusBadge(payout.status)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-zinc-950/70">
                            <CardHeader>
                                <CardTitle className="text-white">Payout Rules</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm text-gray-300">
                                <Rule text="Payout review within 24 hours." />
                                <Rule text="Account must meet trading requirements." />
                                <Rule text="No rule violations before approval." />
                                <Rule text="Approved payouts are marked before payment." />
                                <Rule text="Paid payouts are stored in your history." />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

function SummaryCard({
    icon: Icon,
    title,
    value,
    tone,
}: {
    icon: any;
    title: string;
    value: string;
    tone: "green" | "yellow" | "purple";
}) {
    const toneClass =
        tone === "green"
            ? "text-green-400"
            : tone === "yellow"
                ? "text-yellow-400"
                : "text-purple-400";

    return (
        <Card className="border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className={`h-6 w-6 ${toneClass}`} />
                </div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className={`mt-1 text-2xl font-bold ${toneClass}`}>{value}</p>
            </CardContent>
        </Card>
    );
}

function Rule({ text }: { text: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            ✓ {text}
        </div>
    );
}