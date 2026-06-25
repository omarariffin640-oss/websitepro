"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    Wallet,
    ShoppingCart,
    DollarSign,
    ShieldCheck,
    Activity,
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
                <p className="text-gray-400">Loading admin...</p>
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
                            <ShieldCheck className="h-4 w-4" />
                            Admin Panel
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">Admin Dashboard</h1>
                        <p className="mt-3 text-gray-400">
                            Manage users, accounts, orders, payouts and certificates.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <AdminCard icon={Users} title="Users" value={stats.users.toString()} />
                        <AdminCard icon={Wallet} title="Accounts" value={stats.accounts.toString()} />
                        <AdminCard icon={ShoppingCart} title="Orders" value={stats.orders.toString()} />
                        <AdminCard icon={DollarSign} title="Pending Payouts" value={stats.pendingPayouts.toString()} />
                    </div>

                    <Card className="mt-8 border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Activity className="h-5 w-5 text-purple-400" />
                                Admin Actions
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                            <Action text="Approve payout requests" />
                            <Action text="Review new orders" />
                            <Action text="Manage trader accounts" />
                            <Action text="Issue certificates" />
                            <Action text="Update user roles" />
                            <Action text="Monitor platform activity" />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function AdminCard({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
    return (
        <Card className="border-white/10 bg-white/5 transition hover:border-purple-500/40 hover:bg-purple-500/10">
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

function Action({ text }: { text: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-gray-300">
            ✓ {text}
        </div>
    );
}