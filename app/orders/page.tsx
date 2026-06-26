"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ShoppingCart,
    DollarSign,
    CheckCircle,
    Clock,
    CreditCard,
    Calendar,
} from "lucide-react";

type Order = {
    id: number;
    user_email: string;
    account_name: string;
    amount: number;
    status: string;
    payment_status: string;
    created_at: string;
};

const API_URL = "https://websitepro-d5cu.onrender.com";

export default function OrdersPage() {
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

        fetchOrders(email);
    }, [router]);

    const fetchOrders = async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/orders?email=${email}`);
            const data = await res.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch {
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const totalPaid = orders.reduce(
        (sum, order) => sum + Number(order.amount || 0),
        0
    );

    const activeOrders = orders.filter(
        (order) => order.status?.toLowerCase() === "active"
    ).length;

    const getStatusBadge = (status: string) => {
        const value = status?.toLowerCase();

        if (value === "active") {
            return (
                <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                    Active
                </Badge>
            );
        }

        if (value === "pending") {
            return (
                <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
                    Pending
                </Badge>
            );
        }

        return (
            <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">
                {status || "Unknown"}
            </Badge>
        );
    };

    const getPaymentBadge = (status: string) => {
        const value = status?.toLowerCase();

        if (value === "paid") {
            return (
                <Badge className="border-purple-500/30 bg-purple-500/20 text-purple-300">
                    Paid
                </Badge>
            );
        }

        if (value === "pending") {
            return (
                <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
                    Pending
                </Badge>
            );
        }

        return (
            <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">
                {status || "Unknown"}
            </Badge>
        );
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

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

                        <div className="relative z-10">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                <ShoppingCart className="h-4 w-4" />
                                Order Center
                            </div>

                            <h1 className="text-3xl font-bold md:text-4xl">Orders</h1>

                            <p className="mt-3 max-w-2xl text-gray-400">
                                Track your challenge purchases, account orders, and payment status.
                            </p>
                        </div>
                    </section>

                    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <SummaryCard
                            icon={ShoppingCart}
                            title="Total Orders"
                            value={orders.length.toString()}
                            color="text-purple-400"
                        />
                        <SummaryCard
                            icon={CheckCircle}
                            title="Active Orders"
                            value={activeOrders.toString()}
                            color="text-green-400"
                        />
                        <SummaryCard
                            icon={DollarSign}
                            title="Total Amount"
                            value={`$${totalPaid.toLocaleString()}`}
                            color="text-blue-400"
                        />
                    </div>

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">Order History</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {orders.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-black/40 p-8 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20">
                                        <ShoppingCart className="h-8 w-8 text-purple-400" />
                                    </div>

                                    <h2 className="text-xl font-bold text-white">
                                        No Orders Yet
                                    </h2>

                                    <p className="mt-2 text-gray-400">
                                        Purchase a challenge account to see your order history.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="rounded-xl border border-white/10 bg-black/40 p-4 transition hover:border-purple-500/40 hover:bg-purple-500/10"
                                        >
                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-white">
                                                        {order.account_name}
                                                    </h3>

                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {getStatusBadge(order.status)}
                                                        {getPaymentBadge(order.payment_status)}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3 md:min-w-[520px]">
                                                    <InfoItem
                                                        icon={DollarSign}
                                                        label="Amount"
                                                        value={`$${Number(order.amount || 0).toLocaleString()}`}
                                                    />
                                                    <InfoItem
                                                        icon={CreditCard}
                                                        label="Payment"
                                                        value={order.payment_status || "paid"}
                                                    />
                                                    <InfoItem
                                                        icon={Calendar}
                                                        label="Date"
                                                        value={
                                                            order.created_at
                                                                ? new Date(order.created_at).toLocaleDateString()
                                                                : "-"
                                                        }
                                                    />
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
    title,
    value,
    color,
}: {
    icon: any;
    title: string;
    value: string;
    color: string;
}) {
    return (
        <Card className="border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}

function InfoItem({
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
            <p className="font-medium capitalize text-white">{value}</p>
        </div>
    );
}