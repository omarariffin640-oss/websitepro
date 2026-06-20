"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { Search, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

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
            { id: 1, symbol: "EURUSD", type: "buy", volume: 0.5, price: 1.0850, profit: 45.20, status: "closed", time: "2026-06-18 10:30" },
            { id: 2, symbol: "GBPUSD", type: "sell", volume: 1.0, price: 1.2650, profit: -22.50, status: "open", time: "2026-06-18 09:15" },
            { id: 3, symbol: "XAUUSD", type: "buy", volume: 0.1, price: 2325.50, profit: 120.00, status: "closed", time: "2026-06-17 14:45" },
            { id: 4, symbol: "EURUSD", type: "sell", volume: 0.3, price: 1.0845, profit: 15.00, status: "pending", time: "2026-06-17 11:20" },
        ]);
        setLoading(false);
    }, [router]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "open":
                return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Open</Badge>;
            case "closed":
                return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Closed</Badge>;
            case "pending":
                return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
            default:
                return <Badge className="bg-gray-500/20 text-gray-400">Unknown</Badge>;
        }
    };

    const filteredOrders = orders.filter(order =>
        order.symbol.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Topbar />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Orders</h1>
                            <p className="text-sm text-gray-400">View all your trading orders</p>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Search symbol..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 bg-[#1A1A1A] border-gray-700 text-white w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardContent className="pt-3">
                                <p className="text-gray-400 text-xs">Total Orders</p>
                                <p className="text-xl font-bold text-white">{orders.length}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardContent className="pt-3">
                                <p className="text-gray-400 text-xs">Open Orders</p>
                                <p className="text-xl font-bold text-green-500">{orders.filter(o => o.status === "open").length}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardContent className="pt-3">
                                <p className="text-gray-400 text-xs">Total Profit</p>
                                <p className="text-xl font-bold text-green-500">+$157.70</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#1A1A1A] border-gray-800">
                            <CardContent className="pt-3">
                                <p className="text-gray-400 text-xs">Win Rate</p>
                                <p className="text-xl font-bold text-purple-400">67%</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-white">Order History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-800">
                                        <tr>
                                            <th className="pb-2 text-xs font-medium text-gray-400 uppercase">Symbol</th>
                                            <th className="pb-2 text-xs font-medium text-gray-400 uppercase">Type</th>
                                            <th className="pb-2 text-xs font-medium text-gray-400 uppercase">Volume</th>
                                            <th className="pb-2 text-xs font-medium text-gray-400 uppercase">Price</th>
                                            <th className="pb-2 text-xs font-medium text-gray-400 uppercase">Profit</th>
                                            <th className="pb-2 text-xs font-medium text-gray-400 uppercase">Status</th>
                                            <th className="pb-2 text-xs font-medium text-gray-400 uppercase">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {filteredOrders.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="py-4 text-center text-gray-400">No orders found</td>
                                            </tr>
                                        ) : (
                                            filteredOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                                                    <td className="py-2 text-white font-medium">{order.symbol}</td>
                                                    <td className="py-2">
                                                        <div className="flex items-center gap-1">
                                                            {order.type === "buy" ? (
                                                                <ArrowUpRight className="h-4 w-4 text-green-500" />
                                                            ) : (
                                                                <ArrowDownRight className="h-4 w-4 text-red-500" />
                                                            )}
                                                            <span className={order.type === "buy" ? "text-green-500" : "text-red-500"}>
                                                                {order.type.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 text-gray-300">{order.volume}</td>
                                                    <td className="py-2 text-gray-300">{order.price.toFixed(4)}</td>
                                                    <td className={`py-2 font-medium ${order.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                        {order.profit >= 0 ? "+" : ""}{order.profit}
                                                    </td>
                                                    <td className="py-2">{getStatusBadge(order.status)}</td>
                                                    <td className="py-2 text-gray-400 text-sm">{order.time}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}