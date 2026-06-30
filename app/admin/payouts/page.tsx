"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Mail, DollarSign, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

type Payout = {
    id: number;
    user_email: string;
    amount: number;
    method?: string;
    note?: string;
    status: "pending" | "approved" | "rejected" | "paid";
    created_at?: string;
};

export default function AdminPayoutsPage() {
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

        fetchPayouts();
    }, [router]);

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

    const updateStatus = async (id: number, status: Payout["status"]) => {
        const res = await fetch(`https://websitepro-d5cu.onrender.com/admin/payouts/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });

        const data = await res.json();

        if (data.success) {
            fetchPayouts();
        } else {
            alert(data.message || "Failed to update payout.");
        }
    };

    const getBadge = (status: Payout["status"]) => {
        if (status === "pending") return <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">Pending</Badge>;
        if (status === "approved") return <Badge className="border-purple-500/30 bg-purple-500/20 text-purple-300">Approved</Badge>;
        if (status === "paid") return <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Paid</Badge>;
        if (status === "rejected") return <Badge className="border-red-500/30 bg-red-500/20 text-red-400">Rejected</Badge>;
        return <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">Unknown</Badge>;
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading payouts...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-6 lg:ml-74">
                <div className="mx-auto max-w-7xl px-4 pb-12 animate-fade-in">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Wallet className="h-4 w-4" />
                            Admin Payouts
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">Payout Approval</h1>
                        <p className="mt-3 text-gray-400">
                            Review, approve, reject, or mark payout requests as paid.
                        </p>
                    </section>

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">All Payout Requests ({payouts.length})</CardTitle>
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
                                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                                        <h3 className="text-lg font-bold text-white">
                                                            ${Number(payout.amount || 0).toLocaleString()}
                                                        </h3>
                                                        {getBadge(payout.status)}
                                                    </div>

                                                    <p className="flex items-center gap-2 text-sm text-gray-400">
                                                        <Mail className="h-4 w-4 text-purple-400" />
                                                        {payout.user_email}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3 xl:min-w-[520px]">
                                                    <Info icon={DollarSign} label="Amount" value={`$${Number(payout.amount || 0).toLocaleString()}`} />
                                                    <Info icon={Clock} label="Method" value={payout.method || "bank"} />
                                                    <Info
                                                        icon={Calendar}
                                                        label="Date"
                                                        value={payout.created_at ? new Date(payout.created_at).toLocaleDateString() : "-"}
                                                    />
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    <Button
                                                        onClick={() => updateStatus(payout.id, "approved")}
                                                        className="bg-purple-500 hover:bg-purple-600"
                                                        size="sm"
                                                    >
                                                        <CheckCircle className="mr-1 h-4 w-4" />
                                                        Approve
                                                    </Button>

                                                    <Button
                                                        onClick={() => updateStatus(payout.id, "paid")}
                                                        className="bg-green-500 hover:bg-green-600"
                                                        size="sm"
                                                    >
                                                        Paid
                                                    </Button>

                                                    <Button
                                                        onClick={() => updateStatus(payout.id, "rejected")}
                                                        variant="outline"
                                                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                                        size="sm"
                                                    >
                                                        <XCircle className="mr-1 h-4 w-4" />
                                                        Reject
                                                    </Button>
                                                </div>
                                            </div>

                                            {payout.note && (
                                                <p className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-gray-400">
                                                    Note: {payout.note}
                                                </p>
                                            )}
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