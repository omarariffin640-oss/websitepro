"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import {
    Users,
    Wallet,
    ShoppingCart,
    DollarSign,
    ShieldCheck,
    Activity,
    CheckCircle,
    BarChart3,
} from "lucide-react";

export default function AdminDashboardPage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        users: 0,
        accounts: 0,
        orders: 0,
        pendingPayouts: 0,
    });

    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            router.push("/login");
            return;
        }

        fetch("https://websitepro-d5cu.onrender.com/admin/stats")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading admin dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpen={() => setSidebarOpen(true)}
            />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">

                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <ShieldCheck className="h-4 w-4" />
                            Admin Panel
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">
                            Admin Dashboard
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Monitor users, funded accounts, orders, payouts and overall
                            platform performance.
                        </p>
                    </section>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            icon={Users}
                            title="Registered Users"
                            value={stats.users.toString()}
                        />

                        <StatCard
                            icon={Wallet}
                            title="Trading Accounts"
                            value={stats.accounts.toString()}
                        />

                        <StatCard
                            icon={ShoppingCart}
                            title="Orders"
                            value={stats.orders.toString()}
                        />

                        <StatCard
                            icon={DollarSign}
                            title="Pending Payouts"
                            value={stats.pendingPayouts.toString()}
                        />
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-2">

                        <Card className="border-white/10 bg-white/5">
                            <CardContent className="p-6">
                                <h2 className="mb-5 text-lg font-semibold text-white">
                                    Quick Actions
                                </h2>

                                <div className="space-y-3">
                                    <ActionItem
                                        icon={CheckCircle}
                                        text="Approve KYC verification"
                                    />

                                    <ActionItem
                                        icon={ShoppingCart}
                                        text="Review new challenge orders"
                                    />

                                    <ActionItem
                                        icon={Wallet}
                                        text="Approve payout requests"
                                    />

                                    <ActionItem
                                        icon={Users}
                                        text="Manage trader accounts"
                                    />

                                    <ActionItem
                                        icon={ShieldCheck}
                                        text="Update user permissions"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-white/10 bg-white/5">
                            <CardContent className="p-6">
                                <h2 className="mb-5 text-lg font-semibold text-white">
                                    Platform Overview
                                </h2>

                                <div className="space-y-4">

                                    <OverviewRow
                                        label="System Status"
                                        value="Operational"
                                    />

                                    <OverviewRow
                                        label="Trading Platform"
                                        value="MT5 Connected"
                                    />

                                    <OverviewRow
                                        label="Payment Gateway"
                                        value="Online"
                                    />

                                    <OverviewRow
                                        label="API Status"
                                        value="Healthy"
                                    />

                                    <OverviewRow
                                        label="Performance"
                                        value="99.9% Uptime"
                                    />

                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    <Card className="mt-8 border-white/10 bg-white/5">
                        <CardContent className="p-6">

                            <div className="mb-5 flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-purple-400" />
                                <h2 className="text-lg font-semibold text-white">
                                    Admin Summary
                                </h2>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">

                                <SummaryCard
                                    title="New Users Today"
                                    value="12"
                                />

                                <SummaryCard
                                    title="Pending Orders"
                                    value="8"
                                />

                                <SummaryCard
                                    title="Today's Revenue"
                                    value="$3,420"
                                />

                            </div>

                        </CardContent>
                    </Card>

                </div>
            </main>
        </div>
    );
}

function StatCard({
    icon: Icon,
    title,
    value,
}: {
    icon: any;
    title: string;
    value: string;
}) {
    return (
        <Card className="border-white/10 bg-white/5 hover:border-purple-500/40">
            <CardContent className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className="h-6 w-6 text-purple-400" />
                </div>

                <p className="text-sm text-gray-400">{title}</p>
                <p className="mt-1 text-2xl font-bold text-white">{value}</p>
            </CardContent>
        </Card>
    );
}

function ActionItem({
    icon: Icon,
    text,
}: {
    icon: any;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4">
            <Icon className="h-5 w-5 text-purple-400" />
            <span className="text-gray-300">{text}</span>
        </div>
    );
}

function OverviewRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-gray-400">{label}</span>
            <span className="font-medium text-white">{value}</span>
        </div>
    );
}

function SummaryCard({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-sm text-gray-400">{title}</p>
            <p className="mt-2 text-2xl font-bold text-white">{value}</p>
        </div>
    );
}