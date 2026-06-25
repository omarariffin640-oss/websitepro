"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Wallet,
    Mail,
    DollarSign,
    CreditCard,
    Calendar,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";

type Payout = {
    id: number;
    user_email: string;
    amount: number;
    method?: string;
    note?: string;
    status: string;
    created_at?: string;
};

export default function AdminPayoutsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<number | null>(null);

    const fetchPayouts = async () => {
        try {
            const res = await fetch("https://websitepro-d5cu.onrender.com/admin/payouts");
            const data = await res.json();
            setPayouts(Array.isArray(data) ? data : []);
        } catch {
            setPayouts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetchPayouts();
    }, [router]);

    const handleAction = async (id: number, action: "approve" | "reject") => {
        setActionLoading(id);

        try {
            await fetch(`https://websitepro-d5cu.onrender.com/admin/payouts/${id}/${action}`, {
                method: "POST",
            });

            await fetchPayouts();
        } catch {
            alert("Action failed. Please try again.");
        } finally {
            setActionLoading(null);
        }
    };

    const getBadge = (value: string) => {
        const status = value?.toLowerCase();

        if (status === "approved") {
            return <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Approved</Badge>;
        }

        if (status === "pending") {
            return <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">Pending</Badge>;
        }

        if (status === "rejected") {
            return <Badge className="border-red-500/30 bg-red-500/20 text-red-400">Rejected</Badge>;
        }

        return <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">{value || "Unknown"}</Badge>;
    };

    const total = payouts.length;
    const pending = payouts.filter((p) => p.status?.toLowerCase() === "pending").length;
    const approved = payouts.filter((p) => p.status?.toLowerCase() === "approved").length;
    const rejected = payouts.filter((p) => p.status?.toLowerCase() === "rejected").length;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading payouts...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Wallet className="h-4 w-4" />
                            Admin Payouts
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">Payout Approval</h1>
                        <p className="mt-3 text-gray-400">
                            Manage trader payout requests and approve or reject pending withdrawals.
                        </p>
                    </section>

                    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <SummaryCard icon={Wallet} label="Total Requests" value={total} />
                        <SummaryCard icon={Clock} label="Pending" value={pending} />
                        <SummaryCard icon={CheckCircle} label="Approved" value={approved} />
                        <SummaryCard icon={XCircle} label="Rejected" value={rejected} />
                    </div>

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">All Payouts ({payouts.length})</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {payouts.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                                    No payout requests found.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {payouts.map((payout) => (
                                        <div
                                            key={payout.id}
                                            className="rounded-xl border border-white/10 bg-black/40 p-4 transition hover:border-purple-500/40 hover:bg-purple-500/10"
                                        >
                                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">
                                                        Payout #{payout.id}
                                                    </h3>

                                                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                                                        <Mail className="h-4 w-4 text-purple-400" />
                                                        {payout.user_email}
                                                    </p>

                                                    {payout.note && (
                                                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                                            <FileText className="h-4 w-4 text-purple-400" />
                                                            {payout.note}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 xl:min-w-[720px] xl:grid-cols-5">
                                                    <Info
                                                        icon={DollarSign}
                                                        label="Amount"
                                                        value={`$${Number(payout.amount || 0).toLocaleString()}`}
                                                    />

                                                    <Info
                                                        icon={CreditCard}
                                                        label="Method"
                                                        value={payout.method || "bank"}
                                                    />

                                                    <Info
                                                        icon={Calendar}
                                                        label="Date"
                                                        value={
                                                            payout.created_at
                                                                ? new Date(payout.created_at).toLocaleDateString()
                                                                : "-"
                                                        }
                                                    />

                                                    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                                                        <p className="mb-2 text-gray-400">Status</p>
                                                        {getBadge(payout.status)}
                                                    </div>

                                                    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                                                        <p className="mb-2 text-gray-400">Action</p>

                                                        {payout.status?.toLowerCase() === "pending" ? (
                                                            <div className="flex flex-wrap gap-2">
                                                                <button
                                                                    onClick={() => handleAction(payout.id, "approve")}
                                                                    disabled={actionLoading === payout.id}
                                                                    className="rounded-lg border border-green-500/30 bg-green-500/20 px-3 py-1.5 text-sm text-green-400 transition hover:bg-green-500/30 disabled:opacity-50"
                                                                >
                                                                    Approve
                                                                </button>

                                                                <button
                                                                    onClick={() => handleAction(payout.id, "reject")}
                                                                    disabled={actionLoading === payout.id}
                                                                    className="rounded-lg border border-red-500/30 bg-red-500/20 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/30 disabled:opacity-50"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm text-gray-500">Completed</span>
                                                        )}
                                                    </div>
                                                </div>
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

function SummaryCard({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: number;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                <Icon className="h-5 w-5" />
            </div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
    );
}

function Info({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="mb-1 flex items-center gap-2 text-gray-400">
                <Icon className="h-4 w-4 text-purple-400" />
                <span>{label}</span>
            </div>
            <p className="font-medium text-white">{value}</p>
        </div>
    );
}