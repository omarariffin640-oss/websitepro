"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Search,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Activity,
    DollarSign,
    TrendingUp,
    Trophy,
    ListChecks,
    CalendarDays,
} from "lucide-react";

type Order = {
    id: number;
    symbol: string;
    type: "buy" | "sell";
    volume: number;
    price: number;
    profit: number;
    status: "open" | "closed" | "pending";
    time: string;
};

export default function OrdersPage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        setOrders([
            {
                id: 1,
                symbol: "EURUSD",
                type: "buy",
                volume: 0.5,
                price: 1.085,
                profit: 45.2,
                status: "closed",
                time: "2026-06-18 10:30",
            },
            {
                id: 2,
                symbol: "GBPUSD",
                type: "sell",
                volume: 1.0,
                price: 1.265,
                profit: -22.5,
                status: "open",
                time: "2026-06-18 09:15",
            },
            {
                id: 3,
                symbol: "XAUUSD",
                type: "buy",
                volume: 0.1,
                price: 2325.5,
                profit: 120.0,
                status: "closed",
                time: "2026-06-17 14:45",
            },
            {
                id: 4,
                symbol: "EURUSD",
                type: "sell",
                volume: 0.3,
                price: 1.0845,
                profit: 15.0,
                status: "pending",
                time: "2026-06-17 11:20",
            },
        ]);

        setLoading(false);
    }, [router]);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) =>
            order.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }, [orders, search]);

    const totalProfit = orders.reduce((sum, order) => sum + order.profit, 0);
    const openOrders = orders.filter((order) => order.status === "open").length;
    const wins = orders.filter((order) => order.profit > 0).length;
    const winRate = orders.length > 0 ? (wins / orders.length) * 100 : 0;

    const getStatusBadge = (status: Order["status"]) => {
        switch (status) {
            case "open":
                return (
                    <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
                        Open
                    </Badge>
                );
            case "closed":
                return (
                    <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-300">
                        Closed
                    </Badge>
                );
            case "pending":
                return (
                    <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400">
                        Pending
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

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="relative mb-8 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                                    <ListChecks className="h-4 w-4" />
                                    Orders Center
                                </div>

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    Trading Orders
                                </h1>

                                <p className="mt-3 max-w-2xl text-gray-400">
                                    Track your active, pending, and closed trading orders in one clean dashboard.
                                </p>
                            </div>

                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    type="text"
                                    placeholder="Search symbol..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-11 w-full rounded-xl border-gray-800 bg-black/50 pl-9 text-white placeholder:text-gray-500 focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <SummaryCard
                            icon={Activity}
                            title="Total Orders"
                            value={orders.length.toString()}
                            color="text-purple-400"
                        />
                        <SummaryCard
                            icon={Clock}
                            title="Open Orders"
                            value={openOrders.toString()}
                            color="text-green-400"
                        />
                        <SummaryCard
                            icon={DollarSign}
                            title="Total Profit"
                            value={`${totalProfit >= 0 ? "+" : "-"}$${Math.abs(totalProfit).toFixed(2)}`}
                            color={totalProfit >= 0 ? "text-green-400" : "text-red-400"}
                        />
                        <SummaryCard
                            icon={Trophy}
                            title="Win Rate"
                            value={`${winRate.toFixed(1)}%`}
                            color="text-yellow-400"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <Card className="xl:col-span-2 border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-gray-950">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <TrendingUp className="h-5 w-5 text-purple-400" />
                                    Recent Orders
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                {filteredOrders.length === 0 ? (
                                    <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                                        No orders found.
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {filteredOrders.map((order) => {
                                            const isBuy = order.type === "buy";
                                            const DirectionIcon = isBuy ? ArrowUpRight : ArrowDownRight;

                                            return (
                                                <div
                                                    key={order.id}
                                                    className="rounded-xl border border-white/10 bg-black/40 p-4 transition hover:border-purple-500/40 hover:bg-purple-500/10"
                                                >
                                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${isBuy ? "bg-green-500/20" : "bg-red-500/20"
                                                                    }`}
                                                            >
                                                                <DirectionIcon
                                                                    className={`h-6 w-6 ${isBuy ? "text-green-400" : "text-red-400"
                                                                        }`}
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <p className="text-lg font-bold text-white">
                                                                        {order.symbol}
                                                                    </p>

                                                                    <Badge
                                                                        className={`${isBuy
                                                                                ? "border-green-500/30 bg-green-500/20 text-green-400"
                                                                                : "border-red-500/30 bg-red-500/20 text-red-400"
                                                                            }`}
                                                                    >
                                                                        {order.type.toUpperCase()}
                                                                    </Badge>

                                                                    {getStatusBadge(order.status)}
                                                                </div>

                                                                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                                    {order.time}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-3 text-right text-sm md:min-w-[320px]">
                                                            <div>
                                                                <p className="text-xs text-gray-500">Volume</p>
                                                                <p className="font-semibold text-white">
                                                                    {order.volume}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="text-xs text-gray-500">Price</p>
                                                                <p className="font-semibold text-white">
                                                                    {order.price.toFixed(order.symbol === "XAUUSD" ? 2 : 4)}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="text-xs text-gray-500">Profit</p>
                                                                <p
                                                                    className={`font-bold ${order.profit >= 0
                                                                            ? "text-green-400"
                                                                            : "text-red-400"
                                                                        }`}
                                                                >
                                                                    {order.profit >= 0 ? "+" : "-"}$
                                                                    {Math.abs(order.profit).toFixed(2)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5">
                            <CardHeader>
                                <CardTitle className="text-white">Order Rules</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm text-gray-300">
                                <Rule text="All orders are recorded for performance tracking." />
                                <Rule text="Open trades are monitored during challenge review." />
                                <Rule text="Closed trades update profit and win-rate stats." />
                                <Rule text="Pending orders may change based on execution." />
                                <Rule text="Use risk management on every position." />
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

function Rule({ text }: { text: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            ✓ {text}
        </div>
    );
}