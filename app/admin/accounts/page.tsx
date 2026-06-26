"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Mail, Server, KeyRound, Activity, Calendar } from "lucide-react";

type Account = {
    id: number;
    user_email: string;
    account_name: string;
    balance: number;
    status: string;
    platform?: string;
    login?: string;
    server?: string;
    created_at?: string;
};

export default function AdminAccountsPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }

        fetch("https://websitepro-d5cu.onrender.com/admin/accounts")
            .then((res) => res.json())
            .then((data) => {
                setAccounts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [router]);

    const getStatusBadge = (status: string) => {
        const value = status?.toLowerCase();

        if (value === "active") {
            return <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Active</Badge>;
        }

        return <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">{status || "Unknown"}</Badge>;
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading accounts...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />

            <main className="pt-6 lg:ml-64">
                <div className="mx-auto max-w-7xl px-4 pb-12">
                    <section className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-gray-950 to-black p-6 md:p-8">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            <Wallet className="h-4 w-4" />
                            Admin Accounts
                        </div>

                        <h1 className="text-3xl font-bold md:text-4xl">Trading Accounts</h1>
                        <p className="mt-3 text-gray-400">
                            View all funded and challenge accounts created in the platform.
                        </p>
                    </section>

                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">All Accounts ({accounts.length})</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {accounts.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                                    No accounts found.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {accounts.map((account) => (
                                        <div
                                            key={account.id}
                                            className="rounded-xl border border-white/10 bg-black/40 p-4 transition hover:border-purple-500/40 hover:bg-purple-500/10"
                                        >
                                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                                <div>
                                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                                        <h3 className="text-lg font-bold text-white">{account.account_name}</h3>
                                                        {getStatusBadge(account.status)}
                                                    </div>

                                                    <p className="flex items-center gap-2 text-sm text-gray-400">
                                                        <Mail className="h-4 w-4 text-purple-400" />
                                                        {account.user_email}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 xl:min-w-[620px] xl:grid-cols-4">
                                                    <Info icon={Wallet} label="Balance" value={`$${Number(account.balance || 0).toLocaleString()}`} />
                                                    <Info icon={KeyRound} label="Login" value={account.login || "-"} />
                                                    <Info icon={Server} label="Server" value={account.server || "NoorFunding-Demo"} />
                                                    <Info
                                                        icon={Calendar}
                                                        label="Created"
                                                        value={
                                                            account.created_at
                                                                ? new Date(account.created_at).toLocaleDateString()
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