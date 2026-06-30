"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Mail, DollarSign, CreditCard, Calendar } from "lucide-react";
import { API_BASE } from "@/lib/api";

type Order = {
    id: number;
    user_email: string;
    account_name: string;
    amount: number;
    status: string;
    payment_status: string;
    created_at?: string;
};

export default function AdminOrdersPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetch(`${API_BASE}/admin/orders`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const getBadge = (value: string) => {
        const status = value?.toLowerCase();

        if (status === "active" || status === "paid") {
            return <Badge className="border-green-500/30 bg-green-500/20 text-green-400">{value}</Badge>;
        }

        if (status === "pending") {
            return <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">{value}</Badge>;
        }

        return <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">{value || "Unknown"}</Badge>;
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading orders...</p>
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
                            <ShoppingCart className="h-4 w-4" />
                            Admin Orders
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">Order Management</h1>
                        <p className="mt-3 text-gray-400">
                            View all challenge purchases and account orders.
                        </p>
                    </section>

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">All Orders ({orders.length})</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {orders.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                                    No orders found.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="rounded-xl border border-white/10 bg-black/40 p-4 transition hover:border-purple-500/40 hover:bg-purple-500/10"
                                        >
                                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{order.account_name}</h3>
                                                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                                                        <Mail className="h-4 w-4 text-purple-400" />
                                                        {order.user_email}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 xl:min-w-[620px] xl:grid-cols-4">
                                                    <Info icon={DollarSign} label="Amount" value={`$${Number(order.amount || 0).toLocaleString()}`} />
                                                    <Info icon={CreditCard} label="Payment" value={order.payment_status || "paid"} />
                                                    <Info
                                                        icon={Calendar}
                                                        label="Date"
                                                        value={
                                                            order.created_at
                                                                ? new Date(order.created_at).toLocaleDateString()
                                                                : "-"
                                                        }
                                                    />
                                                    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                                                        <p className="mb-2 text-gray-400">Status</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {getBadge(order.status)}
                                                            {getBadge(order.payment_status)}
                                                        </div>
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